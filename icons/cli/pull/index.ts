import { resolve } from 'path'
import prettier from 'prettier'
import { mkdirSync, existsSync, promises as fsPromise } from 'fs'
import { pascalCase } from 'change-case'
import { exec } from 'child_process'
import { getImageContent, getNodeChildren, getSvgImageUrl } from '../api'
import { FigmaNode } from '../types/figma'
import svgr from '@svgr/core'
import { svgo } from '../svgo'
import { getTemplate } from '../template'

const sourceDir = resolve(__dirname, '../../source')
const svgDir = resolve(sourceDir, 'svg')
const reactDir = resolve(sourceDir, 'react')

const getSvgFolderPath = (name: string) => resolve(svgDir, pascalCase(name))

const getReactFolderPath = (name: string) => resolve(reactDir, pascalCase(name))

const clearSourceDir = () => {
  exec(`find ${sourceDir} -type f -exec rm {} +`)
}

const generateIcon = async (iconNode: FigmaNode) => {
  const iconUrl = await getSvgImageUrl(iconNode.id)

  console.log('iconNode.name', iconNode.name)

  const iconName = pascalCase(iconNode.name)
  const svgFolderPath = getSvgFolderPath(iconName)
  const reactFolderPath = getReactFolderPath(iconName)

  if (!existsSync(svgFolderPath)) {
    mkdirSync(svgFolderPath)
  }

  if (!existsSync(reactFolderPath)) {
    mkdirSync(reactFolderPath)
  }

  const { data: iconContent } = await getImageContent(iconUrl)
  const { data: optimizedIconContent } = await svgo.optimize(iconContent)

  const tsxCode = await svgr(
    optimizedIconContent,
    {
      icon: false,
      native: true,
      typescript: true,
      template: getTemplate,
    },
    { componentName: iconName },
  )

  const tsxPrettified = prettier.format(tsxCode, {
    bracketSpacing: true,
    jsxSingleQuote: false,
    printWidth: 120,
    semi: false,
    singleQuote: true,
    trailingComma: 'all',
    useTabs: false,
    plugins: ['prettier-plugin-organize-imports'],
  })

  await Promise.all([
    fsPromise.writeFile(resolve(svgFolderPath, 'icon.svg'), optimizedIconContent, { encoding: 'utf8' }),
    fsPromise.writeFile(resolve(reactFolderPath, 'index.tsx'), tsxPrettified, {
      encoding: 'utf8',
    }),
  ])

  console.log(`${iconName} was written success!`)
}

const generateIcons = async (iconNodesArr: FigmaNode[]) => {
  await Promise.all(iconNodesArr.map(generateIcon))
}

const generateImports = async (iconNodesArr: FigmaNode[]) => {
  const fileWithImportsPath = resolve(reactDir, 'index.ts')

  const importsContent = iconNodesArr
    .map((iconNode) => {
      const iconName = pascalCase(iconNode.name)

      return `export { ${iconName} } from './${iconName}'`
    })
    .join('\n')

  await fsPromise.writeFile(fileWithImportsPath, importsContent, {
    encoding: 'utf8',
  })

  console.log(`imports was written success!`)
}

export const pull = async () => {
  console.log('pulling....')

  clearSourceDir()

  const iconNodesArr = await getNodeChildren(process.env.FRAME_WITH_ICONS_ID!)

  console.log('building....')

  await Promise.all([generateIcons(iconNodesArr), generateImports(iconNodesArr)])

  console.log('Done.')
}

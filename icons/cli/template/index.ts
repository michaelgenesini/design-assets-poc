export const getTemplate = (
  { template }: any,
  opts: any,
  { imports, interfaces, componentName, props, jsx, exports }: any,
) => {
  const typeScriptTpl = template.smart({ plugins: ['tsx', 'typescript'] })

  const openingElementAttributes = (jsx.openingElement.attributes as unknown) as {
    type: 'JSXAttribute'
    name: { type: 'JSXIdentifier'; name: string }
    value: { type: 'StringLiteral'; value: string }
  }[]

  // console.log(jsx)
  // console.log(jsx.openingElement.attributes)
  const width = openingElementAttributes.filter((attr) => attr.name.name === 'width')[0].value.value
  const height = openingElementAttributes.filter((attr) => attr.name.name === 'height')[0].value.value
  const viewbox = openingElementAttributes.filter((attr) => attr.name.name === 'viewBox')[0]

  // console.log({ componentName, viewbox, jsxchildren: jsx.children })

  try {
    return typeScriptTpl.ast`
    /**
     * Do not change! File was auto generate.
     *
     */
    import React from 'react';
    import {
      Circle,
      ClipPath,
      Ellipse,
      G,
      Image,
      Line,
      LinearGradient,
      Mask,
      Path,
      Polygon,
      Polyline,
      RadialGradient,
      Rect,
      Stop,
      Svg,
      Symbol,
      SvgText,
      TextPath,
    } from '@prontopro/ui-toolkit'

    type Props = any

    export const ${componentName} = (props: Props) => (
      ${jsx}
    )
  `
  } catch (error) {
    console.log(error)

    return ''
  }
}

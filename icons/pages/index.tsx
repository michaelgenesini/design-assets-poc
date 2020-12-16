import glob from 'glob-promise'
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import * as Icons from '../source/react'

const Page = ({ icons }: InferGetStaticPropsType<typeof getStaticProps>) => {
  console.log({ icons, Icons })

  return (
    <div>
      <h1>Icons</h1>

      {icons.map((icon) => {
        const Icon = ((Icons as unknown) as any)[icon.name]

        return (
          <div key={icon.absolutePath}>
            <h2>{icon.name}</h2>
            <br />
            {<Icon width={148} height={148} />}
          </div>
        )
      })}
    </div>
  )
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const matches = await glob('source/svg/**/*.svg', { matchBase: true })

  const icons = matches.map((match: string) => ({
    absolutePath: match,
    name: match.replace('source/svg/', '').split('/')[0],
  }))

  return {
    props: {
      icons,
    },
  }
}

export default Page

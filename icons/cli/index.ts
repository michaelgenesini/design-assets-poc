require("dotenv").config()
import chalk from "chalk"
import { pull } from "./pull"

const command = process.argv[2]

const run = async () => {
  console.log("")

  const figmaApiToken = process.env.FIGMA_API_TOKEN
  const figmaFileId = process.env.FIGMA_FILE_ID

  if (!figmaApiToken || !figmaFileId) {
    return
  }

  switch (command) {
    case "pull":
      await pull()

      break

    default:
      console.log(chalk.red('Error. Please specify a command among "pull".'))
      break
  }
}

run().catch((err) => {
  console.error("Unhandled rejection", err)
})

import api from "axios"

const headers = {
  "X-FIGMA-TOKEN": process.env.FIGMA_API_TOKEN,
}

const instanceFiles = api.create({
  baseURL: `https://api.figma.com/v1/files/${process.env.FIGMA_FILE_ID}`,
  headers,
})

const instanceImages = api.create({
  baseURL: `https://api.figma.com/v1/images/${process.env.FIGMA_FILE_ID}`,
  headers,
})

export const getDocument = async () => instanceFiles.get("/")

export const getNode = async (nodeId: string) =>
  instanceFiles.get(`/nodes?ids=${decodeURIComponent(nodeId)}`)

export const getNodeChildren = async (nodeId: string) => {
  const {
    data: { nodes },
  } = await instanceFiles.get(`/nodes?ids=${decodeURIComponent(nodeId)}`)

  return nodes[nodeId].document.children
}

export const getSvgImageUrl = async (nodeId: string) => {
  const {
    data: { images },
  } = await instanceImages.get(`/?ids=${decodeURIComponent(nodeId)}&format=svg`)
  return images[nodeId]
}

export const getImageContent = async (url: string) => api.get(url)

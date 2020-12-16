export type FigmaFile = {
  document: {
    id: string
    name: string
    type: string
    children: {
      id: string
      name: string
      type: string
      children: {}[]
      backgroundColor: {
        a: number
        b: number
        g: number
        r: number
      }
      prototypeStartNodeID: null
      prototypeDevice: {}
    }[]
  }
  components: {}
  schemaVersion: number
  styles: {}
  name: string
  lastModified: string
  thumbnailUrl: string
  version: string
  role: string
}

export type FigmaNode = {
  id: "5:16"
  name: "64-weight-scale"
  type: "COMPONENT"
  blendMode: "PASS_THROUGH"
  children: [[Object]]
  absoluteBoundingBox: { x: -164; y: -402; width: 64; height: 64 }
  constraints: { vertical: "TOP"; horizontal: "LEFT" }
  clipsContent: true
  background: [[Object]]
  fills: [[Object]]
  strokes: []
  strokeWeight: 1
  strokeAlign: "INSIDE"
  backgroundColor: { r: 0; g: 0; b: 0; a: 0 }
  effects: []
}

import {useZustand} from "@/store/useZustand"
import {
  IModelInfo,
  IMultimediaInfo,
  IPage,
  IPageObject,
  ITextInfo,
} from "@/types"
import axios from "axios"
import {toast} from "react-toast"
import {Object3D} from "three"

const addTextInfoToStringify = (
  textInfo: ITextInfo,
  stringify: string
): string => {
  const parse: ITextInfo = { ...JSON.parse(stringify), ...textInfo }
  stringify = JSON.stringify(parse)
  return stringify
}

export const useApi = () => {
  const {
    pageArr,
    addPage,
    selPageId,
    setSelPageId,
    setSelPage,
    removePage,
    pageObjectArr,
    selPageObjectId,
    setSelPageObjectId,
    setPageObject,
    removePageObject,
  } = useZustand()
  const selPage = pageArr.find((v) => v.id === selPageId)
  const nextPageId =
    pageArr[pageArr.findIndex((v) => v.id === selPageId) + 1]?.id
  const selPageObject = pageObjectArr.find((v) => v.id === selPageObjectId)

  const getAll = async () => {
    const res = await axios.get("/getAll")
    return res
  }

  const createNewPage = async () => {
    const newPage: IPage = {}
    const res = await axios.post("/savePage", newPage)
    toast("New page created.")
    newPage.id = res.data.id
    addPage(newPage)
    setSelPageId(newPage.id!)
  }

  const updateSelPageBackground = async (background: string) => {
    if (!selPage) {
      return
    }
    selPage.background = background
    await axios.post("/savePage", selPage)
    toast("Background updated.")
    setSelPage(selPage)
  }

  const deleteSelPageCond = (): boolean => !!selPageId

  const deleteSelPage = async () => {
    if (!selPageId) {
      return
    }
    const res = await axios.delete(`/deletePage/${selPageId}`)
    if (!res.data) {
      return
    }
    toast(`Page ${pageArr.findIndex((v) => v.id === selPageId) + 1} removed.`)
    removePage(selPageId)
    setSelPageId(0)
  }

  const createNewTextToSelPage = async (text: string) => {
    const newPageObject: IPageObject = {
      page_id: selPageId,
      type: "text",
      url: addTextInfoToStringify(
        {
          text,
          color: "#000000",
          fontFamily: `ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`,
          fontWeight: 400,
          fontSize: 96,
          lineHeight: 1,
          letterSpacing: 0,
          textDecorationThickness: 0,
          textAlign: "left",
        },
        "{}"
      ),
    }
    const res = await axios.post("/savePageObject", newPageObject)
    toast("Text created.")
    newPageObject.id = res.data.id
    setPageObject(newPageObject)
    setSelPageObjectId(res.data.id)
  }

  const updateSelTextInfo = (newTextInfo: ITextInfo) => {
    if (selPageObject?.type === "text") {
      selPageObject.url = addTextInfoToStringify(
        newTextInfo,
        selPageObject.url
      )
      setPageObject(selPageObject)
      axios.post("/savePageObject", selPageObject)
    }
  }

  const createNewMultimediaToSelPage = async (
    multimediaInfo: IMultimediaInfo
  ) => {
    if (!selPageId) {
      return
    }
    const newPageObject: IPageObject = {
      page_id: selPageId,
      type: multimediaInfo.type,
      url: multimediaInfo.src,
    }
    const res = await axios.post("/savePageObject", newPageObject)
    toast("Multimedia created.")
    newPageObject.id = res.data.id
    setPageObject(newPageObject)
    setSelPageObjectId(res.data.id)
  }

  const createNewModelToSelPage = async (modelInfo: IModelInfo) => {
    if (!selPageId) {
      return
    }
    const newPageObject: IPageObject = {
      page_id: selPageId,
      type: "model",
      url: modelInfo.modelSrc,
    }

    if (modelInfo.position) {
      const p = modelInfo.position.toString().split(",").map(parseFloat)
      newPageObject.px = p[0]
      newPageObject.py = p[1]
      newPageObject.pz = p[2]
    }

    if (modelInfo.rotation) {
      const r = modelInfo.rotation.toString().split(",").map(parseFloat)
      newPageObject.rx = r[0]
      newPageObject.ry = r[1]
      newPageObject.rz = r[2]
    }

    if (modelInfo.scale) {
      const s = modelInfo.scale.toString().split(",").map(parseFloat)
      newPageObject.sx = s[0]
      newPageObject.sy = s[1]
      newPageObject.sz = s[2]
    }

    if (modelInfo.offset) {
      const o = modelInfo.offset.toString().split(",").map(parseFloat)
      newPageObject.ox = o[0]
      newPageObject.oy = o[1]
      newPageObject.oz = o[2]
    }

    const res = await axios.post("/savePageObject", newPageObject)
    toast("Model created.")
    newPageObject.id = res.data.id
    setPageObject(newPageObject)
    setSelPageObjectId(res.data.id)
  }

  const createNewAudioToSelPage = async (url: string) => {
    if (!selPageId) {
      return
    }
    const newPageObject: IPageObject = {
      page_id: selPageId,
      type: "audio",
      url,
    }
    const res = await axios.post("/savePageObject", newPageObject)
    toast("Audio created.")
    newPageObject.id = res.data.id
    setPageObject(newPageObject)
    setSelPageObjectId(res.data.id)
  }

  const updatePageObjectTransform = (
    pageObject: IPageObject,
    object3D: Object3D
  ) => {
    const position = object3D.position
    const rotation = object3D.rotation
    const scale = object3D.scale
    pageObject.px = position.x
    pageObject.py = position.y
    pageObject.pz = position.z
    pageObject.rx = rotation.x
    pageObject.ry = rotation.y
    pageObject.rz = rotation.z
    pageObject.sx = scale.x
    pageObject.sy = scale.y
    pageObject.sz = scale.z
    axios
      .post("/savePageObject", pageObject)
      .then(() => setPageObject(pageObject))
  }

  const deleteSelPageObjectCond = (): boolean => !!selPageObjectId

  const deleteSelPageObject = async () => {
    if (!selPageObjectId) {
      return
    }
    const res = await axios.delete(`/deletePageObject/${selPageObjectId}`)
    if (!res.data) {
      return
    }
    toast("Page object removed.")
    removePageObject(selPageObjectId)
    setSelPageObjectId(0)
  }

  const duplicateSelPageObjectToNextPageCond = (): boolean =>
    !(!selPageObject || !nextPageId)

  const duplicateSelPageObjectToNextPage = async () => {
    if (!selPageObject || !nextPageId) {
      return
    }
    const nextPageObject: IPageObject = {
      ...selPageObject,
      id: 0,
      page_id: nextPageId,
    }
    const res = await axios.post("/savePageObject", nextPageObject)
    nextPageObject.id = res.data.id
    selPageObject.next_id = res.data.id
    await axios.post("/savePageObject", selPageObject)
    toast("Duplicated to next page.")
    setPageObject(nextPageObject)
    setPageObject(selPageObject)
    setSelPageId(nextPageId)
    setSelPageObjectId(res.data.id)
  }

  return {
    getAll,
    createNewPage,
    updateSelPageBackground,
    deleteSelPageCond,
    deleteSelPage,
    createNewTextToSelPage,
    updateSelTextInfo,
    createNewMultimediaToSelPage,
    createNewModelToSelPage,
    createNewAudioToSelPage,
    updatePageObjectTransform,
    deleteSelPageObjectCond,
    deleteSelPageObject,
    duplicateSelPageObjectToNextPageCond,
    duplicateSelPageObjectToNextPage,
  }
}

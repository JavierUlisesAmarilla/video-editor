import {AudioLoader, LoadingManager, Object3D, TextureLoader} from "three"
import {DRACOLoader} from "three/examples/jsm/loaders/DRACOLoader.js"
import {FBXLoader} from "three/examples/jsm/loaders/FBXLoader.js"
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader.js"
import {clone} from "three/examples/jsm/utils/SkeletonUtils.js"

const assets: { [key: string]: Object3D } = {}

export class Loaders {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  loaders: any

  constructor() {
    this.setLoaders()
  }

  setLoaders() {
    this.loaders = {}
    this.loaders.loadingManager = new LoadingManager()
    this.loaders.dracoLoader = new DRACOLoader(this.loaders.loadingManager)
    this.loaders.dracoLoader.setDecoderPath("/draco/")
    this.loaders.gltfLoader = new GLTFLoader(this.loaders.loadingManager)
    this.loaders.gltfLoader.setDRACOLoader(this.loaders.dracoLoader)
    this.loaders.fbxLoader = new FBXLoader(this.loaders.loadingManager)
    this.loaders.textureLoader = new TextureLoader(this.loaders.loadingManager)
    this.loaders.audioLoader = new AudioLoader()
  }

  async loadAsset(type: string, url: string) {
    if (!type || !url) {
      throw new Error("type and url are required to load asset")
    }

    if (assets[url]) {
      if (type === "glb") {
        return clone(assets[url])
      } else {
        return assets[url]
      }
    }

    let asset

    switch (type) {
      case "glb":
        asset = (await this.loaders.gltfLoader.loadAsync(url)).scene
        break
      case "fbx":
        asset = await this.loaders.fbxLoader.loadAsync(url)
        break
      case "texture":
        asset = await this.loaders.textureLoader.loadAsync(url)
        break
      case "audio":
        asset = await this.loaders.audioLoader.loadAsync(url)
        break
      default:
        throw new Error("invalid asset type")
    }

    assets[url] = asset
    return asset
  }

  async loadAssets(urlArr: { type: string; url: string }[]) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const promiseArr: any[] = []

    urlArr.forEach((child) => {
      if (child.type && child.url) {
        promiseArr.push(this.loadAsset(child.type, child.url))
      }
    })

    await Promise.all(promiseArr)
    return assets
  }
}

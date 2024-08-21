import * as THREE from "three"
import {OrbitControls} from "three/addons/controls/OrbitControls.js"
import {TransformControls} from "three/addons/controls/TransformControls.js"

let instance: Experience
const raycaster = new THREE.Raycaster()
const raycasterObjectArr: THREE.Object3D[] = []
const pointer = new THREE.Vector2()
const onUpPosition = new THREE.Vector2()
const onDownPosition = new THREE.Vector2()

export class Experience {
  container?: HTMLElement
  scene?: THREE.Scene
  camera?: THREE.PerspectiveCamera
  renderer?: THREE.WebGLRenderer
  transformControls?: TransformControls

  constructor(container?: HTMLElement) {
    if (instance) {
      return instance
    }
    // eslint-disable-next-line @typescript-eslint/no-this-alias -- TODO
    instance = this
    if (!container) {
      return instance
    }
    this.container = container
    const containerRect = container.getBoundingClientRect()

    // Scene
    this.scene = new THREE.Scene()
    this.scene.background = new THREE.Color(0xf0f0f0)

    // Camera
    this.camera = new THREE.PerspectiveCamera(
      70,
      containerRect.width / containerRect.height,
      1,
      10000
    )
    this.camera.position.set(0, 250, 1000)
    this.scene.add(this.camera)

    // Light
    this.scene.add(new THREE.AmbientLight(0xf0f0f0, 3))
    const light = new THREE.SpotLight(0xffffff, 4.5)
    light.position.set(0, 1500, 200)
    light.angle = Math.PI * 0.2
    light.decay = 0
    light.castShadow = true
    light.shadow.camera.near = 200
    light.shadow.camera.far = 2000
    light.shadow.bias = -0.000222
    light.shadow.mapSize.width = 1024
    light.shadow.mapSize.height = 1024
    this.scene.add(light)

    // Plane
    const planeGeometry = new THREE.PlaneGeometry(2000, 2000)
    planeGeometry.rotateX(-Math.PI / 2)
    const planeMaterial = new THREE.ShadowMaterial({
      color: 0x000000,
      opacity: 0.2,
    })
    const plane = new THREE.Mesh(planeGeometry, planeMaterial)
    plane.position.y = -200
    plane.receiveShadow = true
    this.scene.add(plane)

    // Helper
    const helper = new THREE.GridHelper(2000, 100)
    helper.position.y = -199
    helper.material.opacity = 0.25
    helper.material.transparent = true
    this.scene.add(helper)

    // Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setSize(containerRect.width, containerRect.height)
    this.renderer.shadowMap.enabled = true
    container.appendChild(this.renderer.domElement)

    // Controls
    const controls = new OrbitControls(this.camera, this.renderer.domElement)

    this.transformControls = new TransformControls(
      this.camera,
      this.renderer.domElement
    )
    this.scene.add(this.transformControls)

    // Event handlers
    controls.addEventListener("change", () => this.render())
    this.transformControls.addEventListener("change", () => this.render())
    this.transformControls.addEventListener("dragging-changed", (event) => {
      controls.enabled = !event.value
    })
    this.transformControls.addEventListener("objectChange", () => {
      console.log("test: objectChange")
    })
    document.addEventListener("pointerdown", (e) => this.onPointerDown(e))
    document.addEventListener("pointerup", (e) => this.onPointerUp(e))
    document.addEventListener("pointermove", (e) => this.onPointerMove(e))
    window.addEventListener("resize", () => this.onResize())

    this.render()
  }

  render() {
    if (!this.renderer || !this.scene || !this.camera) {
      return
    }
    this.renderer.render(this.scene, this.camera)
  }

  onPointerDown(event: PointerEvent) {
    onDownPosition.x = event.clientX
    onDownPosition.y = event.clientY
  }

  onPointerUp(event: PointerEvent) {
    onUpPosition.x = event.clientX
    onUpPosition.y = event.clientY

    if (
      onDownPosition.distanceTo(onUpPosition) === 0 &&
      this.transformControls
    ) {
      this.transformControls.detach()
      this.render()
    }
  }

  onPointerMove(event: PointerEvent) {
    if (!this.container || !this.camera || !this.transformControls) {
      return
    }
    const containerRect = this.container.getBoundingClientRect()
    pointer.x =
      ((event.clientX - containerRect.left) / containerRect.width) * 2 - 1
    pointer.y =
      -((event.clientY - containerRect.top) / containerRect.height) * 2 + 1
    raycaster.setFromCamera(pointer, this.camera)
    const intersects = raycaster.intersectObjects(raycasterObjectArr, false)

    if (intersects.length > 0) {
      const object = intersects[0].object
      if (object !== this.transformControls.object) {
        this.transformControls.attach(object)
      }
    }
  }

  onResize() {
    if (!this.container || !this.camera || !this.renderer) {
      return
    }
    const containerRect = this.container.getBoundingClientRect()
    this.camera.aspect = containerRect.width / containerRect.height
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(containerRect.width, containerRect.height)
    this.render()
  }
}

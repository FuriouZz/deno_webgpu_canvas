import {
  BoxGeometry,
  Mesh,
  Scene,
  MeshNormalMaterial,
  PerspectiveCamera,
  WebGPURenderer,
  OrbitControls,
} from "./deps/three.ts";
import { WebGPUCanvas } from "./mod.ts";

const title = "ThreeJS";
const width = 800;
const height = 600;

const canvas = new WebGPUCanvas({ title, width, height });

const renderer = new WebGPURenderer({ canvas, alpha: false });
await renderer.init();
renderer.setSize(width, height, false);

const scene = new Scene();
const camera = new PerspectiveCamera(75, 800 / 600, 0.1, 1000);
camera.updateProjectionMatrix();
camera.position.z = 5;

const controls = new OrbitControls(camera, canvas);

const cube = new Mesh(new BoxGeometry(1, 1, 1), new MeshNormalMaterial());
scene.add(cube);

canvas.addEventListener("draw", () => {
  controls.update();
  renderer.render(scene, camera);
});

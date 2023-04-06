import * as THREE from 'three';
// import {MyPlaneGeometry} from  "./polify"

const VIEW_W = 200
const VIEW_H = 16
export class Game {
    scene: THREE.Scene;
    camera: THREE.Camera;
    renderer: THREE.Renderer;
    ratio: number;
    constructor(width: number, height: number) {
        this.ratio = width / height
        const scene = new THREE.Scene();
        scene.background = new THREE.Color('#eee')
        this.camera = new THREE.OrthographicCamera(-VIEW_H * this.ratio / 2, VIEW_H * this.ratio / 2, -VIEW_H / 2, VIEW_H / 2, 0.1, 1000)
        this.camera.position.z = 100
        // const helper = new THREE.CameraHelper(this.camera);
        // scene.add(helper);
        this.camera.lookAt(new THREE.Vector3(0, 0, 0))
        const light = new THREE.AmbientLight(0x404040); // soft white light
        scene.add(light);

        scene.add(this.addGridSystem(Math.floor(VIEW_H * this.ratio), VIEW_H))
        this.renderer = new THREE.WebGLRenderer()
        this.renderer.setSize(width, height)
        this.scene = scene
    }
    addGridSystem(width: number, height: number) {
        // const gridMesh = new THREE.Mesh(
        //     new THREE.PlaneGeometry(width, height, width, height),
        //     new THREE.MeshBasicMaterial({ color: 0xffff00, wireframe: true })
        // )
        // return gridMesh
        console.log('xx add grid', width, height)
        var planeGeom = new THREE.PlaneGeometry(width, height, width, height)
        let segmentsX = planeGeom.parameters.widthSegments || 10;
        let segmentsY = planeGeom.parameters.heightSegments || 10;
        let indices = [];
        for (let i = 0; i < segmentsY + 1; i++) {
            let index11 = 0;
            let index12 = 0;
            for (let j = 0; j < segmentsX; j++) {
                index11 = (segmentsX + 1) * i + j;
                index12 = index11 + 1;
                let index21 = index11;
                let index22 = index11 + (segmentsX + 1);
                indices.push(index11, index12);
                if (index22 < ((segmentsX + 1) * (segmentsY + 1) - 1)) {
                    indices.push(index21, index22);
                }
            }
            if ((index12 + segmentsX + 1) <= ((segmentsX + 1) * (segmentsY + 1) - 1)) {
                indices.push(index12, index12 + segmentsX + 1);
            }
        }
        planeGeom.setIndex(indices)
        var gridPlane = new THREE.LineSegments(planeGeom, new THREE.LineBasicMaterial({ color: "pink" }));
        return gridPlane
    }
    play() {
        const { renderer, scene, camera, play } = this
        renderer.render(scene, camera);
        requestAnimationFrame(play.bind(this));
    }
    test() {
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const cube = new THREE.Mesh(geometry, material);
        this.scene.add(cube);
    }
}

function addGridSystem(width: number, height: number) {
    const gridMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(width, height),
        new THREE.MeshBasicMaterial({ color: 0xffff00, wireframe: true })
    )
    return gridMesh
}
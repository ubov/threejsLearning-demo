import * as THREE from 'three'
export class MyPlaneGeometry extends THREE.PlaneGeometry {
    constructor() {
        super(...arguments)
    }
    toGrid() {
        let segmentsX = this.parameters.widthSegments || 1;
        let segmentsY = this.parameters.heightSegments || 1;
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
        this.setIndex(indices);
        return this;
    }
}
import { TextureLoader } from "three";
export default function loadTexture(url, onLoad) {
    return new Promise((resolve, reject) => {
        new TextureLoader().load(url, (tex) => {
            onLoad?.(tex);
            resolve(tex);
        }, undefined, reject);
    });
}

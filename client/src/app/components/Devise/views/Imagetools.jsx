// import EXIF from 'exif-js';

// const hasBlobConstructor = typeof (Blob) !== 'undefined' && (function checkBlobConstructor() {
//     try {
//         return Boolean(new Blob());
//     } catch (error) {
//         return false;
//     }
// }());

// const hasArrayBufferViewSupport = hasBlobConstructor && typeof (Uint8Array) !== 'undefined' && (function checkArrayBufferView() {
//     try {
//         return new Blob([new Uint8Array(100)]).size === 100;
//     } catch (error) {
//         return false;
//     }
// }());

// const hasToBlobSupport = (typeof HTMLCanvasElement !== 'undefined' ? HTMLCanvasElement.prototype.toBlob : false);

// const hasBlobSupport = (hasToBlobSupport || (typeof Uint8Array !== 'undefined' && typeof ArrayBuffer !== 'undefined' && typeof atob !== 'undefined'));

// const hasReaderSupport = (typeof FileReader !== 'undefined' || typeof URL !== 'undefined');

// const hasCanvasSupport = (typeof HTMLCanvasElement !== 'undefined');

// export default class ImageTools {

//     constructor() {
//         this.browserSupport = this.isSupportedByBrowser();
//     }

//     isSupportedByBrowser = () => (hasCanvasSupport && hasBlobSupport && hasReaderSupport);

//     resize = (file, maxDimensions) => new Promise((resolve) => {

//         if (!this.browserSupport || !file.type.match(/image.*/)) return resolve(file);  // early exit - not supported

//         if (file.type.match(/image\/gif/)) return resolve(file); // early exit - could be an animated gif

//         const image = document.createElement('img');

//         image.onload = () => {
//             let width  = image.width;
//             let height = image.height;

//             if (width >= height && width > maxDimensions.width) {
//                 height *= maxDimensions.width / width;
//                 width = maxDimensions.width;
//             } else if (height > maxDimensions.height) {
//                 width *= maxDimensions.height / height;
//                 height = maxDimensions.height;
//             } else return resolve(file); // early exit; no need to resize

//             EXIF.getData(image, () => {
//                 const orientation = EXIF.getTag(image, 'Orientation');
//                 const imageCanvas = this.drawImageToCanvas(image, orientation, 0, 0, width, height, 'contain');
//                 if (hasToBlobSupport) imageCanvas.toBlob(blob => resolve(blob), file.type);
//                 else resolve(this.toBlob(imageCanvas, file.type));
//             });
//         };

//         this.loadImage(image, file);

//         return true;
//     });

//     crop = (file, dimensions) => new Promise((resolve) => {

//         if (!this.browserSupport || !file.type.match(/image.*/)) return resolve(file); // early exit - not supported

//         if (file.type.match(/image\/gif/)) return resolve(file); // early exit - could be an animated gif

//         const image = document.createElement('img');

//         image.onload = () => {

//             if (dimensions.width > image.width && dimensions.height > image.height) return resolve(file); // early exit - no need to resize

//             const width = Math.min(dimensions.width, image.width);
//             const height = Math.min(dimensions.height, image.height);

//             if (image.width > dimensions.width * 2 || image.height > dimensions.height * 2) {
//                 return this.resize(file, { width: dimensions.width * 2, height: dimensions.height * 2 }).then((zoomedOutImage) => {
//                     this.crop(zoomedOutImage, { width, height }).then(resolve);
//                 });
//             }

//             EXIF.getData(image, () => {
//                 const orientation = EXIF.getTag(image, 'Orientation');
//                 const imageCanvas = this.drawImageToCanvas(image, orientation, 0, 0, width, height, 'crop');
//                 if (hasToBlobSupport) imageCanvas.toBlob(blob => resolve(blob), file.type);
//                 else resolve(this.toBlob(imageCanvas, file.type));
//             });
//         };

//         this.loadImage(image, file);

//         return true;
//     });

//     drawImageToCanvas = (img, orientation = 1, x = 0, y = 0, width = img.width, height = img.height, method = 'contain') => {
//         const canvas = document.createElement('canvas');
//         const ctx = canvas.getContext('2d');

//         canvas.width = width;
//         canvas.height = height;

//         ctx.save();
//         switch (Number(orientation)) {
//             // explained here: https://i.stack.imgur.com/6cJTP.gif
//             case 1:
//                 break;

//             case 2:
//                 ctx.translate(width, 0);
//                 ctx.scale(-1, 1);
//                 break;

//             case 3:
//                 ctx.translate(width, height);
//                 ctx.rotate((180 / 180) * Math.PI); // 180/180 is 1? No shit, but how else will you know its need 180 rotation?
//                 break;

//             case 4:
//                 ctx.translate(0, height);
//                 ctx.scale(1, -1);
//                 break;

//             case 5:
//                 canvas.width = height;
//                 canvas.height = width;
//                 ctx.rotate((90 / 180) * Math.PI);
//                 ctx.scale(1, -1);
//                 break;

//             case 6:
//                 canvas.width = height;
//                 canvas.height = width;
//                 ctx.rotate((90 / 180) * Math.PI);
//                 ctx.translate(0, -height);
//                 break;

//             case 7:
//                 canvas.width = height;
//                 canvas.height = width;
//                 ctx.rotate((270 / 180) * Math.PI);
//                 ctx.translate(-width, height);
//                 ctx.scale(1, -1);
//                 break;

//             case 8:
//                 canvas.width = height;
//                 canvas.height = width;
//                 ctx.translate(0, width);
//                 ctx.rotate((270 / 180) * Math.PI);
//                 break;

//             default:
//                 break;
//         }

//         if (method === 'crop') ctx.drawImage(img, (img.width / 2) - (width / 2), (img.height / 2) - (height / 2), width, height, 0, 0, width, height);
//         else ctx.drawImage(img, x, y, width, height);
//         ctx.restore();

//         return canvas;
//     };

//     toBlob = (canvas, type) => {
//         const dataURI = canvas.toDataURL(type);
//         const dataURIParts = dataURI.split(',');
//         let byteString;
//         if (dataURIParts[0].indexOf('base64') >= 0) {
//             byteString = atob(dataURIParts[1]);
//         } else {
//             byteString = decodeURIComponent(dataURIParts[1]);
//         }
//         const arrayBuffer = new ArrayBuffer(byteString.length);
//         const intArray = new Uint8Array(arrayBuffer);

//         for (let i = 0; i < byteString.length; i += 1) {
//             intArray[i] = byteString.charCodeAt(i);
//         }

//         const mimeString = dataURIParts[0].split(':')[1].split(';')[0];
//         let blob = null;

//         if (hasBlobConstructor) {
//             blob = new Blob([hasArrayBufferViewSupport ? intArray : arrayBuffer], { type: mimeString });
//         } else {
//             const bb = new Blob();
//             bb.append(arrayBuffer);
//             blob = bb.getBlob(mimeString);
//         }

//         return blob;
//     };

//     loadImage = (image, file) => {
//         if (typeof (URL) === 'undefined') {
//             const reader = new FileReader();
//             reader.onload = (event) => {
//                 image.src = event.target.result;
//             };
//             reader.readAsDataURL(file);
//         } else {
//             image.src = URL.createObjectURL(file);
//         }
//     };

// }

let hasBlobConstructor = typeof(Blob) !== 'undefined' && (function () {
    try {
        return Boolean(new Blob());
    } catch (e) {
        return false;
    }
}());

let hasArrayBufferViewSupport = hasBlobConstructor && typeof(Uint8Array) !== 'undefined' && (function () {
    try {
        return new Blob([new Uint8Array(100)]).size === 100;
    } catch (e) {
        return false;
    }
}());

let hasToBlobSupport = (typeof HTMLCanvasElement !== "undefined" ? HTMLCanvasElement.prototype.toBlob : false);

let hasBlobSupport = (hasToBlobSupport || (typeof Uint8Array !== 'undefined' && typeof ArrayBuffer !== 'undefined' && typeof atob !== 'undefined'));

let hasReaderSupport = (typeof FileReader !== 'undefined' || typeof URL !== 'undefined');

export default class ImageTools {
    static resize(file, maxDimensions, callback) {
        if (typeof maxDimensions === 'function') {
            callback = maxDimensions;
            maxDimensions = {
                width: 100,
                height: 100
            };
        }

        let maxWidth  = maxDimensions.width;
        let maxHeight = maxDimensions.height;

        if (!ImageTools.isSupported() || !file.type.match(/image.*/)) {
            callback(file, false);
            return false;
        }

        if (file.type.match(/image\/gif/)) {
            // Not attempting, could be an animated gif
            callback(file, false);
            // TODO: use https://github.com/antimatter15/whammy to convert gif to webm
            return false;
        }

        let image = document.createElement('img');
            
        image.onload = (imgEvt) => {
            let width  = image.width;
            let height = image.height;
            let isTooLarge = false;

            if (width >= height && width > maxDimensions.width) {
                // width is the largest dimension, and it's too big.
                height *= maxDimensions.width / width;
                width = maxDimensions.width;
                isTooLarge = true;
            } else if (height > maxDimensions.height) {
                // either width wasn't over-size or height is the largest dimension
                // and the height is over-size
                width *= maxDimensions.height / height;
                height = maxDimensions.height;
                isTooLarge = true;
            }

            if (!isTooLarge) {
                // early exit; no need to resize
                callback(file, false);
                return;
            }

            let canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;

            let ctx = canvas.getContext('2d');
            ctx.drawImage(image, 0, 0, width, height);

            if (hasToBlobSupport) {
                canvas.toBlob((blob) => {
                    callback(blob, true);
                }, file.type);
            } else {
                let blob = ImageTools._toBlob(canvas, file.type);
                callback(blob, true);
            }
        };
        ImageTools._loadImage(image, file);

        return true;
    }

    static _toBlob(canvas, type) {
        let dataURI = canvas.toDataURL(type);
        let dataURIParts = dataURI.split(',');
        let byteString;
        if (dataURIParts[0].indexOf('base64') >= 0) {
            // Convert base64 to raw binary data held in a string:
            byteString = atob(dataURIParts[1]);
        } else {
            // Convert base64/URLEncoded data component to raw binary data:
            byteString = decodeURIComponent(dataURIParts[1]);
        }
        let arrayBuffer = new ArrayBuffer(byteString.length);
        let intArray = new Uint8Array(arrayBuffer);

        for (let i = 0; i < byteString.length; i += 1) {
            intArray[i] = byteString.charCodeAt(i);
        }

        let mimeString = dataURIParts[0].split(':')[1].split(';')[0];
        let blob = null;

        if (hasBlobConstructor) {
            blob = new Blob(
                [hasArrayBufferViewSupport ? intArray : arrayBuffer],
                {type: mimeString}
            );
        } else {
            let bb = new Blob();
            bb.append(arrayBuffer);
            blob = bb.getBlob(mimeString);
        }

        return blob;
    }

    static _loadImage(image, file, callback) {
        if (typeof(URL) === 'undefined') {
            let reader = new FileReader();
            reader.onload = function(evt) {
                image.src = evt.target.result;
                if (callback) { callback(); }
            }
            reader.readAsDataURL(file);
        } else {
            image.src = URL.createObjectURL(file);
            if (callback) { callback(); }
        }
    };

    static isSupported() {
        return (
               (typeof(HTMLCanvasElement) !== 'undefined') 
            && hasBlobSupport
            && hasReaderSupport
        );
    }
}
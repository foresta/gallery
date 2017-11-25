import Gesture from "./js/gesture"

let galleryNodes = document.querySelectorAll(".gallery")
Array.from(galleryNodes).forEach((node) => {
    new Gesture(node)
});


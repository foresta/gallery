//import { Gesture, GestureHandler } from "./js/gesture"
import Gesture, { GestureHandler } from "./js/gesture.js"

let galleryNodes = document.querySelectorAll(".gallery")
Array.from(galleryNodes).forEach((node) => {
    new Gesture(node)
});

let handler = new GestureHandler()
handler.test()


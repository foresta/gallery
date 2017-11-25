/*
 * handle touch gesture
 */

export default class Gesture
{
    constructor (baseNode) {
        this.baseNode = baseNode
        this.initialize()
    }

    initialize()
    {
        this.baseNode.addEventListener('touchstart', function(event) {
            console.log('touchstart'); 
        });

        this.baseNode.addEventListener('touchmove', function(event) {
            console.log('touchmove');
        });

        this.baseNode.addEventListener('touchend', function(event) {
            console.log('touchend');
        });
    }
}

export class GestureHandler
{
    test() { console.log("handler test"); } 
}


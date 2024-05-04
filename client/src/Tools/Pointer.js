import Tool from "./Tool";
import {sendMessage} from "../Handlers/SendHandler";
import canvasState from "../Store/CanvasState";

class Pointer extends Tool{

    shapes = document.querySelectorAll('line, rect, ellipse');
    isMouseDown = false;

    constructor(canvas, socket, id) {
        super(canvas, socket, id);
        this.Listen()
    }

    Listen(){
        this.canvas.onmouseup = this.MouseUpHandler.bind(this);
        this.canvas.onmousemove = this.MouseMoveHandler.bind(this);

        this.shapes.forEach(shape => {
            shape.addEventListener('mousedown', (e) => {
                this.shape = shape;
                console.log(this.shape)
                this.startCoords = this.getPoint(e)
                e.stopPropagation()
                this.isMouseDown = true;
            });
        });
    }

    MouseUpHandler() {
        this.isMouseDown = false;
    }

    MouseMoveHandler(e) {
        if (this.isMouseDown) {
            const endCoords = this.getPoint(e)
            const dx = endCoords.x - this.startCoords.x;
            const dy = endCoords.y - this.startCoords.y;
            sendMessage(canvasState.socket, {
                method: 'draw',
                id: this.id,
                figure: {
                    type: 'move',
                    shapeId: this.shape.id,
                    dx: dx,
                    dy: dy,
                }
            })
            this.startCoords = endCoords;
        }
    }

}

export default Pointer;
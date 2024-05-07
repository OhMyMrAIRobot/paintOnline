import Tool from "./Tool";
import {sendMessage} from "../Handlers/SendHandler";
import canvasState from "../Store/CanvasState";
import Line from "./Line";
import Rectangle from "./Rectangle";
import Ellipse from "./Ellipse";
import Text from "./Text";

class Hand extends Tool{

    shapes = document.querySelectorAll('line, rect, ellipse, text');
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
                this.shapeType = this.shape.id.substring(0, 4);
                this.startCoords = this.getPoint(e);
                this.curCoords = this.startCoords;
                this.isMouseDown = true;
            });
        });
    }

    MouseUpHandler() {
        this.isMouseDown = false;
        sendMessage(canvasState.socket, {
            method: 'draw',
            id: this.id,
            figure: {
                type: 'move',
                shapeId: this.shape.id,
                dx: this.endCoords.x - this.startCoords.x,
                dy: this.endCoords.y - this.startCoords.y,
            }
        })
        Hand.moveShape(this.shapeType, this.shape, this.startCoords.x - this.endCoords.x, this.startCoords.y - this.endCoords.y);
    }

    MouseMoveHandler(e) {
        if (this.isMouseDown) {
            this.endCoords = this.getPoint(e)
            const dx = this.endCoords.x - this.curCoords.x;
            const dy = this.endCoords.y - this.curCoords.y;
            Hand.moveShape(this.shapeType, this.shape, dx, dy);
            this.curCoords = this.endCoords;
        }
    }

    static moveShape(shapeType, shape, dx, dy) {
        switch (shapeType) {
            case 'Line':
                Line.moveShape(shape, dx, dy);
                break;
            case 'Rect':
                Rectangle.moveShape(shape, dx, dy);
                break;
            case 'Elli':
                Ellipse.moveShape(shape, dx, dy);
                break;
            case 'Text':
                Text.moveShape(shape, dx, dy);
                break;
            default:
                break;
        }
    }
}

export default Hand;
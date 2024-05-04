import Brush from "../Tools/Brush";
import Eraser from "../Tools/Eraser";
import Line from "../Tools/Line";
import Rectangle from "../Tools/Rectangle";
import Square from "../Tools/Square";
import Circle from "../Tools/Circle";
import Ellipse from "../Tools/Ellipse";
import Text from "../Tools/Text";
import {sendMessage} from "./SendHandler";
import canvasState from "../Store/CanvasState";

export const drawHandler = (msg) => {
    const figure = msg.figure;
   // const ctx = Canvas.getContext('2d');
    switch (figure.type){
        case "brush":
      //      Brush.Draw(ctx, figure.x, figure.y, figure.strokeColor,figure.lineWidth);
            break;
        case "eraser":
      //      Eraser.Draw(ctx, figure.x, figure.y, figure.lineWidth);
            break;
        case "line":
            Line.StaticDraw(canvasState.canvas,figure.id,figure.xS, figure.yS, figure.xF, figure.yF, figure.strokeWidth, figure.strokeColor);
            break;
        case "rectangle":
            Rectangle.StaticDraw(canvasState.canvas,figure.id,figure.xS, figure.yS, figure.xF, figure.yF, figure.strokeWidth, figure.strokeColor, figure.fillColor);
            break;
        case "square":
        //    Square.StaticDraw(ctx, figure.x, figure.y, figure.width, figure.height, figure.strokeColor, figure.fillColor, figure.lineWidth);
        //    ctx.beginPath();
            break;
        case "circle":
        //    Circle.StaticDraw(ctx, figure.x, figure.y, figure.radius, figure.strokeColor, figure.fillColor, figure.lineWidth);
        //    ctx.beginPath();
            break;
        case "ellipse":
        //    Ellipse.StaticDraw(ctx, figure.x, figure.y, figure.rx, figure.ry, figure.strokeColor, figure.fillColor, figure.lineWidth);
         //   ctx.beginPath();
            break;
        case "text":
         //   Text.Draw(ctx, figure.x, figure.y, figure.text, figure.font,figure.fillColor);
         //   sendMessage(canvasState.socket,{id: canvasState.session, method: 'saveCanvas', data: canvasState.canvas.toDataURL()})
          //  ctx.beginPath();
            break;
        case 'finish':
          //  ctx.beginPath();
            break;
        case 'move':
            const shape = document.getElementById(figure.shapeId);
            if (figure.shapeId.startsWith('Line'))
                Line.moveShape(shape, figure.dx, figure.dy);
            else if (figure.shapeId.startsWith('Rect'))
                Rectangle.moveShape(shape, figure.dx, figure.dy);
            break
        default:
            break;
    }
}
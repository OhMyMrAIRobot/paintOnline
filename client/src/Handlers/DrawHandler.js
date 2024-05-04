import Brush from "../Tools/Brush";
import Eraser from "../Tools/Eraser";
import Line from "../Tools/Line";
import Rect from "../Tools/Rect";
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
            console.log(figure);
            Line.StaticDraw(canvasState.canvas,figure.id, figure.xS, figure.yS, figure.xF, figure.yF, figure.strokeWidth, figure.strokeColor);
            break;
        case "rectangle":
       //     Rect.StaticDraw(ctx, figure.x, figure.y, figure.width, figure.height, figure.strokeColor, figure.fillColor, figure.lineWidth);
         //   ctx.beginPath();
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
        default:
            break;
    }
}
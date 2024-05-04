import Line from "../Tools/Line";
import Rectangle from "../Tools/Rectangle";
import Square from "../Tools/Square";
import Circle from "../Tools/Circle";
import Ellipse from "../Tools/Ellipse";
import canvasState from "../Store/CanvasState";
import Brush from "../Tools/Brush";

export const drawHandler = (msg) => {
    const figure = msg.figure;
   // const ctx = Canvas.getContext('2d');
    switch (figure.type){
        case "brushStart":
            const line = document.createElementNS("http://www.w3.org/2000/svg", "path");
            line.id = figure.id;
            line.setAttributeNS(null, 'd', 'M ' + figure.x + ' ' + figure.y);
            canvasState.canvas.appendChild(line);
            break;
        case "brushDraw":
            Brush.Draw(canvasState.canvas, figure.id, figure.x, figure.y, figure.strokeWidth, figure.strokeColor);
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
            Square.StaticDraw(canvasState.canvas, figure.id, figure.x, figure.y, figure.side, figure.strokeWidth, figure.strokeColor, figure.fillColor);
            break;
        case "circle":
            Circle.StaticDraw(canvasState.canvas, figure.id, figure.x, figure.y, figure.r, figure.strokeWidth, figure.strokeColor, figure.fillColor);
            break;
        case "ellipse":
           Ellipse.StaticDraw(canvasState.canvas,figure.id, figure.xS, figure.yS, figure.xF, figure.yF, figure.strokeWidth, figure.strokeColor, figure.fillColor);
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
            const shapeType = figure.shapeId.substring(0, 4); // Получаем тип фигуры из shapeId
            const shape = document.getElementById(figure.shapeId);
            switch (shapeType) {
                case 'Line':
                    Line.moveShape(shape, figure.dx, figure.dy);
                    break;
                case 'Rect':
                    Rectangle.moveShape(shape, figure.dx, figure.dy);
                    break;
                case 'Elli':
                    Ellipse.moveShape(shape, figure.dx, figure.dy);
                    break;
                default:
                    break;
            }
            break
        default:
            break;
    }
}
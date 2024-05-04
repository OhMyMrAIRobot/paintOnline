import toolState from "../Store/ToolState";
import canvasState from "../Store/CanvasState";
import Circle from "../Tools/Circle";
import Square from "../Tools/Square";

export const InitializeTools = () => {
    toolState.setTool(new Circle(canvasState.canvas, canvasState.socket, canvasState.session));
    toolState.setFillColor("#FFFFFF");
    toolState.setStrokeColor("#000000");
    toolState.setLineWidth(5);
    toolState.setFont("16px Arial");
}
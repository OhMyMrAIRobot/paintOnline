import toolState from "../Store/ToolState";
import canvasState from "../Store/CanvasState";
import Ellipse from "../Tools/Ellipse";

export const InitializeTools = () => {
    toolState.setTool(new Ellipse(canvasState.canvas, canvasState.socket, canvasState.session));
    toolState.setFillColor("#FFFFFF");
    toolState.setStrokeColor("#000000");
    toolState.setLineWidth(5);
    toolState.setFont("16px Arial");
}
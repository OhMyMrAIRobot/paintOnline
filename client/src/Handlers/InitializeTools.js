import toolState from "../Store/ToolState";
import canvasState from "../Store/CanvasState";
import Rectangle from "../Tools/Rectangle";

export const InitializeTools = () => {
    toolState.setTool(new Rectangle(canvasState.canvas, canvasState.socket, canvasState.session));
    toolState.setFillColor("#FFFFFF");
    toolState.setStrokeColor("#000000");
    toolState.setLineWidth(5);
    toolState.setFont("16px Arial");
}
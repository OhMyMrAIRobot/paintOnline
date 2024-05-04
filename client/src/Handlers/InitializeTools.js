import toolState from "../Store/ToolState";
import canvasState from "../Store/CanvasState";
import Line from "../Tools/Line";

export const InitializeTools = () => {
    toolState.setTool(new Line(canvasState.canvas, canvasState.socket, canvasState.session));
    toolState.setFillColor("#FFFFFF");
    toolState.setStrokeColor("#000000");
    toolState.setLineWidth(1);
    toolState.setFont("16px Arial");
}
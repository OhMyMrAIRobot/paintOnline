import toolState from "../Store/ToolState";
import brush from "../Tools/Brush";
import canvasState from "../Store/CanvasState";

export const InitializeTools = () => {
    toolState.setTool(new brush(canvasState.canvas, canvasState.socket, canvasState.session));
    toolState.setFillColor("#FFFFFF");
    toolState.setStrokeColor("#000000");
    toolState.setLineWidth(1);
    toolState.setFont("16px Arial");
}
import toolState from "../Store/ToolState";
import canvasState from "../Store/CanvasState";
import Pointer from "../Tools/Pointer";

export const InitializeTools = () => {
    toolState.setTool(new Pointer(canvasState.canvas, canvasState.socket, canvasState.session), "Pointer");
    toolState.setFillColor("#FFFFFF");
    toolState.setStrokeColor("#000000");
    toolState.setStrokeWidth(1);
    toolState.setFontSize('16px')
    toolState.setFontFamily("Arial");
}
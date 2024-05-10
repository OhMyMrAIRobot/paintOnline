import toolState from "../Store/ToolState";
import canvasState from "../Store/CanvasState";
import Brush from "../Tools/Brush";

export const InitializeTools = () => {
    toolState.setTool(new Brush(canvasState.canvas, canvasState.socket, canvasState.session), "Brush");
    toolState.setFillColor("#FFFFFF");
    toolState.setStrokeColor("#000000");
    toolState.setStrokeWidth(1);
    toolState.setFontSize('16px')
    toolState.setFontFamily("Arial");
}
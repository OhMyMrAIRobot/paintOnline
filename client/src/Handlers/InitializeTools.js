import toolState from "../Store/ToolState";
import canvasState from "../Store/CanvasState";
import Eraser from "../Tools/Eraser";
import Text from "../Tools/Text"

export const InitializeTools = () => {
    toolState.setTool(new Text(canvasState.canvas, canvasState.socket, canvasState.session));
    toolState.setFillColor("#FFFFFF");
    toolState.setStrokeColor("#000000");
    toolState.setStrokeWidth(5);
    toolState.setFontSize('16px')
    toolState.setFontFamily("Arial");
}
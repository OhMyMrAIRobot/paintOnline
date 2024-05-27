import {makeAutoObservable} from "mobx";
import canvasState from "./CanvasState";

class ToolState {
    tool = null;
    toolType = "";

    constructor() {
        makeAutoObservable(this)
    }

    setTool(tool, type){
        this.tool = tool;
        canvasState.setCurFigure(null);
        this.toolType = type;
    }

    setFillColor(color){
        this.fillColor = color;
    }

    setStrokeColor(color){
        this.strokeColor = color;
    }

    setStrokeWidth(width) {
        this.strokeWidth = width
    }

    setFontSize(fontSize){
        this.fontSize = fontSize;
    }

    setFontFamily(fontFamily) {
        this.fontFamily = fontFamily;
    }
}

export default new ToolState();

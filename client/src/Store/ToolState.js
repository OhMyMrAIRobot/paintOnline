import {makeAutoObservable} from "mobx";

class ToolState {
    tool = null;

    constructor() {
        makeAutoObservable(this)
    }

    setTool(tool){
        this.tool = tool;
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

export const changeFigureParams = (id, strokeWidth, stroke, fill, fontSize, fontFamily, text) => {
    const shape = document.getElementById(id);
    console.log(shape);
    if (shape.getAttributeNS(null, 'stroke')) {
        shape.setAttributeNS(null, 'stroke-width', strokeWidth);
    }
    if (shape.getAttributeNS(null, 'stroke')) {
        shape.setAttributeNS(null, 'stroke', stroke);
    }
    if (shape.getAttributeNS(null, 'fill')) {
        shape.setAttributeNS(null, 'fill', fill);
    }
    if (shape.getAttributeNS(null, 'font-size')) {
        shape.setAttributeNS(null, 'font-size', fontSize + 'px');
    }
    if (shape.getAttributeNS(null, 'font-family')) {
        shape.setAttributeNS(null, 'font-family', fontFamily);
    }
    if (shape.textContent !== "")
        shape.textContent = text;
}
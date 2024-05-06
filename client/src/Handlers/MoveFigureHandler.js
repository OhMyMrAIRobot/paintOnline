import Line from "../Tools/Line";
import Rectangle from "../Tools/Rectangle";
import Ellipse from "../Tools/Ellipse";
import Text from "../Tools/Text";

export const MoveFigureHandler = (shapeType, shape, dx, dy) => {
    switch (shapeType) {
        case 'Line':
            Line.moveShape(shape, dx, dy);
            break;
        case 'Rect':
            Rectangle.moveShape(shape, dx, dy);
            break;
        case 'Elli':
            Ellipse.moveShape(shape, dx, dy);
            break;
        case 'Text':
            Text.moveShape(shape, dx, dy);
            break;
        default:
            break;
    }
}
import canvasState from "../Store/CanvasState";
import axios from "axios";

export const InitialiseCanvas = (Canvas, setWidth, setHeight, Username, id) => {
    axios.get(`http://localhost:3000/initialise?id=${id}`).then(response => {
        canvasState.setWidth(response.data.width);
        canvasState.setHeight(response.data.height);
        canvasState.setBackground(response.data.color);
        const dataUrl = response.data.url;

        // загрузка изображения полотна
        if (dataUrl !== ''){
            let ctx = Canvas.getContext('2d');
            const img = new Image()
            img.src = dataUrl;
            img.onload = () => {
                ctx.clearRect(0, 0, Canvas.width, Canvas.height)
                ctx.drawImage(img, 0, 0, response.data.urlWidth, response.data.urlHeight);
            }
        }

        // изменение размеров в тулбаре
        setWidth(response.data.width);
        setHeight(response.data.height);

        // прочие настройки
        canvasState.setUsername(Username);
        document.title = `${id} | ${canvasState.username}`;
        }
    )
}
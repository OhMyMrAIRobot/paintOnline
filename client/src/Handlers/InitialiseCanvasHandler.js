import canvasState from "../Store/CanvasState";

export const InitialiseCanvas = (canvasUrl, Canvas, setWidth, setHeight, Username, params) => {
    canvasState.socket.onmessage = (event) => {
        let msg = JSON.parse(event.data);

        // инициализация параметров полотна
        if (msg.method === 'initialise') {
            canvasState.setWidth(msg.width);
            canvasState.setHeight(msg.height);
            canvasState.setBackground(msg.color);

            // загрузка изображения полотна
            if (canvasUrl !== 'init'){
                let ctx = Canvas.getContext('2d');
                const img = new Image()
                img.src = canvasUrl;
                img.onload = () => {
                    ctx.clearRect(0, 0, Canvas.width, Canvas.height)
                    ctx.drawImage(img, 0, 0, Canvas.width, Canvas.height)
                }
            }

            // изменение размеров в тулбаре
            setWidth(msg.width);
            setHeight(msg.height);

            // прочие настройки
            canvasState.setUsername(Username);
            document.title = `${params.id} | ${canvasState.username}`;
        }
    }
}
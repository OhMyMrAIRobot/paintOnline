import canvasState from "../Store/CanvasState";

export const InitialiseCanvas = (canvasUrl, CanvasRef, setWidth, setHeight, UsernameRef, params) => {
    canvasState.socket.onmessage = (event) => {
        let msg = JSON.parse(event.data);

        if (msg.method === 'initialise') {
            canvasState.setWidth(msg.width);
            canvasState.setHeight(msg.height);
            canvasState.setBackground(msg.color);

            if (canvasUrl !== 'init'){
                let ctx = CanvasRef.current.getContext('2d');
                const img = new Image()
                img.src = canvasUrl;
                img.onload = () => {
                    ctx.clearRect(0, 0, CanvasRef.current.width, CanvasRef.current.height)
                    ctx.drawImage(img, 0, 0, CanvasRef.current.width, CanvasRef.current.height)
                }
            }

            setWidth(msg.width);
            setHeight(msg.height);
            canvasState.setUsername(UsernameRef.current.value);
            document.title = `${params.id} | ${canvasState.username}`;
        }
    }
}
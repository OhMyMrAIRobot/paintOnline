const express = require('express');
const app = express();
const WSserver = require('express-ws')(app);
const aWss = WSserver.getWss();
const PORT = 3000;

app.ws('/', (ws,req) => {
    ws.on('message', (msg) => {
        msg = JSON.parse(msg);
        switch (msg.method){
            case 'connection':
                connectionHandler(ws, msg);
                break;
            case 'draw':
                connectionHandler(ws, msg);
                break;
            case 'createRoom':
                createRoomHandler(ws, msg);
                break;
            case 'join':
                joinHandler(ws, msg);
                break;
            case 'pushUndo':
                saveCanvasHandler(ws,msg);
                broadcastConnection(ws,msg);
                break;
            case 'undo':
                broadcastConnection(ws,msg);
                break;
            case 'redo':
                broadcastConnection(ws,msg);
                break;
            case 'changeResolution':
                changeResolutionHandler(ws,msg);
                break;
            case 'changeBackground':
                changeBackgroundHandler(ws, msg);
                break;
            case 'initialise':
                initialiseCanvasHandler(ws,msg);
                break;
            case 'message':
                broadcastConnection(ws, msg);
                break;
            case "close":
                broadcastConnection(ws, msg);
                break;
            case 'saveCanvas':
                saveCanvasHandler(ws,msg);
                break;
            case 'getCanvas':
                getCanvasHandler(ws, msg);
                break;
        }
    })
})

app.listen(PORT, () => console.log(`server is working on ${PORT}`))

let RoomsArr = [];
let ConfigArr = [];

const getCanvasHandler = (ws, msg) => {
    let pos = ConfigArr.indexOf(msg.id);
    const mess = {
        method: 'getCanvas',
        url: ConfigArr[pos + 1].url,
    }
    ws.send(JSON.stringify(mess))
}

const createRoomHandler = (ws, msg) => {
    ConfigArr.push(msg.id);
    ConfigArr.push({width: 1280, height: 360, color: "#FFFFFF", url: "init"});
    RoomsArr.push(JSON.stringify(msg.id));
}

const joinHandler = (ws, msg) => {
    let id = JSON.stringify(msg.id)
    ws.send(JSON.stringify({
        method: 'checkRoom',
        connect: RoomsArr.includes(id),
    }))

}

const saveCanvasHandler = (ws,msg) => {
    let pos = ConfigArr.indexOf(msg.id);
    ConfigArr[pos + 1] = {
        width: ConfigArr[pos + 1].width,
        height:ConfigArr[pos + 1].height,
        color: ConfigArr[pos + 1].color,
        url: msg.data
    };
}

const changeResolutionHandler = (ws, msg) => {
    let pos = ConfigArr.indexOf(msg.id);
    ConfigArr[pos + 1] = {
        width: msg.width,
        height:msg.height,
        color: ConfigArr[pos + 1].color,
        url: ConfigArr[pos + 1].url,
    };
    broadcastConnection(ws, msg)
}

const changeBackgroundHandler = (ws,msg) => {
    let pos = ConfigArr.indexOf(msg.id);
    ConfigArr[pos + 1] = {
        width: ConfigArr[pos + 1].width,
        height:ConfigArr[pos + 1].height,
        color: msg.color,
        url: ConfigArr[pos + 1].url,
    };
    broadcastConnection(ws, msg)
}

const initialiseCanvasHandler = (ws,msg) => {
    let pos = ConfigArr.indexOf(msg.id);
    const mess = {
        method: 'initialise',
        width: ConfigArr[pos + 1].width,
        height: ConfigArr[pos + 1].height,
        color: ConfigArr[pos + 1].color,
    }
    ws.send(JSON.stringify(mess));
}

const connectionHandler = (ws, msg) => {
    ws.id = msg.id;
    broadcastConnection(ws, msg);
}

const broadcastConnection = (ws, msg) => {
    aWss.clients.forEach(client => {
        if (client.id === msg.id){
            client.send(JSON.stringify(msg))
        }
    })
}
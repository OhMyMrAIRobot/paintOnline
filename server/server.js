const express = require('express');
const app = express();
const WSserver = require('express-ws')(app);
const aWss = WSserver.getWss();
const PORT = 3000;

app.ws('/', (ws,req) => {
    console.log('connection established');
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
                broadcastConnection(ws,msg);
                break;
            case 'undo':
                broadcastConnection(ws,msg);
                break;
            case 'reUndo':
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
        }
    })
})

app.listen(PORT, () => console.log(`server is working on ${PORT}`))

let RoomsArr = [];
let ResolutionsArr = [];

const createRoomHandler = (ws, msg) => {
    ResolutionsArr.push(msg.id);
    ResolutionsArr.push({width: 1280, height: 360, color: "#FFFFFF"});
    RoomsArr.push(JSON.stringify(msg.id));
}

const joinHandler = (ws, msg) => {
    let id = JSON.stringify(msg.id)

    if (RoomsArr.includes(id)) {
        let pos = ResolutionsArr.indexOf(msg.id);

        ws.send(JSON.stringify({
            method: 'checkRoom',
            connect: RoomsArr.includes(id),
        }))
    } else {
        ws.send(JSON.stringify({
            method: 'checkRoom',
            connect: RoomsArr.includes(id),
        }))
    }
}

const changeResolutionHandler = (ws, msg) => {
    let pos = ResolutionsArr.indexOf(msg.id);
    ResolutionsArr[pos + 1] = {width: msg.width, height:msg.height};
    broadcastConnection(ws, msg)
}

const changeBackgroundHandler = (ws,msg) => {
    let pos = ResolutionsArr.indexOf(msg.id);
    ResolutionsArr[pos + 1] = {width: ResolutionsArr[pos + 1].width, height:ResolutionsArr[pos + 1].height, color: msg.color};
    broadcastConnection(ws, msg)
}

const initialiseCanvasHandler = (ws,msg) => {
    let pos = ResolutionsArr.indexOf(msg.id);
    const mess = {
        method: 'initialise',
        width: ResolutionsArr[pos + 1].width,
        height: ResolutionsArr[pos + 1].height,
        color: ResolutionsArr[pos + 1].color,
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
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
        }
    })
})

app.listen(PORT, () => console.log(`serv is working on ${PORT}`))

let RoomsArr = [];
let ResoulionsArr = [];

const createRoomHandler = (ws, msg) => {
    ResoulionsArr.push(msg.id);
    ResoulionsArr.push({width: 1280, height: 720});
    RoomsArr.push(JSON.stringify(msg.id));
}

const joinHandler = (ws, msg) => {
    let id = JSON.stringify(msg.id)

    if (RoomsArr.includes(id)) {
        let pos = ResoulionsArr.indexOf(msg.id);

        ws.send(JSON.stringify({
            method: 'checkRoom',
            connect: RoomsArr.includes(id),
            width: ResoulionsArr[pos + 1].width,
            height: ResoulionsArr[pos + 1].height,
        }))
    } else {
        ws.send(JSON.stringify({
            method: 'checkRoom',
            connect: RoomsArr.includes(id),
        }))
    }
}

const changeResolutionHandler = (ws, msg) => {
    let pos = ResoulionsArr.indexOf(msg.id);
    ResoulionsArr[pos + 1] = {width: msg.width, height:msg.height};
    broadcastConnection(ws, msg)
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
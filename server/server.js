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
        }
    })
})

app.listen(PORT, () => console.log(`serv is working on ${PORT}`))

let RoomsArr = [];

const createRoomHandler = (ws, msg) => {
    RoomsArr.push(JSON.stringify(msg.id));
    console.log(RoomsArr);
}

const joinHandler = (ws, msg) => {
    let id = JSON.stringify(msg.id)
    console.log(id);
        if (RoomsArr.includes(id))
            ws.send(JSON.stringify({
                method: 'checkRoom',
                connect: true,
            }))
        else
            ws.send(JSON.stringify({
                method: 'checkRoom',
                connect: false,
            }))
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
const express = require('express');
const app = express();
const WSserver = require('express-ws')(app);
const aWss = WSserver.getWss();
const PORT = 3000;
const cors = require('cors')

app.use(cors())
app.use(express.json())

const db = require('./datebase/database')
const rooms = db.rooms

app.ws('/', (ws,req) => {
    ws.on('message', (msg) => {
        msg = JSON.parse(msg);
        switch (msg.method){
            case 'connection':
                connectionHandler(ws, msg);
                break;
            case 'draw':
                broadcast(ws, msg);
                break;
            case 'move':
                broadcast(ws,msg);
                break;
            case 'pushUndo':
                broadcast(ws,msg);
                break;
            case 'undo':
                broadcast(ws,msg);
                break;
            case 'redo':
                broadcast(ws,msg);
                break;
            case 'changeResolution':
                changeResolutionHandler(ws,msg);
                break;
            case 'changeBackground':
                changeBackgroundHandler(ws, msg);
                break;
            case 'message':
                broadcast(ws, msg);
                break;
            case "close":
                broadcast(ws, msg);
                break;
            case 'saveCanvas':
                saveCanvasHandler(ws,msg);
                break;
        }
    })
})

app.listen(PORT, () => {
    console.log(`server is working on ${PORT}`);
})

app.post('/createRoom',  (req, res) => {
    const id = req.body.id;
    rooms.create({
        Session: id,
    }).then(() => {
        res.status(200).json({id: id})
    }).catch((e) => {
        console.log(e);
        res.status(500).json({message: e})
    })
})

app.get('/getRoom', (req, res) => {
    const id = req.query.id;
    rooms.findOne({
        where: {
            Session: id,
        }
    }).then((room) => {
        room ? res.status(200).json() : res.status(404).json()
    }).catch((e) => {
        console.log(e);
        res.status(500).json({message: e})
    })
})

app.get('/initialise', (req, res) => {
    const id = req.query.id;
    rooms.findOne({
        where: {
            Session: id,
        }
    }).then((room) => {
        room ? res.status(200).json(room) : res.status(404).json()
    }).catch((e) => {
        console.log(e);
        res.status(500).json({message: e})
    })
})

const broadcast = (ws, msg) => {
    aWss.clients.forEach(client => {
        if (client.id === msg.id){
            client.send(JSON.stringify(msg))
        }
    })
}

const connectionHandler = (ws, msg) => {
    ws.id = msg.id;
    broadcast(ws, msg);
}

const saveCanvasHandler = (ws,msg) => {
    rooms.update({ Canvas: msg.canvas }, {
        where: {
            Session: msg.id
        }
    }).then((result) => {
        console.log(result)
    }).catch((e) => {
        console.log(e);
    })
}

const changeResolutionHandler = (ws, msg) => {
    broadcast(ws, msg)
}

const changeBackgroundHandler = (ws,msg) => {
    broadcast(ws, msg)
}
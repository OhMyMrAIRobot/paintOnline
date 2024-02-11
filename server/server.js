const express = require('express');
const app = express();
const WSserver = require('express-ws')(app);
const aWss = WSserver.getWss();
const PORT = 3000;
const cors = require('cors')
const config = require('./config')
const mysql = require('mysql')

app.use(cors())
app.use(express.json())

const db = mysql.createConnection(config);
db.connect(function(err){
    if (err) {
        return console.error("Ошибка: " + err.message);
    }
    else{
        console.log("Подключение к серверу MySQL успешно установлено");
    }
})

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

let RoomsArr = [];
let ConfigArr = [];

app.post('/createRoom', (req, res) => {
    try {
        const id = req.query.id;
        ConfigArr.push(id);
        ConfigArr.push({width: 1280, height: 720, color: "#FFFFFF", url: "init", urlWidth: 1280, urlHeight: 720});
        RoomsArr.push(id);

        let query = `INSERT INTO rooms (session) VALUES (${JSON.stringify(id)});`
        console.log(query);
        db.query(query, (error, result) => {
            if (error) {
                console.error('Ошибка выполнения запроса: ', error);
                throw error;
            }
            console.log('Значение успешно добавлено в таблицу');
        })

        return res.status(200).json({message: "room created"})
    } catch (e) {
        console.log(e);
    }
})

app.get('/getRoom', (req, res) => {
    try {
        const data = RoomsArr.includes(req.query.id);
        res.json(data);
    } catch (e) {
        console.log(e);
    }
})

app.get('/initialise', (req, res) => {
    try {
        let pos = ConfigArr.indexOf(req.query.id);
        const data = {
            width: ConfigArr[pos + 1].width,
            height: ConfigArr[pos + 1].height,
            color: ConfigArr[pos + 1].color,
            url: ConfigArr[pos + 1].url,
            urlWidth: ConfigArr[pos + 1].urlWidth,
            urlHeight: ConfigArr[pos + 1].urlHeight,
        }
        res.json(data)
    } catch (e) {
        console.log(e);
    }
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
    let pos = ConfigArr.indexOf(msg.id);
    ConfigArr[pos + 1] = {
        width: ConfigArr[pos + 1].width,
        height:ConfigArr[pos + 1].height,
        color: ConfigArr[pos + 1].color,
        url: msg.data,
        urlWidth: msg.width,
        urlHeight: msg.height,
    };
}

const changeResolutionHandler = (ws, msg) => {
    let pos = ConfigArr.indexOf(msg.id);
    ConfigArr[pos + 1] = {
        width: msg.width,
        height:msg.height,
        color: ConfigArr[pos + 1].color,
        url: ConfigArr[pos + 1].url,
        urlWidth: ConfigArr[pos + 1].urlWidth,
        urlHeight: ConfigArr[pos + 1].urlHeight,
    };
    broadcast(ws, msg)
}

const changeBackgroundHandler = (ws,msg) => {
    let pos = ConfigArr.indexOf(msg.id);
    ConfigArr[pos + 1] = {
        width: ConfigArr[pos + 1].width,
        height:ConfigArr[pos + 1].height,
        color: msg.color,
        url: ConfigArr[pos + 1].url,
        urlWidth: ConfigArr[pos + 1].urlWidth,
        urlHeight: ConfigArr[pos + 1].urlHeight,
    };
    broadcast(ws, msg)
}
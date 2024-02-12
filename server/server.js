const express = require('express');
const app = express();
const WSserver = require('express-ws')(app);
const aWss = WSserver.getWss();
const PORT = 3000;
const cors = require('cors')
const config = require('./config')
const mysql = require('mysql')
const {json} = require("express");

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

        let query = `CALL InsertData(${JSON.stringify(id)});`
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
        let query = `SELECT id FROM rooms WHERE session = ${JSON.stringify(req.query.id)};`
        db.query(query, (error, result) => {
            if (error) {
                console.error('Ошибка выполнения запроса: ', error);
                throw error;
            }
            let data;
            result.length ? data = true : data = false;
            res.json(data);
        })
    } catch (e) {
        console.log(e);
    }
})

app.get('/initialise', (req, res) => {
    try {
        let query = `SELECT * FROM room_config WHERE session = ${JSON.stringify(req.query.id)};`
        db.query(query, (error, result) => {
            if (error) {
                console.error('Ошибка выполнения запроса: ', error);
                throw error;
            }
            const data = {
                width: result[0].width,
                height: result[0].height,
                color: result[0].color,
                url: result[0].url,
                urlWidth: result[0].urlWidth,
                urlHeight: result[0].urlHeight,
            }
            res.json(data)
        })

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
    let query = `UPDATE room_config SET url = ${JSON.stringify(msg.data)}, urlWidth = ${msg.width}, urlHeight = ${msg.height} WHERE session = ${JSON.stringify(msg.id)};`
    db.query(query, (error, result) => {
        if (error) {
            console.error('Ошибка выполнения запроса: ', error);
            throw error;
        }
        else
            console.log('url loaded');
    })
}

const changeResolutionHandler = (ws, msg) => {
    let query = `UPDATE room_config SET width = ${msg.width}, height = ${msg.height} WHERE session = ${JSON.stringify(msg.id)};`
    db.query(query, (error, result) => {
        if (error) {
            console.error('Ошибка выполнения запроса: ', error);
            throw error;
        }
        else
            console.log('resolution loaded');
    })
    broadcast(ws, msg)
}

const changeBackgroundHandler = (ws,msg) => {
    let query = `UPDATE room_config SET color = ${JSON.stringify(msg.color)} WHERE session = ${JSON.stringify(msg.id)}`
    db.query(query, (error, result) => {
        if (error) {
            console.error('Ошибка выполнения запроса: ', error);
            throw error;
        }
        else
            console.log('background loaded');
    })
    broadcast(ws, msg)
}
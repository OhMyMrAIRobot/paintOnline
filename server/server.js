const express = require('express');
const app = express();
const WSserver = require('express-ws')(app);
const aWss = WSserver.getWss();
const PORT = 3000;
const cors = require('cors')

app.use(cors())
app.use(express.json())

const sequelize = require('./Database')
const Room = require("./models/Room");

let usernames = [];

app.ws('/', (ws) => {
    ws.on('message', (msg) => {
        msg = JSON.parse(msg);
        switch (msg.method){
            case 'connection':
                connectionHandler(ws, msg);
                break;
            case 'draw':
                saveCanvasHandler(msg);
                broadcast(msg);
                break;
            case 'move':
                broadcast(msg);
                break;
            case 'pushUndo':
                broadcast(msg);
                break;
            case 'undo':
                saveCanvasHandler(msg);
                broadcast(msg);
                break;
            case 'redo':
                saveCanvasHandler(msg);
                broadcast(msg);
                break;
            case 'changeResolution':
                broadcast(msg);
                break;
            case 'changeBackground':
                broadcast(msg);
                break;
            case 'message':
                broadcast(msg);
                break;
            case "close":
                closeHandler(msg);
                break;
            case 'saveCanvas':
                saveCanvasHandler(msg);
                break;
        }
    })
})

app.listen(PORT, () => {
    console.log(`server is working on ${PORT}`);
    dbConnect();
})

const dbConnect = async () => {
    try {
        await sequelize.authenticate()
        console.log('Соединение с БД было успешно установлено')
    } catch (e) {
        console.log('Невозможно выполнить подключение к БД: ', e)
    }
}

app.post('/createRoom',  (req, res) => {
    const id = req.body.id;
    Room.create({
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
    Room.findOne({
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

app.get(`/checkUsername`, (req, res) => {
    const username = req.query.user;
    const roomId = req.query.id;
    const room = usernames.find(r => r.roomId === roomId);
    if (room) {
        if (room.usernames.includes(username)) {
            res.status(200).json({exists: true});
        } else {
            room.usernames.push(username);
            res.status(200).json({exists: false});
        }
    } else {
        usernames.push({roomId: roomId, usernames: [username]});
        res.status(200).json({exists: false});
    }
})

app.get('/initialise', (req, res) => {
    const id = req.query.id;
    Room.findOne({
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

const broadcast = (msg) => {
    aWss.clients.forEach(client => {
        if (client.id === msg.id){
            client.send(JSON.stringify(msg))
        }
    })
}

const connectionHandler = (ws, msg) => {
    ws.id = msg.id;
    broadcast(msg);
}

const saveCanvasHandler = (msg) => {
    if (msg.canvas !== null) {
        Room.update({ Canvas: msg.canvas }, {
            where: {
                Session: msg.id
            }
        }).catch((e) => {
            console.log(e);
        })
    }
}

// const closeHandler = (msg) => {
//     const roomId = msg.id;
//     const username = msg.username;
//
//     const room = usernames.find(r => r.roomId === roomId);
//     if (room) {
//         room.usernames = room.usernames.filter(user => user !== username);
//         if (room.usernames.length === 0) {
//             usernames.splice(usernames.indexOf(room), 1);
//         }
//     }
//     broadcast(msg);
// }
const closeHandler = (msg) => {
    const roomId = msg.id;
    const username = msg.username;

    let roomIndex = -1;
    let room = null;

    // Поиск комнаты по roomId
    for (let i = 0; i < usernames.length; i++) {
        if (usernames[i].roomId === roomId) {
            room = usernames[i];
            roomIndex = i;
        }
    }

    if (room !== null) {
        let newUsernames = [];
        // Фильтрация имен пользователей
        for (let i = 0; i < room.usernames.length; i++) {
            if (room.usernames[i] !== username) {
                newUsernames.push(room.usernames[i]);
            }
        }
        room.usernames = newUsernames;

        // Удаление комнаты, если в ней больше нет пользователей
        if (room.usernames.length === 0) {
            let newUsernamesList = [];
            for (let i = 0; i < usernames.length; i++) {
                if (i !== roomIndex) {
                    newUsernamesList.push(usernames[i]);
                }
            }
            usernames = newUsernamesList;
        }
    }

    broadcast(msg);
}
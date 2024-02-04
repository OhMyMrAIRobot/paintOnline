export const sendMessage = (socket,msg) => {
    socket.send(JSON.stringify(msg))
}

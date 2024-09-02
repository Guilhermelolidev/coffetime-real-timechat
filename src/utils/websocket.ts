import { Server } from 'socket.io'

function initializeSocket(server: any) {
    const socket = new Server(server, {
        cors: {
            origin: '*'
        }
    });

    socket.on('connection', (socket) => {
        console.log('User connected')

        socket.on('chat message', (msg: any) => {
            console.log('message', msg)

            socket.emit('chat message', msg)
        })

        socket.on('disconnect', () => {
            console.log('User desconnected');
        });
    })
}

export default initializeSocket

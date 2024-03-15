import { io } from 'socket.io-client'


const socket = io('http://localhost:3333')


// socket.emit('findAllMessage', (data:any) => console.log(data))

socket.emit('createMessage')  
''
socket.on('socket-error', data => console.log(data))
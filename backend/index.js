const express = require('express')
const http = require('http')
const app = express()
const cors = require('cors')
const {Server} = require('socket.io')

app.use(cors)
const server = http.createServer(app)

const io = new Server(server,{
    cors:'http://localhost:5173',
    methods:['GET','POST']
})

io.on('connection',(socket)=>{
    console.log('the user connected',socket.id)

    socket.on('join_room',(data)=>{
     socket.join(data)
     console.log(`the user is ${socket.id} and room is ${data}`)
    })

    socket.on('send_message',(data)=>{
        io.to(data.room).emit('recieve_message',data)
        console.log('the data of joined  is ',data)
    })


    socket.on('disconnect',()=>{
        console.log('user disconnected')
    })
})


server.listen(5000,()=>{
    console.log('server is running')
})

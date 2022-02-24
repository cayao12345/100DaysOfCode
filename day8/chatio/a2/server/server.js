

const io = require('socket.io')(3000,{ 
    //this will need port 
    cors : { //the second parameter need cors to not cross origin
        origin : ["http://localhost:8080"]
    }
}
)

io.on('connection',(socket)=>{
    //this will run ever new user was connected

    socket.on('send-message',(message,room)=>{
        //this will receive the emited 
        console.log(message)
        if(room === ""){
            socket.broadcast.emit('receive-message',message) 
            // this will send the emitted value in the client
        }else{
            socket.to(room).emit('receive-message', message)
            //yung lahat nang nasa room nato marereceive yung emmit
        }
    })
})
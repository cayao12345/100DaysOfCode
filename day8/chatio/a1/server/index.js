const io = require('socket.io')(3000,{ //socket is a function and we need to pass the port
    // which is 3000
    cors: {// we are blocked with core dahil dito hindi tayo makaconnect sa sa localhost080
        //so need naten ipasa ang location nang client sa cors
        origin: ["http://localhost:8080"] 

    }
})

io.on('connection',socket =>{ //we need this function
    //this function will run evert time a client connect to the server
    //so ibig sabihin kapag may nag open nang url
    //may coconnect sa server at ito ay mag rurun

    //syempre di mawawala yung socket instance

    //to access or listen the custom even we need the socket.on and then yung pangalan nang
    //event na nilagay naten
    //sa second namn ay ung mga pinasa naten sa parameters
   
    socket.on('send-message',(message,room )=>{ //this will receive the send-message 
        //eto ay mag rereceive yung emit namn ay mag sesend
        
        //yung room ay galing sa room input sa client


        // //io emit this will emit a message 
        // io.emit('receive-message',message) // this will you is tell the server
        // //to send this emit to all every socket out there
        // //on different client


        // this is the broadcast the different in socket.broadcast was the
      
        if(room == ''){ //if nothing in the room, then it will broadcast to every one
            socket.broadcast.emit('receive-message',message)
              // the broadcast will send the the emit to other but now to himself
        } else {
            //if kung given yung room dito sya mapupunta
            socket.to(room).emit('receive-message',message)
            //ang lahat lang nang nasa room nato ang makakreceive nang emit na to
            //if kung gumamit kana nang socket.to ibig sabihin hindi mo marereceive yung message
            //so madaling salita naka broadcast na sya hindi mo na need mag socket.broadcast
            //need naten ipaste yung id kung sino lang ang gusto mo makaaccess
        }
        



    })
})

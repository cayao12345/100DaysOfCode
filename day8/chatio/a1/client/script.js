
    import { io} from 'socket.io-client'    
    //eot naman ang client version nang socket

    const joinRoomButton = document.getElementById('room-button')
    const messageInput = document.getElementById('message-input')
    const roomInput = document.getElementById('room-input')
    const form = document.getElementById('form')


    const socket = io("http://localhost:3000"); //now need naten ipasa dito ating server
    //which is port 3000 ], ngayon dito sya mag lilisten eto yung server kung saan sya mag lilisten
    socket.on('connect',()=>{
        displayMessage(`You connected wih id ${ socket.id }`)
    })

    //to listen to the emiit in the server we need the on
    socket.on('receive-message',(message)=>{
        displayMessage(message)
    }) 
    //this emit will listen in the receive message





    // socket.emit('custom-event',10,'Hi',{ a : 'a' }) //emit will take any event you want and send it to the server
    // //the first was the name the second is the value we want to send


    form.addEventListener('submit',(e)=>{
        e.preventDefault();
        const message = messageInput.value
        const room = roomInput.value

        if(message == "") return
        displayMessage(message)
        socket.emit('send-message',message,room) // ang rooom ipapasa naten galing sa room input
        //
    })

    joinRoomButton.addEventListener('click',()=>{
        const room = roomInput.value
    })

    function displayMessage(message){   
        const messageContainer = document.getElementById("message-container")
        messageContainer.innerHTML = messageContainer.innerHTML + `
        <div class="p-3 rounded-pill border border-light mb-2 bg-info bg-gradient text-dark"> ${ message } </div>
        `
    }
import { io } from 'socket.io-client'

const form = document.getElementById("form")
const messageInput = document.getElementById('message-input')
const roomInput = document.getElementById("room-input")
const roomButton = document.getElementById("room-button")

const socket = io("http://localhost:3000") // you need to put the server http

socket.on('connect', () => {
    //this wil run if there is new access
    displayMessage("you are connected ur id is " + socket.id )
})

socket.on('receive-message',(message)=>{
    displayMessage(message)
})


form.addEventListener('submit',(e)=>{
    e.preventDefault()
    const message = messageInput.value
    const room = messageInput.value

    if(message === "") return
    displayMessage(message)
    socket.emit('send-message',message,room) //this will send data to the server

})


function displayMessage(message) {
    const messageContainer = document.getElementById('messageContainer')
    messageContainer.innerHTML = messageContainer.innerHTML + `
    <div class="p-3 rounded-pill border border-light mb-2 bg-info bg-gradient text-dark"> ${message} </div>
    `
}
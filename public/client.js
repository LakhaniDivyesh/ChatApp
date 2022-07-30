const socket = io()
let userName;
let textarea = document.querySelector("#textarea");
let message_area=document.querySelector(".message_area");

do{
    userName = prompt("Enter your name");
}while(!userName);

textarea.addEventListener('keyup',(e)=>{
    if(e.key === "Enter"){
        sendMessage(e.target.value);
    }
})

function sendMessage (message){
    let msg = {
        user:userName,
        message:message.trim()
    }

    appendMessage(msg,"outgoing");
    textarea.value ="";
    socket.emit("message",msg);
}

function appendMessage (msg,type){
    let mainDiv = document.createElement("div");
    mainDiv.classList.add(type,"message");
    let markup =
        `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
        `
    mainDiv.innerHTML = markup;
    message_area.appendChild(mainDiv);

}

//receive massage
socket.on("message",(msg)=>{
    appendMessage(msg,"incoming");
})
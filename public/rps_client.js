// socket client side
var socket = io();
// event listeners for the three buttons. 
document.getElementById("rock").addEventListener("click", function(){
    socket.emit("R", 1);
}); 

document.getElementById("paper").addEventListener("click", function(){
    socket.emit("P", 2);
}); 

document.getElementById("scissor").addEventListener("click", function(){
    socket.emit("S", 3);
}); 

socket.on("winner", (cloned) => {
    document.getElementById("msgZone").innerHTML += `<li> ${cloned.win} wins with ${cloned.hand} !</li>`;
});
//index.js 
//author: fazal rahman
//setting up server
var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.use(express.static('public'));
//server setup ends


//game logic starts
var p1, p2; 
//checks if either player won
var checkBoth = () => {
if (p1&&p2){
return (checkWin()); //checks which player is the winner
}
return (false);
};
var checkWin = () => {
    let winner= {};
    // rock paper scissor logic using switch cases to account for all possibilities
  switch(p1){
      case "rock":
        if (p2=="scissor"){
            winner.win = "player 1";
            winner.hand = "rock";
        } else if (p2=="paper"){
            winner.win = "player 2";
            winner.hand = "paper";
        } else {
            winner.win = "draw";
            winner.hand = "rock";
        } 
        break;
      case "paper":
        if (p2=="rock"){
            winner.win = "player 1";
            winner.hand = "paper";
        } else if (p2=="scissor"){
            winner.win = "player 2";
            winner.hand = "scissor";
        } else {
            winner.win = "draw";
            winner.hand = "paper";
        } break;
      case "scissor":
        if (p2=="rock"){
            winner.win = "player 2";
            winner.hand = "rock";
        } else if (p2=="paper"){
            winner.win = "player 1";
            winner.hand = "scissor";
        } else {
            winner.win = "draw";
            winner.hand = "scissor";
        } break;
    }
    clearPlayers(); // clear the entries for both players so they can play a new game
    return (winner);
};
var clearPlayers = () => p1=p2=null;
//game logic ends


//socket configuration for server 
io.on('connection', socket => {
    console.log('Player connected!');

    socket.on('disconnect', () => console.log('user disconnected'));

    // listening to "R" "P" and "S" emits from client
    socket.on("R", () => {
        console.log("rock");
        if (!p1){
            p1 = "rock";
        } else {
            p2 = "rock";
        }
        let cloned = Object.assign({}, checkBoth());
        
        if (cloned.win && cloned.hand){
            console.log(cloned);
            socket.emit("winner", cloned);
        }
    });

    socket.on("P", () => {
        console.log("paper");
        if (!p1){
            p1 = "paper";
        } else {
            p2 = "paper";
        }
        let cloned = Object.assign({}, checkBoth());
        
        if (cloned.hand && cloned.win){
            console.log(cloned);
            socket.emit("winner", cloned);
        }
    });

    socket.on("S", () => {
        console.log("scissor");
        if (!p1){
            p1 = "scissor";
        } else {
            p2 = "scissor";
        }
        let cloned = Object.assign({}, checkBoth());
        
        if (cloned.win && cloned.hand){
            console.log(cloned);
            socket.emit("winner", cloned);
        }
        
    });

});

// working port number
http.listen(3000, () => console.log('listening on *:3000'));
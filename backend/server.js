const express = require('express');
const { Server } = require("socket.io");
const { v4: uuidV4 } = require('uuid');
const http = require('http');
const moogoose = require("mongoose");
const { default: mongoose } = require('mongoose');
var cors = require('cors')
var chessRules=require('chess-rules')
var chessAI = require('chess-ai-kong');
const { Chess } = require('chess.js')

const app = express(); // initialize express
app.use(cors())

const server = http.createServer(app);
 chess = new Chess();

 //Making schemas and models
var PuzzleSchema = mongoose.Schema({
  fen:{type: String},
  moves:[{type: String}]
})
var PuzzleModel = mongoose.model('puzzles',PuzzleSchema)
// Lesson schema
const lessonSchema = new mongoose.Schema({
  name: String,
  description: String,
  complexityLevel: String,
  numberOfSublessons: Number,
  shortDescription: String,
  sublessons: [
    {
      title: String,
      description: String,
      duration: String,
      url: String,
    },
  ],
});

const LessonModel = mongoose.model('lessons', lessonSchema);





mongoose.connect('mongodb://localhost:8081/chess', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });


// set port to value received from environment variable or 8080 if null
const port = process.env.PORT || 8080 

// upgrade http server to websocket server
const io = new Server(server, {
  cors: '*', // allow connection from any origin
});

const rooms = new Map();

// io.connection
io.on('connection', (socket) => {
  // socket refers to the client socket that just got connected.
  // each socket is assigned an id
  console.log(socket.id, 'connected');

  socket.on('username', (username) => {
    console.log('username:', username);
    socket.data.username = username;
  });

  socket.on('createRoom', async (callback) => { // callback here refers to the callback function from the client passed as data
    const roomId = uuidV4(); // <- 1 create a new uuid
    await socket.join(roomId); // <- 2 make creating user join the room
	 
    // set roomId as a key and roomData including players as value in the map
    rooms.set(roomId, { // <- 3
      roomId,
      players: [{ id: socket.id, username: socket.data?.username }]
    });
    // returns Map(1){'2b5b51a9-707b-42d6-9da8-dc19f863c0d0' => [{id: 'socketid', username: 'username1'}]}

    callback(roomId); // <- 4 respond with roomId to client by calling the callback function from the client
  });

  socket.on('joinRoom', async (args, callback) => {
    // check if room exists and has a player waiting
    const room = rooms.get(args.roomId);
    let error, message;
  
    if (!room) { // if room does not exist
      error = true;
      message = 'room does not exist';
    } else if (room.length <= 0) { // if room is empty set appropriate message
      error = true;
      message = 'room is empty';
    } else if (room.length >= 2) { // if room is full
      error = true;
      message = 'room is full'; // set message to 'room is full'
    }
    else if(args.roomId == 'ai'){
      
    }

    if (error) {
      // if there's an error, check if the client passed a callback,
      // call the callback (if it exists) with an error object and exit or 
      // just exit if the callback is not given

      if (callback) { // if user passed a callback, call it with an error payload
        callback({
          error,
          message
        });
      }

      return; // exit
    }

    await socket.join(args.roomId); // make the joining client join the room

    // add the joining user's data to the list of players in the room
    const roomUpdate = {
      ...room,
      players: [
        ...room.players,
        { id: socket.id, username: socket.data?.username },
      ],
    };

    rooms.set(args.roomId, roomUpdate);

    callback(roomUpdate); // respond to the client with the room details.

    // emit an 'opponentJoined' event to the room to tell the other player that an opponent has joined
    socket.to(args.roomId).emit('opponentJoined', roomUpdate);
  });

  socket.on('move', (data) => {
    // emit to all sockets in the room except the emitting socket

    socket.to(data.room).emit('move', data.move);
    
   
  });
  socket.on('moveAI', (data) => {
    // emit to all sockets in the room except the emitting socket.
      console.log(data.move.after)
      chess.load(data.move.after)
    
      var moveAi = chessAI.playPosition(chessRules.fenToPosition(data.move.after))
      var smuving = chess.move(moveAi);
      // imamo oba fena, i san, treba nam ( da li nam zapravo trebna?) from
      socket.emit('moveAiRecive', smuving);
  });


  

  socket.on("disconnect", () => {
    const gameRooms = Array.from(rooms.values()); // <- 1

    gameRooms.forEach((room) => { // <- 2
      const userInRoom = room.players.find((player) => player.id === socket.id); // <- 3

      if (userInRoom) {
        if (room.players.length < 2) {
          // if there's only 1 player in the room, close it and exit.
          rooms.delete(room.roomId);
          return;
        }

        socket.to(room.roomId).emit("playerDisconnected", userInRoom); // <- 4
      }
    });
  });

  socket.on("closeRoom", async (data) => {
    socket.to(data.roomId).emit("closeRoom", data); // <- 1 inform others in the room that the room is closing

    const clientSockets = await io.in(data.roomId).fetchSockets(); // <- 2 get all sockets in a room

    // loop over each socket client
    clientSockets.forEach((s) => {
      s.leave(data.roomId); // <- 3 and make them leave the room on socket.io
    });

    rooms.delete(data.roomId); // <- 4 delete room from rooms map
  });
});

// -----------------------------------------Routes----------------------------------------------------------
app.get("/puzzles",async (req,res)=>{
  
  try {
    // Query MongoDB to retrieve all puzzles
    const puzzles = await PuzzleModel.find();

    // Send the puzzles as a JSON response
    res.json(puzzles);
  } catch (err) {
    console.error('Error retrieving puzzles:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

app.get('/lessons', async (req, res) => {
  try {
    const lessons = await LessonModel.find();

    // Send the lessons as a JSON response
    res.json(lessons);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/lessons/:lessonId', async (req, res) => {
  try {
    console.log(req.params.lessonId);
    const lesson = await LessonModel.findById(req.params.lessonId);
    if (!lesson) {
      return res.status(404).json({ error: 'Lesson not found' });
    }
    res.json(lesson);
  } catch (error) {
    console.error('Error fetching lesson:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});







server.listen(port, () => {
  console.log(`listening on *:${port}`);
});
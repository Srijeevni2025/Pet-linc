const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const mongoose = require("mongoose")

const app = require('./app'); // Import your Express app
const server = http.createServer(app); // ✅ wrap express with http

const io = new Server(server, {
  cors: {
    origin: ["https://petlinc.in",
      "https://www.petlinc.in",
      "http://localhost:5173",
      "http://192.168.0.108:5173",
      "https://pet-linc-z3ed.vercel.app",],
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    credentials: true,
  },
});

// ✅ Make io accessible in controllers
app.set('io', io);

// Track connected groomers
const connectedGroomers = {};

io.on('connection', (socket) => {
  console.log('Socket connected:', socket.id);

  // Groomer registers themselves when app opens
  socket.on('register_groomer', (groomerId) => {
    connectedGroomers[groomerId] = socket.id;
    console.log(`Groomer ${groomerId} registered with socket ${socket.id}`);
  });


// Groomer sends back their location when admin requests it
 socket.on('send_location', ({ groomerId, lat, lng }) => {
    console.log(`Location received from ${groomerId}: ${lat}, ${lng}`);
    // Forward location to all admin sockets
    socket.broadcast.emit('groomer_location', { groomerId, lat, lng });
  });

  socket.on('disconnect', () => {
    // Remove groomer from map on disconnect
    Object.keys(connectedGroomers).forEach((key) => {
      if (connectedGroomers[key] === socket.id) {
        delete connectedGroomers[key];
      }
    });
    console.log('Socket disconnected:', socket.id);
  });
});

// ✅ Make connectedGroomers accessible in controllers
app.set('connectedGroomers', connectedGroomers);

// ... rest of your middleware and routes stay the same ...
// Make sure you use server.listen instead of app.listen at the bottom:

const db = process.env.DATABASE_URL.replace("<PASSWORD>", process.env.DATABASE_PASSWORD);
console.log(db);

mongoose.connect(db).then(()=>console.log("Database got connected."));




server.listen(process.env.PORT, ()=>{
    console.log("server is running on port 4000")
})



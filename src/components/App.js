import React from "react";
import "../index.css";
import { Button } from "@chakra-ui/react";
import { io } from 'socket.io-client';

const socket = io();

const sendWSMessage = () => {
  socket.emit('chat message', 'hi from client');
  socket.on('chat message', (msg) => {
    console.log('recieved message from server: ', msg);
  });
};

const App = ({ props }) => {
  fetch("/apiTest")
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log("there was an error: ", err);
    });
  return (
    <div>
      <Button onClick={sendWSMessage}>Yo</Button>
      Hello World
    </div>
  );
};

export default App;

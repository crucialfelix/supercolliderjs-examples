import io from 'socket.io-client';

let socket = io();

// Store some state variables here
let context = {
  down: false
};

let clickField = window.document.getElementById('click-field');

function setBounds() {
  context.width = clickField.clientWidth;
  context.height = clickField.clientHeight;
}

window.onresize = setBounds;
setBounds();


clickField.onmousedown = (event) => {
  context.down = true;
  send('noteOn', event.clientX, event.clientY);
};

clickField.onmouseup = (event) => {
  context.down = false;
  send('noteOff', event.clientX, event.clientY);
};

clickField.onmousemove = (event) => {
  if (context.down) {
    send('noteSlide', event.clientX, event.clientY);
  }
};

function send(eventType, x, y) {
  console.log(eventType, x, y);
  socket.emit(eventType, {
    x: x / context.width,
    y: 1.0 - (y / context.height)
  });
}

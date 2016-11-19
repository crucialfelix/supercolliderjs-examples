import io from 'socket.io-client';
// This increases build time to 38s
// import d3 from 'd3';

const d3 = window.d3;
const socket = io();

// Store some state variables here
let context = {
  down: false
};

function setBounds() {
  context.width = window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth;;
  context.height = window.innerHeight
    || document.documentElement.clientHeight
    || document.body.clientHeight;
  if (context.canvas) {
    context.canvas
      .attr("width", context.width)
      .attr("height", context.height);
  }
}

window.onresize = setBounds;
setBounds();


/**
 * OMG particles II
 * http://bl.ocks.org/mbostock/9539958
 * Released under the GNU General Public License, version 3.
 *
 * Use d3, canvas and fast requestAnimationFrame to render smoothly.
 */
var x1 = context.width / 2,
  y1 = context.height / 2,
  x0 = x1,
  y0 = y1,
  i = 0,
  r = 200,
  τ = 2 * Math.PI;


context.canvas = d3.select("body").append("canvas")
    .attr("width", context.width)
    .attr("height", context.height)
    .on("ontouchstart" in document ? "touchmove" : "mousemove", onMouseMove)
    .on("ontouchstart" in document ? "touchstart" : "mousedown", onMouseDown)
    .on("ontouchstart" in document ? "touchstop" : "mouseup", onMouseUp);

var ctx = context.canvas.node().getContext("2d");
ctx.globalCompositeOperation = "lighter";
ctx.lineWidth = 2;

d3.timer(function() {
  ctx.clearRect(0, 0, context.width, context.height);

  var z = d3.hsl(++i % 360, 1, .5).rgb(),
      x = x0 += (x1 - x0) * .1,
      y = y0 += (y1 - y0) * .1;

  d3.select({}).transition()
      .duration(2000)
      .ease(Math.sqrt)
      .tween("circle", function() {
        return function(t) {
          ctx.strokeStyle = `rgba(${z.r}, ${z.g}, ${z.b}, ${1- t})`;
          ctx.beginPath();
          ctx.arc(x, y, r * t, 0, τ);
          ctx.stroke();
        };
      });
});

/**
 * Send messages back to the server.
 */
function send(eventType, x, y) {
  console.log(eventType, x, y);
  socket.emit(eventType, {
    x: x / context.width,
    y: 1.0 - (y / context.height)
  });
}

function onMouseDown() {
  [x1, y1] = d3.mouse(this);
  d3.event.preventDefault();
  // context.down = true;
  send('noteOn', x1, y1);
}

function onMouseMove() {
  [x1, y1] = d3.mouse(this);
  d3.event.preventDefault();
  send('noteSlide', x1, y1);
}

function onMouseUp() {
  [x1, y1] = d3.mouse(this);
  d3.event.preventDefault();
  // context.down = false;
  send('noteOff', x1, y1);
}

var five = require("johnny-five"),
  keypress = require("keypress"),
  board;

  keypress(process.stdin);
 
  board = new five.Board({
    port : "/dev/tty.JayBot-DevB"
  });

board.on("ready", function() {

  var leftWheel = new five.Servo({
    pin : 11,
    type : "continuous"
  }).stop();
  var rightWheel = new five.Servo({
    pin : 12,
    type : "continuous"
  }).stop();

  process.stdin.resume();
  process.stdin.setEncoding("utf8");
  process.stdin.setRawMode(true);

  process.stdin.on("keypress", function(ch, key){

    // ----------------------------------
    // --- START HERE -------------------
    // ----------------------------------
    if (!key) { 
      console.log("returning");
      return; 
    } 
    switch (key.name) {
        case "up":
          console.log("forward");
          leftWheel.cw(0.45);
          rightWheel.ccw(0.45);
          break;
        case "down":
          console.log("back");
          leftWheel.ccw(0.45);
          rightWheel.cw(0.45);
          break;
        case "left":
          console.log("left");
          leftWheel.cw(0.05);
          rightWheel.ccw(0.45);
          break;
        case "right":
          console.log("right");
          leftWheel.cw(0.45);
          rightWheel.ccw(0.05);
          break;
        case "space":
          console.log("stop");
          leftWheel.stop();
          rightWheel.stop();
          break;
      }
  });

  
});

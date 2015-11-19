var five = require('johnny-five'),
  Myo = require('myo'),
  board;

  board = new five.Board({
    port : "/dev/tty.JayBot-DevB"
  });

board.on('ready', function() {

  var myo=Myo.create();
  myo.isLocked=false;

  console.log(Myo.options);
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  process.stdin.setRawMode(true);

  var leftWheel = new five.Servo({
    pin : 11,
    type : "continuous"
  }).stop();
  var rightWheel = new five.Servo({
    pin : 12,
    type : "continuous"
  }).stop();

  myo.on('fingers_spread', function(edge){
    if (!edge){
      myo.unlock(3000);
      console.log("forward");
      leftWheel.cw(0.25);
      rightWheel.ccw(0.25);   
    }
  });

  myo.on('wave_in', function(edge){
    if (!edge){
      myo.unlock(3000);
      console.log("right");
      leftWheel.cw(0.25);
      rightWheel.ccw(0.05);
    }
  });

  myo.on('wave_out', function(edge){
    if (!edge){
      myo.unlock(3000);
      console.log("left");
      leftWheel.cw(0.05);
      rightWheel.ccw(0.25);
    }
  });

  myo.on('fist', function(edge){
    if (!edge){
      myo.unlock(3000);
      console.log("stop");
      leftWheel.stop(0.5);
      rightWheel.stop(0.5);
    }
  });
});

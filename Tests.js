//TP PART 2
var julien = new EventEmitter();
julien
  .on("event1", console.log.bind(console))
  .on("event2", console.log.bind(console))
  .emit("event1", 1).emit("event2", 2)
  .off()
  .emit("event1", 1).emit("event2", 2);

//TP PART 3 - A
var julien = EventEmitter.prototype.makeEventEmitter();
var fn = console.log.bind(console);
julien
  .on("event1", fn)
  .on("event2", fn)
  .emit("event1", 1).emit("event2", 2)
  .off("event1", fn)
  .emit("event1", 1).emit("event2", 2);

//TP PART 3 - B
var julien = EventEmitter.prototype.makeEventEmitter();
julien
  .once("event", function(){console.log("should only be printed once");})
  .emit("event")
  .emit("event");

//PART 4
var fn = console.log.bind(console);
var julien = EventEmitter.prototype.makeEventEmitter();
julien
  .times("event1", 2, fn)
  .emit("event1", "hello should be print")
  .emit("event1", "world should be print")
  .emit("event1", "SHOULD NOT BE PRINTED");
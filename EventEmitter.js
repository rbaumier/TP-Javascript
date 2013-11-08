function EventEmitter(){
  this.callbacks = {};
}

EventEmitter.prototype = {
  times: function(event, number, fn){
    if(!this.callbacks.hasOwnProperty(event)){
      this.callbacks[event] = [];
    }
    var count  = 0,
        fnthis = this,
        OnceFn = function(){
          ++count;
          var fn_index = fnthis.callbacks[event].indexOf(fn);
          if(count==number){
            fnthis.callbacks[event].splice(fn_index,2);
          }
        };
    this.callbacks[event].push(fn);
    this.callbacks[event].push(OnceFn);
    return this;
  },

  once: function(event, fn){
    if(!this.callbacks.hasOwnProperty(event)){
      this.callbacks[event] = [];
    }
    var fnthis = this,
        OnceFn = function(){
          var fn_index = fnthis.callbacks[event].indexOf(fn);
          fnthis.callbacks[event].splice(fn_index,2);
        };
    this.callbacks[event].push(fn);
    this.callbacks[event].push(OnceFn);
    return this;
  },

  on: function(event, fn){
    if(!this.callbacks.hasOwnProperty(event)){
      this.callbacks[event] = [];
    }
    this.callbacks[event].push(fn); //push "event1"
    return this;
  },

  off: function(event, fn){
    var args = Array.prototype.slice.call(arguments);
    args.shift();

    if(!event && !fn){
      this.callbacks = [];
    }
    else if(event && !fn){
      delete this.callbacks[event];
    }
    else{
      this.callbacks[event].splice(event.indexOf(fn));
    }
    return this;
  },

  emit: function(event /*, args */){
    var args = Array.prototype.slice.call(arguments);
    args.shift();
    if(this.callbacks.hasOwnProperty(event)){
      this.callbacks[event].forEach(function(f){
        f.apply(this, args);
      });
    }
    return this;
  },

  makeEventEmitter: function(){
    var eventEmitter = new EventEmitter();
    return eventEmitter;
  }
};
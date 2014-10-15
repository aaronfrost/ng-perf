(function(global){

  global.Task = Task;

  function Task(data){
    if(this == window) return new Task(data);

    _.extend(this, data);

  }

})(window||global);







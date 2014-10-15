
(function(global){
  global.TaskList = TaskList;

  function TaskList(data){
    if(this == window) return new TaskList(data);
    data = data || {};

    this.tasks = [];
    this.taskMap = {};

    _.extend(this, _.omit(data, 'tasks'));

    if(data.tasks && data.tasks.length){
      _.each(data.tasks, function(task){
        this.addTask(task);
      });
    }

  }

  TaskList.prototype.addTask = function(task){
    if(!task instanceof Task) return false; //Only Put Tasks In Here

    if(this.taskMap[task.id] != undefined) { //Alread in list
      _.extend(this.taskMap[task.id], task);
    } else {
      this.taskMap[task.id] = task;
      this.tasks.push(task);
    }
  };

  TaskList.prototype.removeTask = function(task){
    if(!task instanceof Task) return false; //Only Remove Tasks From Here

    if(this.taskMap[task.id] == undefined) return false; //Not In The List

    removeById.call(this, task.id); //Remove By Id, instead of looking for an identical reference
  };

  TaskList.prototype.hasTask = function(task){
    return this.taskMap[task.id] != undefined;
  };

  function removeById(id){
    var index = this.tasks.indexOf(this.taskMap[id]);
    delete this.taskMap[id]; //Remove from Map
    this.tasks.splice(index, 1); //Remove from Array
  }
})(window||global);




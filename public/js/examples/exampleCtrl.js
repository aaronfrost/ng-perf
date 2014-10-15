angular.module('perfApp').controller('exampleCtrl', function($scope, $location, $http){

  getData();

  $scope.getData = getData;
  $scope.mouseDownTask = mouseDownTask;
  $scope.mouseUpTask = mouseUpTask;

  $scope.moveTask = moveTask;

  function resetTaskLists(){
    initTaskLists();
    $scope.taskLimit = 20;
  }

  function initTaskLists(){
    //THIS SHOULD COME FROM THE SERVER. I AM MAKING SOME LISTS.
    $scope.taskLists = [1, 2, 3, 4, 5].map(function(num){
      return 'List-'+num;
    }).map(function(name){
      return new TaskList({name:name});
    });
  }

  function getData(){
    showAngularStats();
    $http.get('../json/final-tasks.json').then(organizeData);
  }

  function organizeData(data){
    resetTaskLists();
    data.data.forEach(function(task, i){
      //IGNORE THIS. DOCTORING DATA
      task.assignees = task.assignees.map(function(a){
        return a.user.SSN;
      });

      //Make Task object from JSON object
      task = new Task(task);

      //Put Task into a TaskList
      $scope.taskLists[i%5].addTask(task);


    });

  }

  function mouseDownTask(task, $event){
    getListForTask(task).removeTask(task);


    $scope.floaty = getFloaty($event);
    $scope.mouseDown = true;
    $scope.taskToDrag = task;
    $('body').on('mousemove', trackTaskDrag);
  }

  function mouseUpTask(task){
    removeFloaty();
    $('body').on('mousemove', trackTaskDrag);
  }

  function getListForTask(task){
    return _.find($scope.taskLists, function(list){
      if(list.hasTask(task)) return list;
    });
  }

  function moveTask(task){

  }

  function trackTaskDrag(ev){

    $scope.floaty.css({
      top: (ev.pageY - ($scope.floaty.height() / 2))+'px',
      left: (ev.pageX - ($scope.floaty.width() / 2))+'px'
    });
  }

  function getFloaty(ev){

    var target = $(ev.target).closest('.task-container');
    var float = target.clone();
    float.css({
      position: 'absolute',
      top: '200px',
      left: '400px',
      width: target.width()+'px'
    }).addClass('floaty');
    $('body').append(float);
    return float;
  }

  function removeFloaty(){
    $('.floaty').remove();
  }
});
angular.module('perfApp').controller('exampleCtrl', function($scope, $location, $http){

  getData();

  $scope.getData = getData;
  $scope.mouseDownTask = mouseDownTask;
  $scope.mouseUpTask = mouseUpTask;

  $scope.moveTask = moveTask;

  function resetTaskLists(){
    $scope.taskLists = [[],[],[],[],[]];
    $scope.taskLimit = 20;
  }

  function getData(){
    showAngularStats();
    $http.get('../json/final-tasks.json').then(organizeData);
  }

  function organizeData(data){
    resetTaskLists();
    data.data.forEach(function(task, i){
      $scope.taskLists[i%5].push(task);
      $scope.taskLists.forEach(function(l){l.splice($scope.taskLimit, 1000)});
      task.assignees = task.assignees.map(function(a){
        return a.user.SSN;
      });
    });

  }

  function mouseDownTask(task, $event){
    var list = getListForTask(task);
    var index = list.indexOf(task);
    list.splice(index, 1);
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
    var myList;
    $scope.taskLists.forEach(function(list){
      if(list.indexOf(task) >= 0){
        myList = list;
      }
    });
    return myList;
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
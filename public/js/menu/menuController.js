angular.module('perfApp').controller('menuController', function(
  $scope
  , $location
){
  $scope.menuOptions = [
    {name: "Start", path: '/'}
    ,{name: "$digests", path: '/digests'}
    ,{name: "examples", path: '/example1'}
  ];

  $scope.selectOption = selectOption;
  setDefaultOption();

  $scope.$on('$routeUpdate', function(){
    console.log("Search", $location.search());
  });

  function selectOption(index){
    $scope.selectedOption = $scope.menuOptions[index];
  }

  function setDefaultOption(){
    $scope.menuOptions.forEach(function(o){
      if(o.path == $location.$$path){
        $scope.selectedOption = o;
      }
    });
    if(!$scope.selectedOption){
      $scope.selectedOption = $scope.menuOptions[0];
    }
  }

});
angular.module('perfApp').controller('startCtrl', function($scope, $location){
  $scope.myVar = "THIS VALUE COMES FROM THE CONTROLLER";
  $scope.newVal = "<GET SOME STRING FROM THE CROWD>";




  if($location.search().showStats) showAngularStats();
});
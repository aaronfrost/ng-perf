angular.module('perfApp').controller('digestCtrl', function($scope){

  $scope.waysLimit = 0;
  $scope.ways = [
    'Adding Events',
    '$scope.$apply',
    '$scope.$digest',
    'Third Party Plugins',
    'Websocket Integation',
    'Others????'

  ];

});
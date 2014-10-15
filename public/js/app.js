angular.module('perfApp', ['ngRoute', 'gist'])
.config(function($routeProvider, $locationProvider){
    $locationProvider.html5Mode(true);

    //HAVE TO PULL IN THIS WAY, CAUSE $httpProvider DOESN'T EXIST YET
    var $http = angular.injector(['ng']).get('$http');

    $http.get('/paths').then(function(res){
      var paths = res.data;
      paths.forEach(function(path){
        var location = path.path;
        var config = {};
        if(path.controller) config.controller = path.controller;
        if(path.templateUrl) config.templateUrl = path.templateUrl;

        $routeProvider.when(location, config);
      });

      var $route = angular.element(document.querySelector('body')).injector().get('$route');
      $route.reload();

    });

  });



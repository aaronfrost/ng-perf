angular.module('perfApp').service('userService', function($http, $q){
  var users = {};

  return {
    getBySSN: getBySSN
  };

  function getBySSN(ssn){
    var d = $q.defer();
    if(users[ssn]){
      d.resolve(users[ssn]);
      return d.promise;
    } else {
      return $http.get('../json/people.json').then(function(data){
        var u = data.data.map(function(usr){ return usr.user});
        u.forEach(function(usr){
          users[usr.SSN] = usr;
        });
        return users[ssn];
      });
    }


  }
});
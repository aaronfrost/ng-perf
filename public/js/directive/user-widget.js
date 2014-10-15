angular.module('perfApp').directive('userWidget', function(userService){


  return {
    restrict: 'A',
    replace: true,
    templateUrl: '/js/directive/user-widget.html',
    scope:{
      inUser: '=userWidget'
    },
    compile: function(el, attrs, trans){

      return {
        pre: preLink,
        post: postLink
      }
    }
  };

  function preLink(scope, element, attrs){
    //Nothing
  }
  function postLink(scope, element, attrs){
    scope.size = attrs.size || 'medium';

    if(scope.inUser.SSN){
      scope.user = scope.inUser;
    }else{
      userService.getBySSN(scope.inUser).then(function(u){
        scope.user = u;
//        console.log(u);
      });
    }

  }

});
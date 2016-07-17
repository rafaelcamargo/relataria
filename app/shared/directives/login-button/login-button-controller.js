(function(app){

  'use strict';

  app.controller('loginButtonController', [
    '$scope',
    '$location',
    'userService',
    function($scope, $location, userService){

    $scope.login = function(evt){
      userService.login(evt);
    };

    $scope.login();

  }]);

})(app);

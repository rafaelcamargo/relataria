(function(app){

  'use strict';

  app.controller('usersCardController', [
    '$scope',
    'reportService',
    function($scope, reportService){

    $scope.getUsers = function(){
      reportService.get('users').then(onGetSuccess, onGetError);
    };

    function onGetSuccess(data){
      $scope.users = data;
    }

    function onGetError(response){
      console.log(response);
    }

    $scope.getUsers();

  }]);

})(app);

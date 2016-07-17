(function(app){

  'use strict';

  app.controller('profileSelectorController', [
    '$scope',
    '$location',
    'userService',
    function($scope, $location, userService){

      $scope.profiles = [];

      $scope.viewReports = function(){
        var id = $scope.selectedProfile.id;
        $location.path('/reports/' + id);
      };

      function onGetProfilesSuccess(profiles){
        $scope.profiles = profiles;
        $scope.selectedProfile = profiles[0];
        $scope.$digest();
      }

      userService.getProfiles(onGetProfilesSuccess);

  }]);

})(app);

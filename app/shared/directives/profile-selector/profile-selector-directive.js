(function(app){

  'use strict';

  app.directive('profileSelector', function(){

    return {
      templateUrl: 'app/shared/directives/profile-selector/profile-selector-template.html',
      controller: 'profileSelectorController'
    };

  });

})(app);

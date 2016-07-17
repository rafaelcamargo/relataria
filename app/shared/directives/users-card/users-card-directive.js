(function(app){

  'use strict';

  app.directive('usersCard', function(){

    return {
      templateUrl: 'app/shared/directives/users-card/users-card-template.html',
      controller: 'usersCardController'
    };

  });

})(app);

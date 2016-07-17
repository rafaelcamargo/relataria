(function(app){

  'use strict';

  app.directive('loginButton', function(){

    return {
      templateUrl: 'app/shared/directives/login-button/login-button-template.html',
      controller: 'loginButtonController'
    };

  });

})(app);

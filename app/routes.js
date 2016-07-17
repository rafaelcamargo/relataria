;(function(app){

  app.config(function($routeProvider){
    $routeProvider.when('/login', {
      templateUrl: 'app/views/login/login-template.html'
    }).when('/profiles', {
      templateUrl: 'app/views/profiles/profiles-template.html'
    }).when('/reports/:profileId', {
      templateUrl: 'app/views/reports/reports-template.html'
    }).otherwise({
      redirectTo: '/login'
    });
  });

})(app);

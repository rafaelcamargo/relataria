;(function(app){
  'use strict';

  app.factory('reportResource', [
    '$resource',
    function($resource) {

      var baseUrl = 'https://www.googleapis.com/analytics/v3/data/ga';

      return $resource(baseUrl);

  }]);

})(app);

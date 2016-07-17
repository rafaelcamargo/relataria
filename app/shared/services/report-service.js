(function(app){

  'use strict';

  app.service('reportService', [
    '$q',
    '$routeParams',
    function($q, $routeParams){

      var _public = {};

      _public.get = function(dataType){
        var deferred = $q.defer();

        var params = buildParams(dataType);
        if(isApiLoaded())
          getData(dataType, params, deferred);

        return deferred.promise;
      };

      function getData(dataType, requestParams, deferred){
        gapi.client.analytics.data.ga.get(requestParams).execute(function(data){
          deferred.resolve(data.totalsForAllResults['ga:' + dataType]);
        });
      }

      function buildParams(dataType){
        return {
          'ids': 'ga:' + getProfileId(),
          'start-date': '2016-07-16',
          'end-date': '2016-07-16',
          'metrics': 'ga:' + dataType
        };
      }

      function getProfileId(){
        return $routeParams.profileId;
      }

      function isApiLoaded(){
        return gapi && gapi.client && gapi.client.analytics;
      }

      return _public;

  }]);

})(app);

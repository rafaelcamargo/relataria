(function(app){

  'use strict';

  app.service('authService', [
    'APP_CONSTANTS',
    '$q',
    '$timeout',
    function(APP_CONSTANTS, $q, $timeout){

      var _public = {};

      _public.auth = function(evt, successCallback, errorCallback){
        var data = getAuthData(evt);
        getToken(data, successCallback, errorCallback);
      };

      function getToken(data, successCallback, errorCallback){
        if(gapi && gapi.auth)
          gapi.auth.authorize(data, function(response) {
            if (response.error)
              errorCallback(response.error);
            else
              successCallback(response);
          });
        else
          $timeout(function(){
            getToken(data, successCallback, errorCallback);
          }, 500);
      }

      function getAuthData(evt){
        // Immediate means we are trying auth the user when the page just loads.
        // So, immediate should be false when invoked from a button click.
        return {
          client_id: APP_CONSTANTS.CLIENT_ID,
          scope: APP_CONSTANTS.SCOPES,
          immediate: evt ? false : true
        };
      }

      return _public;

  }]);

})(app);

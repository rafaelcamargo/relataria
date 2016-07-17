(function(app){

  'use strict';

  app.service('userService', [
    'USER_CONSTANTS',
    '$window',
    'authService',
    'profilesService',
    function(USER_CONSTANTS, $window, authService, profilesService){

      var _public = {};

      _public.isAuthenticated = function(){
        return USER_CONSTANTS.AUTH.TOKEN;
      };

      _public.login = function(evt, successCallback, errorCallback){
        if(this.isAuthenticated())
          successCallback();
        else
          authService.auth(evt, function(response){
            onLoginSuccess(response, successCallback);
          }, function(response){
            onLoginError(response, errorCallback);
          });
      };

      _public.logout = function(){
        USER_CONSTANTS.AUTH.TOKEN = null;
        USER_CONSTANTS.PROFILES = null;
      };

      _public.getProfiles = function(successCallback, errorCallback){
        if(!this.isAuthenticated())
          getProfilesAfterGetUserAuthenticated(successCallback, errorCallback);
        else if(USER_CONSTANTS.PROFILES)
          successCallback(USER_CONSTANTS.PROFILES);
        else
          profilesService.get(successCallback, errorCallback);
      };

      _public.setProfiles = function(profiles){
        USER_CONSTANTS.PROFILES = profiles;
      };

      function getProfilesAfterGetUserAuthenticated(successCallback, errorCallback){
        _public.login(null, function(){
          _public.getProfiles(successCallback, errorCallback);
        }, function(response){
          if(errorCallback)
            errorCallback(response);
          else
            onLoginError(response);
        });
      }

      function onLoginSuccess(response, successCallback){
        USER_CONSTANTS.AUTH.TOKEN = response.access_token;
        if(successCallback)
          successCallback();
        else
          $window.location.hash = '#/profiles';
      }

      function onLoginError(response, errorCallback){
        if(errorCallback)
          errorCallback(response);
        else
          $window.location.hash = '#/login';
      }

      return _public;

  }]);

})(app);

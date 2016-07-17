(function(app){

  'use strict';

  app.service('profilesService', [
    '$q',
    '$timeout',
    function($q, $timeout){

      var _public = {};

      _public.get = function(successCallback, errorCallback){
        getAccountSummaries(successCallback, errorCallback);
      };

      function getAccountSummaries(successCallback, errorCallback){
        if(gapi && gapi.client)
          gapi.client.load('analytics', 'v3').then(function() {
            gapi.client.analytics.management.accountSummaries.list()
              .then(function(response){
                var profiles = getProfiles(response.result.items);
                successCallback(profiles);
              }, function(response){
                if(errorCallback)
                  errorCallback(response);
              });
          });
        else
          $timeout(function(){
            getAccountSummaries(successCallback, errorCallback);
          }, 500);
      }

      function getProfiles(accountSummaries){
        var allProfiles = [];
        for (var i = 0; i < accountSummaries.length; i++) {
          var webProperties = accountSummaries[i].webProperties;
          for (var j = 0; j < webProperties.length; j++) {
            var profiles = webProperties[j].profiles;
            for (var k = 0; k < profiles.length; k++) {
              var profile = buildProfile(accountSummaries[i], webProperties[j], profiles[k]);
              allProfiles.push(profile);
            }
          }
        }
        return allProfiles;
      }

      function buildProfile(account, webProperty, profile){
        profile.account = {
          id: account.id,
          name: account.name
        };
        profile.webProperty = {
          id: webProperty.id,
          name: webProperty.name
        };
        return profile;
      }

      return _public;

  }]);

})(app);

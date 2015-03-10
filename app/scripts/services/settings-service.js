'use strict';

angular.module('safeApp')
  .service('SettingsService', function SettingsService($http, Client) {

    this.getSettings = function() {

      var docletId = Client.getDocletId();

      return $http.get('/api/doclet/' + docletId + '/bucket/data/settings');
    };

    this.saveSettings = function(settings) {

      var docletId = Client.getDocletId();

      return $http.put('/api/doclet/' + docletId + '/bucket/data/settings', settings);
    };

  });

'use strict';

angular.module('safeApp')
  .service('SettingsService', function SettingsService($http, $log, Client) {

    this.initSettings = function() {

      var docletId = Client.getDocletId();
      var tableId = docletId + '.settings';

      var definition = {
        name: 'settings',
        docletId: docletId,
        type: 'dets',
        key: 1,
        columns: ['id', 'sourcePath', 'publicKeyPath', 'privateKeyPath']
      };

      return $http.put('/api/doclet/' + docletId + '/table/' + tableId, definition);
    };

    this.getSettings = function() {

      // The unique id of the table is $(docletId).settings
      var tableId = Client.getDocletId() + '.settings';

      return $http.get('/api/doclet/table/' + tableId + '/Row/0');
    };

    this.saveSettings = function(settings) {

      var setting = {
        id: '0',
        sourcePath: settings.sourcePath,
        publicKeyPath: settings.publicKeyPath,
        privateKeyPath: settings.privateKeyPath
      };

      var tableId = Client.getDocletId() + '.settings';

      return $http.put('/api/doclet/table/' + tableId + '/row/0', setting);
    };

  });

'use strict';

angular.module('safeApp')
  .controller('SettingsCtrl', function($scope, $location, Client, SettingsService) {

    $scope.settings = Client.getSettings();

    $scope.done = function() {

      SettingsService.saveSettings($scope.settings)
        .success(function() {
            
          Client.setSettings($scope.settings);
          $location.path('/');
        })
        .error(function() {
            $scope.error = 'Failed to save settings';
        });
    };

  });

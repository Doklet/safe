'use strict';

angular.module('safeApp')
  .controller('SettingsCtrl', function($scope, $location, ModalService, Client, SettingsService) {

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

    $scope.browseSourceDir = function() {

      // Just provide a template url, a controller and call 'showModal'.
      ModalService.showModal({
        templateUrl: 'views/filedialog.html',
        controller: 'FiledialogCtrl',
        inputs: {
          dialogType: 'folder',
          dialogTitle: 'Select source folder'
        }
      }).then(function(modal) {
        // The modal object has the element built, if this is a bootstrap modal
        // you can call 'modal' to show it, if it's a custom modal just show or hide
        // it as you need to.
        modal.element.modal();
        
        modal.close.then(function(absfilename) {

          $scope.settings.sourcePath = absfilename;
        });
      });

    };

    $scope.browsePublicKey = function() {

      // Just provide a template url, a controller and call 'showModal'.
      ModalService.showModal({
        templateUrl: 'views/filedialog.html',
        controller: 'FiledialogCtrl',
        inputs: {
          dialogType: 'file',
          dialogTitle: 'Select public key'
        }
      }).then(function(modal) {
        // The modal object has the element built, if this is a bootstrap modal
        // you can call 'modal' to show it, if it's a custom modal just show or hide
        // it as you need to.
        modal.element.modal();
        modal.close.then(function(absfilename) {

          $scope.settings.publicKeyPath = absfilename;
        });
      });

      $scope.browsePrivateKey = function() {

        // Just provide a template url, a controller and call 'showModal'.
        ModalService.showModal({
          templateUrl: 'views/filedialog.html',
          controller: 'FiledialogCtrl',
          inputs: {
            dialogType: 'file',
            dialogTitle: 'Select private key'
          }
        }).then(function(modal) {
          // The modal object has the element built, if this is a bootstrap modal
          // you can call 'modal' to show it, if it's a custom modal just show or hide
          // it as you need to.
          modal.element.modal();
          modal.close.then(function(absfilename) {

            $scope.settings.privateKeyPath = absfilename;
          });
        });

      };
    };

  });

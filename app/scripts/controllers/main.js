'use strict';

angular.module('safeApp')
  .controller('MainCtrl', function($scope, $window, $location, Client, PipeService, ModalService) {

    $scope.uploadingFiles = [];

    Client.setSessionId($window.unescape($location.search().token));

    $scope.goToSettings = function() {
      $location.path('/settings');
    };

    $scope.upload = function(file) {
      var commands = 'encrypt --privkey=' + Client.getPrivateKeyPath();
      var filename = file.name.substring(file.name.lastIndexOf('/') + 1);
      var outputFilename = Client.getSourcePath() + filename;

      file.status = 'Uploading file';

      PipeService.run(commands, undefined, file.name, outputFilename)
        .success(function() {
          file.status = 'Completed';
        })
        .error(function() {
          file.status = 'Failed to upload file';
        });
    };

    $scope.cancel = function(file) {
      var index = $scope.uploadingFiles.indexOf(file);
      $scope.uploadingFiles.splice(index, 1);
    };

    $scope.add = function() {

      // Just provide a template url, a controller and call 'showModal'.
      ModalService.showModal({
        templateUrl: 'views/filedialog.html',
        controller: 'FiledialogCtrl'
      }).then(function(modal) {
        // The modal object has the element built, if this is a bootstrap modal
        // you can call 'modal' to show it, if it's a custom modal just show or hide
        // it as you need to.
        modal.element.modal();
        modal.close.then(function(absfilename) {
          var file = {
            name: absfilename,
            status: undefined
          };
          $scope.uploadingFiles.push(file);
        });
      });

    };

  });

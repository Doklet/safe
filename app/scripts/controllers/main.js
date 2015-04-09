'use strict';

angular.module('safeApp')
  .controller('MainCtrl', function($scope, $window, $location, Client, PipeService, AccountService, SettingsService, ModalService) {

    // The state of the progress of setting up the safe
    $scope.SETTINGS_STATE = {
      // Loading from server
      Loading: 0,
      // No setting has been set
      NoSettingsAvailable: 1,
      // The settings has been set
      Completed: 2
    };

    $scope.state = $scope.SETTINGS_STATE.Loading;

    $scope.sourcePath = '';
    $scope.uploadingFiles = [];
    $scope.fileinfos = undefined;
    $scope.selectedFile = undefined;

    Client.setDocletId($window.unescape($location.search().docletId));
    Client.setSessionId($window.unescape($location.search().token));

    $scope.docletId = Client.getDocletId();

    $scope.init = function() {

      SettingsService.getSettings()
        .success(function(settings) {
          Client.setSettings(settings);

          $scope.sourcePath = settings.sourcePath;
          
          AccountService.getFileinfo(settings.sourcePath)
            .success(function(fileinfo) {
              Client.setFileInfos(fileinfo);
              $scope.fileinfos = fileinfo;
              $scope.state = $scope.SETTINGS_STATE.Completed;
            })
            .error(function() {
              $scope.error = 'Failed to list encrypted files';
              // Set the state to completed but the source path seems to be invalid
              $scope.state = $scope.SETTINGS_STATE.Completed;
              $scope.fileinfos = [];
            });
        })
        .error(function(response, status) {
          // The first time there is no saved settings, so a 404 is expected here
          if (status === 404) {
            // Expected
            $scope.state = $scope.SETTINGS_STATE.NoSettingsAvailable;
          } else {
            $scope.error = 'Failed to fetch settings ' + status;
          }
        });

    };

    // Invoke init to fetch the needed data
    $scope.init();

    $scope.refreshFileinfos = function() {
      $scope.fileinfos = undefined;

      AccountService.getFileinfo(Client.getSourcePath())
        .success(function(fileinfo) {
          Client.setFileInfos(fileinfo);
          $scope.fileinfos = fileinfo;
        })
        .error(function() {
          $scope.error = 'Failed to get info about encrypted files';
        });
    };

    $scope.fileSelected = function(fileinfo) {
      $scope.selectedFile = fileinfo;
    };

    $scope.goToSettings = function() {
      $location.path('/settings');
    };

    $scope.upload = function(file) {
      var commands = 'encrypt --privkey=' + Client.getPrivateKeyPath();
      var filename = file.name.substring(file.name.lastIndexOf('/') + 1);
      var outputFilename = Client.getSourcePath() + '/' + filename;

      file.status = 'Uploading file';

      PipeService.run(commands, undefined, file.name, outputFilename)
        .success(function() {
          // Remove the file from uploading files
          var index = $scope.uploadingFiles.indexOf(file);
          $scope.uploadingFiles.splice(index, 1);
          // Reload the fileinfo's
          $scope.refreshFileinfos();
        })
        .error(function() {
          file.status = 'Failed to upload file';
        });
    };

    $scope.computeFileUrl = function(fileinfo) {
      var commands = 'pipe=decrypt --pubkey=' + Client.getPublicKeyPath();

      var args = '&token=' + Client.getSessionId();
      args += '&input=' + Client.getSourcePath() + '/' + fileinfo.name;
      args += '&download=' + fileinfo.name;

      return '/api/pipe/run?' + commands + args;
    };

    $scope.delete = function(fileinfo) {

      var filePath = Client.getSourcePath() + '/' + fileinfo.name;

      $scope.info = 'Deleting file, please wait';

      AccountService.deleteFile(filePath)
        .success(function() {
          $scope.info = undefined;

          var index = $scope.fileinfos.indexOf(fileinfo);
          $scope.fileinfos.splice(index, 1);
        })
        .error(function() {
          $scope.info = undefined;
          $scope.error = 'Failed to delete file';
        });
    };

    $scope.download = function(fileinfo) {
      var filepath = Client.getSourcePath() + '/' + fileinfo.name;
      AccountService.getFile(filepath);
    };

    $scope.cancel = function(file) {
      var index = $scope.uploadingFiles.indexOf(file);
      $scope.uploadingFiles.splice(index, 1);
    };

    $scope.add = function() {

      // Just provide a template url, a controller and call 'showModal'.
      ModalService.showModal({
        templateUrl: 'views/filedialog.html',
        controller: 'FiledialogCtrl',
        inputs: {
          dialogType: 'file',
          dialogTitle: 'Select file to add'
        }
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

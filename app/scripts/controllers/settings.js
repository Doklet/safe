'use strict';

angular.module('safeApp')
  .controller('SettingsCtrl', function ($scope, $location, Client) {

    $scope.sourcePath = Client.getSourcePath();
    $scope.publicKeyPath = Client.getPublicKeyPath();
    $scope.privateKeyPath = Client.getPrivateKeyPath();

    $scope.done = function() {
    	Client.setSourcePath($scope.sourcePath);
    	Client.setPublicKeyPath($scope.publicKeyPath);
    	Client.setPrivateKeyPath($scope.privateKeyPath);
    	$location.path('/');
    };

  });

'use strict';

angular.module('safeApp')
  .controller('skrAccountCtrl', function($scope, $location, Client) {

    $scope.selectedFile = undefined;
    $scope.fileinfos = Client.getFileInfos();

    $scope.fileSelected = function(fileinfo) {
      $scope.selectedFile = fileinfo;
    };

  });

angular.module('safeApp')
  .directive('skrAccount', function() {
    return {
      controller: 'skrAccountCtrl',
      templateUrl: 'views/skr-account.html',
      restrict: 'E', // (2)
      replace: true, // (3)
      transclude: true // (4),
    };
  });

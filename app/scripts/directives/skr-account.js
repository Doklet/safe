'use strict';

angular.module('safeApp')
  .controller('skrAccountCtrl', function($scope, $location, Client) {

    $scope.fileinfos = Client.getFileInfos();

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

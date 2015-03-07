'use strict';

/**
 * @ngdoc directive
 * @name safeApp.directive:skrFiledialog
 * @description
 * # skrFiledialog
 */
angular.module('safeApp')
  .directive('skrFiledialog', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element) {
        element.text('this is the skrFiledialog directive');
      }
    };
  });

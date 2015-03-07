'use strict';

describe('Controller: FiledialogCtrl', function () {

  // load the controller's module
  beforeEach(module('safeApp'));

  var FiledialogCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FiledialogCtrl = $controller('FiledialogCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});

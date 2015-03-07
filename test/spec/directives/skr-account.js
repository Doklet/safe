'use strict';

describe('Directive: skrAccount', function () {

  // load the directive's module
  beforeEach(module('safeApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<skr-account></skr-account>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the skrAccount directive');
  }));
});

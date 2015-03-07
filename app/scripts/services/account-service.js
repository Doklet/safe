'use strict';

angular.module('safeApp')
  .service('AccountService', function AccountService($http) {

    this.getAll = function() {
      return $http.get('/api/account');
    };

    this.fetchFileinfo = function(accountId, path) {
      //return $http.get('/api/' + 'fileinfo' );
      return $http.get('/api/account/' + accountId + '/file_info/' + path);
    };

  });

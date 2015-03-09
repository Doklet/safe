'use strict';

angular.module('safeApp')
  .service('Client', function Client() {

    var _docletId;
    var _sessionId;

    var _settings;

    var _sourcePath;
    var _publicKeyPath;
    var _privateKeyPath;

    var _fileinfos = [{
      name: 'File1',
      modified: 'Modified',
      size: 12
    }];


    this.reset = function() {
      _sessionId = undefined;
    };

    this.setDocletId = function(docletId) {
      _docletId = docletId;
    };

    this.getDocletId = function() {
      return _docletId;
    };

    this.setSessionId = function(sessionId) {
      _sessionId = sessionId;
    };

    this.getSessionId = function() {
      return _sessionId;
    };

    this.setSettings = function(settings) {
      _settings = settings;
    };

    this.getSettings = function() {
      return _settings;
    };

    this.setSourcePath = function(sourcePath) {
      _sourcePath = sourcePath;
    };

    this.getSourcePath = function() {
      return _sourcePath;
    };

    this.setPublicKeyPath = function(publicKeyPath) {
      _publicKeyPath = publicKeyPath;
    };

    this.getPublicKeyPath = function() {
      return _publicKeyPath;
    };

    this.setPrivateKeyPath = function(privateKeyPath) {
      _privateKeyPath = privateKeyPath;
    };

    this.getPrivateKeyPath = function() {
      return _privateKeyPath;
    };

    this.setFileInfos = function(fileinfos) {
      _fileinfos = fileinfos;
    };

    this.getFileInfos = function() {
      return _fileinfos;
    };

  });

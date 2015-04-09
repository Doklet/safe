'use strict';

angular.module('safeApp')
  .service('Client', function Client() {

    var _docletId;
    var _sessionId;

    var _settings;

    var _fileinfos = [];

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
      if (_settings === undefined) {
        _settings = {
          sourcePath: undefined,
          publicKeyPath: undefined,
          privateKeyPath: undefined
        };
      }
      
      return _settings;
    };

    this.getSourcePath = function() {
      return _settings.sourcePath;
    };

    this.getPublicKeyPath = function() {
      return _settings.publicKeyPath;
    };

    this.getPrivateKeyPath = function() {
      return _settings.privateKeyPath;
    };

    this.setFileInfos = function(fileinfos) {
      _fileinfos = fileinfos;
    };

    this.getFileInfos = function() {
      return _fileinfos;
    };

  });

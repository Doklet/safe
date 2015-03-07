'use strict';

angular.module('safeApp')
  .service('PipeService', function PipeService($http, $log) {

    this.run = function(commands, text, inputFile, outputFile) {
      var args = '';
      var input = '';

      if (commands !== undefined) {
        args += 'pipe=' + commands;
      }

      if (inputFile !== undefined) {
        args += '&input=' + inputFile;
      }

      if (outputFile !== undefined) {
        args += '&output=' + outputFile;
      }

      if (text !== undefined) {
        input = text;
      }

      $log.info(args);
      
      return $http.post('/api/pipe/run?' + args, input);
    };

  });

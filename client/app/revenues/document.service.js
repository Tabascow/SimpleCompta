'use strict';

angular.module('simpleComptaApp')
  .factory('Document', function ($resource) {
    return $resource('api/documents/:id', {
      id: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  });

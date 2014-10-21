'use strict';

angular.module('simpleComptaApp')
    .factory('Revenue', function ($resource) {
        return $resource('api/revenues/:id', {
            id: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    });
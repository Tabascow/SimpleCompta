'use strict';

angular.module('simpleComptaApp')
    .factory('Expense', function ($resource) {
        return $resource('api/expenses/:id', {
            id: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    });
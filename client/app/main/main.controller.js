'use strict';

angular.module('simpleComptaApp')
  .controller('MainCtrl', function ($scope, $http) {
    $scope.lastExpenses = [];
    $scope.lastRevenues = [];

    $http.get('/api/expenses/recents').success(function(res) {
      $scope.lastExpenses = res;
    });

    $http.get('/api/revenues/recents').success(function(res) {
      $scope.lastRevenues = res;
    });
  });

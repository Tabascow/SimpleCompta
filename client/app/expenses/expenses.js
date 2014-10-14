'use strict';

angular.module('simpleComptaApp')
  .config(function ($stateProvider) {
        $stateProvider.state('all expenses', { url: '/expenses', templateUrl: 'app/expenses/views/list.html', controller: 'ExpensesCtrl' });
        $stateProvider.state('create expense', { url: '/expense/create', templateUrl: 'app/expenses/views/add.html', controller: 'ExpensesCreateCtrl' });
        $stateProvider.state('update expense', { url: '/expense/:id/edit', templateUrl: 'app/expenses/views/edit.html', controller: 'ExpensesEditCtrl' });

    });
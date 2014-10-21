'use strict';

angular.module('simpleComptaApp')
    .config(function ($stateProvider) {
        $stateProvider.state('all revenues', { url: '/revenues', templateUrl: 'app/revenues/views/list.html', controller: 'RevenuesCtrl',authenticate: true });
        $stateProvider.state('create revenue', { url: '/revenue/create', templateUrl: 'app/revenues/views/add.html', controller: 'RevenuesCreateCtrl',authenticate: true });
        $stateProvider.state('update revenue', { url: '/revenue/:id/edit', templateUrl: 'app/revenues/views/edit.html', controller: 'RevenuesEditCtrl',authenticate: true });

    });
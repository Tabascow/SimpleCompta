'use strict';

angular.module('simpleComptaApp')
    .controller('NavbarCtrl', function ($scope, $location, Auth) {
        $scope.menu = [
            {
                'title': 'Home',
                'link': '/',
              'icon':'fa-dashboard'
            },
            {
                'title': 'Dépenses',
                'link': '/expenses',
              'icon':'fa-upload'
            },
            {
                'title': 'Recettes',
                'link': '/revenues',
              'icon':'fa-download'
            }
        ];

        $scope.isCollapsed = true;
        $scope.isLoggedIn = Auth.isLoggedIn;
        $scope.isAdmin = Auth.isAdmin;
        $scope.getCurrentUser = Auth.getCurrentUser;

        $scope.logout = function () {
            Auth.logout();
            $location.path('/login');
        };

        $scope.isActive = function (route) {
            return route === $location.path();
        };
    });

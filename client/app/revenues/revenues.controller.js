'use strict';

angular.module('simpleComptaApp')
    .controller('RevenuesCtrl', function ($scope, $timeout, Revenue,userNotification) {
        $scope.revenues = Revenue.query();

        $scope.deleteRevenue = function (revenue) {
            revenue.$delete(function () {
                userNotification.add("success", "La recette a été supprimée");
                $scope.revenues.splice($scope.revenues.indexOf(revenue),1);
            },function(error){
                Alert.add("warning", "Erreur lors de la suppression");
            });

        };
    });

angular.module('simpleComptaApp')
    .controller('RevenuesEditCtrl', function ($scope, $timeout, Revenue, $state, $stateParams,userNotification) {

        $scope.revenue =  Revenue.get({id: $stateParams.id});

        $scope.updateRevenue = function () {
            $scope.revenue.$update(function () {
                userNotification.add("success", "La recette a été modifiée");
                $state.go('all revenues');
            },function(error){
                Alert.add("warning", "Erreur lors de la modification");
            });
        };


        $scope.open = function($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.opened = true;
        };
    });
angular.module('simpleComptaApp')
    .controller('RevenuesCreateCtrl', function ($scope, $timeout, Revenue, $state,userNotification) {
        $scope.items = ['Cash','CB','Cheque']

        $scope.revenue =  new Revenue()

        $scope.createRevenue = function () {
            $scope.revenue.$save(function () {
                userNotification.add("success", "La recette a été ajoutée");
                $state.go('all revenues');
            },function(error){
                Alert.add("warning", "Erreur lors de l'ajout");
            });
        };

        $scope.open = function($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.opened = true;
        };
    });


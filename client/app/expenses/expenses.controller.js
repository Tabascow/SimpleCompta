'use strict';

angular.module('simpleComptaApp')
    .controller('ExpensesCtrl', function ($scope, $timeout, Expense, userNotification) {
        $scope.expenses = Expense.query();

        $scope.deleteExpense = function (expense) {
            expense.$delete(function () {
                userNotification.add('success', 'La dépense a été supprimée');
                $scope.expenses.splice($scope.expenses.indexOf(expense),1);
            },function(){
                userNotification.add('warning', 'Erreur lors de la suppression');
            });
        };
    });

angular.module('simpleComptaApp')
    .controller('ExpensesEditCtrl', function ($scope, $timeout, Expense, $state, $stateParams,userNotification) {

        $scope.items = ['Cash','CB','Cheque'];

        $scope.expense =  Expense.get({id: $stateParams.id});

        $scope.updateExpense = function () {
            $scope.expense.$update(function () {
                userNotification.add('success', 'La recette a été modifiée');
                $state.go('all expenses');
            },function(){
              userNotification.add('warning', 'Erreur lors de la modification');
            });
        };


        $scope.open = function($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.opened = true;
        };
    });
angular.module('simpleComptaApp')
    .controller('ExpensesCreateCtrl', function ($scope, $timeout, Expense, $state,userNotification) {
        $scope.items = ['Cash','CB','Cheque'];

        $scope.expense =  new Expense();

        $scope.createExpense = function () {
            $scope.expense.$save(function () {
                userNotification.add('success', 'La recette a été ajoutée');
                $state.go('all expenses');
            },function(){
              userNotification.add('warning', 'Erreur lors de l\'ajout');
            });
        };

        $scope.open = function($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.opened = true;
        };
    });


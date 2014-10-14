'use strict';

angular.module('simpleComptaApp')
    .controller('ExpensesCtrl', function ($scope, $timeout, Expense) {
        $scope.expenses = Expense.query();

        $scope.deleteExpense = function (expense) {
            expense.$delete(function(){
                $scope.expenses.splice($scope.expenses.indexOf(expense),1);
            });

        };
    });

angular.module('simpleComptaApp')
    .controller('ExpensesEditCtrl', function ($scope, $timeout, Expense, $state, $stateParams) {

        $scope.items = ['Cash','CB','Cheque']

        $scope.expense =  Expense.get({id: $stateParams.id});

        $scope.updateExpense = function () {
            $scope.expense.$update();
            $state.go('all expenses');
        };
    });
angular.module('simpleComptaApp')
    .controller('ExpensesCreateCtrl', function ($scope, $timeout, Expense, $state) {
        $scope.items = ['Cash','CB','Cheque']

        $scope.expense =  new Expense();


        $scope.expense.title= 'test';
        $scope.createExpense = function () {
            $scope.expense.$save();
            $state.go('all expenses');
        };
    });


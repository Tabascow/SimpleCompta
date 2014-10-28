'use strict';

angular.module('simpleComptaApp')
  .controller('ExpensesCtrl', function ($scope, $timeout, Expense, userNotification) {
    $scope.expenses = Expense.query();

    $scope.deleteExpense = function (expense) {
      expense.$delete(function () {
        userNotification.add('success', 'La dépense a été supprimée');
        $scope.expenses.splice($scope.expenses.indexOf(expense), 1);
      }, function () {
        userNotification.add('warning', 'Erreur lors de la suppression');
      });
    };
  });

angular.module('simpleComptaApp')
  .controller('ExpensesEditCtrl', function ($scope, $timeout, Expense, $state, $stateParams, userNotification, $upload, $http) {

    $scope.items = ['Cash', 'CB', 'Cheque'];

    $scope.expense = Expense.get({id: $stateParams.id});

    $scope.updateExpense = function () {
      $scope.expense.$update(function () {
        userNotification.add('success', 'La recette a été modifiée');
        $state.go('all expenses');
      }, function () {
        userNotification.add('warning', 'Erreur lors de la modification');
      });
    };


    $scope.open = function ($event) {
      $event.preventDefault();
      $event.stopPropagation();

      $scope.opened = true;
    };

    $scope.deleteDocument = function (document1) {
      $http.delete('api/documents/' + document1._id).success(function () {
        $scope.expense.attachedDocuments.splice($scope.expense.attachedDocuments.indexOf(document1), 1);
        $http.delete('api/expenses/' + $stateParams.id + '/documents/' + document1._id);
      });
    };

    $scope.onFileSelect = function ($files) {
      //$files: an array of files selected, each file has name, size, and type.
      for (var i = 0; i < $files.length; i++) {
        var file = $files[i];
        $scope.upload = $upload.upload({
          url: 'api/expenses/' + $stateParams.id + '/documents',
          data: {myObj: $scope.myModelObj},
          file: file
        }).progress(function (evt) {
          var percent = parseInt(100.0 * evt.loaded / evt.total);
          $scope.isUploading = true;
          $scope.dynamic = percent;
        }).success(function (data, status, headers, config) {
          $scope.isUploading = false;
          $scope.expense.attachedDocuments.push(data);
          console.log(data);
        });
      }
    };
  });

angular.module('simpleComptaApp')
  .controller('ExpensesCreateCtrl', function ($scope, $timeout, Expense, $state, userNotification) {
    $scope.items = ['Cash', 'CB', 'Cheque'];

    $scope.expense = new Expense();

    $scope.createExpense = function () {
      $scope.expense.$save(function () {
        userNotification.add('success', 'La recette a été ajoutée');
        $state.go('all expenses');
      }, function () {
        userNotification.add('warning', 'Erreur lors de l\'ajout');
      });
    };

    $scope.open = function ($event) {
      $event.preventDefault();
      $event.stopPropagation();

      $scope.opened = true;
    };
  });


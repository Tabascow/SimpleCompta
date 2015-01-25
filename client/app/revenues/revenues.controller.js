'use strict';

angular.module('simpleComptaApp')
  .controller('RevenuesCtrl', function ($scope, $timeout, Revenue, userNotification,uiGridConstants) {
    $scope.revenues = Revenue.query();
/*
    $scope.editCellTemplate = '<a class="btn btn-primary" ui-sref="update revenue({id:row.entity._id})"><i class="fa fa-edit"></i></a>'
    $scope.deleteCellTemplate='<a class="btn btn-primary" ng-click="deleteRevenue(row.entity)"><i class="fa fa-trash-o"></i></a>'
    $scope.gridOptions={
      data:$scope.revenues,
      enableSorting:true,
      showFooter: true,
      multiSelect: false,
      columnDefs:[
        {field:'date',name:'Date',cellFilter:'date:\'dd/MM/yyyy\'',
          sort: {priority: 0,direction: uiGridConstants.DESC}, width:'10%'},
        {field:'title',name:'Titre', width:'50%'},
        {field:'amountInCash',name:'Cash',aggregationType: uiGridConstants.aggregationTypes.sum},
        {field:'amountInCheque',name:'Cheque',aggregationType: uiGridConstants.aggregationTypes.sum},
        {field:'amountInCb',name:'CB',aggregationType: uiGridConstants.aggregationTypes.sum},
        {name:'Actions',cellTemplate:$scope.editCellTemplate + $scope.deleteCellTemplate}
      ]
    }*/

    $scope.deleteRevenue = function (revenue) {
      revenue.$delete(function () {
        userNotification.add('success', 'La recette a été supprimée');
        $scope.revenues.splice($scope.revenues.indexOf(revenue), 1);
      }, function () {
        userNotification.add('warning', 'Erreur lors de la suppression');
      });
    };
  });

angular.module('simpleComptaApp')
  .controller('RevenuesEditCtrl', function ($scope, $timeout, Revenue, $state, $stateParams, userNotification, $upload, $http) {

    $scope.revenue = Revenue.get({id: $stateParams.id});

    $scope.updateRevenue = function () {
      $scope.revenue.$update(function () {
        userNotification.add('success', 'La recette a été modifiée');
        $state.go('all revenues');
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
        $scope.revenue.attachedDocuments.splice($scope.revenue.attachedDocuments.indexOf(document1), 1);
        $http.delete('api/revenues/' + $stateParams.id + '/documents/' + document1._id);
      });
    };

    $scope.onFileSelect = function ($files) {
      //$files: an array of files selected, each file has name, size, and type.
      for (var i = 0; i < $files.length; i++) {
        var file = $files[i];
        $scope.upload = $upload.upload({
          url: 'api/revenues/' + $stateParams.id + '/documents', //upload.php script, node.js route, or servlet url
          data: {myObj: $scope.myModelObj},
          file: file
        }).progress(function (evt) {
          var percent = parseInt(100.0 * evt.loaded / evt.total);
          $scope.isUploading = true;
          $scope.dynamic = percent;
        }).success(function (data, status, headers, config) {
          $scope.isUploading = false;
          $scope.revenue.attachedDocuments.push(data);
          console.log(data);
        });
      }
    };
  });

angular.module('simpleComptaApp')
  .controller('RevenuesCreateCtrl', function ($scope, $timeout, Revenue, $state, userNotification) {
    $scope.items = ['Cash', 'CB', 'Cheque'];

    $scope.revenue = new Revenue();

    $scope.createRevenue = function () {
      $scope.revenue.$save(function () {
        userNotification.add('success', 'La recette a été ajoutée');
        $state.go('all revenues');
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


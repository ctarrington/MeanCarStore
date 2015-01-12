(function () {
    'use strict';

    var carsList = [
        {id: '1', make: 'Ford', model: 'Fusion'},
        {id: '2', make: 'Subaru', model: 'Forester'}
    ];

    angular.module('mcsapp').config(function($stateProvider, $urlRouterProvider) {

        // For any unmatched url, send to /route1
        $urlRouterProvider.otherwise('/cars');

        $stateProvider
            .state('cars', {
                url: '/cars',
                templateUrl: 'pages/cars/cars-partial.html',
                controller: function($scope) {
                    $scope.model = {};
                    $scope.model.cars = carsList;
                }
            })
            .state('cars.details', {
                url: '/details/:id',
                templateUrl: 'pages/cars/carsdetails-partial.html',
                controller: function($scope, $stateParams) {
                    $scope.car = new Lazy(carsList).findWhere({id: $stateParams.id});
                }
            })
            .state('cardetail', {
                url: '/cardetail/:id',
                templateUrl: 'pages/cars/carsdetails-partial.html',
                controller: function($scope, $stateParams) {
                    $scope.car = new Lazy(carsList).findWhere({id: $stateParams.id});
                }
            })
        ;
    });

})();

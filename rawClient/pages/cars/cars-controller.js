(function () {
    'use strict';

    angular.module('mcsapp').config(function($stateProvider, $urlRouterProvider) {

        // For any unmatched url, send to /route1
        $urlRouterProvider.otherwise('/cars');

        $stateProvider
            .state('cars', {
                url: '/cars',
                templateUrl: 'pages/cars/cars-partial.html',
                controller: function($scope) {
                    $scope.name = 'Fred';
                }
            })
            .state('cars.details', {
                url: '/details',
                templateUrl: 'pages/cars/carsdetails-partial.html',
                controller: function($scope) {
                    $scope.name = 'Lead';
                }
            });
    });

})();

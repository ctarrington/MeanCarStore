(function () {
    'use strict';

    angular.module('mcsapp').config(function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/cars');

        $stateProvider
            .state('cars', {
                url: '/cars',
                templateUrl: 'pages/cars/cars-partial.html',
                controller: function($scope, $state, $stateParams, carsDataService) {
                    $scope.model = {};
                    $scope.model.cars = carsDataService.getCars();
                    $scope.pageState = {
                        selectedCarId: null,
                        showLink: function(id) {
                            return ($state.current.name === 'cars' || this.selectedCarId !== id);
                        }
                    };

                    $scope.currentState = function() {
                      return $state.current;
                    };
                }
            })
            .state('cars.details', {
                url: '/details/:id',
                templateUrl: 'pages/cars/carsdetails-partial.html',
                controller: function($scope, $stateParams, carsDataService) {
                    $scope.car = new Lazy(carsDataService.getCars()).findWhere({id: $stateParams.id});
                    $scope.pageState.selectedCarId = $stateParams.id;
                }
            })
        ;
    });

})();

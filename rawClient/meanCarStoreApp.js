(function () {
    'use strict';

    angular.module('mcsapp', ['ngAnimate', 'ngSanitize', 'ngRoute'])
        .config(function ($routeProvider) {
            $routeProvider.when('/FindCar', {
                templateUrl: 'pages/findcar/findcar-partial.html',
                controller: 'FindCarController'
            });

            $routeProvider.otherwise({
                redirectTo: '/FindCar'
            });
        });

})();
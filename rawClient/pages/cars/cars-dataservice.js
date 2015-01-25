(function () {
    'use strict';

    var carsList = [
        {id: '1', make: 'Ford', model: 'Fusion'},
        {id: '2', make: 'Subaru', model: 'Forester'},
        {id: '3', make: 'Subaru', model: 'Outback Wagon'}
    ];

    angular.module('mcsapp').service('carsDataService', function() {
        var serviceObject = {};

        serviceObject.getCars = function() {
            return carsList;
        };

        serviceObject.addCar = function(car) {
          carsList.push(car);
        };


        return serviceObject;
    });

})();
(function () {
    'use strict';

    angular
        .module('app')
        .factory('DetailService', Service);

    function Service($http, $localStorage) {
        var service = {};
        service.NewDetail = NewDetail;
        service.UpdateDetail = UpdateDetail;
        return service;
        function NewDetail(id, unit, price, quantity, description, callback) {
            $http({
                method: "POST",
                url: "/api/detail/"+id,
                headers: {
                    'Authorization': $localStorage.currentUser.token
                },
                data: {
                    unit: unit,
                    price: price,
                    quantity: quantity,
                    description: description
                }
            })
                .success(function (response, err) {
                    if (response.message) {
                        callback(true);
                    } else {
                        callback(response.error);
                    }
                })
                .error(function (response, err, headers) {
                    if (response.message) {
                        callback(response.message);
                    } else {
                        callback(response.error);
                    }
                });
        }
        function UpdateDetail(id, unit, price, quantity, description, callback) {
            $http({
                method: "PUT",
                url: "/api/detail/update/"+id,
                headers: {
                    'Authorization': $localStorage.currentUser.token
                },
                data: {
                    unit: unit,
                    price: price,
                    quantity: quantity,
                    description: description
                }
            })
                .success(function (response, err) {
                    if (response.message) {
                        callback(true);
                    } else {
                        callback(response.error);
                    }
                })
                .error(function (response, err, headers) {
                    if (response.message) {
                        callback(response.message);
                    } else {
                        callback(response.error);
                    }
                });
        }
    }
})();
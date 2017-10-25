(function () {
    'use strict';

    angular
        .module('app')
        .factory('DocumentService', Service);

    function Service($http, $localStorage) {
        var service = {};
        service.NewDocument = NewDocument;
        return service;
        function NewDocument(folio, buyer, callback) {
            $http({
                method: "POST",
                url: "/api/document",
                headers: {
                    'Authorization': $localStorage.currentUser.token
                },
                data: {
                    folio: folio,
                    buyer: buyer,
                    total: 0
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
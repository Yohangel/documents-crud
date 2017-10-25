(function () {
    'use strict';
 
    angular
        .module('app')
        .controller('Home.IndexController', Controller);
 
    function Controller($scope, $http, $localStorage) {
        $http.get('/api/documents', {
            headers: {
                "Authorization": $localStorage.currentUser.token
            }
        })
        .success(function (response,err) {
            if (response.documents) {
                $scope.documents = response.documents;
            } else {
                err ? ($scope.error = err) : ($scope.error = response);
            }
        });
    }
})();
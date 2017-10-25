(function () {
    'use strict';

    angular
        .module('app')
        .controller('Detail.NewController', Controller);

    function Controller($location, $http, $localStorage, $scope, $stateParams, $state, DetailService) {
        if ($state.params.id) var id = $state.params.id;
        $scope.go_back = function () { window.history.back(); };

        var vm = this;
        vm.newdetail = newdetail;

        if ($state.current.name == "detail/edit") { 
            $http.get('/api/detail/'+id, {
                headers: {
                    "Authorization": $localStorage.currentUser.token
                }
            })
            .success(function (response,err) {
                if (response.details) {
                    vm.details = response.details[0];
                } else {
                    err ? ($scope.error = err) : ($scope.error = response);
                }
            });
            console.log(vm);
        }

        function newdetail() {
            vm.loading = true;
            if ($state.current.name == "detail/edit") { 
                DetailService.UpdateDetail(id, vm.details.unit, vm.details.price, vm.details.quantity, vm.details.description, function (result) {
                    if (result === true) {
                        $location.path('/');
                    } else {
                        vm.error = result;
                        vm.loading = false;
                    }
                });
            } else {
                DetailService.NewDetail(id, vm.unit, vm.price, vm.quantity, vm.description, function (result) {
                    if (result === true) {
                        $location.path('/');
                    } else {
                        vm.error = result;
                        vm.loading = false;
                    }
                });
            }
        };
    }
})();
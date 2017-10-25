(function () {
    'use strict';
 
    angular
        .module('app')
        .controller('Login.IndexController', Controller);
 
    function Controller($location, AuthenticationService) {
        var vm = this;
 
        vm.login = login;
        vm.register = register;
 
        initController();
 
        function initController() {

            AuthenticationService.Logout();
        };
 
        function login() {
            vm.loading = true;
            AuthenticationService.Login(vm.username, vm.password, function (result) {
                if (result === true) {
                    $location.path('/');
                } else {
                    vm.error = result;
                    vm.loading = false;
                }
            });
        };
        function register() {
            vm.register.loading = true;
            AuthenticationService.Register(vm.register.username, vm.register.names, vm.register.password, function (result) {
                if (result === true) {
                    $location.path('/');
                } else {
                    vm.register.error = result;
                    vm.register.loading = false;
                }
            });
        };
    }
})();
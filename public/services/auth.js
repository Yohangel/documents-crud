(function () {
    'use strict';
 
    angular
        .module('app')
        .factory('AuthenticationService', Service);
 
    function Service($http, $localStorage) {
        var service = {};
 
        service.Login = Login;
        service.Register = Register;
        service.Logout = Logout;
 
        return service;
 
        function Login(username, password, callback) {
            $http.post('/api/login', { username: username, password: password })
                .success(function (response,err) {
                    if (response.token) {
                        $localStorage.currentUser = { username: username, token: response.token };
                        $http.defaults.headers.common.Authorization = 'Bearer ' + response.token;
                        callback(true);
                    } else {
                        callback(response.message);
                    }
                });
        }
        function Register(username, name, password, callback) {
            $http.post('/api/register', { username: username, name: name, password: password })
                .success(function (response,err) {
                    if (response.token) {
                        $localStorage.currentUser = { username: username, token: response.token };
                        $http.defaults.headers.common.Authorization = 'Bearer ' + response.token;
                        callback(true);
                    } else {
                        callback(response.message);
                    }
                });
        }
        function Logout() {
            delete $localStorage.currentUser;
            $http.defaults.headers.common.Authorization = '';
        }
    }
})();
(function () {
    'use strict';
 
    angular
        .module('app', ['ui.router', 'ngMessages', 'ngStorage'])
        .config(config)
        .run(run);
    function config($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/");
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'home/index.view.html',
                controller: 'Home.IndexController'
            })
            .state('login', {
                url: '/login',
                templateUrl: 'login/index.view.html',
                controller: 'Login.IndexController',
                controllerAs: 'vm'
            })
            .state('document/new', {
                url: '/document/new',
                templateUrl: 'document/new.view.html',
                controller: 'Document.NewController',
                controllerAs: 'vm'
            })
            .state('details', {
                url: '/details/:id',
                templateUrl: 'detail/index.view.html',
                controller: 'Detail.IndexController'
            })
            .state('detail/new', {
                url: '/detail/new/:id',
                templateUrl: 'detail/new.view.html',
                controller: 'Detail.NewController',
                controllerAs: 'vm'
            })
            .state('detail/edit', {
                url: '/detail/edit/:id',
                templateUrl: 'detail/edit.view.html',
                controller: 'Detail.NewController',
                controllerAs: 'vm'
            })
            .state('detail/delete', {
                url: '/detail/delete/:id',
                controller: 'Detail.DeleteController'
            });
    }
 
    function run($rootScope, $http, $location, $localStorage) {
        if ($localStorage.currentUser) {
            $http.defaults.headers.common.Authorization = 'Bearer ' + $localStorage.currentUser.token;
        }
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            var publicPages = ['/login'];
            var restrictedPage = publicPages.indexOf($location.path()) === -1;
            if (restrictedPage && !$localStorage.currentUser) {
                $location.path('/login');
            }
        });
    }
})();
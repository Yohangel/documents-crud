(function () {
    'use strict';
 
    angular
        .module('app')
        .controller('Detail.DeleteController', Controller);
 
    function Controller($scope, $http, $localStorage, $stateParams, $state) {
        var id = $state.params.id;
       
        $http.delete('/api/detail/delete/'+id, {
            headers: {
                "Authorization": $localStorage.currentUser.token
            }
        })
        .success(function (response,err) {
                window.history.back();
        });
    }
})();
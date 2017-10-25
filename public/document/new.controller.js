(function () {
    'use strict';

    angular
        .module('app')
        .controller('Document.NewController', Controller);

    function Controller($location, $localStorage, DocumentService) {
        var buyer = $localStorage.currentUser.username;

        var vm = this;
        vm.newdoc = newdoc;
        
        function newdoc() {
            console.log('ejecutado');
            vm.loading = true;
            DocumentService.NewDocument(vm.folio, buyer, function (result) {
                if (result === true) {
                    $location.path('/');
                } else {
                    vm.error = result;
                    vm.loading = false;
                }
            });
        };
    }
})();
(function () {
    'use strict';

    angular
        .module('app')
        .controller('Detail.IndexController', Controller);

    function Controller($scope, $http, $localStorage, $stateParams, $state) {
        var id = $state.params.id;
        $scope.id_father = id;
        $scope.go_back = function () { window.history.back(); };
        $http.get('/api/details/' + id, {
            headers: {
                "Authorization": $localStorage.currentUser.token
            }
        })
            .success(function (response, err) {
                if (response.details) {
                    $scope.details = response.details;
                } else {
                    err ? ($scope.error = err) : ($scope.error = response);
                }
            });
        $scope.total = 0;
        $scope.setTotals = function (detail) {
            if (detail) {
                $scope.total += detail.subtotal;
            }
        }
        $scope.data = [{ "agence": "CTM", "secteur": "Safi", "statutImp": "operationnel" }];
        $scope.export = function (){
            html2canvas(document.getElementById('exportthis'), {
                onrendered: function (canvas) {
                    var data = canvas.toDataURL();
                    var docDefinition = {
                        content: [{ image: data, width: 500, }]
                    };
                    pdfMake.createPdf(docDefinition).download("print.pdf");
                }
            });
        };
    }
})();
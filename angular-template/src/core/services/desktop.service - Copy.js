/* jshint -W024 */
(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('desktopService', desktopService);

    desktopService.$inject = ['$http', '$location', 'exception', 'myurl'];
    /* @ngInject */
    function desktopService($http, $location, exception, myurl) {
        var service = {
            getAccount: getAccount
        };
        
        return service;

        function getAccount() {
            return $http.get(myurl + '/orders')
                .then(getAccountComplete)
                .catch(function(message) {
                    exception.catcher('XHR Failed for getAccount')(message);
                    $location.url('/');
                });

            function getAccountComplete(data) {
                return data.data;
            }
        }
    }

})();

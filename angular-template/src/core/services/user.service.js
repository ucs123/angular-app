/* jshint -W024 */
(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('userService', userService);

    userService.$inject = ['$http', '$location', 'exception', 'myurl'];
    /* @ngInject */
    function userService($http, $location, exception, myurl) {
        var service = {
            getUser: getUser
        };
        return service;

        function getUser() {
            return $http.get(myurl + '/users')
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

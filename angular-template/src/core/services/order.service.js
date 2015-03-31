/* jshint -W024 */
(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('orderService', orderService);

    orderService.$inject = ['$resource', '$location', 'exception', 'serverURL'];
    /* @ngInject */
    function orderService($resource, $location, exception, serverURL) {
        return $resource(serverURL + '/:type', null, {
            users: {
                method: 'GET',
                params: { type: 'users' },
                isArray: true
            },
            instruments: {
                method: 'GET',	
                params: { type: 'instruments' },
                isArray: true
            },

            orders: {
                method: 'GET',
                params: { type: 'orders'},
                isArray: true
            },

            createOrder: {
                method: 'POST',
                params: { type: 'orders'}
            },

            clearOrders: {
                method: 'DELETE',
                params: { type: 'orders' }
            }
        });
    }
})();

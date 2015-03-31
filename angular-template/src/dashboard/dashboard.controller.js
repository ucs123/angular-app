(function() {
    'use strict';

    angular
        .module('app.dashboard')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['accountService', 'logger', 'userDataService'];

    /* @ngInject */
    function DashboardController(accountService, logger, userDataService) {
        var vm = this;

        vm.account = null;
        vm.userName = null;
        activate();

        function activate() {
            return getAccount().then(function() {
                logger.info('Activated Dashboard View');
            });
        }

        function getAccount() {
            return accountService.getAccount().then(function(data) {
                vm.account = data;
                return vm.account;
            });
        }
         vm.userName= getUserName();
        function getUserName() {
            logger.info('Activated User: ' + userDataService.getUserName());
            return userDataService.getUserName();
        }
    }
})();

(function() {
    'use strict';

    angular
        .module('app.login')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['orderService', 'OrderEventService', 'logger','$state', 'userDataService'];

    /* @ngInject */
    function LoginController(orderService, OrderEventService, logger, $state ,userDataService) {
        var vm = this;
        vm.users = getUser();
        vm.userName= null;
        vm.setUserName = setUserName;

        function getUser() {
               return orderService.users();
               logger.info('Activated Login View');
        }
        function setUserName() {
            userDataService.setUserName(vm.userName);
            logger.info('Activated User' + userDataService.getUserName());
            $state.go('desktop');
        }
    }
})();

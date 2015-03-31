(function() {
    'use strict';

    angular
        .module('app.desktop')
        .controller('DesktopController', DesktopController);

    DesktopController.$inject = ['logger', 'userDataService', 'orderService', 'OrderEventService', 'EventType'];

    /* @ngInject */
    function DesktopController(logger, userDataService, orderService, OrderEventService, EventType) {
        var vm = this;

        vm.account = null;
        vm.userName = null;
        vm.userlist = null;
        vm.instruments = orderService.instruments();
        vm.orders = orderService.orders();

        function findOrder(id) {
            return _.find(vm.orders, {id: id});
        }

        OrderEventService.on(EventType.orderCreated, function(order) {
            vm.orders.push(order);
        });

        OrderEventService.on(EventType.placementCreated, function(placement) {
            var order = findOrder(placement.orderId);

            if (order) {
                order.quantityPlaced += placement.quantityPlaced;
                order.status = placement.status;
            }
        });

        OrderEventService.on(EventType.executionCreated, function(execution) {
            var order = findOrder(execution.orderId);

            if (order) {
                order.quantityExecuted += execution.quantityExecuted;
                order.status = execution.status;
                order.executionPrice = execution.executionPrice;
            }
        });

        OrderEventService.on(EventType.allOrdersDeleted, function() {
            vm.orders = [];
        });

        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        vm.tradeModel = function(){

            $("#tradeModal").modal('show');
        }
        vm.createOrder = function() {
            for (var i = 0; i < vm.tradenumber; i++) {
                //alert("hello");
                var numInstruments = vm.instruments.length;
                orderService.createOrder(null, {
                    side: 'Buy',
                    symbol: vm.instruments[getRandomInt(0, numInstruments - 1)].symbol,
                    quantity: 5000,
                    limitPrice: 100,
                    traderId: 'SS'
                });
            };
            $("#tradeModal").modal('hide');
            vm.tradenumber = "";
            vm.refreshOrders();
            vm.barChartImage();
        };


        vm.clearOrders = function() {
            orderService.clearOrders();
            vm.barChartImage();
        };

        vm.refreshOrders = function() {
            vm.order = orderService.orders();
            vm.barChartImage();
        };

         vm.barChartImage = function() {
         orderService.orders().$promise.then(
                function(products){
                    var b=[];
                    angular.forEach(products, function(value, index){
                        b[index]=value;
                    
            }
                    );
               vm.orders=b;
            }
            

        );
        };
        vm.barChartImage();
         vm.userList= function() {
           
                vm.userlist = orderService.users();
                return vm.userlist;
        };
        vm.userName= getUserName();
        function getUserName() {
            logger.info('Activated User: ' + userDataService.getUserName());
            return userDataService.getUserName();
        }
    }
})();

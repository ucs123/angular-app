(function() {
    'use strict';

    angular
        .module('app.core')
        .constant('api', 'http://localhost:3000/api')
        .constant('myurl','http://localhost:8080')
        .constant('serverURL', 'http://localhost:8080')
        .constant('EventType', {
        orderCreated: 'orderCreatedEvent',
        placementCreated: 'placementCreatedEvent',
        executionCreated: 'executionCreatedEvent',
        allOrdersDeleted: 'allOrdersDeletedEvent'
    });
})();	

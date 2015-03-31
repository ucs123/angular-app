/* jshint -W024 */
(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('userDataService', userDataService);
    function userDataService() {
        var userName;        
         
         var service = {
            getUserName: getUserName,
            setUserName: setUserName
        };

        return service;

        function getUserName(){
            return userName;
        }
         function setUserName(name){
            userName = name;
        }
    }
})();

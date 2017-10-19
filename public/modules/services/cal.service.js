(function () {
    'use strict'

    angular.module('app.services')
        .factory('calService', CalServiceFactory)

    CalServiceFactory.$inject = ['$http', '$q']

    function CalServiceFactory($http, $q) {
        return {
            insert: insert
        }

        function insert(itemData, onSuccess, onError) {
            return $http.post('/api/calendar', itemData)
                .then(xhrSuccess)
                .catch(onError)
        }
    }
})();
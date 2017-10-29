(function () {
    'use strict'

    angular.module('app.services')
        .factory('calService', CalServiceFactory)

    CalServiceFactory.$inject = ['$http', '$q']

    function CalServiceFactory($http, $q) {
        return {
            getAll: getAll,
            getById: getById,
            insert: insert,
            update: update,
            remove: remove


        }

        function getAll() {
            return $http.get('/api/calendar')
                .then(xhrSuccess)
                .catch(onError)
        }

        function getById(id, onSuccess, onError) {
            return $http.get(`/api/calendar/${id}`)
                .then(xhrSuccess)
                .catch(onError)
        }

        function insert(itemData, onSuccess, onError) {
            return $http.post('/api/calendar', itemData)
                .then(xhrSuccess)
                .catch(onError)
        }

        function update(itemData, onSuccess, onError) {
            return $http.put(`/api/calendar/${itemData._id}`, itemData)
                .then(xhrSuccess)
                .catch(onError)
        }

        function remove(id, onSuccess, onError) {
            return $http.delete('/api/calendar/' + id)
                .then(xhrSuccess)
                .catch(onError);
        }

        function xhrSuccess(response) {
            return response.data
        }

        function onError(error) {
            return $q.reject(error.data)
        }
    }
})();
(function () {
    'use strict';
    angular
        .module('app.cal')
        .controller('calController', CalController);

    CalController.$inject = ['calService']

    function CalController(calService) {
        'use strict'
        var vm = this;
    }
})();
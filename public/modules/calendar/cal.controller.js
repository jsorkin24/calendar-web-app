(function () {
    'use strict';
    angular
        .module('app.cal')
        .controller('calController', CalController);

    CalController.$inject = ['events', 'calService', "moment", "calendarConfig"] //injecting to avoid minification

    function CalController(events, calService, moment, calendarConfig) {
        'use strict'
        var vm = this;
        vm.toggleAdd;
        vm.items = events;
        calendarConfig.dateFormatter = 'moment';
        _addDetail();

        //Submit functionality changes based existence of id
        vm.submit = () => {
            if (vm.item._id) {
                calService.update(vm.item)
                    .then(_onEditSuccess)
                    .catch(_onError);
            } else {
                calService.insert(vm.item)
                    .then(_onSuccess)
                    .catch(_onError)
            }
        }
        vm.delete = (id) => {
            calService.remove(id)
                .then(_onDeleteSuccess)
                .catch(_onError)
        }

        //will add description to banner and add correct formatted javascript date object
        function _addDetail() {
            for (var i = 0; i < vm.items.length; i++) {
                vm.items[i].actions = [{
                    label: vm.items[i].description,
                }]
                vm.items[i].startsAt = new Date(vm.items[i].startsAt); //as per requirement of bootstrap calendar
                vm.items[i].endsAt = new Date(vm.items[i].endsAt); //as per requirement of bootstrap calendar
            }

        }

        //Will splice out object from array of events
        function _onDeleteSuccess() {
            let eventList = vm.items;
            let removeIndex = eventList.findIndex(
                (element, index, eventList) => {
                    return element._id === vm.items._id;
                }
            );
            eventList.splice(removeIndex, 1);
        }


        //Calendar Code
        vm.calendarView = 'month';
        vm.viewDate = new Date();
        vm.cellIsOpen = false;

        vm.addEvent = function () {
            vm.toggleAdd = !vm.toggleAdd;

        };

        vm.eventClicked = function (event) {
            vm.toggleAdd = !vm.toggleAdd;
            vm.item = event;
            vm.item.startsAt = new Date(event.startsAt); //as per requirement of bootstrap calendar
            vm.item.endsAt = new Date(event.endsAt); //as per requirement of bootstrap calendar
        };

        vm.toggle = function ($event, field, event) {
            $event.preventDefault();
            $event.stopPropagation();
            event[field] = !event[field];
        };

        vm.timespanClicked = function (date, cell) {
            if (vm.calendarView === 'month') {
                if ((vm.cellIsOpen && moment(date).startOf('day').isSame(moment(vm.viewDate).startOf('day'))) || cell.events.length === 0 || !cell.inMonth) {
                    vm.cellIsOpen = false;
                } else {
                    vm.cellIsOpen = true;
                    vm.viewDate = date;
                }
            } else if (vm.calendarView === 'year') {
                if ((vm.cellIsOpen && moment(date).startOf('month').isSame(moment(vm.viewDate).startOf('month'))) || cell.events.length === 0) {
                    vm.cellIsOpen = false;
                } else {
                    vm.cellIsOpen = true;
                    vm.viewDate = date;
                }
            }
        };


        function _onSuccess(res) {
            vm.items.push(res.item);
            _addDetail();
            vm.item = null;
        }

        function _onEditSuccess(res) {
            vm.item = null;
            console.log('Edit Working')
        }

        function _onError(err) {
            console.log(`Error: ${err.errors}`);
        };



    }

})();
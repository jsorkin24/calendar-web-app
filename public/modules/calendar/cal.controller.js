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

for (i=1; i<=100; i++) {
if (i % 3 === 0 && i % 5 === 0) {
console.log("FizzBuzz");
}
else if ( i % 3 === 0 ) { 
console.log("Fizz");
}
else if ((i % 5) === 0){
console.log("Buzz");
}
else {
console.log(i);
}
}

1 vote
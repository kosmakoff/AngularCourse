'use strict';

describe('awesome-app.employees module', function() {

    beforeEach(module('awesome-app.employees'));

    describe('employees controller', function(){

        it('should ....', inject(function($controller) {
            //spec body
            var employeesCtrl = $controller('EmployeesCtrl');
            expect(employeesCtrl).toBeDefined();
        }));

    });
});


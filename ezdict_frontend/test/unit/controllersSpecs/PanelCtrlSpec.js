/*global module, inject, describe, beforeEach, it, expect, spyOn*/
define(['app', 'constants', 'angular-mock'], function () {
    'use strict';

    describe('PanelCtrl', function () {

        var $scope, ctrl, $q, Ticket, EzTicket, EventManager;

        beforeEach(function () {
            /**
             * load application
             */
            module('ezdict');

            inject(['$httpBackend', '$rootScope', '$controller', '$q', 'Ticket', 'EzTicket', 'EventManager',
                function (_$httpBackend_, _$rootScope_, $controller, _$q_, _Ticket_, _EzTicket_, _EventManager_) {
                    $q = _$q_;
                    Ticket = _Ticket_;
                    EzTicket = _EzTicket_;
                    EventManager = _EventManager_;

                    $scope = _$rootScope_.$new();
                    ctrl = $controller('PanelCtrl', {$scope: $scope});
                }]);
        });

        it('should set initial ticket values to null', function () {
            $scope.ticket = 1;
            $scope.dictTicket = 1;
            $scope.translateTicket = 1;
            $scope.resetTicket();
            expect($scope.ticket).toBeNull();
            expect($scope.dictTicket).toBeNull();
            expect($scope.translateTicket).toBeNull();
        });

        it('should load user ticket', function () {
            var deferred = $q.defer(),
                ticket = {id: 1};
            $scope.text = 'test';
            deferred.resolve(ticket);
            spyOn($scope, 'findTicket').andReturn(deferred.promise);
            $scope.loadTicket();
            $scope.$apply();
            expect($scope.ticket).toEqual(ticket);
            expect($scope.dictTicket).toBeNull();
            expect($scope.translateTicket).toBeNull();
        });

        it('should load dict ticket', function () {
            var deferredTicket = $q.defer(),
                deferredDictTicket = $q.defer(),
                dictTicket = {id: 1};
            $scope.text = 'test';
            deferredTicket.reject();
            deferredDictTicket.resolve(dictTicket);
            spyOn($scope, 'findTicket').andReturn(deferredTicket.promise);
            spyOn($scope, 'findDictTicket').andReturn(deferredDictTicket.promise);
            $scope.loadTicket();
            $scope.$apply();
            expect($scope.ticket).toBeNull();
            expect($scope.dictTicket).toEqual(dictTicket);
            expect($scope.translateTicket).toBeNull();
        });

        it('should load translate ticket', function () {
            var deferredTicket = $q.defer(),
                deferredDictTicket = $q.defer(),
                deferredTranslateTicket = $q.defer(),
                translateTicket = {id: 1};
            $scope.text = 'test';
            deferredTicket.reject();
            deferredDictTicket.reject();
            deferredTranslateTicket.resolve(translateTicket);
            spyOn($scope, 'findTicket').andReturn(deferredTicket.promise);
            spyOn($scope, 'findDictTicket').andReturn(deferredDictTicket.promise);
            spyOn($scope, 'findTranslateTicket').andReturn(deferredTranslateTicket.promise);
            $scope.loadTicket();
            $scope.$apply();
            expect($scope.ticket).toBeNull();
            expect($scope.dictTicket).toBeNull();
            expect($scope.translateTicket).toEqual(translateTicket);
        });

        it('should ask Ticket service for ticket', function () {
            spyOn(Ticket, 'findTicket');
            $scope.findTicket();
            expect(Ticket.findTicket).toHaveBeenCalled();
        });

        it('should ask EzTicket service for dictTicket', function () {
            spyOn(EzTicket, 'findDictTicket');
            $scope.findDictTicket();
            expect(EzTicket.findDictTicket).toHaveBeenCalled();
        });

        it('should ask EzTicket service for translateTicket', function () {
            spyOn(EzTicket, 'translate').andCallThrough();
            $scope.findTranslateTicket();
            expect(EzTicket.translate).toHaveBeenCalled();
        });

        it('should delete ticket and load ticket after that', function () {
            $scope.ticket = {};
            $scope.ticket.$delete = function (callback) {
                callback();
            };
            window.confirm = function () {
                return true;
            };
            spyOn($scope.ticket, '$delete').andCallThrough();
            spyOn($scope, 'loadTicket');
            $scope.deleteTicket();
            expect($scope.ticket).toBeNull();
        });

        it('should load ticket after onTextSelect event', function () {
            spyOn($scope, 'loadTicket');
            EventManager.broadcastTextSelect('test');
            expect($scope.loadTicket).toHaveBeenCalled();
        });
    });
});

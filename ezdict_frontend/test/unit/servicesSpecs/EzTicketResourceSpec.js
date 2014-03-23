define(['app', 'constants', 'angular-mock'], function () {
    'use strict';

    describe('EzTicket', function () {

        var EzTicket,
            $q;

        beforeEach(function () {
            module('ezdict');

            inject(['EzTicket', '$q', function (_EzTicket_, _$q_) {
                EzTicket = _EzTicket_;
                $q = _$q_;
            }])
        });

        it('should find dict ticket', function () {
            var deferred = $q.defer();
            deferred.resolve({def: []});
            spyOn(EzTicket, 'dict').andReturn({$promise: deferred.promise});
            var dictTicket = EzTicket.findDictTicket('test');
            expect(dictTicket.$resolved).toBeFalsy();
        });

        it('should return flat def trs', function () {
            var ticket = new EzTicket({
                def: [
                    {
                        tr: [
                            {
                                text: 'one',
                            },
                            {
                                text: 'two',
                                syn: [
                                    {
                                        text: 'synOne',
                                    },
                                    {
                                        text: 'synTwo',
                                    }
                                ]
                            },
                        ]
                    }
                ]
            });

            var flatTrs = ticket.getFlatDefTrs(ticket.def[0]);
            expect(flatTrs).toEqual(['one', 'two', 'synOne', 'synTwo']);

        })

    })
});

/*global angular*/
define(['./module'], function (factory) {
    'use strict';
    factory.
        factory('EzTicket', ['$resource', 'constants', 'AbstractModel', '$q', 'AbstractTicket',
            function ($resource, constants, AbstractModel, $q, AbstractTicket) {
                var EzTicket = $resource(
                    [constants.API_URL, '/ez_tickets/:id/:action', constants.API_FORMAT, '?word=:word'].join(''),
                    {
                        id: '@id'
                    },
                    {
                        'dict': {
                            method: 'JSONP',
                            url: 'https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=:key&lang=en-ru&text=:word&callback=JSON_CALLBACK',
                            params: {
                                key: 'dict.1.1.20131027T115553Z.881398786442095e.51bb0420197e3eecd21c1dff059a2636b3976867'
                            }
                        },
                        'translate': {
                            method: 'JSONP',
                            url: 'https://translate.yandex.net/api/v1.5/tr.json/translate?key=:key&text=:word&lang=en-ru&callback=JSON_CALLBACK',
                            params: {
                                key: 'trnsl.1.1.20131027T115234Z.fa108187c88cfaef.a410c2ed5ad3b5107f12fb7a31bf91de5b920fe7'
                            }
                        }
                    }
                );

                EzTicket.findDictTicket = function (word) {
                    return EzTicket.dict({word: word}).$promise.
                        then(function (ticket) {
                            return ticket.isEmptyDictTicket() ? $q.reject(ticket) : ticket;
                        });
                };

                AbstractTicket.prototype = angular.extend(new AbstractModel(), AbstractTicket.prototype);
                EzTicket.prototype = angular.extend(new AbstractTicket(), EzTicket.prototype);

                EzTicket.prototype.isEmptyDictTicket = function () {
                    return !this.def || this.def.length === 0;
                };

                EzTicket.prototype.getFlatDefTrs = function (def) {
                    this.flatDefTrs = this.flatDefTrs || {};

                    var key = def.text + def.pos,
                        flatTrs = [],
                        i, j;

                    if (this.flatDefTrs[key]) {
                        return this.flatDefTrs[key];
                    }

                    for (i = 0; i < def.tr.length; i++) {
                        flatTrs.push(def.tr[i].text);
                        if (def.tr[i].syn) {
                            for (j = 0; j < def.tr[i].syn.length; j++) {
                                flatTrs.push(def.tr[i].syn[j].text);
                            }
                        }
                    }

                    this.flatDefTrs[key] = flatTrs;
                    return flatTrs;
                };

                EzTicket.prototype.getFlatDefExs = function (def) {
                    this.flatDefExs = this.flatDefExs || {};

                    var key = def.text + def.pos,
                        flatExs = [],
                        i, j;

                    if (this.flatDefExs[key]) {
                        return this.flatDefExs[key];
                    }

                    for (i = 0; i < def.tr.length; i++) {
                        if (def.tr[i].ex) {
                            for (j = 0; j < def.tr[i].ex.length; j++) {
                                flatExs.push(def.tr[i].ex[j].text);
                            }
                        }
                    }

                    this.flatDefExs[key] = flatExs;
                    return flatExs;
                };

                EzTicket.prototype.getFlatDefMeans = function (def) {
                    this.flatDefMeans = this.flatDefMeans || {};

                    var key = def.text + def.pos,
                        flatMeans = [],
                        i, j;

                    if (this.flatDefMeans[key]) {
                        return this.flatDefMeans[key];
                    }

                    for (i = 0; i < def.tr.length; i++) {
                        if (def.tr[i].mean) {
                            for (j = 0; j < def.tr[i].mean.length; j++) {
                                flatMeans.push(def.tr[i].mean[j].text);
                            }
                        }
                    }
                    this.flatDefMeans[key] = flatMeans;
                    return flatMeans;
                };

                return EzTicket;
            }]);
});

'use strict';
/* Services */

angular.module('ezdictIndex.services', ['ngResource', 'toaster', 'ngProgress']).

    factory('User', ['$resource', 'API_URL', 'API_FORMAT', function ($resource, API_URL, API_FORMAT) {
        var User = $resource([API_URL, '/users/:userId/:action', API_FORMAT].join(''), {}, {});

        User.prototype.errors = {};

        User.prototype.hasErrors = function (field) {
            return this.errors[field] && this.errors[field].length > 0;
        };

        User.prototype.getErrors = function (field) {
            var errors = [];
            if (this.errors[field] && this.errors[field].length > 0) {
                errors = this.errors[field]
            }
            return errors;
        };

        User.prototype.getErrorString = function (field, glue) {
            glue = glue || '<br>';
            var errors = this.getErrors(field);
            return errors.join(glue);
        };

        return User;
    }]).

    factory('ResponseInterceptor', ['$injector', '$q', '$rootScope', 'toaster', function ($injector, $q, $rootScope, toaster) {
        var ngProgress = null;
        var getNgProgress = function () {
            var ngProgress = ngProgress || $injector.get('ngProgress');
            console.log(ngProgress);
            return ngProgress
        };

        $rootScope.pendingRequests = 0;

        return {
            'request': function (config) {
                console.log('interceptor.request()');

                if ($rootScope.pendingRequests === 0) {
                    getNgProgress().start();
                }

                $rootScope.pendingRequests++;

                return config || $q.when(config);
            },

            'requestError': function (rejection) {
                console.log('interceptor.requestError()');

                $rootScope.pendingRequests--;

                if ($rootScope.pendingRequests === 0) {
                    getNgProgress().reset();
                }

                return $q.reject(rejection);
            },

            'response': function (response) {
                console.log('interceptor.response()');

                $rootScope.pendingRequests--;

                if ($rootScope.pendingRequests === 0) {
                    getNgProgress().complete();
                }

                return response || $q.when(response);
            },

            'responseError': function (rejection) {
                console.log('interceptor.responseError()');

                $rootScope.pendingRequests--;

                if ($rootScope.pendingRequests === 0) {
                    getNgProgress().reset();
                }

                if (rejection.data.detail) {
                    toaster.pop('error', 'Ошибка ' + rejection.status, rejection.data.detail);
                }

                return $q.reject(rejection);
            }
        };
    }]).

    factory('TextMessages', [function () {
        return {
            'REGISTRATION_SUCCESS': 'Регистрация успешна, входим...'
        }
    }])

;


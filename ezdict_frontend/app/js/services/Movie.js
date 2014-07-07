/*global angular*/
define(['./module'], function (factory) {
    'use strict';
    factory.
        factory('Movie', ['$resource', 'constants', 'AbstractModel', '$q',
            function ($resource, constants, AbstractModel, $q) {
                var

                    Movie = $resource(
                        [constants.API_URL, '/movies/:action', constants.API_FORMAT].join(''),
                        {
                        },
                        {
                            searchTmdb: {
                                method: 'JSONP',
                                url: 'https://api.themoviedb.org/3/search/movie?api_key=:key&query=:query&callback=JSON_CALLBACK',
                                params: {
                                    key: '41f005142ac2e572919a502690e4c6d3'
                                }
                            },
                            searchYts: {
                                method: 'JSONP',
                                url: 'https://yts.re/api/list.jsonp?keywords=:keywords&quality=:quality&sort=:sort&callback=JSON_CALLBACK',
                                params: {
                                    quality: '720p',
                                    sort: 'year'
                                }
                            },
                            getFromYts: {
                                method: 'JSONP',
                                url: 'https://yts.re/api/movie.jsonp?id=:id&callback=JSON_CALLBACK'
                            }
                        }
                    );

                Movie.search = function (params) {
                    var ytsPromises = [], ytsMovies = [];
                    //ищем строку поиска в tmdb
                    return Movie.searchTmdb({
                        query: params.keywords
                    }).$promise.
                        //получаем массив фильмов от tmdb
                        then(function (response) {
                            if (response.results.length > 0) {
                                //первый в списке фильм ищем в yts по title
                                ytsPromises.push(
                                    Movie.searchYts({keywords: response.results[0].title}).$promise
                                );
                                //когда получили ответ от yts по всем фильмам,
                                //объединяем все ответы в 1 массив с фильмами
                                return $q.all(ytsPromises).
                                    then(function (ytsResponses) {
                                        angular.forEach(ytsResponses, function (response) {
                                            ytsMovies = angular.extend(ytsMovies, response.MovieList);
                                        });
                                        return ytsMovies;
                                    });
                            }
                        });
                };

                Movie.prototype = angular.extend(Movie.prototype, new AbstractModel());

                return Movie;
            }]);
});

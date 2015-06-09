(function() {
    'use strict';

    var testGroups = ['Alternative Music', 'Blues', 'Classical Music', 'Country Music', 'Dance Music', 'Easy Listening', 'Electronic Music', 'European Music', 'Hip Hop / Rap', 'Indie Pop', 'Inspirational', 'Asian Pop', 'Jazz', 'Latin Music', 'New Age', 'Opera', 'Pop', 'R&B / Soul', 'Reggae', 'Rock', 'Singer / Songwriter', 'World Music / Beats'];

    var app = angular.module('SpotifyOrganizer', ['ui.bootstrap', 'ui.router', 'ngStorage', 'spotify']);

    //------------------------------------------------------------------------------------
    // RUN
    //------------------------------------------------------------------------------------

    app.run(function($window, $rootScope, $state, $localStorage) {

        $rootScope.$on('$stateChangeStart', function(event, toState) {
            /* Check Access */
            if (toState.params.session) {
                if (typeof $localStorage.session === 'undefined') {
                    event.preventDefault();
                    $state.go('login');
                    return;
                }
            }
        });

        /* Clear Session (Log out) */
        $rootScope.clearSession = function() {
            delete $localStorage.session;
        };
    });

    //------------------------------------------------------------------------------------
    // CONFIG
    //------------------------------------------------------------------------------------

    app.config(function($stateProvider, $controllerProvider, $compileProvider,
        $filterProvider, $provide, $urlRouterProvider, SpotifyProvider) {

        /* Lazy Loading */
        app.register = {
            controller: $controllerProvider.register,
            directive: $compileProvider.directive,
            filter: $filterProvider.register,
            factory: $provide.factory,
            service: $provide.service,
        };

        /* Spotify Authorization TEMP STORAGE */
        SpotifyProvider.setClientId('198925cc73a648759ff0f90bbb66ff71');
        SpotifyProvider.setRedirectUri('http://localhost:8080/spotinze/app/#/');
        SpotifyProvider.setScope('user-read-private playlist-read-private playlist-read-collaborative playlist-modify-public playlist-modify-private');

        /* Routing */
        $stateProvider
            .state('/', {
                url: '/',
                templateUrl: 'views/playlists.html',
                //controller: 'loginController',
                params: {
                    session: true,
                }
            })
            .state('login', {
                url: '/login',
                templateUrl: 'views/login.html',
                //controller: 'loginController',
                params: {
                    session: false,
                }
            });
        $urlRouterProvider.otherwise('/');
    });

    //------------------------------------------------------------------------------------
    // CONTROLLERS
    //------------------------------------------------------------------------------------

    app.controller('loginController', function($scope, Spotify) {
        $scope.login = function() {
            Spotify.login().then(function(data) {
                console.log(data);
                alert("You are now logged in");
            })
        };
    });

    app.controller('playlistController', function($scope, $timeout) {
        $scope.data = new MultiMap();
        for (var i = 0; i < testGroups.length; i++) {
            $scope.data.addGroup(testGroups[i]);
            for (var ii = 0; ii < 10 * Math.random(); ii++) {
                $scope.data.addItem(Math.random().toString(36).substring(7), testGroups[i]);
            }
        }

        $timeout(function() {
            var gridster = $(".playlist-groups").gridster({
                widget_selector: '.group',
                widget_base_dimensions: ['auto', 96],
                autogenerate_stylesheet: true,
                shift_widgets_up: true,
                min_cols: 3,
                max_cols: 3,
                widget_margins: [10, 10],
                resize: {
                    enabled: true
                }
            }).data('.playlist-groups');
        }, 0);
    });
}());

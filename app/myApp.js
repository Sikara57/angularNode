var app = angular.module("myApp", ['ngRoute','ngResource','ui.materialize']);

app.config(['$routeProvider','$locationProvider',
    function($routeProvider,$locationProvider){
        $routeProvider
        .when('/',{
            templateUrl:'app/views/vue1.html',
            controller:'myCtrl'
        })
        .when('/liste',{
            templateUrl:'app/views/vue2.html',
            controller:'myCtrl2',
            resolve:{
                liste:function(eleveFactory){
                    return eleveFactory.query();
                }
            }
        })
        .when('/eleve/:id',{
            templateUrl:'app/views/profil.html',
            controller:'profil'
        })
        .otherwise({
            redirectTo:'/'
        });
        // Afin d'éviter d'avoir #!
        // $locationProvider.html5Mode(true);
    }
]);

app.config(['$resourceProvider', function($resourceProvider) {
    // Don't strip trailing slashes from calculated URLs
    $resourceProvider.defaults.stripTrailingSlashes = false;
}]);

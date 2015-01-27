var mainMod = angular.module("MiniMarket", ["ngRoute"]);

mainMod.config(function($routeProvider, $locationProvider){
    
    $locationProvider.html5Mode(true);
    
    $routeProvider.when('/',{
        templateUrl:'products.html',
        controller:'ProductController'
    });
    
    $routeProvider.when('/add',{
        templateUrl:'add_product.html'
    });
    
});

mainMod.controller('ProductController', function($scope,ProductFactory){
    ProductFactory.getProducts($scope);
});

mainMod.factory('ProductFactory', function($http){
    
    var factory = {};
    
    factory.getProducts = function(scouppi){
        
        $http.get('/data').
            success(function(data, status, headers, config){
                scouppi.products = data;
            }).
            error(function(data, status, headers, config){
                console.log("error getting data");
            });
    }
    
    return factory;
});
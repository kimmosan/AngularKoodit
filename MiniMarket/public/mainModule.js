var mainMod = angular.module("MiniMarket", ["ngRoute", "mvModule"]);

mainMod.config(function($routeProvider, $locationProvider) {
    
    $locationProvider.html5Mode(true);
    
    $routeProvider.when('/', {
        templateUrl:'products.html',
        controller:'ProductController'
    });
    
    $routeProvider.when('/add',{
        templateUrl:'add_product.html'
    });
    
});

mainMod.controller('ProductController', function($scope,ProductFactory) {
    
    ProductFactory.getProducts().then(function(data) {
        $scope.products = data;    
    });
    
    $scope.jotain = "Kimmo";
    
});

mainMod.factory('ProductFactory', function($http,$q) {
    
    var factory = {};
    
    factory.getProducts = function() {
        var deferred = $q.defer();
        
        $http.get('/data').
            success(function(data, status, headers, config) {
                deferred.resolve(data);
            }).
            error(function(data, status, headers, config) {
                console.log("error getting data");
            });
        
        return deferred.promise;
    }
    
    return factory;
});

//this directive uses controller's scope
mainMod.directive("myDirective1", function(){

    return {
        restrict: "A",
        template: "<h3>myDirective 1: Hello {{name}}</h3>"
    };
});

//this directive doesn't use controller's scope
mainMod.directive("myDirective2", function(){

    return {
        restrict: "A",
        scope: {
            kissa:"@",
            products:"="
            },
        templateUrl:"myDirective2.html"
    };
});
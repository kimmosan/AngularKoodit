var mainMod = angular.module("MiniMarket", ["ngRoute", "mvModule", "ngResource"]);

mainMod.config(function($routeProvider, $locationProvider){
    
    $locationProvider.html5Mode(true);
    
    $routeProvider.when('/',{
        templateUrl:'products.html',
        controller:'ProductController'
    });
    
    $routeProvider.when('/add',{
        templateUrl:'add_product.html',
        controller:"AddProductController"
    });
    
});

//This is one syntax to create controller, but might not work after minified
mainMod.controller('ProductController', function($scope,$location,ProductFactory){
    
    ProductFactory.getProducts().then(function(data){
        $scope.products = data;    
    });
    
    $scope.deleteProduct = function(index){
        ProductFactory.deleteProduct(index).then(function(data){
            $scope.products.splice(index,1);
        });
    }
    
    //These are primitives
    $scope.jotain = "Kimmo";
    $scope.isVisible = true;
    
    //Better way to do this is to use object literals
    $scope.omaJuttu = { jotain:"Kimmo", isVisible:true};
    
    $scope.next = function(){
        $location.path("/add");
    }
    
});

//This is another syntax to create controller (or factory/service)
//Minifier won't break the code
mainMod.controller("AddProductController", ["$scope", "ProductFactory", "$location", function($scope,ProductFactory,$location){
    
    $scope.product = {
        name:"",
        price:"",
        post_product:function(){
            var promise = ProductFactory.postProduct($scope.product);
            promise.then(function(data){
                console.log("Promise");
                console.log(data);
                $location.path("/");
            });
        
        }
    };
    
}]);

mainMod.factory('ProductFactory', function($http,$q,$resource){
    
    var factory = {};
    
    factory.getProducts = function(){
        var deferred = $q.defer();
        
        $http.get('/data').
            success(function(data, status, headers, config){
                deferred.resolve(data);
            }).
            error(function(data, status, headers, config){
                console.log("error getting data");
            });
        
        return deferred.promise;
    }
    
    factory.postProduct = function(data){
    
        var postResource = $resource("/data",{},{"post":{method:"POST"}});
        var myPromise = postResource.post(data).$promise;
        return myPromise;
    }
    
    factory.deleteProduct = function(index){
        var resurssi = $resource("/data/", {id:index}, {"delete":{method:"DELETE"}});    
        return resurssi.delete().$promise;
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
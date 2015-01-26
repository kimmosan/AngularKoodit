var CarApp = angular.module("CarAppModel",["ngRoute"]);

CarApp.controller("carDataController", function($scope){
   $scope.cars = [{model:"Dodge", price:20000.511846446},
                  {model:"Ford", price:1000}]; 
});

CarApp.config(function($routeProvider){
    
    $routeProvider.when('/', {
        controller:"carDataController",
        templateUrl:"view1.html"})
    
    .when('/cars', {
        controller:"carDataController",
        templateUrl:"view2.html"})
    
    .otherwise({redirectTo:'/'});
});

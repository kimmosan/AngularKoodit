var myModule = angular.module("mvModule", ["ngResource"]);

myModule.directive("myOwnDirective", function(){

    return {
        restrict: "A",
        scope: {
            temp:"@",
            city:"@",
            kaupunki:"@"
            },
        templateUrl:"myOwnDirective.html",
        controller: "DirectiveController"
    };
});

myModule.controller("DirectiveController", function($scope, $resource){
    var resurssi = $resource("http://api.openweathermap.org/data/2.5/weather?q=:kaupunki",{kaupunki:$scope.kaupunki});
    
    var data = resurssi.get(function(){
        $scope.temp = data.main.temp - 273.15;
        $scope.city = data.name;    
    });

});
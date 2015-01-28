var myModule = angular.module("mvModule", ["ngResource"]);

myModule.directive("myOwnDirective", function(){

    return {
        restrict: "A",
        scope: {
            temp:"@",
            city:"@"
            },
        templateUrl:"myOwnDirective.html",
        controller: "DirectiveController"
    };
});

myModule.controller("DirectiveController", function($scope, $resource){
    var resurssi = $resource("http://api.openweathermap.org/data/2.5/weather?q=:kaupunki");
    
    var data = resurssi.get(function(){
        $scope.temp = data.main.temp;
        $scope.city = data.name;    
    });

});
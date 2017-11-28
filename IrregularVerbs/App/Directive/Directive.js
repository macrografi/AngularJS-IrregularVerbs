angularApp.directive('myHeader', function () {
    return {
        templateUrl: 'App/Template/Header.html'
    }
});


//header controller
angularApp.controller('HeaderController', function ($scope, $location) {
    $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };
});

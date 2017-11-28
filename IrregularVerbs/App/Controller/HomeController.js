var angularApp = angular.module('angularApp', ['ngRoute', 'ngAnimate', 'ui.bootstrap']);

angularApp.config(['$routeProvider',
  function ($routeProvider) {
      $routeProvider.
        when('/Home', {
            templateUrl: 'App/Template/Home.html',
            controller: 'HomeController'
        }).
        otherwise({
            redirectTo: '/Home'
        });
  }]);

angularApp.controller('HomeController', function ($scope, $http, $timeout, $interval) {
    //default total count value.
    $scope.valExport = " ";
    $scope.counter = 0;
    $scope.scoreCounter = 0;
    $(".quizEndArea").hide();

    //background properties
    var winHeight = (function () {
        var winHeight = window.innerHeight;
        document.getElementById("container").style.height = winHeight + "px";
    })();

    window.onresize = function () {
        var winHeight = window.innerHeight;
        document.getElementById("container").style.height = winHeight + "px";
    };

    //JSON data
    $http.get("App/Data/IrregularData.json").then(function (response) {
        $scope.myData = response.data.records;
        //write total lenght
        $scope.lenghtVal = $scope.myData.length;

        //document ready random data.
        var myLenght = $scope.myData.length;
        $scope.randomIndex = $scope.myData[Math.floor(Math.random() * myLenght)];
    });

    //Progress Bar function
    $scope.myProgressFunction = function () {
        //progres bar calculation.
        var totalLenght = $scope.lenghtVal;
        var counter = $scope.counter;
        var currentProgressCount = Math.ceil(counter / totalLenght * 100);
        $scope.myProgress = { "width": currentProgressCount + "%" }


        $interval(function () {
            //end test.
            if (totalLenght == counter) {
                $(".quizArea").hide();
                $(".quizEndArea").show();
                $scope.counter = 0;
            }
        }, 1700, true);

    }

    //random data function.
    $scope.myRandomDataFunction = function () {
        //random data.
        var myLenght = $scope.myData.length;
        $scope.randomIndex = $scope.myData[Math.floor(Math.random() * myLenght)];
    }

    //buton ng-click function.
    $scope.myFunction = function () {
        //json data caps.
        var myMeaning = $scope.randomIndex.meaning;
        var myVerbs = $scope.randomIndex.verb;

        //click add total count value.
        $scope.counter += 1;
        //progres bar call fuction
        $scope.myProgressFunction();

        //my val.
        $scope.valInport = $scope.valExport;
        var myValue = $scope.valExport;

        for (var i = 0, len = myValue.length; i < len; i++) {
            var updateVal = myValue.substring(0, 1).toUpperCase() + myValue.substring(1, len).toLowerCase();
        }

        if (updateVal == myVerbs) {
            //true answer score.
            $scope.scoreCounter += 10;

            //alert success function call.
            $scope.alertSuccess();
        }
        else {
            //alert success function call.
            $scope.alertDanger();
        }

        //random data call function
        $scope.myRandomDataFunction();
    }

    //input val.
    $scope.myInput = function () {
        $scope.valExport = $scope.valInport;
        var myValue = $scope.valExport;
    }

    //next function
    $scope.nextFuncion = function () {
        //random data call function
        $scope.myRandomDataFunction();
        $scope.counter += 1;
        //progres bar call fuction
        $scope.myProgressFunction();
        $scope.activateButtons();
    }

    //again function.
    $scope.againFunction = function () {
        $(".quizArea").show();
        $(".quizEndArea").hide();

        //progress reset.
        $scope.myProgress = { "width": "0%" }
        //score.
        $scope.scoreCounter = 0;
    }

    //true message.
    $scope.alertSuccess = function () {
        $('.answerInput').addClass("inputFocusTrue inputAlignText");
        $scope.valInport = "Doğru! Tebrikler";
        $scope.activateButtons();

        $interval(function () {
            $('.answerInput').removeClass("inputFocusTrue inputAlignText");
            $scope.valInport = "";
        }, 1700, true);
    }

    //false message.
    $scope.alertDanger = function () {
        $('.answerInput').addClass("inputFocusFalse inputAlignText");
        $scope.valInport = "Yanlış!" + " " + $scope.randomIndex.verb;
        $scope.activateButtons();

        $interval(function () {
            $('.answerInput').removeClass("inputFocusFalse inputAlignText");
            $scope.valInport = "";
        }, 1700, true);
    }

    //active buttons
    $scope.activateButtons = function () {
        document.getElementById("buttonAnswer").disabled = true;
        document.getElementById("buttonNext").disabled = true;
        $interval(function () {
            document.getElementById("buttonAnswer").disabled = false;
            document.getElementById("buttonNext").disabled = false
        }, 1700, true);
    }
});

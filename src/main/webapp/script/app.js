var app = angular.module('MyApp', []);

//EX-1a

app.controller('MyController', [function () {
        var self = this;
        self.persons = [
            {name: 'Hans', gender: 'male', age: 8},
            {name: 'Grethe', gender: 'female', age: 7},
            {name: 'Frederik', gender: 'male', age: 61},
            {name: 'Hassan', gender: 'male', age: 13},
            {name: 'Karen', gender: 'female', age: 31}, ];
    }]);

app.filter('ageFilter', function () {

    // Create the return function and set the required parameter name to **input**
    return function (input) {

        var out = [];

        // Using the angular.forEach method, go through the array of data and perform the operation of figuring out if the language is statically or dynamically typed.
        angular.forEach(input, function (person) {

            if (person.age > 6 && person.age < 15) {
                out.push(person)
            }

        })

        return out;
    }

});

//EX-1b

app.controller('ChessController', ["$scope", function ($scope) {
        $scope.board = ["wr", "wkn", "wb", "wq", "wk", "wb", "wkn", "wr"];
    }]);




app.filter('Chess', function () {
    return function (input) {
        var out;
        switch (input) {
            case "wr":
                out = "\u2656";
                break;
            case "wkn":
                out = "\u2658";
                break;
            case "wb":
                out = "\u2657";
                break;
            case "wq":
                out = "\u2654";
                break;
            case "wk":
                out = "\u2655";
        }
        return out;
    }
});



//EX-2a
app.controller("DirectiveController", ['$scope', function ($scope) {
        $scope.user = {
            companyName: "Coolest Company on Earth",
            companyUrl: "http://www.cool.cooler.com",
            created: new Date()
        }
    }])

app.directive('formatCompany', function () {
    return {
        template: '<table class="table">\
                    <tr><td>Company</td><td>{{user.companyName}}</td></tr>\
                    <tr><td>URL:</td><td>{{user.companyUrl}}</td></tr>\
                    <tr><td>Created</td><td>{{user.created | date}}</td></tr></table>'
    }
});

//EX-2b
app.directive('galleryDirective', [function () {
        return {
            restrict: 'EA',
            link: function (scope, element, attrs) {
                var attributeParts = attrs.images.split(',');
                for (var i = 0; i < attributeParts.length; i++) {
                    element.append(angular.element("<img src='" + attributeParts[i] + "'/>"));
                    //console.log(attributeParts[i]);
                }
            }
        };
    }]);

//EX-3

app.factory('randomFactory', function () {

    var fac = {}

    fac.getRandomNumber = function (n) {
        return Math.random() * n + 1;
    }
    fac.getRandomString = function (n) {
        return new Array(n + 1).join((Math.random().toString(36) + '00000000000000000').slice(2, 18)).slice(0, n)
    }

    return fac;
});

app.controller('rondomController', ['$scope', 'randomFactory', function ($scope, randomFactory) {

        $scope.randomNumber = randomFactory.getRandomNumber;
        $scope.randomString = randomFactory.getRandomString;

//    this.randomNumber = randomFactory.getRandomNumber;
//    this.randomString = randomFactory.getRandomString;

    }]);

// ex 4

app.factory('countryFactory', ['$http', function ($http) {
        var fac = {};

        fac.allCountries = function () {
            return $http.get('https://restcountries.eu/rest/v1/all');
        };

        return fac;
    }]);

app.controller('countryController', ['$scope', 'countryFactory', '$http', function ($scope, countryFactory, $http) {
        $scope.allCountries = [];
        countryFactory.allCountries()
                .then(
                        function (response) {
                            $scope.allCountries = response.data;
                        },
                        function (response) {
                            console.log(response.data.toString());
                        });
    }]);

//EX5
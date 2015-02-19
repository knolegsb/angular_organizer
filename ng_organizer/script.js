
// create the module and name it globloApp
var globloApp = angular.module('globloApp', ['ngRoute', 'ui.bootstrap', 'ngAnimate']);

// configure our routes
globloApp.config(function($routeProvider) {
    $routeProvider

        // route for the home page
        .when('/', {
            templateUrl: 'pages/home.html',
            controller: 'mainController'
        })

        // route for the todo manager page
        .when('/todo', {
            templateUrl: 'pages/todo.html',
            controller: 'todoController'
        })

        // route for the contact manager page
        .when('/contact', {
            templateUrl: 'pages/contact.html',
            controller: 'contactController'
        })

        // route for the login manager page
        .when('/login', {
            templateUrl: 'pages/login.html',
            controller: 'loginController'
        })

        // route for the registration page
        .when('/registration', {
            templateUrl: 'pages/registration.html',
            controller: 'registrationController'
        });
});

// create the controller and inject Angular's $scope
globloApp.controller('mainController', function ($scope) {
    $scope.message = 'Too busy life! We will help you to be organized.';

        $scope.myInterval = 3000;
        $scope.slides = [
          {
              image: 'images/slide1.png'
          },
          {
              image: 'images/slide2.png'
          },
          {
              image: 'images/slide3.png'
          }
          
        ];
       
});

globloApp.controller('todoController', function($scope) {
    $scope.message = 'Be careful, Don\'t forget. Check it out!';
   
             $scope.todos = [
              { task: 'Pet a peach', completed: false },
              { task: 'Bite a kitten', completed: false },
              { task: 'Read a book', completed: false },
              { task: 'Clean the kitchen', completed: false },
              { task: 'Mop the floor', completed: false }
            ];

            $scope.$watch('todos', function () {
                var anyComplete = false;
                $scope.todos.forEach(function (todo) {
                    if (todo.completed) {
                        anyComplete = true;
                        return;
                    }
                });
                $scope.isDisabled = !anyComplete;
            }, true);

            $scope.delete = function (index) {
                $scope.todos.splice(index, 1);
            };

            $scope.add = function () {
                $scope.todos.push({ task: $scope.newTodo, completed: false });
                $scope.newTodo = "";
            };

            $scope.clearFinished = function () {
                $scope.todos = $scope.todos.filter(function (todo) {
                    return !todo.completed;
                });
            };
        });
  

globloApp.controller('contactController', function($scope) {
    $scope.message = 'Life is mystery. This person could be your savior!';

    globloApp.factory("dataFactory", [function () {
        return {
            getDate: function () { return new Date(); }
            }
        }]);

        globloApp.filter('lastName', [function () {
            return function (arrTemp, searchText) {
                var filteredArray = [],
                    search = searchText || "",
                    reg = new RegExp(search, "i");

                angular.forEach(arrTemp, function (value, key) {
                    if (reg.test(value.lastName)) filteredArray.push(value);
                });
                return filteredArray;
            };
        }]);

       
           
            
        $scope.contacts =
            [
                { firstName: "Jonathan", lastName: "Gravity", title: { name: "Mr.", id: 0 } },
                { firstName: "Michael", lastName: "Boltaire", title: { name: "Mr.", id: 1 } },
                { firstName: "Simon", lastName: "Gonzales", title: { name: "Mr.", id: 2 } },
                { firstName: "Andy", lastName: "Shin", title: { name: "Mr.", id: 3 } },
                { firstName: "Martin", lastName: "Broderick", title: { name: "Mr.", id: 4 } },
            ]
            $scope.inEditMode = false;
            $scope.currentContact = {};
            $scope.editingContactIndex = 0;
            $scope.titles = [
              "Mr.",
              "Miss",
              "Mrs.",
              "Ms.",
              "Dr."
            ];

            $scope.add = function () {
            
                $scope.contacts.$add($scope.currentContact);
                $scope.currentContact = {};
            };

            $scope.edit = function () {
                // once the user has accept the edit,
                // update the contact in the array
                $scope.contacts[$scope.editingContactIndex] = $scope.currentContact;
                // now tell angularfire which contact to update
            
                $scope.contacts.$save($scope.editingContactIndex);
                $scope.currentContact = {};
                $scope.inEditMode = false;
            };

            $scope.select = function (index) {
                // In order to not change the list of contacts until user accepts
                // edit we make a copy of the contact and save its index
                $scope.editingContactIndex = index;
                $scope.currentContact = angular.copy($scope.contacts[index]);
                $scope.currentContact.title = $scope.currentContact.title;
                $scope.inEditMode = true;
            };

            $scope.clear = function () {
                $scope.currentContact = {};
                $scope.inEditMode = false;
            };

            $scope.delete = function (contact) {
            
                $scope.contacts.$remove(contact);
            };
        });
   
globloApp.controller('loginController', ['$scope', '$animate', function ($scope, $animate) {

    // hide error messages until 'submit' event
    $scope.submitted = false;

    // hide success message
    $scope.showMessage = false;

    // method called from shakeThat directive
    $scope.submit = function () {
        // show success message
        $scope.showMessage = true;
    };

}])

.directive('shakeThat', ['$animate', function ($animate) {

    return {
        require: '^form',
        scope: {
            submit: '&',
            submitted: '='
        },
        link: function (scope, element, attrs, form) {

            // listen on submit event
            element.on('submit', function () {

                // tell angular to update scope
                scope.$apply(function () {

                    // everything ok -> call submit fn from controller
                    if (form.$valid) return scope.submit();

                    // show error messages on submit
                    scope.submitted = true;

                    // shake that form
                    $animate.addClass(element, 'shake', function () {
                        $animate.removeClass(element, 'shake');
                    });

                });

            });

        }
    };

}]);

globloApp.controller('registrationController', ['$scope', '$animate', function ($scope, $animate) {

    // hide error messages until 'submit' event
    $scope.submitted = false;

    // hide success message
    $scope.showMessage = false;

    // method called from shakeThat directive
    $scope.submit = function () {
        // show success message
        $scope.showMessage = true;
    };

}])

.directive('shakeThat', ['$animate', function ($animate) {

    return {
        require: '^form',
        scope: {
            submit: '&',
            submitted: '='
        },
        link: function (scope, element, attrs, form) {

            // listen on submit event
            element.on('submit', function () {

                // tell angular to update scope
                scope.$apply(function () {

                    // everything ok -> call submit fn from controller
                    if (form.$valid) return scope.submit();

                    // show error messages on submit
                    scope.submitted = true;

                    // shake that form
                    $animate.addClass(element, 'shake', function () {
                        $animate.removeClass(element, 'shake');
                    });

                });

            });

        }
    };

}]);
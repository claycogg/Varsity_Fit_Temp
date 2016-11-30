angular.module('starter.controllers', [])

.controller('LoginCtrl', function($rootScope, $state, LoginService, Backand) {
    var login = this;
    
    function signin() {
      LoginService.signin(login.email, login.password, login.appName)
        .then (function() {
          $rootScope.$broadcast("authorized");
          
          $state.go("tab.survey");
          
        }, function(error){
          console.log(error)
          
        })
    }

    function signout() {
      LoginService.signout()
        .then (function() {
          $state.go("tab.login");
          
        })
    }
    
    login.signin = signin;
    login.signout = signout;

/*
    var appName = 'varsityfit';
    Backand.signin(email, password, appName).then(
      function(data){}, function(error){});
  
*/

})


.controller('SurveyCtrl', function($scope) {})

.controller('WorkoutCtrl', function($scope) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});


})

.controller('ReferencesCtrl', function($scope) {

})

.controller('AccountCtrl', function($scope) {

});

angular.module('starter.controllers', ['backand', 'ngCookies'])

.controller('LoginCtrl', function($scope, Backand) {
    var appName = 'varsityfit';
    Backand.signin(email, password, appName).then(
      function(data){}, function(error){});
  
  
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

})


.controller('usersCtrl',    
      function($scope, DatabaseService) {

      $scope.playlists = [];

      // read all playlists for a user
      DatabaseService.readAll('playlists').then(
        function9data){
        $scope.playlists = data; 
      });

      // a click handler for selecting a playlist
      $scope.clickPlaylist = function(id){
                DatabaseService.readOne('playlists', id). 
           then(function(data){});
      });

    });
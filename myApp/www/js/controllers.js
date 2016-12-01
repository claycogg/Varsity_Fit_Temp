angular.module('starter.controllers', [])

.controller('LoginCtrl', function($rootScope, $state, LoginService, Backand) {
    var login = this;
    
    function signup() {
      
      
    }
    
    function signin() {
      var appName = 'varsityfit'
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

    // var appName = 'varsityfit';
    // Backand.signin(email, password, appName).then(
    //  function(data){}, function(error){});
  

}) 

/*.controller('LoginCtrl', function($rootScope, $state, UsersModel, Backand) {
  var vm = this;
  
  
  function initCreateForm() {
    vm.newObject = { email: '', password: '', firstName: '', lastName:'', sport: ''}; 
  }
  function signup(object){
    UsersModel.create(object)
      .then(function (result) {
        cancelCreate();
      });
  }
  
  function cancelCreate() {
    initCreateForm();
    vm.isCreating = false;
  }
  
  function signin() {
      var appName = 'varsityfit'
      LoginService.signin(login.email, login.password, login.appName)
        .then (function() {
          $rootScope.$broadcast("authorized");
          
          $state.go("tab.survey");
          
        }, function(error){
          console.log(error)
          
        })
  }
  
        initCreateForm();
        vm.signup = signup;
        vm.isCreating = false;
  
}) */

.controller('SurveyCtrl', function($rootScope, SurveysModel) {
  var vm = this;
  
  function getAll(){
    SurveysModel.all()
      .then(function (result) {
        vm.data = result.data.data;
      });
  }
  
  function create(object){
    SurveysModel.create(object)
      .then(function (result) {
        cancelCreate();
        getAll();
      });
  }
  
  function update(object){
    SurveysModel.update(object.id, object)
      .then(function (result) {
        cancelEditing();
        getAll();
      });
  }  
  
  function deleteObject(id){
    SurveysModel.delete(id)
      .then(function (result) {
        cancelEditing();
        getAll();
      });
      
    
  }
  
  function initCreateForm() {
    vm.newObject = { bodyWeight: '', hoursSleep: '', stressLevel: '', minsPlayed:'', date: ''}; 
  }
  
  function setEdited(object) {
    vm.edited = angular.copy(object);
    vm.isEditing = true;
  }
  
  function isCurrent(id) {
    return vm.edited !== null && vm.edited.id === id;
  }
  
  function cancelEditing() {
    vm.edited = null;
    vm.isEditing = false;
  }
  
  function cancelCreate() {
    initCreateForm();
    vm.isCreating = false;
  }
  
  vm.objects = [];
  vm.edited = null;
  vm.isEditing = false;
  vm.isCreating = false;
  vm.getAll = getAll;
  vm.create = create;
  vm.update = update;
  vm.delete = deleteObject;
  vm.setEdited = setEdited;
  vm.isCurrent = isCurrent;
  vm.cancelEditing = cancelEditing;
  vm.cancelCreate = cancelCreate;
  $rootScope.$on("authoried", function() {
    getAll();
  });
  
  initCreateForm();
  getAll();
  
})

.controller('WorkoutCtrl', function($scope) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});


})

/*
.controller('ReferencesCtrl', function($scope, $state, ReferenceService) {
  $state.go('referenceslinks');

})

*/

.controller('ReferencesLinksCtrl', function($scope) {
  
})

.controller('AccountCtrl', function($scope) {

});
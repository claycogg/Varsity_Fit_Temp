angular.module('starter.controllers', ['ionic'])

.controller('LoginCtrl', function($rootScope, $scope, $state, LoginService, Backand) {
    
    var login = this;
    
    function signin() {
      var appName = 'varsityfit'
      LoginService.signin(login.email, login.password, appName)
        .then (function() {
          $rootScope.$broadcast("authorized");
          $state.go("tab.workout");
          
        }, function(error){
          console.log(error)
          
        })
    }
    
    function signout() {
      LoginService.signout()
        .then (function() {
          //$state.go("tab.login");
          $state.go("login");
          
        })
    }
    
    login.signin = signin;
    login.signout = signout;
    

}) 



.controller('PreSurveyCtrl', function($rootScope, $scope, $state, PreSurveysModel, Backand) {
  var vm = this;
  var userDetail;
  
  
  function getAll(){
    PreSurveysModel.all()
      .then(function (result) {
        vm.data = result.data.data;
      });
  }
  
  $scope.getUserDetails = function() {
    var user = Backand.getUserDetails();
    if(user.$$state.value !== null){
      $scope.currentUser = user.$$state.value.userId;
      userDetail = $scope.currentUser;
    }
    else {
      $scope.currentUser = null;
    }
  }
  
  function create(object){
    PreSurveysModel.create(object)
      .then(function (result) {
        cancelCreate();
        getAll();
        
        $state.go("tab.workoutdetails");
      });
  }
  function initCreateForm() {
    $scope.getUserDetails();
    vm.newObject = { bodyWeightIn: '', hoursSleep: '', sleepQuality: '', stressLevel: '', muscleSoreness: '', fatigueLevelPre: '', date: '', user: userDetail}; 
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
  vm.setEdited = setEdited;
  vm.isCurrent = isCurrent;
  vm.cancelEditing = cancelEditing;
  vm.cancelCreate = cancelCreate;
  $rootScope.$on("authorized", function() {
    getAll();
  });
  
  initCreateForm();
  getAll();
  
})



.controller('PostSurveyCtrl', function($rootScope, $scope, Backand, $state, PostSurveysModel) {
  var vm = this;
  var userDetail;
  
  function getAll(){
    PostSurveysModel.all()
      .then(function (result) {
        vm.data = result.data.data;
      });
  }
  
  $scope.getUserDetails = function() {
    var user = Backand.getUserDetails();
    if(user.$$state.value !== null){
      $scope.currentUser = user.$$state.value.userId;
      userDetail = $scope.currentUser;
    }
    else {
      $scope.currentUser = null;
    }
  }
  
  function create(object){
    PostSurveysModel.create(object)
      .then(function (result) {
        cancelCreate();
        getAll();
        
        $state.go("tab.workoutdetails");
      });
  }
  function initCreateForm() {
    $scope.getUserDetails();
    vm.newObject = { bodyWeightOut: '', practiceDifficulty: '', fatigueLevelPost: '', date: '', user: userDetail}; 
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
  vm.setEdited = setEdited;
  vm.isCurrent = isCurrent;
  vm.cancelEditing = cancelEditing;
  vm.cancelCreate = cancelCreate;
  $rootScope.$on("authorized", function() {
    getAll();
  });
  
  initCreateForm();
  getAll();
  
})




.controller('WorkoutCtrl', function($scope) {

})


.controller('ReferencesCtrl', function($scope) {
  //$state.go('referenceslinks');

})


.controller('ReferencesLinksCtrl', function($scope) {
  
})

.controller('AccountCtrl', function($scope) {

});
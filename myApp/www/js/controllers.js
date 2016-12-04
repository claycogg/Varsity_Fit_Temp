angular.module('starter.controllers', ['ionic'])

.controller('LoginCtrl', function($rootScope, $state, LoginService, Backand) {
    
    var login = this;
    
    function signin() {
      var appName = 'varsityfit'
      LoginService.signin(login.email, login.password, appName)
        .then (function() {
          $rootScope.$broadcast("authorized");
          
          $state.go("tab.presurvey");
          
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


.controller('PreSurveyCtrl', function($rootScope, $state, PreSurveysModel) {
  var vm = this;
  
  function getAll(){
    PreSurveysModel.all()
      .then(function (result) {
        vm.data = result.data.data;
      });
  }
  
  function create(object){
    PreSurveysModel.create(object)
      .then(function (result) {
        cancelCreate();
        getAll();
        
        $state.go("tab.workout");
      });
  }
  function initCreateForm() {
    vm.newObject = { bodyWeightIn: '', hoursSleep: '', sleepQuality: '', stressLevel: '', muscleSoreness: '', fatigueLevelPre: '', date: ''}; 
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

/*
.controller('ReferencesCtrl', function($scope, $state, ReferenceService) {
  $state.go('referenceslinks');

})

*/

.controller('ReferencesLinksCtrl', function($scope) {
  
})

.controller('AccountCtrl', function($scope) {

});
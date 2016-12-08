angular.module('starter.controllers', ['ionic'])

.controller('LoginCtrl', function($rootScope, $scope, $state, LoginService, Backand) {
    
    var login = this;
    var token;
    var appName = 'varsityfit';
    // var newPassword2;
    
    function signin() {
      LoginService.signin(login.email, login.password, appName)
        .then (function() {
          $rootScope.$broadcast("authorized");
          $state.go("tab.workout");
          
        }, function(error){
          console.log(error);
          
        });
    }

    login.signin = signin;
    
    function requestResetPassword() {
      LoginService.requestResetPassword(login.userName)
        .then(function() {
          token = Backand.getToken();
          $rootScope.$broadcast("successful");
          $state.go("resetPassword");
        }, function(error){
          console.log(error);
        });
    }
    login.requestResetPassword = requestResetPassword;
    
    function resetPassword() {
      LoginService.resetPassword(login.resetToken, login.newPassword)
        .then (function() {
          $rootScope.$broadcast("authorized");
          alert('Your password was successfully changed');
          $state.go("login");
        }, function(error) {
          console.log(error);
        });
    }
    
    login.resetPassword = resetPassword;

    function changePassword() {
      if (login.newPassword == login.newPassword2) {
        LoginService.changePassword(login.oldPassword, login.newPassword)
          .then(function() {
            $rootScope.$broadcast("successful");
            $state.go("tab.account");
          }, function(error) {
            console.log(error);
          });
      }
    }
    
    login.changePassword = changePassword;

}) 



.controller('PreSurveyCtrl', function($rootScope, $scope, $state, PreSurveysModel, Backand) {
  var vm = this;
  var userDetail;
  var data2 = [];

  $scope.getUserDetails = function() {
    var user = Backand.getUserDetails();
    if(user.$$state.value !== null){
      $scope.currentUser = user.$$state.value.userId;
      userDetail = $scope.currentUser;
    }
    else {
      $scope.currentUser = null;
    }
  };
  



  function getAll(){
    PreSurveysModel.all()
      .then(function (result) {
            vm.allData = result.data.data;
        //else {
          
        //}
      });
  }
  
  function getSelected(){
    PreSurveysModel.all()
      .then(function (result) {
        for (var object in vm.allData) {
            var current = vm.allData[object];
            if (userDetail == current.user) {
              data2.push(vm.allData[object]);
            }
            
        }
        vm.data = data2;

      });
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
    getSelected();
  });
  
  initCreateForm();
  getAll();
  getSelected();
  
})



.controller('PostSurveyCtrl', function($rootScope, $scope, Backand, $state, PostSurveysModel) {
  var vm = this;
  var userDetail;
  var data2 = [];
  

  $scope.getUserDetails = function() {
    var user = Backand.getUserDetails();
    if(user.$$state.value !== null){
      $scope.currentUser = user.$$state.value.userId;
      userDetail = $scope.currentUser;
    }
    else {
      $scope.currentUser = null;
    }
  };
  function getAll(){
    PostSurveysModel.all()
      .then(function (result) {
            vm.allData = result.data.data;
      });
  }
  
  function getSelected(){
    PostSurveysModel.all()
      .then(function (result) {
        for (var object in vm.allData) {
            var current = vm.allData[object];
            if (userDetail == current.user) {
              data2.push(vm.allData[object]);
            }
            
        }
        vm.data = data2;

      });
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
    getSelected();
  });
  
  
  initCreateForm();
  getAll();
  getSelected();
})




.controller('WorkoutCtrl', function($scope) {

})


.controller('ReferencesCtrl', function($scope) {
  //$state.go('referenceslinks');

})


.controller('ReferencesLinksCtrl', function($scope) {
  
})

.controller('AccountCtrl', function($scope, Backand, $state) {

  var vm = this;
  
  function userDetails() {
    var user = Backand.getUserDetails();
    if(user.$$state.value !== null){
      $scope.currentUser = user.$$state.value.userId;
      vm.firstName = user.$$state.value.firstName;
      vm.lastName = user.$$state.value.lastName;
      vm.username = user.$$state.value.username;
      vm.fullName = user.$$state.value.fullName;
    }
    else {
      $scope.currentUser = null;
    }    
  }
  
  userDetails();
  
  


  
  $scope.signout = function () {
    return Backand.signout()
      .then(function (response) {
        userDetails();
        $state.go('login');
        return response;

    });
  };

});

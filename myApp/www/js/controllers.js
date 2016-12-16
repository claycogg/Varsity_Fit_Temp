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




.controller('WorkoutCtrl', function($scope, $rootScope, Backand, $state, UsersSportsModel, SportsWorkoutsModel, WorkoutModel) {
  var wo = this;
  var userDetail;
  var sportDetail = [];
  
  var data2 = [];

  $scope.getUserDetails = function() {
    var user = Backand.getUserDetails();
    if(user.$$state.value !== null){
      user.$$state.value;
      $scope.currentUser = user.$$state.value.userId;
      userDetail = $scope.currentUser;
      $scope.getSportDetails();
    }
    else {
      $scope.currentUser = null;
    }
  };
  
  
  
  $scope.getSportDetails = function(){
    UsersSportsModel.all()
      .then(function (result) {
            wo.sports = result.data.data;
            console.log(wo.sports);
            for (var object in wo.sports) {
              var current = wo.sports[object];
              var user_sport = current.user;
              if(userDetail == user_sport) {
                sportDetail.push(wo.sports[object]);
              }
              //if ($scope.currentUser == object.user)
            }
            console.log(sportDetail);
            
      });
  
  };
  
  $scope.getWorkoutDetails = function() {
    
    
  }




  function getAll(){
    WorkoutModel.all()
      .then(function (result) {
            wo.allData = result.data.data;
            //console.log(wo.allData);
        //else {
          
        //}
      });
  }
  
  function getSelected(){
    WorkoutModel.all()
      .then(function (result) {
        for (var object in wo.allData) {
            var current = wo.allData[object];
            if (userDetail == current.user) {
              data2.push(wo.allData[object]);
            }
            
        }
        wo.data = data2;
        //console.log(wo.data);
      });
  }
  
  
  function create(object){
    WorkoutModel.create(object)
      .then(function (result) {
        cancelCreate();
        getAll();
        
        //$state.go("tab.workoutdetails");
      });
  }
  function initCreateForm() {
    $scope.getUserDetails();
    wo.newObject = { name: ''}; 
  }
  function setEdited(object) {
    wo.edited = angular.copy(object);
    wo.isEditing = true;
  }
  
  function isCurrent(id) {
    return wo.edited !== null && wo.edited.id === id;
  }
  
  function cancelEditing() {
    wo.edited = null;
    wo.isEditing = false;
  }
  
  function cancelCreate() {
    initCreateForm();
    wo.isCreating = false;
  }
  
  wo.objects = [];
  wo.edited = null;
  wo.isEditing = false;
  wo.isCreating = false;
  wo.getAll = getAll;
  wo.create = create;
  wo.setEdited = setEdited;
  wo.isCurrent = isCurrent;
  wo.cancelEditing = cancelEditing;
  wo.cancelCreate = cancelCreate;
  $rootScope.$on("authorized", function() {
    getAll();
    getSelected();
  });
  
  initCreateForm();
  getAll();
  getSelected();
  
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

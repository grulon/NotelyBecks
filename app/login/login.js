(function(){
  angular.module('notely.login', [
    'ui.router'
  ])
    .config(loginConfig);

  loginConfig['$inject'] = ['$stateProvider'];
  function loginConfig($stateProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'login/login.html',
        controller: LoginController
      });
  }

  LoginController['$inject'] = ['$scope', '$state'];
  function LoginController($scope, $state) {
    $scope.login=function(){
      $state.go('notes.form');
    }
  }
})();

(function() {
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

  LoginController['$inject'] = ['$scope', '$state', 'login'];
  function LoginController($scope, $state, login) {
    $scope.user = {};
    $scope.login = function() {
      login.login($scope.user).success(function() {
        $state.go('notes.form');
      });
    }
  }
})();

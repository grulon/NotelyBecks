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
        templateUrl: 'login/login.html'
      });
  }
})();

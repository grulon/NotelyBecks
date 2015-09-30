(function() {
  angular.module('notely.login')
    .service('login', loginService);

  loginService['$inject'] = ['$http', 'constants', 'AuthToken', 'CurrentUser'];
  function loginService($http, constants, AuthToken, CurrentUser) {
    this.login = function(user) {
      return $http.post(
        constants.apiBasePath + 'session', {
          user: {
            username: user.username,
            password: user.password
          }
        }
      )
      .success(function(response) {
        AuthToken.set(response.auth_token);
        CurrentUser.set(response.user);
      });
    }

    this.logout = function() {
      AuthToken.clear();
      CurrentUser.clear();
    }
  }
})();

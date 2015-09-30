(function() {
  angular.module('notely.login')
    .factory('AuthInterceptor', AuthInterceptor);

  AuthInterceptor['$inject'] = ['AuthToken','constants'];
  function AuthInterceptor(AuthToken, constants) {
    return {
      request: function(config) {
        var token = AuthToken.get();
        if (token && config.url.indexOf(constants.apiBasePath) > -1) {
          config.headers['Authorization'] = token;
        }
        return config;
      }
    }
  }

  angular.module('notely')
    .config(function($httpProvider) {
      return $httpProvider.interceptors.push('AuthInterceptor');
    });
})();

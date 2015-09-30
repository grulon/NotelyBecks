angular.module('notely')
  .directive('bdUserLinks',function() {
    return {
      restrict: 'EA',
      replace: true,
      scope: {},
      template: '\
    <div class="user-links"> \
      <div ng-show="ctrl.user().id"> \
        Signed in as {{ ctrl.user().name }} \
        | \
        <a ng-click="ctrl.logout()">Logout</a> \
      </div> \
    </div>',
      controller: userLinksController,
      controllerAs: 'ctrl'
    };

    userLinksController['$inject'] = ['$state', 'login'];
    function userLinksController($state, login){
      this.really = 'Yes, really.';
      this.user = function() {
        return {
          id: 1,
          name: 'User Person'
        };
      }
      this.logout = function() {
        login.logout();
        $state.go('login');
      }
    }
  });

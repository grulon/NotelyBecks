(function() {
  angular.module('notely.notes', [
    'ui.router'
  ])
  .controller('NotesController', NotesController)
  .controller('NotesFormController', NotesFormController)
  .config(notesConfig);

  notesConfig['$inject'] = ['$stateProvider'];

  function notesConfig($stateProvider) {
    $stateProvider

      .state('notes', {
        url: '/notes',
        abstract: true,
        templateUrl: '/notes/notes.html',
        controller: NotesController
      })

      .state('notes.form', {     //child state
        url: '/{noteId}',
        templateUrl: '/notes/notes-form.html',
        controller: NotesFormController
      });
  }

  NotesController['$inject'] = ['$scope', '$state', 'notes'];

  function NotesController($scope, $state, notes) {
    notes.fetchNotes(function(notes) {
      $scope.notes = notes;
    });
    //$state.go('notes.form');  Don't need this to redirect since set abstract = true and added / to app.js urlRouterProvider
  }

    NotesFormController['$inject'] = ['$scope', '$state', 'notes'];

    function NotesFormController($scope, $state, notes) {
      $scope.note = notes.findById($state.params.noteId);
      $scope.save = function() {
        notes.save($scope.note);
      }
    }

})();

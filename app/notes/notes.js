(function() {
  angular.module('notely.notes', [
    'ui.router'
  ])
  .controller('NotesController', NotesController)
  .config(notesConfig);

  notesConfig['$inject'] = ['$stateProvider'];
  function notesConfig($stateProvider) {
    $stateProvider

      .state('notes', {
        url: '/notes',
        templateUrl: '/notes/notes.html',
        controller: NotesController
      })

      .state('notes.form', {
        url: '/:noteId',
        templateUrl: '/notes/notes-form.html'
      });
  }

  NotesController['$inject'] = ['$scope', '$state', 'notes'];
  function NotesController($scope, $state, notesService) {
    notesService.fetchNotes(function(notes) {
      $scope.notes = notes;
    });
    $state.go('notes.form');
  }
})();

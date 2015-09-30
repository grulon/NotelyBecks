(function() {
  angular.module('notely.notes.service', [])
    .service('notes', notesService);

  notesService['$inject'] = ['$http', '$filter', '$state', 'constants'];
  function notesService($http, $filter, $state, constants) {
    var notes = [];
    var user = {
      apiKey: '$2a$10$M9YKAJ/y08ztCrFV89dR2uwesxwl6RpFQ9V2zJkOJfCcJDHmCaz7O'
    }

    this.fetchNotes = function() {
      return $http.get(constants.apiBasePath + 'notes?api_key=' + user.apiKey)
        .success(function(notesData) {
          notes = notesData;
        });
    };

    this.replaceNote = function(note) {
      for (var i = 0; i < notes.length; i++) {
        if(notes[i].id === note.id) {
          notes.splice(i,1);
          notes.unshift(note);
          break;
        }
      }
    };

    this.removeNote = function(note) {
      for (var i = 0; i < notes.length; i++) {
        if(notes[i].id === note.id) {
          notes.splice(i,1);
          break;
        }
      }
    };
//     this.create = function(note){
//       if(note.id) {
//         $http.put(constants.apiBasePath + 'notes/' + note.id, {
//           api_key: user.apiKey,
//           note: note
//         });
//
//       }
//       else {
//       $http.post(constants.apiBasePath + 'notes', {
//         api_key: user.apiKey,
//         note: note
//
//       })
//         .success(function(notesData) {
//           notes.unshift(notesData.note);
//         });
//     }
// }
  this.create = function(note) {
       $http.post(constants.apiBasePath + 'notes', {
         api_key: user.apiKey,
         note: {
           title: note.title,
           body_html: note.body_html
         }
       })
         .success(function(noteData) {
           notes.unshift(noteData.note);
           $state.go('notes.form',{ noteId: noteData.note.id });
         });
     }

     this.update = function(note) {
      var self = this;
       return $http.put(constants.apiBasePath + 'notes/' + note.id, {
         api_key: user.apiKey,
         note: {
           title: note.title,
           body_html: note.body_html
         }
       }).success(function(noteData){

         self.replaceNote(noteData.note);
       });
     }

     this.delete = function(note) {
       var self = this;
       return $http.delete(constants.apiBasePath + 'notes/' + note.id +'?api_key=' + user.apiKey)
       .success(function(result){
          self.removeNote(note);
       });
     }

  this.findById = function(noteId) {
      return note = ($filter('filter')(notes,{ id: parseInt(noteId) }, true)[0] || {});

  }

  this.all = function() {
    return notes;
  }

}
})();

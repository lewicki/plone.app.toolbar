// This script will register Plone's overlays for toolbar actions.
//
// @licstart  The following is the entire license notice for the JavaScript
//            code in this page.
//
// Copyright (C) 2010 Plone Foundation
//
// This program is free software; you can redistribute it and/or modify it
// under the terms of the GNU General Public License as published by the Free
// Software Foundation; either version 2 of the License.
//
// This program is distributed in the hope that it will be useful, but WITHOUT
// ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
// FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for
// more details.
//
// You should have received a copy of the GNU General Public License along with
// this program; if not, write to the Free Software Foundation, Inc., 51
// Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
//
// @licend  The above is the entire license notice for the JavaScript code in
//          this page.
//

/*jshint bitwise:true, curly:true, eqeqeq:true, immed:true, latedef:true,
  newcap:true, noarg:true, noempty:true, nonew:true, plusplus:true,
  regexp:false, undef:true, strict:true, trailing:true, browser:true */


(function($, Patterns, undefined) {
"use strict";

$(document).ready(function() {

  //// Delete Action
  //$('#plone-toolbar #plone-contentmenu-actions > ul > li#delete > a').ploneOverlay({
  //  onShow: function() { $(this).patternToggle('toggle'); },
  //    formButtons: {
  //      '.modal-body input[name="form.button.Cancel"]':
  //          $.fn.ploneOverlay.defaultAjaxSubmit(),
  //      '.modal-body input.destructive':
  //          $.fn.ploneOverlay.defaultAjaxSubmit({
  //            onSave: function(response, state, xhr, form, button) {
  //              // need redirect to different url after successfull submitting
  //              window.parent.location.href = this.getBaseURL(xhr.responseText);
  //            }
  //          })
  //    }
  //});

  //// Rename Action
  //$('#plone-toolbar #plone-contentmenu-actions > ul > li#rename > a').ploneOverlay({
  //  onShow: function() { $(this).patternToggle('toggle'); },
  //  formButtons: {
  //    '.modal-body input[name="form.button.Cancel"]':
  //        $.fn.ploneOverlay.defaultAjaxSubmit(),
  //    '.modal-body input[name="form.button.RenameAll"]':
  //        $.fn.ploneOverlay.defaultAjaxSubmit({
  //          onSave: function(response, state, xhr, form, button) {
  //            // need redirect to different url after successfull submitting
  //            window.parent.location.href = this.getBaseURL(xhr.responseText);
  //          }
  //        })
  //  }
  //});

  //// Display View -> Select default content as default view
  //$('#plone-toolbar #plone-contentmenu-display > ul > li#contextSetDefaultPage > a').ploneOverlay({
  //  onShow: function() { $(this).patternToggle('toggle'); },
  //  formButtons: {
  //    '.modal-body input[name="form.button.Cancel"]': $.fn.ploneOverlay.defaultAjaxSubmit(),
  //    '.modal-body input[name="form.button.Save"]': $.fn.ploneOverlay.defaultAjaxSubmit()
  //  }
  //});

  // Edit form
  $('#plone-toolbar #plone-action-edit > a').ploneOverlay({
    events: {
      'click .modal-body input[name="form.button.cancel"]': {},
      'click .modal-body input[name="form.button.save"]': {}
    }
  });

  // Rules form
  $('#plone-toolbar #plone-action-contentrules > a').ploneOverlay({
  });

  // Sharing form
  $('#plone-toolbar #plone-action-local_roles > a').ploneOverlay({
    modalTemplate: function($modal) {
      // FIXME: we should hack like this
      $('#link-presentation', $modal).remove();
      return $modal;
    },
    ajaxSubmitOptions: {
      contentButtons: 'input[name="form.button.Save"],input[name="form.button.Cancel"]'
    },
    events: {
      'click .modal-body input[name="form.button.Search"]': {
        onSuccess: function(responseBody) {
          var self = this;
          self.$modal.html('');
          self.$modal.append($('> *', self.modalTemplate(responseBody)));
          self.initModalEvents(self.$modal);

          // patterns integration
          if (Patterns) {
            Patterns.initialize(self.$modal);
            $('[data-pattern~="tabs"] > li > a', self.$modal).on('shown', function() {
              self.resizeModal(self.$modal);
            });
          }
        }
      },
      'click .modal-body input[name="form.button.Cancel"]': {},
      'click .modal-body input[name="form.button.Save"]': {
        contentFilters: []
      }
    }
  });

  // Change content item as default view...
  $('#plone-toolbar #plone-contentmenu-display > ul > li#folderChangeDefaultPage > a').ploneOverlay({
    modalTemplate: function($modal) {
      // FIXME: we should hack like this
      $('form > dl', $modal).addClass('default-page-listing');
      $('input[name="form.button.Cancel"]', $modal).attr('class', 'standalone');
      return $modal;
    },
    events: {
      'click .modal-body input[name="form.button.Cancel"]': {},
      'click .modal-body input[name="form.button.Save"]': {
        onSuccess: function(responseBody, state, xhr) {
          window.parent.location.href = window.parent.location.href;
        }
      }
    }
  });

  // Add forms
  $('#plone-toolbar #plone-contentmenu-factories > ul > li > a').ploneOverlay({
    events: {
      'click .modal-body input[name="form.button.cancel"]': {},
      'click .modal-body input[name="form.button.save"]': {}
    }
  });

  // Advance workflow
  $('#plone-toolbar #plone-contentmenu-workflow > ul > li#workflow-transition-advanced > a').ploneOverlay({
    modalTemplate: function($modal) {
      // FIXME: we should hack like this
      $('#workflow_action', $modal).parent().find('> br').remove();
      return $modal;
    },
    events: {
      'click .modal-body input[name="form.button.Cancel"]': {},
      'click .modal-body input[name="form.button.Publish"]': {}
    }
  });


  // Site setup
  //$('#plone-toolbar #plone-personal-actions > ul > li#plone-personal-actions-plone_setup a').ploneOverlay({
  //  onShow: function() { $(this).patternToggle('toggle'); },
  //  onLoaded: function() {
  //    var overlay = this,
  //    el = overlay.el;
  //    el.find('a').on('click', function(e){
  //      el.load($(this).attr('href'));
  //      overlay._el = overlay.el = overlay.options.modalTemplate.apply(overlay, [ el ]).hide();
  //      e.stopPropagation();
  //      e.preventDefault();
  //    });
  //  }
  //});

});

}(window.jQuery, window.Patterns));

// This plugin is used to handle all clicks inside toolbar iframe.
//
// @author Rok Garbas
// @version 1.0
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
  regexp:true, undef:true, strict:true, trailing:true, browser:true */
/*global jQuery:false */


(function($) {
"use strict";

// # Namespace
//
// ensure proper namespaces
$.plone = $.plone || {};
$.plone.toolbar = $.plone.toolbar || {};

// # IFrame Object
//
// nicer way to create shortcut 
var iframe = $.plone.toolbar.iframe = window.parent.iframe[window.name];

// # Shrink IFrame Object
//
// Shrink current frame to the size that was before stretching it.
$.plone.toolbar.iframe_shrink = function() {
  var $el = $(iframe.el),
      iframe_state = $.plone.toolbar.iframe_state;
  if (iframe_state !== undefined) {
    $el.css(iframe_state);
    iframe_state = $.plone.toolbar.iframe_state = undefined;
  }
};

// # Stretch IFrame Object
//
// This function stretches current frame over whole top frame while keeping
// iframe object trasparent
$.plone.toolbar.iframe_stretch = function() {
  var $el = $(iframe.el),
      iframe_state = $.plone.toolbar.iframe_state;
  if (iframe_state === undefined) {
    iframe_state = $.plone.toolbar.iframe_state = {};
    iframe_state.height = $el.height();
    if ($el.css('position') === 'fixed') {
      // XXX: maybe we should get offset of parent here
      iframe_state.top = 0;
      iframe_state.left = 0;
    } else {
      var offset = $el.offset();
      iframe_state.top = offset.top;
      iframe_state.left = offset.left;
    }
    $el.css({
      height: $(window.parent.document).height(),
      top: 0,
      left: 0
    });
  }
};

// on every click we shrink iframe
$(document).on('click', function(e) {
  // in case of clicking on modal background or tinyMCE style dropdown we
  // shouldn't do anything
  if ($.nodeName(e.target, 'html')) {
    $.plone.toolbar.iframe_shrink();
  } else {
    if ($(e.target).parents('body').size() === 0 ||
        $(e.target).parents('.mceMenuItem').size() === 1 ||
        $(e.target).hasClass('modal-backdrop')) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      $.plone.toolbar.iframe_shrink();
    }
  }
});


// # Handle every click on every link inside current frame 
// 
// Currently script recognizes:
//  - twitter bootstrap dropdown
//  - ploneOverlay links
$('a').on('click', function(e) {

  // only handle left(1) and right(2) click
  if (e.which === 1 || e.which === 2) {
    var el = $(this);

    // since we'll be handling this link we prevent any default behaivour
    e.preventDefault();

    // if link has twitter bootstrap dropdown assigned to it then make sure 
    // current frame gets streched invisibly just in case dropdown goes over
    // the area of top frame.
    if (el.attr('data-toggle') === 'dropdown') {
      $.plone.toolbar.iframe_stretch();

    // TODO: rewrite 
    // if ploneOverlay is registered for currently clicked link then we make
    // sure that iframe is stretched before being open and shrank on closing
    // if none of above conditions is met then open link in top frame or new
    // window in case right button was used
    } else if (el.data('plone-overlay') === undefined) {
      if (e.which === 1) {
        window.parent.location.href = el.attr('href');
      } else {
        window.parent.open(el.attr('href'));
      }
    }
  }
});

}(jQuery));
/***
 * Copyright (c) 2014
 * Licensed under the MIT License.
 *
 * Author: César Latorre
 * Version: 1.0
 * Requires: jQuery 1.7.2+
 * Web: https://github.com/ceslat/Switched
 */
(function($){
	var methods = {
		init : function( options ) {

			var defaults = {
				labelOn: 'Yes',
				labelOff: 'No'
			}

			var options = $.extend(defaults, options);

			return this.each(function(silent) {
				if($(this).hasClass('checkSwitch')){
					console.log('The element (' + $(this) + ') was previously initialized.')
				}
				else{
					$(this).addClass('checkSwitch');
					if($(this).is(':checked')) {
						$(this).wrap('<div class="switched on">');
					}
					else {
						$(this).wrap('<div class="switched off">');
					}
					$(this).parent('div.switched').each(function() {
						$(this).append('<div class="switchedInner"><div class="switchedOn">' + options.labelOn + '</div><div class="switchedHandle"></div><div class="switchedOff">' + options.labelOff + '</div></div>');
					});
					$(document).on('click', 'div.switched', function() {
						if($(this).hasClass('off')) {
							$(this).addClass('on');
							$(this).removeClass('off');
							$(this).children('input.checkSwitch').prop('checked', true);
							$(this).children('input.checkSwitch').change();
						}
						else if($(this).hasClass('on')) {
							$(this).addClass('off');
							$(this).removeClass('on');
							$(this).children('input.checkSwitch').prop('checked', false);
							$(this).children('input.checkSwitch').change();
						}
					});
				}
			});
		},
		on : function(silent) {
			return this.each(function() {
				if($(this).hasClass('checkSwitch')){
					$(this).parent('div.switched').addClass('on');
					$(this).parent('div.switched').removeClass('off');
					$(this).prop('checked', true);
					$(this).change();
				}
				else{
					console.log('The element (' + $(this) + ') was not previously initialized.')
				}
			});
		},
		off : function(silent) {
			return this.each(function() {
				if($(this).hasClass('checkSwitch')){
					$(this).parent('div.switched').addClass('off');
					$(this).parent('div.switched').removeClass('on');
					$(this).prop('checked', false);
					$(this).change();
				}
				else{
					console.log('The element (' + $(this) + ') was not previously initialized.')
				}
			});
		},
		destroy : function(silent) {
			return this.each(function() {
				if($(this).hasClass('checkSwitch')){
					$(this).next('.switchedInner').remove();
					$(this).unwrap();
					$(this).removeClass('checkSwitch');
					$(this).prop('checked', false);
					$(this).change();
				}
				else{
					console.log('The element (' + $(this) + ') was not previously initialized.')
				}
			});
		}
	};

	$.fn.Switched = function( method ) {
		if ( methods[method] ) {
			return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		}
		else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		}
		else {
			$.error( 'This Method ' +  method + ' does not exit in jQuery.Switched' );
		}
	};
})(jQuery);

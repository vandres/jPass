/*global jQuery, window, document*/
/*jslint nomen: true, plusplus: true*/
(function ($) {
    'use strict';

    $.widget('va.jpass', {
        options: {
            maxValue: 20, // number of max value which gets calculated
            minCharacter: 4 // number of minimum character needed, before value gets calculated
        },

        _create: function () {
            this._parent = this.element.parent();

            this._on({
                'keyup': '_keyup'
            });
        },

        _init: function () {
            this._parent.addClass('jpass').addClass('jpass-0');
        },

        _keyup: function () {
            this.calculate();
        },

        _destroy: function () {
            this._removeClasses().removeClass('jpass');
        },

        _removeClasses: function () {
            var element = this._parent.get(0),
                classes = element.className.split(" ").filter(function (c) {
                    return c.lastIndexOf('jpass-', 0) !== 0;
                });
            element.className = $.trim(classes.join(" "));
            return this._parent;
        },

        calculate: function () {
            var password = this.element.val(),
                passwordLength = password.length,
                sum = 0,
                i = 0,
                characterCode = 0;

            for (i = 0; i < passwordLength; i++) {
                characterCode = password.charCodeAt(i) % 9;
                if (characterCode === 0) {
                    characterCode = 9;
                }

                if (sum + characterCode <= this.options.maxValue) {
                    sum += characterCode;
                } else {
                    sum = characterCode - (this.options.maxValue - sum);
                }
            }

            if (i < this.options.minCharacter) {
                sum = 0;
            }

            this._removeClasses().addClass('jpass-' + sum);
        }
    });
}(jQuery));

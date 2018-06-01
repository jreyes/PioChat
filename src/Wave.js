/**
 * jQuery Wave Text Effect
 */
const jQuery = require('jquery');

(function ($) {

  $.waveText = function (element, options) {
    let that = this;
    // default settings
    let defaults = {
      period: 0.35,
      letterSpacing: 20,
      amplitude: 10
    };
    that.settings = {};

    // initialization
    that.init = function () {
      that.settings = $.extend({}, defaults, options);
      that.splitToLetters($(element));
      that.doWave(that.settings);
    };

    // split to letters (insert span elements)
    that.splitToLetters = function (el) {
      let letters = el.text().split('');
      let content = '';
      for (let i = 0; i < letters.length; i++) {
        content += '<span>' + letters[i] + '</span>';
      }
      el.empty().append(content);
    };

    // main method
    that.doWave = function (options) {
      that.settings = $.extend({}, defaults, options);
      $(element).css({
        position: 'relative'
      });
      let deg = 0;
      let y = 0;
      let m = 0; // memory
      let i = 0;
      let css;
      $(element).children().each(function () {
        y = Math.round(Math.sin(that.settings.period * i) * that.settings.amplitude);
        if (y > m) {
          deg = that.settings.amplitude;
        } else {
          deg = -that.settings.amplitude;
        }
        if ((Math.abs(y) === that.settings.amplitude) || (i === 0)) deg = 0;
        m = y; // set memory
        css = {
          'position': 'absolute',
          'top': y + 'px',
          'left': (i * that.settings.letterSpacing) + 'px',
          '-webkit-transform': 'rotate(' + deg + 'deg)',
          '-moz-transform': 'rotate(' + deg + 'deg)',
          '-ms-transform': 'rotate(' + deg + 'deg)',
          '-o-transform': 'rotate(' + deg + 'deg)',
          'transform': 'rotate(' + deg + 'deg)'
        };
        $(this).css(css);
        i++;
      });
    }

    that.init(); // initialize
  }

  $.fn.waveText = function (options) {
    return this.each(function () {
      if (undefined === $(this).data('waveText')) {
        let plugin = new $.waveText(this, options);
        $(this).data('waveText', plugin);
      }
    });
  }

})(jQuery);
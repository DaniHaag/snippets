/**
* This is an example on how edit confluence pages in edit mode
* in this example blockquotes are wrapped with a macro to make sure it is not printed (macro: scroll-ignore)
*/

(function() {
    // Load the script
    var script = document.createElement("SCRIPT");
    script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js';
    script.type = 'text/javascript';
    script.onload = function() {
        var $ = window.jQuery;

      /** Start modification code here **/
      
      var html = '<table class="wysiwyg-macro" style="background-image: url(/confluence/plugins/servlet/confluence/placeholder/macro-heading?definition=e3Njcm9sbC1pZ25vcmV9&amp;locale=de_DE&amp;version=2); background-repeat: no-repeat;" data-macro-name="scroll-ignore" data-macro-body-type="RICH_TEXT" data-mce-style="background-image: url(\'https://sdlc-agile.swissbank.com/confluence/plugins/servlet/confluence/placeholder/macro-heading?definition=e3Njcm9sbC1pZ25vcmV9&amp;locale=de_DE&amp;version=2\'); background-repeat: no-repeat;"><tbody><tr><td class="wysiwyg-macro-body"></td></tr></tbody></table>';
      wrapper = $(html);
      $("blockquote").wrap(wrapper);

      /** End modification code here **/
    };
    document.getElementsByTagName("head")[0].appendChild(script);
})();


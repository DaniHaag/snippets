/**
* This example will move down the headers on the page h1=>h2, h2=>h3 ...
* 
* It is based on the jquery plugin changeElementType from: 
http://stackoverflow.com/questions/8584098/how-to-change-an-element-type-using-jquery
*/

(function() {
    // Load the script
    var script = document.createElement("SCRIPT");
    script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js';
    script.type = 'text/javascript';
    script.onload = function() {
        var $ = window.jQuery;

        (function($) {
            $.fn.changeElementType = function(newType) {
                var attrs = {};
                        if(this.length >0){
                $.each(this[0].attributes, function(idx, attr) {
                    attrs[attr.nodeName] = attr.nodeValue;
                });

                this.replaceWith(function() {
                    return $("<" + newType + "/>", attrs).append($(this).contents());
                });
                }
            };
        })(jQuery);
        
        for(var i = 8; i>0;i--) {
            var hi = $("h"+i);
            console.debug(hi,hi ? hi.length:null,"before");	
            if(hi && hi.length){
                hi.changeElementType("h"+ (i+1) );
                console.debug($("h"+ (i+1) ));
            }
        }
/*        $("h2").changeElementType("h3")
        $("h1").changeElementType("h2")
*/    };
    document.getElementsByTagName("head")[0].appendChild(script);
})();

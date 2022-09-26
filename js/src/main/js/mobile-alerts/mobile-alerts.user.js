// @match        https://measurements.mobile-alerts.eu/Home/SensorsOverview?phoneid=796749885278
// @grant GM_xmlhttpRequest
// @grant GM_getResourceText

// ==/UserScript==

(function() {
    'use strict';
    var script = document.createElement("script");
    script.setAttribute('src','https://rawgit.com/DaniHaag/snippets/master/js/src/main/js/mobile-alerts/webpage.js');
    document.head.appendChild(script)
})();

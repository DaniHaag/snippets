snippets
========

code snippets and links

dev tool links  
--------------

markdown cheatsheet https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet  
javascrip snippets  http://bgrins.github.io/devtools-snippets/|

Javascript snippets
--------------

encode unsafe text to be displaeyed as HTML
```javascript
var unsafeText ="<p>test</p>"
var div = document.createElement("div")
div.textContent = unsafeText;
var htmlEncodedString = div.innerHTML;
```

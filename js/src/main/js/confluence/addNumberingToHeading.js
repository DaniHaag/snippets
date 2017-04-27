/**
* This plugin allows to set the table of contents numbering and display this on the headings.
*  
* currently this only works when you have only one table of content
* how to use: 
* add html component
* * copy js to component
* * strip js comments arround script tags
*/

/*
<script type="text/javascript">
	AJS.toInit(function(){
*/
    var vals = {};
    AJS.$(".TOCOutline").each(function(idx,val){
        var $val = AJS.$(val);
        var id = $val.next("a").attr("href");
        id = id.substring(1, id.length);
        vals[id] = $val.text();
        // console.debug(idx,id, vals[id]);
    })
    AJS.$(":header'").each(function(idx,val){
        var $val = AJS.$(val);
        var id = $val.prop('id');
        var toc= vals[id];
        var newText =  toc +" " + $val.text() ;
        //console.debug("changed text",idx,"href", id, toc, "to text",newText, $val.text());
        if(toc){
        $val.text(newText);
        }

    })


/*
  });
</script>
*/

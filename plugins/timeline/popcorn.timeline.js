// PLUGIN: Timeline
(function (Popcorn) {

  /**
     * timeline popcorn plug-in
     * Adds data associated with a certain time in the video, which creates a scrolling view of each item as the video progresses
     * Options parameter will need a start, target, title, and text
     * -Start is the time that you want this plug-in to execute
     * -End is the time that you want this plug-in to stop executing, tho for this plugin an end time may not be needed ( optional )
     * -Target is the id of the DOM element that you want the map to appear in. This element must be in the DOM
     * -Title is the title of the current timeline box
     * -Text is text is simply related text that will be displayed
     * -innerHTML gives the user the option to add things such as links, buttons and so on
     * -direction specifies whether the timeline will grow from the top or the bottom, receives input as "UP" or "DOWN"
     * @param {Object} options
     *
     * Example:
      var p = Popcorn("#video")
        .timeline( {
         start: 5, // seconds
         target: "timeline",
         title: "Seneca",
         text: "Welcome to seneca",
         innerHTML: "Click this link <a href='http://www.google.ca'>Google</a>"
      } )
    *
  */

  var i = 1;
   
  //  Included simple css to make it look a bit nicer
  var head = document.getElementsByTagName( "head" )[ 0 ];
  var css = document.createElement( 'link' );
  css.type = "text/css";
  css.rel = "stylesheet";
  css.href = "popcorn.timeline.css";
  head.insertBefore( css, head.firstChild );


  Popcorn.plugin( "timeline" , function( options ) {

    var target = document.getElementById( options.target );
    target.style.width = "400px";
    target.style.height = "200px";
    target.style.overflow = "auto";

    // create a new div and append it to the parent div so nothing
    // that already exists in the parent div gets overwritten
    var newdiv = document.createElement( "div" );
    newdiv.style.display = "none";
    newdiv.id = "timelineDiv" + i;

    options.direction = ( options.direction.toLowerCase()  === "up" || options.direction.toLowerCase()  === "down" )
                      ? options.direction : "up";

    if ( target ) {

      target.appendChild( newdiv );

      // if this isnt the first div added to the target div
      if( i && options.direction.length === 2 ){
        // insert the current div before the previous div inserted
        target.insertBefore( newdiv, document.getElementById( "timelineDiv" + ( i - 1 ) ) );
      }

      target.scrollTop = options.direction.toLowerCase() === "down" ? 0 : target.scrollHeight;
    }
    
    i++;

    //  Default to empty if not used
    //options.innerHTML = options.innerHTML || "";    

    newdiv.innerHTML = "<p><span id='big'>" + options.title + "</span><br />" +
    "<span id='mid'>" + options.text + "</span><br />" + options.innerHTML;
    
    return {

      start: function( event, options ) {
        newdiv.style.display = "block";
      },
 
      end: function( event, options ) {
        newdiv.style.display = "none";
      },

      _teardown: function( options ) {
        while ( target.childNodes.length >= 1 ) {
            target.removeChild( document.getElementById( options.target ).firstChild );       
        }  
      }
    };
  },
  {

    about: {
      name: "Popcorn Timeline Plugin",
      version: "0.1",
      author: "David Seifried @dcseifried",
      website: "dseifried.wordpress.com"
    },

    options: {
      start :      { elem:"input", type:"text", label:"In" },
      end :        { elem:"input", type:"text", label:"Out" },
      target :     "feed-container",
      title :      { elem:"input", type:"text", label:"title" },
      text :       { elem:"input", type:"text", label:"text" },
      innerHTML:   { elem:"input", type:"text", label:"innerHTML" }
    }
  });
  
})( Popcorn );

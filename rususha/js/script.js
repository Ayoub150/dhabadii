(function (global) {

// Set up a namespace for our utility
var ajaxUtils = {};


// Returns an HTTP request object
function getRequestObject() {
  if (window.XMLHttpRequest) {
    return (new XMLHttpRequest());
  } 
  else if (window.ActiveXObject) {
    // For very old IE browsers (optional)
    return (new ActiveXObject("Microsoft.XMLHTTP"));
  } 
  else {
    global.alert("Ajax is not supported!");
    return(null); 
  }
}


// Makes an Ajax GET request to 'requestUrl'
ajaxUtils.sendGetRequest = 
function(requestUrl, responseHandler, isJsonResponse) {
  var request = getRequestObject();
  request.onreadystatechange = 
  function() { 
    handleResponse(request, 
     responseHandler,
     isJsonResponse); 
  };
  request.open("GET", requestUrl, true);
    request.send(null); // for POST only
  };


// Only calls user provided 'responseHandler'
// function if response is ready
// and not an error
function handleResponse(request,
  responseHandler,
  isJsonResponse) {
  if ((request.readyState == 4) &&
   (request.status == 200)) {

    // Default to isJsonResponse = true
  if (isJsonResponse == undefined) {
    isJsonResponse = true;
  }

  if (isJsonResponse) {
    responseHandler(JSON.parse(request.responseText));
  }
  else {
    responseHandler(request.responseText);
  }
}
}


// Expose utility to the global object
global.$ajaxUtils = ajaxUtils;


})(window);


$(function () { // Same as document.addEventListener("DOMContentLoaded"...

  // Same as document.querySelector(".nav-tuure").addEventListener("blur",...
  $(".nav-tuure").blur(function (event) {
    var screenWidth = window.innerWidth;
    if (screenWidth < 768) {
      $(".nav-celiye").collapse('hide');
    }
  });

  // In Firefox and Safari, the click event doesn't retain the focus
  // on the clicked button. Therefore, the blur event will not fire on
  // user clicking somewhere else in the page and the blur event handler
  // which is set up above will not be called.
  // Refer to issue #28 in the repo.
  // Solution: force focus on the element that the click event fired on
  $(".nav-tuure").click(function (event) {
    $(event.target).focus();
  });
});




(function (global) {

  var pp = {};

  pp.art1 = "snippets/single/art1.html"

  pp.art21 = "snippets/single/art21.html"

  pp.art22 = "snippets/single/art22.html"

  pp.art23 = "snippets/single/art23.html"

  pp.art31 = "snippets/single/art31.html"

  pp.art32 = "snippets/single/art32.html"

  pp.art41 = "snippets/single/art41.html"

  pp.art42 = "snippets/single/art42.html"

  pp.art43 = "snippets/single/art43.html"

  pp.articles = "snippets/articles.html"

  var homeHtml = "snippets/home.html";

// Convenience function for inserting innerHTML for 'select'
var insertHtml = function (selector, html) {
  var targetElem = document.querySelector(selector);
  targetElem.innerHTML = html;
};

// Show loading icon inside element identified by 'selector'.
var showLoading = function (selector) {
  var html = "<div class='text-center loading-icon'>";
  html += "<img src='images/ajax-loader.gif'></div>";
  insertHtml(selector, html);
};

// Remove the class 'active' from home or videos and switch to Articles button

var activeUbedelArticles = function () {
// Remove active from home button if its there

var classes = document.querySelector("#guri").className
if (classes.indexOf("active") !== -1) {
classes = classes.replace(new RegExp("active", "g"), "")
document.querySelector("#guri").className = classes
}

// Remove active from videos button if its there

var classes = document.querySelector("#videos").className
if (classes.indexOf("active") !== -1) {
classes = classes.replace(new RegExp("active", "g"), "")
document.querySelector("#videos").className = classes
}

// Add 'active' to Articles button if not already there

var classes = document.querySelector("#maqaallo").className 

if (classes.indexOf("active") == -1) {
  classes += " active"

  document.querySelector("#maqaallo").className = classes
}

}




// Remove the class 'active' from home or articles and switch to Videos button

var activeUbedelVideos = function () {
// Remove active from home button if its there

var classes = document.querySelector("#guri").className
if (classes.indexOf("active") !== -1) {
classes = classes.replace(new RegExp("active", "g"), "")
document.querySelector("#guri").className = classes
}

// Remove active from articles button if its there

var classes = document.querySelector("#maqaallo").className
if (classes.indexOf("active") !== -1) {
classes = classes.replace(new RegExp("active", "g"), "")
document.querySelector("#maqaallo").className = classes
}

// Add 'active' to Videos button if not already there

var classes = document.querySelector("#videos").className 
if (classes.indexOf("active") == -1) {
  classes += " active"

  document.querySelector("#videos").className = classes
}

}




// On page load (before images or CSS)
document.addEventListener("DOMContentLoaded", function (event) {

// On first load, show home view
showLoading("#main");
$ajaxUtils.sendGetRequest(
  homeHtml,
  function (responseText) {
    document.querySelector("#main")
    .innerHTML = responseText;
  },
  false);


pp.loadGaree = function (selector) { 
  if (selector == 1) {
    url = pp.art1
  }
  if (selector == 21) {
    url = pp.art21
  }
  if (selector == 22) {
    url = pp.art22
  }
  if (selector  == 23) {
    url = pp.art23
  }
  if (selector == 31) {
    url = pp.art31
  }

  if (selector == 32) {
    url = pp.art32
  }

  if (selector == 41) {
    url = pp.art41
  }

  if (selector == 42) {
    url = pp.art42
  }

  if (selector == 43) {
    url = pp.art43
  }

  if (selector == "articles") {
    url = pp.articles
  }


  showLoading("#main");
  $ajaxUtils.sendGetRequest(url, dhise,false);};


  dhise = function (responseText) {

    activeUbedelArticles();
    document.querySelector("#main")
    .innerHTML = responseText;
  }


pp.loadGareeVideos = function () {
  
  var url = "snippets/videos.html"

showLoading("#main");
 $ajaxUtils.sendGetRequest(url, dhiseVideos, false);};
 
 dhiseVideos = function (responseText) {
activeUbedelVideos()
    document.querySelector("#main")
      .innerHTML = responseText;
  }


});

global.$pp = pp;

})(window);

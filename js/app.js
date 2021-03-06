

$(document).ready(function() {

  var imgArray = [];
  var imgNumber = 0;

  var nextImage = function() {
    if (imgNumber < imgArray.length) {
      imgNumber++;
    } else {
      imgNumber = 1;
    }
    $("img").attr("src", imgArray[imgNumber]);
  };

  $("#reset").on("click", function() {
    imgArray = [];
    $("img").attr("src", "");
    clearInterval(imgInterval);
    $("#content").css("display", "none");
    $("#splash").show();
    $("#reset").css("display", "none");
    $("#searchterm").val('');
  });

    var searchFunction = function() {

    var searchString = document.forms["imageform"].elements["imagebox"].value;

    $.get('https://www.reddit.com/search.json', { //first parameter is url
      q: searchString             //second parameter is object
    }).done(function(data) {
      var results = data.data.children;
      results.forEach(function(item) {
        if (item.data.url.indexOf('.jpg') !== -1 || item.data.url.indexOf('.png') !== -1 || item.data.url.indexOf('.gifv') === 1 || item.data.url.indexOf('.tiff') !== -1 ) {
          imgArray.push(item.data.url);
        };
        imgInterval = setInterval(nextImage, 3000);
      });
      $("#content").css("display", "block");
      $("img").addClass("resultImg");
      $("img").attr("src", imgArray[0]);
      $("#splash").hide();
      $("#reset").css("display", "block");
      nextImage();
    });
  };   // End search function
  $("#searchbutton").on("click", searchFunction);
  $("#searchterm").focus();
});

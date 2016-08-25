function getQuote(cb) {
  $.getJSON("http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&callback=", function(a) {
    // You can only resize so much. Let's not.
    if (a[0].content.length > 225)
      return getQuote();
    $(".text").html(a[0].content);
    $(".author").html(a[0].title);
    
    cb();
  });
}

function setTweetUrl() {
  var quote = $(".text > p").text();
  var auth = $(".author").text();
  var url_base = "https://twitter.com/intent/tweet?text=";
  var text = encodeURIComponent('"' + quote + '" - ' + auth);

  $('.twt').attr('href', url_base + text);
}

$("button").click(function() {
  getQuote(setTweetUrl);
});

$(document).ready(function() {
  $.ajaxSetup({
    cache: false
  });
  getQuote(setTweetUrl);
})
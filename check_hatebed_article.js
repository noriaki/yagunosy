//
// coloring Hatena-Blue border color to article hatena bookmarked
// in gunosy.com/USERNAME/YYYY/MM/DD
//
(function($) {

var hatena_user_name = 'uchiuchiyama';

$.extend({
  get_params: function(url) {
    var vars = [], hash;
    if(url === undefined) { url = window.location.href; }
    var hashes = url.slice(url.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++) {
      hash = hashes[i].split('=');
      vars.push(hash[0]);
      vars[hash[0]] = hash[1];
    }
    return vars;
  },
  get_param: function(name, url) {
    return $.get_params(url)[name];
  }
});

$('h2').parent().each(function() {
  if(!$(this).is('a:link')) { return; }
  var self = this;
  $.ajax({
    url: "http://b.hatena.ne.jp/entry/jsonlite/",
    data: { url: decodeURIComponent($.get_param('url', $(this).attr('href'))) },
    dataType: "jsonp",
    type: "GET",
    success: function(obj,status,xhr) {
      if(obj === null) { return; }
      var users = $.map(obj.bookmarks, function(v,i) { return v.user; });
      if($.inArray(hatena_user_name, users) >= 0) {
        $(self).parents('article').css('outline', 'solid 2px #6192ce');
      }
    }
  });
});
})(jQuery);

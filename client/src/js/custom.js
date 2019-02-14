window.$ = window.jQuery = require('jquery');
$(document).ready(function(){
    $('.item-list').each(function(){
        var current = $(this);
        var anchor = current.find('a').first().attr('href');
        if(anchor){
          var wrapped = $(current.find('img')).wrap('<a href="' + anchor + '"></a>');
        }
    });

 $('#wiki_query').keypress(function (e) {
        WikipediaAPISearch();
        if (e.keyCode == 13)
            $('#submit-wiki').click();
    });

$('.suggestions').on( 'click'  , 'li' , function() {
    $("#wiki_query").val($(this).text());
    $('#submit-wiki') . trigger('click');
})
    function WikipediaAPISearch() {
        var txt = $("#wiki_query").val();
        $.ajax({
            type: "GET",
            url: "http://en.wikipedia.org/w/api.php?action=opensearch&search=" + txt + "&callback=?",
            contentType: "application/json; charset=utf-8",
            async: false,
            dataType: "json",
            success: function (data, textStatus, jqXHR) {              
                //console.log(JSON.parse(data[1]));
                $('ul.suggestions').html('');
                $.each(data[1], function (i, item) {
                        var searchData = item;
                        $('ul.suggestions').append("<li>" +item+"</li>")
                        console.log(searchData);
                       // WikipediaAPIGetContent(searchData);
                });
            },
            error: function (errorMessage) {
                console.log(errorMessage);
            }
        });
    }

    $('button.menu') . click( () =>{
        $(this).addClass('active');
        $("div[class$= -menu]").hide();
    })
    $("#upcoming" ). click(function(){
        $('.upcoming-menu').toggle();
    })
    $("#trending" ). click(function(){
        $('.trending-menu').toggle();
    })
})


function searchdivClick(n) {
    var i = n.target, r = i.id, t;
    r == "searchdiv" && (t = $("#searchdiv"), t.fadeOut(), t.find(".search_slide").animate({marginTop: "-250px"}))
}
function preventDefault(n) {
    n.preventDefault()
}
function loadSearchDiv() {
    var i = $("#cycle2013"), t = $(".main:first"), n = '<div style="position: fixed; bottom: 0px; left: 0px; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.6); z-index: 9999; display: none" id="searchdiv" onclick="searchdivClick(event)" ontouchmove="preventDefault(event);">{0}</div></div>';
    i.length !== 0 ? (n = n.replace("{0}", '<div class="search_slide">' + i.parents(".search_slide").html() + "</div>"), t.length > 0 ? t.append(n) : $("body").append(n), showSearchDiv(), slideSerch(), inputFocus()) : $.get("/m/SerchControl", function(i) {
        n = n.replace("{0}", i), t.length > 0 ? t.append(n) : $("body").append(n), showSearchDiv(), slideSerch(), inputFocus()
    })
}
function showSearchDiv() {
    var n = $("#searchdiv");
    n.fadeIn(), n.find(".search_slide").css("margin-top", "-250px").animate({marginTop: "0px"})
}
function slideSerch() {
    var n = $("#searchdiv");
    n.find(".slides_control").vcycle({activePagerClass: "con",pager: n.find(".mark"),speed: 500})
}
function inputFocus() {
    $(".text_info_se").bind("focus", function() {
        $(this).parents(".search_slide").find(".slides_control").vcycle("pause"), $(this).parents("#searchdiv .search_eject").animate({bottom: "70px"}, 250)
    }).bind("blur", function() {
        $(this).parents(".search_slide").find(".slides_control").vcycle("resume");
        var n = $(this);
        setTimeout(function() {
            n.parents("#searchdiv .search_eject").animate({bottom: "12px"}, 250)
        }, 300)
    })
}
$(function() {
    $(".nav05").live("click", function() {
        $("#searchdiv").length == 0 ? loadSearchDiv() : showSearchDiv()
    }), $(".search_s_con>.slides_control").first().attr("id", "cycle2013"), $("#cycle2013").vcycle({activePagerClass: "con",pager: $("#cycle2013").parent().next(),speed: 500})
})

var abs_width;
var height;
var door_width;

function clamp(num, min, max) {
  return num <= min ? min : num >= max ? max : num;
}

var updateSizes = function() {
    abs_width = $(window).width();
    height = $(window).height();
    door_width = height*(400/600);
    $(".door").each(function(){
        var template = "https://via.placeholder.com/";
        this.src = template + door_width + "x" + height;
    });
    
    extra_space = (abs_width-(door_width*2));
    
    /*$(".wood").each(function() {
        var template = "https://via.placeholder.com/";
        this.src = template + extra_space/2 + "x" + height;
    });*/
    
    $(".wood").css("width",extra_space/2);
    $(".wood").css("height",height);
    
    $(".wood-right").css("left",(extra_space/2)+(door_width*2));
    
    $(".door-right").css("left",(extra_space/2)+door_width);
    $(".door-left").css("left",extra_space/2);
    
    // Starting Header
    var header_width = $(".start-header").width();
    var header_height = $(".start-header").height();
    $(".start-header").css("left",abs_width/2-header_width/2);
    
    $(".start-header").css("top",height/2-header_height*3);
}

$(document).ready(function() {
    updateSizes();
    
    //$(".header-one").css("left",abs_width + "px");
});

$(window).resize(updateSizes);

$(window).scroll(function() {
    var scrollPercent = 100 * $(window).scrollTop() / ($(document).height() - $(window).height());
    
    // Elevator Doors Opening
    var doorPercent = clamp(scrollPercent,0,20)/20;
    $(".door-left").css("transform","translate(" + door_width*doorPercent*-1 + "px,0)");
    
    $(".door-right").css("transform","translate(" + door_width*doorPercent + "px,0)");
    
    // Start header flying out
    var mainHeaderPercent = (clamp(scrollPercent,3,20)-3)/20;
    $(".start-header").css("transform","translate(0," + height*mainHeaderPercent*-1 + "px)");
});
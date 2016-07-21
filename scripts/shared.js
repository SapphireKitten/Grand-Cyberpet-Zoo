$(function() {
    var margin = ($("body").height() - 813) / 2;
    var marginS = margin + "px";
    $("#game-screen").css("margin-top", margin + "px");
    $("#content").css("margin-top", margin + "px");
    var initLeft = parseInt($("#game-screen").css("marginLeft"), 10);
    $("#content").css('left', initLeft + 'px');
    var left = initLeft;

    $('.pet').on("click", function() {
        window.open(this.value);
    });

    function generateContent() {
        $("#content").append($("<img></img>").attr("src", "resources/backgrounds/zoo-cafe.jpg"));
    }

    generateContent();

    $("body").keydown(function(e) {
        if(e.keyCode == 37) { // left
            if(left < initLeft + 36) {
                left += 2;
                $("#content").css('left', left + 'px');
            }
        }
        else if(e.keyCode == 39) { // right
            if(left > initLeft + -95) {
                left -= 2;
                $("#content").css('left', left + 'px');
            }
        }
    });
});
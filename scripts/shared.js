$(function() {
    var left = 0;

    $('.pet').on("click", function() {
        window.open(this.value);
    });

    function generateContent() {
        $("#content").append($("<img></img>").attr("src", "resources/backgrounds/zoo-cafe.jpg"));
    }

    generateContent();

    $("body").keydown(function(e) {
        if(e.keyCode == 37) { // left
            if(left < 36) {
                left += 2;
                $("#content").css('left', left + 'px');
            }
        }
        else if(e.keyCode == 39) { // right
            if(left > -95) {
                left -= 2;
                $("#content").css('left', left + 'px');
            }
        }
    });
});
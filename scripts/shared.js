$(function() {

    var margin = ($("body").height() - 813) / 2;
    var marginS = margin + "px";
    //$("#game-screen").css("margin-top", margin + "px");
    //$("#content").css("margin-top", margin + "px");
    var initLeft = -150;
    var minLeft = -4;
    var contentWidth = 1276;
    var screenLeft = parseInt($("#game-screen").css("marginLeft"), 10);
    if(screenLeft < 0) {
        screenLeft = 0;
    }
    var contentLeft = initLeft + screenLeft;
    $("#content").css('left', contentLeft + 'px');
    var left = initLeft;

    $(window).resize(resizeScreen);

    function resizeMenuBar(newLeft) {
        if(newLeft <= 0) {
            var menuLeft = $(window).width() - 6;
            $("#menu-bar").css('width', menuLeft + 'px');
            $("#menu-bar").css('left', '0px');
        } else {
            var menuLeft = $(window).width() - 2 * newLeft - 6;
            $("#menu-bar").css('width', menuLeft + 'px');
            $("#menu-bar").css('left', newLeft + 'px');
        }
    }

    resizeMenuBar(screenLeft);

    function resizeScreen() {
        var margin = ($("body").height() - 813) / 2;
        var marginS = margin + "px";
        screenLeft = parseInt($("#game-screen").css("marginLeft"), 10);
        if(screenLeft < 0) {
            screenLeft = 0;
        }
        var newLeft = screenLeft + left;
        $("#content").css('left', newLeft + 'px');
        resizeMenuBar(screenLeft);
        //$("#game-screen").css("margin-top", margin + "px");
        //$("#content").css("margin-top", margin + "px");
    }

    var TextHandler = {
        inConversation: false,
        _questionAnswered: false,
        _answer: "",
        printConversation: function (dialogueTree) {
            this.inConversation = true;
            var current_line = 0;
            while(current_line < dialogueTree.length) {
                var current_step = dialogueTree[current_line];
                if(undefined !== current_step.question) {
                    this._questionAnswered = false;
                    displayQuestionAndAnswers(current_step.question, current_step.answers);
                    while(!this._questionAnswered) {
                        continue;
                    }
                    displayText(current_step.question);

                }
            }
        },
        displayText: function (text) {

        },
        displayQuestionAndAnswers: function(question, answers) {
            this.displayText(question);
        }

    }

    var inConversation = false;

    
    var printConversation = function (dialogueTree, index) {
        inConversation = true;
        var textAndNext = dialogueTree[index];
        var text = textAndNext.m;
        var max = text.length - 1;
        var clicks = 0;
        document.addEventListener("click", function(e) {
            $("#menu-text").text(text[clicks]);
            clicks++;
            if(clicks >= max) {
                e.target.removeEventListener(e.type, arguments.callee);
                inConversation = false;
            }
        });
    }
    
    var handlePetDialogue = function (petName, dialogueTree) {
        $("#menu-name").text(petName);
        printConversation(dialogueTree, 0);
        
    }

    var handleDialogue = function (petClass) {
        if(!PET_DATA) {
            alert("error! no data");
        }
        var pet = PET_DATA[petClass];
        if(!pet) {
            alert("error! no pet");
        }
        switch(pet.type) {
            case "pet":
                handlePetDialogue(pet.name, pet.tree);
                break;
            default:
                break;
        }
    };
    
    //Click listener for pet dialogue
    $('.pet').on("click", function() {
        if(inConversation) {
            return;
        }
        var className = $(this).attr("class");
        var petSpec = className.substring(className.indexOf(" ") + 1);
        //alert(petSpec);
        handleDialogue(petSpec);
    });

    //Scrolling screen back and forth
    $("body").keydown(function(e) {
        if(e.keyCode == 37) { // left
            if(left < minLeft) {
                left += 2;
                $("#content").css('left', (left + screenLeft) + 'px');
            }
        }
        else if(e.keyCode == 39) { // right
            var windowWidth = $("body").width();
            var maxRight = windowWidth -  2 * screenLeft;
            if(left > maxRight - contentWidth) {
                left -= 2;
                $("#content").css('left', (left + screenLeft) + 'px');
            }
        }
    });

});
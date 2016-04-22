Zepto(function($) {
    var controlBtn = {
        video: $(".playbox video").get(0),
        full: $(".play-icon"),
        noFull: $(".noFullBtn"),
        thumb: $(".thumb"),
        tracker:$(".tracker"),
        dot: $(".dot")
    };
    var draggable=["dot"];
    videoControls(controlBtn);
    drag();
});

function videoControls(controlBtn) {
    setInterval(function() {
        var playPrecentage = controlBtn.video.currentTime/controlBtn.video.duration.toFixed(0);
    	controlBtn.thumb.width(playPrecentage*controlBtn.tracker.width());
        $(".current-time").text(timeFormat(controlBtn.video.currentTime));
        $(".total-time").text(timeFormat(controlBtn.video.duration));

    }, 1000);
    $("video").on("click", function(e) {
        if (!$(".playbox").hasClass("playing")) {
            controlBtn.video.play();
            $(".playbox").addClass("playing");
        } else {
            controlBtn.video.pause();
            $(".playbox").removeClass("playing");
        }
    });
    controlBtn.noFull.on("click", function(e) {
        controlBtn.video.pause();
        $(".playbox").removeClass("playing");
        $(".control-bar").addClass("hide");
        controlBtn.full.removeClass("hide");
        if (document.cancelFullscreen) {
            document.cancelFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        }
    });
    controlBtn.full.on("click", function(e) {
        $(".playbox").addClass("playing");
        controlBtn.video.play();
        controlBtn.full.addClass("hide");
        $(".control-bar").removeClass("hide");
        if (controlBtn.video.requestFullscreen) {
            controlBtn.video.requestFullScreen();
        } else if (controlBtn.video.mozRequestFullScreen) {
            controlBtn.video.mozRequestFullScreen();
        } else if (controlBtn.video.webkitRequestFullscreen) {
            controlBtn.video.webkitRequestFullScreen();
        }
    });
    
}

function timeFormat(num) {
    if (num === 0) {
        return "00:00";
    } else {
        var hour = Math.floor(num / 3600) < 10 ? "0" + Math.floor(num / 3600) : "" + Math.floor(num / 3600)
        var minute = Math.floor(num / 60) < 10 ? "0" + Math.floor(num / 60) : "" + Math.floor(num / 60);
        var second = Math.floor(num % 60) < 10 ? "0" + Math.floor(num % 60) : "" + Math.floor(num % 60);
        if (hour !== "00") {
            return hour + ":" + minute + ":" + second;
        } else {
            return minute + ":" + second;
        }
    }
};

function getEvent() {
    return event ? event : window.event;
}

function drag() {
    var draggable=["dot"];
    var dragging = null;
    function handleEvents() {
        event = getEvent();
        var target = event.target ? event.target : event.srcElement;
        switch (event.type) {
            case "mousedown":
            	if(target.className.indexOf(draggable)>-1)
            	{
                	dragging = target;
                	console.log(dragging);
            	}
                break;
            case "mousemove":
                console.log("mousemove");
            	console.log(dragging);
                if (dragging!==null) {
                    console.log(dragging.style.left);
                    dragging.style.left = event.clientX + "px";
                }
                break;
            case "mouseup":
            	dragging=null;
            	console.log("mouseup");
            	break;
        }
    };
    $(document).on("mousedown", handleEvents);
    $(document).on("mousemove", handleEvents);
    $(document).on("mouseup", handleEvents);


}

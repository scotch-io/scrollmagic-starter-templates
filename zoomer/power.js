/*===================================
=            GLOBAL VARS            =
===================================*/
var scrollMagicIsDestroyed = false;
var scrollMagicController = new ScrollMagic({
    globalSceneOptions: {
        triggerHook: 'onLeave'
    }
});




/*=================================
=            DOM READY            =
=================================*/
$(function() {

    $('#site-nav a').click(function(){
        $('html, body').animate({
            scrollTop: $( $.attr(this, 'href') ).offset().top - 100
        }, 500);
        return false;
    });

    // Only if not IE, not touch, and not mobile
    if ($(window).width() > 768 && !is_touch_device() && !is_ie()) {
        createScrollMagic();
    } else {
        $('body').addClass('no-scroll-magic');
    }
});




/*===================================
=            WINDOW LOAD            =
===================================*/
$(window).load(function() {
    $('body').addClass('show-site');
});




/*=====================================
=            WINDOW RESIZE            =
=====================================*/
$(window).resize(function() {

    // Kill for small screens
    if ($(window).width() <= 768 && !scrollMagicIsDestroyed) {
        destroyScrollMagic();
        scrollMagicIsDestroyed = true;
        $('body').addClass('no-scroll-magic');
    }

    // Force better DOM repainting hack. Helps on mobile
    $('html').addClass('force-gpu').removeClass('force-gpu');
});



/*========================================
=            CUSTOM FUNCTIONS            =
========================================*/
function createScrollMagic() {
    // Zoom Stuff
    var zoomTween = TweenMax.fromTo('.zoomed-action', 1,
        {
            scale: 5,
            z: 1 /* Force 3D aka use of GPU */
        },
        {
            scale: 1,
            z: 1
        }
    );
    var zoomScene = new ScrollScene({
        triggerElement: '#call-to-action',
        duration: 1500, /* distance of zoom scroll */
        offset: 0
    })
    .addTo(scrollMagicController)
    .setTween(zoomTween)
    .setPin('#call-to-action')
    .on('progress', function(e) {
        if (e.progress * 100 >= 90) {
            $('body').addClass('show-nav');
        } else {
            $('body').removeClass('show-nav');
        }
    });

    // Call to Action Text Stuff
    var ctaTextTween = TweenMax.fromTo('#call-to-action h1', 1,
        {
            scale: 1,
            x: '-50%',
            y: '-100%',
            opacity: 1
        },
        {
            scale: 0.85,
            x: '-50%',
            y: '-100%',
            opacity: 0
        }
    );
    var ctaTextScene = new ScrollScene({
        triggerElement: '#call-to-action',
        duration: 200,
        offset: 0
    })
    .addTo(scrollMagicController)
    .setTween(ctaTextTween);



    $('.info-group').each(function() {
        var infoGroupTween = TweenMax.fromTo('#'+$(this).attr('id')+' img.tall', 1,
            {
                y: 0
            },
            {
                y: -150
            }
        );

        var infoScene = new ScrollScene({
            triggerElement: '#'+$(this).attr('id'),
            duration: $(this).height() / 2.5,
            offset: -150
        })
        .addTo(scrollMagicController)
        .setTween(infoGroupTween)
        .setPin('#'+$(this).attr('id')+' img.tall');
    });
}

function destroyScrollMagic() {
    scrollMagicController.destroy(true)
    scrollMagicController = null;
    $('*').removeAttr('style');
}


function is_touch_device() {
    return 'ontouchstart' in window || 'onmsgesturechange' in window;
};

function is_ie() {
    // Disable for IE
    var ua = window.navigator.userAgent;
    var old_ie = ua.indexOf('MSIE ');
    var new_ie = ua.indexOf('Trident/');

    if ((old_ie > -1) || (new_ie > -1)) {
        return true;
    }
}
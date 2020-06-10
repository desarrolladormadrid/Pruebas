$(function () {
    $('a.back', this).click(function () {
        return jQuery("#bg").scroller("scrollIt", -1, 'nop');
    });

    $('a.forward', this).click(function () {
        return jQuery("#bg").scroller("scrollIt", +1, 'nop');
    });

    $(this).bind('goto', function (event, page) {
        return jQuery("#bg").scroller("scrollIt", page, 'nop');
    });
    //Assign handlers to the simple direction handlers.
    var swipeOptions = {
        swipe: swipe,
        threshold: 100
    }
    $("#slider").swipe(swipeOptions);

    function swipe(event, direction) {
        if (direction == "left") {
            return jQuery("#bg").scroller("scrollIt", +1, 'nop');
        } else if (direction == "right") {
            return jQuery("#bg").scroller("scrollIt", -1, 'nop');
        }
    }
    $items = jQuery('.scrollthumb-carousel li'), $('#carousel').thumbslide({
        imageW: 100,
        onClick: function ($item) {

            anim = true;
            // on click show image
            jQuery("#bg").scroller("scrollIt", 'nop', $item.index());
            // change current
            current = $item.index();
            $items.removeClass('selectedthumb');
            $item.addClass('selectedthumb');
        }

    });
	$(window).resize(function() {
  		$('#bg #youtube').width(jQuery('#bg').width());
		$('#bg #youtube').height(jQuery('#bg').height());
	});
	
	$('#cat-tray a').click(function() {
		$('#cat-tray a').removeClass('active');
		$(this).addClass('active');
		if ($(this).text() == 'All') {
			$('#thumb-tray #carousel li').show();
		}
		else {
			$('#thumb-tray #carousel li').hide();
			$('#thumb-tray #carousel li.' + $(this).text()).show();
		}
		 $items = jQuery('.scrollthumb-carousel li'), $('#carousel').thumbslide({
		        imageW: 100,
		        onClick: function ($item) {

		            anim = true;
		            // on click show image
		            jQuery("#bg").scroller("scrollIt", 'nop', $item.index());
		            // change current
		            current = $item.index();
		            $items.removeClass('selectedthumb');
		            $item.addClass('selectedthumb');
		        }

		    });
		return false;
	});
});
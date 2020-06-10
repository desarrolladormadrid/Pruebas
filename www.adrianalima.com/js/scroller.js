//**************************************************************************************
//CREATED BY           	:   ABHIJITH BABU
//EMAIL ID             	:   ABHIJITHBABU@GMAIL.COM
//DATE                  :   12 MARCH 2012
//DESCRIPTION 			: 	SCROLLER JQUERY PLUGIN
//**************************************************************************************
(function ($) {

    var methods = {
        pageMoved: 0,
        currentPage: 0,
        completedit: 1,
        totalshown: 0,
        bgwidth: 6000,
        initWidth: 0,
        initHeight: 0,
        gotPage: 0,
        gotThumb: 0,
        gotCallback: '',
        currentThumb: 0,
        init: function (options) {
            methods.elem = $(this);
            methods.options = $.extend(this.options, options);
        },
        _initscroller: function () {

            $(window).bind('resize.scroller', function (event) {
                methods.resetscroller();
                $('#bg').stop().animate({
                    'scrollLeft': '0'
                }, 100, 'easeOutSine', function () {
                    if (methods.gotThumb == 'nop' && methods.gotThumb != '0') {
                        $('#bg ul li').children(':first-child').removeClass('animated');
                        methods.scrollIt('nop', methods.currentThumb);
                    } else {
                        $('#bg ul li').children(':first-child').removeClass('animated');
                        methods.scrollIt(methods.gotPage, methods.gotThumb, methods.gotCallback);
                    }

                });
            });

        },
        options: {

        },
        resetscroller: function () {
            methods.pageMoved = 0;
            methods.currentPage = 0;
            methods.completedit = 1;
        },
        scrollIt: function (page, thumbclicked, callback) {
			//console.log(page+"-" +thumbclicked+"-"+ callback+"-"+methods.currentPage);
            methods.gotPage = page;
            methods.gotThumb = thumbclicked;
            methods.gotCallback = callback;
            methods._initscroller();
			// insert a delay if previous not completed , no idea it will work just a crazy thought from abhi
            if (methods.completedit == 0) {
				/*if ( this.console ) {
					console.log('notcompleted called');
				}*/
				setTimeout(function() {methods.scrollIt(page, thumbclicked, callback);},1250);
				return;
            }
            
           
			$('#bg li > .iframediv').width(jQuery('#bg').width());
            $('#bg li > .iframediv').height(jQuery('#bg').height());
			var isiPad = navigator.userAgent.match(/iPad/i) != null;
			var ua = navigator.userAgent;
			var isiPad = /iPad/i.test(ua) || /iPhone OS 3_1_2/i.test(ua) || /iPhone OS 3_2_2/i.test(ua);
			if(isiPad){
			  $('#bg li .iframediv > iframe').width(jQuery('#bg').width()*75/100);
			  $('#bg li .iframediv > iframe').height(jQuery('#bg').height()*75/100);
			}
            var wrapper = jQuery('#bg');
            var selector = jQuery('#bg ul li').children(':first-child');


            if (thumbclicked == 'nop' && thumbclicked != '0') {
                if (page > 0) {
                    var single = selector.not(".animated").eq(0);
                    var alltobeshown = selector.not(".animated");
                    var checkvalue = 1;
                } else {
                    var single = selector.filter(".animated").filter(':last');
                    var alltobeshown = selector.filter(".animated");
                    var checkvalue = 0;
                }
            } else {
                if (thumbclicked > methods.currentPage) {
                    index = thumbclicked + 1;
                    previmage = thumbclicked;
                    tobesliced = methods.currentPage;
                    jQuery("#bg ul li:lt(" + previmage + ")").children(':first-child').addClass('animated');
                    var single = selector.not(".animated").eq(0);
                    var alltobeshown = selector.not(".animated");
                    var checkvalue = 0;
                    var accum_width = 0;
                    selector.slice(tobesliced).filter(".animated").each(function () {
                        accum_width += $(this).outerWidth();
                    });
                } else {
					if(thumbclicked!="0"){
						index = thumbclicked + 1;
						previmage = thumbclicked + 1;
						jQuery("#bg ul li:gt(" + previmage + ")").children(':first-child').removeClass('animated');
						var single = selector.filter(".animated").filter(':last');
						var alltobeshown = selector.filter(".animated");
						var checkvalue = 1;
						var accum_width = 0;
						selector.slice(thumbclicked, methods.currentPage).each(function () {
							accum_width += $(this).outerWidth();
						});
					}else{
						index = thumbclicked + 1;
						previmage = thumbclicked + 1;
						jQuery("#bg ul li:gt(" + previmage + ")").children(':first-child').removeClass('animated');
						var single = selector.filter(".animated").filter(':last');
						var alltobeshown = selector.filter(".animated");
						var checkvalue = 0;
						var accum_width = 0;
						selector.slice(thumbclicked, methods.currentPage).each(function () {
							accum_width += $(this).outerWidth();
						});
					}
                }
            }
            if (thumbclicked == 'nop' && thumbclicked != '0') {
                if (page > 0) {
                    methods.totalshown = methods.totalshown + jQuery('#bg').innerWidth();
                    if ((methods.totalshown+Math.round(jQuery(window).width())) > methods.bgwidth) {
                        jQuery('#bg ul').css({
                            width: "+=9000px"
                        });
                        methods.bgwidth = methods.bgwidth + 6000;

                    }
                }
            } else {
                methods.totalshown = methods.totalshown + jQuery('#bg').innerWidth();
                if ((accum_width+Math.round(jQuery(window).width())) > methods.bgwidth) {
                    jQuery('#bg ul').css({
                        width: "+=9000px"
                    });
                    methods.bgwidth = methods.bgwidth + 6000;

                }

            }
            if (alltobeshown.length > checkvalue) {
				methods.completedit = 0;
                var dir = page < 0 ? -1 : +1;
                if (thumbclicked == 'nop' && thumbclicked != '0') {
                    var dir = page < 0 ? -1 : +1;
                    left = single.outerWidth() * dir;
                } else {
                    if (thumbclicked > methods.currentPage) {
                        left = (accum_width * dir);

                    } else {

                        left = -(accum_width * dir);
                    }
                }
                $('#bg').stop().animate({
                    'scrollLeft': '+=' + left
                }, 1000, 'easeOutSine', function () {
                    if (single.not('.animated')) {

                        if (page > 0) {
                            single.addClass('animated');
                        } else {
                            single.removeClass('animated');
                        }


                    }
                    methods.completedit = 1;

                });


                if (thumbclicked == 'nop' && thumbclicked != '0') {
                    methods.currentPage = methods.currentPage + page;

                } else {
                    methods.currentPage = thumbclicked;
                }

                var selected = methods.currentPage + 1;
                $('.scrollthumb-carousel li').removeClass('selectedthumb');
                $(".scrollthumb-carousel li:nth-child(" + selected + ")").addClass('selectedthumb');
                methods.currentThumb = methods.currentPage;
                if (ytState == 1 && ytCurrent != undefined) {
                	ytCurrent.pauseVideo();
                }
                if (callback) {
                    callback(selected);
                }
            }

        },
    };
    $.fn.scroller = function (method) {
        // Method calling logic
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on Scroller');
        }

    };
})(jQuery);
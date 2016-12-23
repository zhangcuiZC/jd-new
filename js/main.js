$(function(){
	// jQuery.support.transition
	// to verify that CSS3 transition is supported (or any of its browser-specific implementations)
	$.support.transition = (function(){ 
	    var thisBody = document.body || document.documentElement,
	    thisStyle = thisBody.style,
	    support = thisStyle.transition !== undefined || thisStyle.WebkitTransition !== undefined || thisStyle.MozTransition !== undefined || thisStyle.MsTransition !== undefined || thisStyle.OTransition !== undefined;
	                   
	    return support; 
	})();
	var issupporttranstion=$.support.transition;
	if(issupporttranstion){
		$("html").addClass('supporttranstion');
	}

	// slideshow start
	//need slideshow-fadein.js
	slideshow(5000,"#f10215");

	// // second kill img animation
	$(".seckill-content li:lt(5)").addClass('moveup');

	// // find img animation
	$(".findbrandrank-list-find-content-list li").addClass('moveleft');

	// // brand im animation
	$(".findbrandrank-list-brand-content-list li").addClass('moveleft');

	// //ticket center animation
	$(".ticketcenter-right li").addClass('moveright');

	// // enjoy quality animation
	// $(".enjoyquality-list li").addClass('moveleft');

	// // love life animation
	// $(".lovelife-list-content a").addClass('moveleft');

	// img lazy load
	// $(".imglazyload img").lazyload({
	// 	effect:"show",
	// 	failure_limit:25,
	// 	data_attribute:'src'
	// });

	// rank tab
	(function(){
		var tabnav=$(".findbrandrank-list-rank-nav li:even");
		var tabcontent=$(".tabcontent");
		tabnav.hover(function() {
			$(this).addClass('active').siblings().removeClass('active');
			var idx=tabnav.index(this);
			var imgs=tabcontent.find('img');
			tabcontent.eq(idx).show().siblings('.tabcontent').hide();
			imgs.each(function() {
				$(this).attr('src', $(this).attr('data-src'));
			});
		});
	})();

	//news tab
	(function(){
		var newstabnav=$(".mainpage-quickentry-news-title li");
		var newstabcontent=$(".mainpage-quickentry-news-content ul");
		newstabnav.hover(function() {
			$(this).find('span').addClass('active').parent().siblings().find('span').removeClass('active');
			var idx=newstabnav.index(this);
			newstabcontent.eq(idx).show().siblings().hide();
		});
	})();

	//detail class
	(function(){
		var detaillist=$(".mainpage-class-list li");
		var detaildivlist=$(".mainpage-class-detail");
		var listidx,divhide,htmlobj,detailurl,detailclass,content;
		detaillist.hover(function() {
			clearTimeout(divhide);
			listidx=detaillist.index(this);
			detailurl="loadtable/detailclass-"+(listidx+1)+".html";
			detailclass="mainpage-class-detail"+(listidx+1);
			detaildivlist.eq(listidx).show().siblings('.mainpage-class-detail').hide();
			content=detaildivlist.eq(listidx).text();
			if (content=="") {
				detaildivlist.eq(listidx).load(detailurl);
			}
		}, function() {
			divhide=setTimeout(function(){
				detaildivlist.eq(listidx).hide();
			},100);
		});

		detaildivlist.hover(function() {
			clearTimeout(divhide);
			detaildivlist.eq(listidx).show();
		}, function() {
			detaildivlist.hide();
		});
	})();

	//small img slide
	//need jquery.smimgslide.js
	$(".lovelife-list-smimg").each(function() {
		$(this).smimgslide();
	});

	//header-searchbarfixed/sidebar-leftfixed show and hide
	(function(){
		var nolock=true;
		var nolockleft=true;
		var changebgtimer=null;
		$(window).scroll(function() {
			//header-searchbarfixed
			if($(".seckill").offset().top-$(window).scrollTop()<=0){
				if (nolock) {
					$(".header-searchbarfixed").stop().animate({top:0}, "normal");
				}
				nolock=false;
			}else{
				$(".header-searchbarfixed").css('top', '-70px');
				nolock=true;
			}
			//sidebar-leftfixed
			if($(".showsidebarleft").offset().top-$(window).scrollTop()<=0.5*$(window).height()){
				if (nolockleft) {
					$(".sidebar-leftfixed").stop(true,true).fadeIn().css('left', 0.5*$(window).width()-660);
					$(".sidebar-leftfixed .toenjoyquality").addClass('active').siblings('li').removeClass('active');
				}
				nolockleft=false;
			}else{
				$(".sidebar-leftfixed").stop().fadeOut(200,function(){
					$(this).find('li').removeClass('active');
				});
				nolockleft=true;
			}

			//change sidebarfixed bgc when srcoll,use function throttle
			$(".sidebarpointer").each(function() {
				var pointer=$(this);
				if (pointer.offset().top-$(window).scrollTop()<=0.5*$(window).height()) {
					clearTimeout(changebgtimer);
					changebgtimer=setTimeout(function(){
						var classname=".to"+pointer.attr("data-class");
						$(classname).addClass('active').siblings('li').removeClass("active");
					},300);
				}
			});

			if ($(".enjoyquality").offset().top-$(window).scrollTop()<=$(window).height() && $(".enjoyquality").text()=="") {
				var fileurl="loadtable/enjoyquality.html";
				$(".enjoyquality").load(fileurl,function(){
					$(this).find('img').addClass('moveleft');
				});
			}
			if ($(".loveshopping").offset().top-$(window).scrollTop()<=$(window).height()) {
				if ($(".loveshopping").text()=="") {
					var fileurl="loadtable/loveshopping.html";
					$(".loveshopping").load(fileurl,function(){
						$(this).find('.lovelife-list-content img').addClass('moveleft');
						$(this).find('.lovelife-list-smimg').smimgslide();
					});
				}
				if ($(".lovebeauty").text()=="") {
					var fileurl="loadtable/lovebeauty.html";
					$(".lovebeauty").load(fileurl,function(){
						$(this).find('.lovelife-list-content img').addClass('moveleft');
						$(this).find('.lovelife-list-smimg').smimgslide();
					});
				}
			}
			if ($(".homeapp").offset().top-$(window).scrollTop()<=$(window).height()) {
				if ($(".homeapp").text()=="") {
					var fileurl="loadtable/homeapp.html";
					$(".homeapp").load(fileurl,function(){
						$(this).find('.lovelife-list-content img').addClass('moveleft');
						$(this).find('.lovelife-list-smimg').smimgslide();
					});
				}
				if ($(".phone").text()=="") {
					var fileurl="loadtable/phone.html";
					$(".phone").load(fileurl,function(){
						$(this).find('.lovelife-list-content img').addClass('moveleft');
						$(this).find('.lovelife-list-smimg').smimgslide();
					});
				}
			}
			if ($(".computer").offset().top-$(window).scrollTop()<=$(window).height() && $(".computer").text()=="") {
				var fileurl="loadtable/computer.html";
				$(".computer").load(fileurl,function(){
					$(this).find('.lovelife-list-content img').addClass('moveleft');
					$(this).find('.lovelife-list-smimg').smimgslide();
				});
			}
			if ($(".play3c").offset().top-$(window).scrollTop()<=$(window).height()) {
				if ($(".play3c").text()=="") {
					var fileurl="loadtable/play3c.html";
					$(".play3c").load(fileurl,function(){
						$(this).find('.lovelife-list-content img').addClass('moveleft');
						$(this).find('.lovelife-list-smimg').smimgslide();
					});
				}
				if ($(".lovesport").text()=="") {
					var fileurl="loadtable/lovesport.html";
					$(".lovesport").load(fileurl,function(){
						$(this).find('.lovelife-list-content img').addClass('moveleft');
						$(this).find('.lovelife-list-smimg').smimgslide();
					});
				}
			}
			if ($(".loveeat").offset().top-$(window).scrollTop()<=$(window).height() && $(".loveeat").text()=="") {
				var fileurl="loadtable/loveeat.html";
				$(".loveeat").load(fileurl,function(){
					$(this).find('.lovelife-list-content img').addClass('moveleft');
					$(this).find('.lovelife-list-smimg').smimgslide();
				});
			}
			if ($(".lovebaby").offset().top-$(window).scrollTop()<=$(window).height()) {
				if ($(".lovebaby").text()=="") {
					var fileurl="loadtable/lovebaby.html";
					$(".lovebaby").load(fileurl,function(){
						$(this).find('.lovelife-list-content img').addClass('moveleft');
						$(this).find('.lovelife-list-smimg').smimgslide();
					});
				}
				if ($(".lovehome").text()=="") {
					var fileurl="loadtable/lovehome.html";
					$(".lovehome").load(fileurl,function(){
						$(this).find('.lovelife-list-content img').addClass('moveleft');
						$(this).find('.lovelife-list-smimg').smimgslide();
					});
				}
			}
			if ($(".loveread").offset().top-$(window).scrollTop()<=$(window).height()) {
				if ($(".loveread").text()=="") {
					var fileurl="loadtable/loveread.html";
					$(".loveread").load(fileurl,function(){
						$(this).find('.lovelife-list-content img').addClass('moveleft');
						$(this).find('.lovelife-list-smimg').smimgslide();
					});
				}
				if ($(".lovecar").text()=="") {
					var fileurl="loadtable/lovecar.html";
					$(".lovecar").load(fileurl,function(){
						$(this).find('.lovelife-list-content img').addClass('moveleft');
						$(this).find('.lovelife-list-smimg').smimgslide();
					});
				}
			}
			if ($(".lovegame").offset().top-$(window).scrollTop()<=$(window).height()) {
				if ($(".lovegame").text()=="") {
					var fileurl="loadtable/lovegame.html";
					$(".lovegame").load(fileurl,function(){
						$(this).find('.lovelife-list-content img').addClass('moveleft');
						$(this).find('.lovelife-list-smimg').smimgslide();
					});
				}
				if ($(".lifetrip").text()=="") {
					var fileurl="loadtable/lifetrip.html";
					$(".lifetrip").load(fileurl,function(){
						$(this).find('.lovelife-list-content img').addClass('moveleft');
						$(this).find('.lovelife-list-smimg').smimgslide();
					});
				}
				if ($(".jdfinance").text()=="") {
					var fileurl="loadtable/jdfinance.html";
					$(".jdfinance").load(fileurl,function(){
						$(this).find('.lovelife-list-content img').addClass('moveleft');
						$(this).find('.lovelife-list-smimg').smimgslide();
					});
				}
			}


		});

		//trigger
		$(window).trigger('scroll');
		$(window).resize(function() {
			$(".sidebar-leftfixed").css('left', 0.5*$(window).width()-660);
		});
	})();

	//change bgc and scroll when click sidebar 
	(function(){
		$(".sidebar-leftfixed").click(function(event) {
			if(!$("html,body").is(':animated')){
				$(event.target).parent().addClass('active').siblings('li').removeClass('active');
				var classname="."+$(event.target).attr("data-href");
				if(classname==".top"){
					$("html,body").animate({scrollTop: 0}, 500);
				}else{
					$("html,body").animate({scrollTop: $(classname).offset().top-60}, 500);
				}
			}
		});
	})();

	// right sidebar
	(function(){
		$(".sidebar-rightfixed li span").hide();
		var timer=null;
		$(".sidebar-rightfixed li").hover(function() {
			var that=$(this);
			timer=setTimeout(function(){
				that.addClass('active').find("span").stop().addClass('active').animate({width:"show"}, 200);
			},300);
		}, function() {
			clearTimeout(timer);
			$(this).removeClass('active').find("span").stop().removeClass('active').animate({width:"hide"}, 200);
		});
	})();

	//show dropdown content
	(function(){
		$(".dropdown").hover(function() {
			$(this).children('a').addClass('dropdownhovered').siblings('div').show();
			if($(this).children('div').text()==""){
				$(this).children('div').load("loadtable/sitenav.html");
			}
		}, function() {
			$(this).children("a").removeClass('dropdownhovered').siblings('div').hide();
		});
	})();

});
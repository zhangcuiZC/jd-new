$(function(){
	// slideshow start
	//need slideshow-fadein.js
	slideshowFadein(5000,"#f10215");

	// // second kill img animation
	$(".seckill-content li:lt(5)").addClass('moveup');

	// // find img animation
	$(".findbrandrank-list-find-content-list li").addClass('moveleft');

	// // brand im animation
	$(".findbrandrank-list-brand-content-list li").addClass('moveleft');

	// //ticket center animation
	$(".ticketcenter-right li").addClass('moveright');

	// // enjoy quality animation
	$(".enjoyquality-list li").addClass('moveleft');

	// // love life animation
	$(".lovelife-list-content a").addClass('moveleft');

	// img lazy load
	$(".imglazyload img").lazyload({
		effect:"fadeIn",
		failure_limit:25,
		data_attribute:'src',
		placeholder:'img/imgloading.gif'
	});

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
		detailurl="detailclass/detailclass-"+(listidx+1)+".html";
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

	(function(){
		var nolock=true;
		$(window).scroll(function() {
			if($(".seckill").offset().top-$(window).scrollTop()<=0){
				if (nolock) {
					$(".header-searchbarfixed").stop().animate({top:0}, "normal");
				}
				nolock=false;
			}else{
				$(".header-searchbarfixed").css('top', '-70px');
				nolock=true;
			}
		});
		$(window).trigger('scroll');
	})();
});
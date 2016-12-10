$(function(){
	// slideshow start
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
	$(".enjoyquality-list li").addClass('moveleft');

	// // love life animation
	$(".lovelife-list-content a").addClass('moveleft');

	// img lazy load
	$(".imglazyload img").lazyload({
		effect:"fadeIn",
		failure_limit:5,
		data_attribute:'src'
	});

	// rank tab
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

	//news tab
	var newstabnav=$(".mainpage-quickentry-news-title li");
	var newstabcontent=$(".mainpage-quickentry-news-content ul");
	newstabnav.hover(function() {
		$(this).find('span').addClass('active').parent().siblings().find('span').removeClass('active');
		var idx=newstabnav.index(this);
		newstabcontent.eq(idx).show().siblings().hide();
	});
});
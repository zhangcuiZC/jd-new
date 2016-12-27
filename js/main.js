$(function(){
	// jQuery.support.transition
	// 检查浏览器是否支持CSS3的transition动画
	$.support.transition = (function(){ 
	    var thisBody = document.body || document.documentElement,
	    thisStyle = thisBody.style,
	    support = thisStyle.transition !== undefined || thisStyle.WebkitTransition !== undefined || thisStyle.MozTransition !== undefined || thisStyle.MsTransition !== undefined || thisStyle.OTransition !== undefined;
	                   
	    return support; 
	})();
	//如果支持，那么在html上添加表示支持的类，使transition动画生效
	var issupporttranstion=$.support.transition;
	if(issupporttranstion){
		$("html").addClass('supporttranstion');
	}

	//首页的轮播图
	//需要slideshow-fadein.js，参数一表示轮播间隔，参数二表示主题颜色
	slideshow(5000,"#f10215");

	//给“秒杀”一栏的图片添加类，使鼠标悬浮时图片产生向上的动画效果
	$(".seckill-content li:lt(5)").addClass('moveup');

	//给“发现好货”一栏的图片添加类，使鼠标悬浮时图片产生向左的动画效果
	$(".findbrandrank-list-find-content-list li").addClass('moveleft');

	//给“品牌头条”一栏的图片添加类，使鼠标悬浮时图片产生向左的动画效果
	$(".findbrandrank-list-brand-content-list li").addClass('moveleft');

	//给“领券中心”一栏的图片添加类，使鼠标悬浮时图片产生向右的动画效果
	$(".ticketcenter-right li").addClass('moveright');

	//“排行榜”的标签页效果
	(function(){
		var tabnav=$(".findbrandrank-list-rank-nav li:even");
		var tabcontent=$(".tabcontent");
		tabnav.hover(function() {
			$(this).addClass('active').siblings().removeClass('active');
			var idx=tabnav.index(this);
			var imgs=tabcontent.find('img');
			//利用相同的索引号使标签栏与内容栏对应
			tabcontent.eq(idx).show().siblings('.tabcontent').hide();
			//显示对应内容栏的图片
			imgs.each(function() {
				$(this).attr('src', $(this).attr('data-src'));
			});
		});
	})();

	//轮播图右侧的新闻中心的标签页效果
	(function(){
		var newstabnav=$(".mainpage-quickentry-news-title li");
		var newstabcontent=$(".mainpage-quickentry-news-content ul");
		newstabnav.hover(function() {
			$(this).find('span').addClass('active').parent().siblings().find('span').removeClass('active');
			//同样利用索引号显示对应的内容栏
			var idx=newstabnav.index(this);
			newstabcontent.eq(idx).show().siblings().hide();
		});
	})();

	//轮播图左侧的详细信息栏
	(function(){
		var detaillist=$(".mainpage-class-list li");
		var detaildivlist=$(".mainpage-class-detail");
		var listidx,divhide,detailurl,detailclass,content;
		detaillist.hover(function() {
			clearTimeout(divhide);
			listidx=detaillist.index(this);
			detailurl="loadtable/detailclass-"+(listidx+1)+".html";
			detailclass="mainpage-class-detail"+(listidx+1);
			detaildivlist.eq(listidx).show().siblings('.mainpage-class-detail').hide();
			//使用AJAX的load方法加载
			content=detaildivlist.eq(listidx).text();
			if (content==="") {
				detaildivlist.eq(listidx).load(detailurl);
			}
		}, function() {
			//设置一个divhide定时器，使detaildivlist延迟消失，使鼠标能够由分类标签（detaillist）移动至标签详细内容区（detaildivlist）
			divhide=setTimeout(function(){
				detaildivlist.eq(listidx).hide();
			},100);
		});

		detaildivlist.hover(function() {
			//当鼠标移至标签详细内容区（detaildivlist）时，取消定时器
			clearTimeout(divhide);
		}, function() {
			detaildivlist.hide();
		});
	})();

	//与scroll事件相关
	//包括顶部固定搜索栏，左侧固定导航栏，以及内容的lazyload等
	(function(){
		var loadadsitem1=true,loadadsitem2=true,loadadsitem3=true,changebgtimer=null,nolock=true,nolockleft=true,loadtimer1=null,loadtimer2=null;
		$(window).scroll(function() {
			//当秒杀一栏到达浏览器顶部时，顶部固定搜索栏出现
			if($(".seckill").offset().top-$(window).scrollTop()<=0){
				//使用nolock参数，表示出现的动画只执行一次
				if (nolock) {
					$(".header-searchbarfixed").stop().animate({top:0}, "normal");
				}
				nolock=false;
			}else{
				//顶栏消失后才可以再次执行出现的动画
				$(".header-searchbarfixed").css('top', '-70px');
				nolock=true;
			}
			//当到达享品质一栏的上方时，左侧固定导航栏出现
			if($(".showsidebarleft").offset().top-$(window).scrollTop()<=0.5*$(window).height()){
				//只出现一次
				if (nolockleft) {
					$(".sidebar-leftfixed").stop(true,true).fadeIn().css('left', 0.5*$(window).width()-660);
					$(".sidebar-leftfixed .toenjoyquality").addClass('active').siblings('li').removeClass('active');
				}
				nolockleft=false;
			}else{
				//消失后才可以再次出现
				$(".sidebar-leftfixed").stop().fadeOut(200,function(){
					$(this).find('li').removeClass('active');
				});
				nolockleft=true;
			}

			//利用在sidebarpointer，在固定到响应位置时，左侧固定导航栏背景色改变
			$(".sidebarpointer").each(function() {
				var pointer=$(this);
				if (pointer.offset().top-$(window).scrollTop()<=0.5*$(window).height()) {
					//利用定时器达到函数节流的目的，快速滚动时节约一定的性能
					clearTimeout(changebgtimer);
					changebgtimer=setTimeout(function(){
						var classname=".to"+pointer.attr("data-class");
						$(classname).addClass('active').siblings('li').removeClass("active");
					},300);
				}
			});

			//各个内容区延时加载，只有在鼠标滚动到响应的位置时才加载内容
			//采用两个定时器，快速滚动时只加载相邻的两个内容区，尽量减少不必要的加载
			var fileurl="";
			if ($(".enjoyquality").offset().top-$(window).scrollTop()>=-600 && $(".enjoyquality").offset().top-$(window).scrollTop()<=$(window).height() && $(".enjoyquality").text()==="") {
				//加载享品质及下方的广告
				clearTimeout(loadtimer1);
				loadtimer1=setTimeout(function(){
					fileurl="loadtable/enjoyquality.html";
					$(".enjoyquality").load(fileurl,function(){
						$(this).find('li').addClass('moveleft');
					});
					if (loadadsitem1) {
						$(".adsbar-item1").find('img').each(function() {
							$(this).attr('src', $(this).attr('data-src'));
						});
						loadadsitem1=false;
					}
				},200);
			}
			if ($(".loveshopping").offset().top-$(window).scrollTop()>=-600 && $(".loveshopping").offset().top-$(window).scrollTop()<=$(window).height()) {
				//加载爱逛和爱美丽两个区块
				clearTimeout(loadtimer2);
				loadtimer2=setTimeout(function(){
					if ($(".loveshopping").text()==="") {
						fileurl="loadtable/loveshopping.html";
						$(".loveshopping").load(fileurl,function(){
							$(this).find('.lovelife-list-content a').addClass('moveleft');
							//区块下方的商标滚动区
							//需要jquery.smimgslide.js，下同
							$(this).find('.lovelife-list-smimg').smimgslide();
						});
					}
					if ($(".lovebeauty").text()==="") {
						fileurl="loadtable/lovebeauty.html";
						$(".lovebeauty").load(fileurl,function(){
							$(this).find('.lovelife-list-content a').addClass('moveleft');
							$(this).find('.lovelife-list-smimg').smimgslide();
						});
					}
				},200);
			}
			if ($(".homeapp").offset().top-$(window).scrollTop()>=-600 && $(".homeapp").offset().top-$(window).scrollTop()<=$(window).height()) {
				//加载家电馆和搞机派两个区块
				clearTimeout(loadtimer1);
				loadtimer1=setTimeout(function(){
					if ($(".homeapp").text()==="") {
						fileurl="loadtable/homeapp.html";
						$(".homeapp").load(fileurl,function(){
							$(this).find('.lovelife-list-content a').addClass('moveleft');
							$(this).find('.lovelife-list-smimg').smimgslide();
						});
					}
					if ($(".phone").text()==="") {
						fileurl="loadtable/phone.html";
						$(".phone").load(fileurl,function(){
							$(this).find('.lovelife-list-content a').addClass('moveleft');
							$(this).find('.lovelife-list-smimg').smimgslide();
						});
					}
				},200);
			}
			if ($(".computer").offset().top-$(window).scrollTop()>=-600 && $(".computer").offset().top-$(window).scrollTop()<=$(window).height() && $(".computer").text()==="") {
				//加载电脑数码区块
				clearTimeout(loadtimer2);
				loadtimer2=setTimeout(function(){
					fileurl="loadtable/computer.html";
					$(".computer").load(fileurl,function(){
						$(this).find('.lovelife-list-content a').addClass('moveleft');
						$(this).find('.lovelife-list-smimg').smimgslide();
					});
				},200);
			}
			if ($(".play3c").offset().top-$(window).scrollTop()>=-600 && $(".play3c").offset().top-$(window).scrollTop()<=$(window).height()) {
				//加载玩3C和爱运动区块及下方广告
				clearTimeout(loadtimer1);
				loadtimer1=setTimeout(function(){	
					if ($(".play3c").text()==="") {
						fileurl="loadtable/play3c.html";
						$(".play3c").load(fileurl,function(){
							$(this).find('.lovelife-list-content a').addClass('moveleft');
							$(this).find('.lovelife-list-smimg').smimgslide();
						});
					}
					if ($(".lovesport").text()==="") {
						fileurl="loadtable/lovesport.html";
						$(".lovesport").load(fileurl,function(){
							$(this).find('.lovelife-list-content a').addClass('moveleft');
							$(this).find('.lovelife-list-smimg').smimgslide();
						});
					}
					if (loadadsitem2) {
						$(".adsbar-item2").find('img').each(function() {
							$(this).attr('src', $(this).attr('data-src'));
						});
						loadadsitem2=false;
					}
				},200);
			}
			if ($(".loveeat").offset().top-$(window).scrollTop()>=-600 && $(".loveeat").offset().top-$(window).scrollTop()<=$(window).height() && $(".loveeat").text()==="") {
				//加载爱吃区块
				clearTimeout(loadtimer2);
				loadtimer2=setTimeout(function(){
					fileurl="loadtable/loveeat.html";
					$(".loveeat").load(fileurl,function(){
						$(this).find('.lovelife-list-content a').addClass('moveleft');
						$(this).find('.lovelife-list-smimg').smimgslide();
					});
				},200);
			}
			if ($(".lovebaby").offset().top-$(window).scrollTop()>=-600 && $(".lovebaby").offset().top-$(window).scrollTop()<=$(window).height()) {
				//加载爱宝宝爱家两个区块
				clearTimeout(loadtimer1);
				loadtimer1=setTimeout(function(){
					if ($(".lovebaby").text()==="") {
						fileurl="loadtable/lovebaby.html";
						$(".lovebaby").load(fileurl,function(){
							$(this).find('.lovelife-list-content a').addClass('moveleft');
							$(this).find('.lovelife-list-smimg').smimgslide();
						});
					}
					if ($(".lovehome").text()==="") {
						fileurl="loadtable/lovehome.html";
						$(".lovehome").load(fileurl,function(){
							$(this).find('.lovelife-list-content a').addClass('moveleft');
							$(this).find('.lovelife-list-smimg').smimgslide();
						});
					}
				},200);
			}
			if ($(".loveread").offset().top-$(window).scrollTop()>=-600 && $(".loveread").offset().top-$(window).scrollTop()<=$(window).height()) {
				//加载爱阅读爱车两个区块
				clearTimeout(loadtimer2);
				loadtimer2=setTimeout(function(){
					if ($(".loveread").text()==="") {
						fileurl="loadtable/loveread.html";
						$(".loveread").load(fileurl,function(){
							$(this).find('.lovelife-list-content a').addClass('moveleft');
							$(this).find('.lovelife-list-smimg').smimgslide();
						});
					}
					if ($(".lovecar").text()==="") {
						fileurl="loadtable/lovecar.html";
						$(".lovecar").load(fileurl,function(){
							$(this).find('.lovelife-list-content a').addClass('moveleft');
							$(this).find('.lovelife-list-smimg').smimgslide();
						});
					}
				},200);
			}
			if ($(".lovegame").offset().top-$(window).scrollTop()>=-600 && $(".lovegame").offset().top-$(window).scrollTop()<=$(window).height()) {
				//加载爱游戏生活旅行京东金融三个区块及下方广告
				clearTimeout(loadtimer1);
				loadtimer1=setTimeout(function(){
					if ($(".lovegame").text()==="") {
						fileurl="loadtable/lovegame.html";
						$(".lovegame").load(fileurl,function(){
							$(this).find('.lovelife-list-content a').addClass('moveleft');
							$(this).find('.lovelife-list-smimg').smimgslide();
						});
					}
					if ($(".lifetrip").text()==="") {
						fileurl="loadtable/lifetrip.html";
						$(".lifetrip").load(fileurl,function(){
							$(this).find('.lovelife-list-content a').addClass('moveleft');
							$(this).find('.lovelife-list-smimg').smimgslide();
						});
					}
					if ($(".jdfinance").text()==="") {
						fileurl="loadtable/jdfinance.html";
						$(".jdfinance").load(fileurl,function(){
							$(this).find('.lovelife-list-content a').addClass('moveleft');
							$(this).find('.lovelife-list-smimg').smimgslide();
						});
					}
					if (loadadsitem3) {
						$(".adsbar-item3").find('img').each(function() {
							$(this).attr('src', $(this).attr('data-src'));
						});
						loadadsitem3=false;
					}
				},200);
			}


		});

		//加载页面时触发滚动效果（比如在页面中间刷新页面也能使顶部和左侧固定栏出现）
		$(window).trigger('scroll');
		//触发resize事件时保持左侧固定导航栏紧挨内容区
		$(window).resize(function() {
			$(".sidebar-leftfixed").css('left', 0.5*$(window).width()-660);
		});
	})();

	//当点击左侧固定导航栏时，背景色改变并滚动到相应部分
	(function(){
		$(".sidebar-leftfixed").click(function(event) {
			//利用if使其不产生动画队列
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

	//右侧固定栏的悬浮动画效果
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

	//页面顶部的下拉菜单栏效果
	(function(){
		//右侧下拉菜单栏
		$(".header-shortcut-loginlist .dropdown").hover(function() {
			$(this).children('a').addClass('dropdownhovered').siblings('div').show();
			if($(this).children('div').text()===""){
				$(this).children('div').load("loadtable/sitenav.html");
			}
		}, function() {
			$(this).children("a").removeClass('dropdownhovered').siblings('div').hide();
		});
		//左侧城市选择
		$(".header-shortcut-city").hover(function() {
			var that=$(this);
			that.children('span').addClass('dropdownhovered').siblings('div').show().on('click', 'a', function(event) {
				var target=$(event.target);
				that.find('a').removeClass('active');
				target.addClass('active');
				that.children('span').text(target.text());
			});
		}, function() {
			$(this).children('span').removeClass('dropdownhovered').siblings('div').hide();
		});
	})();

	//京东秒杀部分的倒计时
	(function(){
		$(".seckill-title-right").countdown('2020/12/25 18:53:00').on('update.countdown', function(event) {
			$(".seckill-title-right-hour").html(event.strftime('%H'));
			$(".seckill-title-right-minute").html(event.strftime('%M'));
			$(".seckill-title-right-second").html(event.strftime('%S'));
		}).on('finish.countdown', function(event) {
			//倒计时结束
			$(this).html("此次秒杀活动已结束，请等待下次活动开始。");
		});
	})();

	//mainpage左侧大幅广告
	(function(){
		$(".mainpage-left").hover(function() {
			$(this).children('.img2').animate({width:"show"}, 300);
		}, function() {
			$(this).children('.img2').animate({width:"hide"}, 300);
		});

		$(".mainpage-left .clicktoclose").click(function() {
			$(this).parent(".img2").animate({width:"hide"}, 300);
			return false;
		});

		$(".topad .clicktoclose").click(function() {
			$(".topad").fadeOut();
			return false;
		});
	})();


});
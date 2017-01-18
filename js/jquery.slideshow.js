// 定义了DOM对象的slideShow()方法，
// 调用条件：外层容器内部嵌套一个容器，内层容器内放入a标签包裹的img元素，
// 调用方法：$("外层容器").slideShow(实参)，可传入0~1个实参，
// 实参说明：一个设定颜色和轮播间隔的对象。形如{color:"#ff7",time:5000}，对象可接受0~2个属性。
;(function($){
	$.fn.extend({
		"slideShow":function(args){
			//如果传入一个包含设置参数的对象，那么覆盖默认值
			var settings=jQuery.extend({
				color:"#317EF3",
				time:5000
			}, args);

			var i,
				$outerbox=$(this),
				$imgs=$outerbox.find('img'),
				adTimer=null,
				$innerbox=$outerbox.children('div'),
				imgnum=$imgs.length,
				imgwidth=$outerbox.width(),
				imgheight=$outerbox.height();

			//给每个图片设置data-idx属性标识它们，使其能够和infobox相对应
			for(i=0;i<imgnum;i++){
				$imgs.eq(i).attr('data-idx', i);
			}

			//设置各个div的css样式
			$imgs.css({
				float: 'left',
				border: 'none'
			});
			$outerbox.css({
				overflow: 'hidden',
				position: 'relative'
			});
			$innerbox.css({
				width: imgwidth*imgnum+"px",
				position: 'absolute',
				left:'0',
				top:'0'
			});

			//在outerbox下新增一个显示alt的div
			var infobox=$("<div class='infobox'></div>");
			$outerbox.append(infobox);
			var $infobox=$outerbox.children('.infobox');
			$infobox.css({
				position: 'absolute',
				left: '0',
				bottom:'0',
				width:imgwidth+10+"px",
				height:0.13*imgheight+'px'
			});
			var liheight=0.13*imgheight;

			var lists="";
			for(i=0;i<imgnum;i++){
				lists+="<li><a href=''><span></span></a></li>";
			}
			var ullists=$("<ul>"+lists+"</ul>");
			$infobox.append(ullists);
			$infobox.find('ul').css({
				height: liheight+"px",
				paddingLeft:'0',
				marginTop:'0',
				marginBottom:'0'
			});
			$infobox.find('li').css({
				display: 'inline-block',
				float:'left',
				marginRight:'3px',
				background: "rgba(0,0,0,0.4)",
				height:liheight+"px",
				width:(imgwidth-(imgnum-1)*3)/imgnum+"px",
				lineHeight:liheight+'px',
				verticalAlign:'middle'
			});
			$infobox.find('a').css({
				display: 'inline-block',
				width:$infobox.find('li').width()+"px",
				textAlign:'center'
			});
			$infobox.find('span').css({
				display:'inline-block',
				lineHeight:'1.1em',
				paddingLeft:liheight*0.2+"px",
				paddingRight:liheight*0.2+"px",
				verticalAlign: 'middle',
				color:'#ddd',
				fontSize:'12px',
				wordBreak:'break-all',
				height:'2.2em',
				overflow:'hidden'
			});

			//获得img上层a的href属性，赋给infobox里的a元素
			for(i=0;i<imgnum;i++){
				var link=$innerbox.children('a').eq(i).attr("href");
				var info=$innerbox.find('img').eq(i).attr("alt");
				$infobox.find('a').eq(i).attr('href', link);
				if(info){
					$infobox.find('span').eq(i).append(info);
				}else{
					$infobox.find('span').eq(i).append(i+1);
				}
			}

			//增加左右箭头
			var arrows=$('<div class="leftarrow arrow">&lt;</div><div class="rightarrow arrow">&gt;</div>');
			$outerbox.append(arrows);
			var $arrows=$outerbox.children('.arrow');
			$arrows.css({
				width:liheight*0.8+"px",
				height: liheight*1.5+"px",
				position:'absolute',
				top:(imgheight*0.5-liheight*0.75-10)+"px",
				background: "rgba(0,0,0,0.4)",
				textAlign:'center',
				lineHeight:liheight*1.45+'px',
				fontSize:'1.5em',
				color:'#ddd',
				cursor:'pointer'
			});
			$outerbox.children('.leftarrow').css('left', '0');
			$outerbox.children('.rightarrow').css('right', '0');

			//鼠标放在箭头上时，箭头变色
			$outerbox.children('.leftarrow').hover(function() {
				$(this).css('background', settings.color);
			}, function() {
				$(this).css('background', 'rgba(0,0,0,0.4)');
			});
			$outerbox.children('.rightarrow').hover(function() {
				$(this).css('background', settings.color);
			}, function() {
				$(this).css('background', 'rgba(0,0,0,0.4)');
			});

			//点击左右箭头
			var dataidx;
			$infobox.find('li').eq(0).css('backgroundColor', settings.color).siblings().css('background', 'rgba(0,0,0,0.4)');
			$outerbox.on('click', '.arrow', function(event) {
				if ($(event.target).hasClass('rightarrow')) {
					if (!$innerbox.is(':animated')) {
						dataidx=$innerbox.find('a:first').next("a").find('img').attr("data-idx");
						$infobox.find('li').eq(dataidx).css('backgroundColor', settings.color).siblings().css('background', 'rgba(0,0,0,0.4)');
						$innerbox.animate({left:-imgwidth}, "normal",function(){
							$innerbox.find('a:first').insertAfter($innerbox.find('a:last'));
							$innerbox.css('left', '0');
						});	
					}
				}

				if ($(event.target).hasClass('leftarrow')) {
					if (!$innerbox.is(':animated')) {
						$innerbox.find('a:last').insertBefore($innerbox.find('a:first'));
						$innerbox.css('left', -imgwidth);
						$innerbox.animate({left:0}, "normal");
						dataidx=$innerbox.find('a:first').find('img').attr("data-idx");
						$infobox.find('li').eq(dataidx).css('backgroundColor', settings.color).siblings().css('background', 'rgba(0,0,0,0.4)');
					}
				}
			});

			//自动轮播，鼠标放在div上时箭头出现，移走箭头消失
			$outerbox.hover(function() {
				$outerbox.find('.leftarrow').stop().animate({left:"0"},300);
				$outerbox.find('.rightarrow').stop().animate({right:"0"},300);
				$infobox.stop().animate({bottom:"0"}, 300);
				if (adTimer) {
					clearInterval(adTimer);
				}
			}, function() {
				$outerbox.find('.leftarrow').stop().animate({left:-liheight*0.8+"px"},300);
				$outerbox.find('.rightarrow').stop().animate({right:-liheight*0.8+"px"},300);
				$infobox.stop().animate({bottom:-(liheight-7)+"px"}, 300);
				adTimer=setInterval(function () {
					$outerbox.find('.rightarrow').trigger('click');
				},settings.time);
			}).trigger('mouseleave');

			//鼠标放在下方的颜色块上时移动图片
			$infobox.find('li').mouseover(function() {
				var index=$(this).index();
				var dataidx=$innerbox.find('a:first').find('img').attr("data-idx");
				$infobox.find('li').eq(index).css('backgroundColor', settings.color).siblings().css('background', 'rgba(0,0,0,0.4)');
				if(index-dataidx>0){
					for(i=0;i<Math.abs(index-dataidx);i++){
							$innerbox.find('a:first').insertAfter($innerbox.find('a:last'));
					}
				}else if(index-dataidx<0){
					for(i=0;i<Math.abs(index-dataidx);i++){
							$innerbox.find('a:last').insertBefore($innerbox.find('a:first'));
					}
				}
			});
			
			//页面可见性，不可见时停止轮播
			function handlevisibilitychange(){
				if (document[hidden]) {
					clearInterval(adTimer);
				}else{
					adTimer=setInterval(function () {
						$outerbox.find('.rightarrow').trigger('click');
					},settings.time);
				}
			}
			var hidden, visibilityChange;
			if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support 
			  	hidden = "hidden";
			  	visibilityChange = "visibilitychange";
			} else if (typeof document.msHidden !== "undefined") {
			  	hidden = "msHidden";
			  	visibilityChange = "msvisibilitychange";
			} else if (typeof document.webkitHidden !== "undefined") {
			  	hidden = "webkitHidden";
			  	visibilityChange = "webkitvisibilitychange";
			}

			document.addEventListener(visibilityChange, handlevisibilitychange, false);
			
			return this;
		}
	});
})(jQuery);
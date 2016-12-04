function slideshow(thetime,thecolor){
	var color="#317EF3";
	var time=5000;
	if(arguments.length==1){
		time=arguments[0];
	}else if(arguments.length==2){
		time=arguments[0];
		color=arguments[1];
	}else if(arguments.length>2){
		return false;
	}
	//设置各个div的css属性
	$(".outerbox img").css('float', 'left');
	$(".outerbox").css({
		overflow: 'hidden',
		position: 'relative'
	});
	var imgnum=$(".outerbox img").length;
	var imgwidth=$(".outerbox img").width();
	var imgheight=$(".outerbox img").height();
	$(".outerbox .innerbox").css({
		width: imgwidth*imgnum+"px",
		position: 'absolute',
		left:'0',
		top:'0'
	});
	//在outerbox下新增一个显示alt的div
	var $infobox=$("<div class='infobox'></div>");
	$(".outerbox").append($infobox);
	$(".outerbox .infobox").css({
		position: 'absolute',
		left: '0',
		bottom:'0',
		width:imgwidth+10+"px",
		height:'13%',
	});
	var liheight=$(".outerbox .infobox").height();
	$(".outerbox .infobox").append('<ul></ul>');
	for(var i=0;i<imgnum;i++){
		$(".outerbox .infobox ul").append('<li><a href=""><span></span></a></li>');
	}
	$(".outerbox .infobox ul").css({
		height: liheight+"px",
		paddingLeft:'0',
		marginTop:'0',
		marginBottom:'0'
	});
	$(".outerbox .infobox ul li").css({
		display: 'inline-block',
		float:'left',
		marginRight:'3px',
		background: "rgba(0,0,0,0.4)",
		height:liheight+"px",
		width:(imgwidth-(imgnum-1)*3)/imgnum+"px",
		lineHeight:liheight+'px',
		verticalAlign:'middle'
	});
	$(".outerbox .infobox ul li a").css({
		display: 'inline-block',
		width:$(".outerbox .infobox ul li").width()+"px",
		textAlign:'center',
	});
	$(".outerbox .infobox ul li a span").css({
		display:'inline-block',
		lineHeight:'1.1em',
		paddingLeft:liheight*0.2+"px",
		paddingRight:liheight*0.2+"px",
		verticalAlign: 'middle',
		color:'#ddd',
		fontSize:'12px'
	});
	//增加箭头
	$(".outerbox").append('<div class="leftarrow arrow">&lt;</div>');
	$(".outerbox").append('<div class="rightarrow arrow">&gt;</div>');
	$(".outerbox .arrow").css({
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
	$(".outerbox .leftarrow").css('left', '0');
	$(".outerbox .rightarrow").css('right', '0');
	//鼠标放在箭头上时，箭头变色
	$(".outerbox .leftarrow").hover(function() {
		$(this).css('background', color);
	}, function() {
		$(this).css('background', 'rgba(0,0,0,0.4)');
	});
	$(".rightarrow").hover(function() {
		$(this).css('background', color);
	}, function() {
		$(this).css('background', 'rgba(0,0,0,0.4)');
	});
	//点击右箭头
	var page=1;
	var adTimer=null;
	$(".outerbox ul li").eq(0).css('backgroundColor', color).siblings().css('background', 'rgba(0,0,0,0.4)');
	$(".outerbox .rightarrow").click(function() {
		if (!$(".outerbox .innerbox").is(':animated')) {
			if (page!=imgnum) {
				$(".outerbox .innerbox").animate({left:"-="+imgwidth+"px"}, "normal");
				$(".outerbox ul li").eq(page).css('backgroundColor', color).siblings().css('background', 'rgba(0,0,0,0.4)');
				page++;
			}else{
				$(".outerbox .innerbox").animate({left:"0px"}, "normal");
				$(".outerbox ul li").eq(0).css('backgroundColor', color).siblings().css('background', 'rgba(0,0,0,0.4)');
				page=1;
			}
		}
	});
	//点击左箭头
	$(".outerbox .leftarrow").click(function() {
		if (!$(".outerbox .innerbox").is(':animated')) {
			if (page!=1) {
				$(".outerbox .innerbox").animate({left:"+="+imgwidth+"px"}, "normal");
				$(".outerbox ul li").eq(page-2).css('backgroundColor', color).siblings().css('background', 'rgba(0,0,0,0.4)');
				page--;
			}else{
				$(".outerbox .innerbox").animate({left:"-"+imgwidth*(imgnum-1)+"px"}, "normal");
				$(".outerbox ul li").eq(imgnum-1).css('backgroundColor', color).siblings().css('background', 'rgba(0,0,0,0.4)');
				page=imgnum;
			}
		}
	});
	//每5s自动滚动，鼠标放在div上时箭头出现，移走箭头消失
	$(".outerbox").hover(function() {
		$(this).find('.leftarrow').stop().animate({left:"0"},300);
		$(this).find('.rightarrow').stop().animate({right:"0"},300);
		$(this).find('.infobox').stop().animate({bottom:"0"}, 300);
		if (adTimer) {
			clearInterval(adTimer);
		}
	}, function() {
		$(this).find('.leftarrow').stop().animate({left:-liheight*0.8+"px"},300);
		$(this).find('.rightarrow').stop().animate({right:-liheight*0.8+"px"},300);
		$(this).find('.infobox').stop().animate({bottom:-(liheight-7)+"px"}, 300);
		adTimer=setInterval(function () {
			if (page!=imgnum) {
				$(".outerbox .innerbox").animate({left:"-="+imgwidth+"px"}, "normal");
				$(".outerbox ul li").eq(page).css('backgroundColor', color).siblings().css('background', 'rgba(0,0,0,0.4)');
				page++;
			}else{
				$(".outerbox .innerbox").animate({left:"0px"}, "normal");
				$(".outerbox ul li").eq(0).css('backgroundColor', color).siblings().css('background', 'rgba(0,0,0,0.4)');
				page=1;	
			}
		},time);
	}).trigger('mouseleave');
	//鼠标放在下方的颜色块上时移动图片
	$(".outerbox .infobox ul li").mouseover(function() {
		var index=$(this).index();
		page=index+1;
		var num=index*imgwidth;
		$(".outerbox .infobox ul li").eq(index).css('backgroundColor', color).siblings().css('background', 'rgba(0,0,0,0.4)');
		$(".outerbox .innerbox").stop(true).animate({left: -num+'px'}, "normal");
	});
	//获得img上层a的href属性，赋给infobox里的a元素
	for(var i=0;i<imgnum;i++){
		var link=$(".outerbox .innerbox a").eq(i).attr("href");
		var info=$(".outerbox .innerbox img").eq(i).attr("alt");
		$(".outerbox .infobox a").eq(i).attr('href', link);
		if(info){
			$(".outerbox .infobox span").eq(i).append(info);
		}else{
			$(".outerbox .infobox span").eq(i).append(i+1);
		}
	}
}

$(function(){
	slideshow(5000,"#f10215");
});
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

	var i;
	var adTimer=null;
	var innerbox=$(".outerbox .innerbox");
	var imgnum=$(".outerbox img").length;
	var imgwidth=$(".outerbox").width();
	var imgheight=$(".outerbox").height();
	//给每个图片设置data-idx属性标识它们，使其能够和infobox相对应
	for(i=0;i<imgnum;i++){
		$(".outerbox .innerbox img").eq(i).attr('data-idx', i);
	}
	//设置各个div的css样式
	$(".outerbox img").css('float', 'left');
	$(".outerbox").css({
		overflow: 'hidden',
		position: 'relative'
	});
	innerbox.css({
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

	var lists="";
	for(i=0;i<imgnum;i++){
		lists+="<li><a href=''><span></span></a></li>";
	}
	var ullists="<ul>"+lists+"</ul>";
	$(".outerbox .infobox").append($(ullists));
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
		fontSize:'12px',
		wordBreak:'break-all',
		height:'2.2em',
		overflow:'hidden'
	});
	//获得img上层a的href属性，赋给infobox里的a元素
	for(i=0;i<imgnum;i++){
		var link=$(".outerbox .innerbox a").eq(i).attr("href");
		var info=$(".outerbox .innerbox img").eq(i).attr("alt");
		$(".outerbox .infobox a").eq(i).attr('href', link);
		if(info){
			$(".outerbox .infobox span").eq(i).append(info);
		}else{
			$(".outerbox .infobox span").eq(i).append(i+1);
		}
	}
	//增加左右箭头
	var arrows='<div class="leftarrow arrow">&lt;</div><div class="rightarrow arrow">&gt;</div>';
	$(".outerbox").append($(arrows));
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
	//点击左右箭头
	var dataidx;
	$(".outerbox ul li").eq(0).css('backgroundColor', color).siblings().css('background', 'rgba(0,0,0,0.4)');
	$(".outerbox").on('click', '.arrow', function(event) {
		if ($(event.target).hasClass('rightarrow')) {
			if (!innerbox.is(':animated')) {
				dataidx=$(".outerbox .innerbox a:first").next("a").find('img').attr("data-idx");
				$(".outerbox ul li").eq(dataidx).css('backgroundColor', color).siblings().css('background', 'rgba(0,0,0,0.4)');
				innerbox.animate({left:-imgwidth}, "normal",function(){
					$(".outerbox .innerbox a:first").insertAfter($(".outerbox .innerbox a:last"));
					innerbox.css('left', '0');
				});	
			}
		}

		if ($(event.target).hasClass('leftarrow')) {
			if (!innerbox.is(':animated')) {
				$(".outerbox .innerbox a:last").insertBefore($(".outerbox .innerbox a:first"));
				innerbox.css('left', -imgwidth);
				innerbox.animate({left:0}, "normal");
				dataidx=$(".outerbox .innerbox a:first").find('img').attr("data-idx");
				$(".outerbox ul li").eq(dataidx).css('backgroundColor', color).siblings().css('background', 'rgba(0,0,0,0.4)');
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
			$(".outerbox .rightarrow").trigger('click');
		},time);
	}).trigger('mouseleave');
	//鼠标放在下方的颜色块上时移动图片
	$(".outerbox .infobox ul li").mouseover(function() {
		var index=$(this).index();
		var dataidx=$(".outerbox .innerbox a:first").find('img').attr("data-idx");
		$(".outerbox ul li").eq(index).css('backgroundColor', color).siblings().css('background', 'rgba(0,0,0,0.4)');
		if(index-dataidx>0){
			for(i=0;i<Math.abs(index-dataidx);i++){
					$(".outerbox .innerbox a:first").insertAfter($(".outerbox .innerbox a:last"));
			}
		}else if(index-dataidx<0){
			for(i=0;i<Math.abs(index-dataidx);i++){
					$(".outerbox .innerbox a:last").insertBefore($(".outerbox .innerbox a:first"));
			}
		}
	});
}
// 商标轮播插件
;(function(){
	$.fn.extend({
		"smimgslide":function(){
			var thisobj=$(this);
			var smimgbox=thisobj.find('.lovelife-list-smimg-box');
			var ulwidth=thisobj.find('ul:first').width();
			var idx=1;
			//arrows show or hide when hover
			thisobj.hover(function() {
				thisobj.find('span').show();
			}, function() {
				thisobj.find('span').hide();
			});
			//event delegation
			thisobj.on('click', 'span', function(event) {
				var classname=$(event.target).attr('class');
				//load img when click first time
				if(idx){
					var imgs=thisobj.find('ul:last img');
					imgs.each(function() {
						$(this).attr('src', $(this).attr('data-src'));
					});
					idx--;
				}
				//left scroll
				if(classname=="lovelife-list-smimg-leftarrow"){
					if (!smimgbox.is(':animated')) {
						thisobj.find('ul:last').insertBefore(thisobj.find('ul:first'));
						smimgbox.css('left', -ulwidth);
						smimgbox.animate({left:"20px"}, "normal",function(){
							smimgbox.animate({left:0}, "fast");
						});
					}
				}
				//right scroll
				if(classname=="lovelife-list-smimg-rightarrow"){
					if (!smimgbox.is(':animated')) {
						smimgbox.animate({left:(-ulwidth-40)+"px"}, "normal",function(){
							smimgbox.animate({left:-ulwidth-20}, "fast",function(){
								thisobj.find('ul:first').insertAfter(thisobj.find('ul:last'));
								smimgbox.css('left', 0);
							});
						});	
					}
				}
			});

			return this;
		}
	});
})(jQuery);
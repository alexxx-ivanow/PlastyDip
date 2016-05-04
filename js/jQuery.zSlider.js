/*
	version:1.0;
	author:zhuhailiang;
	date:2016/01/29

 */
;
(function($) {
	$.fn.zSlider = function(m) {
		var defaults = {
			interval: 6000, //间隔时间
			turnTo: "c", //'a'水平移动,'b'上下移动,'c'淡入淡出
			paper: true, //'true'显示页脚,'false'不显示页脚
			width:480,//默认滑块宽度
			height:270//默认滑块高度
		};
		return this.each(function() {
			var options = $.extend(defaults, m);
			var fBox = $(this);
			var uSon = fBox.children('ul');
			var gSon = uSon.children('li');
			fBox.css({
				'width': options.width,
				'height': options.height
			});
			fBox.children('ol').children('li').eq(0).addClass('on');
			gSon.css({
				'width': options.width,
				'height': options.height
			});
			//移动方向
			if (options.turnTo == 'a') {                    //水平移动
				uSon.css({
					'width': options.width * gSon.length
				});
				t = setInterval(move_a, options.interval);
			} else if (options.turnTo == 'b') {             //上下移动
				gSon.css({
					'float': 'none'
				});
				t = setInterval(move_b, options.interval);
			} else if (options.turnTo == 'c') {
				gSon.hide();
				gSon.eq(0).show();
				t = setInterval(move_c, options.interval);
			};
			
			var num = 1;

			function move_a() {
				olon(num);
				if (num < gSon.length) {
					uSon.animate({
						'left': -gSon.width() * num
					});
					num++;
				} else {
					uSon.animate({
						'left': 0
					});
					fBox.children('ol').children('li').eq(0).addClass('on');
					num = 1;
				};
			};
			//上下移动方法
			function move_b() {
				olon(num);
				if (num < gSon.length) {
					uSon.animate({
						'top': -gSon.height() * num
					});
					num++;
				} else {
					uSon.animate({
						'top': 0
					});
					fBox.children('ol').children('li').eq(0).addClass('on');
					num = 1;
				};
			};

			function move_c() {
				olon(num);
				if (num < gSon.length) {
					gSon.eq(num-1).fadeOut('1000', function() {
						gSon.eq(num++).fadeIn('1000');
					});
				} else {
					gSon.eq(gSon.length-1).fadeOut('1000', function() {
						gSon.eq(0).fadeIn('1000');
					});
					fBox.children('ol').children('li').eq(0).addClass('on');
					num = 1;
				};
			};

			//paper setting
			if (options.paper) {
				fBox.append('<ol class="paper"></ol>');
				for (var i = 0; i < gSon.length; i++) {
					fBox.children('ol').append("<li></li>");
				};
				var olSon = fBox.children('ol').children('li');
				$(this).children('ol').children('li').hover(function() {
					clearInterval(t);
					num = $(this).index();
					olSon.removeClass('on');
					if (options.turnTo == 'a') {
						uSon.stop().animate({
							'left': -gSon.width() * num
						});
					} else if (options.turnTo == 'b') {
						uSon.stop().animate({
							'top': -gSon.height() * num
						});
					}else if (options.turnTo == 'c') {
						gSon.eq(num).siblings().stop().fadeOut('fast', function() {
							gSon.eq(num).fadeIn('400');
						});
					};
					$(this).addClass('on');
				}, function() {
					if (options.turnTo == 'a') {
						t = setInterval(move_a, options.interval);
					} else if (options.turnTo == 'b') {
						t = setInterval(move_b, options.interval);
					}else if (options.turnTo == 'c') {
						t = setInterval(move_c, options.interval);
					}
				});
				fBox.children('ol').children('li').eq(0).addClass('on');

				function olon(num) {
					fBox.children('ol').children('li').removeClass('on').eq(num).addClass('on');
				};
			};
		});
	};
})(jQuery);

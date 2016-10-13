var Myorder = {
	dom:{},

	init:function () {
		this.initDom();
		this.bindEvent();
	},

	initDom:function () {
		var dom = this.dom
		dom.li = $('.user_sidebar_list li:has(ul)');
		dom.bagList = $('.bag_list');
	},

	bindEvent:function () {
		var dom = this.dom
		//点击【我的钱包】切换ul
		dom.li.find('a').eq(0).click(function () {
			 	dom.bagList.toggle(500, function () {
			 		dom.bagList.find('li').eq(0).find('a').addClass('act');
			 	});

		});
		// dom.li.click(function (event) {
		// 	if($(this) == event.target){
		// 	
		// 			dom.bagList.toggle(500, function () {
		// 		 		dom.bagList.find('li').eq(0).find('a').addClass('act');
		// 		 	});
				
		// 	}
		// });
	}
}	

$(function () {
	Myorder.init();
})
var Dress = {
	dom:{},

	init:function () {
		this.initDom();
		this.bindEvent();
	},

	initDom:function () {
		var dom = this.dom;
		dom.drop = $('.drop');
		dom.sort = $('.sort');
		dom.close = $('div:not(.sort)');
	},

	bindEvent:function () {
		var dom = this.dom;
		//点击a
		dom.sort.click(function () {
		 	
		 	//相应的drop内容的出现
		 	dom.drop.css('display','block');
		});

		
	}

}

$(function () {
	Dress.init();
})
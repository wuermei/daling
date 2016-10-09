var Mybag = {
	dom:{},

	init:function () {
		this.initDom();
		this.bindEvent();
	},

	initDom:function () {
		var dom = this.dom
		dom.barLi = $('.bar li');
		dom.p_say = $('.p_say');
	},

	bindEvent:function () {
		var dom = this.dom
		dom.barLi.click(function () {

			var index = $(this).index();// 获取当前的索引值
		 	
		 	//点击菜单栏样式的改变
		 	dom.barLi.removeClass('active');
		 	$(this).addClass('active');

		 	//相应的p内容的改变
		 	dom.p_say.css('display','none');
		 	dom.p_say.eq(index).css('display','block');



		});
	}

}

$(function () {
	Mybag.init();
})
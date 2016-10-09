$(function(){
	var $tabs = $('.tabs a');
	var $login_form = $('.login_form');
	var $register_form = $('.register_form');
	var $box = $('#box');
	var $agree = $('.agreement');

	//点击登录或注册按钮
	$tabs.click(function(){
		var index = $(this).index();
		
		//按钮高亮
		$tabs.removeClass('active');
		$(this).addClass('active');//$(this)指的是当前点击的节点
		
		//表单的切换
		if(index == 0){
			$login_form.css('display','block');
			$register_form.css('display','none');
		}else{
			$register_form.css('display','block');
			$login_form.css('display','none');
		}

	});
	
	//选中复选框，注册按钮高亮
	$box.click(function(){
		if($box.is(':checked') == true){
			$agree.next().addClass('active');

		}else{
			$agree.next().removeClass('active');
		}
	})

	
	// 注册验证
	//点击注册按钮验证
	$('.register_submit').click(function () {

		var tel = $('.mobile').eq(1).val();
		var pwd = $('.password').eq(1).val();
		var verify = $('.verify').val();
		var sms= $('.sms').val();


		if(tel == '') {
			$('.error').eq(2).text('请输入手机号');
			$('.error').eq(2).show();
		}

		if(pwd == '') {
			$('.error').eq(5).text('请输入密码');
			$('.error').eq(5).show();
		}

		if(verify == '') {
			$('.error').eq(3).text('请输入验证码');
			$('.error').eq(3).show();
		}

		if(sms == '') {
			$('.error').eq(4).text('请输入手机验证码');
			$('.error').eq(4).show();
		}

	})

	//登录验证

	//点击登录按钮的验证
	$('.login_submit').click(function () {

		var tel = $('.mobile').val();
		var pwd = $('.password').val();

		if(tel == '') {
			$('.error').eq(0).text('请输入手机号');
			$('.error').eq(0).show();
		}

		if(pwd == '') {
			$('.error').eq(1).text('请输入密码');
			$('.error').eq(1).show();
		}
	})
 



	//手机号的验证
	$('.mobile').blur(function () {
		
		var tel = $(this).val();//失去焦点后再获取文本框的数据

		if( tel == ''){
			
			$(this).next().text('请输入手机号');
			$(this).next().show();
		
		}else if( isMobile(tel) == false) {
			
			$(this).next().text('请输入正确手机号');
			$(this).next().show();

		}else if( isMobile(tel) == true) {
			
			$(this).next().hide();
		}
	})

	//密码验证
	$('.password').blur( function () {
		
		var pwd = $(this).val();

		if( pwd == ''){
			$(this).next().text('请输入密码');
			$(this).next().show();
		}else {
			$(this).next().hide();
		}

	})
	
	//验证码的验证
	$('.verify').blur(function () {
		
		if($('.verify').val() == ''){
			$(this).next().text('请输入验证码');
			$(this).next().show();
		}else if($('#div1').text() != $('.verify').val() ){
			$(this).next().text('验证码错误');
			$(this).next().show();
		}else{
			$(this).next().hide();
		}
	})



	//用户注册，设置cookie
	$('.register_submit').click(function () {
		
		if($('#div1').text() == $('.verify').val() ){

			//alert('1');可以弹出
			var tel = $('.mobile').eq(1).val();
			var pwd = $('.password').eq(1).val();
			//console.log(_name);不可以显示
			//console.log(_password);
			setCookie('tel', tel, 100);
			setCookie('pwd', pwd, 100);
	
			$('.register_submit').submit();
			alert('恭喜，注册成功')
		}else {
			alert('注册失败');
			return false;//表单不提交

		}
		
	})

	//用户登录，获取cookie
	$('.login_submit').click(function () {

		var tel = $('.mobile').eq(0).val();
		var pwd = $('.password').eq(0).val();
	    if(tel == getCookie('tel') && pwd == getCookie('pwd')){
	    	$('.login_submit').submit();
	    }else{
	    	alert('用户名或密码错误');
	    	return false;//表单不提交
	    }


	})
	



	





 })//终结

window.onload = function () {
	 var btn = document.getElementById("btn");

	btn.onclick = function() {
        var oDiv = document.getElementById("div1");
        var str = "abcdefghigklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        var code = "";
        for( var i = 0; i < 4; i ++){
            //获取字符串下标的随机数
            var s = parseInt(Math.random()*str.length);
            //通过下标取得字符串的内容
            code += str[s];
        }
        oDiv.innerHTML = code;
    }


}
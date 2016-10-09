 // 回到顶部的操作
    window.onscroll = function(){

        //获取当前滚动条距离顶部的距离
        var t = document.documentElement.scrollTop || document.body.scrollTop || 0;
        var oTop = document.getElementsByClassName("go_top")[0];

        // 判断
        if (t > 500) {
            oTop.style.display = "block";
        } else {
            oTop.style.display = "none";
        }

        var  goTop_timer;
        oTop.onclick = function() {

            clearInterval(goTop_timer);

            goTop_timer = setInterval(function() {
                // 1. 获取当前值
                var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

                // 2. 给定一个速度
                var iSpeed = (0 - scrollTop) / 8;
                iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);

                // 3. 判断临界值
                if (scrollTop == 0) {
                    clearInterval(goTop_timer);

                    return;
                }

                // 4. 运动
                document.documentElement.scrollTop = document.body.scrollTop = scrollTop + iSpeed;

            }, 100);

        }


        var hideTop = $('.detail_content_title').offset().top;
        var saleTop = $('.detail_info').offset().top;
        //console.log(hideTop);
        if(t > hideTop){
            $('.hide').show().fadeIn(600);
        }else{
            $('.hide').hide().fadeOut(600);
        }

        if(t > saleTop){
            $('.hide').find('li').removeClass('active');
            $('.hide').find('li').eq(1).addClass('active');
        }else{
            $('.hide').find('li').removeClass('active');
            $('.hide').find('li').eq(0).addClass('active');
        }

        // $('.hide li').click( function () {
        //     var index = $(this).index();

        //     $('.hide').find('li').removeClass('active');
        //     $(this).addClass('active');

        //     if( index == 0){
        //         var _top = $('.big_pic').offset().top;//商品信息
        //     }

        //     if( index == 1) {
        //         var _top = $('.detail_info').offset().top;
        //     }

        //     $('body').animate({'scrollTop': _top}, 500);


        // })


    }




    $(function () {

        //关闭注册提示
        var $x_close = $('.x_close');
        var $new_register = $('.new_register');
        $x_close.click(function () {
            $new_register.css('display','none');
        });

        //消费者告知书
        $('.ico_info').hover( function () {

            $('.textnotes').show();
        }, function () {
            $('.textnotes').hide();
        })

        //商品信息和商品参数的top切换
        $('.detail_content_title li').click( function () {

            var index = $(this).index();

            $('.detail_content_title li').removeClass('title_selected');
            $(this).addClass('title_selected');
            
            if( index == 0){
                var _top = $('.big_pic').offset().top;//商品信息
            }

            if( index == 1) {
                var _top = $('.detail_info').offset().top;
            }

            $('body').animate({'scrollTop': _top}, 500);

        })

        //计算总价格
        $('#qty').blur( function () {
            
            //获取价格字符串
            var strPrice = $('.goods_price dd div').text();
            var price = Number(strPrice.slice(1));
            
            //获取数量字符串
            var strNum = $('#qty').val();
            var num = Number(strNum);

            //计算总的价格
            var totalPrice = num*price;
            $('.allPrice span').text(totalPrice);

        })

 






    })//终结括号



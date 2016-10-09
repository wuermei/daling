  //轮播图
    onload = function() {

            var oLubo = document.getElementsByClassName('lubo')[0];
            var aLi = oLubo.getElementsByTagName('li');

            var oBtns = document.getElementsByClassName('btn')[0];
            var aBtn = oBtns.getElementsByTagName('li');

            // 1. 复制
            oLubo.innerHTML += oLubo.innerHTML;

            // 2. 获取一张图片的宽度，并设置当前显示图片的下标 ,设置UL的宽度
            var iWidth = aLi[0].offsetWidth;
            var i = 0;
            oLubo.style.width = aLi.length * iWidth + 'px';

            // 3. 设置定时器，隔3秒切换
            var timer = setInterval(move, 3000);

            // 4. 切换的效果函数
            function move() {
                i++;
                var iLeft = -i * iWidth;
                startMove(oLubo, 'left', iLeft, next);

                // 切换时按钮高亮效果跟着切换
                for (var j = 0; j < aBtn.length; j++) {
                    if (i == j) {
                        aBtn[j].className = 'z-act';
                    } else {
                        aBtn[j].className = '';
                    }
                }
                if (i >= aLi.length / 2) {
                    aBtn[0].className = 'z-act';
                }

            }

            // 5. 回调函数。。当是第4张的时候立即换成第一张
            function next() {
                if (i >= aLi.length / 2) {
                    oLubo.style.left = 0;
                    i = 0;
                }
            }

            // 按钮点击事件
            for (var j = 0; j < aBtn.length; j++) {

                aBtn[j].index = j
                aBtn[j].onclick = function() {
                    i = this.index - 1;
                    btnMove();
                }
            }

            // 按钮点击或者上下翻页时调用的。会首先清除默认的定时器。再生成定时器
            function btnMove() {
                move();

                clearInterval(timer);
                timer = setInterval(move, 3000);
            }

            window.onblur = function() {
                clearInterval(timer);
            }

            window.onfocus = function() {
                clearInterval(timer);
                timer = setInterval(move, 3000);
            }

    }//结束括号
    

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


    }



    $(function () {
        
        //关闭广告
        var $close = $('.x');
        var $ad = $('.ad');
        $close.click(function () {
            $ad.css('display','none');
        });

        //关闭注册提示
        var $x_close = $('.x_close');
        var $new_register = $('.new_register');
        $x_close.click(function () {
            $new_register.css('display','none');
        });

        //分类显示(菜单栏二级的显示)
        var $dl = $('#sort dl:has(dl)');
        var $dd = $('.category_drop');

        $dl.hover(function () {
            
            var index = $(this).index();
            $dd.eq(index).show();
            $(this).addClass('dl_hover');
           
        
        }, function () {
           
           var index = $(this).index();
            $dd.eq(index).hide();
            $(this).removeClass('dl_hover');
           
        });

        //换一批(切换)
        var $change = $('.change');
        var $c2_1 = $('.c2_1');
        var $c2_2 = $('.c2_2');
        var index = 0;

        $change.click( function () {
            index++;
            var len = $c2_1.length;
          
            if(index == len){
                index = 0;
            }

           $c2_1.hide();
           $c2_1.eq(index).show();
           $c2_2.hide();
           $c2_2.eq(index).show();
           
        });

        //点击加入购物车，小图飞到侧边栏购物车的效果
        function flyFn(){
            var offset = $(".sb_cart").position();  //目标位置
            var left = $('body').width() - $('.sb_cart').width(); //目标宽度
            var n = 0;
            $(".go_cart").click(function(event){
            
                var addcar = $(this);
                //var img = $('.new_img img').attr('src');//获取默认一直是第一张图片的路径
                var img = addcar.siblings().attr('src');//获取当前点击的图片的路径
                var flyer = $('<img class="u-flyer" src="'+img+'">');//创建小图标的的节点
                //$('body').append(flyer);
                n++;
                //console.log(n);
                $('.cart_number').text(n);//设置购物车商品的数量
                $('.cart_count').text(n);
                    flyer.fly({
                        start: {
                            left: event.clientX,
                            top: event.clientY
                        },
                        end: {
                            left: left,
                            top: offset.top,
                            width: 0,
                            height: 0
                        },
                        onEnd: function(){
                            flyer.remove();
                        }
                    });
                
                });
            }
                               
        flyFn();

        
        //大家都说好（tab切换）
        $('.submenu li').click( function () {

            var index = $(this).index();//获取索引值
            
            //按钮高亮
            $('.submenu li').removeClass('active');
            $(this).addClass('active');

            //tab切换
            $('.c3_22').hide();
            $('.c3_22').eq(index).show();

        });

        
        
        //买了又买-->手风琴效果
        $('.c3_3 dl').eq(0).find('dd').hover( function() {
        
            //设置选中dd的大小
            $(this).siblings().removeClass('big');
            $(this).addClass('big');
            
            //设置选中的dd的图片的大小
            $(this).find('div').eq(0).removeClass('dd_img');
            $(this).find('div').eq(0).addClass('dd_img1');

            // 其他节点的图片大小
            $(this).siblings().find('div').eq(0).removeClass('dd_img1');
            $(this).siblings().find('div').eq(0).addClass('dd_img');

        }, function () {
       
            $(this).removeClass('big');
            $(this).find('div').eq(0).removeClass('dd_img1');
            $(this).find('div').eq(0).addClass('dd_img');
            
            //第一个dd的样式默认
            $('.c3_3 dl').eq(0).find('dd').eq(0).addClass('big');
            $('.c3_3 dl').eq(0).find('dd').eq(0).find('div').eq(0).removeClass('dd_img');
            $('.c3_3 dl').eq(0).find('dd').eq(0).find('div').eq(0).addClass('dd_img1');

        });

        $('.c3_3 dl').eq(1).find('dd').hover( function() {
        
            //设置选中dd的大小
            $(this).siblings().removeClass('big');
            $(this).addClass('big');
            
            //设置选中的dd的图片的大小
            $(this).find('div').eq(0).removeClass('dd_img');
            $(this).find('div').eq(0).addClass('dd_img1');

            // 其他节点的图片大小
            $(this).siblings().find('div').eq(0).removeClass('dd_img1');
            $(this).siblings().find('div').eq(0).addClass('dd_img');

        }, function () {
       
            $(this).removeClass('big');
            $(this).find('div').eq(0).removeClass('dd_img1');
            $(this).find('div').eq(0).addClass('dd_img');
            
            //第一个dd的样式默认
            $('.c3_3 dl').eq(1).find('dd').eq(0).addClass('big');
            $('.c3_3 dl').eq(1).find('dd').eq(0).find('div').eq(0).removeClass('dd_img');
            $('.c3_3 dl').eq(1).find('dd').eq(0).find('div').eq(0).addClass('dd_img1');

        });

        $('.c3_3 dl').eq(2).find('dd').hover( function() {
        
            //设置选中dd的大小
            $(this).siblings().removeClass('big');
            $(this).addClass('big');
            
            //设置选中的dd的图片的大小
            $(this).find('div').eq(0).removeClass('dd_img');
            $(this).find('div').eq(0).addClass('dd_img1');

            // 其他节点的图片大小
            $(this).siblings().find('div').eq(0).removeClass('dd_img1');
            $(this).siblings().find('div').eq(0).addClass('dd_img');

        }, function () {
       
            $(this).removeClass('big');
            $(this).find('div').eq(0).removeClass('dd_img1');
            $(this).find('div').eq(0).addClass('dd_img');
            
            //第一个dd的样式默认
            $('.c3_3 dl').eq(2).find('dd').eq(0).addClass('big');
            $('.c3_3 dl').eq(2).find('dd').eq(0).find('div').eq(0).removeClass('dd_img');
            $('.c3_3 dl').eq(2).find('dd').eq(0).find('div').eq(0).addClass('dd_img1');

        });



        //闪购倒计时
        var end = new Date("2016-09-02 15:54:10");

        var timer = setInterval(function() {
            // 每一次定时器都重新获取一下当前时间
            var current = new Date();

            var deta = (end.getTime() - current.getTime()) / 1000;

            if (deta <= 0) {
                // 抢购结束
                clearInterval(timer);

                // 修改按钮颜色不可以抢购
                $('.btn_buy').addClass('btn_buy_no');

                return ;
            }
        
            deta = parseInt(deta);

            // 根据秒数得到相应的小时数 分钟数 秒数
            var hour = parseInt(deta / 3600);
            
            if(hour < 10){
                hour = '0' + hour;
            }

            var mins = parseInt(deta % 3600 / 60);

            if(mins < 10){
                mins = '0' + mins;
            }

            var secs = deta % 60;

            if(secs < 10){
                secs = '0' + secs;
            }

            var str =hour + ":" + mins + ":" + secs;

            $('.timeout span').text(str);

        }, 1000);

        $('.sb_cart').click( function () {

            $('.sidebar_data').animate({'right':'40px'},600);
        })

        $('.login-close').click(function () {
            $('.sidebar_data').animate({'right':'-300px'},600);
        })
        























    





    });//终点括号

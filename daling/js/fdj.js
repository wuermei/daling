
    //放大镜效果
    var Index = {

    dom: {},

    init: function() {
        this.initDom();
        this.bindEvent();
    },

    initDom: function() {
        var dom = this.dom;
        dom.sImg = $('.goods_small'); // 包含小图的那个div
        dom.bImg = $('.bimg'); // 包含大图的那个div
        dom.large = $('.large');   // 放大镜镜片  小方块

    },

    bindEvent: function() {
        var dom = this.dom;
        dom.sImg.hover(function() {
            // 移入
            dom.large.show();
            dom.bImg.show();
        }, function() {
            // 移出
            dom.large.hide();
            dom.bImg.hide();
        })

        // 鼠标在小图div上移动
        dom.sImg.mousemove(function(e) {
            // 由于页面有滚动条，所以要获取的应该是鼠标指针在页面中的距离，而不是鼠标距离可视区域的坐标点
            var $x = e.pageX;
            var $y = e.pageY;

            // 获取小图div距离body的坐标点
            var $l = dom.sImg.offset().left;
            var $t = dom.sImg.offset().top;

            // 镜片的宽或高(包括边框)
            var $w = dom.large.outerWidth() / 2;
            var $h = dom.large.outerHeight() / 2;


            // 将要移动的坐标点
            var $left = ($x - $l - $w);
            var $top = ($y - $t - $h);


            // 不能让它跑出去
            if ($left <= 0) {
                $left = 0;
            } else if ($left >= dom.sImg.width() - $w * 2) {
                $left = dom.sImg.width() - $w * 2;
            }

            if ($top <=0 ) {
                $top = 0;
            } else if ($top >= dom.sImg.height() - $h * 2) {
                $top = dom.sImg.height() - $h * 2;
            }

            //
            // 小图          --  大图
            // 放大镜的镜片  --  bimg

            // 镜片所能移动的一个位置
            var $l_bl = $left / (dom.sImg.width() - $w * 2);
            var $t_bl = $top / (dom.sImg.height() - $h * 2);



            // 大图片显示相应的位置   --- left: top
            var $b_left = (dom.bImg.find('img').width() - dom.bImg.width()) * $l_bl;
            var $b_top = (dom.bImg.find('img').height() - dom.bImg.height()) * $t_bl;



            dom.large.css({'left': $left, 'top': $top});
            dom.bImg.find('img').css({'left': -$b_left, 'top': -$b_top});


            //  x-left               b-left
            // ----------      =   -----------
            // 可移动区域         大图可移动区域

        })
    }
}

$(function() {
    Index.init();
})
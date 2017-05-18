$(function(){


/* menu list */
$('#menu-btn').click(function(event){
     $('.main').toggleClass('translate');
     event.stopPropagation();
     event.cancelBubble=true;
})


$('.main').click(function(){
     $('.main').removeClass('translate');
})

$('.menu-list').click(function(){
     $('.main').addClass('translate');
     event.stopPropagation();
     event.cancelBubble=true;
})

/* cart_list */
calculator();

function calculator(){
    var total=0.00;

    $('.sel .price').each(function(){
        total += parseFloat($(this).val());
    })

    $('.total-price').val(total);
    //$('.total').text('总额： ￥ '+total)
}

$('.cart_list li').click(function(){
     $(this).toggleClass('sel');
     calculator();
})


/* setting */

$('.drop-arrow li').click(function(){
    $(this).children('.drawer').toggle();
    $(this).siblings().children('.drawer').hide();
    $(this).toggleClass('drop');
})

$('.drawer').click(function(){
    $('.drop-arrow li').show();
    event.stopPropagation();
    event.cancelBubble=true;

})

/* detail */

$('.webstore_nav li').click(function(){
    var index = $(this).index();
    $(this).addClass('current').siblings().removeClass('current');
    $('.webstore_content>li').eq(index).show().siblings().hide();
})

$('#screenshoot img').click(function(){
    $(this).clone().addClass('fixed').appendTo('body');
    $('.mask').show();
})

$('.mask').click(function(){
    $('.fixed').remove();
    $('.mask').hide();
})

$('.webstore_content i').click(function(){
     $(this).addClass('sel').siblings().removeClass('sel');
})


$('#size-table').click(function(){
    $('.overlay').show();
    event.cancelBubble=true;
})

$('.main').click(function(){
    $('.overlay').hide();
})


})

/**
 * 检查手机号 
 * @param obj	input表单对象
 */
function MobileRegCheck(str) { 
	var reg= eval("/^1[0-9]{10}$/");
	var flag = reg.test(str); 
	return flag; 
} 
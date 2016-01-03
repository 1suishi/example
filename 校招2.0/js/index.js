var loadImg = function(pics, callback) {
    var index = 0;
    var len = pics.length;
    var img = new Image();
    var progress = function(w) {

    	
    	//$('.loading-progress').animate({width:w});
        $('.loading-progress').animate(
         {width: w}, 100, 'linear', function() {		
            $(".loading-num").html(w);
         });
    }
    var load = function() {
        img.src = pics[index];
        img.onload = function() {
            progress(Math.floor(((index + 1) / len) * 100) + "%");
            index++;
            if (index < len) {
                load();
            } else {
                callback()
            }
        }
        return img;
    }
    if (len > 0) {
        load();
    } else {
        progress("100%");
    }
}

var pics = [
    "./img/1.png",
    "./img/2-2.png",
    "./img/2-4.png",
    "./img/3-2.png"
    // "./img/3-4.png",
    // "./img/4-2.png",
    // "./img/4-4.png",
    // "./img/5-1.png",
    // "./img/5-2.png",
    // "./img/5-3.png"
];
// 调用
document.addEventListener('DOMContentLoaded', function() {
    loadImg(pics, function() {
    	$('.loadPage').hide();
         $('.lazy-load').each(function() {
             $(this).attr('src', $(this).data('src'));
         });
        // setTimeout(function() {
        //     doAnim($('.titleArea'), 'bounceInLeft');
        //     doAnim($(".loadPage"), 'zoomOut', function() {
        //         $(".loadPage").hide();
        //         //第一页动画
        //         doAnim($('.titleArea img.cloud'), 'tada');

        //     });
        // }, 500);
        // setTimeout("play()", 1000);
    });
});









(function(){

var now = { row:1, col:1 }, last = { row:0, col:0};
const towards = { up:1, right:2, down:3, left:4};
var isAnimating = false;

s=window.innerHeight/500;
ss=250*(1-s);

$('.wrap').css('-webkit-transform','scale('+s+','+s+') translate(0px,-'+ss+'px)');

document.addEventListener('touchmove',function(event){
	event.preventDefault(); },false);

$(document).swipeUp(function(){
	if (isAnimating) return;
	last.row = now.row;
	last.col = now.col;
	if (last.row != 5) { now.row = last.row+1; now.col = 1; pageMove(towards.up);}	
})

$(document).swipeDown(function(){
	if (isAnimating) return;
	last.row = now.row;
	last.col = now.col;
	if (last.row!=1) { now.row = last.row-1; now.col = 1; pageMove(towards.down);}	
})

$(document).swipeLeft(function(){
	if (isAnimating) return;
	last.row = now.row;
	last.col = now.col;
	if (last.row>1 && last.row<5 && last.col==1) { now.row = last.row; now.col = 2; pageMove(towards.left);}	
})

$(document).swipeRight(function(){
	if (isAnimating) return;
	last.row = now.row;
	last.col = now.col;
	if (last.row>1 && last.row<5 && last.col==2) { now.row = last.row; now.col = 1; pageMove(towards.right);}	
})

function pageMove(tw){
	var lastPage = ".page-"+last.row+"-"+last.col,
		nowPage = ".page-"+now.row+"-"+now.col;
	
	switch(tw) {
		case towards.up:
			outClass = 'pt-page-moveToTop';
			inClass = 'pt-page-moveFromBottom';
			break;
		case towards.right:
			outClass = 'pt-page-moveToRight';
			inClass = 'pt-page-moveFromLeft';
			break;
		case towards.down:
			outClass = 'pt-page-moveToBottom';
			inClass = 'pt-page-moveFromTop';
			break;
		case towards.left:
			outClass = 'pt-page-moveToLeft';
			inClass = 'pt-page-moveFromRight';
			break;
	}
	isAnimating = true;
	$(nowPage).removeClass("hide");
	
	$(lastPage).addClass(outClass);
	$(nowPage).addClass(inClass);
	
	setTimeout(function(){
		$(lastPage).removeClass('page-current');
		$(lastPage).removeClass(outClass);
		$(lastPage).addClass("hide");
		$(lastPage).find("img").addClass("hide");
		
		$(nowPage).addClass('page-current');
		$(nowPage).removeClass(inClass);
		$(nowPage).find("img").removeClass("hide");
		
		isAnimating = false;
	},600);
}

})();
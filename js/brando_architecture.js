;(function(window,document,$,undefined){

    var brando = {
        init:       function(){
            var that = this;

                that.headerFn();
                that.section01Fn();
                that.section02Fn();
                that.section03Fn();
                that.section04Fn();
                that.section05Fn();
                that.section06Fn();
                that.section07Fn();
                that.section07GalleryFn();
                that.section08Fn();
                that.section09Fn();
                that.section10Fn();
                that.section11Fn();
                that.section12Fn();
                that.section13Fn();
                that.section14Fn();
                that.section15Fn();

        },
        headerFn:   function(){
            var window_ = $(window);
            var smoothBtn = $('.smooth-btn'); 
            var htmlBody = $('html,body');
            var mobileMenu = $('#header .mobile-menu');
            var mobileBtn = $('#header .mobile-btn');
            var header = $('#header');
            var goTop = $('.goTop'); 
            
            var winW = $(window).width();
            var url = null;  
            var t=0;  

                //스무스 스크롤링
                smoothBtn.on({
                    click:  function(event){
                        var that = $(this);

                        event.preventDefault();
                        url = that.attr('href');
                        htmlBody.stop().animate({scrollTop: $( url ).offset().top  }, 600);
                        t=0; 
                        mobileMenu.stop().animate({right:-100+'%'},0); 

                        mobileBtn.removeClass('addClose');                        
                    }
                });

                window_.scroll(function(){
                    if( window_.scrollTop() >= 30 ) {
                        header.addClass('addMobile');
                        goTop.addClass('addGotop');
                    }
                    else{
                        header.removeClass('addMobile');
                        goTop.removeClass('addGotop');
                    }
                });


                window_.resize(function(){
                    winW = window_.width();                    
                    if( winW>990 ){
                        t=0;
                        mobileBtn.removeClass('addClose');
                        mobileMenu.stop().animate({right:-100+'%'},400);
                    }
                });

                //모바일버튼
                mobileBtn.on({
                    click:  function(event){
                        var that = $(this);

                        event.preventDefault();

                        that.toggleClass('addClose');
                        if(t==0){
                            t=1;
                            mobileMenu.stop().animate({right:0},400);
                        }
                        else{
                            t=0;
                            mobileMenu.stop().animate({right:-100+'%'},400);
                        }
                    }
                });


                // 마우스 휠 이벤트
                var _wheelDelta = null;
                var n = $('.wheel-event').length; //15개

                $('.wheel-event').each(function(idx){
                    console.log(idx);
                    $(this).on('mousewheel DOMMouseScroll',function(e){
                            e.preventDefault();

                            if(e.detail){
                                _wheelDelta = e.detail*(-1*40);
                            }
                            else{
                                _wheelDelta = e.originalEvent.wheelDelta;
                            }
                        
                                
                                if( _wheelDelta < 0 ){ 
                                    $('#header').addClass('addMousewheel');
                                    if( idx < n-1 ){
                                        if(idx==n-2){  //마지막 이전 위치이면 
                                            //$('html,body').stop().animate({scrollTop: $('#footer').offset().top },600);
                                            //$('html,body').stop().animate({scrollTop: $('.wheel-event').eq(15).offset().top },600);
                                            $('html,body').stop().animate({scrollTop: $(this).parent().next().offset().top },600);
                                        }
                                        else{
                                            $('html,body').stop().animate({scrollTop: $(this).next().offset().top },600);
                                        }
                                        
                                    }
                                }
                                else{ 
                                    $('#header').removeClass('addMousewheel');
                                    if( idx > 0 ){
                                        if(idx==n-1){ //마지막이면 푸터위치에서 올라갈 떼
                                            //$('html,body').stop().animate({scrollTop: $(this).prev().find('.wheel-evevt').eq(14).offset().top },500);
                                            //$('html,body').stop().animate({scrollTop: $(this).prev().children('.wheel-evevt').eq(14).offset().top },100);
                                            $('html,body').stop().animate({scrollTop: $('#section14').offset().top },400);
                                        }
                                        else{
                                            $('html,body').stop().animate({scrollTop: $(this).prev().offset().top },400);
                                        }
                                    }

                                }

                    });

                }); 



        },
        section01Fn: function(){
            var titleWrap = $('#section01 .title-wrap');
            var section01 = $('#section01');
            var slide = $('#section01 .slide');
            var n = $('#section01 .slide').length-1;  
            var imgH = $('#section01 .hungry img').height();
            var slideWrap = $('#section01');
            var cnt = 0;
            var win = $(window); 
            var winH = 969;
            var imgTop = (winH-imgH)/2;




                setTimeout(resizeFn,100);
                function resizeFn(){
                    winH = win.height();
                        section01.css({ height:winH });
                        section01.css({ height:winH });
                        imgH = titleWrap.height();
                        imgTop = (winH-imgH)/2;
                        titleWrap.css({ top:imgTop });

                    
                }

                win.resize(function(){
                    resizeFn();
                });


                // 페이드 인아웃 효과 슬라이드
                function mainNextSlideFn(){
                    slide.css({zIndex:1});
                    slide.eq(cnt==0?n:cnt-1).css({zIndex:2});
                    slide.eq(cnt).css({zIndex:3}).animate({opacity:0},0).animate({opacity:1},1000); 
                }

                
                //메인 이전 슬라이드
                function mainPrevSlideFn(){
                    slide.css({zIndex:1}).animate({opacity:1},0); 
                    slide.eq(cnt).css({zIndex:2});
                    slide.eq(cnt==n?0:cnt+1).css({zIndex:3}).animate({opacity:1},0).animate({opacity:0},1000);
                }

                //다음 카운트 함수
                function nextCountFn(){
                    cnt++; //0 1 2
                    if(cnt>n){cnt=0;}
                    mainNextSlideFn();
                }
                //이전 카운트 함수
                function prevCountFn(){
                    cnt--; //2 1 0 2 1 0
                    if(cnt<0){cnt=n;}
                    mainPrevSlideFn();
                }


                section01.swipe({
                    swipeLeft:  function(){
                        if( !slide.is(':animated') ){
                            nextCountFn(); //다음카운트
                        }
                    },
                    swipeRight: function(){
                        if( !slide.is(':animated') ){
                            prevCountFn(); //이전카운트
                        }
                    }
                });

                setInterval(nextCountFn,3000);

                //터치 스와이프
                slideWrap.swipe({
                    swipeLeft:function(){
                        nextCountFn();
                    },
                    swipeRight:function(){
                        prevCountFn();
                    }
                });

           


        },
        section02Fn: function(){
        
        },  
        section03Fn: function(){

        },  
        section04Fn: function(){

        },  
        section05Fn: function(){

        },
        section06Fn: function(){

        },
        section07Fn: function(){
            
            var win =$(window);
            var htmlRoot = $('html');
            var winH = $(window).innerHeight();
            var imgWrap = $('.modal .img-wrap');    
            var galleryImgBtn = $('#section07 .gallery-img-btn'); //섹션7
            var arrowLeftBtn = $('.modal .arrow-left-btn')
            var modal = $('.modal'); 
            var imgWrapImg = $('.modal  .img-wrap  img');
            var arrowRightBtnImgBtn = $('.modal .arrow-right-btn, .modal .img-btn');
            var closeBtnImgWrap = $('.modal .close-btn, .modal .img-wrap');

            var fileName = null;
            var endNum  = null;
            var fileNum  = null;

                setTimeout(resizeFn,100);

                function resizeFn(){
                    winH = win.innerHeight();
                     
                    imgWrap.css({ lineHeight:winH + 'px' });
                }    


                win.resize(function(){
                    resizeFn();
                });

                //모달 창 띄우기
                galleryImgBtn.on({
                    click:  function(event){
                        var that = $(this);
                        event.preventDefault();

                        //스크롤바 제어
                        htmlRoot.addClass('addScroll');
                        
                        //파일번호
                        fileName = that.prev('img').attr('src');
                        endNum  = fileName.indexOf('.jpg'); 
                        fileNum = Number(fileName.slice(endNum-2,endNum));

                        //모달창 메인 슬라이드
                        modalSlidefn();
                    }
                });

                function modalSlidefn(){
                    modal.stop().fadeIn(300);
                    imgWrapImg.stop().fadeOut(0).attr('src','./img/section07-modal-img' + fileNum + '.jpg').fadeIn(1000);
                }


                //모달 창 닫기
                closeBtnImgWrap.on({
                    click:  function(){
                        modal.stop().fadeOut(300); 
                        //스크롤바 제어
                        htmlRoot.removeClass('addScroll'); 
                    }
                });

                
                arrowRightBtnImgBtn.on({
                    click:  function(event){
                        event.stopPropagation();

                        fileNum++;
                        if(fileNum>32){
                            fileNum=25;
                        }
                        modalSlidefn();
                    }
                });

                arrowLeftBtn.on({
                    click:  function(){
                        fileNum--;
                        if(fileNum<25){
                            fileNum=32;
                        }
                        modalSlidefn();
                    }
                });
        },
        section07GalleryFn: function(){
            var win = $(window);
            var winW = $(window).innerWidth();
            var n = $('#section07 .gallery li').length; 
            var galleryList = $('#section07 .gallery li');
            var gallery = $('#section07 .gallery');
            var galleryBtn = $('#section06 .gallery-btn');

            var hRate = 475/475; 
            var cols = 4; 
            var rows = Math.ceil(n/cols);           
            var imgW = winW/cols; 
            var imgH = imgW*hRate;
            var hide = [];
            var show = [0,1,2,3,4,5,6,7]; 

                setTimeout(galleryFn,100);
                
                function galleryFn(){
                    
                    winW = win.innerWidth();
                    
                    if( winW > 1200 ){
                        cols = 4; 
                    }
                    else if( winW <= 1200 &&  winW > 980 ){ 
                        cols = 3; 
                    }
                    else if( winW <= 980 &&  winW > 760){ 
                        cols = 2; 
                    }
                    else if( winW <= 760 && winW >=0 ){ 
                        cols= 1; 
                    }
                   
                
                    n = show.length; 
                    rows = Math.ceil(n/cols); 

                    imgW = winW/cols; 
                    imgH = imgW*hRate; 
                    
                        gallery.removeClass('addZoom');
                        galleryList.removeClass('addZoom2');

                        gallery.css({ height:imgH*rows }) 

                        //갤러리 숨김 hide();                        
                        for(var i=0; i<hide.length; i++){
                            galleryList.eq(hide[i]).hide();
                        }
                      

                        //갤러리 보이기 show();
                        var cnt=-1;
                        for(i=0;i<rows;i++){
                            for(j=0;j<cols;j++){
                                cnt++; 
                                if(cnt>=show.length) 
                                break;     
                                galleryList.eq(show[cnt]).show().stop().animate({ top:(imgH*i), left:(imgW*j), width:imgW, height:imgH },300, function(){
                                    galleryList.addClass('addZoom2');
                                });
                            }
                        }  

                        gallery.addClass('addZoom');  

                }


                $(window).resize(function(){
                    galleryFn();
                });

                //갤러리 버튼 
                galleryBtn.each(function(index){
                    var that = $(this);
                    that.on({
                        click:  function(event){
                            event.preventDefault();

                            galleryBtn.removeClass('addNav');
                            that.addClass('addNav');

                            switch(index){
                                case 0:
                                    hide = [];
                                    show = [0,1,2,3,4,5,6,7];
                                    break;
                                case 1:
                                    hide = [0,3,6];
                                    show = [1,2,4,5,7];
                                    break;
                                case 2:
                                    hide = [1,3];
                                    show = [0,2,4,5,6,7];
                                    break;
                                case 3:
                                    hide = [1,2,4,5,6];
                                    show = [0,3,7];
                                    break;
                                default:
                                    hide = [0,2];
                                    show = [1,3,4,5,6,7];
                            }

                            galleryFn(); //갤러리 메인함수 호출 실행

                        }
                    });

                });
        },
        section08Fn: function(){

        },
        section09Fn: function(){

        },
        section10Fn: function(){
            var h2Number = $('#section10 h2'); 
            var cnt = [0,0,0,0];  
            var setId = null;
            var num = [780,987,350,166];
            var s = 10;
            var mSecond = [];
            var win = $(window);   
            var sec09Top = $('#section09').offset().top;   
            var t = 0;

            for(var i=0; i<num.length; i++){
                mSecond[i] = (s/num[i])*1000;
            }
           
            //Scroll Event
            win.scroll(function(){
                if( win.scrollTop() > sec09Top){
                    if(t==0){
                        t=1
                        countFn();
                    }
                }
                else{
                    cnt = [0,0,0,0];
                    t=0;
                }
            });


            function countFn(){
                h2Number.each(function(i){
                    setId = setInterval(function(){
                        cnt[i]++;
                        if(cnt[0]>num[0]){ 
                            clearInterval(setId);
                            
                            h2Number.eq(0).text(num[0]); 
                            h2Number.eq(1).text(num[1]); 
                            h2Number.eq(2).text(num[2]); 
                            h2Number.eq(3).text(num[3]); 
                        }
                        else{
                            h2Number.eq(i).text(cnt[i]);     
                        }
                    },mSecond[i]); 
                });
            }

        },
        section11Fn: function(){

        },
        section12Fn: function(){

        },
        section13Fn: function(){

        },        
        section14Fn: function(){

        },
        section15Fn: function(){
            var setId=0;

 
            //성공메시지 removeClass
            $('#irum').on({
                focus:  function(){
                    $('.success-message').removeClass('addSuccess');
                }
            });


            //AJAX 
            $('#submit').on({
                click:  function(event){ 
                   event.preventDefault(); 
                    //초기화
                    $('.error-message').removeClass('addError');
                    $('.success-message').removeClass('addSuccess');      
                    var irumVal = $('#irum').val();
                    var mailVal = $('#mail').val(); 
                    var interestedVal = $('#interested').val(); 
                    var messageVal = $('#message').val();                 
                    var cnt=0;

                    var regExpName = /^[a-zA-Z|ㄱ-ㅎ|ㅏ-ㅣ|가-힣\s]+$/; 
                    var regExpMail = /^[a-zA-Z0-9]([-_.]?[a-zA-Z0-9])*@[a-zA-Z0-9]([.]?[a-zA-Z])*.[a-zA-Z]{2,3}$/i; 
                    var regExpMessage = /\w/;  



                   // 전송 성공 or 에러 창
                   $('.ajax-loader').addClass('addAjax');
                                      
                   setId = setInterval(function(){
                        cnt++;
                        if(cnt>=1){
                            clearInterval(setId);
                            $('.ajax-loader').removeClass('addAjax'); 
                            formSubmitFn(); 
                        }
                   },1000);     

                            function formSubmitFn(){
                                                                
                                if( regExpName.test( $('#irum').val() ) === false || regExpMail.test( $('#mail').val() ) === false ||  regExpMessage.test( $('#message').val() ) === false ){

                                    if(   regExpName.test($('#irum').val()) === false ){
                                        $('#irum').addClass('addError');
                                    }
                                    else{
                                        $('#irum').removeClass('addError');
                                    }

                                    if(  regExpMail.test($('#mail').val()) === false  ){
                                        $('#mail').addClass('addError'); 
                                    }
                                    else{
                                        $('#mail').removeClass('addError');
                                    }

                                    if(  regExpMessage.test($('#message').val()) === false  ){
                                        $('#message').addClass('addError'); 
                                    }
                                    else{
                                        $('#message').removeClass('addError');
                                    }

                                  
                                    $('.error-message').addClass('addError'); 
                                    return false;
                                }
                                else{
  
                                    $('#irum').removeClass('addError');
                                    $('#mail').removeClass('addError');
                                    $('#message').removeClass('addError');
                                    $('.error-message').removeClass('addError');       
                                    
                                    $('.success-message').addClass('addSuccess');//성공 메시지

                                    //AJAX
                                    $.ajax({ 
                                        url:"./response.php",
                                        type:"post",
                                        data:{ 
                                            irum: irumVal,
                                            mail: mailVal,
                                            interested: interestedVal,
                                            message: messageVal
                                        },
                                        success: function(data){
                                            console.log(data);
                                            
                                            $('.ajax-response').html(data);

                                            $('.success-message').addClass('addSuccess');

                                            $('#irum').val('');
                                            $('#mail').val('');
                                            $('#interested option').eq(0).prop('selected',true); 
                                            $('#message').val('');

                                        },
                                        error: function(){
                                            console.log( 'AJAX 오류!!!' );
                                        }
                                    }); 

                                } 
                            }  
                        
                    
                }
            }); 



        }

    };

    brando.init();


})(window,document,jQuery);
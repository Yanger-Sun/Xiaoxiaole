/**
 * Created by Administrator on 2017/4/1.
 */
//ҳ�����ǰ  ��canvas���Ϊ��Ԫ�صĿ�ߣ�
$(window).ready(function () {
    $("canvas").attr("width",$(".canvasBox").width());
    $("canvas").attr("height",$(".canvasBox").height());
});

$(function(){
    //��ȡ�����Լ�����  ����������

        var canvas = $("canvas")[0];
        var canW = $("canvas").attr("width");
        var canH = $("canvas").attr("height");
        var ctxt = canvas.getContext("2d");
        var squreBox = [];
        var squreW;
        var squreH;
        //��������
        var bj=["image/cake_1.png","image/cake_2.png","image/cake_3.png","image/cake_4.png","image/cake_5.png","image/cake_6.png","image/cake_7.png"];
        var col = 7;
        var row = 7;
        var clickFlag = false;
        var prevX ;
        var prevY ;

    //��ȡÿ�������Ӧ����Ϣ���ɶ���
        function makeSqure(x,y,n,l){
            var squre = {};
            squre.id = l;
            squre.x = x;
            squre.y = y;
            squre.bj = n;       //����ͼ���±�
            squre.state = 1 ;  // 1��ʾ��ʾ״̬   0��ʾ����״̬
            return squre;
        }
        //�����������
        function makeSqureBox() {
            for (var i = 0; i < row; i++) {
                for (var j = 0; j < col; j++) {
                    var n = Math.floor(Math.random() * 7);
                    var newSqure = makeSqure(i, j, n,squreBox.length);
                    squreBox.push(newSqure);
                }
            }
            return squreBox;
        }
        //������ĳ�ʼ��
        function init(){
            squreW = canW/col;
            squreH = canH/row;
            makeSqureBox();
            draw()
       }
        //������
        function drawLine(){
            ctxt.strokeStyle="#fff";
            ctxt.lineWidth="2";
            ctxt.beginPath();
            for (var i = 0; i <= row; i++) {
                ctxt.moveTo(0,i * squreH);
                ctxt.lineTo(canW,i * squreH);
                ctxt.stroke();
            }
            for (var j = 0; j <= col; j++) {
                ctxt.moveTo(j * squreW,0);
                ctxt.lineTo(j * squreW,canH);
                ctxt.stroke();
            }
            ctxt.closePath();
        }
        //������ͼ
        function drawSqure(){
            $.each(squreBox,function (i,v) {
                var x = v.x;
                var y = v.y;
                var bj = v.bj;
                if(v.state == 1){
                    if(bj == 0){
                        creat1(x ,y);
                    }else if(bj == 1){
                        creat2(x ,y);
                    }else if(bj == 2){
                        creat3(x ,y);
                    }else if(bj == 3){
                        creat4(x ,y);
                    }else if(bj == 4){
                        creat5(x ,y);
                    }else if(bj == 5){
                        creat6(x ,y);
                    }else if(bj == 6){
                        creat7(x ,y);
                    }
                }else if(v.state == 0){
                    console.log(x,y);
                    return;
                }
            })
        }
        //��������ͬ����ͼ��
        function creat1(x,y){
            var img1 = new Image();
            img1.src="image/cake_1.png";
            img1.onload=function(){
                ctxt.drawImage(img1,y * squreW,x * squreH,squreW,squreH);
            }
        }
        function creat2(x,y){
            var img2 = new Image();
            img2.src="image/cake_2.png";
            img2.onload=function(){
                ctxt.drawImage(img2,y * squreW,x * squreH,squreW,squreH);
            }
        }
        function creat3(x,y){
            var img3 = new Image();
            img3.src="image/cake_3.png";
            img3.onload=function(){
                ctxt.drawImage(img3,y * squreW,x * squreH,squreW,squreH);
            }
        }
        function creat4(x,y){
            var img4 = new Image();
            img4.src="image/cake_4.png";
            img4.onload=function(){
                ctxt.drawImage(img4,y * squreW,x * squreH,squreW,squreH);
            }
        }
        function creat5(x,y){
        var img5 = new Image();
        img5.src="image/cake_5.png";
        img5.onload=function(){
            ctxt.drawImage(img5,y * squreW,x * squreH,squreW,squreH);
        }
    }
        function creat6(x,y){
        var img6 = new Image();
        img6.src="image/cake_6.png";
        img6.onload=function(){
            ctxt.drawImage(img6,y * squreW,x * squreH,squreW,squreH);
        }
    }
        function creat7(x,y){
        var img7 = new Image();
        img7.src="image/cake_7.png";
        img7.onload=function(){
            ctxt.drawImage(img7,y * squreW,x * squreH,squreW,squreH);
        }
    }
        //�Ի������л���
        function draw(){
        ctxt.clearRect(0,0,canW,canH);
        drawLine();
        drawSqure();
        check();
    }

        function drap(){
            ctxt.clearRect(0,0,canW,canH);
            for(var i=0;i<col;i++){
                var drapArr = $.grep(squreBox,function(v){
                    return v.y== i ;
                });
                for(var j = drapArr.length-1;j>=0;j--){
                    if(drapArr[j].state == 0){
                      var num = j;
                      while(num >=0 && drapArr[num].state == 0){
                          num--;
                      }
                        if(num >= 0){
                            squreBox[drapArr[j].id].state = 1;
                            squreBox[drapArr[j].id].bj = squreBox[drapArr[num].id].bj
                            squreBox[drapArr[num].id].bj = "";
                            squreBox[drapArr[num].id].state = 0;
                        }else{
                            squreBox[drapArr[j].id].state = 1;
                            squreBox[drapArr[j].id].bj =  Math.floor(Math.random() * 7);
                        }
                    }
                }
                var drapArr2 = $.grep(squreBox,function(v){
                    return v.y== i ;
                });
            }
            draw();
        }
        //�Ի������м��
        function check(){
       $.each(squreBox,function(i,v){
           var squre = v;
           if(squre.state == 1){
               var changeArr = checkSqure(squre,col);
               if(changeArr.length > 0){
                   changeArr.push(v);
                   changeState(changeArr);
                   var t =setTimeout(drap,1000);
               }else{
                   return;
               }
           }
       });

    }
        function changeState(arr){
        $.each(arr,function(i,v){
            squreBox[v.id].state = 0;
            squreBox[v.id].bj = "";
        })
    }
        function checkSqure(v){
       var leftArr = checkL(v);      //����������
       var rightArr = checkR(v);
       var topArr = checkT(v);
       var bottomArr = checkB(v);
       var totalArr = [];
       if(leftArr.length + rightArr.length + topArr.length + bottomArr.length >= 8 ){
           totalArr = leftArr.concat(rightArr,bottomArr,topArr)
       }else if(leftArr.length + rightArr.length + topArr.length >= 6 ){
          totalArr = leftArr.concat(rightArr,topArr)
      }else if(leftArr.length + rightArr.length + bottomArr.length >= 6 ){
           totalArr = leftArr.concat(rightArr,bottomArr);
      }else if(leftArr.length + topArr.length >= 4 ){
           totalArr = leftArr.concat(topArr)
       }else if(leftArr.length + bottomArr.length >= 4 ){
           totalArr = leftArr.concat(bottomArr)
       }else if(rightArr.length + topArr.length >= 4 ){
           totalArr = rightArr.concat(topArr)
       }else if(rightArr.length + bottomArr.length >= 4 ){
           totalArr = rightArr.concat(bottomArr)
       }else if(leftArr.length + rightArr.length >= 2 ){
           totalArr = leftArr.concat(rightArr)
       }else if(topArr.length + bottomArr.length >= 2 ){
            totalArr = topArr.concat(bottomArr)
        }
       return totalArr;
    }//���ĳ��С������Χ�Ƿ�������ͼ����
        function checkL(v){
        var leftArr = [];
        var nowSqure = v;
        var nowX = nowSqure.x;
        var nowId = nowSqure.id;
        var compareId = nowId - 1;
        while(squreBox[compareId] && squreBox[compareId].x == nowX && squreBox[compareId].state == 1 ){
            if(squreBox[compareId].bj == nowSqure.bj){
                leftArr.push(squreBox[compareId]);
                compareId--;
            }else{
                break;
            }
        }
            return leftArr;
    }
        function checkR(v){
        var rightArr = [];
        var nowSqure = v;
        var nowX = nowSqure.x;
        var nowId = nowSqure.id;
        var compareId = nowId + 1;
        while(squreBox[compareId] && squreBox[compareId].x == nowX && squreBox[compareId].state == 1 ){
            if(squreBox[compareId] && squreBox[compareId].bj == nowSqure.bj){
                rightArr.push(squreBox[compareId]);
                compareId++;
            }else{
                break;
            }
        }
            return rightArr;
    }
        function checkT(v){
        var topArr = [];
        var nowSqure = v;
        var nowY = nowSqure.y;
        var nowId = nowSqure.id;
        var compareId = nowId - col;
        while(squreBox[compareId] && squreBox[compareId].y == nowY && squreBox[compareId].state == 1 ){
            if(squreBox[compareId].bj == nowSqure.bj){
                topArr.push(squreBox[compareId]);
                compareId = compareId - col;
            }else{
                break;
            }
        }
            return topArr;
    }
        function checkB(v){
        var bottomArr = [];
        var nowSqure = v;
        var nowY = nowSqure.y;
        var nowId = nowSqure.id;
        var compareId = nowId + col;
        while(squreBox[compareId] && squreBox[compareId].y == nowY && squreBox[compareId].state == 1 ){
            if(squreBox[compareId] && squreBox[compareId].bj == nowSqure.bj){
                bottomArr.push(squreBox[compareId]);
                compareId = compareId + col;
            }else{
                break;
            }
        }
            return bottomArr;
    }
        function drapSqure(){

        }
        //��ʼ�����������֣�
        function timer(){
            init();
            check();
        }
        timer();

        $("canvas").on("click",function(e){
            if(clickFlag == false){
                clickFlag = true;
                prevY = Math.floor(e.offsetX / squreW);
                prevX = Math.floor(e.offsetY / squreH);
            }else if(clickFlag){
                var nowY = Math.floor(e.offsetX / squreW);
                var nowX = Math.floor(e.offsetY / squreH);
                if((nowY == prevY && Math.abs(nowX - prevX)==1) || (nowX == prevX && Math.abs(nowY - prevY)==1)){
                    var prevSqure = $.grep(squreBox,function(v){
                        return v.x == prevX && v.y == prevY;
                    });
                    var nowSqure = $.grep(squreBox,function(v){
                        return v.x == nowX && v.y == nowY;
                    });
                    var temp = prevSqure[0].bj;
                    var nowBj = nowSqure[0].bj;
                    squreBox[prevSqure[0].id].bj = squreBox[nowSqure[0].id].bj;
                    squreBox[nowSqure[0].id].bj = temp;
                    draw();
                    check();
                    clickFlag = false;
                }else{
                    clickFlag = false;
                }
            }
        })
    
});

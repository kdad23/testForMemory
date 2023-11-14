// card 為長度為12的NodeList 物件
const card = document.querySelectorAll('.card');
const front = document.querySelectorAll('.card-front');
const back = document.querySelectorAll('.card-back');
const container = document.querySelector('.game-container');
const timeRemaining = document.querySelector('#time-remaining');
const face = document.querySelectorAll('.card-face');

const tagFlip = document.querySelector('#flips');


const clickToStartGame = document.querySelector('.overlay-text');



// 設定撥放音樂
const audio = new Audio("1.mp3");
audio.volume = 0.05;
audio.loop = true;





// 讓 Click to Starts 的大字顯示出來
document.querySelector('#startGame').classList.add('cansee');

document.querySelector('#startGame').addEventListener('click', () => {

    // 洗牌+翻過來讓玩家看牌
    shuffleCard();
    clicking();


    //  開始撥放音樂
    audio.play();
    audio.muted = false;



    // 把 startGame 的大字在畫面上移除
    document.querySelector('#startGame').classList.remove('cansee');




})







// 遊戲開始，就讓Click to Starts的標籤顯示出來
// 玩家點一下螢幕就把Click to Starts的畫面跳掉
// 一開始先執行 開始遊戲的函式啟動遊戲
// startGame();


// function startGame() {



//     //
//     console.log("現在在startGame函式裡面");


//     // 讓startGame 的字體顯示出來
//     document.querySelector('#startGame').classList.add('cansee');


//     // 在startGame 的大字體上加上點擊事件
//     document.querySelector('#startGame').addEventListener('click', () => {

//         // 洗牌+翻過來讓玩家看牌
//         shuffleCard();
//         clicking();




//         setTimeout(() => {
//             // 呼叫倒數計時的函式，開始倒數計時
//             // countDownTime();
//             // console.log('呼叫countDownTime');
//         }, 2500)


//         //  開始撥放音樂
//         audio.play();
//         audio.muted = false;



//         // 把 startGame 的大字體在畫面上移除
//         document.querySelector('#startGame').classList.remove('cansee');




//     })


// }












// console.log(face);
//
// console.log(...Array(card.length).keys());

// Array(card.length)創造1個長度為card.length的空陣列
// card中的元素為名為cell的class 元素

function shuffleCard() 
{
    card.forEach(c => {
        // 產生1個陣列，[0,1,2,3,4,5,6,7,8,9,10,11]
        const num = [...Array(card.length).keys()];
        // console.log(typeof num);
        // console.log(num);
        // console.log(c);

        // 隨機生成 0-11 的數字，生成矩陣的index
        const random = Math.floor(Math.random() * card.length);

        // 將order屬性 設定在名為cell的class 區塊上
        c.style.order = num[random];

    })

}




// 
function clicking() 
{
    // 宣告總翻牌的變數
    let totalOfFlips = 0;



    for (let i = 0; i < card.length; i++) 
    {
        // 一開始，先讓全部的區塊同步顯示正面，過幾秒後全部的區塊同步翻到背面
        // 在front 區塊上新增名為visible的class，讓區塊顯示正面
        card[i].classList.add('visible');
    }


    // 設定讓玩家可以看見卡片幾秒，去記憶卡片的位置，時間到就把牌翻到背面
    let timeoutID = setTimeout(() => {

        for (let i = 0; i < card.length; i++) 
        {
            // 將所有卡片翻到背面，不顯示
            card[i].classList.remove('visible');
        }


        console.log('呼叫countDownTime');
        // 呼叫countDownTime()
        countDownTime();





        // 把牌翻過去的時間設定和倒數
    }, 2500);





    for (let i = 0; i < card.length; i++) {
        // 讓每1個cell 區塊可以點擊
        card[i].addEventListener('click', () => {

            

            // 一按下去，新增 visible，讓區塊朝向正面
            card[i].classList.add('visible');


            // 計算玩家翻過幾次牌
            // 把玩家翻過的牌增加1個名為 nFlips的class標籤
            card[i].classList.add('nFlips');
            // 抓取玩家所有翻過的牌
            const numberFlips = document.querySelectorAll('.nFlips');


            let xxx = numberFlips.length;
            // console.log(`numberFlips.lengthxxx: ${xxx}`)
            // console.log(`totalOfFlips: ${totalOfFlips}`)
            totalOfFlips = totalOfFlips + xxx;
            // console.log(`玩家翻過幾次牌: ${totalOfFlips}`)
            // 將翻過的牌數量印在HTML上
            tagFlip.innerHTML = `${totalOfFlips}`;
            // 馬上把 nFlips 拆掉
            card[i].classList.remove('nFlips');


            // 把總翻牌數印在Victory字出來的畫面上
            document.querySelector('#finallyFlips').innerHTML = `${totalOfFlips}`;

            // 抓取所有 名為visible 的class 標籤
            const filppedCard = document.querySelectorAll('.visible');


            // console.log(filppedCard[0]);
            // console.log(filppedCard[1]);
            // console.log(filppedCard);


            // 當使用者每按滿2張牌時，就做比較
            if (filppedCard.length === 2) {
                // 設定none 的時候牌都不能點擊
                container.style.pointerEvents = 'none'

                // 過秒後才可以繼續翻牌
                setTimeout(() => {
                    container.style.pointerEvents = 'auto';
                    // console.log("當使用者每按滿2張牌時，就做比較setTimeout執行次數");

                    card.forEach(function (x) {
                        x.classList.remove('visible');
        
                    });





                }, 399)

                // 呼叫比對的函式
                match(filppedCard[0], filppedCard[1]);




            }




        })



    }



}












// 比對的函式
function match(cardOne, cardTwo) {

    // console.log("執行match");

    if (cardOne.dataset.index === cardTwo.dataset.index) 
    {

        console.log('進到2張卡片相等的if判斷式')
        // 因為visible 會在clicking() 函式中用來抓取，所以這裡必須先把visible拆掉
        cardOne.classList.remove('visible');
        cardTwo.classList.remove('visible');

        // 配對成功，就在配對成功的區塊上新增名為match 的class選擇器，讓配對的區塊顯示正面
        cardOne.classList.add('match');
        cardTwo.classList.add('match');
        // console.log("配對成功");
        // console.log(card);

        cardOne.classList.add('matched');
        cardTwo.classList.add('matched');

        cardOne.classList.remove('visible');
        cardTwo.classList.remove('visible');

        card.forEach(function (x) {
            x.classList.remove('visible');

        });






        if (document.querySelectorAll('.visible').length === 1) {
            card.forEach(function (x) {
                x.classList.remove('visible');

            });

            cardTwo.classList.remove('visible');
            cardOne.classList.remove('visible');

            document.querySelector('.visible').classList.remove('visible');


            document.querySelectorAll('.visible').forEach(function (x) {
                x.classList.remove('visible');
                return;

            });

            console.log('317')


        }




        // 當16張牌都配對完之後，就把Victory印出來
        else if (document.getElementsByClassName('match').length === 16) {

            // 設定音樂靜音
            audio.muted = true;



            // 讓 Victory的字顯現出來
            document.querySelector('#victory-text').classList.add('cansee');

            console.log('Victory的字顯現出來');

            // 玩家點一下螢幕就把victory的畫面跳掉
            document.querySelector('#victory-text').addEventListener('click', () => {
                // 讓Victory 的字消失
                document.querySelector('#victory-text').classList.remove('cansee');

                console.log('讓victory的字消失');

                // 讓螢幕上計算Flips的計數器歸0
                tagFlip.innerHTML = `0`;

                timeRemaining.innerHTML = `0`;

                






                // 拆掉match，讓牌可以轉回去，顯示背面
                card.forEach(function (x) {
                    x.classList.remove('match');

                })
                card.forEach(function (x) {
                    x.classList.remove('visible');

                })
                card.forEach(function (x) {
                    x.classList.remove('matched');

                })

                // Victory後呼叫遊戲開始的函式，重新開始遊戲
                // startGame();
                console.log('在victory裡面呼叫starGame函式')



                document.querySelector('#startGame').classList.add('cansee');



            })


        }






    }




    // 沒有配對成功，就把 card上的visible取消掉
    else if (cardOne.dataset.index != cardTwo.dataset.index) {
        console.log('2張卡片並不相等的if判斷式');
        console.log(document.querySelectorAll('.visible').length);

        setTimeout(() => {

            // 移除visible，讓區塊不要呈現正面
            if (document.querySelectorAll('.visible').length === 2) 
            {
                cardOne.classList.remove('visible');
                cardTwo.classList.remove('visible');
                console.log('沒有配對成功執行setTimeout的次數')
            }


        }, 390);

    }






}



// 宣告
var timer=777;



// 倒數計時的函式

function countDownTime() {

    console.log('進到countDownTime裡面');
    // 設定開始要倒數計時的時間
    let countdownTime = 100;



    // 進度條的
    var elem = document.getElementById("myBar");
    var width = 100;


    var temp=true;





    function console1() 
    {


        //  進度條的
        width--;
        elem.style.width = `${width}%`;

        countdownTime--;
        // console.log('倒數計時');
        // console.log(`裡面的倒數計時${countdownTime}`);
        timeRemaining.innerHTML = `${countdownTime}`;



        if (countdownTime == 0) {
            // clearInterval(stopsetInterval);

            // 讓執行 console1() 的if判斷式不能執行
            temp=false;


            

            

            // 設定音樂靜音
            audio.muted = true;


            console.log('遊戲時間結束')


            // 遊戲時間結束，就讓GameOver的標籤顯示出來
            document.querySelector('#game-over-text').classList.add('cansee');
            
            // 玩家點一下螢幕就把GameOver的畫面跳掉
            document.querySelector('#game-over-text').addEventListener('click', () => {
                // 讓GameOver的畫面消失
                document.querySelector('#game-over-text').classList.remove('cansee');


                card.forEach(function (x) {
                    x.classList.remove('visible');

                })

                card.forEach(function (x) {
                    x.classList.remove('match');

                })

                card.forEach(function (x) {
                    x.classList.remove('matched');

                })



                console.log('在countdownTime==0裡呼叫startGame');


                // 讓 Click to Srarts 的大字顯示出來
                document.querySelector('#startGame').classList.add('cansee');





            })








        }


        else if (document.querySelectorAll('.match').length == 16) 
        {
            
            // 讓執行 console1() 的if判斷式不能執行
            temp=false;

        
            // 設定音樂靜音
            audio.muted = true;
            

        }









        if (timer) 
        {
            clearTimeout(timer);
            // console.log('timer裡面');
        }

        timer = setTimeout(function () {

            console.log('setTimeout裡面');


            if(temp)
            {
                console1();

            }




        }, 1000);
    }

   
    console1();







}



















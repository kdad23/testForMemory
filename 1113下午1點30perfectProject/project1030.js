// card 為長度為12的NodeList 物件
const card = document.querySelectorAll('.card');
const front = document.querySelectorAll('.card-front');
const back = document.querySelectorAll('.card-back');
const container = document.querySelector('.game-container');
const timeRemaining = document.querySelector('#time-remaining');
const face = document.querySelectorAll('.card-face');

const tagFlip = document.querySelector('#flips');


const clickToStartGame = document.querySelector('.overlay-text');






  function playAudio() {
    const audio = new Audio("https://raw.githubusercontent.com/WebDevSimplified/Mix-Or-Match/master/Assets/Audio/creepy.mp3");
    audio.play();
  }















// 遊戲開始，就讓Click to Starts的標籤顯示出來
// 玩家點一下螢幕就把Click to Starts的畫面跳掉
// 一開始先執行 開始遊戲的函式啟動遊戲
startGame();

function startGame()
{
   

    console.log("計算startGame執行幾次");
    suffleImage();
    clicking();

    console.log(document.querySelector('#startGame'));

    document.querySelector('#startGame').classList.add('visible');

    console.log(document.querySelector('#startGame'));


    document.querySelector('#startGame').addEventListener('click', () => {

        playAudio();

        document.querySelector('#startGame').classList.remove('visible');


        console.log(document.querySelector('#startGame'));

    
        // 開始倒數計時
        countDownTime();
        console.log(111111111111);
    
    })

}












// console.log(face);
//
// console.log(...Array(card.length).keys());

// Array(card.length)創造1個長度為card.length的空陣列
// card中的元素為名為cell的class 元素
// suffleImage();
function suffleImage() {
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




// 設定讓
function clicking() 
{

    let totalOfFlips = 0;


    for (let i = 0; i < card.length; i++) {
        // 一開始，先讓全部的區塊同步顯示正面，過幾秒後全部的區塊同步翻到背面
        // 在front 區塊上新增名為show 的class，讓區塊顯示正面
        card[i].classList.add('visible');


        let timeoutID = setInterval(() => {
            // front[i].classList.remove('visible');
            // back[i].classList.remove('visible');
            card[i].classList.remove('visible');
            console.log("51行setInterval執行次數");
            clearInterval(timeoutID);
        }, 1000);

        // clearInterval(timeoutID);


        // 讓cell 區塊可以點擊
        card[i].addEventListener('click', () => {

            // 一按下去，馬上在front 的區塊新增 flip ，讓區塊朝向正面
            card[i].classList.add('visible');

            console.log("新增第1個visible");

            // 計算玩家翻過幾次牌
            // 把玩家翻過的牌增加1個名為 nFlips的class標籤
            card[i].classList.add('nFlips');
            // 抓玩家
            const numberFlips = document.querySelectorAll('.nFlips');
            

            let xxx = numberFlips.length;
            totalOfFlips = totalOfFlips + xxx;
            console.log(`玩家翻過幾次牌: ${totalOfFlips}`)
            // 將翻過的牌數量印在HTML上
            tagFlip.innerHTML = `${totalOfFlips}`;
            // 馬上把 nFlips 拆掉
            card[i].classList.remove('nFlips');

            // 將玩家翻過設定visible，牌才可以翻過來
            const filppedCard = document.querySelectorAll('.visible');
       



            // 當使用者每按滿2張牌時，就做比較
            if (filppedCard.length === 2) {
                // 設定none 的時候牌都不能點擊
                container.style.pointerEvents = 'none'

                // 過0.7秒後才可以繼續翻牌
                setTimeout(() => {
                    container.style.pointerEvents = 'auto';
                    console.log("setTimeout執行次數");

                }, 700)

                // 呼叫比對的函式
                match(filppedCard[0], filppedCard[1]);

            }

        })
    }


    


}






// 比對的函式
function match(cardOne, cardTwo) {

    console.log("執行match");

    if (cardOne.dataset.index == cardTwo.dataset.index) {
       

        // 因為visible 會在clicking() 函式中用來抓取，所以這裡必須先把visible拆掉
        cardOne.classList.remove('visible');
        cardTwo.classList.remove('visible');

        // 配對成功，就在配對成功的區塊上新增名為match 的class選擇器，讓配對的區塊顯示正面
        cardOne.classList.add('match');
        cardTwo.classList.add('match');
        console.log("配對成功");
        console.log(card);
        
        cardOne.classList.add('matched');
        cardTwo.classList.add('matched');




       // 當16張牌都配對完之後，就把Victory印出來
        if (document.querySelectorAll('.match').length == 16) 
        {
            // 
            document.querySelector('#finallyFlips').innerHTML=tagFlip.innerHTML;


            // 讓 Victory的字顯現出來
            document.querySelector('#victory-text').classList.add('visible');

            // 玩家點一下螢幕就把victory的畫面跳掉
            document.querySelector('#victory-text').addEventListener('click', () => {
                document.querySelector('#victory-text').classList.remove('visible');

                // 讓螢幕上計算Flips的計數器歸0
                tagFlip.innerHTML = `0`;

                
               // 拆掉match，讓牌可以轉回去，顯示背面
                card.forEach( function(x){
                    x.classList.remove('match');
                    
                } )
                
                // 呼叫遊戲開始的函式，重新開始遊戲
                startGame();


            })
            

        }




    }  // 沒有配對成功，就把 card上的visible取消掉
    else {
        setTimeout(() => {
            // 去除 flip ，讓區塊不要呈現正面
            cardOne.classList.remove('visible');
            cardTwo.classList.remove('visible');
        }, 800);



    }


}


// 倒數計時的函式

function countDownTime() {
    // 設定開始要倒數計時的時間
    let countdownTime = 101;

    let exitInterval = setInterval(() => {

        

        countdownTime--;
        console.log(`裡面的倒數計時${countdownTime}`);
        timeRemaining.innerHTML = `${countdownTime}`;


        // while(countdownTime>0)
        // {

        //     timeRemaining.innerHTML=countdownTime.toString();
        // }
        
        // 如果遊戲時間結束
        if (countdownTime === 0) 
        {
            
            console.log('遊戲時間結束')


            // 遊戲時間結束，就讓GameOver的標籤顯示出來
            document.querySelector('#game-over-text').classList.add('visible');
            // 玩家點一下螢幕就把GameOver的畫面跳掉
            document.querySelector('#game-over-text').addEventListener('click', () => {
                document.querySelector('#game-over-text').classList.remove('visible');



                // setTimeout(() => {
                //     document.querySelector('#startGame').classList.add('visible'); 
                //     console.log("314行的 seTimeout")
                // }, 500);

                startGame();





            })

            clearInterval(exitInterval);
            console.log("執行exitInterval");



        }
        else if(document.querySelectorAll('.match').length == 16)
        {
            clearInterval(exitInterval);
        }





    }, 1000);
}
// console.log(`外面的倒數計時${countdownTime}`);



// console.log(document.querySelectorAll('.match'));


// if (document.querySelectorAll('.match').length == 16)
// {

//     document.querySelector('#victory-text').classList.add('visible');
//     // 玩家點一下螢幕就把victory的畫面跳掉
//     document.addEventListener('click', () => {
//         document.querySelector('#victory-text').classList.remove('visible');
//     })

// }












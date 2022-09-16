// 1. 當關卡數到第x關時，變成a*a的格局
    // 2. 當正確答案按下時，換到下一關(分數++)
    //  2.1 生成新的點擊區塊，用random將其中一塊變顏色
    //  2.2 將答案的那一塊給予標籤/陣列/索引
    // 3. 倒數計時功能
    //  3.1 設置遊戲時間，開始按鈕按下時開始倒數
    //  3.2 時間到時，停止計時並彈出結果視窗
    //  3.3 按下重製按鈕，切換到遊戲畫面(分數、時間重製)
    
    const START_PAGE = document.querySelector('.start-page');
    const START_BTN = document.querySelector('.start-btn');
    const PLAY_PAGE = document.querySelector('.play-page');
    const PLAY_GROUND = document.querySelector('.playground');
    const FOOTER = document.querySelector('.footer');
    const TIME_REMAIN = document.querySelector('.time-remain');
    const TIME_PAUSE = document.querySelector('.pause');
    const HINT = document.querySelector('.hint');
    const MODAL = document.querySelector('.result-modal');
    const STATUS = document.querySelector('.status');
    const RESTART = document.querySelector('.restart');

    let stage = 1;
    let score = 0;
    let set_time = 30;
    let patterns = [4, 16, 25];
    var timer; // declair timer as global variable 

    PLAY_PAGE.classList.add('display-none');
    MODAL.classList.add('display-none');
    // Start Game 
    START_BTN.onclick = () => {
      START_PAGE.classList.add('display-none');
      PLAY_PAGE.classList.remove('display-none');
      runGame();
    }

    function runGame() {
      FOOTER.children[0].innerHTML = `剩餘時間：${set_time}`;
      timer = setInterval(() => {
        // time decrease
        set_time--;
        FOOTER.children[0].innerHTML = `剩餘時間：${set_time}`;
        if (set_time < 0) {
          clearInterval(timer);
          showModal();
        }
      }, 1000);
      showField();
    }
    
    // Click on answer
    function goal(n) {
      if(n) {
        stage++;
        score++;
        showField();
      }else {
        score--;
        PLAY_PAGE.children[0].innerHTML = `分數：${score}`;
      }
    }
    // Display cubes 
    function showField() {  
      
      PLAY_PAGE.children[0].innerHTML = `分數：${score}`;
      PLAY_GROUND.innerHTML = "";
      PLAY_GROUND.classList.remove('size-p1');
      PLAY_GROUND.classList.remove('size-p2');
      PLAY_GROUND.classList.remove('size-p3');
      let answer;
      if (score < 5 && stage <= 5) {
        let h = Math.floor(Math.random()*360);
        let s = Math.floor(Math.random()*100);
        let l = Math.floor(Math.random()*90+10);
        let color = ` hsl(${h},${s}%,${l}%)`;
        let color_mod = ` hsl(${h},${s}%,${(l-10-Math.random()*2).toFixed(0)}%)`;
        answer = Math.floor(Math.random()*patterns[0]);
        PLAY_GROUND.classList.add('size-p1');
        for (let i = 0; i < patterns[0] ; i++) {
          if (i == answer) {
            PLAY_GROUND.innerHTML += '<div class="size-1 answer" onclick="goal(1)"></div>';
            PLAY_GROUND.children[i].style.background = color_mod;
          }else {
            PLAY_GROUND.innerHTML += '<div class="size-1" onclick="goal(0)"></div>';
            PLAY_GROUND.children[i].style.background = color;
          }
        }
      }else if (5 <= score && score < 10 && stage > 5) {
        let h = Math.floor(Math.random()*360);
        let s = Math.floor(Math.random()*100);
        let l = Math.floor(Math.random()*90+10);
        let color = ` hsl(${h},${s}%,${l}%)`;
        let color_mod = ` hsl(${h},${s}%,${(l-5-Math.random()*2).toFixed(0)}%)`;
        answer = Math.floor(Math.random()*patterns[1]);
        PLAY_GROUND.classList.add('size-p2');
        for (let i = 0; i < patterns[1] ; i++) {
          if (i == answer) {
            PLAY_GROUND.innerHTML += '<div class="size-2 answer" onclick="goal(1)"></div>';
            PLAY_GROUND.children[i].style.background = color_mod;
          }else {
            PLAY_GROUND.innerHTML += '<div class="size-2" onclick="goal(0)"></div>';
            PLAY_GROUND.children[i].style.background = color;
          }
        }
      }
      else {
        let h = Math.floor(Math.random()*360);
        let s = Math.floor(Math.random()*100);
        let l = Math.floor(Math.random()*90+10);
        let color = ` hsl(${h},${s}%,${l}%)`;
        let color_mod = ` hsl(${h},${s}%,${(l-2-Math.random()*3).toFixed(0)}%)`;
        answer = Math.floor(Math.random()*patterns[2]);
        PLAY_GROUND.classList.add('size-p3');
        for (let i = 0; i < patterns[2] ; i++) {
          if (i == answer) {
            PLAY_GROUND.innerHTML += '<div class="size-3 answer" onclick="goal(1)"></div>';
            PLAY_GROUND.children[i].style.background = color_mod;
          }else {
            PLAY_GROUND.innerHTML += '<div class="size-3" onclick="goal(0)"></div>';
            PLAY_GROUND.children[i].style.background = color;
          }
        }
      }
    }
    function showModal() {
      // 
      if (score<0) {
        STATUS.innerHTML = "再接再厲囉";
      }else if (score>0 && score<15) {
        STATUS.innerHTML = "可以再加把勁";
      }else {
        STATUS.innerHTML = "眼明手也快";
      }
      PLAY_PAGE.classList.add('display-none');
      MODAL.classList.remove('display-none');
      MODAL.children[0].innerHTML = `分數：${score}`;
    }
    TIME_PAUSE.addEventListener('click', () => {
      alert('我最討厭像你這種直覺敏銳的小鬼(•ω•`)');
      PLAY_PAGE.children[0].innerHTML = `分數：${score}`;
    });
    RESTART.addEventListener('click', () => {
      stage = 1;
      score = 0;
      set_time = 30;
      PLAY_PAGE.classList.remove('display-none');
      MODAL.classList.add('display-none');
      runGame();
    });
    HINT.addEventListener('click', () => {
      let ans = document.querySelector('.answer');
      ans.classList.add('shadow');
      score--;
      PLAY_PAGE.children[0].innerHTML = `分數：${score}`;
    });
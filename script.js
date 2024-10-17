const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
const minutesSpan = document.getElementById('minutes');
const secondsSpan = document.getElementById('seconds');
const roundInfo = document.getElementById('roundInfo');

const startSound = document.getElementById('startSound');
const finishSound = document.getElementById('finishSound');
const finalSound = document.getElementById('finalSound');

let countdown;
let interval;
let currentRound = 0; // ラウンド回数は無制限でカウントアップ
let countdownDuration = 20 * 60; // 20分（1200秒）ごとにアラーム
let remainingTime;      // 残り時間
let isStopped = false;  // ストップ状態を管理する変数
let totalElapsedTime = 0;  // 累計の経過時間を保存

// 累計の経過時間を更新して表示する関数
function updateElapsedTime() {
    const elapsedMinutes = Math.floor(totalElapsedTime / 60);
    const elapsedSeconds = totalElapsedTime % 60;
    minutesSpan.textContent = String(elapsedMinutes).padStart(2, '0');
    secondsSpan.textContent = String(elapsedSeconds).padStart(2, '0');
}

function startCountdown() {
    if (!remainingTime) {
        remainingTime = countdownDuration;  // 残り時間がない場合は初期値をセット
    }

    roundInfo.textContent = `ラウンド ${currentRound + 1}`; // ラウンド表示を更新

    // カウントダウンスタート時に音を鳴らす
    startSound.play();

    countdown = setInterval(() => {
        if (isStopped) {
            clearInterval(countdown);  // ストップ時はカウントダウンを止める
            return;
        }

        const minutes = Math.floor(remainingTime / 60);
        const seconds = remainingTime % 60;

        minutesSpan.textContent = String(minutes).padStart(2, '0');
        secondsSpan.textContent = String(seconds).padStart(2, '0');

        if (remainingTime === 0) {
            clearInterval(countdown);

            // アラームを鳴らす
            finishSound.play();

            // ラウンドを増やし、再びカウントを開始する
            currentRound++;
            totalElapsedTime += countdownDuration;  // 累計経過時間を更新
            updateElapsedTime();  // 累計経過時間を表示
            remainingTime = countdownDuration;  // 20分のカウントダウンを再スタート
            startCountdown();
        } else {
            remainingTime--;
            totalElapsedTime++;  // 累計時間を1秒ずつ更新
        }
    }, 1000);
}

// スタートボタンの動作
startButton.addEventListener('click', () => {
    isStopped = false;  // ストップ状態を解除
    clearInterval(countdown);  // スタートを押すたびにタイマーをリセット
    startCountdown();  // 残り時間から再開
});

// ストップボタンの動作
stopButton.addEventListener('click', () => {
    isStopped = true;  // ストップ状態にする
    clearInterval(countdown);  // カウントダウンを停止
});

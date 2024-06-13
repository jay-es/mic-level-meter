// @ts-check
const stream = await navigator.mediaDevices.getUserMedia({
  audio: true,
  video: false,
});

// AudioContext を作成
const audioContext = new AudioContext();
const analyser = audioContext.createAnalyser();
const microphone = audioContext.createMediaStreamSource(stream);

// AnalyserNode を設定
analyser.fftSize = 256;
const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);

// マイク入力を AnalyserNode に接続
microphone.connect(analyser);

// 音量データを取得し、可視化
function loop() {
  analyser.getByteTimeDomainData(dataArray);

  // ここでデータを処理して可視化
  let sum = 0;
  for (let i = 0; i < bufferLength; i++) {
    sum += dataArray[i];
  }
  const average = sum / bufferLength;
  const volume = Math.max(0, (average - 128) * 2); // 0〜128 の範囲に正規化

  console.log("音量:", volume); // 音量をコンソールに出力（ここを可視化に置き換え）
}

// requestAnimationFrame(loop);
setInterval(loop, 100);

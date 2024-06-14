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
analyser.minDecibels = -60; //default: -100
analyser.maxDecibels = -25; //default: -30
analyser.fftSize = 256;
const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);

// マイク入力を AnalyserNode に接続
microphone.connect(analyser);

// 描画対象の要素と個数を取得
const boxes = document.querySelectorAll(".led");
const levels = boxes.length;

// 音量データを取得し、可視化
function draw() {
  analyser.getByteFrequencyData(dataArray);

  const max = Math.max(...dataArray);
  const normalizedVolume = Math.floor((max / 255) * levels);

  Array.from(boxes).forEach((el, i) => {
    el.classList.toggle("off", levels - i > normalizedVolume);
  });
}

setInterval(draw, 100);

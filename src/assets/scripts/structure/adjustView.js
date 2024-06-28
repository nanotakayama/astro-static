/**
 * ウィンドウの横幅と高さをCSS変数として設定する関数。
 * これにより、CSS内でviewportの高さ(vh)や横幅(vw)を変数として利用できるようになります。
 */
!(function () {
  // 初期のウィンドウの横幅を取得
  let baseVw = window.innerWidth;

  /**
   * viewportの高さをCSS変数として設定する関数。
   */
  const adjustVh = () => {
    const vh = document.documentElement.clientHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };

  /**
   * viewportの横幅をCSS変数として設定する関数。
   */
  const adjustVw = function() {
    const vw = document.documentElement.clientWidth * 0.01;
    document.documentElement.style.setProperty('--vw', `${vw}px`);
  }

  // ウィンドウのサイズが変更されたときのイベントリスナー
  window.addEventListener('resize', () => {
    adjustVw();
    if (baseVw === window.innerWidth) {
      // 画面の横幅に変動がない場合は、高さの再計算をスキップ
      return;
    }
    // 画面の横幅に変動があった場合のみ、高さを再計算
    baseVw = window.innerWidth;
    adjustVh();
  });

  // 初期化時に横幅と高さのCSS変数を設定
  adjustVh();
  adjustVw();
})();


// Usage Examples
// -----------------
// // CSS
// .eml {
//   width: calc(var(--vw) * 100); // 100vw
//   height: calc(var(--vh) * 100); // 100vh
//   width: calc(var(--vw) * 50); // 50vw
//   height: calc(var(--vh) * 80); // 80vh
// }


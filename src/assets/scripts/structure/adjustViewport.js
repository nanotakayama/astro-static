/**
 * 375px以下のデバイス向けにviewportを調整する関数。
 * 375pxより大きいデバイスでは、通常のviewport設定を使用。
 * 375px以下のデバイスでは、viewportの幅を375pxに固定。
 */
!(function () {
  // viewportのmetaタグを取得
  const viewport = document.querySelector('meta[name="viewport"]');

  /**
   * viewportの設定を調整する関数。
   */
  function adjustViewport() {
    // ウィンドウの外部幅が375pxより大きい場合と375px以下の場合で、viewportの設定を変更
    const value =
      window.outerWidth > 375
        ? 'width=device-width,initial-scale=1'
        : 'width=375';

    // 現在のviewportの設定と新しい設定が異なる場合のみ、viewportを更新
    if (viewport.getAttribute('content') !== value) {
      viewport.setAttribute('content', value);
    }
  }

  // ウィンドウのサイズが変更されたときのイベントリスナーを追加
  addEventListener('resize', adjustViewport, false);

  // 初期化時にviewportを調整
  adjustViewport();
})();

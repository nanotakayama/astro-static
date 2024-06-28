import { inView } from "motion";

/**
 * 画面内に要素が表示されたときに特定のクラスを追加するクラス。
 */
export default class InView {
  /**
   * InViewクラスのインスタンスを作成。
   * @param {HTMLElement} el - 監視対象の要素。
   */
  constructor(el) {
    this.elm = el; // 監視対象の要素
    this.init(); // 初期化メソッドを呼び出し
  }

  /**
   * 要素が画面内に表示されたときに「is-inView」クラスを追加する。
   */
  watchItem() {
    inView(this.elm, ({ target }) => {
      target.classList.add('is-inView');
    });
  }

  /**
   * 監視を開始する。
   */
  init() {
    this.watchItem();
  }
}

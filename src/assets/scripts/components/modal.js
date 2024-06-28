import A11yDialog from 'a11y-dialog';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

/**
 * モーダルの動作を管理するクラス。
 */
export default class Modal {
  /**
   * モーダルのインスタンスを作成。
   * @param {HTMLElement} el - モーダルのルート要素。
   */
  constructor(el) {
    this.el = el;
    this.dialog = new A11yDialog(this.el);
    this.init();

    // data-auto-open="true"属性があれば、即時表示
    if (this.el.getAttribute('data-auto-open') === 'true') {
      this.dialog.show();
    }

    // DOMの変更を監視する
    this.observeDOMChanges();
  }

  /**
   * モーダルのイベントを初期化。
   */
  init() {
    this.dialog.on('show', () => {
      this.handleOpen(this.el.id);
      this.el.style.display = 'block';
      this.el.setAttribute('aria-hidden', 'false');
    });

    this.dialog.on('hide', () => {
      this.handleClose(this.el.id);
      this.el.setAttribute('aria-hidden', 'true');
      this.el.addEventListener('animationend', this.handleAnimationEnd);
    });
  }

  /**
   * モーダルが表示されたときのアニメーション終了イベントのハンドラ。
   */
  handleAnimationEnd = () => {
    if (this.el.getAttribute('aria-hidden') === 'true') {
      this.el.style.display = 'none';
    }
    this.el.removeEventListener('animationend', this.handleAnimationEnd);
  }

  /**
   * モーダルを開くときの処理。
   * @param {string} id - モーダルのID。
   */
  handleOpen(id) {
    const scrollCont = document.querySelector(`#${id} .js-modalScroll`);
    const scrollbarWidth = parseInt(window.getComputedStyle(document.body).getPropertyValue('padding-right'));
    document.documentElement.style.setProperty('--scrollbarGap', `${scrollbarWidth}px`);
    if (scrollCont) {
      disableBodyScroll(scrollCont, { reserveScrollBarGap: true });
    }
  }

  /**
   * モーダルを閉じるときの処理。
   * @param {string} id - モーダルのID。
   */
  handleClose(id) {
    const scrollCont = document.querySelector(`#${id} .js-modalScroll`);
    document.documentElement.style.setProperty('--scrollbarGap', '0px');
    if (scrollCont) {
      scrollCont.scrollTop = 0;
      enableBodyScroll(scrollCont);
    }
  }

  /**
   * DOMの変更を監視して、新しく追加されたモーダルを検出。
   */
  observeDOMChanges() {
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.addedNodes && mutation.addedNodes.length > 0) {
          mutation.addedNodes.forEach(node => {
            if (node.nodeType === 1 && node.matches('[data-a11y-dialog]') && node.getAttribute('data-auto-open') === 'true') {
              const newModal = new Modal(node);
              newModal.dialog.show();
            }
          });
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }
}

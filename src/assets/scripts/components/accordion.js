export default class Accordion {
  /**
   * Accordionクラスのインスタンスを作成。
   * @param {HTMLElement} element - アコーディオンのルート要素。
   * @param {Object} options - アコーディオンのオプション。
   */
  constructor(element, options) {
    // デフォルトのオプションとユーザーが指定したオプションをマージ
    const mergedOptions = Object.assign({}, defaultOptions, options);

    // 必須のオプションをチェック
    if (!options.tabs) {
      throw TypeError('"tabs"オプションは必須です');
    }
    if (!options.panels) {
      throw TypeError('"panels"オプションは必須です');
    }

    // タブとパネルの要素を取得
    const tabs = Array.from(element.querySelectorAll(options.tabs));
    const panels = Array.from(element.querySelectorAll(options.panels));

    // イベントハンドラを設定
    const subscriptions = [
      ...tabs.map((tab) => attachEvent(tab, 'click', this.handleTabClick.bind(this)))
    ];

    this.element = element;
    this.tabs = tabs;
    this.panels = panels;
    this.options = mergedOptions;
    this.subscriptions = subscriptions;
    this.expanded = new Set();

    this.prepareAttributes();

    // デバイスに応じてアコーディオンを有効/無効にする
    if (element.hasAttribute('data-device')) {
      const deviceSelect = element.getAttribute('data-device');
      const mq = window.matchMedia("(max-width: 767px)");
      const mqMatch = () => {
        if (mq.matches) {
          if (deviceSelect == 'sp') {
            this.switchOn();
          } else {
            this.switchOff();
          }
        } else {
          if (deviceSelect == 'sp') {
            this.switchOff();
          } else {
            this.switchOn();
          }
        }
      }
      mq.addListener(mqMatch);
      mqMatch();
    }
  }

  /**
   * アコーディオンを無効にする。
   */
  switchOff() {
    this.tabs.forEach((tab, index) => {
      tab.style.pointerEvents = 'none';
      tab.style.cursor = 'default';
      tab.setAttribute('tabindex', '-1');
      this.toggleItem(index, true, { noTransition: true, deviceSwitch: true });
    });
  }

  /**
   * アコーディオンを有効にする。
   */
  switchOn() {
    this.tabs.forEach((tab, index) => {
      tab.style.pointerEvents = '';
      tab.style.cursor = '';
      tab.removeAttribute('tabindex');
      this.toggleItem(index, false, { noTransition: true, deviceSwitch: true });
    });
  }

  /**
   * イベントリスナーを削除して、アコーディオンを破棄する。
   */
  destroy() {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  /**
   * タブがクリックされたときのハンドラ。
   */
  handleTabClick(event) {
    const tab = event.currentTarget;
    const tabIndex = this.tabs.indexOf(tab);
    this.toggleItem(tabIndex, !this.expanded.has(tabIndex));
    event.preventDefault();
  }

  /**
   * アコーディオンの属性を初期化する。
   */
  prepareAttributes() {
    const randomId = 'accordion-' + Math.random().toString(36).slice(2);

    // タブに属性を設定
    this.tabs.forEach((tab, index) => {
      tab.setAttribute('id', `${randomId}-tab-${index}`);
      tab.setAttribute('aria-expanded', 'false');
      tab.setAttribute('aria-controls', `${randomId}-panel-${index}`);
    });

    // パネルに属性を設定
    this.panels.forEach((panel, index) => {
      panel.setAttribute('id', `${randomId}-panel-${index}`);
      panel.setAttribute('aria-hidden', 'true');
      panel.style.display = 'grid';
      panel.style.gridTemplateRows = '0fr';
      panel.children[0].style.overflow = 'hidden';
    });
  }

  /**
   * アイテム（タブとパネル）の開閉を切り替える。
   * @param {number} itemIndex - 切り替えるアイテムのインデックス。
   * @param {boolean} expand - アイテムを展開する場合はtrue、閉じる場合はfalse。
   * @param {Object} [options] - オプション。
   */
  toggleItem(itemIndex, expand, {noTransition = false, deviceSwitch = false} = {}) {
    const isItemExpanded = this.expanded.has(itemIndex);

    if (expand === isItemExpanded) {
      return;
    }

    const updateItemAttribute = (itemIndex, expand) => {
      const targetTab = this.tabs[itemIndex];
      const targetPanel = this.panels[itemIndex];
      targetTab.setAttribute('aria-expanded', String(expand));
      targetPanel.setAttribute('aria-hidden', String(!expand));
      targetPanel.style.gridTemplateRows = expand ? '1fr' : '0fr';
      targetPanel.style.visibility = expand ? 'visible' : 'hidden';
      targetPanel.style.transition = noTransition ?
        '' :
        `grid-template-rows ${this.options.timingFunction} ${this.options.duration}, visibility ${this.options.duration}`;
      this.expanded[expand ? 'add' : 'delete'](itemIndex);
    }

    // 複数選択可能の設定がされていない時は開いているパネルをすべて閉じる
    if (!this.options.openMultiple && !isItemExpanded && !deviceSwitch) {
      this.expanded.forEach((index) => updateItemAttribute(index, false));
    }

    updateItemAttribute(itemIndex, expand);
  }
}

/**
 * イベントリスナーを要素にアタッチし、イベントが発生したときにハンドラを実行する。
 * @param {HTMLElement} element - イベントリスナーをアタッチする要素。
 * @param {string} event - 監視するイベントの名前。
 * @param {Function} handler - イベントが発生したときに実行するハンドラ。
 * @param {Object} [options] - イベントリスナーのオプション。
 * @returns {Object} - イベントリスナーを削除するためのunsubscribeメソッドを持つオブジェクト。
 */
function attachEvent(element, event, handler, options) {
  element.addEventListener(event, handler, options);
  return {
    unsubscribe() {
      element.removeEventListener(event, handler);
    }
  }
}



// Usage Examples
// -----------------
// <ul class="c-accordion js-accordion">
//   <li class="c-accordion__item">
//     <div class="c-accordion__head">
//       <button type="button" class="c-accordion__tab js-accordion-tab">
//         見出し
//         <span class="c-accordion__tabIcon"></span>
//       </button>
//     </div>
//     <div class="c-accordion__panel js-accordion-panel">
//       <div class="c-accordion__panelCont">
//         <p>テキスト</p>
//       </div>
//     </div>
//   </li>
// </ul>

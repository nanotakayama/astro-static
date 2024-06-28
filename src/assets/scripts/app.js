"use strict";
import './structure/adjustView';
import './structure/adjustViewport';
import InView from './components/inView';
// import Accordion from './components/accordion';
// import Modal from './components/modal';
// import Header from './components/header';

document.addEventListener("DOMContentLoaded", () => {

  // スクロール 表示領域にて発火
  const inViewEl = [...document.querySelectorAll('.js-inView')].map(el => {
    return new InView(el);
  });

  // // アコーディオン
  // const accordionEl = [...document.querySelectorAll('.js-accordion')].map(el => {
  //   return new Accordion(el, {
  //     tabs: '.js-accordion-tab',
  //     panels: '.js-accordion-panel'
  //   });
  // });

  // // モーダル
  // const modalEl = [...document.querySelectorAll('[data-a11y-dialog]')].map(el => {
  //   return new Modal(el);
  // });

  // const header = new Header();

});
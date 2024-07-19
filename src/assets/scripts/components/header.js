
export default class Header {
  constructor() {
    this.init()
  }
  init() {
    const button = document.querySelector(".js-hum")
    button.addEventListener('click', function () {
      button.classList.toggle('is-trans')
    });
  }
}
export default class Collapse {
  constructor(el) {
    this.el = el;
    this.button = this.el.querySelector('.collapseButton');
    this.collapse = this.el.querySelector('.collapseBlock');
    this.text = this.el.querySelector('.collapseText');
  }

  init() {
    if (this.collapse.classList.contains('hide')) {
      this.button.onclick = () => {
        this.collapse.classList.remove('hide');
        setTimeout(() => {
          this.collapse.classList.remove('hide');
          this.collapse.classList.remove('collapseBlock_closed');
          this.collapse.classList.add('collapseBlock_opened');
          setTimeout(() => {
            this.text.classList.remove('hide');
            this.init();
          }, 1000);
        }, 1000);
      };
    } else {
      this.button.onclick = () => {
        this.text.classList.add('hide');
        setTimeout(() => {
          this.collapse.classList.add('collapseBlock_closed');
          this.collapse.classList.remove('collapseBlock_opened');
          setTimeout(() => {
            this.collapse.classList.add('hide');
            this.init();
          }, 1000);
        }, 1000);
      };
    }
  }
}

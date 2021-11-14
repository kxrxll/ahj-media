export default class Timeline {
  constructor(el) {
    this.el = el;
    this.form = this.el.querySelector('.timelineForm');
    this.block = this.el.querySelector('.timelineBlock');
    this.popup = this.el.querySelector('.timelinePop');
    this.popupForm = this.el.querySelector('.timelinePopForm');
  }

  init() {
    this.form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      const date = new Date();
      const input = evt.target.querySelector('.timelineInput');
      const text = input.value;
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.getLocation.bind(this));
      }
      if (this.latitude === undefined && this.longitude === undefined) {
        this.popup.classList.remove('hide');
        this.popupForm.addEventListener('submit', this.setLocation.bind(this));
      }
      const newPost = document.createElement('div');
      newPost.classList.add('timelinePost');
      newPost.innerHTML = `
        <p class="timelineDate">${date}</p>
        <p class="timelineText">${text}</p>
        <p class="timelineGeo">${this.geo}</p>
      `;
      input.value = '';
      this.block.appendChild(newPost);
    });
  }

  getLocation(position) {
    this.latitude = position.coords.latitude;
    this.longitude = position.coords.longitude;
    this.geo = `[${this.latitude}, ${this.longitude}]`;
  }

  setLocation(evt) {
    evt.preventDefault();
    const coordsArr = evt.target.querySelector('.timelinePopInput').value.split(' ');
    [this.latitude, this.longitude] = coordsArr;
    this.popup.classList.add('hide');
    this.geo = `[${this.latitude}, ${this.longitude}]`;
  }
}

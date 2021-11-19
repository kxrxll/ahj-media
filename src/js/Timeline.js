export default class Timeline {
  constructor(el) {
    this.el = el;
    this.form = this.el.querySelector('.timelineForm');
    this.block = this.el.querySelector('.timelineBlock');
    this.popup = this.el.querySelector('.timelinePop');
    this.popupForm = this.el.querySelector('.timelinePopForm');
  }

  init() {
    this.form.addEventListener('submit', async (evt) => {
      evt.preventDefault();
      const date = new Date();
      const input = evt.target.querySelector('.timelineInput');
      this.text = input.value;
      const { text } = this;
      input.value = '';
      let geo = '';
      if (navigator.geolocation) {
        let position;
        try {
          position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
          });
        } catch (err) {
          this.popup.classList.remove('hide');
          this.popupForm.addEventListener('submit', this.setLocation.bind(this));
        }
        const { latitude, longitude } = position.coords;
        geo = `[${latitude}, ${longitude}]`;
        const newPost = document.createElement('div');
        newPost.classList.add('timelinePost');
        newPost.innerHTML = `
        <p class="timelineDate">${date}</p>
        <p class="timelineText">${text}</p>
        <p class="timelineGeo">${geo}</p>
      `;
        this.block.appendChild(newPost);
        this.text = '';
      } else {
        this.popup.classList.remove('hide');
        this.popupForm.addEventListener('submit', this.setLocation.bind(this));
      }
    });
  }

  setLocation(evt) {
    evt.preventDefault();
    const date = new Date();
    const { text } = this;
    const coordsArr = evt.target.querySelector('.timelinePopInput').value.split(' ');
    const [latitude, longitude] = coordsArr;
    if (latitude.match(/\w*(-?\[?\d+(\.\d+)?\]?)/) && longitude.match(/\w*(-?\[?\d+(\.\d+)?\]?)/)) {
      this.popup.classList.add('hide');
      const geo = `[${latitude}, ${longitude}]`;
      const newPost = document.createElement('div');
      newPost.classList.add('timelinePost');
      newPost.innerHTML = `
        <p class="timelineDate">${date}</p>
        <p class="timelineText">${text}</p>
        <p class="timelineGeo">${geo}</p>
      `;
      this.block.appendChild(newPost);
      this.text = '';
    }
  }
}

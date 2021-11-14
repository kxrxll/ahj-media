export default class Timeline {
  constructor(el) {
    this.el = el;
    this.form = this.el.querySelector('.timelineForm');
    this.block = this.el.querySelector('.timelineBlock');
  }

  init() {
    this.form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      const date = new Date();
      const input = evt.target.querySelector('.timelineInput');
      const text = input.value;
      let geo = 'unknown';
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          geo = `[${position.coords.latitude}, ${position.coords.longitude}]`;
        });
      }
      const newPost = document.createElement('div');
      newPost.classList.add('timelinePost');
      newPost.innerHTML = `
        <p class="timelineDate">${date}</p>
        <p class="timelineText">${text}</p>
        <p class="timelineGeo">${geo}</p>
      `;
      input.value = '';
      this.block.appendChild(newPost);
    });
  }
}

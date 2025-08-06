class MyComponent extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
        <svg viewBox="0 0 200 100" width="200" height="100">
          <rect x="10" y="10" width="180" height="80" fill="blue"/>
        </svg>`;
  }
}
customElements.define('my-rect', MyComponent);
export const title       = '2) script'
export const description = `Display a web component`;

export async function script () {
  class MyComponent extends HTMLElement {
    constructor() {
      super();
      this.innerHTML = `
        <svg viewBox="0 0 200 100" width="200" height="100">
          <ellipse cx="100" cy="50" rx="100" ry="50" fill="blue"/>
        </svg>`;
    }
  }
  customElements.define('my-component', MyComponent);
}

export default `<my-component></my-component>`;
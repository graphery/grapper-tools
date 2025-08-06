export const title       = '4) custom events'
export const description = `Display event`;
export const events      = ['ready'];

export function script () {
  class MyComponent extends HTMLElement {
    constructor() {
      super();
      this.innerHTML = `
        <svg viewBox="0 0 200 100" width="200" height="100">
          <ellipse cx="100" cy="50" rx="100" ry="50" fill="blue"/>
        </svg>`;
      this.dispatchEvent(new CustomEvent('ready'));
    }
  }
  customElements.define('my-component', MyComponent);
}

export default `<my-component></my-component>`;
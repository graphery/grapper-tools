# ![Grapper](./assets/img/grapper.png) workbench

## Introduction

The **Grapper Workbench** is an integrated environment designed to help developers and designers
perform simulations, visualizations, and case analyses based on the *Grapper* micro-framework and
other related libraries.

This workbench provides an easy-to-use platform for creating test cases and examples, making
interactive components and visualizations straightforward while supporting advanced features like
event handling and dynamic scripting.

---

## Prerequisites

Before installing the package, make sure that:

1. **Node.js** is installed on your system. You can download it
   from [Node.js official website](https://nodejs.org/).
2. **npm (Node Package Manager)** is available (it comes bundled with Node.js).

---

## Installation

To install the Workbench, use the following command in your terminal:

```bash
npm i @grapper/workbench
```

This will download and install the `@grapper/workbench` package using the Node Package Manager
(npm).

---

## How to Use the Workbench

The Grapper Workbench allows you to define cases programmatically using JavaScript modules. A
typical case includes a title, description, HTML content, and optional logic or event handling.

The `g-workshop` tool comes with various options and features, allowing you to configure and run it
effectively. Below is the usage guide for its supported commands and options.

### Usage

``` bash
g-workshop [options]
```

### Options

| Option                           | Description                                      |
|----------------------------------|--------------------------------------------------|
| **`-V, --version` **             | Outputs the version number of the tool.          |
| **`-l, --label <title>` **       | Specifies a title label.                         |
| **`-t, --test <cases-folder>` ** | Folder containing test case files (`.js` files). |
| **`-r, --root <root-folder>` **  | Sets the root folder to be served.               |
| **`-p, --port <server-port>` **  | Specifies the HTTP server port.                  |
| **`-i, --import <module...>` **  | Imports one or more specified modules.           |
| **`-b, --lib <library...>` **    | Imports one or more specified libraries.         |
| **`-s, --silence` **             | Enables silence mode (suppresses output).        |
| **`-h, --help` **                | Displays the help information for the command.   |

## How to Create a Case

Below is the structure of a basic case definition in a JavaScript file:

```js
export const title       = 'title';
export const description = `description`;
export default `<!-- HTML Content -->`;
```

### Explanation

1. **`export const title = 'title';`**:

- It declares the title of the case displayed in the workbench interface.

2. **`export const description = \`description\`;`**:

- It declares a short, descriptive text for the case.

3. **`export default \`content\`;`**:

- It specifies the main HTML content to be rendered in the workbench for the case.

### Additional Features (Optional)

4. **`export script() {}`**:

- A function to include JavaScript that will execute after the HTML content is inserted into the
  workbench page. Useful for adding logic to your use case.

5. **`export const events = true;`**

- It enables the event handler interface for the case.
- You can also specify specific events using `export const events = ['event-name'];` to add events
  handled.

---

## Examples

### 1) Simple Example

This example renders a simple SVG file using a `g-composer` component.

```js
export const title       = '1) Simple example';
export const description = `Display a svg file`;
export default `
  <g-composer svg-src="/test/component/composer/assets/image.svg" 
              style="width: 200px; height: 200px;">
  </g-composer>
`;
```

### 2) Interactive Example

This example demonstrates a case where the visibility of the `g-composer` component can be toggled
dynamically using a button.

```javascript
export const title       = '2) Size: hide and component';
export const description = 'Start with display none and component size by css';

export function script () {
  const container = document.querySelector('#container');
  const show      = document.querySelector('#run');
  show.addEventListener('click', () => {
    if (container.style.display) {
      container.style.display = '';
      show.innerHTML          = 'hide';
    } else {
      container.style.display = 'none';
      show.innerHTML          = 'show';
    }
  });
}

export default `
<div id="container" style="display:none">
  <g-composer style="width: 250px">
    <svg viewBox="0 0 100 100">
      <rect x="0" y="0" width="100" height="100" fill="red"/>
    </svg>
  </g-composer>
</div>
<button id="run">show</button>
`;
```

---

### 3) Handle Events

An advanced example demonstrating event handling for a `g-composer` component. This case listens for
the `intersection.enter` event when the element becomes fully visible in the viewport.

```js
export const title       = '3) Handle events';
export const description = 'You can capture with <code>addEventListener</code> the regular events for Grapper Components and HTMLElements.';
export const events      = ['intersection.enter'];
export default `
<g-composer svg-src="/test/component/composer/assets/check.svg" 
            intersection-ratio="1" 
            style="width: 50px;">
</g-composer>
`;
```

---
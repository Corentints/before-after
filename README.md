# BeforeAfter
![Before After library demo](/docs/assets/demo.png)

Customizable image comparison library

- [BeforeAfter](#beforeafter)
  - [Installation](#installation)
    - [Package manager](#package-manager)
    - [CDN](#cdn)
  - [Basic usage](#basic-usage)
  - [Parameters](#parameters)
  - [Customize](#customize)
    - [Style](#style)
    - [Custom Slider element](#custom-slider-element)
  - [Examples](#examples)

## Installation

### Package manager

```js
// using npm
npm install @corentints/before-after

// using yarn
yarn add @corentints/before-after

// using pnpm
pnpm install @corentints/before-after
```

### CDN

```html
<script src="https://cdn.jsdelivr.net/npm/@corentints/before-after@latest/dist/before-after.umd.min.js"></script>
```

## Basic usage

Set up the HTML:

Just put two images in a div. The first image will automatically be on the left and the second on the right.

```html
<div id="before-after">
  <img src="./assets/before.png" alt="Squirtle" />
  <img src="./assets/after.png" alt="Squirtle with sunglasses" />
</div>
```

```js
// not necessary if you are not using package manager
import BeforeAfter from '@corentints/before-after'

const beforeAfterElement = new BeforeAfter({
  rootElement: document.querySelector("#before-after")
});
```

## Parameters

| Parameter               | Description                                         |           Type |        Default value | Required |
| ----------------------- | --------------------------------------------------- | -------------: | -------------------: | -------: |
| rootElement             | The root element                                    | HTMLDivElement |                    / |      yes |
| allowSlide              | Allow user to drag and slide the slider             |        boolean |                 true |       no |
| allowClick              | Allow user to click in the image to move the slider |        boolean |                 true |       no |
| clickTransition         | Enable transition animation on click                |        boolean |                 true |       no |
| clickTransitionDuration | Set the click transition duration in ms             |         number |                  500 |       no |
| defaultSliderPosition   | The slider position in percent                      |         number |                   50 |       no |
| topRightText            | Top right text                                      |         string |                    / |       no |
| bottomRightText         | Bottom right text                                   |         string |                    / |       no |
| topLeftText             | Top left text                                       |         string |                    / |       no |
| bottomLeftText          | Bottom left text                                    |         string |                    / |       no |
| textClassName           | Custom CSS classname for text                       |         string | 'before-after__text' |       no |

Here is an example with all parameters:

```js
const beforeAfterElement = new BeforeAfter({
  rootElement: document.querySelector("#before-after"),
  allowSlide: false,
  allowClick: true,
  clickTransitionDuration: 1000,
  defaultSliderPosition: 45,
  topLeftText: "Top left text",
  topRightText: "Top right text",
  bottomLeftText: "Bottom left text",
  bottomRightText: "Bottom right text",
  textClassName: "my-custom-class"
});
```

## Customize

### Style

You can customize the slider by overriding the existing CSS.

You can find the CSS file [here](https://github.com/Corentints/before-after/blob/main/src/style.css).

### Custom Slider element

You can insert your own HTML element to create a custom slider. Add the attribute `data-ba-element="slider"` to it and the library will use it automatically.

You don't need to manage the height nor the position of it: the library will apply a style automatically to do so.

Example:

```html
<div id="before-after">
  <div data-ba-element="slider" class="my-custom-slider">
    <p>My customer slider text</p>
  </div>
  <img src="./assets/before.png" alt="Squirtle" />
  <img src="./assets/after.png" alt="Squirtle with sunglasses" />
</div>
```

## Examples

Find different examples here: [https://corentints.github.io/before-after/](https://corentints.github.io/before-after/)


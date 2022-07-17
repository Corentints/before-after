import surroundElement from './utils';
import './style.css';

interface BeforeAfterProps {
  rootElement: HTMLDivElement;
  allowSlide?: boolean;
  allowClick?: boolean;
  clickTransition?: boolean;
  clickTransitionDuration?: number;
  defaultSliderPosition?: number;
  topRightText?: string;
  bottomRightText?: string;
  topLeftText?: string;
  bottomLeftText?: string;
  textClassName?: string;
}

export default class BeforeAfter {
  rootEl: HTMLDivElement;

  beforeImageEl: HTMLImageElement;

  beforeImageContainerEl!: HTMLDivElement;

  afterImageEl: HTMLImageElement;

  afterImageContainerEl!: HTMLDivElement;

  sliderEl: HTMLDivElement;

  slideEventHandler = this.slideEvent.bind(this);

  slideEndEventHandler = this.slideEnd.bind(this);

  clickTransition?: boolean;

  clickTransitionDuration?: number;

  textClassName?: string;

  constructor({
    rootElement,
    allowSlide = true,
    allowClick = false,
    clickTransition = true,
    clickTransitionDuration = 500,
    defaultSliderPosition = 50,
    textClassName = 'before-after__text',
    topRightText = undefined,
    bottomRightText = undefined,
    topLeftText = undefined,
    bottomLeftText = undefined,
  }: BeforeAfterProps) {
    this.rootEl = rootElement;
    this.clickTransition = clickTransition;
    this.clickTransitionDuration = clickTransitionDuration;
    this.textClassName = textClassName;

    if (this.rootEl === null) {
      throw new Error('[BeforeAfter] Root element must be defined');
    }

    this.beforeImageEl = this.rootEl.querySelector(
      'img:nth-of-type(1)',
    ) as HTMLImageElement;
    this.afterImageEl = this.rootEl.querySelector(
      'img:nth-of-type(2)',
    ) as HTMLImageElement;

    if (this.beforeImageEl === null || this.afterImageEl === null) {
      throw new Error('[BeforeAfter] Before and after images must be defined');
    }

    const customSliderElement = rootElement.querySelector(
      'div [data-ba-element="slider"]',
    ) as HTMLDivElement | null;

    if (customSliderElement) {
      this.sliderEl = customSliderElement;
    } else {
      this.sliderEl = document.createElement('div');
      this.sliderEl.className = 'before-after__comparison-slider';
      this.rootEl.insertAdjacentElement('afterbegin', this.sliderEl);
    }

    this.rootEl.classList.add('before-after');

    this.beforeImageContainerEl = document.createElement('div');
    this.beforeImageContainerEl.className = 'before-after__before-image-wrapper';

    this.afterImageContainerEl = document.createElement('div');
    this.afterImageContainerEl.className = 'before-after__after-image-wrapper';

    surroundElement(this.beforeImageEl, this.beforeImageContainerEl);
    surroundElement(this.afterImageEl, this.afterImageContainerEl);

    if (topRightText) {
      this.addText(topRightText, 'top-right', this.afterImageContainerEl);
    }

    if (bottomRightText) {
      this.addText(bottomRightText, 'bottom-right', this.afterImageContainerEl);
    }

    if (topLeftText) {
      this.addText(topLeftText, 'top-left', this.beforeImageContainerEl);
    }

    if (bottomLeftText) {
      this.addText(bottomLeftText, 'bottom-left', this.beforeImageContainerEl);
    }

    if (allowSlide) {
      this.sliderEl.addEventListener('mousedown', this.slideStart.bind(this));
      if (window.TouchEvent) {
        this.sliderEl.addEventListener(
          'touchstart',
          this.slideStart.bind(this),
          { passive: true },
        );
      }
    }

    if (allowClick) {
      if (this.clickTransition) {
        this.sliderEl.addEventListener('transitionend', () => {
          this.beforeImageContainerEl.style.transition = '';
          this.sliderEl.style.transition = '';
        });
      }

      this.rootEl.addEventListener('click', this.clickEvent.bind(this));
    }

    this.moveSliderTo(defaultSliderPosition);
  }

  addText(
    text: string,
    position: 'top-right' | 'bottom-right' | 'top-left' | 'bottom-left',
    container: HTMLDivElement,
  ) {
    const textEl = document.createElement('div');
    textEl.className = `${this.textClassName} before-after__text--${position}`;
    textEl.innerText = text;
    container.appendChild(textEl);
  }

  moveSliderTo(percentage: number) {
    if (percentage > 0 && percentage <= 100) {
      this.sliderEl.style.left = `${percentage}%`;
      this.beforeImageContainerEl.style.width = `${percentage}%`;
    }
  }

  private getCursorPositionPercentage(e: MouseEvent | TouchEvent) {
    let event: MouseEvent | Touch;

    if (window.TouchEvent && e instanceof TouchEvent) {
      event = e.touches[0];
    } else {
      event = e as MouseEvent;
    }

    const { left } = this.beforeImageEl.getBoundingClientRect();
    return ((event.pageX - left) / this.beforeImageEl.width) * 100;
  }

  private slideStart() {
    window.addEventListener('mousemove', this.slideEventHandler);
    window.addEventListener('touchmove', this.slideEventHandler);

    window.addEventListener('mouseup', this.slideEndEventHandler);
    window.addEventListener('touchend', this.slideEndEventHandler);
  }

  private slideEvent(e: MouseEvent | TouchEvent) {
    this.moveSliderTo(this.getCursorPositionPercentage(e));
  }

  private clickEvent(e: MouseEvent) {
    if (this.clickTransition) {
      this.sliderEl.style.transition = `left ${this.clickTransitionDuration}ms`;
      this.beforeImageContainerEl.style.transition = `width ${this.clickTransitionDuration}ms`;
      this.moveSliderTo(this.getCursorPositionPercentage(e));
    } else {
      this.moveSliderTo(this.getCursorPositionPercentage(e));
    }
  }

  private slideEnd() {
    window.removeEventListener('mousemove', this.slideEventHandler);
    window.removeEventListener('touchmove', this.slideEventHandler);

    window.removeEventListener('touchend', this.slideEndEventHandler);
    window.removeEventListener('mouseup', this.slideEndEventHandler);
  }
}

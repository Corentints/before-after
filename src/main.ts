import BeforeAfter from './BeforeAfter';

const rootElement = document.querySelector('#before-after') as HTMLDivElement;

if (rootElement) {
  const beforeAfterElement = new BeforeAfter({
    rootElement,
    allowClick: true,
    clickTransitionDuration: 1000,
    defaultSliderPosition: 45,
    topLeftText: 'Top Left',
    bottomLeftText: 'Bottom Left',
    topRightText: 'Top Right',
    bottomRightText: 'Bottom Right',
  });

  beforeAfterElement.moveSliderTo(20);
}

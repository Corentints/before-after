const surroundElement = (
  elementToSurround: HTMLElement,
  newRootElement: HTMLElement,
) => {
  if (elementToSurround.parentNode) {
    elementToSurround.parentNode.appendChild(newRootElement);
    newRootElement.appendChild(elementToSurround);
  }
};

export default surroundElement;

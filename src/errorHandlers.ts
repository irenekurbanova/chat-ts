import { DOM_ELEMENTS } from "./DOM-elements";

export const showError = (message: string) => {
  if (DOM_ELEMENTS.ERROR_MESSAGE)
    DOM_ELEMENTS.ERROR_MESSAGE.textContent = message;
  DOM_ELEMENTS.DIALOG_ERROR?.showModal();
  setTimeout(() => {
    DOM_ELEMENTS.DIALOG_ERROR?.close();
  }, 3000);
};

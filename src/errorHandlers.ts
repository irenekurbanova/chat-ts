import { DOM_ELEMENTS } from "./DOM-elements";

export const showError = (message: string) => {
  if (DOM_ELEMENTS.ERROR_MESSAGE) DOM_ELEMENTS.ERROR_MESSAGE.textContent = message;
  DOM_ELEMENTS.DIALOG.ERROR?.showModal();
  setTimeout(() => {
    DOM_ELEMENTS.DIALOG.ERROR?.close();
  }, 2000);
};

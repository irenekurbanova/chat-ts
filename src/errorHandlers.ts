import { DIALOG_ERROR, ERROR_MESSAGE } from "./DOM-elements";

export const showError = (message: string) => {
  ERROR_MESSAGE.textContent = message;
  DIALOG_ERROR.showModal();
  setTimeout(() => {
    DIALOG_ERROR.close();
  }, 3000);
};

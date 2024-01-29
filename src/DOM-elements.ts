interface HTMLElementTagNameMap {
  MESSAGES_CONTAINER: HTMLElement | null;
  MESSAGES_LIST: HTMLUListElement | null;
  SEND_MESSAGE_FORM: HTMLFormElement | null;
  TEXTAREA: HTMLTextAreaElement | null;
  DIALOG_AUTHENTICATION: HTMLDialogElement | null;
  DIALOG_SETTINGS: HTMLDialogElement | null;
  DIALOG_CONFIRMATION: HTMLDialogElement | null;
  DIALOG_ERROR: HTMLDialogElement | null;
  ERROR_MESSAGE: HTMLParagraphElement | null;
  CONFIRMATION_BUTTON: HTMLButtonElement | null;
  CONFIRMATION_INPUT: HTMLInputElement | null;
  AUTHENTICATION_INPUT: HTMLInputElement | null;
  SETTINGS_INPUT: HTMLInputElement | null;
  SETTINGS_BUTTON: HTMLButtonElement | null;
  GET_CODE: HTMLButtonElement | null;
  ENTER_CODE: HTMLButtonElement | null;
}

export const DOM_ELEMENTS: HTMLElementTagNameMap = {
  MESSAGES_CONTAINER: document.querySelector(".message__section"),
  MESSAGES_LIST: document.querySelector(".message__wrapper"),
  SEND_MESSAGE_FORM: document.querySelector("#message__form"),
  TEXTAREA: document.querySelector(".message__form-textarea"),
  DIALOG_AUTHENTICATION: document.querySelector("#authentication"),
  DIALOG_SETTINGS: document.querySelector("#settings"),
  DIALOG_CONFIRMATION: document.querySelector("#confirmation"),
  DIALOG_ERROR: document.querySelector("#error"),
  ERROR_MESSAGE: document.querySelector(".dialog__wrapper-error"),
  CONFIRMATION_BUTTON: document.querySelector(".confirmation__form-button"),
  CONFIRMATION_INPUT: document.querySelector(".confirmation__form-input"),
  AUTHENTICATION_INPUT: document.querySelector(".authentication__form-input"),
  SETTINGS_INPUT: document.querySelector(".settings__form-input"),
  SETTINGS_BUTTON: document.querySelector(".settings__form-button"),
  GET_CODE: document.querySelector("#get-code"),
  ENTER_CODE: document.querySelector("#enter-code"),
};

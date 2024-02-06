interface HTMLElementTagNameMap {
  MESSAGES_CONTAINER: HTMLElement | null;
  MESSAGES_LIST: HTMLUListElement | null;
  SEND_MESSAGE_FORM: HTMLFormElement | null;
  ERROR_MESSAGE: HTMLParagraphElement | null;

  DIALOG: {
    AUTHENTICATION: HTMLDialogElement | null;
    SETTINGS: HTMLDialogElement | null;
    CONFIRMATION: HTMLDialogElement | null;
    ERROR: HTMLDialogElement | null;
  };
  BUTTON: {
    CONFIRMATION: HTMLButtonElement | null;
    SETTINGS: HTMLButtonElement | null;
    GET_CODE: HTMLButtonElement | null;
    ENTER_CODE: HTMLButtonElement | null;
    QUIT: HTMLButtonElement | null;
    SCROLL: HTMLButtonElement | null;
  };
  USER_INPUT: {
    MESSAGE: HTMLTextAreaElement | null;
    TOKEN: HTMLInputElement | null;
    EMAIL: HTMLInputElement | null;
    NAME: HTMLInputElement | null;
  };
}

export const DOM_ELEMENTS: HTMLElementTagNameMap = {
  MESSAGES_CONTAINER: document.querySelector(".message__wrapper"),
  MESSAGES_LIST: document.querySelector(".message__wrapper-list"),
  SEND_MESSAGE_FORM: document.querySelector("#message__form"),
  ERROR_MESSAGE: document.querySelector(".dialog__wrapper-error"),

  DIALOG: {
    AUTHENTICATION: document.querySelector("#authentication"),
    SETTINGS: document.querySelector("#settings"),
    CONFIRMATION: document.querySelector("#confirmation"),
    ERROR: document.querySelector("#error"),
  },
  BUTTON: {
    CONFIRMATION: document.querySelector(".confirmation__form-button"),
    SETTINGS: document.querySelector(".settings__form-button"),
    GET_CODE: document.querySelector("#get-code"),
    ENTER_CODE: document.querySelector("#enter-code"),
    QUIT: document.querySelector(".controls__wrapper-quit"),
    SCROLL: document.querySelector(".scroll-down-button"),
  },
  USER_INPUT: {
    MESSAGE: document.querySelector(".message__form-textarea"),
    EMAIL: document.querySelector(".authentication__form-input"),
    TOKEN: document.querySelector(".confirmation__form-input"),
    NAME: document.querySelector(".settings__form-input"),
  },
};

import { DOM_ELEMENTS } from "./DOM-elements";
import {
  isEmailValid,
  isInputValid,
  renderData,
  clearInput,
  createHistoryLoadedMessage,
  scrollToEnd,
  showScrollButton,
} from "./helpers";
import { showError } from "./errorHandlers";
import { ARRAY_OF_MESSAGES } from "./messages-data";
import { getToken, sendUserData, getMessagesHistory, getUserData } from "./API";
import { webSocket, connectToWebSocket } from "./webSocket";
import { getCookie, setCookie, removeCookie } from "typescript-cookie";

window.onload = async () => {
  if (getCookie("token") && getCookie("name")) {
    connectToWebSocket(getCookie("token"));

    await getMessagesHistory(import.meta.env.VITE_MESSAGES_API_URL, getCookie("token"));

    renderData(ARRAY_OF_MESSAGES);

    scrollToEnd();
  } else DOM_ELEMENTS.DIALOG.AUTHENTICATION?.showModal();
};

async function messageSubmitHandler(event: Event | KeyboardEvent) {
  if (("key" in event && event.key === "Enter" && !event.shiftKey) || event.type === "submit") {
    event.preventDefault();

    await getUserData(import.meta.env.VITE_USER_API_URL, getCookie("token"));

    webSocket.send(JSON.stringify({ text: DOM_ELEMENTS.USER_INPUT.MESSAGE?.value }));

    DOM_ELEMENTS.USER_INPUT.MESSAGE && clearInput(DOM_ELEMENTS.USER_INPUT.MESSAGE);
  }
}

function getCodeHandler(event: Event) {
  event.preventDefault();

  if (DOM_ELEMENTS.USER_INPUT.EMAIL && isEmailValid(DOM_ELEMENTS.USER_INPUT.EMAIL?.value)) {
    getToken(import.meta.env.VITE_API_URL, DOM_ELEMENTS.USER_INPUT.EMAIL?.value);
    setCookie("email", DOM_ELEMENTS.USER_INPUT.EMAIL.value);
    DOM_ELEMENTS.DIALOG.AUTHENTICATION?.close();
    DOM_ELEMENTS.DIALOG.CONFIRMATION?.showModal();
    clearInput(DOM_ELEMENTS.USER_INPUT.EMAIL);
  } else {
    showError("Некорректный email");
  }
}

function enterCodeHandler(event: Event) {
  event.preventDefault();

  DOM_ELEMENTS.DIALOG.AUTHENTICATION?.close();
  DOM_ELEMENTS.DIALOG.CONFIRMATION?.showModal();
}

async function codeConfirmationHandler(event: Event) {
  event.preventDefault();

  if (DOM_ELEMENTS.USER_INPUT.TOKEN && isInputValid(DOM_ELEMENTS.USER_INPUT.TOKEN.value)) {
    setCookie("token", `${DOM_ELEMENTS.USER_INPUT.TOKEN?.value}`);
    const token = getCookie("token");
    await getMessagesHistory(import.meta.env.VITE_MESSAGES_API_URL, token);

    renderData(ARRAY_OF_MESSAGES);
    scrollToEnd();
    connectToWebSocket(token);
    DOM_ELEMENTS.USER_INPUT.TOKEN && clearInput(DOM_ELEMENTS.USER_INPUT.TOKEN);
    DOM_ELEMENTS.DIALOG.CONFIRMATION?.close();
    DOM_ELEMENTS.DIALOG.SETTINGS?.showModal();
  } else {
    showError("Некорректный код");
    return;
  }
}

async function nameConfirmationHandler() {
  if (DOM_ELEMENTS.USER_INPUT.NAME && isInputValid(DOM_ELEMENTS.USER_INPUT.NAME.value)) {
    webSocket.close();
    setCookie("name", DOM_ELEMENTS.USER_INPUT.NAME?.value);

    const token = getCookie("token");
    await sendUserData(import.meta.env.VITE_API_URL, token, DOM_ELEMENTS.USER_INPUT.NAME?.value);
    clearInput(DOM_ELEMENTS.USER_INPUT.NAME);
    DOM_ELEMENTS.DIALOG.SETTINGS?.close();
  } else showError("Некорректное имя");
}

function lazyLoadingHandler() {
  if (DOM_ELEMENTS.MESSAGES_CONTAINER) {
    let old_height = DOM_ELEMENTS.MESSAGES_CONTAINER.scrollHeight;

    if (DOM_ELEMENTS.MESSAGES_CONTAINER.scrollTop === 0 && ARRAY_OF_MESSAGES.length > 0) {
      renderData(ARRAY_OF_MESSAGES);
      let new_height = DOM_ELEMENTS.MESSAGES_CONTAINER.scrollHeight;
      DOM_ELEMENTS.MESSAGES_CONTAINER.scrollTop = new_height - old_height;
    } else if (!ARRAY_OF_MESSAGES.length) {
      createHistoryLoadedMessage();
      DOM_ELEMENTS.MESSAGES_CONTAINER?.removeEventListener("scroll", lazyLoadingHandler);
    }
  }
}

function quitHandler() {
  removeCookie("token");
  removeCookie("name");
  webSocket.close();
  DOM_ELEMENTS.DIALOG.AUTHENTICATION?.showModal();
}

["keydown", "submit"].forEach((event) => DOM_ELEMENTS.SEND_MESSAGE_FORM?.addEventListener(event, messageSubmitHandler));
DOM_ELEMENTS.BUTTON.GET_CODE?.addEventListener("click", getCodeHandler);
DOM_ELEMENTS.BUTTON.ENTER_CODE?.addEventListener("click", enterCodeHandler);
DOM_ELEMENTS.BUTTON.CONFIRMATION?.addEventListener("click", codeConfirmationHandler);
DOM_ELEMENTS.BUTTON.SETTINGS?.addEventListener("click", nameConfirmationHandler);
DOM_ELEMENTS.BUTTON.QUIT?.addEventListener("click", quitHandler);
DOM_ELEMENTS.MESSAGES_CONTAINER?.addEventListener("scroll", lazyLoadingHandler);
DOM_ELEMENTS.MESSAGES_CONTAINER?.addEventListener("scroll", showScrollButton);
DOM_ELEMENTS.BUTTON.SCROLL?.addEventListener("click", scrollToEnd);

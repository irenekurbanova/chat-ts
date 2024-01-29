import { DOM_ELEMENTS } from "./DOM-elements";
import { isEmailValid, isInputValid, renderData, clearInput, formatDate } from "./helpers";
import { showError } from "./errorHandlers";
import { ARRAY_OF_MESSAGES } from "./messages-data";
import { getToken, sendUserData, getMessagesHistory } from "./API";
import { webSocket, connectToWebSocket } from "./webSocket";
import { getCookie, setCookie } from "typescript-cookie";

document.addEventListener("DOMContentLoaded", async () => {
  if (getCookie("token") && getCookie("name")) {
    connectToWebSocket(getCookie("token"));

    const messages = await getMessagesHistory(import.meta.env.VITE_MESSAGES_API_URL, getCookie("token"));

    messages.reverse().map((item: { text: string; user: { name: string }; createdAt: string }) => {
      ARRAY_OF_MESSAGES.push({
        message: item.text,
        name: item.user.name,
        timeStamp: formatDate(item.createdAt),
      });
    });

    renderData(ARRAY_OF_MESSAGES);
    scrollToEnd();
  } else DOM_ELEMENTS.DIALOG_AUTHENTICATION?.showModal();
});

function messageSubmitHandler(event: Event | KeyboardEvent) {
  if (("key" in event && event.key === "Enter" && !event.shiftKey) || event.type === "submit") {
    event.preventDefault();

    webSocket.send(JSON.stringify({ text: DOM_ELEMENTS.TEXTAREA?.value }));

    DOM_ELEMENTS.TEXTAREA && clearInput(DOM_ELEMENTS.TEXTAREA);
    scrollToEnd();
  }
}

function getCodeHandler(event: Event) {
  event.preventDefault();

  if (isEmailValid(DOM_ELEMENTS.AUTHENTICATION_INPUT?.value)) {
    getToken(import.meta.env.VITE_API_URL, DOM_ELEMENTS.AUTHENTICATION_INPUT?.value);
    DOM_ELEMENTS.DIALOG_AUTHENTICATION?.close();
  } else {
    DOM_ELEMENTS.AUTHENTICATION_INPUT && clearInput(DOM_ELEMENTS.AUTHENTICATION_INPUT);
    showError("Некорректный email");
  }
}

function enterCodeHandler(event: Event) {
  event.preventDefault();

  DOM_ELEMENTS.DIALOG_AUTHENTICATION?.close();
  DOM_ELEMENTS.DIALOG_CONFIRMATION?.showModal();
}

async function codeConfirmationHandler(event: Event) {
  event.preventDefault();

  if (DOM_ELEMENTS.CONFIRMATION_INPUT && !isInputValid(DOM_ELEMENTS.CONFIRMATION_INPUT.value)) {
    showError("Некорректный код");
    return;
  }

  setCookie("token", `${DOM_ELEMENTS.CONFIRMATION_INPUT?.value}`);
  const token = getCookie("token");
  const messages = await getMessagesHistory(import.meta.env.VITE_MESSAGES_API_URL, token);

  messages.reverse().map((item: { text: string; user: { name: string }; createdAt: string }) => {
    ARRAY_OF_MESSAGES.push({
      message: item.text,
      name: item.user.name,
      timeStamp: formatDate(item.createdAt),
    });
  });

  renderData(ARRAY_OF_MESSAGES);
  scrollToEnd();
  connectToWebSocket(token);
  DOM_ELEMENTS.DIALOG_CONFIRMATION?.close();
  DOM_ELEMENTS.DIALOG_SETTINGS?.showModal();
}

async function nameConfirmationHandler() {
  if (DOM_ELEMENTS.SETTINGS_INPUT && isInputValid(DOM_ELEMENTS.SETTINGS_INPUT.value)) {
    setCookie("name", DOM_ELEMENTS.SETTINGS_INPUT?.value);

    const token = getCookie("token");
    await sendUserData(import.meta.env.VITE_API_URL, token, DOM_ELEMENTS.SETTINGS_INPUT?.value);
    DOM_ELEMENTS.DIALOG_SETTINGS?.close();
  } else showError("Некорректное имя");
}

function scrollToEnd() {
  if (DOM_ELEMENTS.MESSAGES_CONTAINER) {
    DOM_ELEMENTS.MESSAGES_CONTAINER.scrollTop = DOM_ELEMENTS.MESSAGES_CONTAINER.scrollHeight;
  }
}

function lazyMessageLoading() {
  if (DOM_ELEMENTS.MESSAGES_CONTAINER) {
    let old_height = DOM_ELEMENTS.MESSAGES_CONTAINER.scrollHeight;
    if (DOM_ELEMENTS.MESSAGES_CONTAINER.scrollTop === 0) {
      renderData(ARRAY_OF_MESSAGES);
      let new_height = DOM_ELEMENTS.MESSAGES_CONTAINER.scrollHeight;
      DOM_ELEMENTS.MESSAGES_CONTAINER.scrollTop = new_height - old_height;
    }
  }
}

["keydown", "submit"].forEach((event) => DOM_ELEMENTS.SEND_MESSAGE_FORM?.addEventListener(event, messageSubmitHandler));
DOM_ELEMENTS.GET_CODE?.addEventListener("click", getCodeHandler);
DOM_ELEMENTS.ENTER_CODE?.addEventListener("click", enterCodeHandler);
DOM_ELEMENTS.CONFIRMATION_BUTTON?.addEventListener("click", codeConfirmationHandler);
DOM_ELEMENTS.SETTINGS_BUTTON?.addEventListener("click", nameConfirmationHandler);
DOM_ELEMENTS.MESSAGES_CONTAINER?.addEventListener("scroll", lazyMessageLoading);

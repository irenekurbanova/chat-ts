import {
  SEND_MESSAGE_FORM,
  TEXTAREA,
  DIALOG_AUTHENTICATION,
  DIALOG_CONFIRMATION,
  CONFIRMATION_BUTTON,
  CONFIRMATION_INPUT,
  AUTHENTICATION_INPUT,
  GET_CODE,
  ENTER_CODE,
} from "./DOM-elements";
import { createTemplateContent, isEmailValid, renderData } from "./helpers";
import { showError } from "./errorHandlers";
import { DUMMY_ARRAY_OF_MESSAGES } from "./mock-data";
import { fetchData, sendData, getMessagesData } from "./API";
import { getCookie, setCookie } from "typescript-cookie";

let CHAT_OWNER = "" || getCookie("name");

document.addEventListener("DOMContentLoaded", async () => {
  if (getCookie("token") && getCookie("name")) {
    const messages = await getMessagesData(
      import.meta.env.VITE_MESSAGES_API_URL,
      getCookie("token")
    );

    messages.map(
      (item: { text: string; user: { name: string }; createdAt: string }) => {
        DUMMY_ARRAY_OF_MESSAGES.push({
          message: item.text,
          name: item.user.name,
          timeStamp: item.createdAt,
        });
      }
    );

    renderData(DUMMY_ARRAY_OF_MESSAGES);
  } else DIALOG_AUTHENTICATION.showModal();
});

function messageSubmitHandler(event: any) {
  if ((event.key === "Enter" && !event.shiftKey) || event.type === "submit") {
    event.preventDefault();
    createTemplateContent({
      name: CHAT_OWNER ?? "",
      message: TEXTAREA.value,
      timeStamp: "",
      chatowner: CHAT_OWNER,
    });
    TEXTAREA.value = "";
  }
}

function getCodeHandler(event: Event) {
  event.preventDefault();
  if (isEmailValid(AUTHENTICATION_INPUT.value)) {
    fetchData(import.meta.env.VITE_API_URL, AUTHENTICATION_INPUT.value);
    DIALOG_AUTHENTICATION.close();
  } else {
    AUTHENTICATION_INPUT.value = "";
    showError("Некорректный email");
  }
}

function enterCodeHandler(event: Event) {
  event.preventDefault();
  setCookie("token", `${AUTHENTICATION_INPUT.value}`);
  DIALOG_AUTHENTICATION.close();
  DIALOG_CONFIRMATION.showModal();
}

async function nameConfirmationHandler(event: Event) {
  event.preventDefault();
  const token = getCookie("token");
  setCookie("name", CONFIRMATION_INPUT.value);
  CHAT_OWNER = CONFIRMATION_INPUT.value;
  sendData(import.meta.env.VITE_API_URL, token, CONFIRMATION_INPUT.value);
  const messages = await getMessagesData(
    import.meta.env.VITE_MESSAGES_API_URL,
    getCookie("token")
  );

  messages.map(
    (item: { text: string; user: { name: string }; createdAt: string }) => {
      DUMMY_ARRAY_OF_MESSAGES.push({
        message: item.text,
        name: item.user.name,
        timeStamp: item.createdAt,
      });
    }
  );

  renderData(DUMMY_ARRAY_OF_MESSAGES);
  DIALOG_CONFIRMATION.close();
}

["keydown", "submit"].forEach((event) =>
  SEND_MESSAGE_FORM.addEventListener(event, messageSubmitHandler)
);
GET_CODE.addEventListener("click", getCodeHandler);
ENTER_CODE.addEventListener("click", enterCodeHandler);
CONFIRMATION_BUTTON.addEventListener("click", nameConfirmationHandler);

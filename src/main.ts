import {
  SEND_MESSAGE_FORM,
  TEXTAREA,
  DIALOG_AUTHENTICATION,
  DIALOG_CONFIRMATION,
  CONFIRMATION_BUTTON,
  CONFIRMATION_INPUT,
  AUTHENTICATION_FORM_ERROR,
  AUTHENTICATION_INPUT,
  GET_CODE,
  ENTER_CODE,
} from "./DOM-elements";
import { createTemplateContent, isEmailValid, showError } from "./helpers";
import { DUMMY_ARRAY_OF_MESSAGES } from "./mock-data";
import { fetchData, sendData, getMessagesData } from "./API";
import { getCookie, setCookie } from "typescript-cookie";

let CHAT_OWNER = "" || getCookie("name");

document.addEventListener("DOMContentLoaded", async () => {
  if (getCookie("token") && getCookie("name")) {
    const data = await getMessagesData(
      import.meta.env.VITE_MESSAGES_API_URL,
      getCookie("token")
    );
    let { messages } = data;

    messages.map(
      (item: { text: string; user: { name: string }; createdAt: string }) => {
        DUMMY_ARRAY_OF_MESSAGES.push({
          message: item.text,
          name: item.user.name,
          timeStamp: item.createdAt,
        });
      }
    );

    initialData(DUMMY_ARRAY_OF_MESSAGES);
  } else DIALOG_AUTHENTICATION.showModal();
});

function messageSubmitHandler(event: any) {
  if (getCookie("name")) {
    CHAT_OWNER = getCookie("name");
  }

  if (event.key === "Enter" && !event.shiftKey) {
    createTemplateContent({
      name: CHAT_OWNER ?? "",
      message: TEXTAREA.value,
      timeStamp: "",
      chatowner: CHAT_OWNER,
    });
    TEXTAREA.value = "";
  }

  if (event.type === "submit") {
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

["keydown", "submit"].forEach((event) =>
  SEND_MESSAGE_FORM.addEventListener(event, messageSubmitHandler)
);

const initialData = (
  array: {
    name: string;
    message: string;
    timeStamp: string;
  }[]
) => {
  array.map((item) => {
    createTemplateContent(item);
  });
};

function getCodeHandler(event: Event) {
  event.preventDefault();
  if (isEmailValid(AUTHENTICATION_INPUT.value)) {
    fetchData(import.meta.env.VITE_API_URL, AUTHENTICATION_INPUT.value);
    DIALOG_AUTHENTICATION.close();
  } else {
    AUTHENTICATION_INPUT.value = "";
    showError("Некорректный email", AUTHENTICATION_FORM_ERROR);
  }
}

function enterCodeHandler(event: Event) {
  event.preventDefault();
  setCookie("token", `${AUTHENTICATION_INPUT.value}`);
  DIALOG_AUTHENTICATION.close();
  DIALOG_CONFIRMATION.showModal();
}

function nameConfirmationHandler(event: Event) {
  event.preventDefault();
  const token = getCookie("token");
  setCookie("name", CONFIRMATION_INPUT.value);
  sendData(import.meta.env.VITE_API_URL, token, CONFIRMATION_INPUT.value);
  DIALOG_CONFIRMATION.close();
  initialData(DUMMY_ARRAY_OF_MESSAGES);
}

GET_CODE.addEventListener("click", getCodeHandler);
ENTER_CODE.addEventListener("click", enterCodeHandler);
CONFIRMATION_BUTTON.addEventListener("click", nameConfirmationHandler);

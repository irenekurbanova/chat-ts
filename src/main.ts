import {
  SEND_MESSAGE_FORM,
  TEXTAREA,
  DIALOG_AUTHENTICATION,
  AUTHENTICATION_FORM_ERROR,
  EMAIL_INPUT,
  GET_CODE,
} from "./DOM-elements";
import { createTemplateContent, isEmailValid, showError } from "./helpers";
import { DUMMY_ARRAY_OF_MESSAGES } from "./mock-data";
import { fetchData } from "./API";

document.addEventListener("DOMContentLoaded", () => {
  DIALOG_AUTHENTICATION.showModal();
});

function messageSubmitHandler(event: any) {
  if (event.key === "Enter" && !event.shiftKey) {
    createTemplateContent({
      name: "",
      message: TEXTAREA.value,
      timeStamp: "",
    });
    TEXTAREA.value = "";
  }

  if (event.type === "submit") {
    event.preventDefault();
    createTemplateContent({
      name: "",
      message: TEXTAREA.value,
      timeStamp: "",
    });
    TEXTAREA.value = "";
  }
}

["keydown", "submit"].forEach((event) =>
  SEND_MESSAGE_FORM.addEventListener(event, messageSubmitHandler)
);

const initialData = (
  array: { name: string; message: string; timeStamp: string }[]
) => {
  array.map((item) => {
    createTemplateContent(item);
  });
};

initialData(DUMMY_ARRAY_OF_MESSAGES);

function getCodeHandler(event: Event) {
  event.preventDefault();
  if (isEmailValid(EMAIL_INPUT.value)) {
    fetchData(import.meta.env.VITE_API_URL, EMAIL_INPUT.value);
    DIALOG_AUTHENTICATION.close();
  } else {
    EMAIL_INPUT.value = "";
    showError("Некорректный email", AUTHENTICATION_FORM_ERROR);
  }
}

GET_CODE.addEventListener("click", getCodeHandler);

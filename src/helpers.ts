import { DOM_ELEMENTS } from "./DOM-elements";

export const isMessageValid = (message: string) => {
  return message.trim().length > 0;
};

export const isEmailValid = (email?: string) => {
  if (!email) return false;
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const isInputValid = (input: string) => {
  return input.trim().length > 0;
};

export const clearInput = (input: HTMLTextAreaElement | HTMLInputElement) => {
  input.value = "";
};

export const showError = (message: string, parent: HTMLElement) => {
  parent.textContent = message;
  parent.style.color = "red";
  setTimeout(() => {
    parent.textContent = "";
  }, 3000);
};

export const formatDate = (date: string) => {
  const dateObj = new Date(date);
  const time = `${dateObj.getHours() < 10 ? dateObj.getHours().toString().padStart(2, "0") : dateObj.getHours()}:${
    dateObj.getMinutes() < 10 ? dateObj.getMinutes().toString().padStart(2, "0") : dateObj.getMinutes()
  }`;
  return time;
};

export const renderData = (
  array: {
    name: string;
    message: string;
    timeStamp: string;
  }[]
) => {
  const banchOfMessages = array.splice(-19);
  banchOfMessages.reverse().map((item) => {
    createTemplateContent(item);
  });
};

export const createTemplateContent = (
  data: { name: string; message?: string; timeStamp: string },
  insertPosition?: InsertPosition
) => {
  const markupInsertPosition = (insertPosition && insertPosition) || "afterbegin";
  const CHAT_MEMBER = data.name === "Irene" ? "chat-member-1" : "chat-member-2";
  const markup = `
  <li class="message__wrapper-item ${CHAT_MEMBER}">
  <p class="message__wrapper-item-text">${data.name}: ${data.message}</p>
  <span class="message__wrapper-item-timestamp">${data.timeStamp ?? "18:45"}</span>
  </li>`;

  DOM_ELEMENTS.MESSAGES_LIST?.insertAdjacentHTML(markupInsertPosition, markup);
};

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
  const parent = input.parentElement as HTMLFormElement;
  parent.reset();
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
    email: string;
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
  data: { name: string; email: string; message?: string; timeStamp: string },
  insertPosition?: InsertPosition
) => {
  const markupInsertPosition = (insertPosition && insertPosition) || "afterbegin";
  const CHAT_MEMBER = data.email === "kirina2504@gmail.com" ? "chat-member-1" : "chat-member-2";
  const markup = `
  <li class="message__wrapper-list-item ${CHAT_MEMBER}">
  <p class="message__wrapper-list-item-text">${data.name}: ${data.message}</p>
  <span class="message__wrapper-list-item-timestamp">${data.timeStamp ?? "18:45"}</span>
  </li>`;

  DOM_ELEMENTS.MESSAGES_LIST?.insertAdjacentHTML(markupInsertPosition, markup);
};

export const createHistoryLoadedMessage = () => {
  const markup = `
  <li class="message__wrapper-list-history-loaded">
   <p>Message history loaded</p>  
  </li>
  `;

  DOM_ELEMENTS.MESSAGES_LIST?.insertAdjacentHTML("afterbegin", markup);
};

export function showScrollButton() {
  let currentScrollTop = DOM_ELEMENTS.MESSAGES_CONTAINER?.scrollTop;
  let currentClientHeight = DOM_ELEMENTS.MESSAGES_CONTAINER?.clientHeight;
  let currentScrollHeight = DOM_ELEMENTS.MESSAGES_CONTAINER?.scrollHeight;
  let difference;

  if (currentScrollHeight && currentScrollTop) {
    difference = currentScrollHeight - currentScrollTop;
  }
  if (difference === currentClientHeight) {
    DOM_ELEMENTS.BUTTON.SCROLL?.classList.add("hide");
  } else DOM_ELEMENTS.BUTTON.SCROLL?.classList.remove("hide");
}

export function scrollToEnd() {
  if (DOM_ELEMENTS.MESSAGES_CONTAINER) {
    DOM_ELEMENTS.MESSAGES_CONTAINER.scrollTop = DOM_ELEMENTS.MESSAGES_CONTAINER.scrollHeight;
    DOM_ELEMENTS.BUTTON.SCROLL?.classList.add("hide");
  }
}

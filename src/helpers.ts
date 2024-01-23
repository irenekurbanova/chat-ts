import { MESSAGES_CONTAINER, TEMPLATE } from "./DOM-elements";
export const isMessageValid = (message: string) => {
  return message.trim().length > 0;
};

export const isEmailValid = (email: string) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const showError = (message: string, parent: HTMLElement) => {
  parent.textContent = message;
  parent.style.color = "red";
  setTimeout(() => {
    parent.textContent = "";
  }, 3000);
};

export const renderData = (
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

export const createTemplateContent = (data: {
  name: string;
  message: string;
  timeStamp: string;
  chatowner?: string;
}) => {
  const MESSAGE_TEMPLATE = TEMPLATE.content.cloneNode(true) as HTMLElement;

  const MESSAGE_ITEM = MESSAGE_TEMPLATE.querySelector("li") as HTMLElement;

  const CHAT_MEMBER = data.chatowner ? "chat-member-1" : "chat-member-2";

  MESSAGE_ITEM.classList.add("message__wrapper-item", CHAT_MEMBER);

  const markup = `
   <p class="message__wrapper-item-text">${data.name}: ${data.message}</p>
   <span class="message__wrapper-item-timestamp">${
     data.timeStamp ?? "18:45"
   }</span>
  `;

  MESSAGE_ITEM.insertAdjacentHTML("beforeend", markup);
  MESSAGES_CONTAINER.append(MESSAGE_TEMPLATE);
};

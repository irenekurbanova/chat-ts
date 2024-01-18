import { MESSAGES_CONTAINER, TEMPLATE } from "./DOM-elements";
export const isMessageValid = (message: string) => {
  return message.trim().length > 0;
};

export const createTemplateContent = (data: {
  name: string;
  message: string;
  timeStamp: string;
}) => {
  if (!isMessageValid(data.message)) return;

  const MESSAGE_TEMPLATE = TEMPLATE.content.cloneNode(true) as HTMLElement;

  const MESSAGE_ITEM = MESSAGE_TEMPLATE.querySelector("li") as HTMLElement;

  const CHAT_MEMBER = data.name === "Я" ? "chat-member-1" : "chat-member-2";

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

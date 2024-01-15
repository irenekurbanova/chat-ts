const CHAT_OWNER = "Я";
const CHAT_MEMBER = "Собеседник";

const DUMMY_ARRAY_OF_MESSAGES = [
  {
    name: CHAT_OWNER,
    message: "Добрый день",
    timeStamp: "18:45",
  },
  {
    name: CHAT_MEMBER,
    message: "Добрый день",
    timeStamp: "18:45",
  },
  {
    name: CHAT_MEMBER,
    message:
      "А это второе и, кажется, оно очень длинное, чтобы поместиться на одной строке",
    timeStamp: "18:45",
  },
  {
    name: CHAT_OWNER,
    message: "Добрый день",
    timeStamp: "18:45",
  },
];

const MESSAGES_CONTAINER = document.querySelector(".message__wrapper");
const SEND_MESSAGE_FORM = document.querySelector("#message__form");
const TEXTAREA = document.querySelector(".message__form-textarea");
const TEMPLATE = document.querySelector("#template");

const isMessageValid = (message) => {
  return message.trim().length > 0;
};

const createTemplateContent = (message) => {
  if (!isMessageValid(message)) return;
  const MESSAGE_TEMPLATE = TEMPLATE.content.cloneNode(true);

  const MESSAGE_ITEM = MESSAGE_TEMPLATE.querySelector("li");
  MESSAGE_ITEM.classList.add("message__wrapper-item", "chat-member-1");

  const markup = `
   <p class="message__wrapper-item-text">Я: ${message}</p>
   <span class="message__wrapper-item-timestamp">18:45</span>
  `;

  MESSAGE_ITEM.insertAdjacentHTML("beforeend", markup);
  MESSAGES_CONTAINER.append(MESSAGE_TEMPLATE);
};

const messageSubmitHandler = (event) => {
  if (event.key === "Enter" && !event.shiftKey) {
    createTemplateContent(TEXTAREA.value);
    TEXTAREA.value = "";
  }
  if (event.type === "submit") {
    event.preventDefault();
    createTemplateContent(TEXTAREA.value);
    TEXTAREA.value = "";
  }
};

["keydown", "submit"].forEach((event) =>
  SEND_MESSAGE_FORM.addEventListener(event, messageSubmitHandler)
);

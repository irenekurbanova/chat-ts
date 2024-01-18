const CHAT_OWNER = "Я";
const CHAT_MEMBER = "Собеседник";

export const DUMMY_ARRAY_OF_MESSAGES: {
  name: string;
  message: string;
  timeStamp: string;
}[] = [
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

let CHAT_OWNER = "Я";
let CHAT_MEMBER = "Собеседник";

export let DUMMY_ARRAY_OF_MESSAGES: {
  message: string;
  name: string;
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

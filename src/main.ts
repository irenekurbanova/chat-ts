import { SEND_MESSAGE_FORM, TEXTAREA } from "./DOM-elements";
import { createTemplateContent } from "./helpers";
import { DUMMY_ARRAY_OF_MESSAGES } from "./mock-data";

const messageSubmitHandler = (event: any) => {
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
};

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

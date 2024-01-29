import { getCookie } from "typescript-cookie";
import { createTemplateContent, formatDate } from "./helpers";

let webSocket: WebSocket;

const connectToWebSocket = (token?: string) => {
  webSocket = new WebSocket(`${import.meta.env.VITE_WEB_SOCKET_URL}${token}`);

  webSocket.onopen = function () {
    console.log("[ononpen]");
  };

  webSocket.onmessage = function (event: MessageEvent<string>) {
    console.log("[onmessage]");
    const eventData = event.data;

    const userMessageInfo = JSON.parse(eventData);

    createTemplateContent(
      {
        name: userMessageInfo.user.name,
        message: userMessageInfo.text,
        timeStamp: formatDate(userMessageInfo.createdAt),
      },
      "beforeend"
    );
  };

  webSocket.onclose = () => {
    console.log("[onclose]");

    setTimeout(() => {
      const token = getCookie("token");
      connectToWebSocket(token);
    }, 1000);
  };

  webSocket.onerror = () => {
    console.log("[onerror]");
    webSocket.close();
  };
};

export { connectToWebSocket, webSocket };

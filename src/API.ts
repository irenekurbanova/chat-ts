import { ARRAY_OF_MESSAGES } from "./messages-data";
import { formatDate } from "./helpers";

export const getToken = async (url: string, email?: string) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ email: `${email}` }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Could not fetch ${url}, status: ${response.status}`);
    }
  } catch (error) {
    console.log(error);
  }
};

export const sendUserData = async (url: string, token?: string, name?: string) => {
  try {
    const response = await fetch(url, {
      method: "PATCH",
      body: JSON.stringify({
        name: name,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error(`Could not fetch ${url}, status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getUserData = async (url: string, token?: string) => {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error(`Could not fetch ${url}, status: ${response.status}`);
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getMessagesHistory = async (url: string, token?: string) => {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error(`Could not fetch ${url}, status: ${response.status}`);
    }
    const data = await response.json();
    let { messages } = data;

    messages.reverse().map((item: { text: string; user: { name: string; email: string }; createdAt: string }) => {
      ARRAY_OF_MESSAGES.push({
        message: item.text,
        name: item.user.name,
        email: item.user.email,
        timeStamp: formatDate(item.createdAt),
      });
    });

    return messages;
  } catch (error) {
    console.log(error);
  }
};

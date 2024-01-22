export const fetchData = async (url: string, params: string) => {
  console.log(url, params);
  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ email: `${params}` }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
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

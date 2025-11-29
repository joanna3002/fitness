import axios from "axios";

const API_URL = "https://api.openai.com/v1/chat/completions";

export const getChatResponse = async (message) => {
  try {
    const response = await axios.post(
      API_URL,
      {
        model: "gpt-3.5-turbo", // you can also use gpt-4 if available
        messages: [{ role: "user", content: message }],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("Error fetching AI response:", error);
    return "Sorry, I couldn't get a response right now.";
  }
};

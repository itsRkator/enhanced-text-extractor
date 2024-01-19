import axios from "axios";

const openaiProcess = async (text: string): Promise<any> => {
  try {
    const apiResponse = await axios.post(
      "https://api.openai.com/v1/engines/text-davinci-003/completions",
      { prompt: text },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer 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",
        },
      }
    );

    console.log(apiResponse);
    return apiResponse.data;
  } catch (error) {
    throw new Error(
      `Error processing text with OpenAI: ${(error as Error).message}`
    );
  }
};

export { openaiProcess };

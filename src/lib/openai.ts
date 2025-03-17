
'use server'

export interface PredictionResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

export async function fetchPrediction(
  data: string
): Promise<PredictionResponse> {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a stock market guru. Analyse the shared data and generate an investment advice in not more than 150 words. Try to look for something funny in the final analysis and if exists then make the user laugh about it.",
        },
        {
          role: "user",
          content: `${data}`,
        },
      ],
      temperature: 1.1
    }),
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  return (await response.json()) as PredictionResponse;
}

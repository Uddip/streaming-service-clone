// https://streaming-clone-uddip.azurewebsites.net/api/getaisuggestion

import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function getAISuggestion(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  context.log(`Http function processed request for url "${request.url}"`);

  const userInput = request.query.get("userInput");

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `You are a digital video assistant working for services such as Netflix, Disney Plus & Amazon Prime Video. Your job is to provide suggestions based on the videos the user specifies. Provide an quirky breakdown of what the user should watch next! It should only list the names of the films after the introduction. Keep the response short and sweet! Always list at least 3 films as suggestions. If the user mentions a genre, you should provide a suggestion based on that genre.`,
      },
      {
        role: "user",
        content: `I like: ${userInput}`,
      },
    ],
    model: "gpt-3.5-turbo",
  });

  console.log(completion.choices[0]);

  const name = request.query.get("name") || (await request.text()) || "world";

  if (!completion) {
    return { body: `Hello, ${name}!` };
  }

  return { body: completion.choices[0].message.content || "No suggestion" };
}

app.http("getAISuggestion", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: getAISuggestion,
});
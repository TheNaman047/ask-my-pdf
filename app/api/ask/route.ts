import { vectorStore } from "@/app/databases";
import { HumanMessage } from "@langchain/core/messages";
import { ChatOpenAI } from "@langchain/openai";

// This function can run for a maximum of 30 seconds
export const maxDuration = 30
// Handling User questions
export async function POST(req: any) {
  try {
    const reqBody: any = await req.json();
    let questions: any[] = [];
    reqBody.data.forEach((item: any, index: any) => {
      for (const key in item) {
        if (key.startsWith("q") && item[key]) {
          questions = [...questions, `${item[key]}`];
        }
      }
    });

    // Creating retriever object with mmr type
    const retriever = vectorStore.asRetriever({
      searchType: "mmr",
      searchKwargs: {
        fetchK: 60,
        lambda: 0.1,
      },
      k: 2,
    });

    // Fetching contexts related to questions asked from db
    const contexts = (
      await Promise.all(
        questions.map(async (que) => {
          const ctx = await retriever.invoke(que);
          return ctx;
        }),
      )
    )
      .flatMap((val) => val)
      .map((val) => val.pageContent)
      .join("\n");

    const questionString = questions
      .map((val, i) => `Ans${i + 1} ${val}`)
      .join("\n");

    const userContext = reqBody.brief;
    // Main prompt
    const prompt = `
      Brief about the pdf: ${userContext}
      Please provide answers to the following questions using the pdf context which is mentioned below and make sure to give response in JSON format only. There can be either one or more questions, so make sure to start the json response with Ans1 and then Ans2(if more than one question) & so on.
      ${questionString}
      -----------------------
      pdf context:-  ${contexts}

      `;
    const model = new ChatOpenAI({
      model: "gpt-3.5-turbo-0125",
      maxTokens: 1024,
      apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    }).bind({
      response_format: {
        type: "json_object",
      },
    });
    const res = await model.invoke([new HumanMessage(prompt)]);

    return Response.json(JSON.parse(res.content as string));
  } catch (error) {
    console.log("ERROR: ", error);
    return Response.json({ message: "Error occurred" }, { status: 500 });
  }
}

import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { CharacterTextSplitter } from "@langchain/textsplitters";
import { OpenAIEmbeddings } from "@langchain/openai";
import { MongoDBAtlasVectorSearch } from "@langchain/mongodb";
import { client } from "@/app/databases";

// This function can run for a maximum of 30 seconds
export const maxDuration = 60;
// Creating vector index in mongo atlas on pdf uplaod
export async function POST(req: any) {
  try {
    // First clear previous data from  mongodb
    const collection: any = client.db("pdfsearch").collection("data");
    await collection.deleteMany({});

    // Loading pdf from request
    const formData = await req.formData();
    const file = formData.get("file");
    const blob = new Blob([Buffer.from(await file.arrayBuffer())]);

    // Setting up doc loader to fetch text from pdf
    const loader = new PDFLoader(blob);
    const doc = await loader.load();
    let text = "";
    doc.forEach((page: any) => {
      text += page.pageContent;
    });
    const splitter = new CharacterTextSplitter({
      separator: "\n",
      chunkSize: 1000,
      chunkOverlap: 200,
    });
    // Creating docs for easier embeddings
    const docs = await splitter.createDocuments([text]);

    const embeddings = new OpenAIEmbeddings({
      apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY, // In Node.js defaults to process.env.OPENAI_API_KEY
      batchSize: 512, // Default value if omitted is 512. Max is 2048
      model: "text-embedding-3-large",
    });

    // Creating index from generated docs and embeddings
    await MongoDBAtlasVectorSearch.fromDocuments(docs, embeddings, {
      collection,
      indexName: "vector_index", // The name of the Atlas search index. Defaults to "default"
      textKey: "text", // The name of the collection field containing the raw content. Defaults to "text"
      embeddingKey: "embedding", // The name of the collection field containing the embedded text. Defaults to "embedding"
    });
    return Response.json({ message: "Upload successfully" }, { status: 200 });
  } catch (error) {
    console.log("ERROR: ", error);
    return Response.json({ message: "Error occurred" }, { status: 500 });
  }
}

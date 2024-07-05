# Ask-My-PDF: A Next.js and MongoDB Atlas Powered PDF Querying Tool

## Description

"ask-my-pdf" is a web application built with Next.js and MongoDB Atlas that allows users to upload PDF files and get answers to their questions regarding the content of the PDFs. The application leverages LangChain and OpenAI to provide intelligent responses based on the uploaded documents. The user interface is designed with Mantine UI for a clean and responsive experience.

## Features

- Data storage using MongoDB Atlas
- Querying PDF content using Langchain and OpenAI
- User-friendly interface using Mantine UI
- Built with Next.js for a fast and efficient user experience

## Prerequisites

- Node.js (>= 20.x) and Yarn installed on your machine
- A MongoDB Atlas account and a cluster created. Please follow these steps to setup a vector index: https://js.langchain.com/v0.2/docs/integrations/vectorstores/mongodb_atlas/#creating-an-index
- An OpenAI API key

## Installation

1. Clone the repository:

```bash
git clone https://github.com/TheNaman047/ask-my-pdf.git
```

2. Navigate to the project directory:

```bash
cd ask-my-pdf
```

3. Install the dependencies:

```bash
yarn
```

4. Create a `.env` file in the root directory of the project and add the following environment variables:

```bash
NEXT_PUBLIC_MONGODB_ATLAS_URI=<your-mongodb-atlas-connection-string>
NEXT_PUBLIC_OPENAI_API_KEY=<your-openai-api-key>
```

5. Start the development server:

```bash
yarn dev
```

6. Open your browser and navigate to `http://localhost:3000` to use the application.

## Deployment
# Vercel
1. Push your code to a Git repository (GitHub, GitLab, etc.).

2. Import your repository to Vercel:
- Log in to your Vercel account.
- Click on "New Project" and import your "ask-my-pdf" repository.

3. Set environment variables in Vercel:

- Go to your project settings on Vercel.
- Under the "Environment Variables" section, add the same variables from your .env.local file.

4. Deploy the application:

Click on "Deploy" and wait for Vercel to build and deploy your application.

## Usage

1. Upload a PDF document by clicking the "Upload PDF" button.
2. Once the document is uploaded, you can query its content by typing your question in the input field and clicking the "Submit" button.
3. The application will generate a response based on the content of the PDF document using Langchain and OpenAI.

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Mantine UI](https://mantine.dev/)
- [Langchain](https://langchain.readthedocs.io/en/latest/)
- [OpenAI](https://openai.com/)

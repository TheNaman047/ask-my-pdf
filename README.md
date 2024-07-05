# Ask-My-PDF: A Next.js and MongoDB Atlas Powered PDF Querying Tool

## Description

Ask-My-PDF is a powerful web application that leverages the capabilities of Next.js and MongoDB Atlas to provide users with a seamless experience of uploading and querying their PDF documents. This application allows users to upload their PDFs and get answers regarding the content of those documents. The application is built using a modern tech stack that includes Next.js for the frontend, Yarn for package management, MongoDB Atlas for the database, Mantine UI for the user interface, Langchain for handling language processing tasks, and OpenAI for generating responses to user queries.

## Features

- PDF upload and storage using MongoDB Atlas
- Querying PDF content using Langchain and OpenAI
- User-friendly interface using Mantine UI
- Built with Next.js for a fast and efficient user experience

## Prerequisites

- Node.js and Yarn installed on your machine
- A MongoDB Atlas account and a cluster created
- An OpenAI API key

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/ask-my-pdf.git
```

2. Navigate to the project directory:

```bash
cd ask-my-pdf
```

3. Install the dependencies:

```bash
yarn install
```

4. Create a `.env.local` file in the root directory of the project and add the following environment variables:

```bash
MONGODB_URI=<your-mongodb-atlas-connection-string>
OPENAI_API_KEY=<your-openai-api-key>
```

5. Start the development server:

```bash
yarn dev
```

6. Open your browser and navigate to `http://localhost:3000` to use the application.

## Usage

1. Upload a PDF document by clicking the "Upload PDF" button.
2. Once the document is uploaded, you can query its content by typing your question in the input field and clicking the "Ask" button.
3. The application will generate a response based on the content of the PDF document using Langchain and OpenAI.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Mantine UI](https://mantine.dev/)
- [Langchain](https://langchain.readthedocs.io/en/latest/)
- [OpenAI](https://openai.com/)

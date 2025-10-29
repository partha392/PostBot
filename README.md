# PostBot: AI Chat Assistant for India Post

PostBot is an AI-powered chat assistant that provides instant, accurate answers about India Post services, including Speed Post, savings schemes (like PPF, NSC, SCSS), insurance, and more.

This project is built with Next.js, Genkit (for AI), and Tailwind CSS.

![Landing Page](https://github.com/partha392/PostBot/blob/main/image_1.png?raw=true)
![Landing Page](https://github.com/partha392/PostBot/blob/main/image_2.png?raw=true)

## Features

- **Conversational AI:** Ask questions in natural language.
- **Comprehensive Knowledge:** Covers a wide range of India Post services, schemes, and facilities.
- **Web Search:** If the answer isn't in its knowledge base, PostBot can search the web to find real-time information.
- **Document Analysis:** Upload a document (image, text file) and ask questions about it.
- **Modern UI:** Clean, responsive, and easy-to-use chat interface.

## Prerequisites

- [Node.js](https://nodejs.org/en) (version 20 or later)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)

## Getting Started

Follow these steps to get the project running on your local machine.

### 1. Clone the Repository

Clone this repository to your local machine:

```bash
git clone https://github.com/your-username/postbot.git
cd postbot
```

### 2. Install Dependencies

Install the required npm packages:

```bash
npm install
```

### 3. Set Up Your API Key

This project uses the Google Gemini API to power its AI capabilities.

1.  **Get an API Key:** Obtain your free Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey).
2.  **Create an Environment File:** In the root of the project, make a copy of the `.env.example` file and name it `.env`.

    ```bash
    cp .env.example .env
    ```

3.  **Add Your Key:** Open the newly created `.env` file and paste your Gemini API key into it.

    ```env
    GEMINI_API_KEY=YOUR_API_KEY_HERE
    ```

### 4. Run the Development Server

You're all set! Start the Next.js development server:

```bash
npm run dev
```

The application will now be running at [http://localhost:9002](http://localhost:9002). Open this URL in your browser to start chatting with PostBot.

#  AI Portfolio Backend

An AI-powered chatbot backend designed to act as a **personal portfolio assistant**.
It allows visitors to interact with my portfolio through natural language—answering questions about my skills, projects, and experience in real time.

---

##  Overview

This project is a **Node.js backend service** that integrates with an AI API to deliver a smart, context-aware chatbot tailored to my personal portfolio.

Instead of a static website, this creates a **dynamic, conversational experience** where recruiters and visitors can explore my work by simply asking questions.

---

##  Features

*  AI-powered chatbot with natural language responses
*  Context-aware replies using structured portfolio data
*  Custom knowledge base (projects, skills, contact info)
*  Fast REST API built with Express
*  Secure API key handling using environment variables
*  CORS-enabled for frontend integration
*  Modular architecture (routes, services, data separation)

---

##  Tech Stack

* **Backend:** Node.js, Express
* **AI Integration:** OpenAI API
* **Environment Management:** dotenv
* **Middleware:** cors

---

##  Project Structure

```
ai-portfolio-backend/
│── server.js          # Entry point
│── routes/
│     └── chat.js      # Chat endpoint
│── services/
│     └── openai.js    # AI logic
│── data/
│     └── portfolio.js # Personal data source
│── .env               # Environment variables
│── package.json
```

---

##  How It Works

1. A user sends a message from the frontend
2. The backend receives it via `/chat`
3. The AI is prompted with:

   * The user’s message
   * My structured portfolio data
4. The AI generates a contextual response
5. The response is returned to the frontend

---

##  API Endpoint

### `POST /chat`

**Request:**

```json
{
  "message": "What projects has this developer built?",
  "history": []
}
```

**Response:**

```json
{
  "reply": "The developer has built several projects including..."
}
```

---

##  AI Prompt Design

The chatbot is guided using a **system prompt** that:

* Restricts responses to my actual portfolio data
* Prevents hallucinations
* Keeps answers professional and relevant
* Helps guide recruiters to key projects

---

##  Setup & Installation

### 1. Clone the repository

```
git clone https://github.com/yourusername/ai-portfolio-backend.git
cd ai-portfolio-backend
```

### 2. Install dependencies

```
npm install
```

### 3. Configure environment variables

Create a `.env` file:

```
OPENAI_API_KEY=your_api_key_here
PORT=3000
```

### 4. Run the server

```
npm start
```

Server will run on:

```
http://localhost:3000
```

---

##  Testing

You can test the API using Postman or any HTTP client:

**Endpoint:**

```
POST http://localhost:3000/chat
```

---

##  Deployment

This backend can be deployed using:

* Render
* Railway
* Any Node.js-compatible hosting service

---

##  Future Improvements

*  Database integration (store conversations)
*  Authentication system
*  Streaming AI responses
*  Analytics (track user interactions)
*  Multi-language support
*  Voice input support

---

##  Purpose

This project demonstrates:

* Full-stack development skills
* AI integration in real-world applications
* Clean backend architecture
* Practical UX thinking (conversational interfaces)

---

##  Contact

If you’d like to connect or collaborate:

* Email: [tshireletsoselemela17@gmail.com](mailto:tshireletsoselemela17@gmail.com)
* GitHub: https://github.com/Stewiecancode

---

##  License

This project is open-source and available under the MIT License.

---

##  Final Note

This chatbot is more than a feature—it's an **interactive layer on top of my portfolio**, designed to make exploring my work faster, smarter, and more engaging.

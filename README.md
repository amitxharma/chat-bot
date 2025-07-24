# 🤖 Gemini Chatbot

A full-stack chatbot application powered by Google's Gemini AI API with real-time chat interface and message history.

## Project Structure

```
gemini-chatbot/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   └── server.ts
│   ├── Dockerfile
│   ├── .env
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── App.tsx
│   │   └── index.tsx
│   ├── Dockerfile
│   ├── .env
│   └── package.json
├── docker-compose.yml
└── .env
```

## Prerequisites

- Docker and Docker Compose
- Node.js and npm (for local development)

## Environment Variables

### Backend (.env)

```
PORT=5000
MONGODB_URI=mongodb://mongo:27017/gemini
GEMINI_API_KEY=your_gemini_api_key
NODE_ENV=development
```

### Frontend (.env)

```
REACT_APP_API_URL=http://localhost:5000/api/chat
```

### Root (.env for Docker Compose)

```
GEMINI_API_KEY=your_gemini_api_key
```

## Running the Application

### Using Docker Compose (Recommended)

1. Make sure Docker and Docker Compose are installed on your system.
2. Clone the repository.
3. Navigate to the project root directory.
4. Update the `.env` file with your Gemini API key.
5. Run the following command:

```bash
docker-compose up --build
```

6. Access the application at http://localhost:3000

### Running Locally (Development)

#### Backend

1. Navigate to the backend directory:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Update the `.env` file with your Gemini API key and MongoDB URI.
4. Start the backend server:

```bash
npm start
```

#### Frontend

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Update the `.env` file if your backend is running on a different port.
4. Start the frontend development server:

```bash
npm start
```

5. Access the application at http://localhost:3000

## Features

- Real-time chat interface
- Integration with Google's Gemini API
- Message history storage in MongoDB
- Responsive design
- Docker containerization for easy deployment

## API Endpoints

- `POST /api/chat`: Send a message to the chatbot
- `GET /api/chat/history`: Get chat history

## Technologies Used

- **Frontend**: React, TypeScript, Axios
- **Backend**: Node.js, Express, TypeScript
- **Database**: MongoDB
- **Containerization**: Docker, Docker Compose
- **AI**: Google Gemini API



docker exec -it gemini-mongo mongosh
show dbs
use yourdbname
show collections
db.collectionName.find().pretty()

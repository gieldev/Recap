# RecallIt — System Architecture

## Overview

RecallIt follows a client-server architecture. The frontend handles the user interface and user interactions, while the backend handles application logic, data processing, and database communication.

## Architecture Diagram

```mermaid
flowchart ID
  A[User] --> B[React frontend]
  B --> C[Backend Server]
  C --> D[AI API]
  D --> C
  C --> E[Database]
  C --> A
```

## Project Structure

```text
RecallIt/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   └── package.json
│
├── backend/
│   ├── config/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
│
├── docs/
│   ├── ARCHITECTURE.md
│   ├── FEATURES.md
│   └── README.md
│
├── .gitignore
```

## System Components

### Frontend

- Rendering the user interface
- Handling user interactions
- Collecting user inputs
- Sending request to backend
- Displaying generated results

### Backend

- Handling frontend request
- Processing and handling data
- Creating data into database
- Sending response to frontend

### Database

- Storing user information
- Managing saved reviewers
- Storing other neccessary data

## Data Flow

### Reviewer Generation

1. The user provides learning materials through the frontend
2. The frontend validates then processes the information
3. The frontend sends a request to the backend
4. The backend sends a request for generated content to the AI API
5. The AI API generates and responds to the backend
6. The backend receives the response
7. The backend stores the response to the database
8. The backend returns the response to the frontend
9. The frontend displays the generated results

### Authentication

TBC

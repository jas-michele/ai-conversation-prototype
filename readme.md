# AI Conversation Prototype

An AI-powered voice quiz application built with **React, TypeScript, Express, and the OpenAI API**. The application generates trivia questions using AI, reads them aloud with Text-to-Speech, and allows users to answer using their voice through the browser's Speech Recognition API.

---

## Features

### AI Game Generation

* Generate trivia questions using OpenAI.
* Multiple-choice questions with four answer options.
* Automatic score tracking.

### AI Text-to-Speech

* AI reads every question aloud.
* Natural-sounding voice generated using the OpenAI Text-to-Speech API.

### Speech Recognition

* Browser Speech Recognition using the Web Speech API.
* Voice commands allow users to answer questions hands-free.
* Supports spoken answers:

  * A
  * B
  * C
  * D

### Automatic Answer Validation

* Voice answers are automatically selected.
* Answers are submitted without requiring mouse interaction.
* Immediate correct/incorrect feedback is displayed.

---

## Tech Stack

### Frontend

* React
* TypeScript
* Vite
* Axios

### Backend

* Node.js
* Express
* TypeScript

### AI

* OpenAI Chat Completions
* OpenAI Text-to-Speech
* Web Speech API (Speech Recognition)

---

## Project Structure

### Backend

* `server.ts` – Starts the Express server
* `gameRoutes.ts` – Game endpoints
* `gameController.ts` – Handles game requests
* `gameService.ts` – Generates AI questions
* `speechRoutes.ts` – Speech endpoints
* `speechController.ts` – Handles Text-to-Speech requests
* `speechService.ts` – OpenAI Text-to-Speech integration

### Frontend

* React UI
* Axios services
* Speech Recognition service
* Game state management
* Voice interaction

---

## Current Functionality

* Generate AI-powered quiz questions
* Read questions aloud
* Listen for voice responses
* Recognize spoken answers
* Automatically select answers
* Automatically submit answers
* Display score
* Progress through multiple questions
* Display game over screen

---

## Future Improvements

* AI host announces correct or incorrect answers.
* Automatically advance to the next question after AI feedback.
* Voice commands:

  * "Repeat Question"
  * "Next"
  * "Start Game"
* Prevent speech recognition while AI audio is playing.
* Support multiple quiz categories and difficulty levels.
* Multiplayer game mode.
* Improved handling of speech recognition variations.

---

## Learning Objectives

This project was built to gain hands-on experience with modern AI application development by combining multiple technologies into a single conversational experience.

Key concepts explored include:

* OpenAI Chat Completions
* OpenAI Text-to-Speech
* Browser Speech Recognition
* React state management
* Express API development
* Voice-driven user interfaces
* Asynchronous client-server communication

---

## Next Prototype

**AI RAG (Retrieval-Augmented Generation)**

The next project will focus on building a document chat application where users can:

* Upload PDF documents
* Ask questions about document content
* Receive cited AI responses
* Explore embeddings and vector search
* Build retrieval pipelines for AI-powered document understanding

This prototype will provide the foundation for repository analysis tools, document assistants, and other AI developer applications.

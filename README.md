# 📚 BookJourney

> **Remember what you read.**

BookJourney is a personal knowledge management platform for readers that helps them **remember, organize, and revisit everything they learn from books**.

Unlike traditional book trackers, BookJourney focuses on preserving your learning by combining your reading progress, notes, and insights into one place.

---

## ✨ Features

### Authentication

* User Registration
* User Login
* JWT Authentication
* Protected Routes
* Password Hashing using bcrypt

### Book Management

* Search books using Google Books API
* View detailed book information
* Add books to personal library
* Prevent duplicate books in library
* View personal library

### Reading Progress

* Mark books as:

  * Want to Read
  * Reading
  * Completed
* Track current page
* Automatically calculate reading progress
* Automatically set:

  * Started Date
  * Completed Date
  * Last Read Date
* Rate completed books

### Notes

* Create notes for books in your library
* Update notes
* Delete notes
* View all notes
* Filter notes by book
* Add:

  * Title
  * Content
  * Page Number
  * Chapter
  * Tags

### Dashboard

Provides personalized reading analytics including:

* Books Currently Reading
* Completed Books
* Want to Read Books
* Total Pages Read
* Average Rating
* Reading Goal Progress
* Favorite Genres
* Continue Reading Section
* Recent Notes

---

# 🏗️ Project Architecture

The backend follows a layered architecture.

```
src/
│
├── config/
├── constants/
├── controllers/
├── middleware/
├── models/
├── routes/
├── services/
├── utils/
├── validators/
│
├── app.js
└── server.js
```

Each layer has a single responsibility.

* **Routes** → Define endpoints
* **Controllers** → Handle request/response
* **Services** → Business logic
* **Models** → Database schema
* **Validators** → Request validation
* **Middleware** → Authentication & error handling
* **Utils** → Shared helper functions

---

# 🛠 Tech Stack

## Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JWT Authentication
* bcrypt
* express-validator
* Axios

---

## External API

Google Books API

Book metadata including:

* Title
* Authors
* Cover Image
* Description
* Categories
* Publisher
* Published Date
* Page Count

is automatically fetched from Google Books.

---

# 📦 Database Design

## User

```
name
email
password
readingGoal
timestamps
```

---

## Book

```
googleBookId
title
authors
description
coverImage
pageCount
categories
publisher
publishedDate
timestamps
```

---

## UserBook

```
user
book
status
currentPage
rating
startedOn
completedOn
lastReadOn
timestamps
```

---

## Note

```
user
book
type
title
content
page
chapter
tags
timestamps
```

---

# 📡 REST APIs

## Authentication

| Method | Endpoint           |
| ------ | ------------------ |
| POST   | /api/auth/register |
| POST   | /api/auth/login    |
| GET    | /api/auth/me       |

---

## Books

| Method | Endpoint                       |
| ------ | ------------------------------ |
| GET    | /api/books/search              |
| GET    | /api/books/:googleBookId       |
| POST   | /api/books                     |
| GET    | /api/books/library             |
| PATCH  | /api/books/library/:userBookId |

---

## Notes

| Method | Endpoint           |
| ------ | ------------------ |
| POST   | /api/notes         |
| GET    | /api/notes         |
| PATCH  | /api/notes/:noteId |
| DELETE | /api/notes/:noteId |

---

## Dashboard

| Method | Endpoint       |
| ------ | -------------- |
| GET    | /api/dashboard |

---

# 🔒 Security

* JWT Authentication
* Protected Routes
* Password Hashing
* Centralized Error Handling
* Request Validation
* Ownership Validation
* Duplicate Entry Prevention

---

# 🧠 Concepts Demonstrated

* REST API Design
* Layered Architecture
* Authentication & Authorization
* MongoDB Relationships
* One-to-Many Modeling
* Business Logic Separation
* Third-Party API Integration
* Async/Await
* Error Handling
* Validation
* Aggregation
* Dashboard Analytics

---

# 🚀 Future Enhancements

* React Frontend
* Responsive UI
* Search Notes
* Quote Management
* Reading Streaks
* AI Note Summaries
* Export Notes (PDF/Markdown)
* Book Recommendations
* User Profile
* Unit & Integration Tests
* Docker Support
* CI/CD Pipeline

---

# 📌 Project Vision

BookJourney is not built to simply track books.

It is designed to help readers build a **second brain for everything they learn from books**, making knowledge easy to capture, organize, and revisit.

**Remember what you read.**

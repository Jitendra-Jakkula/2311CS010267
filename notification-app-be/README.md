# Notification App Backend

A Node.js microservice that fetches notifications from the evaluation service and provides a **Priority Inbox**, displaying the most important notifications based on priority and timestamp.

## Features

- Fetches notifications from the evaluation API.
- Sorts notifications by priority.
- Supports configurable Top N notifications.
- Uses custom logging middleware.
- REST API built with Express.js.

## Tech Stack

- Node.js
- Express.js
- Axios

## Project Structure

```
notification-app-be/
│── controllers/
│── routes/
│── services/
│── app.js
│── package.json
```

## Installation

```bash
npm install
```

## Run

```bash
node app.js
```

The server runs on:

```
http://localhost:3001
```

## API

### Get Priority Notifications

```http
GET /api/notifications
```

### Get Top N Notifications

```http
GET /api/notifications?n=15
```

## Logging

The application uses the custom logging middleware to record:

- Notification fetch events
- Successful operations
- Error events

## Author

**Jitendra Jakkula**
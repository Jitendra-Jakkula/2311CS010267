## Logging Middleware


A reusable Node.js logging utility that sends application logs to the AffordMed Evaluation Logging API.

## Features

- Centralized logging
- Bearer token authentication
- Supports info and error logs
- Reusable across multiple microservices

## Tech Stack

- Node.js
- Axios

## Installation

```bash
npm install axios
```

## Usage

```javascript
const Log = require("./logger");

await Log(
    "backend",
    "info",
    "service",
    "Application started"
);
```

## Author

**Jitendra Jakkula**
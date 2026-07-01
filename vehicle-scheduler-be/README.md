# Vehicle Scheduler Backend

This is a Node.js backend service that gets depot and vehicle data from the evaluation service. It uses the **0/1 Knapsack Algorithm** to choose the best vehicles based on the available mechanic hours and maximize the total impact.

## Features

- Gets depot details from the  API.
- Gets vehicle details from the  API.
- Uses the **0/1 Knapsack Algorithm** to find the best schedule.

## Tech Stack

- Node.js
- Express.js
- Axios
- Dynamic Programming (0/1 Knapsack)


## How to Run

```bash
npm install
node app.js
```

The server will start at:

```text
http://localhost:3000
```

## API

### Get Vehicle Schedule

```http
GET /api/schedule
```

This API returns the best vehicle schedule for each depot based on the available mechanic hours.

## Author

**Jitendra Jakkula**
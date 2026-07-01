# Notification System Design

## Stage 1

## Campus Notification System - REST API

### Overview

The Campus Notification System is built to help students receive important updates from the college in one place. It provides REST APIs to send and manage notifications for different categories, such as:

- Placement updates
- College events
- Exam results

The APIs use JSON for both requests and responses, making them simple to use and easy to connect with frontend applications.

---

## REST APIs

### Get all notifications

**GET** `/api/notifications`

**Response**

```json
{
  "id": "1",
  "type": "Placement",
  "title": "Microsoft Hiring",
  "message": "Microsoft is hiring Software Engineers.",
  "isRead": false,
  "createdAt": "2026-07-01T10:30:00Z"
}
```

### Get notification by ID

**GET** `/api/notifications/:id`

**Response**

```json
{
  "id": "1",
  "type": "Placement",
  "title": "Microsoft Hiring",
  "message": "Microsoft is hiring Software Engineers.",
  "isRead": false,
  "createdAt": "2026-07-01T10:30:00Z"
}
```

### Create notification

**POST** `/api/notifications`

**Pass data like:**

```json
{
  "type": "Placement",
  "title": "Microsoft Hiring",
  "message": "Microsoft is hiring Software Engineers."
}
```

**Response**

```json
{
  "message": "Notification created successfully"
}
```

### Delete notification

**DELETE** `/api/notifications/:id`

**Response**

```json
{
  "message": "Notification deleted successfully"
}
```

# Stage 2

## Database Choice

I have chosen **MySQL** as the database because it is simple to use, fast, and good for storing notification details.

---

## Database Schema

### Students Table

| Column | Type | Description |
|---------|------|-------------|
| studentId | BIGINT (PK) | Unique Student ID |
| name | VARCHAR(100) | Student Name |
| email | VARCHAR(100) | Student Email |

### Notifications Table

| Column | Type | Description |
|---------|------|-------------|
| notificationId | UUID (PK) | Unique Notification ID |
| studentId | BIGINT (FK) | Student ID |
| type | ENUM('Placement','Event','Result') | Type of Notification |
| title | VARCHAR(255) | Notification Title |
| message | TEXT | Notification Message |
| isRead | BOOLEAN | Read or Unread Status |
| createdAt | TIMESTAMP | Time when notification was created |

---

## Relationship

- One student can receive many notifications.
- Every notification is linked to one student.

---

## Sample SQL Queries

### Get all notifications

```sql
SELECT *
FROM Notifications
WHERE studentId = ?
ORDER BY createdAt DESC;
```

### Get unread notifications

```sql
SELECT *
FROM Notifications
WHERE studentId = ?
AND isRead = false
ORDER BY createdAt DESC;
```

### Mark notification as read

```sql
UPDATE Notifications
SET isRead = true
WHERE notificationId = ?;
```

### Add a new notification

```sql
INSERT INTO Notifications
(studentId, type, title, message, isRead, createdAt)
VALUES (?, ?, ?, ?, false, NOW());
```

### Delete a notification

```sql
DELETE FROM Notifications
WHERE notificationId = ?;
```


# Stage 3

## Query Analysis

### Given Query

```sql
SELECT *
FROM Notifications
WHERE studentId = 1042
AND isRead = false
ORDER BY createdAt DESC;
```

---


## Query to get Placement notifications from the last 7 days

```sql
SELECT *
FROM Notifications
WHERE type = 'Placement'
AND createdAt >= NOW() - INTERVAL '7 DAYS';
```

---

## Time Complexity

### Without Index

```
O(N)
```

The database may need to check every row.

### With Composite Index

```
O(log N)
```

The database can quickly find the required records using the index.

# Stage 4

## Improving Performance

Loading notifications from the database every time a user opens the page can increase database load and make the application slower.

### Possible Solutions

- Use **Redis** to cache notifications that are accessed frequently.
- Use **pagination** to load a limited number of notifications (for example, 20 at a time).
- Use **WebSockets (Socket.IO)** to send notifications instantly instead of checking the server again and again.
- Move old notifications to another table or archive them to keep the main table smaller.

### Trade-offs

- Caching makes data loading faster, but the cache also needs to be updated when data changes.
- WebSockets give real-time updates, but they require a continuous connection.
- Pagination reduces database load, but users need multiple requests to view older notifications.

---

# Stage 5

## Problems in the Current Implementation

- Emails are sent one by one, which takes more time.
- If one email fails, it can affect the whole process.
- There is no retry option for failed emails.
- Database saving and email sending are done together.
- This approach is not good for a large number of students.

## Better Approach

- First, save all notifications in the database.
- Add email tasks to a message queue like **RabbitMQ** or **Kafka**.
- Worker services can process and send emails in the background.
- Retry sending emails if they fail.
- Send in-app notifications separately.

### Updated Pseudocode

```text
notify_all(studentIds, message):

    save_notifications(studentIds, message)

    for each studentId:
        queue_email(studentId, message)
        push_to_app(studentId, message)

worker():

    while(queue not empty):
        send_email()
        retry_on_failure()
```

### Why use this approach?

- It is faster.
- It can handle failures better.
- It works well even for thousands of students.
- Failed emails can be retried without affecting the notifications stored in the database.

# Stage 6

## Priority Inbox Implementation

### Approach

1. Get all notifications from the API.
2. Split them into unread and read notifications.
3. Arrange unread notifications based on priority:
   - Placement
   - Results
   - Events
4. Sort notifications in each category by the latest `createdAt`.
5. Show all unread notifications first and then display the read notifications.

---

### Algorithm

```text
Get Notifications
      ↓
Split into Read and Unread
      ↓
Sort by Priority
      ↓
Sort by Date
      ↓
Display Final List
```

---

### Time Complexity

- Separating notifications: **O(n)**
- Sorting notifications: **O(n log n)**

**Overall Time Complexity**

```text
O(n log n)
```

---

### Advantages

- Important notifications are shown first.
- Unread notifications are displayed before read ones.
- Works well even when there are many notifications.

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
## BidNest API Documentation

This document outlines the usage of the BidNest API for managing users, items, and feedback.

### Users Controller

#### Register a New User

**Endpoint:** `/api/users/register`

**Method:** POST

**Request Body:**

```json
{
  "UserName": "JohnDoe",
  "Email": "john.doe@example.com",
  "Password": "MySecurePassword",
  "Role": "Buyer" // or "Seller"
}
```

**Response Body:**

```json
{
  "Id": 1,
  "UserName": "JohnDoe",
  "Email": "john.doe@example.com"
}
```

**Notes:**

* The `Role` can be either "Buyer" or "Seller".
* The password is hashed using BCrypt.Net for security.

#### Login an Existing User

**Endpoint:** `/api/users/login`

**Method:** POST

**Request Body:**

```json
{
  "Email": "john.doe@example.com",
  "Password": "MySecurePassword"
}
```

**Response Body:**

```json
{
  "message": "Login successful"
}
```

**Notes:**

* The user's ID and role are stored in the session after successful login.
* An unauthorized response is returned if credentials are incorrect.

#### Logout an Existing User

**Endpoint:** `/api/users/logout`

**Method:** POST

**Response Body:**

```json
{
  "message": "Logout successful"
}
```

**Notes:**

* Clears the session data.

### Items Controller

#### Create a New Item

**Endpoint:** `/api/items`

**Method:** POST

**Request Body:**

```json
{
  "Title": "Vintage Guitar",
  "Description": "Beautiful acoustic guitar in excellent condition.",
  "StartingPrice": 100.00,
  "EndTime": "2023-12-31T23:59:59Z", // ISO 8601 format
  "SellerId": 1 // ID of the seller user
}
```

**Response Body:**

```json
{
  "Id": 1,
  "Title": "Vintage Guitar"
}
```

**Notes:**

* Only logged-in users can create items.
* The seller ID must be valid and the user must have the "Seller" role.
* The `EndTime` should be in UTC time.
* The item is created with the status `IsAuctionLive` set to `true`.

#### Get an Existing Item

**Endpoint:** `/api/items/{id}`

**Method:** GET

**Response Body:**

```json
{
  "Id": 1,
  "Title": "Vintage Guitar",
  "Description": "Beautiful acoustic guitar in excellent condition.",
  "StartingPrice": 100.00,
  "StartTime": "2023-12-20T12:00:00Z", // ISO 8601 format
  "EndTime": "2023-12-31T23:59:59Z", // ISO 8601 format
  "IsAuctionLive": true,
  "Bids": [
    {
      "Id": 1,
      "Amount": 120.00,
      "BidTime": "2023-12-21T10:00:00Z",
      "BidderId": 2,
      "IsHighest": true
    }
  ]
}
```

**Notes:**

* The `StartTime` is the time the auction started.
* The `Bids` array contains all bids placed on the item.


#### Place a Bid on an Existing Item

**Endpoint:** `/api/items/{id}/bids`

**Method:** POST

**Request Body:**

```json
{
  "Amount": 150.00,
  "BidderId": 2 // ID of the buyer user
}
```

**Response Body:**

```json
{
  "Id": 2,
  "Amount": 150.00,
  "BidderId": 2,
  "ItemId": 1
}
```

**Notes:**

* Only logged-in users with the "Buyer" role can place bids.
* The bid amount must be higher than the current highest bid.
* The bid is added to the item's `Bids` array and the `IsHighest` flag is set for the new bid.
* The previous highest bid's `IsHighest` flag is set to `false`.

#### Get Bid History for an Item

**Endpoint:** `/api/items/{itemId}/bids`

**Method:** GET

**Response Body:**

```json
[
  {
    "Amount": 120.00,
    "BidTime": "2023-12-21T10:00:00Z",
    "BidderName": "JaneDoe",
    "IsHighest": false
  },
  {
    "Amount": 150.00,
    "BidTime": "2023-12-22T11:00:00Z",
    "BidderName": "JohnDoe",
    "IsHighest": true
  }
]
```

**Notes:**

* Returns an array of bids placed on the item.
* The response includes the bid amount, bid time, bidder's username, and the `IsHighest` flag.

### Feedback Controller

#### Submit Feedback for an Item's Bid

**Endpoint:** `/api/feedback/{itemId}`

**Method:** POST

**Request Body:**

```json
{
  "Rating": 4,
  "Comments": "Great seller, item as described."
}
```

**Response Body:**

```json
{
  "Message": "Feedback submitted successfully!"
}
```

**Notes:**

* Only logged-in users can submit feedback.
* The `Rating` should be between 1 and 5.
* The `Comments` field is optional.

#### Get Feedback for an Item's Bid

**Endpoint:** `/api/feedback/{itemId}`

**Method:** GET

**Response Body:**

```json
[
  {
    "Rating": 4,
    "Comments": "Great seller, item as described.",
    "DateGiven": "2023-12-23T14:00:00Z",
    "UserName": "JohnDoe"
  }
]
```

**Notes:**

* Returns an array of feedback entries for the item.
* The response includes the rating, comments, date given, and username of the user who provided the feedback. 

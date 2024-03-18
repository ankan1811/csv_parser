# Backend Assignment [Node.js,Typescript,MongoDB]

## Overview

This project provides the RESTful APIs for getting card status given the card_id or user_phone.

### Purposefully, I have kept the .env file so that the setup becomes easy. Obviously,it will be gitignored in a real scenario

## Base URL

The base URL for all endpoints is: `http://localhost:4000/`

## To Run

### ` 1.npm install  2.npm run dev`

### Get Card Status

- **Endpoint:** `/get_card_status`
- **Method:** `GET`
- **Description:** Get card status given the card_id or user_phone.
- **URL Params:** `parameter : card_id and value : [ Any CARD ID from the csv files ] or parameter: user_phone and value : [ Any User Mobile or User contact from the csv files ]`

#### 📌 Output

```
Card status of the card associated with that given card_id or user_phone
```

#### 📌Basic Working

````
As sson as we start the server all those csv files will be parsed and stored as models in Mongodb.```
````

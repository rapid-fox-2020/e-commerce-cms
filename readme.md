# Kanban-Beta DOCUMENTATION

> RESTful endpoint for E-Commerce-App CRUD operation with JSON formatted response

## Restful Endpoints

1. POST : /register
2. POST : /login
3. GET : /products
4. POST : /products
5. GET : /products/:id
6. PUT : /products/:id
7. DELETE : /products/:id

## GLOBAL ERROR
Response(500 - Internal Server Error):
```json
  { 
    "errors": "internal server error"
  }
```

## POST /register

Request body:

```json
{
  "email": "admin@email.com",
  "password": "test123"
}
```

Response(201 - Created):

```json
{
  "token":"token"
}
```

Response(400 - SequelizeValidationError)

```json
{
    "errors": [
        "Please enter valid email address",
        "Invalid Email Format!",
        "Password length must be between 6 - 15 characters",
        "Please enter password"
    ]
}
```


Response(400 - INVALID EMAIL REGISTER)

```json
{
  "errors": [
        "Email already registered"
    ]
}
```

## POST /login

Request body:

```json
{
  "email": "test@email.com",
  "password": "test123"
}
```

Response(200 - Ok):

```json
{
  "access_token": "<user access_token>"
}
```

Response(400 - EMAIL NOT FOUND)

```json
{
  "errors": [
        "invalid email or password"
    ]
}
```

## POST /products

Request headers:

```json
{
  "access_token": "<access_token>"
}
```

Request body:

```json
{ 
    "name": "daging ",
    "image_url": "https://mytrip123.com/wp-content/uploads/2018/02/kuliner-jakarta-selatan-1.png",
    "price": 1001,
    "stock": 12,
}
```

Response(201 - Created):

```json
{ 
    "id": 5,
    "name": "daging ",
    "image_url": "https://mytrip123.com/wp-content/uploads/2018/02/kuliner-jakarta-selatan-1.png",
    "price": 1001,
    "stock": 12,
    "updatedAt": "2020-07-25T22:08:38.081Z",
    "createdAt": "2020-07-25T22:08:38.081Z"
}
```

Response(400 - SequelizeValidationError)

```json
{
   "errors": [
        "Please enter product name",
        "Please enter image url",
        "Please enter product price",
        "Please enter product stock"
    ]
}
```

## GET /products

Request headers:

```json
{
  "access_token": "<access_token>"
}
```

Request body:
Not Needed

Response(200 - Ok):

```json
[
   {
        "id": 1,
        "name": "daging sapi",
        "image_url": "https://mytrip123.com/wp-content/uploads/2018/02/kuliner-jakarta-selatan-1.png",
        "price": 1001,
        "stock": 12,
        "createdAt": "2020-07-25T13:32:55.167Z",
        "updatedAt": "2020-07-25T13:32:55.167Z"
    },
    {
        "id": 2,
        "name": "daging sapi enak",
        "image_url": "https://mytrip123.com/wp-content/uploads/2018/02/kuliner-jakarta-selatan-1.png",
        "price": 1001,
        "stock": 12,
        "createdAt": "2020-07-25T13:32:56.829Z",
        "updatedAt": "2020-07-25T14:08:09.769Z"
    },
    {
        "id": 4,
        "name": "indomie",
        "image_url": "https://cdn2.tstatic.net/tribunnews/foto/bank/images/indomie-kpop-6.jpg",
        "price": 15000,
        "stock": 1,
        "createdAt": "2020-07-25T14:06:05.220Z",
        "updatedAt": "2020-07-25T21:32:50.102Z"
    },
    ```
    ...
]
```

## GET /products/:id

Request headers:

```json
{
  "access_token": "<access_token>"
}
```

Request params:

```json
{
  "id": "<params_id>"
}
```

Request body:
not needed

Response(200 - Ok):

```json
{
    "id": 1,
    "name": "daging sapi",
    "image_url": "https://mytrip123.com/wp-content/uploads/2018/02/kuliner-jakarta-selatan-1.png",
    "price": 1001,
    "stock": 12,
    "createdAt": "2020-07-25T13:32:55.167Z",
    "updatedAt": "2020-07-25T13:32:55.167Z"
}
```

## DELETE /products/:id

Request headers:

```json
{
  "access_token": "<access_token>"
}
```

Request params:

```json
{
  "id": "<params_id>"
}
```

Request body:
not needed

Response(200 - Ok):

```json
{
    "id": 1,
    "name": "daging sapi",
    "image_url": "https://mytrip123.com/wp-content/uploads/2018/02/kuliner-jakarta-selatan-1.png",
    "price": 1001,
    "stock": 12,
    "createdAt": "2020-07-25T13:32:55.167Z",
    "updatedAt": "2020-07-25T13:32:55.167Z"
}
```

Response(403 - AUTH)

```json
{
  "errors": [
        "only the admin can do it"
    ]
}
```

## PUT /products/:id

Request headers:

```json
{
  "access_token": "<access_token>"
}
```

Request params:

```json
{
  "id": "params.id"
}
```

Request body:

```json
{
    "id": 2,
    "name": "daging sapi enak",
    "image_url": "https://mytrip123.com/wp-content/uploads/2018/02/kuliner-jakarta-selatan-1.png",
    "price": 1001,
    "stock": 12,
}
```

Response(200 - OK):

```json
{
    "id": 2,
    "name": "daging sapi ",
    "image_url": "https://mytrip123.com/wp-content/uploads/2018/02/kuliner-jakarta-selatan-1.png",
    "price": 15000,
    "stock": 12,
    "createdAt": "2020-07-25T13:32:56.829Z",
    "updatedAt": "2020-07-25T14:08:09.769Z"
}
```

Response(403 - AUTH)

```json
{
  "errors": [
        "only the admin can do it"
    ]
}
```

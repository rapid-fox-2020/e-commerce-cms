# CMS e-commerce App Server.



# RESTFul Endpoints

List Endpoints :
- `POST /login`
- `POST /products`
- `GET /products`
- `PUT /products/:id`
- `DELETE /products/:id`




#### (401 - Unauthorized)

> This error describes invalid user on resources access attempt

```json
{
    "error_code": "INVALID_USER",
    "message": "invalid username and password",
}
```

#### (404 - Access token Not Found)

> This error describes access token missing

```json
{
    "message": "Access token missing!"
}
```

#### (404 - Not Found)

> This error describes user not exists

```json
{
    "error_code": "USER_NOT_FOUND",
    "message": "invalid username and password",
}
```

#### Response (500 - Internal server error)

> This error describes server errors and undefined errors

```json
{
    "error_code": "INTERNAL_SERVER_ERROR",
    "message": "Internal server error!",
}
```


---

## USER


### POST /login

> Login user


#### Request Body

| Field    |  Type  |
| :------- | :----: |
| email    | String |
| password | String |

_Example:_

```json
{
    "email": "user@example.com",
    "password": "password"
}
```

#### Response (200 - OK)

```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJyYWdpbEBtYWlsLmNvbSIsImlhdCI6MTU5NDk4NzI4MX0.CCCYalkivz5UFmon205zvNJnQ08l1ggTbJE4RJ2MO9o",
    "email": "ragil@mail.com",
}
```

#### Response (401 - Unauthorized)

```json
{
    "error_code": "INVALID_EMAIL",
    "message": "invalid username and password!",
}
```

---


### GET /Products

> Get all Products


#### Request Body
_Example:_

```json
{
   "none"
}
```

#### Request Headers

```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJyYWdpbEBtYWlsLmNvbSIsImlhdCI6MTU5NDk4NzI4MX0.CCCYalkivz5UFmon205zvNJnQ08l1ggTbJE4RJ2MO9o"
}
```

#### Response (200 - OK)

```json
[
    {
        "id": 1,
        "name": "makan ayam tongseng",
        "image_url": "Preparing",
        "price": 5000000,
        "stock": 1,
        "createdAt": "2020-07-17T12:25:17.867Z",
        "updatedAt": "2020-07-17T12:25:17.867Z",
    },
    {
        "id": 2,
        "name": "dada",
        "image_url": "Processing",
        "price": 5000000,
        "stock": 2,
        "createdAt": "2020-07-17T12:37:09.885Z",
        "updatedAt": "2020-07-17T12:37:09.885Z",
    },
]
```

### POST /Products

> CREATE Product


#### Request Body
_Example:_

```json
{
   "name": "makan ayam tongseng",
    "image_url": "Preparing",
    "price": 5000000,
    "stock": 1,
}
```

#### Request Headers

```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJyYWdpbEBtYWlsLmNvbSIsImlhdCI6MTU5NDk4NzI4MX0.CCCYalkivz5UFmon205zvNJnQ08l1ggTbJE4RJ2MO9o"
}
```

#### Response (201 - OK)

```json
    {
        "id": 1,
        "name": "makan ayam tongseng",
        "image_url": "Preparing",
        "price": 5000000,
        "stock": 1,
        "createdAt": "2020-07-17T12:25:17.867Z",
        "updatedAt": "2020-07-17T12:25:17.867Z",
    },
```

#### Response (400 - Bad Request)

```json
{
    "error_code": "SequelizeValidationError",
    "message": [
        "name is required",
        "Email already Registered",
        "Email is required",
        "email is not valid",
        "Password is required",
    ]
}
```

### PUT /Productss/:id

> Update data Products

#### Request Body

| Field    |   Type    |  
| :------- | :------:  | 
| name     |  String   | 
| image_url|  String   | 
| price    |  INTEGER  | 
| stock    |  INTEGER  | 

_Example:_

```json
{
    "name": "Memasak",
    "image_url": "Preparing",
    "price": 5000000,
    "stock": 2,
}
```

#### Request Headers

```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJyYWdpbEBtYWlsLmNvbSIsImlhdCI6MTU5NDk4NzI4MX0.CCCYalkivz5UFmon205zvNJnQ08l1ggTbJE4RJ2MO9o",
}
```


#### Response (200 - OK)

```json
[
    {
        "id": 5,
        "name": "Memasak",
        "image_url": "Preparing",
        "price": 5000000,
        "stock": 2,
        "updatedAt": "2020-07-17T13:11:58.904Z",
    },
]
```

### DELETE /Products/:id

> Delete data Products


#### Request Params

_Example:_

```json
"< input your params here >"
```

#### Request Headers

```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJyYWdpbEBtYWlsLmNvbSIsImlhdCI6MTU5NDk4NzI4MX0.CCCYalkivz5UFmon205zvNJnQ08l1ggTbJE4RJ2MO9o",
}
```

#### Response (200 - OK)

```json
deleted: {
    "id": 5,
    "name": "Memasak",
    "image_url": "Preparing",
    "price": 5000000,
    "stock": 2,
}
```
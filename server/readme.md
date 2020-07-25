# E-Commerce-App

Several Fitur E-Commerce-CMS:

# RESTFul Endpoints

List Endpoints :
- `POST /login`
- `GET /products`
- `PUT /products/:id`,
- `DELETE /products/:id`



#### (400 - Unauthorized)

> This error describes invalid email or password

```json
{
    "message": "email or password failed"
}
```

> This error describes access token missing

```json
{
    "message": "token not found"
}
```

#### (401 - Unauthorized)

> This error describes invalid user on resources access attempt

```json
{
    "message": "email or password incorrect"
}
```

#### (403 - Unauthorized)

> This error describes can't access this application

```json
{
    "message": "Forbidden Access"
}
```

#### (404 - Not Found)

> This error describes user not exists

```json
{
    "message": "Data not found"
}
```

#### Response (500 - Internal server error)

> This error describes server errors and undefined errors

```json
{
    "message": "Internal server error!"
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
    "email": "herianto890@gmail.com",
    "password": "password"
}
```

#### Response (200 - OK)

```json
{
    "access_token": "your token"
}
```

#### Response (401 - Unauthorized)

```json
{
    "message": "invalid username and password!"
}
```

---

## E-Commerce-CMS

### POST /products

> Create new todo


#### Request Body

| Field    |  Type  | 
| :------- | :----: | 
| name    | string | 
| img_url | string | 
| price | integer | 
| stock | integer | 

_Example:_

  #### Response (201 - Created)

  _Request Header_

  ```
{
  "access_token": "<your access token>"
}
```

```json
{
    "id": 1,
    "name": "Laptop",
    "img_url": "your_image_url",
    "price": 50000,
    "stock": 5,
    "updatedAt": "2020-07-25T09:06:04.300Z",
    "createdAt": "2020-07-25T09:06:04.300Z"
}
```

#### Response (400 - Bad Request)

```json
{
    "error_code": "SequelizeValidationError",
    "message": [
        "name is required",
        "img_url is required",
        "price is require",
        "stock is required",
    ]
}
```

---

### PUT /products/:id

> Update todo by id


#### Request Body

  ```

_Example:_

  #### Response (200 - Ok)

  _Request Header_

  ```
{
  "access_token": "your access token"
}
```

```json
[
    {
        "id": 1,
        "name": "MacBook",
        "img_url": "your_image_url",
        "price": 250000,
        "stock": 2,
        "updatedAt": "2020-07-25T09:06:04.300Z",
        "createdAt": "2020-07-25T09:06:04.300Z"
    }
]
```
#### Response (403 - Bad Request)

```json
{
    "message": "Forbidden Access"
}
```

#### Response (404 - Bad Request)

```json
{
    "message": "Data not foud"
}
```

---


### DELETE /products/:id

> DELETE todo by id


#### Request Body

  ```

_Example:_

  #### Response (200 - Ok)

  _Request Header_

  ```
{
  "access_token": "your access token"
}
```

```json
[
    {
        "id": 1,
        "name": "Laptop",
        "img_url": "your_image_url",
        "price": 50000,
        "stock": 5,
        "updatedAt": "2020-07-25T09:06:04.300Z",
        "createdAt": "2020-07-25T09:06:04.300Z"
    }
]
```

#### Response (403 - Bad Request)

```json
{
    "message": "Forbidden Access"
}
```

#### Response (404 - Bad Request)

```json
{
    "message": "Data not foud"
}
```




# E-commerce-cms

E-commerce-cms is an application to manage your e-commerce apps

## RESTful endpoints

### GET /products

> Get all products, , only user with role admin can access this

_URL_

```
http://localhost:3000/products
```

_Request Header_

```
access_token
```

_Request Body_

```
not needed
```

_Response (200)_

```
{
    "message": [
        {
            "id": 20,
            "name": "Laptop",
            "image_url": "https://d2pa5gi5n2e1an.cloudfront.net/global/images/product/laptops/ASUS_ROG_STRIX_Hero_II_/ASUS_ROG_STRIX_Hero_II__L_1.jpg",
            "price": 12000000,
            "stock": 2,
            "category": "elektronik",
            "createdAt": "2020-07-22T12:40:46.022Z",
            "updatedAt": "2020-07-22T12:40:46.022Z"
        },
    ]
}

```

_Response (401 - Not Authorized)_

```
{
  "message": "Please login first!"
}
```

_Response (403 - Forbidden Access)_

```
{
  "message": "forbidden access"
}
```

### GET /products/:id

> Get product base on requested id, , only user with role admin can access this

_URL_

```
http://localhost:3000/products/:id
```

_Request Header_

```
access_token
```

_Request Body_

```
not needed
```

_Response (200)_

```
{
    "message": {
        "id": 20,
        "name": "Laptop",
        "image_url": "https://d2pa5gi5n2e1an.cloudfront.net/global/images/product/laptops/ASUS_ROG_STRIX_Hero_II_/ASUS_ROG_STRIX_Hero_II__L_1.jpg",
        "price": 12000000,
        "stock": 2,
        "category": "elektronik",
        "createdAt": "2020-07-22T12:40:46.022Z",
        "updatedAt": "2020-07-22T12:40:46.022Z"
    }
}
```

_Response (401 - Not Authorized)_

```
{
  "message": "Please login first!"
}
```

_Response (403 - Forbidden Access)_

```
{
  "message": "forbidden access"
}
```

### POST /products

> Create new product, only user with role admin can access this

_URL_

```
http://localhost:3000/products
```

_Request Header_

```
access_token
```

_Request Body_

```
{
    "title": "Learn third API",
    "category": "Todo",
}
```

_Response (201)_

```
{
    "message": {
        "id": 60,
        "name": "Laptop",
        "image_url": "https://d2pa5gi5n2e1an.cloudfront.net/global/images/product/laptops/ASUS_ROG_STRIX_Hero_II_/ASUS_ROG_STRIX_Hero_II__L_1.jpg",
        "price": 12000000,
        "stock": 2,
        "category": "elektronik",
        "updatedAt": "2020-07-25T07:22:11.846Z",
        "createdAt": "2020-07-25T07:22:11.846Z"
    }
}
```

_Response (400 - Bad Request)_

```
{
  "message": "name cannot empty, image cannot empty, Wrong image format, wrong price format, Price must be greater than 0, stock cannot empty, wrong stock format, stock must be greater than 0, category cannot empty"
}
```

_Response (401 - Not Authorized)_

```
{
  "message": "Please login first!"
}
```

_Response (403 - Forbidden Access)_

```
{
  "message": "forbidden access"
}
```

### PUT /products/:id

> Edit products based on id, , only user with role admin can access this

_URL_

```
http://localhost:3000/products/:id
```

_Request Header_

```
access_token
```

_Request Body_

```
{
    "name": "Laptop",
    "image_url": "https://d2pa5gi5n2e1an.cloudfront.net/global/images/product/laptops/ASUS_ROG_STRIX_Hero_II_/ASUS_ROG_STRIX_Hero_II__L_1.jpg",
    "price": 12000000,
    "stock": 2,
    "category": "elektronik",
}
```

_Response (200)_

```
{
    "message": [
        1,
        [
            {
                "id": 23,
                "name": "Laptop",
                "image_url": "https://d2pa5gi5n2e1an.cloudfront.net/global/images/product/laptops/ASUS_ROG_STRIX_Hero_II_/ASUS_ROG_STRIX_Hero_II__L_1.jpg",
                "price": 12000000,
                "stock": 2,
                "category": "elektronik",
                "createdAt": "2020-07-22T12:40:47.391Z",
                "updatedAt": "2020-07-25T07:30:15.621Z"
            }
        ]
    ]
}
```

_Response (404 - Not Found)_

```
{
  "message": "data not Found"
}
```

_Response (400 - Bad Request)_

```
{
  "message": "name cannot empty, image cannot empty, Wrong image format, wrong price format, Price must be greater than 0, stock cannot empty, wrong stock format, stock must be greater than 0, category cannot empty"
}
```

_Response (401 - Not Authorized)_

```
{
  "message": "Please login first!"
}
```

_Response (403 - Forbidden)_

```
{
  "message": "forbidden access"
}
```

### DELETE /products/:id

> DELETE products. , only user with role admin can access this

_URL_

```
http://localhost:3000/products/:id
```

_Request Body_

```
not needed
```

_Request Header_

```
access_token
```

_Response (200)_

```
{
    "message": "success delete"
}
```

_Response (401 - Not Authorized)_

```
{
  "message": "Please login first!"
}
```

_Response (403 - Forbidden)_

```
{
  "message": "forbidden access"
}
```

_Response (404 - Not Found)_

```
{
  "message": "data not found"
}
```

### POST /login

> Login User

_URL_

```
http://localhost:3000/login
```

_Request Header_

```
not needed
```

_Request Body_

```
{
  "email": "halo@mail.com",
  "password": "1111"
}
```

_Response (200)_

```
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJiaW1hMTIzQGdtYWlsLmNvbSIsImlhdCI6MTU5NDA0MDIxOX0.4ngkGDY0O8VwYbo1IjNXelY9gH9fa60YoAl_wHziKwo"
}
```

_Response (400 - Bad Request)_

```
{
  "message": "Wrong Email/Password"
}
```

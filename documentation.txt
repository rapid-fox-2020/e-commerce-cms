# My-Ecommerce-CMS

This server has:
- RESTful endpoint for asset's CRUD Operation
- JSON Formatted response

List Endpoints
- POST /login
- GET /products
- POST /products
- GET /products/:id
- PUT /products/:id
- DELETE /products/:id

## RESTful Endpoints

 ### POST /login
  * Request header
    no needed
  * Request Body
    {
      "email": "<email_for_login>"
      "password": "<password_for_login>"
    }
  * Response(200)
    {
      "token": "<access_token_JWT>"
    }
  * Response(401)
    {
      "message" : "<AuthValidationError>"
    }
  * Response(404)
    {
      "message" : "Email Not Found"
    }


### GET /products
  * Request header
    accessToken : "<token_by_localStorage>"
  * Request Body
    no needed
  * Response (200)
    [
      {
        "id": 1,
        "name": "Baju pertama",
        "image_url": "https://ecs7.tokopedia.net/img/cache/700/product-1/2018/8/9/6143497/6143497_b4519a1b-9e8a-45d2-8359-73c787f39bf9_640_640.jpg",
        "price": 100000,
        "stock": 10,
        "category": "Kemeja",
        "createdAt": "2020-07-25T01:51:18.976Z",
        "updatedAt": "2020-07-25T04:57:46.447Z"
      },
      {
        "id": 2,
        "name": "Baju 2",
        "image_url": "https://cf.shopee.co.id/file/e7e4fc1cd889153622715774b0193f54",
        "price": 100000,
        "stock": 10,
        "category": "Kaos",
        "createdAt": "2020-07-25T01:51:18.977Z",
        "updatedAt": "2020-07-25T01:51:18.977Z"
      }
    ]
  * Response (500) - Internal Server Error
    {
      "message": "Internal Server Error"
    }

### POST /products
  * Request header
    accessToken : "<token_by_localStorage>"
  * Request Body
    {
      "name": "<name to get insert into>",
      "image_url": "<image_url to get insert into>",
      "price": "<price to get insert into>",
      "stock": "<stock to get insert into>",
      "category": "<category to get insert into>"
    }
  * Response (201)
    {
      "id": <given id by system>,
      "name": "<added_name>",
      "image_url": "<added image_url>",
      "price" : "<added_price>",
      "stock": "<added_stock>",
      "category": "<added_category>"
      "createdAt": "2020-03-20T07:15:12.149Z",
      "updatedAt": "2020-03-20T07:15:12.149Z",
    }
  * Response (400)
    {
      "message": "<ValidationError>"
    }
  * Response (500)
    {
      "message" : "Internal Server Error"
    }

### GET /products/:id
  * Request header
    accessToken : "<token_by_localStorage>"
  * Request Body
    no needed
  * Response (200)
    {
        "id": "<product_id>",
        "name": "<product_title>",
        "image_url": "<product_image_url>",
        "price" : "<product_price>",
        "stock": "<product_stock>",
        "category": "<product_category>"
        "createdAt": "2020-03-20T07:15:12.149Z",
        "updatedAt": "2020-03-20T07:15:12.149Z",
      }
  * Response(404)
    {
      "message": "Data Not Found"
    }
  * Response (500) - Internal Server Error
    {
      "message": "Internal Server Error"
    }

### PUT /products/:id
  * Request header
    accessToken : "<token_by_localStorage>"
  * Request Body
    {
      "name": "<name to update>",
      "image_url": "<image_url to update>",
      "price": "<price to update>",
      "stock": "<stock to update>",
      "category": "<category to update>",
    }
  * Response (200)
    {
      "id": "<generatedsystemid>",
      "name": "<product updated name>",
      "image_url": "<product updated image_url>",
      "price" : "<product updated price>",
      "stock": "<product updated stock>",
      "category": "<product updated category>",
      "createdAt": "2020-03-20T07:15:12.149Z",
      "updatedAt": "<updated date and time>",
    }
  * Response(404)
    {
      "message": "Data Not Found"
    }
  * Response(400)
    {
      "message": "<ErrorValidation>"
    }
  * Response (500) - Internal Server Error
    {
      "message": "Internal Server Error"
    }

### DELETE /products/:id
  * Request header
    accessToken : "<token_by_localStorage>"
  * Request Body
    no needed
  * Response (200)
    {
      "id": <deleted_id>,
      "name": "<deleted product name>",
      "image_url": "<deleted product image_url>",
      "price" : "<deleted product price>",
      "stock": "<deleted product stock>",
      "category": "<deleted product category>",
      "createdAt": "2020-03-20T07:15:12.149Z",
      "updatedAt": "2020-03-20T07:15:12.149Z,
    }
 * Response(404)
    {
      "message": "Data Not Found"
    }
 * Response (500) - Internal Server Error
    {
      "message": "Internal Server Error"
    }

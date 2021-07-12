# GETIR API TASK
This apps helps to fetch record from database and display it to the user in a clean format 

```
Node
javascript
Libaries : Eslint, jest, mongoose
```
**Install all dependencies**
```
- Download or clone the repositories
- Open terminal inside the root directory of clone folder
- npm install
- add .env at root directory  and start the application
```

**Start the application**
```
npm run start
```
**Run all tests**
```
npm run test
```

**Run development enviroment**
```
npm run dev
```
**Run linting**
```
npm run lint
```
**Details**
```
Http Method: Post
base Url:https://getir-tasks.herokuapp.com
Path: /v1/records
```
| Status Code | Description                                 |
| ----------- | ------------------------------------------- |
| 0           | Operation was successful                    |
| 400       | Invalid request payload provided            |
| 500       | Internal Server error|

```

```
### Sample request body
    {
       "startDate": "2016-01-26",
       "endDate": "2018-02-02",
       "minCount": 2700,
       "maxCount": 3000
    }
```

```
### Sample Success Response Body

    {
        "code": 0,
        "msg": "Success",
        "records": [
            {
            "key": "NOdGNUDn",
            "createdAt": "2016-01-28T07:10:33.558Z",
            "totalCount": 2813
        },
            {
            "key": "ibfRLaFT",
            "createdAt": "2016-12-25T16:43:27.909Z",
            "totalCount": 2892
        }
        ]
    }
```
```
For more documentation on endpoints, please kindly check https://documenter.getpostman.com/view/7667873/Tzm8Ev3R

#-------------------------------Environment variables--------------------------------------------------

 Just as provided in sample.env

``
PORT=''
MONGODB_URL=''
``
#
The app is hosted on heroku. The base url is <a href="https://getir-tasks.herokuapp.com">https://getir-tasks.herokuapp.com</a>.

##  AUTHOR
Oluwole


# BE Api Documentation provided by Mahdi
This Documents contains sample data of API response:

Json format of to do item:
	{
    "id": 77,
    "name": "A item",
    "completed": false,
    "updated_at": "2021-11-04 03:53:20",
    "created_at": "03:53:20",
    "index": 0,
    "picture": {
        "picture": "todoImages/u73NWbOK8cbvRuBjAEeD0epUFuSr7p4vIS3Pytb0.png",
        "Thumbnail":	"todoImages/thumbnail/thumbnail_u73NWbOK8cbvRuBjIS3Pytb0.png"
    }
}
 
# Get Todo list:
For all the items Request to: Get /api/todo/
Response: HTTP status 200 and Pagination of todo item,
Response: HTTP status 404 in case of not found.
For all Completed items Request to: Get /api/todo/completed
Response: HTTP status 200 and Pagination of todo item,
Response: HTTP status 404 in case of not found.
For all pending items Request to: Get /api/todo/pending
Response: HTTP status 200 and Pagination of todo item,
Response: HTTP status 404 in case of not found.


# The blow is a sample of pagination data:
{
    "current_page": 1,
    "data": [
        {
            "id": 77,
            "name": "A item",
            "completed": false,
            "updated_at": "2021-11-04 03:53:20",
            "created_at": "03:53:20",
            "index": 0,
            "picture": {
                "picture": "todoImages/u73NWbOK8cbvRuBjAEeD0epUFuSr7p4vIS3Pytb0.png",
                "thumbnail": "todoImages/thumbnail/thumbnail_u73NWbOK8cbvRuBjAIS3Pytb0.png"
            }
        },
        {
            "id": 78,
            "name": "A item",
            "completed": false,
            "updated_at": "2021-11-04 03:53:56",
            "created_at": "03:53:56",
            "index": 1,
            "picture": {
                "picture": "todoImages/Nsk8ZW7RpZoWuYph5bGG908beip56tCeqFYhLtli.png",
                "thumbnail": "todoImages/thumbnail/thumbnail_Nsk8ZW7RpZoCeqFYhLtli.png"
            }
        },
        {
            "id": 79,
            "name": "A item",
            "completed": false,
            "updated_at": "2021-11-04 03:55:27",
            "created_at": "03:55:27",
            "index": 2,
            "picture": {
                "picture": "todoImages/GgumyKzi0JiEPZmQ0TZdB4NLbLGPJh2cOaPX0Wtm.png",
                "thumbnail": "todoImages/thumbnail/thumbnail_GgumyKzi0JLGPJh2cOaPX0Wtm.png"
            }
        }
    ],
    "first_page_url": "http://127.0.0.1:8000/api/todo?page=1",
    "from": 1,
    "last_page": 1,
    "last_page_url": "http://127.0.0.1:8000/api/todo?page=1",
    "links": [
        {
            "url": null,
            "label": "&laquo; Previous",
            "active": false
        },
        {
            "url": "http://127.0.0.1:8000/api/todo?page=1",
            "label": "1",
            "active": true
        },
        {
            "url": null,
            "label": "Next &raquo;",
            "active": false
        }
    ],
    "next_page_url": null,
    "path": "http://127.0.0.1:8000/api/todo",
    "per_page": 8,
    "prev_page_url": null,
    "to": 3,
    "total": 3
}


# Create todo list item
To create a todo item: Post /api/todo/
Post data {name: String, picture: File(PNG, JPG, JPEG)}
Response with: HTTP status 201, {todo Item}, with location header.
Response with: HTTP status 500 in case of a failure, with {error: 11}.
//Code 11 for could not save to db error

# Delete todo by id:
To Delete todo item: Delete /api/todo/{id}
Response with: HTTP status 204 in case of success,
Response with: HTTP status 404 in case of resources not found,
Response with: HTTP status 500 in case of internal error,


# Edit todo item:
To Edit a Todo item: Post /api/todo/{id}?_method=patch, //to support file
Patch data fields to be edited: {name, completed ,file}
Response with: HTTP status 200 in case of success with location header,
Response with: HTTP status 400 in case of bad request,
Response with: HTTP status 404 in case of resources not found,
Response with: HTTP status 500  in case of a failure, with {error: 11}.
//Code 11 for could not save to db error
	
# Logic to change todo sort position:
To rearrange to item:  Patch /api/todo/reorder/{id}
X-www-form-data Patch data fields:{ index}
Response: HTTP status 200 and the item’s new updated order,
Response with: HTTP status 500  in case of a failure, with {error: 12}.
//Code 12 for could not update the db for the new order 

# Picture download:
To get the picture:  GET api/todo/picture/
X-www-form-data Get data fields:{ picture }
Response with: HTTP status 200 in case and a picture,
Response with: HTTP status 400 in case of bad request,
Response with: HTTP status 500 in case of internal error,


# Note: the todo items will be sorted by their index of the items, in the creation of the a new item it’s index will be incremented for example a list of:
[{name: A, index:0},{name: A, index:2},{name: A, index:3}]
The index of the new inserted item will be 4 and it will be on the top of the list: 
[{name: A, index:0},{name: A, index:2},{name: A, index:3},{name: A, index:4}]
That way it decrease the overhead of shifting the index of the whole list items in the insertion 





# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).










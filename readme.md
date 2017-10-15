REST - Representational state transfer
        --A mapping between HTTP routes and CRUD
          --CRUD : CREATE READ UPDATE DESTROY

                RESTFUL ROUTES

name        url                 verb        desc.                                                         Mongoose Method
===============================================================================================================================
INDEX       /dogs               GET         Displays a list of dogs                                  dog.find()
NEW         /dogs/new           GET         Displays a form to make a new dogs                       N/A
CREATE      /dogs               POST        Add new dog to the DB.                                   dog.create()
SHOW        /dogs/:id           GET         Shows info about one dog                                 dog.findById()
EDIT        /dogs/:id/edit      GET         Show edit form for one dog                               dog.findById()
UPDATE      /dogs/:id           PUT         Update is a particular dog, then redirect somewhere      dog.findByIdAndUpdate()
DESTROY     /dog/:id            DELETE      Delete a particular dog, then redirect somewhere         dog.findByIdAndRemove()


Download the following packages by running npm install

these can also be found at dependencies at package.json file 

body-parser": "^1.17.2",
    "connect-flash": "^0.1.1",
    "ejs": "^2.5.7",
    "express": "^4.15.4",
    "express-session": "^1.15.5",
    "method-override": "^2.3.10",
    "mongoose": "^4.11.9",
    "passport": "^0.4.0",
    "passport-local": "^1.0.0",
    "passport-local-mongoose": "^4.2.1"

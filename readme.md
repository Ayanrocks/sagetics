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

-H.W-1
-Create a repository
-Initialize the repository
-Node_mmodules,package.json,package-lock.json
-Install express
-Create Server
-Listern to port 3000
-Write request handler for/test, /hello
-Install nodemon and update scripts inside    package.json
-What is the use of "-g" while npm istall
-Difference between caret and tilde (^ vs ~)

- Initialize git
-.gitignore
-Create a remote repo on github
-Push all code tp remote Origin
-Play with routes extensions ex. /hello, /,hello/2,/xyz
-Order of routes matter a lot
-Install Postman App and make a workspace/collection > test Api call
-Write Logic to handle GET,POST,PATCH,DELETE,API call and test them on Postman
-Explore routing and use of  ? , + ,(), * in the routes
-Use of regex query params int he routes
-Reading the dynamic routes


-Multiple Routes Handlers- Play with the code
-next()
-next function and errors along with res.send()
-app.use("/route",rH,(rH2,rH3),rH4,rH5)
-what is Middleware ? Why do you need it
-How Express JS basically Hnadles request behind the scene
-Difference Between app.use and app.all
-Write a dummy auth middleware for all user routes,except /user/login
-Error Handling using app.use("/),(err,req,next)={}



-Create A free Cluster on MongoDB officals Website(Mondo Atlas)
-Install Mongoose libary
-Connect Your Applicvation to the Database <"Connection-url"/devTinder>
-Call the connectedDB function and connect to database before starting application 3000
-Create A User Schema & user MOdels
-Crearte POST/Sigup API to add data to dataabse
-Push some document using API calls from Postman



-Diffrenece between Javascript and JSON
-Add the express.json middleware to your app
-Make your signup API dynamic to recive data from the user
-User.findOne() with duplicate email ids, which one will return
-API Get user by email
-API -FEED API-GET/feed -get all the users from the database
-API -Get user byID
-Create a delete user API
-Difference between PATCH  and  PUT
-API- Update auser
-Explore the mongoose Documentation for model Methods
-What are option in a model.fondeAndUpdate method , explore more about it
-API- Update the User with EmailID


-Explore Schematypes option from the document
-ass required, unique lowercase, min, minlength,trim-Add default
-Create a custom validate function for gender
-Improve the DB Schema -Putt all required appropiate validation on each filed in Schema
-Add timestamps to the userSchema
-Add API Level validation on Patch request & Signup Post API
-DATA SENITIZATION-Add API validation for each filed
-Install Validator
-Use Validator library Function to Explore other Validation like password ,PhotoUrl,
-NEVER TRUST req.body




-Validate data in Signup API
-Install bcrypt package
-Create PasswordHash Using bcrypt.hash & save the use in encrypted password
-Create Login Api
-Compare password and throw errors if email or password is invalid




**very imporatnt expsiode for Backend secure code**(ep-10)


-Install cookie-parse
-just send a dummy cookie to user
-Create GET/Profile API and check If you get the cokkie back
-INSTALL JSONwebToken
-IN Login API, after email & pass validation Create a JWT token send it to user
-read the cookies inside your Profile API, and find the logged in user
-userAuth middleware
-Add the userAuth middleware in profile API and a new SendConnectioRequest
-Set the expiry of JWT token and cokkies to 7 days
-Create User Schema Methods to getJWT()
-Create UserSchema method to comparePassword(PasswordInputByUser)



-Explore tinder APIs
-Create a List all API you can think of in DevTinder
-Group multiple routes under respescives routers
-Read documentation for express.Router
-Create routes folder for managing auth,profile,request roputers
-create authRouter,profileRouter,requesstRouter
-Import these routers in app.js
-Create POST/Logout API
-Create PATCH /profile/edit
-Create PATCH /profile/password API => forgot password API
-Make you validate ,all API
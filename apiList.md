# DevTinder API


## authRouter
-POST /Signup
-POST /login
-POST /logout

## profilerouter
-GET /profile/view
-PATCH /profile/edit
-PATCH /profile/paasword


## connectionRequestRouter
-POST /request/send/intrested/:userId
-POST /request/send/ignore/:userId
-POST /request/review/accepted/:requestId
-POST /request/review/rejected/:requestId


## userRouter
-GET /user/connections
-GET /user/request
-GET /user/feed -Gets you the profile of others platform





status: ignore,intrested,accepted,rejected
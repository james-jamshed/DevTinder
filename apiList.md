# DevTinder API


## authRouter
-POST /Signup
-POST /login
-POST /logout

## profilerouter
-GET /profile/view
-PATCH /profile/edit
-PATCH /profile/paasword // Forgot password API (H.W)


## connectionRequestRouter
-POST /request/send/status/:userId (status : ignore and accept)

-POST /request/review/accepted/:requestId
-POST /request/review/rejected/:requestId


## userRouter
-GET /user/connections
-GET /user/request
-GET /user/feed -Gets you the profile of others platform





status: ignore,intrested,accepted,rejected
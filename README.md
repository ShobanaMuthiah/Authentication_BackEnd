# Authentication API
This documentation covers the endpoints available for user authentication, including registration, login, forgot password and reset password.
#### Base URL:-
###### https://authentication-backend-tgky.onrender.com
This ensures the api is running on appropriate port
#### Registration API:-
###### https://authentication-backend-tgky.onrender.com/api/userregister
User registers with Username, Email and creating new password
#### Login API:-
###### https://authentication-backend-tgky.onrender.com/api/userlogin
User login with registered email and password
#### Forgot password API:-
###### https://authentication-backend-tgky.onrender.com/api/forgotpassword
If user does not know the registered password, who can generates the token through nodemailer by posting email id 
#### Reset password API:-
###### https://authentication-backend-tgky.onrender.com/api/reset-password/<token>
When the user generates the token, particular token will be searched into this api

##### POSTMAN DOCUMENTATION URL:-
###### https://documenter.getpostman.com/view/34996607/2sA3XLFjPv


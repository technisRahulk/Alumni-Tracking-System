# Alumni-Tracking-System

# Alumni-Tracking-System

This web portal let's us connect with the alumni of our college and for the alumni to
posts blogs and chat with the rest of us.

## Installation

1. Clone the repository.
2. Run `git pull origin master`.
3. Run `npm install` in the command prompt to install all related dependencies.
4. Create a ".env" file in the root directory.
5. Insert `MONGO_URL=mongodb+srv://ats_admin:<password>@cluster0.nmzuf.mongodb.net/development?retryWrites=true&w=majority`
in .env file. Also replace the **password** with the given password.
6. Add the `NODEMAILER_EMAIL`, `NODEMAILER_PASSWORD`, `NODEMAILER_SECONDARYEMAIL`, `JWT_SECRET`, `GoogleClientId`, `GoogleClientSecret` to the ".env" file present in root directory. 
7. Run `npm start` or `npm run start`.

## Routes

* `/blog` routes

Get `/blog` route to render the main blog page

Get `/blog/create` route to render the create blog page

Post `/blog/create` route to post a new blog

Get `/blog/view/:slug` route to render the complete single blog page

Get `/blog/blogs` route to render the all the blogs

Post `/blog/appreciate/:blog_id` route to like a particular blog

Post `/blog/bookmark/:bookmark_id`route to save a bookmark

Get `/blog/delete/:blog_id` route to remove a particular blog from the blog page

Get `/blog/bookmarks` route to render the bookmarks page of a user 

Get `/blog/recentblogs` route to render the new/recent blogs

* `/users` routes

Get `/users/login` route to render login page

Post `/users/login` route to submit form for login

Get `/users/logout` route to logout the user

Get `/users/logoutAll` route to logout from all logged in devices 

Get `/users/me/avatar` route to render the user profile image

Post `/users/me/avatar` route to change user profile image



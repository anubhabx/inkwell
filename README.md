  <div align="center">
  <h1 align="center">
  <a href="https://inkwell-l684.onrender.com" target="_blank">InkWell</a>
  </h1>
  <h3>Codebase for the InkWell platform</h3>
  <h3>◦ Developed with the software and tools below.</h3>
  <p align="center"><img src="https://img.shields.io/badge/-Node.js-004E89?logo=Node.js&style=social" alt='Node.js\' />
<img src="https://via.placeholder.com/1/0000/00000000" alt="spacer" /><img src="https://img.shields.io/badge/-Express.js-004E89?logo=Express.js&style=social" alt='Express.js\' />
<img src="https://via.placeholder.com/1/0000/00000000" alt="spacer" /><img src="https://img.shields.io/badge/-MongoDB-004E89?logo=MongoDB&style=social" alt='MongoDB\' />
<img src="https://via.placeholder.com/1/0000/00000000" alt="spacer" /><img src="https://img.shields.io/badge/-Mongoose-004E89?logo=Mongoose&style=social" alt='Mongoose\' />
<img src="https://via.placeholder.com/1/0000/00000000" alt="spacer" /><img src="https://img.shields.io/badge/-JWT%20%20JSON%20Web%20Tokens%20-004E89?logo=JWT%20%20JSON%20Web%20Tokens%20&style=social" alt='JWT (JSON Web Tokens)\' />
<img src="https://via.placeholder.com/1/0000/00000000" alt="spacer" /><img src="https://img.shields.io/badge/-DiceBear%20%20for%20generating%20avatars%20-004E89?logo=DiceBear%20%20for%20generating%20avatars%20&style=social" alt='DiceBear (for generating avatars)"' />
<img src="https://via.placeholder.com/1/0000/00000000" alt="spacer" />
  </p>
  <h3>Hosted on Render</h3>
  <p align="center"><img src="https://img.shields.io/badge/-Render-004E89?logo=Render&style=social" alt='Render\' />
  </p>
  <a href="https://inkwell-l684.onrender.com" target="_blank">View the live site</a>
  </div>
  
  ---
  ## 📚 Table of Contents
  - [📚 Table of Contents](#-table-of-contents)
  - [🔍 Overview](#-overview)
  - [🌟 Features](#-features)
  - [📁 Repository Structure](#-repository-structure)
  - [💻 Code Summary](#-code-summary)
  - [🚀 Getting Started](#-getting-started)
  
  ---
  
  
  ## 🔍 Overview

This is a full-stack MERN (MongoDB, Express, React, Node.js) application with a client and server directory structure. The client directory contains the frontend code for the application, while the server directory contains the backend code. The project uses MongoDB as the database, Express.js as the web framework, React.js for the user interface, and Node.js for the server-side logic. The project also includes a tailwindcss configuration file for styling and a vite.config.js file for building the application.

---

## 🌟 Features

Here is a list of features for the project:<br>

- User authentication (sign up, sign in, sign out)
- User profile management (profile picture, cover photo, bio)
- Post creation and deletion
- Comment creation and deletion
- Search functionality
- Dashboard with posts, comments, and users
- Responsive design
- Tailwind CSS configuration
- Vite.js configuration
- MongoDB database
- Express.js web framework
- React.js user interface
- Node.js server-side logic

---

## 📁 Repository Structure

```sh
├── .env
├── client
│   ├── .env
│   ├── .eslintrc.cjs
│   ├── .gitignore
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── postcss.config.js
│   ├── README.md
│   ├── src
│   │   ├── App.jsx
│   │   ├── components
│   │   │   ├── Comment.jsx
│   │   │   ├── CommentSection.jsx
│   │   │   ├── DashboardMain.jsx
│   │   │   ├── DashboardPosts.jsx
│   │   │   ├── DashboardSettings.jsx
│   │   │   ├── DashboardSidebar.jsx
│   │   │   ├── DashboardUsers.jsx
│   │   │   ├── FooterCustom.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── OAuth.jsx
│   │   │   ├── PostCard.jsx
│   │   │   ├── ProtectRoute.jsx
│   │   │   ├── ScrollToTop.jsx
│   │   │   └── ThemeProvider.jsx
│   │   ├── firebase.js
│   │   ├── index.css
│   │   ├── main.jsx
│   │   ├── pages
│   │   │   ├── About.jsx
│   │   │   ├── CreatePost.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── EditPost.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── NotFound.jsx
│   │   │   ├── PostPage.jsx
│   │   │   ├── Search.jsx
│   │   │   ├── SignIn.jsx
│   │   │   └── SignUp.jsx
│   │   ├── redux
│   │   │   ├── store.js
│   │   │   ├── theme
│   │   │   │   └── themeSlice.js
│   │   │   └── user
│   │   │       └── userSlice.js
│   │   └── utils
│   │       └── signOut.js
│   ├── tailwind.config.js
│   └── vite.config.js
├── package-lock.json
├── package.json
└── server
    ├── controllers
    │   ├── auth.controllers.js
    │   ├── comment.controllers.js
    │   ├── post.controllers.js
    │   └── user.controllers.js
    ├── database
    │   └── connect.database.js
    ├── models
    │   ├── comment.model.js
    │   ├── post.model.js
    │   └── user.model.js
    ├── routes
    │   ├── auth.routes.js
    │   ├── comment.routes.js
    │   ├── post.routes.js
    │   └── user.routes.js
    ├── server.js
    └── utils
        ├── error.js
        ├── generateCoverPhoto.js
        ├── generateProfilePicture.js
        └── verifyToken.js

```

---

## 💻 Code Summary

<details><summary>\client</summary>

| File               | Summary                                                                                                                              |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| postcss.config.js  | The code defines a JavaScript object with a `plugins` property that contains two plugins: `tailwindcss` and `autoprefixer`.          |
| tailwind.config.js | The code defines a Tailwind CSS configuration file that specifies the content, theme, and plugins to be used for the project.        |
| vite.config.js     | The code defines a Vite configuration file that sets up a development server with a proxy for the API, and enables the React plugin. |

</details>

---

<details><summary>\client\src</summary>

| File        | Summary                                                                                                                                                                                                                           |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| App.jsx     | The code defines a React component called `App` that renders a header, footer, and routes for different pages in the application. It also includes a `ProtectRoute` component to protect certain routes from unauthorized access. |
| firebase.js | The code initializes the Firebase SDK and exports the initialized app object, which can be used to access Firebase services such as authentication, database, storage, and analytics.                                             |
| main.jsx    | The code initializes the React application by creating a root element and rendering the App component within it, using the PersistGate component to persist data in the Redux store.                                              |

</details>

---

<details><summary>\client\src\components</summary>

| File                  | Summary                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Comment.jsx           | The code defines a React component called Comment that displays a single comment, including the user who made the comment, the comment text, and an edit and delete button. The component also includes a modal for deleting the comment.                                                                                                                                                                                                                   |
| CommentSection.jsx    | The code defines a React component called CommentSection that displays a form for users to leave comments on a post, as well as a list of existing comments. It uses the Flowbite-React library for styling and the react-redux library for state management.                                                                                                                                                                                               |
| DashboardMain.jsx     | The code is a React component that renders a dashboard for a user, allowing them to edit their profile information and upload a profile picture. It uses the Firebase storage API to handle file uploads and the Redux state management library to manage the user's authentication status.                                                                                                                                                                 |
| DashboardPosts.jsx    | The code is a React component that displays a list of posts from a user's dashboard, allowing the user to edit or delete each post. It uses the `useState` hook to manage state such as the list of posts, loading status, and modal visibility. The component also uses the `useEffect` hook to fetch posts from an API when the component mounts and when the user's ID changes.                                                                          |
| DashboardSettings.jsx | The code is a React component that renders a dashboard settings page for a user, allowing them to manage their account settings and change their password. It includes a form for updating email preferences, a form for changing the user's password, and a button for deleting the user's account. The component also includes a modal for confirming the deletion of the account.                                                                        |
| DashboardSidebar.jsx  | The code defines a React component called `DashboardSidebar` that renders a sidebar navigation menu for the dashboard page. The sidebar includes links to different pages, such as the user profile, posts, and settings, as well as a sign out button. The component uses Redux to manage the user's role and authentication state, and it dispatches an action to sign the user out when the sign out button is clicked.                                  |
| DashboardUsers.jsx    | The code is a React component that displays a list of users and allows the user to delete them. It uses the Flowbite-React library for styling and the react-toastify library for displaying toasts. The component fetches users from an API endpoint and displays them in a table, with a Show More button to load more users. When the user clicks on the Delete button next to a user, a modal appears asking for confirmation before deleting the user. |
| FooterCustom.jsx      | The code defines a custom footer component for a React application, using the Flowbite React library, which includes a container, links, and social media icons.                                                                                                                                                                                                                                                                                            |
| Header.jsx            | The code defines a React component called Header that renders a navigation bar with various links and a search input. It also includes a dropdown menu for the user's profile and a sign-out button if the user is logged in.                                                                                                                                                                                                                               |
| OAuth.jsx             | The code defines a React component that renders a button for signing in or signing up with Google using Firebase authentication. When the button is clicked, it calls the `signInWithPopup` method to authenticate the user with Google and then sends a POST request to the server to create a new user account if necessary. If successful, the user is redirected to the homepage.                                                                       |
| PostCard.jsx          | The code defines a React component called PostCard that renders a card with an image, title, category, and a button to read the article.                                                                                                                                                                                                                                                                                                                    |
| ProtectRoute.jsx      | The ProtectRoute component in React Redux checks if a user is logged in and redirects to the sign-in page if not.                                                                                                                                                                                                                                                                                                                                           |
| ScrollToTop.jsx       | The ScrollToTop component in React uses the useLocation hook from react-router-dom to detect changes in the current URL pathname and scrolls to the top of the page when the pathname is not equal to search                                                                                                                                                                                                                                                |
| ThemeProvider.jsx     | The code defines a React component called ThemeProvider that uses the useSelector hook from react-redux to retrieve the current theme from the state and applies it as a class name to a div element, allowing for dynamic theming in a React application.                                                                                                                                                                                                  |

</details>

---

<details><summary>\client\src\pages</summary>

| File           | Summary                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| About.jsx      | The code is a React component that renders an about page for a web application, featuring information about the project, the developer, and other projects.                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| CreatePost.jsx | The CreatePost component is a form for creating a new post, allowing the user to input a title, category, content, and an image. The form submits a POST request to the backend API to create the post, and upon success, redirects the user to the created post's page.                                                                                                                                                                                                                                                                                                                                 |
| Dashboard.jsx  | The code defines a React component called Dashboard that renders a dashboard layout with a sidebar, main content area, and a tabbed interface for switching between different views.                                                                                                                                                                                                                                                                                                                                                                                                                     |
| EditPost.jsx   | The code is a React component that allows users to edit a post by providing a title, category, content, and an image. It uses Firebase for storage and authentication, and it utilizes the react-quill library for rich text editing. The component fetches the post data from the server using the fetch API, and it updates the post data using the PUT method.                                                                                                                                                                                                                                        |
| Home.jsx       | The code is a React component that renders a homepage for a personal blog app, displaying recent posts and a banner with a link to the author's GitHub profile.                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| NotFound.jsx   | The code defines a React component called NotFound that displays a 404 error page with a button to navigate back to the homepage.                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| PostPage.jsx   | The code fetches a post from an API endpoint based on the slug parameter, and displays it in a React component.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| Search.jsx     | The code is a React component that renders a search page with a form for searching posts by category, sort order, and search term. It also displays the search results in a list of PostCard components.                                                                                                                                                                                                                                                                                                                                                                                                 |
| SignIn.jsx     | The code defines a React component called SignIn that renders a form for signing in to an application. It uses the react-hook-form library to handle form submission and validation, and the zod library to define a schema for validating the form data. The component also uses the react-router-dom library to navigate to the homepage after successful sign-in.                                                                                                                                                                                                                                     |
| SignUp.jsx     | The code defines a React component called SignUp that renders a form for users to sign up for an account on a website. The form includes input fields for username, email, password, and confirmation of the password, as well as a submit button. The component also includes a custom hook called useForm from the react-hook-form library, which is used to validate the form data and handle form submission. The component also imports several other components and libraries from other packages, including flowbite-react react-icons/ai react-router-dom zod react-toastify and react-hook-form |

</details>

---

<details><summary>\client\src\redux</summary>

| File     | Summary                                                                                                                                          |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| store.js | The code defines a Redux store with a root reducer that combines two slice reducers (user and theme) and persists the state using Redux Persist. |

</details>

---

<details><summary>\client\src\redux\theme</summary>

| File          | Summary                                                                                                                                                             |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| themeSlice.js | The code defines a Redux slice for managing the theme of an application, with an initial state of light and a reducer that toggles the theme between light and dark |

</details>

---

<details><summary>\client\src\redux\user</summary>

| File         | Summary                                                                                                                                                                               |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| userSlice.js | The code defines a Redux slice for managing user authentication and updates, with actions for sign-in, sign-out, and update operations, and a reducer that handles the state changes. |

</details>

---

<details><summary>\client\src\utils</summary>

| File       | Summary                                                                                                                                                                                                                                                                                                                        |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| signOut.js | The code defines a function called `signOut` that uses the `useDispatch` hook from React Redux to dispatch an action called `signOutStart`, then makes a GET request to the `/api/auth/sign-out` endpoint with credentials included, and if successful, displays a success toast message and navigates to the `/sign-in` page. |

</details>

---

<details><summary>\server\controllers</summary>

| File                   | Summary                                                                                                                                                                                                                                                            |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| auth.controllers.js    | The code is a set of functions for user authentication, including sign-up, sign-in, and sign-out. It also includes a function for Google authentication.                                                                                                           |
| comment.controllers.js | The code defines four functions for creating, retrieving, editing, and deleting comments on a post.                                                                                                                                                                |
| post.controllers.js    | The code defines four functions for creating, retrieving, deleting, and updating posts in a MongoDB database. The primary function of the code is to provide a RESTful API for managing posts, with functions for creating, reading, updating, and deleting posts. |
| user.controllers.js    | The code is a Node.js module that exports several functions for managing users, including updating a user's profile, retrieving a list of users, deleting a user, and changing a user's password.                                                                  |

</details>

---

<details><summary>\server\database</summary>

| File                | Summary                                                                                                                            |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| connect.database.js | The code connects to a MongoDB database using the mongoose library, logging a success message or an error message upon completion. |

</details>

---

<details><summary>\server\models</summary>

| File             | Summary                                                                                                                                                                                       |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| comment.model.js | The code defines a Mongoose schema for a Comment model, with fields for user ID, post ID, and comment text, and sets up timestamps for created and updated at.                                |
| post.model.js    | The code defines a Post model in MongoDB using Mongoose, with fields for user ID, title, content, category, image, likes, slug, and comments. It also specifies the timestamps for each post. |
| user.model.js    | The code defines a Mongoose schema for a User model, with fields for username, email, password, profile picture, and role.                                                                    |

</details>

---

<details><summary>\server\routes</summary>

| File              | Summary                                                                                                                                                                                                                                                                                       |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| auth.routes.js    | The code defines an Express.js router that routes HTTP requests to the appropriate controller functions for authentication-related tasks, including signing up, signing in, signing out, and using Google authentication.                                                                     |
| comment.routes.js | The code defines an Express.js router that handles requests for creating, retrieving, deleting, and editing comments, using a combination of middleware functions to verify the authenticity of the request and delegate the handling of each request to the appropriate controller function. |
| post.routes.js    | The code defines an Express.js router that handles HTTP requests for creating, retrieving, updating, and deleting posts, with authentication verification using a middleware function.                                                                                                        |
| user.routes.js    | The code defines an Express.js router that handles user-related requests, including updating a user's profile, retrieving a list of users, deleting a user, and changing a user's password. It also includes a middleware function to verify a token for authentication purposes.             |

</details>

---

<details><summary>\server</summary>

| File      | Summary                                                                                                                                                                                                                               |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| server.js | The code sets up an Express.js server with CORS, cookie parsing, and JSON body parsing, and defines routes for authentication, users, posts, and comments. It also includes error handling middleware to catch and respond to errors. |

</details>

---

<details><summary>\server\utils</summary>

| File                      | Summary                                                                                                                                                                                                          |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| error.js                  | The code defines a function called `handleError` that creates a new `Error` object with the specified status code and error message, or defaults to 500 and Internal server error if not provided.               |
| generateCoverPhoto.js     | The code defines a function called generateCoverPhoto that returns a random image from an array of image URLs.                                                                                                   |
| generateProfilePicture.js | The code generates a profile picture for a user using the DiceBear library, creating an SVG avatar based on the username and returning it as a data URI.                                                         |
| verifyToken.js            | The code verifies a JSON Web Token (JWT) sent in a request cookie, using the `jwt.verify()` function from the `jsonwebtoken` library, and sets the user ID and role on the request object if the token is valid. |

</details>

---

## 🚀 Getting Started

To get started with this project, follow these steps:<br>

1. Install the dependencies by running `npm install` or `yarn install` in the root directory of the project.
2. Create a `.env` file in the root directory and add your MongoDB connection string and other environment variables.
3. Start the server by running `npm run start` or `yarn start` in the root directory.
4. Open a new terminal window and navigate to the client directory.
5. Install the dependencies by running `npm install` or `yarn install` in the client directory.
6. Start the client by running `npm start` or `yarn start` in the client directory.
7. The application should now be running on `http://localhost:3000`.

Note: This is just a basic getting started guide, and there may be additional setup required depending on your specific use case.

---

Generated with ❤️ by [ReadMeAI](https://www.readmeai.co/).

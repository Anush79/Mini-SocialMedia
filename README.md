# Mini Social Media

[Live Link](https://socialmediabyanushka.netlify.app/)

Welcome to Mini Social Media, a simple web application that allows users to explore, interact with, and manage posts. This application is built using React and fetches data from the [JSONPlaceholder](https://jsonplaceholder.typicode.com/) API. Below, you'll find an overview of the features and instructions on running the application.

## Features

1. **Displaying Posts on Cards:**
   - The main page fetches and displays posts from the [JSONPlaceholder API](https://jsonplaceholder.typicode.com/posts) using attractive card components.

2. **Post Details Page:**
   - Clicking on a specific card redirects the user to another page displaying detailed information about the selected post.
   - Post details are fetched from the [JSONPlaceholder API](https://jsonplaceholder.typicode.com/posts/1), and associated comments are fetched using the [comments API](https://jsonplaceholder.typicode.com/posts/1/comments).

3. **Like and Favourite Functionality:**
   - Users can interact with posts by marking them as liked or favorited.

4. **Filter Options:**
   - Integrated two filter options on the main page.
   - Users can filter posts based on their favorites and liked posts.

5. **Create, Modify, and Delete Posts:**
   - Users have the ability to create new posts, modify existing posts, and delete posts using the provided APIs.
   - Utilized the following HTTP methods:
     - Create a new post: `POST /posts`
     - Modify an existing post: `PUT /posts/1` or `PATCH /posts/1`
     - Delete a post: `DELETE /posts/1`

## Getting Started

To run the application locally, follow these steps:

1. Clone the repository to your local machine:

   ```bash
   git clone [repository_url]
   cd mini-social-media
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the development server:

   ```bash
   npm start
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Contributing

If you'd like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and submit a pull request.

## Feedback

If you have any feedback or encounter issues while using the application, please [open an issue](https://github.com/yourusername/mini-social-media/issues).

Thank you for using Mini Social Media!

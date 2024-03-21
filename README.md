# E-commerce App

This app is a simplified version of **Vinted**, following a similar layout. Below you will find basic information about the features.

## Features

- **Filtering:**

  - Ability to filter products by price, brand, and gender

- **Review system:**

  - After a successful payment, triger a process that allows the buyer to leave a review before proceeding to main page
  - For each review, display the rating, review comment and user info of the reviewer

- **Product Management**
  - Adding and deleting your own products
  - Ability to mock purchase a product thanks to Stripe integration
- **User Profile:**

  - Editing user profile.
  - Adding an avatar.
  - Ability to follow users

- **Communication**

  - Sending messages to other users

- **Notifications**

  - Receiving notifications about new products from followed users
  - Notifications about unread messages in the navbar
  - Confirmation email is sent after a successful purchase

- **Admin Dashboard**
  - Dashboard provides insights into user activites such as product additions and deletions.

## Technologies

- **Backend:**
  - NestJS with PostgreSQL as the database
- **Frontend:**
  - React using Vite.

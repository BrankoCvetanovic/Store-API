# Backend Application for Product Management

This backend application provides functionalities for managing products. It uses Express.js and Mongoose to communicate with the database and offers various search capabilities.

## Installation

1. Clone the repository:
   git clone <repository_url>
2. Navigate to the project directory:
   cd project_name
3. Install dependencies:
   npm install
4. Set up your MongoDB connection string in the .env file:
   MONGODB_URI=<your_mongodb_connection_string>
5. Start the application:
   npm start

## Technologies Used

- Express.js: Web framework for Node.js
- Mongoose: MongoDB object modeling tool
- MongoDB: NoSQL database
- Node.js: JavaScript runtime environment

## Functionality

The getAllProducts function retrieves products from the database based on various query parameters such as featured, company, name, sort, fields, and numericFilters.

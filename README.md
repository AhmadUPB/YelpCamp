# YelpCamp: A Web Platform for Campground Listings

## Introduction
YelpCamp is a web platform where users can publish ads for campgrounds they want to rent out. Other users can navigate through these ads if they are searching for a campground to rent. Each ad can be opened, and reviews can be added to it. When adding new campgrounds, users can include pictures, a description, and a price. While searching for a campground, a map is displayed showing the locations of the listed campgrounds. The platform features an authentication and authorization system, allowing only the creators of specific ads or reviews to modify them. YelpCamp follows a responsive, modern web design. It uses Node.js and Express on the backend, Bootstrap and EJS on the frontend, and MongoDB as the database.

## Features
- **Ad Creation:** Users can create new campground ads by providing pictures, a description, and a price.
  
- **Review System:** Users can add reviews to ads, helping others make informed decisions about renting campgrounds.

- **Map Integration:** A map is displayed when searching for campgrounds, showing the locations of the listed campgrounds.

- **Authentication and Authorization System:** Only users who created specific ads or reviews can modify them, ensuring content integrity.

## Installation
To install and run this project locally, follow these steps:

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/AhmadUPB/YelpCamp

2. **Install Dependencies:**
   - Navigate to the project directory and install the required dependencies.
   ```bash
   cd your-repo-name
   npm install

4. **Set Up Environment Variables:**
   - Create a .env file in the root directory and add the necessary environment variables. CLoudinary is used for hosting Pictures.
   ```bash
     CLOUDINARY_CLOUD_NAME = YOUR_CLOUDINARY_CLOUD_NAME
     CLOUDINARY_KEY = YOUR_CLOUDINARY_KEY
     CLOUDINARY_SECRET = YOUR_CLOUDINARY_SECRET
     MAPBOX_TOKEN = your_mapbox_token
     DB_URL = your_mongo_db_connection_string
   
5. **Start MongoDB:**
   - Ensure MongoDB is installed and running. If MongoDB is not already running, you can start it with:
   ```bash
   mongod
6. **Start the Server:**
   - Start the Node.js server.
   ```bash
   node app.js
   
7. **Access the Project:**
   - Open your web browser and go to http://localhost:3000.


  
## Contact
For any questions or feedback, please contact Ahmad Alfakes at nm.3@hotmail.com

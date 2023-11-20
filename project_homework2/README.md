<h1 align="center"> Role-Based Access Control (RBAC) system <img align="center" alt="RBAC" width="70px" style="padding-right:10px;" src="https://cdn-icons-png.flaticon.com/512/2092/2092663.png" /> </h1>

## ✨️ Table of contents
- **[Description for this homework](https://github.com/Safa-Kamal-q/typeORM_homework2_gsg-training#%EF%B8%8F-description-for-this-homework)**
- **[Installation and Usage](https://github.com/Safa-Kamal-q/typeORM_homework2_gsg-training#%EF%B8%8F-installation-and-usage)**
- **[Explanatory video](https://github.com/Safa-Kamal-q/E-commerce-Platform#%EF%B8%8F-explanatory-video)**
- **[API documentation ](https://github.com/Safa-Kamal-q/E-commerce-Platform#%EF%B8%8F-api-documentation)**
 
## ✨️ Description for this homework:
***Build a Role-Based Access Control (RBAC) system using TypeORM and Express.js.***

Your application should have the ability to work with Users and their Roles and Permissions (A set of permission belong to a role and the user may have multiple roles), check the diagrams attached for some examples on the Role-Permission architecture 

📌 Your project may contain the following Entities (Tables):
- User
    - Attributes: id (primary key), username, password, email, etc.
    - Relationship: Many-to-Many with Role entity, One-to-One with Profile entity.
- Role
    - Attributes: id (primary key), name (e.g., "admin," "user," "editor").
    - Relationship: Many-to-Many with User entity and Many-to-Many with Permission entity.
- Permission
    - Attributes: id (primary key), name (e.g., "create_post," "edit_user," "delete_comment").
    - Relationship: Many-to-Many with Role entity.
- Profile
    - Attributes: id (primary key), firstName, lastName, dateOfBirth, etc.
    - Relationship: One-to-One with User entity.
<br />

📌 The Project should have the following API endpoints:
- Create User
- Create Permission 
- Create Role (Set permissions of the role while creating the role)
- Assign Role to User
- Get User (with his roles and permissions)
<br />

📌 Requirement:
1. Build a JWT authentication system that works on the username and password of your Role-Permission homework in the previous homework.
    * Your generated JWT token should be 2 weeks valid and contains the following data in it's payload:
        - username
        - email
        - display name

* You should have a login endpoint that validates the username and password and returns a token.
* You should have also any endpoint that validates the token (using middleware) and return the proper status/message.

2.  * Write a unit test to test the Create User function/API which you built in the last homework.
    * Write a unit test to test the Assign Role to User function/API which you built in the last homework.

📌 Submissions
- Create a GitHub repository for your project and commit your code.
- Include a README.md file with instructions on how to set up and run your application.
- Submit the GitHub repository link along with any additional documentation.

## ✨️ Installation and Usage

> ### Installation

1. Clone the repository to your local machine:

   ```
   git clone https://github.com/Safa-Kamal-q/typeORM_homework2_gsg-training.git
   
   ```
2. Install the project dependencies:
   ```
    npm install
   
   ```
3. Adding to .env file
create a .env file that contain:
- DB_HOST='localhost'
- DB_PORT= '3306'
- DB_USER_NAME='root'
- DB_PASSWORD=''
- DB_NAME='rbac' #Role-Based Access Control 
- SECRET_KEY= 'Safa1223'

> ### RUN
#### Notes
  1. to run this you must have XAMPP, DBeaver and postman
  2.  you must turn on the XAMPP to connect to DB 
      ![Screenshot (229)](https://github.com/Safa-Kamal-q/test/assets/119218518/1a3ef5fa-190d-4b09-8b98-dba081fa72e9)
---

1. Start the development server:

  ```
    npm run dev
   ```

2. The server should now be running at http://localhost:3006.
3. Use postman to try the code

--- 

### If you stuck then contact me on [linkedIn](https://www.linkedin.com/in/safa-qasrawi-073a3024b/)

## ✨️ Explanatory video
**If you prefer to see a video that show how to use the postman to test the code, also it has some information about code(In general), [Click here](https://drive.google.com/file/d/1MWnDtts_g5jGohFhYztOg4ge62yvOEP7/view?usp=drive_link)**

## ✨️ API documentation 
You can see it from [here](https://documenter.getpostman.com/view/28547878/2s9Ye8hbJ5)

## ✨️ If you like project feel free to give a star ⭐💖


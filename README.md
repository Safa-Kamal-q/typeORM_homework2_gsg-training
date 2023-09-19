# This is the description for this homework 🔥
Build a Role-Based Access Control (RBAC) system using TypeORM and Express.js.

Your application should have the ability to work with Users and their Roles and Permissions (A set of permission belong to a role and the user may have multiple roles), check the diagrams attached for some examples on the Role-Permission architecture 

Your project may contain the following Entities (Tables):
User
Attributes: id (primary key), username, password, email, etc.
Relationship: Many-to-Many with Role entity, One-to-One with Profile entity.
RoleAttributes: id (primary key), name (e.g., "admin," "user," "editor").
Relationship: Many-to-Many with User entity and Many-to-Many with Permission entity.
PermissionAttributes: id (primary key), name (e.g., "create_post," "edit_user," "delete_comment").
Relationship: Many-to-Many with Role entity.
Profile
Attributes: id (primary key), firstName, lastName, dateOfBirth, etc.
Relationship: One-to-One with User entity.
The Project should have the following API endpoints:
Create User
Create Permission 
Create Role (Set permissions of the role while creating the role)
Assign Role to User
Get User (with his roles and permissions)
Submissions- Create a GitHub repository for your project and commit your code.
- Include a README.md file with instructions on how to set up and run your application.
- Submit the GitHub repository link along with any additional documentation.
- Setup your project to use AWS RDS for the database

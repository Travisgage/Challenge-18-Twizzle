# Twizzle - Social Media (for really cool people)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description
The following is an API for a social media application that allows friends and colleagues to connect and communicate with posts (thoughts), reactions, and comments. The application makes use of routing through express.js, MongoDB for database and relatd operations, and Mongoose ODM.  


## Table of Contents
* [Installation](#installation)
* [Usage](#usage)
* [License](#license)
* [Contributing](#contributing)
* [Credits](#credits)
* [Tests](#tests)
* [Questions](#questions)

## Installation
Installation instructions for application:
`npm i` to install dependencies and `npm start` to start the server

## Usage

Click [here](https://drive.google.com/file/d/1nuc7eYftvj0fg8iZKi_nfuyUByQpLwGn/view?usp=drive_link) to see a video walkthrough of application.

After cloning the repository and running `npm i` to install all dependencies, make sure MongoDB is installed.`npm run seed` will then allow the user to connect to the (local) MongoDB database with the relevant collections for the appliation. Upon starting the server with `npm start`, the user can then test all http requests to endpoints with a tool like Insomnia.

The application allows for the following http routes to endpoints:

* `/api/users` **GET** to query all users or **POST** to create a new user.

* `/api/users/:userId` **GET** to find a single user, **PUT** to update an existing user, and **DELETE** to delete an existing user.

* `/api/users/:userId/friends/:friendId` **POST** to add a friend connection and **DELETE** to delete a friend connection. Friends are stored as an array and are updated accordingly.

* `/api/thoughts` **GET** to pull all thoughts and **POST** to post (create) a new thought. As with friends, thoughts are stored as an array and updated accordingly.

* `/api/thoughts/:thoughtId` **GET** to pull a single thought, **PUT** to update an existing thought, and **DELETE** to delete a single thought. This will also remove the deleted thought from the associated thoughts array.

* `/api/thoughts/:thoughtId/reactions` **POST** to post (create) a new reaction.

* `/api/thoughts/:thoughtId/reactions/:reactionId` **DELETE** to delete an existing reaction and remove it from the associated thought.

![Screenshot of application in use in Insomnia](/assets/images/Screenshot%202024-09-21%20at%203.12.47 PM.png)
![Screenshot of application in use in Insomnia](/assets/images/Screenshot%202024-09-21%20at%203.12.57 PM.png)

## License
This project is operating under the MIT license.  For more information, please click [here](https://opensource.org/license/mit).

## Contributing
See contact information below for contributions

## Credits
N/A

## Tests
N/A

## Questions
Contact me for any questions or contributions:

GitHub: [Travis-Phillips](https://github.com/Travisgage)

Email: travisgagephillips@gmail.com

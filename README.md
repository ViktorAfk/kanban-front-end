To run the project

First, you need to clone the repository from GitHub. You can find the clone URL on the repository page on GitHub;
You need to install dependencies run 'npm instal';
Once the dependencies are installed, you can start the Vite development server: 'npm run dev'
open this link (http://localhost:5173)
Includes:

- User can enter board ID in the input on top of the page and press "Load". For example: dsfsdgsggds1232323.
- App loads todo for the board using API.
- App contains 3 columns:
  - ToDo (all new todo)
  - In Progress (opened todos)
  - Done (closed todos)
  - User able to drag-n-drop between the columns and change the order of todos.
  - Current todo position (column ) store between search and browser sessions.

Technical Considerations: • React, TypeScript for building the components and managing state. • Redux toolkit as a state manager. • Chakra UI for styling, application is responsive.

- [DEMO LINK](https://viktorafk.github.io/kanban-front-end/) 

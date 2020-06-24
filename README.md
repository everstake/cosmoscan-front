
# Cosmoscan (front-end)

Cosmoscan is the first data and statistics explorer for the Cosmos network. It provides information oт the overall network operations, governance details, validators and much more. This is still an MVP, so if you have any suggestions, please reach out.

This is a repo of the front-end part of the project.

## How to run

Clone the repo and run `npm install` from the folder of the project to install all the necessary dependencies.

The project needs some configuration of the .env file. Visit the [official  Create React App docs](https://create-react-app.dev/docs/adding-custom-environment-variables/) for more info on .env files. The .env file must have the
 following variable set:

`REACT_APP_API_HOST="https://exmaple.one"`

This variable should contain a URL of a back-end API as it is used all over the project. Otherwise, all the
HTTP requests will fail. Visit the [back-end repo](https://github.com/everstake/cosmoscan-api) for more details of
 the API used in this project.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Dependencies

* "@fortawesome/fontawesome-svg-core": "^1.2.28",
* "@fortawesome/free-brands-svg-icons": "^5.13.0",
* "@fortawesome/free-solid-svg-icons": "^5.13.0",
* "@fortawesome/react-fontawesome": "^0.1.9",
* "@testing-library/jest-dom": "^4.2.4",
* "@testing-library/react": "^9.3.2",
* "@testing-library/user-event": "^7.1.2",
* "axios": "^0.19.2",
* "bootstrap": "^4.5.0",
* "date-fns": "^2.14.0",
* "moment": "^2.26.0",
* "numeral": "^2.0.6",
* "prop-types": "^15.7.2",
* "react": "^16.13.1",
* "react-bootstrap": "^1.0.1",
* "react-datepicker": "^3.0.0",
* "react-dom": "^16.13.1",
* "react-linkify": "^1.0.0-alpha",
* "react-router-dom": "^5.2.0",
* "react-scripts": "3.4.1",
* "react-select": "^3.1.0",
* "recharts": "^1.8.5",
* "styled-components": "^5.1.0",
* "styled-components-modifiers": "^1.2.5",
* "styled-normalize": "^8.0.7"

All the relevant dependencies can be found in the package.json file.


## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

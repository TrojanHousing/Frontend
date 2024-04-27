# Run React App

## Check Downloads

Run `npm -v` and `node -v` to confirm that they are downloaded on the computer. If `node` is not downloaded, download from https://nodejs.org/en/download. 

## Run Project

Clone the project: `git clone git@github.com:TrojanHousing/Frontend.git`.

In terminal, navigate to the `Frontend` directory that is created. From there, `cd` into the `trojan-housing` folder.\
Once there, install dependencies: `npm install`.\
To run the frontend server, run: `npm start` in the same directory (`trojan-housing`).

This will run the app in the development mode.Open [http://localhost:3000](http://localhost:3000) to view it in your browser.\


If any errors are encountered run the following (in the same `trojan-housing` directory):

- `npm install react-router-dom@latest`
- `npm update` (especially if `npm` was not just installed)
- Check https://stackoverflow.com/questions/69692842/error-message-error0308010cdigital-envelope-routinesunsupported (or search any error messages returned).

The page will automatically update (and reload) when you make changes.\
You do not need to restart the server after changes are made. If desired, run `npm start` again.

## Development

Checkout a git branch using `git checkout -b <branch name>`. Use your last name as the branch name.

Commit changes to this branch until they are ready to be merged with the main development branch.

**Make sure to `git pull` before `git push`. There should not be any conflicts if you are working on your own branch. `git pull` frequently!!!** 

---

# Ignore everything else (below) for now

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

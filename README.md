# 5YMM Site

For 4YMM, see https://github.com/nicobrinkkemper/4ymm

## Prerequisites
- Have `npm` installed. It comes with Node.js which you can install from their site https://nodejs.org/en/
- If you get pupperteer issues when building, install following `sudo apt-get install chromium-browser` and/or install any missing package listed in error message, for example
  ```sh
  sudo apt-get install libxcursor1
  sudo apt-get install libxss1
  sudo apt install libgtk-3-0
  ```
## Installing

- `npm install` - install all dependencies in `node_modules`
- `npm run start` - run development mode
- OR `npm run build` - build final product in `build folder`

## Update level codes
- download csv from this page https://docs.google.com/spreadsheets/d/1Yg9K2sKsn9UpJrJlQeDBILJXGAX0kHorfb5rnFY4Zd0/edit#gid=0
- replace csv in `src/data`

## Add images
- Download images https://drive.google.com/drive/folders/1a8aEUBZau-hekxB82sJR-gmWoNPFBVkg
- Add new images to `scripts/levels` and `scripts/makers`
- `npm run build:images` this command generates all the images and puts it in `scripts/levelImages` and `scripts/makerImages`
- `npm run move:images` this command moves over folders `makerImages` and `levelImages` to `public folder` and removes the js files in those folders

## Change copy
- Download `.mdx` file https://drive.google.com/drive/folders/1Bs1onyjbBDgdPFYyCG3DFzki-kTIuFcw
- Replace `.mdx` file in `src/data`

## Upload with FTP
- `npm run build`
- upload build folder to ftp with your preferred FTP program

## General information about the source code

See below `Available Scripts` to get you up and running. These scripts correspond to the ones specified in `package.json`. A few things to keep in mind before starting the work on the project:

- Only the build folder must be uploaded to the server, do not include any other files. Changes to the site can only be done by running `npm run build` and reuploading the `build` folder's contents to the server.

- The final build of the `React` app is not connected with any API or external data file. All data must be present during the buildstep, and all data will be included in the Javascript bundle. 

- Level pages will only be statically rendered to `.html` files if the current date allows for those levels to be released. However, these files are not neccecary for the site to function. This is because `react-snap` will crawl the page for further SEO and accesability improvements. All data located in `src/data` will be in the bundle, and the react app can display the pages purely by this data alone.

- The files ending with `.mdx` located in `src/data` can be used to update the copy of the website. These files work the same as the `.csv` file located in `src/data`, meaning the `.mdx` files are also incoorporated in the final bundle in the `build` folder. You can find these files on the Google Drive.

- Futher changes to release dates and level data can be made in the file `src/levelData.ts`. This file acts as a sort-of runtime database, and offers some uttility functions to extract meaningfull data from the `.csv` file. Components of the App use this file to statically import data from the spreadsheet. (no async stuff whatsoever) Any date changed here will reflect when each batch will be released, and may be changed individually. This can be usefull to preview the site, by changing the dates you are able to see how things will look like once the levels are released.

- `Craco` is used to *hack* `create-react-app` to enable `.csv` reading abilities, allowing us to statically read the `.csv` contents as it would be a `.json` file. This eliminates any asynchronous loading of data, and let's us do static rendering of pages to `.html` files.

- Changes to files in `src/data` will not be reflected in development mode. However you do not have to restart the process of `npm run start`, you can simply do a save command on any of the `.ts` or `.tsx` files, and the change to the data will be reflected automatically. This is a minor annoyance to watch out for when changing files in the `src/data` folder.

- Images of levels and Miis can be automatically generated with the command `npm run build:images`. This will create the folder `scripts/makerImages` and `scripts/levelImages` from the original images located in `scripts/makers` and `scripts/levels`. The filenames must correspond with the levels names using the snake_case format. The contents of the generated folders must be copied over to the `public` directory. The generated `*Images.bundle.js` files are not needed and may be deleted/not copied over. You can find the original images on the Google Drive. If there are new images here, place them in `scripts/makers` and `scripts/levels` respectively, then run the command `npm run build:images`, and copy over the generated images to the `public` folder.

- To copy over images to the public folder and delete the redundant javascript files in the image folders, you can run the command `npm run move:images`. This command only works on unix machines. This should be the only command that doesn't work on Window's commandline. If you insist on working on Windows, this step should be performed manually, or WSL should be used. (I recommend WSL for Windows users)

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

(Currently only the default create-react-app test is there)

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


### `npm run build:images`

This is a custom script to resize and compress all the images needed for the levels and Miis. Run this command, then copy over all the images to the public folder. You do not need the .js bundles in these folders, feel free to remove.

### `npm run move:images`

This is a unix command to remove all the unneccary Javascript files and move all the generated images to the public folder.

### `npm run serve`

This will start a server running on the `build` folder. This will reflect more accurately the final product of the site, but does not allow hot-reloading like `npm run start` does.

### `npm run never_run_eject_please`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.


## Craco
Instead of ejecting the react app to customize webpack behavior, `craco` is used to alter configuration without ejecting. Please never run eject, as you are already able to customize the behavior through `craco`. This is used so that `.csv` files can be easily imported and parsed during compile time. Webpack will read the csv file, and the contents will be available as a JSON object when you import csv files as such `import data from 'MY_CSV_FILE.csv'`


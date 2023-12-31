# my-portfolio

I'm present online.

This is my web portfolio created with React for to easily update content without having to change HTML code.

## Development

The main source code is under `src` folder. The `index.html` file contains some relevant details about the page skeleton also. 

The code assumes there is a "private" `assets` (that should be put under `public` folder) that stores private files, e.g. `info.json` to store info that I want to display on the webpage and be able to dynamically change it without create a new commit. A sample file layout looks like:

```
|
|- public
|  |- assets
|  |  |- info.json
|  |  |- ...
|  |- index.html
|  |- ...
|- src
   |- [source code]
```

One can run `npm start` to run the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser. The page will reload when you make changes. You may also see any lint errors in the console.

## Build static content

Run `npm run build`. This builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance. The build is minified and the filenames include the hashes. Your app is ready to be deployed!

## Deployment

~~I configured a GitHub workflow to autonomously deploy any new commit to a personal AWS S3 bucket. It turned out that you can host a static website with S3.~~

I now host this page on an Oracle Cloud (Always Free) instance running Nginx. Kudos to Oracle Cloud for maintaining an Always Free tier that doesn't cost any penny. Check out what Oracle Cloud free tier has at https://www.oracle.com/cloud/free/.

Here are some resources if anyone also wants to host websites using Nginx on Oracle Cloud:

- https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-22-04
- (Free) SSL setup: https://letsencrypt.org/getting-started/
- https://stackoverflow.com/questions/71127772/how-do-i-enable-https-on-my-nginx-server-on-oracle-cloud
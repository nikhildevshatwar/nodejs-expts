# Nodejs experiments
All trial example codes that I developed while learning nodejs and web technologies.

**WARNING** This is amatuer level coding. This might be completely off the standards, inefficient and totally unsecure code. Do not use it for million dollar systems.

## ImageMagic server
Simple http server to experiment with ImageMagick Node.js module
This is supposed to use server side computing to process images.

1. Application server

Application server will spin up an express application with which one can
play around with multiple features of ImageMagick.

2. Data server

Spinning up this server will initiate a naive data server which provides APIs
for data upload, serve and download.

### Install the required modules and packages
Make sure you have nodejs and npm installed before you try to install packages.
``` bash
npm install
```

### Copy Configuration
There is a file `config/sample.json` which has all necessary configuration
that are necessary for proper run of this server.

```bash
cp config/sample.json config/default.json
```

and make necessary changes to `default.json`.
**Make sure that all the directories for the database are created**

### Finally! Run

First spin up the application server which would listen to port 3000

``` bash
node app.js
```

Now spin up dataserver which would listen to port 3001

```bash
node dataserver.js
```

### Test the progressive image loading
`NOTE`: This is basic nodejs server. Most paths are hard coded. Hopefully **express** should make life easier

+ Open [http://localhost:8080/](http://localhost:8080/) and you shall see error
+ Open [http://localhost:8080/IM?src=food.jpg&size=480x360](http://localhost:8080/IM?src=food.jpg&size=480x360) for imagemagick demo
+ Open [http://localhost:8080/img/food.jpg](http://localhost:8080/img/food.jpg) to check image serving
+ Open [http://localhost:8080/progressive](http://localhost:8080/progressive) for progressive image loading


## More to come

**warning: here be dragons**
This page was created at https://markdown-it.github.io/
I Liked the dragons warning, so kept it :)

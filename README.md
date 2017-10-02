# Nodejs experiments
All trial example codes that I developed while learning nodejs and web technologies.

**WARNING** This is amatuer level coding. This might be completely off the standards, inefficient and totally unsecure code. Do not use it for million doller systems.

## ImageMagic server
Simple http server to experiment with ImageMagick Node.js module
This is supposed to use server side computing to process images.

### Install the required modules and packages
``` bash
sudo apt-get install nodejs npm
npm install imagemagick
```

### Run the nodejs server
``` bash
nodejs imserver.js
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
 

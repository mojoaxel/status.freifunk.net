# timeline.freifunk.net #

Show timeline events from freifunk communities.

## Setup ##

Requirements: [node and npm](http://nodejs.org/)

```
> git clone git@github.com:mojoaxel/timeline.freifunk.net.git
> cd timeline.freifunk.net
timeline.freifunk.net> npm install
timeline.freifunk.net> bower install
```

To access the community-data via the REST api you must deploy the folter *src_api* to a PHP server of a remote instance with enabled CORS-headers.
The url of the api-server can be changed in *src_app/js/Settings.js*.

## Development ##

Start a local development-Server:
```
timeline.freifunk.net> grunt dev
```

Test the webapp in the browser **http://localhost:8000/app/**

Changes in the code get automatically updated in the browser after saving.

## Deployment ##

To generate a deploment (minified) version of the webapp do:
```
timeline.freifunk.net> grunt dist
```

After that copy the content of the generated **DISTRIBUTION** folder to your webserver.

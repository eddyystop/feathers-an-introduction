# feathers-an-introduction

## How to install the guides and working examples

### Install Node

[Node](https://nodejs.org/en/) is a server platform that runs JavaScript.
Its lightweight and efficient.
It has the largest ecosystem of open source libraries in the world.

- [Default install.](https://nodejs.org/en/)
- [Specfic versions.](https://nodejs.org/en/download/)

### Install git

[git](https://git-scm.com/) is the version control system most frequently used in open source.
There are many resource available for installing it.

- [Linux.](https://www.atlassian.com/git/tutorials/install-git/linux)
- [Mac OSX.](https://www.atlassian.com/git/tutorials/install-git/mac-os-x)
- [Windows.](https://www.atlassian.com/git/tutorials/install-git/windows)

### Install the guide and its examples

Linux and Windows:
```text`
mkdir feathers-an-introduction
git clone https://github.com/eddyystop/feathers-an-introduction
```

Mac OSX:
```text
// todo ******************
```

> **Alternative install.** If you don't already have git installed on your machine,
you may prefer to download the source as a zip file.
Point your browser to `https://github.com/eddyystop/feathers-an-introduction/archive/master.zip`
to start the download.

### Install dependencies
```text
cd feathers-an-introduction
npm install
```

### Reading the guide

You can read the guide by serving the static files at `/_book`.

If you do not have a static server already installed, you may install
[http-server](https://www.npmjs.com/package/http-server)
globally with `npm install http-server -g`
and start serving the guide with:
```text
cd feathers-an-introduction
http-server
```

Then point your browser at `http://localhost:8080/_book`.

## License

Copyright (c) 2016-2017

Licensed under the [MIT license](LICENSE).

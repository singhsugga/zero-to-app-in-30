# Zero to app in 30m with AngularFire

Angular together with Firebase makes a potent combination. [Jamie Perkins](https://github.com/inorganik)' presentation shows how to create a production-ready app using these tools in only a half hour. This project only scratches the surface of Firebase, but demonstrates:

- Setting up authentication
- Make an auth guard to protect routes
- Make use of avatars
- Read and write Firestore data

And as a bonus, you'll get to know Angular google maps. Later in your project, you can take advantage of cloud storage, cloud functions, and everything else Firebase has to offer.

### Getting started

To run this project locally, you'll need to [create a new Firebase project](https://console.firebase.google.com/) and get a [Google maps API key](https://console.cloud.google.com/apis/library/maps-backend.googleapis.com).

Create an environment.ts file from the provided sample file and replace the keys.

Build and run locally:

```shell
$ ng s
```

### Init Firebase

First, globally install firebase tools:
```sh
$ npm i -g firebase-tools
```
Login to firebase:
```sh
$ firebase login
```
Build the app for prod so you can test deployment:
```sh
$ ng build --prod
```
You can init and re-init any time. The `init` command makes it easy to configure firebase.
  - For now, only choose hosting when prompted for what to configure locally.
  - Configure as an SPA? - Yes.
  - For serve folder, choose `dist/project-name`
```sh
$ firebase init 
```
Deploy. Your app will be instantly hosted and accessible at the provided url.
```sh
$ firebase deploy
```

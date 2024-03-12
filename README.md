# NgAiGoogleDemo

Call Gemini REST API to generate text from text input and image

Github Page: https://railsstudent.github.io/ng-ai-google-demo/

Google Cloud credits are provided for this project. #GeminiSprint hashtag.

# Create new API Key

Go to https://aistudio.google.com/app/apikey to create an API key for a new or existing Google Cloud project

# Replace the API Key

- (first time) chmod a+x ./generate-config-file.sh
- execute the shell script to generate the API key in src/assets/config.json

```sh
./generate-config-file.sh  <Gemini api key>
```

# Compile codes to deploy to github page

- switch to gh-pages branch
- (first time) chmod a+x ./deploy-github-page.sh
- execute the shell script to compiles to docs/ folder

```sh
./deploy-github-page.sh  <Gemini api key>
```
- commit and push the codes the remote repository

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

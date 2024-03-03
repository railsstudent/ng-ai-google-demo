# NgAiGoogleDemo

Call Gemini REST API to generate text from text input

# Create new API Key

Go to https://aistudio.google.com/app/apikey to create an API key for a new or existing Google Cloud project

# Replace API Key

- Go to src/app/gemini/gemini.provider.ts

```typescript
 {
    provide: GEMINI_API_KEY,
    useValue: '<api key>',
},
```

-  Replace &lt;api key&gt; with the actual Gemini API Key

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

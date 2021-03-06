# JS integration sample for DotVVM 3.0

This app shows how to use the new `@js` directive in [DotVVM 3.0](https://github.com/riganti/dotvvm). 

> The JS integration feature is still in an early stage of development - some things are not finished and you will probably run into issues. We'll be happy for any feedback - tell us about your experience on our [Gitter Chat](https://gitter.im/riganti/dotvvm).

## How to run the sample

1. Clone the repo

2. Make sure you update the submodules: 
```
git submodule init
git submodule update
```
3. Build the JS part of DotVVM:
```
cd dotvvm/src/DotVVM.Framework
npm install
npm run build
```

4. Open the `JsIntegrationDemo.sln` in Visual Studio.

5. Claim your API key in [Google Cloud Console](https://developers.google.com/maps/documentation/javascript/get-api-key)

6. Right-click on `JsIntegrationDemo` project and select **Manage User Secrets**. Change the file contents to this:
```
{
  "GoogleMaps": {
    "apiKey": "xxx"
  } 
}
```

## Rollup sample

7. Navigate to `src/JsIntegrationDemo-Rollup` directory and run the following scripts:

```
npm install
npm run build
```

## Webpack sample - **NOT WORKING**

The Webpack sample is currently not working. Right now, Webpack cannot output ES6 modules which are the only format supported by DotVVM 3.0.

We expect to extend the support for other module formats in the next versions of DotVVM. 

![Screenshot](https://raw.githubusercontent.com/riganti/dotvvm-samples-js-integration/main/images/js001.png)

## JS directive sample

This app shows how to use `@js` directive in [DotVVM 4.1](https://github.com/riganti/dotvvm). 

### Prerequisites
* Make sure you have installed [DotVVM for Visual Studio](https://www.dotvvm.com/install)

### How to run the sample

1. [Open the GitHub repo in Visual Studio](git-client://clone/?repo=https%3A%2F%2Fgithub.com%2Friganti%2Fdotvvm-samples-js-integration)
or 
`git clone https://github.com/riganti/dotvvm-samples-js-integration.git`

2. Open `JsIntegrationDemo.sln`
![Open the solution file](https://raw.githubusercontent.com/riganti/dotvvm-samples-js-integration/main/images/js002.png)

3. Claim your API key in [Google Cloud Console](https://developers.google.com/maps/documentation/javascript/get-api-key)

4. Right-click on `JsIntegrationDemo` project and select **Manage User Secrets**. Change the file contents to this:
```
{
  "GoogleMaps": {
    "apiKey": "xxx"
  } 
}
```

5. Right-click the `JsIntegrationDemo` project and select **View > View in Browser**
![View JsIntegrationDemo in Browser](https://raw.githubusercontent.com/riganti/dotvvm-samples-js-integration/main/images/js003.png)

#### Rollup sample

6. Navigate to `src/JsIntegrationDemo-Rollup` directory and run the following scripts:

```
npm install
npm run build
```

7. Right-click the `JsIntegrationDemo-Rollup` project and select **View > View in Browser**

#### Webpack sample - **NOT WORKING**

The Webpack sample is currently not working. Right now, Webpack cannot output ES6 modules which are the only format supported by DotVVM 3.0.

We expect to extend the support for other module formats in the next versions of DotVVM. 

### What you can learn in the sample

* How to use `@js` directive in DotVVM
* How to call functions in the JS module from DotVVM
* How to invoke DotVVM commands from JS module
* How to use SignalR in a DotVVM app

---

## Other resources

* [Gitter Chat](https://gitter.im/riganti/dotvvm)
* [DotVVM Official Website](https://www.dotvvm.com)
* [DotVVM Documentation](https://www.dotvvm.com/docs)
* [DotVVM GitHub](https://github.com/riganti/dotvvm)
* [Twitter @dotvvm](https://twitter.com/dotvvm)
* [Samples](https://www.dotvvm.com/samples)
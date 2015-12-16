# nightwatch-salesforce-wrapper
Small library to make e2e tests for salesforce using Nightwatch

##Requirements
* [Nodejs](https://nodejs.org/en/)
* [Nightwatchjs](http://nightwatchjs.org/)

##Instalation

```
npm i nightwatch-salesforce-wrapper
```

##Usage

```
  var SFW =  require('../../libs/salesforce_wrapper.js');
  var SFWx = new SFW();

  SFWx.setBrowser(browser).setDefaultTimeout(10000)
      .useID().linkInside('AllTab_Tab').click()
      .link("some link").click()
      .useValue().input("New").click()
      .multipicklist("some multipicklist").set("item 1 - item 2")
      .multipicklist_unselect("some multipicklist").set("item 1")
      .text("some text").set("XXZZ")
      .name("some name").set("XXZZ")
      .picklist("some picklist").set("eco1")
      .checkbox("some checkbox").set(true);

  browser.pause(1000);
```

##TODO
* Inline form edit
* Lightning components
* Custom assertions

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
      .link("ALLNASP IDs").click()
      .useValue().input("New").click()
      .multipicklist("NASP ID Excluded from Campaigns").set("Hospitality - RFP in progress, Hospitality - Do Not Invite (Policy)")
      .multipicklist_unselect("NASP ID Excluded from Campaigns").set("Hospitality - RFP in progress")
      .text("NASP ID").set("10 XXZZ")
      .name("NASP ID").set("10 XXZZ")
      .text("NASP Account Name").set("eco1")
      .picklist("Auth Code Request Issued").set("Yes")
      .checkbox("Latam Focus").set(true);

  browser.pause(1000);
```

##TODO
* Inline form edit
* Lightning components
* Custom assertions

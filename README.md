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

###Initialization

```
var SFW =  require('../../libs/salesforce_wrapper.js');
var SFWx = new SFW();
```

##Set values

####Text
```
SFWx.text("some text field").set("value1");
```
where "eco" is the name of the field and "abc" is the value you want to set.

####Name
```
SFWx.name("some name field").set("value1");
```

####Picklist
```
SFWx.picklist("some picklist field").set("value1");
```

####multipicklist
```
SFWx.multipicklist("some multipicklist field").set("value1, value2");
```

####Checkbox
```
SFWx.checkbox("some checkbox field").set(true);
```



##Get values

####Text
SFWx.text("some text field").get(function(res){
  console.log("some text field value -> " + res);
});


####Name
SFWx.name("some field name").get(function(res){
  console.log("some field name value -> " + res);
});


####picklist
SFWx.picklist("some picklist field").get(function(res){
  //this will give you the current selected value on the picklist.
  console.log("some picklist field -> " + res);
});

##TODO
* Inline form edit
* Lightning components
* Custom assertions

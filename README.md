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
var SFW =  require('salesforce_wrapper');
var SFWx = new SFW();

SFWx.setBrowser(browser); //where browser is the nightwatch's browser object
SFWx.setDefaultTimeout(4000); // timeout in milliseconds.

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
```
SFWx.text("some text field").get(function(res){
  console.log("some text field value -> " + res);
});
```

####Name
```
SFWx.name("some field name").get(function(res){
  console.log("some field name value -> " + res);
});
```

####picklist
```
SFWx.picklist("some picklist field").get(function(res){
  //this will give you the current selected value on the picklist.
  console.log("some picklist field -> " + res);
});
```


##Click
This function is used to make a physical click in any component (field, button, link) within a salesforce page.

Click on a link
```
SFWx.link('some link name').click();
```

Click on a button
```
SFWx.button('some button name').click();
```

Click on a checkbox
```
SFWx.checkbox('some checkbox name').click();
```
Click on an input
```
SFWx.input('some input field name').click();
```

##Special functions

####setBrowser(browser)

Sets the browser variable that nightwatch's is using, see (nightwatch's documentation)[http://nightwatchjs.org/guide].
```
setBrowser(browser);
```

####useID(element id)

Forces SFW to use and specific HTML ID instead of the field's label or element's label.
```
useID("element's ID");
```
example:
```
SFWx.useID('element id').click();
```

####useValue()
Forces SFW to use an element's value property instead for the element's label or id.
```
SFWx.useValue().input("new").click();
```

####linkInside
Selects the first link inside a div.
```
SFWx.useID().linkInside('div id').click();
```


##Methods Invocation
All methods in the library are chainable, so you can do:
```
App.funcA().funcB()...funcN();
```
Instead of:
```
App.funcA();
App.funcB();
.
.
App.funcN();
```


##Nightwatch + SFW small example

This small example shows how to create a new record on a custom object. 

```
var SFW =  require('salesforce_wrapper');
var SFWx = new SFW();

SFWx.setBrowser(browser); //where browser is the nightwatch's browser object
SFWx.setDefaultTimeout(4000); // timeout in milliseconds.

SFWx.link("some link").click() ;

browser.pause(2000); //nightwathc's browser variable

SFWx.text("some text field label1").set("value 1")
    .text("some text field label2").set(value 2")
    .picklist("some pikclist field label1").set("value 1")
    .multipicklist("some multipicklist field label1").set("value 1, value2")
    .button("save").click();
    
browser.pause(2000);

    
```





##TODO
* Inline form edit
* Lightning components
* Custom assertions

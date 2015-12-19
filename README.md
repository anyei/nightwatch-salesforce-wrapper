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

```javascript
var SFW =  require('salesforce_wrapper');
var SFWx = new SFW();

SFWx.setBrowser(browser); //where browser is the nightwatch's browser object
SFWx.setDefaultTimeout(4000); // timeout in milliseconds.

```

##Set values

####Text
```javascript
SFWx.text("some text field").set("value1");
```
where "eco" is the name of the field and "abc" is the value you want to set.

####Name
```javascript
SFWx.name("some name field").set("value1");
```

####Picklist
```javascript
SFWx.picklist("some picklist field").set("value1");
```

####multipicklist
```javascript
SFWx.multipicklist("some multipicklist field").set("value1, value2");
```

####Checkbox
```javascript
SFWx.checkbox("some checkbox field").set(true);
```


##Get values

####Text
```javascript
SFWx.text("some text field").get(function(res){
  console.log("some text field value -> " + res);
});
```

####Name
```javascript
SFWx.name("some field name").get(function(res){
  console.log("some field name value -> " + res);
});
```

####picklist
```javascript
SFWx.picklist("some picklist field").get(function(res){
  //this will give you the current selected value on the picklist.
  console.log("some picklist field -> " + res);
});
```


##Click
This function is used to make a physical click in any component (field, button, link) within a salesforce page.

Click on a link
```javascript
SFWx.link('some link name').click();
```

Click on a button
```javascript
SFWx.button('some button name').click();
```

Click on a checkbox
```javascript
SFWx.checkbox('some checkbox name').click();
```
Click on an input
```javascript
SFWx.input('some input field name').click();
```

##Special functions

####setBrowser(browser)

Sets the browser variable that nightwatch's is using, see nightwatch's documentation http://nightwatchjs.org/guide.
```javascript
setBrowser(browser);
```

####useID(element id)

Forces SFW to use and specific HTML ID instead of the field's label or element's label.
```javascript
useID();
```
example:
```javascript
SFWx.useID().link('element id').click();
```

####useValue()
Forces SFW to use an element's value property instead for the element's label or id.
```javascript
SFWx.useValue().input("new").click();
```

####linkInside
Selects the first link inside a div.
```javascript
SFWx.useID().linkInside('div id').click();
```


##Methods Invocation
All methods in the library are chainable, so you can do:
```javascript
App.funcA().funcB()...funcN();
```
Instead of:
```javascript
App.funcA();
App.funcB();
.
.
App.funcN();
```


##Nightwatch + SFW small example

This small example shows how to create a new record on a custom object. 

```javascript
var SFW =  require('salesforce_wrapper');
var SFWx = new SFW();

SFWx.setBrowser(browser); //where browser is the nightwatch's browser object
SFWx.setDefaultTimeout(4000); // timeout in milliseconds.

SFWx.link("some link").click() ;

browser.pause(2000); //nightwathc's browser variable

SFWx.text('some text field label1').set('value 1')
    .text('some text field label2').set('value 2')
    .picklist('some pikclist field label1').set('value 1')
    .multipicklist('some multipicklist field label1').set('value 1, value2')
    .button('save').click();
    
browser.pause(2000);

    
```


##Notes
For locating the element the library uses xpath. In the future css could be used.


##TODO
* Inline form edit
* Lightning components
* Custom assertions
* CSS selectors

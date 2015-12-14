/**
This object is used to service as a wrapper for the components from saleforce and Nightwatch.
@author Jose Baez {@cloxure}
@version 0.0.1
@status beta
*/
var SFW = function() {

  this.fieldType = '';
  this.fieldName = '';

  this.elementType = '';
  this.elementName = '';


  //options///////////
  this.xUseID = false;
  this.xUseValue = false;
  //end options////////


  this.value = null;

  this.browser = null;

  this.xpath ='';

  this.defaultTimeout = 0;
};



/**
Resets the options variables.
@author Jose Baez {@cloxure}
@method cleanOptions
@return {object}
*/
SFW.prototype.cleanOptions = function() {
  this.xUseID = false;
  this.xUseValue = false;

  return this;
};

/**
Sets the default browser used by the library (see nightwatch browser).
@author Jose Baez {@cloxure}
@method setBrowser
@param {object} browser
@return {object}
*/
SFW.prototype.setBrowser = function(browser) {
  this.browser = browser;

  return this;
};




/**
Sets the default timeout used by the selenium engine before throwing an exception.
@author Jose Baez  {@cloxure}
@method setDefaultTimeout
@param {number} time
@return {object}
*/
SFW.prototype.setDefaultTimeout = function(time){
  this.defaultTimeout = time;

  return this;
}


/**
Sets a value to a specfic field (text, number, picklist, etc); using the form SFW.text('eco').set('demo').
@author Jose Baez {@cloxure}
@method set
@param {object} value - value to be set ob the field.
@return {object}
*/
SFW.prototype.set = function(value) {

  this.xpath= '';
  var xpaths = []; //only used for multipicklists

  switch(fieldType){

    case "text":
    case "URL":
    case "number":
      this.xpath = "//input[@id=(//label[contains(.,'"+ fieldName +"')]/@for)]";
      break;

    case "name":
      this.xpath = "//input[@name='Name']";
      break;

    case "picklist":
      this.xpath = "//select[@id= (//label[contains(.,'" + fieldName +"')]/@for)  ]/option[@value='"+ value +"']";
      break;

    case "multipicklist":
    case "multipicklist_unselect":

      var selectedType = '';

      if (fieldType == 'multipicklist'){
        selectedType = '_unselected';
      }

       if (fieldType == 'multipicklist_unselect') {
        selectedType = '_selected';
      }


      var splited = value.split(',');

      splited.forEach(function (item) {
        xpaths.push("//select[@id= concat( (//label[contains(.,'" + fieldName +"')]/@for), '" + selectedType + "')]/option[normalize-space(text())='"+ item.trim() +"']");
      });

      break;

    case "checkbox":
      this.xpath = "//input[@id=(//label[contains(.,'"+ fieldName +"')]/@for)]";
      break;

    default:
      break;
  }


  if ( (fieldType != "multipicklist") && (fieldType != "multipicklist_unselect")  ) {
    this.browser.useXpath().waitForElementVisible(this.xpath, this.defaultTimeout);
  }


  var browserInner = this.browser;
  var defaultTimeoutInner = this.defaultTimeout;
  var xpathInner = this.xpath;

  if(fieldType == 'picklist'){
    this.browser.useXpath().click(this.xpath);
  }

  xpaths.forEach(function(item){
    if (fieldType == "multipicklist") {
      browserInner.useXpath().waitForElementVisible(item, defaultTimeoutInner)
      .useXpath()
      .moveToElement(item, 1, -1, (function(){}) ).doubleClick();
    }

    if( fieldType  == "multipicklist_unselect") {
      browserInner.useXpath().waitForElementVisible(item, defaultTimeoutInner)
      .useXpath()
      .moveToElement(item, 1, -1, (function(){}) ).doubleClick();
    }
  });


  if(fieldType == "checkbox"){
    this.browser.useXpath().getAttribute(this.xpath, "checked", function(result){
      if(value) {
        if( (result.value != "true" && result.value != true) || result.value == undefined || result.value == null || result.value == "null"){
          browserInner.useXpath().click(xpathInner);
        }
      }else {
        if( (result.value != "false" && result.value != false) || result.value == undefined || result.value == null || result.value == "null"){
          browserInner.useXpath().click(xpathInner);
        }
      }

    });
  }


  if ( (fieldType != "picklist")  && (fieldType != "multipicklist")  && (fieldType != "checkbox")  ) {
    if(this.xpath != ""){
      this.browser.useXpath().setValue(this.xpath, value);
    }
  }


  return this;
};



/**
Gets the value of a field of picklist; using the form SFW.text('eco').get();.
@todo finish implementation
@author Jose Baez {@cloxure}
@method get
@return {object}
*/
SFW.prototype.get = function(callback) {

var valueInner = '';

  switch(fieldType){

    case "text":
    case "name":
    case "URL":
    case "number":

      if(fieldType == "name"){
        this.xpath = "//input[@name='Name']";
      }
      else {
        this.xpath = "//input[@id=(//label[contains(.,'"+ fieldName +"')]/@for)]";
      }
      this.browser.useXpath().waitForElementVisible(this.xpath, this.defaultTimeout)
                  .getValue(this.xpath, function(result){
                         valueInner = result.value;
                          return callback(valueInner);
                  });

      this.value = valueInner;
      break;


    case "picklist":
      this.xpath = "//select[@id=(//label[contains(.,'" + fieldName + "')]/@for)]";
      this.browser.useXpath().waitForElementVisible(this.xpath, this.defaultTimeout)
        .getAttribute(this.xpath,"value", function(result){
           return callback(result.value);
      });
      break;

    case "multipicklist":
    case "multipicklist_unselect":
      var typeSelected = '';

      if(fieldType == 'multipicklist')
      {
        typeSelected = '_unselected';
      }
      else {
        typeSelected = '_selected';
      }
      this.xpath = "//select[@id= concat( (//label[contains(.,'" + fieldName +"')]/@for), '" + typeSelected + "')]/option";
      this.browser.useXpath().waitForElementVisible(this.xpath, this.defaultTimeout)
           .getAttribute(this.xpath, "value", function(result){
           return callback(result.value);
      });
      break;

    case "checkbox":
      this.xpath = "//input[@id=(//label[contains(.,'"+ fieldName + typeSelected + "')]/@for)]/text";
      this.value = this.browser.useXpath().getValue(this.xpath);
      break;

    default:
      break;
  }



};




/**
wrapps the nightwatch assert for salesforce specific assert.
@author Jose Baez {@cloxure}
@method assertEquals
@return {object}
*/
SFW.prototype.assertEquals = function (value){

  switch(fieldType){
    case "text":
    case "URL":
    case "number":
      this.xpath = "//input[@id=(//label[contains(.,'"+ fieldName +"')]/@for)]";
      this.browser.useXpath().assert.value(this.xpath, value);
      break;

    case "name":
      this.xpath = "//input[@name='Name']";
      this.browser.useXpath().assert.value(this.xpath, value);
      break;

    case "picklist":
      this.xpath = "//select[@id=(//label[contains(.,'" + fieldName +"')]/@for)]/option[value='"+ value +"']";
      this.value = this.browser.useXpath().getText(this.xpath);
      break;

    case "multipicklist":
    case "multipicklist_unselect":
      this.xpath = "//select[@id=(//label[contains(.,'" + fieldName +"_selected')]/@for)]";
      this.value = this.browser.useXpath().getValue(this.xpath);
      break;


    case "checkbox":
      this.xpath = "//input[@id=(//label[contains(.,'"+ fieldName +"')]/@for)]";
      this.value = this.browser.useXpath().getValue(xpath);
      break;

    default:
      break;
  }



  return this;
}




/**
Clicks on a element, it could be a link, a button or an input with type button.
@author Jose Baez {@cloxure}
@method click
@return {object}
*/
SFW.prototype.click = function(){
  var xpath = "//";

  switch(elementType){
    case "link":
    xpath += "a";
    break;
    case "button":
    xpath += "button";
    break;
    case "input":
    xpath += "input";
    break;
    case "link_inside":
    xpath += "*";
    break;
    default:
    break;
  }

  if (this.xUseID){
    xpath += "[@id='" + elementName + "']";
  }
  else if (this.xUseValue){
    xpath += "[contains(@value,'" + elementName+"')]";
  }
  else{
    xpath += "[contains(.,'" + elementName + "')]";
  }

  if(elementType == 'link_inside'){
    xpath += "//a[1]";
  }

  this.browser.useXpath().waitForElementVisible(xpath, this.defaultTimeout);
  this.browser.useXpath().click(xpath);

  this.cleanOptions();

  return this;
};




//clickable///////////////////////////////////////////////////////////////////
SFW.prototype.link = function(name) {
  elementType = 'link';
  elementName = name;

  return this;
};

SFW.prototype.linkInside = function(name) {
  elementType = 'link_inside';
  elementName = name;

  return this;
};

SFW.prototype.button = function(name){
  elementType = 'button';
  elementName = name;

  return this;
};

SFW.prototype.input = function (name){
  elementType = 'input';
  elementName = name;

  return this;
};
//end clickable///////////////////////////////////////////////////////////////



//fields//////////////////////////////////////////////////////////////////////
SFW.prototype.text = function(name) {
  fieldType = 'text';
  fieldName = name;

  return this;
};

SFW.prototype.number = function(name) {
  fieldType = 'number';
  fieldName = name;

  return this;
};

SFW.prototype.name = function(name){
  fieldType = 'name';
  fieldName = name;

  return this;
};


SFW.prototype.picklist = function(name) {
  fieldType = 'picklist';
  fieldName = name;

  return this;
};

SFW.prototype.multipicklist = function(name){
  fieldType = 'multipicklist';
  fieldName = name;

  return this;
};

SFW.prototype.multipicklist_unselect = function(name){
  fieldType = 'multipicklist_unselect';
  fieldName  = name;

  return this;
}

SFW.prototype.checkbox = function(name){
  fieldType = 'checkbox';
  fieldName = name;

  return this;
};
//end fields//////////////////////////////////////////////////////////////////

//options////////////////////////////////////////////////////////////////////
SFW.prototype.useID = function() {
  this.xUseID = true;

  return this;
};

SFW.prototype.useValue = function() {
  this.xUseValue = true;

  return this;
};
//end options////////////////////////////////////////////////////////////////


module.exports = SFW;

var xPath = function (selector) {
  return {
    selector: selector,
    locateStrategy: 'xpath'
  }
};

module.exports = {
  elements: {
    title: 'title',
    gridElement: xPath('.//*[@id="contenttreeGrid"]'),
    gridPager: xPath('.//*[@id="pagertreeGrid"]'),
    firstNameColumn: xPath('.//span[text()="FirstName"]'),
    lastNameColumn: xPath('.//span[text()="LastName"]'),
    titleColumn: xPath('.//span[text()="Title"]'),
    viewSelectedData: xPath('.//button[text()="View selected data"]'),
  },
  commands: [{
    goToHomepage() {
      this.navigate('file:///' + require('path').resolve(__dirname + '/../../employees/employees.html'));
    },
    select(name) {
      var person = './/*[span/text()="' + name + '"]/span[contains(@class,"checkbox")]';
      this.click(person);
    },
    unselect(name) {
      var person = './/*[span/text()="' + name + '"]/span[contains(@class,"checkbox")]/div'
      this.click(person);
    },
    getSelectedPerson(name) {
      return './/*/div[contains(@id,"listBoxSelected")]/span[contains(text(),"' + name + '")]';
    },
    viewSelectedData() {
      this.click('@viewSelectedData');
    }
  }],
};
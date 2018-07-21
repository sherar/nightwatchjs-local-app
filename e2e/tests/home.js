let home;

module.exports = {
  before: (client) => {
    client.useXpath();
    home = client.page.homePageObject();
    home.goToHomepage();
  },

  'Should have title: "Employees from"': () => {
    home.assert.title('Employees from');
  },

  'Should see table elements displayed"': () => {
    home.assert.elementPresent('@gridElement');
    home.assert.elementPresent('@gridPager');
    home.assert.elementPresent('@firstNameColumn');
    home.assert.elementPresent('@lastNameColumn');
    home.assert.elementPresent('@titleColumn');
  },

  'Should see selected user and home city': () => {
    home.select('Andrew');
    home.viewSelectedData();
    home.assert.elementPresent(home.getSelectedPerson('Andrew'));
    home.assert.containsText(home.getSelectedPerson('Andrew'), 'Andrew is from Tacoma');
  },

  'Should not see unselected user': () => {
    home.select('Nancy');
    home.select('Margaret');
    home.viewSelectedData();
    home.unselect('Nancy');
    home.viewSelectedData();
    home.assert.elementNotPresent(home.getSelectedPerson('Nancy'));
    home.assert.elementPresent(home.getSelectedPerson('Margaret'));
    home.assert.containsText(home.getSelectedPerson('Margaret'), 'Margaret is from Redmond');
  },

  after: (client) => {
    client.end();
  },
};

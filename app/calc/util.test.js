const util = require('./util');

test('trimAllFieldsInObjectAndChildren', () => {
  //import * as _ from 'lodash';
  //assert.true(_.isEqual(util.trimAllFieldsInObjectAndChildren(' bob '), 'bob'));
  //assert.true(_.isEqual(util.trimAllFieldsInObjectAndChildren('2 '), '2'));
  //assert.true(_.isEqual(util.trimAllFieldsInObjectAndChildren(['2 ', ' bob ']), ['2', 'bob']));
  //assert.true(_.isEqual(util.trimAllFieldsInObjectAndChildren({'b ': ' bob '}), {'b': 'bob'}));
  //assert.true(_.isEqual(util.trimAllFieldsInObjectAndChildren({'b ': ' bob ', 'c': 5, d: true }), {'b': 'bob', 'c': 5, d: true}));
  //assert.true(_.isEqual(util.trimAllFieldsInObjectAndChildren({'b ': ' bob ', 'c': {' d': 'alica c c '}}), {'b': 'bob', 'c': {'d': 'alica c c'}}));
  //assert.true(_.isEqual(util.trimAllFieldsInObjectAndChildren({'a ': ' bob ', 'b': {'c ': {'d': 'e '}}}), {'a': 'bob', 'b': {'c': {'d': 'e'}}}));
  //assert.true(_.isEqual(util.trimAllFieldsInObjectAndChildren({'a ': ' bob ', 'b': [{'c ': {'d': 'e '}}, {' f ': ' g ' }]}), {'a': 'bob', 'b': [{'c': {'d': 'e'}}, {'f': 'g' }]}));

  expect(util.trimAllFieldsInObjectAndChildren(' bob ')).toBe('bob');
  expect(util.trimAllFieldsInObjectAndChildren('2 ')).toBe('2');
  expect(util.trimAllFieldsInObjectAndChildren(['2 ', ' bob '])).toEqual(['2', 'bob']);
  expect(util.trimAllFieldsInObjectAndChildren({'b ': ' bob '})).toEqual({'b': 'bob'});
  expect(util.trimAllFieldsInObjectAndChildren({'b ': ' bob ', 'c': 5, d: true })).toEqual({'b': 'bob', 'c': 5, d: true});
  expect(util.trimAllFieldsInObjectAndChildren({'b ': ' bob ', 'c': {' d': 'alica c c '}})).toEqual({'b': 'bob', 'c': {'d': 'alica c c'}});
  expect(util.trimAllFieldsInObjectAndChildren({'a ': ' bob ', 'b': {'c ': {'d': 'e '}}})).toEqual({'a': 'bob', 'b': {'c': {'d': 'e'}}});
  expect(util.trimAllFieldsInObjectAndChildren({'a ': ' bob ', 'b': [{'c ': {'d': 'e '}}, {' f ': ' g ' }]})).toEqual({'a': 'bob', 'b': [{'c': {'d': 'e'}}, {'f': 'g' }]});
});

test('date difference', () => {
  var begin = new Date(2019, 0, 1);
  var end = new Date(2019, 8, 1);
  var d = util.date_diff_days( begin, end );
  expect(d).toBe(242);
});

test('number of days in year', () => {
  var begin = new Date(2018, 11, 31);
  var end = new Date(2019, 11, 31);
  var d = util.date_diff_days( begin, end );
  expect(d).toBe(365);
});

test('number of days in leap year', () => {
  var begin = new Date(2019, 11, 31);
  var end = new Date(2020, 11, 31);
  var d = util.date_diff_days( begin, end );
  expect(d).toBe(366);
});
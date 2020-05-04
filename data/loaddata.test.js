'use strict';

const loaddata = require('./loaddata');

test('JSON parse date reviver', () => {
  const text = '{ "date": "2016-04-26" }';
  const obj = JSON.parse(text, loaddata.json_parse_date_reviver);
  expect(obj.date.getFullYear()).toBe(2016);
  expect(obj.date.getMonth()).toBe(3);
  expect(obj.date.getDate()).toBe(26);
});

test('loaded five apartments', () => {
  expect(Object.keys(loaddata.apartments).length).toBe(5);
});

test('loaded N persons', () => {
  expect(Object.keys(loaddata.persons).length).toBe(13);
});

test('apartment has valid owner', () => {
  var owners = Object.keys(loaddata.persons);
  for (const [key, value] of Object.entries(loaddata.apartments)) {
    expect(key).toBe( value.apartment_id );
    expect(owners).toContain( value.owner_id );
  }  
});

test('unit has valid manager', () => {
  var owners = Object.keys(loaddata.persons);
  for (const [key, value] of Object.entries(loaddata.units)) {
    expect(key).toBe( value.unit_id );
    expect(owners).toContain( value.manager );
  }  
});

test('contract has valid apartment, occupants, begin date, and later end', () => {
  var apartment_keys = Object.keys(loaddata.apartments);
  var person_keys = Object.keys(loaddata.persons);
  for (const [key, value] of Object.entries(loaddata.contracts)) {
    expect(key).toBe( value.contract_id );
    expect(apartment_keys).toContain( value.apartment );
    value.occupants.forEach( (p) => { expect(person_keys).toContain( p ); } );
    expect(value.begin).toBeInstanceOf(Date);
    var end_is_null_or_later_than_begin = (null === value.end)
      ? true
      : (value.begin.getTime() < value.end.getTime());
    //expect(value.begin.getTime()).toBeLessThan(value.end.getTime());
    expect(end_is_null_or_later_than_begin).toBeTruthy();
  }  
});

test('apartment has valid active contract', () => {
  var map_apt_to_contract = {};
  for (const [key, value] of Object.entries(loaddata.contracts)) {
    // check that contract is currently active:
    var test_date_time = new Date("2018-07-14").getTime();
    if(value.begin.getTime() <= test_date_time
       && ((null == value.end)
           || (test_date_time <= value.end.getTime()))) {
      var apt = value.apartment;
      if(!(apt in map_apt_to_contract)) {
        map_apt_to_contract[apt] = [];
      }
      map_apt_to_contract[apt].push(value);
    }
  }
  var apartment_keys = Object.keys(loaddata.apartments);
  var map_keys = Object.keys(map_apt_to_contract);
  apartment_keys.forEach( (a) => { expect(map_keys).toContain( a ); } );
});

test('each contracts meter numbers match its apartments ones', () => {
  for (const [key, value] of Object.entries(loaddata.contracts)) {
    var apt = loaddata.apartments[value.apartment];
    var a = Object.keys(apt.coldwatermeters);
    var b = Object.keys(value.coldwatermeters);
    expect(0===b.length || (a.length === b.length && a.every(function(value, index) { return value === b[index]}))).toBeTruthy();
    var a = Object.keys(apt.hotwatermeters);
    var b = Object.keys(value.hotwatermeters);
    expect(0===b.length || (a.length === b.length && a.every(function(value, index) { return value === b[index]}))).toBeTruthy();
    //var a = Object.keys(apt.heatcostallocators);
    //console.log(a);
    //var b = Object.keys(value.heatcostallocatorreadings);
    //expect(0===b.length || (a.length === b.length && a.every(function(value, index) { return value === b[index]}))).toBeTruthy();
  }
});

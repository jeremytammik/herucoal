// person.js
//
// mongo data model definition for a person, human or legal
//
// Copyright 2020 by Jeremy Tammik.

var mongoose = require( 'mongoose' );

var Schema = mongoose.Schema;

//const enum_person_role_not_used = [
//  'occupant',
//  'owner' ];

var personSchema = new Schema({
  person_id: String,
  firstname: String,
  lastname: String,
  email: String,
  iban: String,
  telephone: String,
  salutation: String,
  street: String,
  streetnr: String,
  zip: String,
  city: String,
  country: String
});

mongoose.model( 'person', personSchema );

sample_person_data = [

  {"person_id": "", "firstname": "horst", "lastname": "weidenmüller", "email": "h@k7.com", "iban": "DEXXX", "telephone": "+49 30 24724842", "salutation": "herr", "street": "friesenstr.", "streetnr": "15c", "zip": "10965", "city": "10965 berlin", "country": "deutschland"},

  {"person_id": "", "firstname": "", "lastname": "weidenmüller gmbh", "email": "ml.weidenmüller@t-online.de", "iban": "DE30 6805 2230 0000 013136", "telephone": "+49 7675 442", "salutation": "firma", "street": "todtmooser str.", "streetnr": "67", "zip": "79872", "city": "bernau", "country": "deutschland"},

  {"person_id": "", "firstname": "", "lastname": "zebra gbr", "email": "ml.weidenmüller@t-online.de", "iban": "DE82 6805 2230 0000 0080 29", "telephone": "+49 7675 442", "salutation": "firma", "street": "todtmooser str.", "streetnr": "67", "zip": "79872", "city": "bernau", "country": "deutschland"},

  {"person_id": "", "firstname": "otto", "lastname": "fröhlich", "email": "of@ofd.ch", "iban": "DE82 6835 0048 0001 018076", "telephone": "+49 7621 18364", "salutation": "herr", "street": "adlergässchen", "streetnr": "3", "zip": "79539", "city": "79539 lörrach", "country": "deutschland"},

  {"person_id": "", "firstname": "mandy", "lastname": "schmidt", "email": "m.schmidt78@gmx.de", "iban": "DEXXX", "telephone": "+49 7623 3478274", "salutation": "frau", "street": "fecampring", "streetnr": "28", "zip": "79618", "city": "rheinfelden", "country": "deutschland"},

  {"person_id": "", "firstname": "herbert", "lastname": "bräuning", "email": "????@gmx.de", "iban": "DE75 3002 0900 5380 0369 89", "telephone": "+49 176 81794825‬", "salutation": "herr", "street": "fecampring", "streetnr": "28", "zip": "79618", "city": "rheinfelden", "country": "deutschland"},

  {"person_id": "", "firstname": "alexander", "lastname": "kem", "email": "valyxa82@mail.ru", "iban": "DE41 3701 0050 0754 2455 03", "telephone": "+49 176 ????", "salutation": "herr", "street": "fecampring", "streetnr": "28", "zip": "79618", "city": "rheinfelden", "country": "deutschland"},

  {"person_id": "", "firstname": "sabine", "lastname": "diesslin", "email": "sabineundlucky@gmail.com", "iban": "DE75 3002 0900 5380 0369 89", "telephone": "+49 7623 3090301‬", "salutation": "frau", "street": "fecampring", "streetnr": "28", "zip": "79618", "city": "rheinfelden", "country": "deutschland"},

  {"person_id": "", "firstname": "fabio", "lastname": "krüger", "email": "fabio.l.krueger@gmail.com", "iban": "DE30 6835 0048 0101 3240 93", "telephone": "+49 162 2693617‬", "salutation": "herr", "street": "fecampring", "streetnr": "28", "zip": "79618", "city": "rheinfelden", "country": "deutschland"},

  
];

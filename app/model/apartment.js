// apartment.js
//
// mongo data model definition for an apartment
//
// Copyright 2020 by Jeremy Tammik.

var mongoose = require( 'mongoose' );

var Schema = mongoose.Schema;

/*
id_wohnung
  energieerfassung
    eigentuemer
    qm
    anzahl zimmer
    rauchmelder (ablaufdatum) -- smokedetector
    wasseruhren (nummer, ablaufdatum) -- watermeter
    heizkostenverteiler (nummer, ablaufdatum, faktor) -- heatcostallocator
  andere rechnungen
    verwaltergebuehr
    grundsteuer
  zimmerkuerzel: BA bad, FL flur, KU kueche, SK, SM, SG schlaf klein, mittel und gross
  nebenkosten_anteil_schluessel is more or less the total unit living area divided by the apartment area m2
  
  there are 16 storeys numbered 00-15 with 6 apartments on each storey --> 96
  01 + 02 are 2-room ones
  03 is 3 rooms small
  04 is 4 rooms
  05 + 06 are 3 rooms large
  
  erste ziffer: unit: 001
  zweite ziffer: etage: 00: EG bis 15. etage
  dritte ziffer: whg: 01-06
  vierte ziffer: vertragszusatz: 00 is owner; 01-09 mieter
  
  whg 01 & 02: 76 qm
  whg 03: 87 qm
  whg 04: 107 qm
  whg 05 & 06: 89 qm  
*/

var apartmentSchema = new Schema({
  _id: String, // suppress automatic generation
  unit_id: String, // unit
  owner_id: String, // person
  grundbuchnr: String,
  area_m2: Number,
  room_count: Number,
  //smokedetectors: { type: Map, of: String }, // dictionary mapping meter_id to expires Date
  //coldwatermeters: { type: Map, of: String }, // map meter_id to expires Date
  //hotwatermeters: { type: Map, of: String }, // map meter_id to expires Date
  //heatcostallocators: { type: Map, of: [String,Number] }, // map meter_id to [expires: Date, factor: Number]
  smokedetectors: { type: Object }, // dictionary mapping meter_id to expires Date
  coldwatermeters: { type: Object }, // map meter_id to expires Date
  hotwatermeters: { type: Object }, // map meter_id to expires Date
  heatcostallocators: { type: Object }, // map meter_id to [expires: Date, factor: Number]
  management_cost_eur: Number,
  heating_electrity_cost_eur: Number,
  landtax_eur: Number,
  nebenkosten_anteil_schluessel: Number },
  
  { _id: false } // suppress automatic generation
);

apartmentSchema.methods.get_display_string = function() {
  return `${this._id} &ndash; ${this.room_count} rooms with ${this.area_m2} m2`;
};

var Apartment = mongoose.model( 'apartment', apartmentSchema );

Apartment.route = 'apt';
Apartment.thing_en = Apartment.modelName.toLowerCase();
Apartment.thing_de = Apartment.modelName;

const { jtformgen_edit_document } = require('../form/jtformgen.js');

// Turn the given map<String, String> into separate dictionary
// entries d[] = mapto an Object so it can be converted to JSON
function unwrap_map_into_d( d, mapname, keyname, valname)
{
  var map = d[mapname];
  var i = 0;
  map.forEach( function( val, key ) {
    var e = mapname + ' ' + (++i).toString() + ' ';
    d[e + keyname] = key;
    d[e + valname] = val;
  });
  delete d[mapname];
}

Apartment.get_edit_form_html = ( d, create_duplicate, error ) => {
  var id = d['_id'];
  var url_action = create_duplicate ? 'dupl' : 'edit';
  url_action = `/${Apartment.route}/${id}/${url_action}_submit`;
  
  var verb = create_duplicate
    ? `duplizieren, also neue ${Apartment.thing_de} anlegen mit aehnlichen Daten`
    : 'edititieren';
  verb = Apartment.thing_de + ' ' + verb;

  delete d['__v'];
  
  if( !create_duplicate ) {
    delete d['_id'];
    delete d['unit_id'];
  }
  
  //unwrap_map_into_d( d, 'smokedetectors', 'nr', 'expiry' );
  //unwrap_map_into_d( d, 'coldwatermeters', 'nr', 'expiry' );
  //unwrap_map_into_d( d, 'hotwatermeters', 'nr', 'expiry' );
  //unwrap_map_into_d( d, 'heatcostallocators', 'nr', 'expiry' );

  return jtformgen_edit_document( d, url_action, verb, true, error );
}

module.exports = Apartment;

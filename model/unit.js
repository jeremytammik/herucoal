// unit.js
//
// mongo data model definition for a heizkosten housing unit
//
// Copyright 2020 by Jeremy Tammik.

var mongoose = require( 'mongoose' );

var Schema = mongoose.Schema;

/*
id_objekt
  energieerfassung
    gesamt qm
    gesamt anzahl wohnungen
    gesamt energie joule kwh
    verbrauch brennstoff material euro oel gas
    verbrauch wasser
    kosten energieerfassung heizanlage verteilung
    kosten wartung heizanlage
    kosten strom heizanlage
    splitting kostenschlüssel aufteilung energiekosten zwischen qm der wohnung und einheiten am heizkörper, e.g. 50 / 50 siehe in punkt 6 "Aufteilung der Heizkosten". or 70 / 30, etc.
  andere rechnungen
    hausgeld
    nebenkosten
*/

var unitSchema = new Schema({
  unit_id: String,
  area_m2: Number,
  apt_count: Number,
  energy_consumption_kwh: Number,
  fuel_consumption_eur: Number,
  water_consumption_l: Number,
  heating_consumption_allocation_cost_eur: Number,
  heating_maintenance_cost_eur: Number,
  heating_electrity_cost_eur: Number,
  splitting_factor: Number,
  hausgeld_eur: Number,
  nebenkosten_eur: Number
});

mongoose.model( 'Unit', unitSchema );

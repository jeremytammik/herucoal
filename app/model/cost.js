// cost.js
//
// mongo data model definition for yearly unit heating and running costs
//
// Copyright 2020 by Jeremy Tammik.

var mongoose = require( 'mongoose' );

var Schema = mongoose.Schema;

var costSchema = new Schema({
  
  unit_id: String,
  year: Number,
  
  // hausgeld nicht umlagefaehig, zahlen eigentuemer
  
  hausgeld_eur: Number, 

  // hausgeld umlagefaehig, zahlen mieter
  
  kabelgebuehren: Number, // pro wohnung
  
  // pro quadratmeter mit nebenkosten_anteil_schluessel
  
  allgemeinstrom: Number,
  muellgebuehren_hausmeister: Number,
  streu_und_putzmittel: Number,
  aussenanlage_pflege: Number,
  versicherungen: Number,
  niederschlagswasser: Number,
  trinkwasseruntersuchung: Number,
  material_und_hilfsstoffe: Number,
  reinigung: Number,
  hausmeister_sozialabgaben: Number,
  hausservice_fremdfirmen: Number,
  lift_umlagefaehig: Number,
  feuerloescher_wartung: Number,
  wartung_eingangstueren: Number,
  wartung_lueftungsanlage: Number,

  // gesamtkosten heizung kaltwasser warmwasser HKW (5 items):
  
  // 1. brennstoff - fuel

  fuel_consumption_kwh: Number,
  fuel_consumption_eur: Number,

  // 2. heiznebenkosten

  heating_nk_consumption_allocation_eur: Number,
  heating_nk_maintenance_eur: Number,
  heating_nk_electrity_eur: Number,
  heating_nk_chimneysweep_eur: Number,

  // 3. heizzusatzkosten - kosten heizgeraete

  heating_zk_heizgeraete_eur: Number,
  
  // 4. zusatzkosten warmwasser

  hotwater_zk_eur: Number,

  // 5. hausnebenkosten (kaltwasseraufbereitung und entsorgung) enthaelt u.a. (5 positionen):

  house_nk_coldwater_m3: Number,
  house_nk_coldwater_eur: Number,
  house_nk_coldwater_equipment_eur: Number,
  house_nk_coldwater_allocation_fee_eur: Number,
  house_nk_coldwater_sonderkosten_eur: Number 
});

var Cost = mongoose.model( 'Cost', costSchema );

module.exports = Cost;
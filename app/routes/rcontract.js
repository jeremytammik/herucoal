const app = module.exports = require('express')();
const util = require( '../calc/util' );
const datautil = require('../model/datautil');
const jtformgen = require('../form/jtformgen');
const Contract = require( '../model/contract' );

app.get( '/', (req, res) => {
  Contract.find( {}, (err, results) => {
    if (err) { console.error(err); return res.send(err.toString()); }
    return res.send( jtformgen.jtformgen_list_documents(
      Contract, '', results, false, true ) );
  });
});

app.get( '/load_data', (req, res) => {
  return datautil.load_data_for_model( Contract, res, req );
});

app.get( '/save_data', (req, res) => {
  return datautil.save_data_for_model( Contract, res, req );
});

app.get( '/unit/:uid/list', (req, res) => {
  var uid = req.params.uid;
  Contract.find( { 'unit_id': uid }, (err, results) => {
    if (err) { console.error(err); return res.send(err.toString()); }
    var url_filter = `/contract/unit/${uid}/list`;
    return res.send( jtformgen.jtformgen_list_documents(
      Contract, ` in ${uid}`, results, false, true, url_filter ) );
  });
});

app.post( '/unit/:uid/list', (req, res) => { // list_filtering_using_match
  var uid = req.params.uid;
  var sfilter = req.body.filter;
  var sfilter2 = sfilter ? sfilter : '.*'; // avoid mongo error on empty filter string
  var o = {};

  // create string representation for matching
  // skip smoke detectors; they have no unique numbers

  o.map = `function () {\
var s = this._id + ' ' \
+ this.occupant_ids.join( ' ' ) \
+ ' ' + this.begin;\
emit( this._id, /${sfilter2}/i.test(s) );\
};`;

  o.reduce = 'function (k, vals) { return Array.sum(vals); };';
  o.query = { unit_id : uid};
  Contract.mapReduce( o, function (err, results) {
    if (err) { console.error(err); return res.send(err.toString()); }
    var ids = [];
    results.results.forEach( (r) => {
      if( r.value ) { ids.push( r._id ); }
    });
    Contract.find( { '_id': {$in : ids} }, (err, results) => {
      var url_filter = `/contract/unit/${uid}/list`;
      var matching = sfilter
        ? ` matching "${sfilter}"`
        : '';
      return res.send( jtformgen.jtformgen_list_documents(
        Contract, `${matching} in ${uid}`, results,
        false, true, url_filter, sfilter ) );
    });
  });
});

app.get( '/unit/:uid/year/:year/list', (req, res) => {
  var uid = req.params.uid;
  var year = req.params.year;
  var year_begin = year + '-01-01';
  var year_end = year + '-12-31';
  //console.log( year_begin, '-', year_end );
  Contract.find( {
      'unit_id': uid,
      'begin': {$lte: year_end},
      $or: [ {'end':''}, {'end': {$gte: year_begin}} ]
    }, (err, results) => {
    if (err) { console.error(err); return res.send(err.toString()); }
    return res.send( jtformgen.jtformgen_list_documents(
      Contract, ` in ${uid} active in year ${year}`, results, false, false ) );
  });
});

app.get( '/:id', (req, res) => {
  var id = req.params.id;
  //Contract.find( {'_id': id }, (err, results) => {})
  Contract.findById( id, (err, result) => {
    if (err) { console.error(err); return res.send(err.toString()); }
    var form = Contract.get_edit_form_html( result._doc, 'view' );
    res.send( form );
  });
});

app.get( '/:id/edit', (req, res) => {
  var id = req.params.id;
  //Contract.find( {'_id': id }, (err, results) => {})
  Contract.findById( id, (err, result) => {
    if (err) { console.error(err); return res.send(err.toString()); }
    var form = Contract.get_edit_form_html( result._doc, 'edit' );
    res.send( form );
  });
});

app.post( '/:id/edit_submit', (req, res) => {
  var id = req.params.id;
  var c = util.trimAllFieldsInObjectAndChildren( req.body );
  //console.log('req.body', c);
  //c.smokedetectors = convert_to_dict(c,'smokedetectors');
  //c.coldwatermeters = convert_to_dict(c,'coldwatermeters');
  //c.hotwatermeters = convert_to_dict(c,'hotwatermeters');
  //c.heatcostallocators = convert_to_dict(c,'heatcostallocators');
  //console.log('c:', c);

  var a = new Contract( c );
  error = a.validateSync();
  if( error ) { console.log('a:', a, '\nerror:', error); }

  if( error ) {
    var d = a._doc;
    d._id = id;
    var form = Contract.get_edit_form_html( d, 'edit', error );
    return res.send( form );
  }

  console.log(`updating ${id}:`, c);
  Contract.updateOne( { "_id": id }, c, (err,res2) => {
    if (err) { console.error(err); return res.send(err.toString()); }
    Contract.countDocuments( {}, (err, count) => {
      if (err) { console.error(err); return res.send(err.toString()); }
      return res.send( jtformgen.success_with_document_count(
        '', count.toString(), Contract.thing_en ) );
    });
  });
});

app.get( '/:id/dupl', (req, res) => {
  var id = req.params.id;
  //Contract.find( {'_id': id }, (err, results) => {})
  Contract.findById( id, (err, result) => {
    if (err) { console.error(err); return res.send(err.toString()); }
    var form = Contract.get_edit_form_html( result._doc, 'dupl' );
    res.send( form );
  });
});

app.post( '/:id/dupl_submit', (req, res) => {
  var id_original = req.params.id;
  
  var c = util.trimAllFieldsInObjectAndChildren( req.body );
  //console.log(c);
  //c.smokedetectors = convert_to_dict(c,'smokedetectors');
  //c.coldwatermeters = convert_to_dict(c,'coldwatermeters');
  //c.hotwatermeters = convert_to_dict(c,'hotwatermeters');
  //c.heatcostallocators = convert_to_dict(c,'heatcostallocators');
  //console.log(c);
  
  var id = c._id;
  Contract.countDocuments( {'_id': id }, (err, count) => {
    if (err) { console.error(err); return res.send(err.toString()); }
    var error = null;
    if( 0 < count ) {
      error = { 'errors': { '_id': {
        'path': '_id', 'message': 'duplicate id' }}};
    }
    else if( !(id.startsWith( c.apartment_id) ) ) {
      error = { 'errors': { '_id': {
        'path': '_id', 'message': 'contract _id must match its apartment_id' }}};
    }
    if( error ) {
      var form = Contract.get_edit_form_html( req.body, 'dupl', error );
      return res.send( form );
    }
    var c2 = new Contract( c );
    error = c2.validateSync();
    if( error ) {
      var d = c2._doc;
      d._id = id_original;
      var form = Contract.get_edit_form_html( d, 'dupl', error );
      return res.send( form );
    }
    //c['_id'] = id;
    //console.log('now create');
    Contract.create( c, (err2,res2) => {
      if (err2) { return console.error(err2); }
      Contract.countDocuments( {}, (err3, count) => {
        if (err3) { return console.error(err3); }
        return res.send( jtformgen.success_with_document_count(
          '', count.toString(), Contract.thing_en ) );
      });
    });
  });
});

app.get( '/:id/del', (req, res) => {
  var id = req.params.id;
  //Contract.find( {'_id': id }, (err, results) => {})
  Contract.findById( id, (err, result) => {
    if (err) { console.error(err); return res.send(err.toString()); }
    var s = result.get_display_string();
    res.send( jtformgen.jtformgen_confirm_delete( Contract, s, id ) );
  });
});

app.get( '/:id/del_confirmed', (req, res) => {
  var id = req.params.id;
  Contract.deleteOne( {'_id': id }, (err, results) => {
    if (err) { console.error(err); return res.send(err.toString()); }
    Contract.countDocuments( {}, (err, count) => {
      if (err) { console.error(err); return res.send(err.toString()); }
      return res.send( jtformgen.success_with_document_count(
        '', count.toString(), Contract.thing_en ) );
    });
  });
});

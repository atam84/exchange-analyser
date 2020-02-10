import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { MongoInternals } from 'meteor/mongo';

let collections = {};
let exchange_analyser = {
  'version': '0.1 beta',
  'db_name': 'crypto',
  'db_port': 27017,
  'db_addr': 'mongodb://localhost'
};

db_uri = exchange_analyser.db_addr + ':' + exchange_analyser.db_port + '/' + exchange_analyser.db_name;
console.log('*** Start server version : ' + exchange_analyser.version);
console.log('*** DB Name              : ' + exchange_analyser.db_name);
console.log('*** DB Port              : ' + exchange_analyser.db_port);
console.log('*** DB Address           : ' + exchange_analyser.db_addr);
console.log('*** DB URI               : ' + db_uri);


const databaseDriver = new MongoInternals.RemoteCollectionDriver(db_uri);
//let numberOfDocs = databaseDriver.open('boxes').find().count();

//console.dir(util.inspect(databaseDriver));

db = databaseDriver.mongo.db;
collections_list = db.listCollections();

function setObjectId() {
  return new Mongo.ObjectID().toHexString();;
}

collections_list.each(function(n, collection){
  if(collection){
    collections[collection.name] = new Mongo.Collection(collection.name, { _driver: databaseDriver});
    console.log('*** Collection : ' + collection.name + ' is linked.');
    //console.log('*** Collection : ' + collection.name);
  }
});

Meteor.startup(() => {
  // code to run on server at startup
});

Meteor.methods({
  'debug_database': () => {
    console.log(' *** (Debug) Sent database definition');
    return collections.bittrex_ohlcv.find({}).fetch();
  },
  'debug_db': () => {
    return collections.bittrex.find({}).fetch();
  },
  'addTransaction': (doc) => {
    var _doc = doc;
    _doc._id = setObjectId();
    console.log(_doc);
  }
});


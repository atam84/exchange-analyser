import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { MongoInternals } from 'meteor/mongo';

let collections = {};
let list_collections = [];
let exchange_analyser = {
  'version': '0.1 beta',
  'db_name': 'crypto',
  'db_port': 27017,
  'db_addr': 'mongodb://localhost',
  'params': 'params'
};

let _app_params = {
  _id: '__collector_params',
  trackIco: [{
    exchange: 'binance',
    icos: ['BTC/ETH', 'BTC/USDT', 'BTC/TRX']
  },{
    exchange: 'bittrex',
    icos: ['BTC/ETH', 'BTC/USDT', 'BTC/TRX']
  }], 
};
let _user_params = {
  user: 'atam84',
  balances: [{
    exchange: 'binance',
    base: 'BTC',
    ico: 'ETH',
    date: '1581386859',
    price: '0.00254451',
    quantity: 10,
    action: 'BUY',
    createAt: '1581386859',
    trackByCollector: true,
  },{
    exchange: 'binance',
    base: 'BTC',
    ico: 'USDT',
    date: '1581386859',
    price: '9650',
    quantity: 2,
    action: 'BUY',
    createAt: '1581386859',
    trackByCollector: true,
  }]
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
    list_collections.push(collection.name);
    console.log('*** Collection : ' + collection.name + ' is linked.');
    //console.log('*** Collection : ' + collection.name);
  }
});

if(list_collections.indexOf(exchange_analyser.params) < 0) {
  collections.params = new Mongo.Collection(exchange_analyser.params, { _driver: databaseDriver});
  list_collections.push(exchange_analyser.params);
  collections.params.insert(_app_params, (err, result) => {
    if(err) {
      console.log('Insert Error : ' + err);
    } else {
      console.log('Insert OK ' + result);
    }
  });
  collections.params.insert(_user_params, (err, result) => {
    if(err) {
      console.log('Insert Error : ' + err);
    } else {
      console.log('Insert OK ' + result);
    }
  });
}

Meteor.startup(() => {
  // code to run on server at startup
});

Meteor.methods({
  'getParams': () => {
    console.log(' *** (Debug) Sent database definition');
    return collections.bittrex_ohlcv.find({}).fetch();
  },
  'getExchangeTrackedIco': () => {
    return collections.bittrex.find({}).fetch();
  },
  'addTransaction': (doc) => {
    var _doc = doc;
    _doc._id = setObjectId();
    console.log(_doc);
  }
});


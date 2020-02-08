import { Meteor } from 'meteor/meteor';

const database = new MongoInternals.RemoteCollectionDriver('mongodb://localhost:27017/crypto');
//let numberOfDocs = database.open('boxes').find().count();

console.dir(database);

db = database.mongo.db;
collections = db.listCollections();

collections.each(function(n, collection){
  if(collection){
    console.log( collection.name );
  }
});

Meteor.startup(() => {
  // code to run on server at startup
});

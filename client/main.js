import 'bootstrap';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { ReactiveDict } from 'meteor/reactive-dict'
import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { Mongo } from 'meteor/mongo'
import { _ } from 'underscore';

_display = new ReactiveVar();
_data = new ReactiveDict();
_autoRefresh = new ReactiveDict();

_debug = true;
_app_name = 'eXchange-Analyser';
_version = 'beta v0.4.3';
let _intervalHandler = undefined;


Collections = {};
Collections.params    = new Mongo.Collection(null);
Collections.exchanges = new Mongo.Collection(null);
Collections.markets   = new Mongo.Collection(null);

import '../lib/router.js';

import './main.html';
import '../imports/ui/transactions/transactions.js';


Template.mainMenu.events({
  get_nodeDetails() {
      let _nodeName = FlowRouter.getParam("_nodeName");
      //let nodeInfo = node_info(selectedNode(_nodeName, _data.get('nodes')));
      let nodeInfo = node_info(findOneDocument('nodes', {'metadata.name': _nodeName}));
      if(_debug) {
          console.log(arguments.callee.name + '() : ');
          console.dir(nodeInfo);
      }
      return nodeInfo;
  },
  'click .debug_database': (e) => {
    Meteor.call('debug_database', (err, res) => {
      if (err) {
          console.log("debug_database ERROR : " + err);
      } else {
          if (_debug) {
              console.log('debug_database Response :');
              console.dir(res);
          }
      }
    });
  },
  'click .debug_db': (e) => {
    Meteor.call('debug_db', (err, res) => {
      if (err) {
          console.log("debug_db ERROR : " + err);
      } else {
          if (_debug) {
              console.log('debug_db Response :');
              console.dir(res);
          }
      }
    });
  }

});
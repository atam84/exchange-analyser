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

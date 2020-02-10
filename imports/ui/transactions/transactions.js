/**
 * 
 */

import { Template } from 'meteor/templating';
import SimpleSchema from 'simpl-schema';

SimpleSchema.extendOptions(['autoform']);

import './transactions.html';

Schema = {};
Schema.transaction = new SimpleSchema({
    exchange: {
        type: String,
        label: "Exchange",
        max: 50
    },
    icoBase: {
        type: String,
        label: "ico Base",
        max: 8
    },
    ico: {
        type: String,
        label: "Ico Pair",
        max: 50
    },
    date: {
        type: String,
        label: "Date",
        max: 20
    },
    price: {
        type: String,
        label: "Price",
        max: 20
    },
    quantity: {
        type: String,
        label: "Quantity",
        max: 20
    },
    action: {
        type: String,
        label: "Action",
        max: 20
    }
}, { tracker: Tracker });


Template.createTransactions.helpers({
    transactionSchema: function() {
      return Schema.transaction;
    }
});


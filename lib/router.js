FlowRouter.route('/', {
    name: 'mainPage',
    action: function() {
      BlazeLayout.render('AppMainView', {main: 'mainPage'});
    }
});

FlowRouter.route('/create-transactions', {
    name: 'createTransactions',
    action: function() {
      BlazeLayout.render('AppMainView', {main: 'createTransactions'});
    }
});

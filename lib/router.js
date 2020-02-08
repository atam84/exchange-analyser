FlowRouter.route('/', {
    name: 'mainPage',
    action: function() {
      BlazeLayout.render('AppMainView', {main: 'mainPage'});
    }
});


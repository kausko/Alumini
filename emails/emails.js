var sendgrid = require('@sendgrid/mail');

var APIKEY = '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';

sendgrid.setApiKey(APIKEY);

var Verification = function(email, link) {
    sendgrid.send({
        to: `${email}`,
        from: 'pradyumnaraje.patil@gmail.com',
        subject: 'Verification',
        text: `Link ${link}`
    });
}
var Welcome = function(email, name) {
    sendgrid.send({
        to: `${email}`,
        from: 'pradyumnaraje.patil@gmail.com',
        subject: `Welcome ${name}`,
        text: 'Sup'
    });
}

module.exports = {
    Verification,
    Welcome
}
/**
 * @param {Event} event - Details about registration event.
 */
exports.onExecutePostUserRegistration = async (event) => {
    const Plunk = require('@plunk/node');
    const plunk = new Plunk.default(event.secrets.PLUNK_API_KEY);

    await plunk.events.publish({
        email: event.user.email,
        event: 'account-created'
    });
};

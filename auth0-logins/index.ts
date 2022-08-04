/**
 * Handler that will be called during the execution of a PostLogin flow.
 *
 * @param {Event} event - Details about the user and the context in which they are logging in.
 */
exports.onExecutePostLogin = async (event) => {
    const Plunk = require('@plunk/node');
    const plunk = new Plunk.default(event.secrets.PLUNK_API_KEY);

    await plunk.events.publish({
        email: event.user.email,
        event: 'login'
    });
};
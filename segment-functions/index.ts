/**
 * Handle track event
 * @param  {SegmentTrackEvent} event
 * @param  {FunctionSettings} settings
 */
async function onTrack(event, settings) {
    const endpoint = 'https://api.useplunk.com/v1';
    let response;

    if (!event.properties.email) {
        throw new InvalidEventPayload('No email found in the properties');
    }

    try {
        response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${settings.apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                event: event.event,
                email: event.properties.email
            })
        });
    } catch (error) {
        // Retry on connection error
        throw new RetryError(error.message);
    }

    if (response.status >= 500 || response.status === 429) {
        // Retry on 5xx (server errors) and 429s (rate limits)
        throw new RetryError(`Failed with ${response.status}`);
    }
}

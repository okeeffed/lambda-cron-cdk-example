const axios = require('axios');

/**
 * Send a basic text message into Slack.
 *
 * @param {*} message
 * @param {*} [channel=process.env.SLACK_CHANNEL]
 * @returns
 */
function sendText(message, channel = process.env.SLACK_CHANNEL) {
  return new Promise((resolve, reject) => {
    const data = {
      text: message,
    };
    postToChannel(data, channel)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
}

/**
 * Post the Slack data to a channel.
 *
 * @param {Object} data
 * @param {String} [channel=process.env.SLACK_CHANNEL]
 * @returns
 */
async function postToChannel(data, channel = process.env.SLACK_CHANNEL) {
  return await axios
    .post(channel, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((res) => res.data)
    .catch((err) => err);
}

exports.handler = async function (_, context) {
  await sendText('Lambda Cron job message');
  return context.logStreamName;
};

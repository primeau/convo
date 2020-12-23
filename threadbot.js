const retorts = require("./retorts");

const THREAD_LENGTH_WARN = 2;
let threadCounter = {};

const WITTY_RETORTS = [
  `Gosh, this sure is getting to be quite the thread isn't it {NAME}?`,
  `Hmmm, maybe it's time we took this to a room, don't you think {NAME}?`,
  `Ok, no really, here's a Zoom link for you chatterboxes. Especially you, {NAME}!`,
  `I think this channel has had enough of your jibber-jabber {NAME}!`,
];


exports.respondToMessage = (message) => {
  let response;
  let zoomIt = false;
  if (message.thread_ts) {
    let count = threadCounter[message.thread_ts] || 0;
    threadCounter[message.thread_ts] = ++count;

    if (count && count % THREAD_LENGTH_WARN) {
      response = retorts.select(WITTY_RETORTS, message.user);
    }
  } 

  //   if (zoomIt) {
  //   await say(`/zoom`); //TODO
  // }
  return response;
};

const retorts = require("./retorts");

const THREAD_LENGTH_WARN = process.env.THREAD_LENGTH_WARN || 50;
const WITTY_RETORTS = [
  `Gosh, this sure is getting to be quite the thread isn't it {NAME}?`,
  `Hmmm, maybe it's time we took this to a room, don't you think {NAME}?`,
  `Ok, no really, let's take it to Zoom you chatterboxes. Especially you, {NAME}!`,
  `I think this channel has had enough of your jibber-jabber {NAME}!`,
];
let threadCounter = {};

//
// read a message
// figure out if it's in a thread
// return a message if the thread is getting too long, or nothing
//
exports.respondToMessage = (message) => {
  let response;
  // check if the message is in a thread 
  if (message.thread_ts) {
    // get the thread count so far, or initialize to 0
    let count = threadCounter[message.thread_ts] || 0;
    threadCounter[message.thread_ts] = ++count;
    // if this message is a multiple of the threshold, prepare a response
    if (count && count % THREAD_LENGTH_WARN === 0) {
      response = retorts.select(WITTY_RETORTS, message.user);
    }
  }
  return response;
};
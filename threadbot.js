const THREAD_LENGTH_WARN = 2;
let threadCounter = {};

const WITTY_RETORTS = [
  `Gosh, this sure is getting to be quite the thread isn't it {NAME}?`,
  `Hmmm, maybe it's time we took this to a room, don't you think {NAME}?`,
  `Ok, no really, here's a Zoom link for you chatterboxes. Especially you, {NAME}!`,
  `I think the {CHANNEL} channel has had enough of your jibber-jabber {NAME}!`,
];


exports.readMessage = (message) => {
  let response;
  let zoomIt = false;
  if (message.thread_ts) {
    let count = threadCounter[message.thread_ts] || 0;
    threadCounter[message.thread_ts] = ++count;

    if (count && count % THREAD_LENGTH_WARN) {
      response = pickWittyRetort(message.user, message.channel);
    }
  } 

  //   if (zoomIt) {
  //   await say(`/zoom`); //TODO
  // }
  return response;
};


function pickWittyRetort(name, channel) {
  let retort = WITTY_RETORTS[Math.floor(Math.random() * WITTY_RETORTS.length)];
  retort.replace(`{NAME}`, `<@${name}>`);
  retort.replace(`{CHANNEL}`, `<@${channel}>`);
  return retort;
}
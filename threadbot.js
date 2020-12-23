const THREAD_LENGTH_WARN = 2;
let threadCounter = {};

const WITTY_RETORTS = [
  `Gosh, this sure is getting to be quite the thread isn't it <@${message.user}>?`,
  `Hmmm, maybe it's time we took this to a room, right <@${message.user}>?`,
  `Ok, no really, here's a Zoom link for you chatterboxes. Especially you, <@${message.user}>!`,
];


exports.readMessage = (message) => {
  let response;
  let zoomIt = false;
  if (message.thread_ts) {
    let count = threadCounter[message.thread_ts] || 0;
    threadCounter[message.thread_ts] = ++count;

    if (count && count % THREAD_LENGTH_WARN) {
      response = pickWittyRetort();
    }
  } 

  //   if (zoomIt) {
  //   await say(`/zoom`); //TODO
  // }
  return response;
};


function pickWittyRetort() {
  return WITTY_RETORTS[Math.floor(Math.random() * WITTY_RETORTS.length)];
}
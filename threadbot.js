const THREAD_LENGTH_WARN_1 = 5;
const THREAD_LENGTH_WARN_2 = 10;
const THREAD_LENGTH_WARN_3 = 15;
let threadCounter = {};

exports.readMessage = (message) => {
  let response;
  let zoomIt = false;
  if (message.thread_ts) {
    let count = threadCounter[message.thread_ts] || 0;
    threadCounter[message.thread_ts] = ++count;

    if (count === THREAD_LENGTH_WARN_1) {
      response = `Gosh, this sure is getting to be quite the thread isn't it <@${message.user}>?`;
    } else if (count === THREAD_LENGTH_WARN_2) {
      response = `Hmmm, maybe it's time we took this to a room, right <@${message.user}>?`;
    } else if (count === THREAD_LENGTH_WARN_3) {
      response = `Ok, no really, here's a Zoom link for you chatterboxes. Especially you, <@${message.user}>!`;
      zoomIt = true;
    }
  } 
  //   if (zoomIt) {
  //   await say(`/zoom`); //TODO
  // }
  return response;
};

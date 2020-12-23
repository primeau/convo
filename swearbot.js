// see also: https://www.youtube.com/watch?v=kyBH5oNQOS0
const dirtyWords = RegExp(
  `shit|piss|fuck|cunt|cocksucker|motherfucker|tits|dick|asshole|bitch`
);

const MAX_FUCKS_ALLOWED = 3;
const FUCK_WINDOW = 60;

let fuckCounter = {};

export function readMessage(message) {
  let response;
  if (dirtyWords.test(message.text)) {
    // load up the swears
    let fucksGiven = fuckCounter[message.user];
    // if they haven't sworn before
    if (!fucksGiven) {
      fucksGiven = [];
    }
    // add to the swear jar
    fucksGiven.push(message.ts);
    // we only want the most recent swears
    while (fucksGiven.length > MAX_FUCKS_ALLOWED) {
      fucksGiven.shift();
    }
    // uh oh, lots of swearing counted
    if (fucksGiven.length === MAX_FUCKS_ALLOWED) {
      let newestFuck = fucksGiven[MAX_FUCKS_ALLOWED - 1];
      let oldestFuck = fucksGiven[0];
      // have they been swearing a lot lately?
      if (newestFuck - oldestFuck < FUCK_WINDOW) {
        response = `You're quite the pottymouth, aren't you <@${message.user}>?`;
      }
    }
    fuckCounter[message.user] = fucksGiven;
  }
  return response;
}

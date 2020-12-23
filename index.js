const { App } = require("@slack/bolt");
const swearbot = require("./swearbot");
const threadbot = require("./threadbot");

//
// create the app
//
const app = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN
});

//
// Start the app
//
(async () => {
  await app.start(process.env.PORT || 3000);
  console.log("⚡️ Bolt app is running!");
})();

//
// listen for messages
//
app.message(async ({ message, say }) => {
  let response;
  
  response = swearbot.readMessage(message);
  sendMessage(response, message.thread_ts, say);

  response = threadbot.readMessage(message);
  sendMessage(response, message.thread_ts, say);
});

// 
// send a message as the chatbot
//
async function sendMessage(text, thread, say) {
  // console.log(text);
  if (text) {
    await say({
      text: text,
      thread_ts: thread
    });
  }
};

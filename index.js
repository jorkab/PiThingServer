require('dotenv').config()
const { MultipleThings, WebThingServer } = require('webthing');
const { GpioTemperatureSensor } = require('./things');
const { PORT, SERVERNAME} = process.env;

function runServer() {
  const sensor = new GpioTemperatureSensor();
  const server = new WebThingServer(new MultipleThings([sensor], SERVERNAME), PORT);
  process.on('SIGINT', () => {
    server.stop().then(() => process.exit()).catch(() => process.exit());
  });
  server.start().catch(console.error);
}
runServer();

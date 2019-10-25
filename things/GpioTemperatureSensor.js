
const { Property, Thing, Value } = require('webthing');
const { readFromGPIO } = require('../common/Utils');
const { GPIOPATH, TEMPSENSORID, ENCODING, GPIOREADTIMEOUT } = process.env;
/**
 * A temperature sensor which updates its measurement every few seconds.
 */
class GpioTemperatureSensor extends Thing {
  constructor() {
    super(
      GPIOPATH,
      'DS18B20',
      ['MultiLevelSensor'],
      'A web connected temperature sensor'
    );

    this.temperature = new Value(0.0);
    this.addProperty(
      new Property(
        this,
        'temperature',
        this.temperature,
        {
          '@type': 'TemperatureProperty',
          title: 'Temperature',
          type: 'number',
          description: 'The current temperature in ºC',
          minimum: -55,
          maximum: 125,
          unit: 'ºC',
          readOnly: true,
        }
      )
    );

    setInterval(async() => {
      const data = await readFromGPIO(GPIOPATH, TEMPSENSORID, ENCODING);
      const temp = data.slice(data.indexOf('t=')+2)/1000;
      this.temperature.notifyOfExternalUpdate(temp);
    }, GPIOREADTIMEOUT);
  }
}

module.exports = GpioTemperatureSensor;

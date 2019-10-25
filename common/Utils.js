const fs = require('fs');

class Utils {
    static readFromGPIO(path, sensorId, encoding) {
      return new Promise ((resolve, reject) =>{
        fs.readFile(`${path}/${sensorId}/w1_slave`, `${encoding}`, (err, res) => {
          if(err){
            reject(err)
          }
          resolve(res)
        });
      })
    }
}

module.exports = Utils;

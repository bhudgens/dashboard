const { v4: uuid } = require('uuid');
const AWS = require('aws-sdk');

const {
  AWS_ENDPOINT,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY
} = process.env;

// --- Environment Requirements If `endpoint` is Used
const endpoint = AWS_ENDPOINT;
const s3ForcePathStyle = true;
const _awsEndpointConfigs = AWS_ENDPOINT ? { endpoint, s3ForcePathStyle } : {};
// --- Environment Requirements For All
const _awsRequiredConfigs = {
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
};
// --- We only need some attributes if AWS_ENDPOINT is set
const _awsConfig = Object.assign({}, _awsRequiredConfigs, _awsEndpointConfigs);
const s3 = new AWS.S3(_awsConfig);

const MINUTES_IN_A_YEAR = 525600

let _probeCount = 1;
let _sensorCount = 1;
let _totalFakeResultCount = MINUTES_IN_A_YEAR * _probeCount;
const _usersS3Bucket = "iphb-users";
const _accountsS3Bucket = "iphb-accounts";

function randomIntFromInterval(min, max) { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function _stringify(data) {
  return JSON.stringify(data, null, 2);
}

// iphb-users/234-234-234-23-423/asdfasdfasdfasdf.json
let _accountsCount = 2;
const email = "benjamin.hudgens@gmail.com"
const accounts = [];

while (_accountsCount--) {
  accounts.push(uuid());
}

const _user = { accounts, email };
const _userEmailBase64 = Buffer.from(_user.email).toString('base64');

const _usersPath = `${_usersS3Bucket}/${_userEmailBase64}.json`
console.log(`Write: ${_usersPath}`, _user);

let _fakeSensorData;

accounts.forEach(accountId => {
  const _lowestFakePingTime = 25;
  const _highestFakePingTime = 225;

  const _probes = [];
  const _sensors = [];

  while (_probeCount--) {
    _probes[_probeCount] = uuid();
  }

  while (_sensorCount--) {
    _sensors[_sensorCount] = uuid();
  }

  const _currentDateTime = Math.floor(new Date().getTime() / 1000);


  let _currentEpochFloor = 0;
  _probes.forEach(probeId => {
    _sensors.forEach(sensorId => {
      _fakeSensorData = { probeId, sensorId };
      let _total = _totalFakeResultCount;
      while (_total--) {
        const _min = _currentDateTime + _currentEpochFloor;
        const _max = _min + 5;
        const _epoch = randomIntFromInterval(_min, _max);
        _fakeSensorData.sensorResults = _fakeSensorData.sensorResults || {};
        _fakeSensorData.sensorResults[_epoch] = randomIntFromInterval(_lowestFakePingTime, _highestFakePingTime);
        _currentEpochFloor += 5;
      }
    });
  });

  const _sensorData = {};
  _sensors.forEach(sensorId => {
    const _randomProbeIndex = randomIntFromInterval(0, _probes.length);
    const _probe = _probes[_randomProbeIndex];
    _sensorData[_probe] = _sensorData[_probe] || [];
    _sensorData[_probe].push(sensorId);
  });

  const _accountSensorsPath = `${_accountsS3Bucket}/${accountId}/sensors.json`
  console.log(`Write: ${_accountSensorsPath}`, _sensorData);
});

// iphb - accounts / 234 - 234 - 234 - 23 - 4234 / probes.json
// iphb - accounts / 234 - 234 - 234 - 23 - 4234 / sensors.json

console.log(_stringify(_fakeSensorData));


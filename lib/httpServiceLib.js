import axios from 'axios'; 

const BASE_URL = "https://us-central1-device-test-b53b4.cloudfunctions.net/helloWorld";

async function makeHttpPostRequest(params, callback){

  let data = await axios({
    method: 'post',
    url: getCompleteUrl(params),
    data: params.body
  })
    .then(res => {
      if (res.status === 200) {
        console.log("data success", res.data);
        return res.data;
      }
    })
    .catch(err => {
      console.log('AXIOS ERROR: ', err);
      return null;
    });

  if (data === null) {
    return callback({error: 'Server error'}, null);
  } else {
    callback(null, data);
  }
}

async function makeHttpGetRequest(params, callback){
  let data = await axios({
    method: 'get',
    url: getCompleteUrl(params),
  })
    .then(res => {
      if (res.status === 200) {
        return res.data;
      }
    })
    .catch(err => {
      console.log('AXIOS ERROR: ', err);
      return null;
    });
  return data;
}

const getCompleteUrl = (params) => {
  let completeURI = '',
    end_point;

  switch (params.endPoint) {
    case 'REGISTER_DEVICE':
      end_point = 'device/register';
      break;
    case 'GET_DEVICE_INFO':
      end_point = 'device/getinfo';
      break;
    case 'GET_USERS_INFO': 
       end_point = 'user/user';
       break;
    case 'SAVE_USERS_INFO':
      end_point = 'user/register';
      break;
    case 'ALLOCATE_DEVICE':
      end_point = 'ops/allocate';
      break;
  }

  if (params.method === 'post') {
    console.log("completeURI:"+ (BASE_URL + '/' + end_point));
    return (completeURI = BASE_URL + '/' + end_point);
  } else {
    completeURI = BASE_URL + '/' + end_point + '?';
    let body = params.body;
    for (var i in body) {
      completeURI = completeURI + body[i].key + '=' + body[i].value;
    }
  }

  console.log("completeURI:"+completeURI);
  return completeURI;
};

exports.makeHttpPostRequest = makeHttpPostRequest;
exports.makeHttpGetRequest = makeHttpGetRequest;
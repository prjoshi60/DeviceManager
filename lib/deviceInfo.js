import DeviceInfo from 'react-native-device-info'; 

const getDeviceUniqueId = () => {
  return DeviceInfo.getUniqueId();
};
const  getDeviceName = async () => {
  let dn = await DeviceInfo.getDeviceName();
  return dn;
};

exports.getDeviceUniqueId = getDeviceUniqueId;
exports.getDeviceName = getDeviceName;
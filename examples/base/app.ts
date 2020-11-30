import httpRequest from '../../src';


httpRequest.interceptors.request.use((config) => {
  console.log(config)
  config.headers.test += '1';
  config.headers.b = 66;
  config.params.commonParams = 'test_common_params';
  return config;
});

httpRequest.interceptors.request.use((config) => {
  console.log(config)
  config.headers.test += '2';
  return config;
});

httpRequest.interceptors.request.use((config) => {
  console.log(config)
  config.headers.test += '3';
  return config;
});

httpRequest.interceptors.response.use((res) => {
  res.a = 12313;
  return res;
});



httpRequest.get('/base/get', {a: 1, b: 2}, {headers: {test: ''}}).then(res => {
  console.log(res)
}).then(res1 => {
  console.log(res1);
});

httpRequest.post('/base/post', {a: 1}, {headers: {b: 3}})
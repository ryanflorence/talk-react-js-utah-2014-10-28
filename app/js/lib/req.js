module.exports = req;

function req(method, url, data, cb) {
  if (typeof data === 'function')
    (cb = data) && (data = null);
  cb = cb || k;
  var xhr = new XMLHttpRequest();
  xhr.onload = function() {
    if (xhr.status >= 300) {
      cb(new Error(xhr.status));
    } else {
      cb(null, JSON.parse(xhr.response));
    }
  };
  xhr.open(method, url);
  xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
  xhr.send(JSON.stringify(data));
}

req.post = function(url, data, cb) {
  return req('POST', url, data, cb);
};

req.get = function(url, data, cb) {
  return req('GET', url, data, cb);
};

req.put = function(url, data, cb) {
  return req('PUT', url, data, cb);
};

function k(){}


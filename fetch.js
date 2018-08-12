import stacktraceParser from 'stacktrace-parser';

const APPUtil = {

};

const parseParam = obj => Object.keys(obj).map(k => `${k}=${encodeURIComponent(obj[k])}`).join('&');

const getDefaultHeader = (token = '', appName = 'undefined') => ({
  Authorization: `Token token=${token}`,
  Token: token,
  appname: appName,
  appscheme: NativeModules.SCCRNAppData.appScheme,
  TT: token,
  Agent: (Platform.OS === 'ios') ? 11 : 10,
  _security_token: token,
  _security_token_inc: token,
  'Souche-Security-Token': token,
  'Souche-Inc-Security-Token': token,
  'souche-std-response': 1,
  'User-Agent': SRNConfig.ua,
  Version: SRNConfig.hostAppVersion,
  BundleVersion: SRNConfig.appVersion,
});


const Fetch = () => {
  let options;
  if (arguments[1]) {
    options = arguments[1];
  } else {
    options = {};
  }

  if (!options.headers) {
    options.headers = {};
  }

  const timeout = options.timeout || 60000;
  const _args = arguments;
  const self = this;

  const stackTemp = stacktraceParser.parse(new Error().stack)[1];
  delete stackTemp.file;
  const stack = JSON.stringify(stackTemp);

  return new Promise((resolve, reject) => {
    let hasResolved = false;
    let hasRejected = false;
    // APPUtil.getAppData(function (err, data) {
    // 附加token到header
    // var token = data.userToken || 'empty_token';

    options.headers = Object.assign(options.headers, getDefaultHeader(token));
    // 本地开发调试环境，删掉 User-Agent 属性，以避免开启允许浏览器跨域后 在 Chrome DevTools 中调试网络请求时的 'Refused to set unsafe header "user-agent"'报错
    if (__DEV__) { delete options.headers['User-Agent']; }
    // User-Agent，用户代理，是一种向访问网站提供你所使用的浏览器类型及版本、操作系统及版本、浏览器内核、等信息的标识

    const method = options.method ? options.method.toUpperCase() : 'GET';

    // 用于指示资源的MIME类型 media type
    if (method === 'POST') {
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    }
    if (options.json) {
      options.headers['Content-Type'] = 'application/json';
      // JSON.stringify(value[, replacer [, space]])
      // JSON.stringify(options.json)
      options.body = JSON.stringify(options.json, undefined, 0);
    } else if (options.data) {
      if (method === 'GET') {
        // url拼接，传参
        _args[0] = _args[0] + (_args[0].indexOf('?') === -1 ? '?' : '&') + parseParam(options.data);
      } else if (method === 'POST') {
        if (typeof (options.data) === 'object') {
          // 比起普通的ajax,使用FormData的最大优点就是我们可以异步上传一个二进制文件
          const formdata = new FormData();
          for (const i in options.data) {
            // 给当前FormData对象添加一个键/值对
            formdata.append(i, options.data[i]);
          }
          options.body = parseParam(options.data);
        } else {
          options.body = options.data;
        }
      }
    } else {
      options.body = options.data;
    }

    _args[1] = options;
    let fetchStatus = 200;

    // 设置超时时间
    if (timeout) {
      setTimeout(() => {
        if (!hasResolved && !hasRejected) {
          hasRejected = true;
          const e = new Error('timeout');
          e.code = 408;
          // showToast(`请求超时，请稍后再试`);
          // SRNNative.log && SRNNative.log("v", `request=${JSON.stringify(fetchLogObj)}`, `[SRN-Network 请求超时] stack=${stack}`, `等待时间为${timeout}ms，错误信息：${e.toString()}`);
          reject(e);
        }
      }, timeout);
    }

    // 进行fetch请求
    fetch(_args[0], options).then((res) => {
      fetchStatus = res.status;
      // response.json() :它返回一个 promise ，解析结果是将文本体解析为JSON。
      return res.json();
    }).then((data) => {
      // 从fetch()返回的 Promise 将不会拒绝HTTP错误状态
      // 处理HTTP错误状态
      if (fetchStatus != 200) {
        let e = new Error('系统错误，请稍后重试');
        e.code = fetchStatus;
        throw e;
      } else {
        // Response.status == 200
        if (typeof (data.code) === 'undefined' && typeof (data.success) === 'undefined') {
          // 兼容一些不标准的返回结构，直接抛出整个data
          if (!hasResolved && !hasRejected) {
            hasResolved = true;
            resolve(data);
          }
        } else {
          // 标准结构的处理
          // {
          //   "code": "",
          //   "data": "",
          //   "msg": "",
          //   "success": true/false,
          //   "traceId": ""
          // }
          if (parseInt(data.code, 10) === 10000 || data.success) {
            if (!hasResolved && !hasRejected) {
              hasResolved = true;
              resolve(data.data);
            }
          } else {
            // 后台返回错误码的处理
            if ((parseInt(data.code, 10) === 10001 || parseInt(data.code, 10) === 10004) && global.LOGIN_PROTOCOL) {
              hasRejected = true;
              // APPUtil.reLogin(() => {
              //     SRNFetch.apply(this, _args).then((data) => {
              //         resolve(data);
              //     }).catch((e) => {
              //         reject(e);
              //     })
              // })
              reject();
            } else {
              data.message = data.msg;
              throw data;
            }
          }
        }
      }
    }).catch((e) => {
      //
      // SyntaxError 对象代表尝试解析语法上不合法的代码的错误。
      // instanceof 运算符用来测试一个对象的原型链中是否存在一个构造函数的 prototype 属性
      if (e instanceof SyntaxError) {
        // SRNNative.log && SRNNative.log("v", `request=${JSON.stringify(fetchLogObj)}`, `[SRN-Network 解析出错] stack=${stack}`, `错误信息：${e.toString()}`);
        showToast('网络错误：解析出错');
      } else if (e.message === 'Network request failed') {
        //    SRNNative.log && SRNNative.log("v", `request=${JSON.stringify(fetchLogObj)}`, `[SRN-Network 连接网络失败] stack=${stack}`, `错误信息：${e.toString()}`);
        showToast('网络信号异常，连接网络失败');
      } else {
        //    SRNNative.log && SRNNative.log("v", `request=${JSON.stringify(fetchLogObj)}`, `[SRN-Network 其他网络问题] stack=${stack}`, `错误信息：${e.toString()}`);
        showToast(e.message, e.traceId || '');
      }
      if (!hasResolved && !hasRejected) {
        hasRejected = true;
        reject(e);
      }
    });
    // })
  });
};


export default Fetch;

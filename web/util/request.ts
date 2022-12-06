import { Toast } from 'antd-mobile';
type Options = {
  showLoading?: boolean;
  headers?: {
    [key: string]: string;
  };
  [key: string]: any;
};

const requestGlobalConfig = (options: Options) => {
  // 全局ajax添加头
  const newOptions = options || {};
  newOptions.headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    ...options.headers,
  };

  return newOptions;
};

function createBodyString(data: any) {
  // 以formData（querystring）形式提交
  // const bodyString = querystring.stringify(data);

  // 以JSON形式提交
  return typeof data === 'string' ? data : JSON.stringify(data);
}

function parseJSON(response: any) {
  if (!response.redirected) {
    return response.json();
  }
  return response;
}

function checkStatus(response: any) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  // if (response.status === 404) {
  //   appHelper.getHistory().replace('/404');
  // }

  const error = new Error(response.statusText);
  throw error;
}

function request(url: string, options: Options) {
  const globalConfig = requestGlobalConfig(options);
  const { showLoading } = options;
  if (options.body) {
    options.body = JSON.stringify(options.body);
  }
  if (options.method) {
    options.method = options.method.toLocaleLowerCase();
  }
  return fetch(url, globalConfig)
    .then(checkStatus)
    .then(parseJSON)
    .then(d => {
      console.log('d', d);
      if (!d.success) {
        Toast.show(d.msg || '服务器错误');
      }
      return d;
    })
    .catch(err => {
      let shouldToastErrorMessage = true;
      if (err.response && err.response.status === 404) {
        // 404不再弹出错误提示
        shouldToastErrorMessage = false;
      }
      if (shouldToastErrorMessage) {
        Toast.show(err.message || '服务器错误');
      }
      return { err };
    });
}

export default request;

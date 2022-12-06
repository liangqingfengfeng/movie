module.exports = () => {
  const config = {};

  config.webpackPort = 3001;

  config.middleware = [
    'access',
    'publicProxy', // public资源代理
  ];

  return {
    ...config,
  };
};

module.exports = app => {
  const { router, controller } = app;
  const apiRouter = router.namespace('/api');

  apiRouter.get('/getApiTest', controller.home.index);
  apiRouter.get('/user', controller.user.find);

  apiRouter.post('/register', controller.user.register);
  apiRouter.post('/login', controller.user.login);

  // api router 需要放在此之上
  router.get('/*', controller.spa.home);
};

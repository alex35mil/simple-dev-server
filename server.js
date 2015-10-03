/* eslint no-console: 0 */

import express              from 'express';
import bodyParser           from 'body-parser';
import webpack              from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import devBuildConfig  from './config/build/webpack.dev.config';
import devServerConfig from './config/server/server.dev';

import commentsMiddleware       from './dev/middlewares/comments';
import commentsGetMiddleware    from './dev/middlewares/comments.get';
import commentsCreateMiddleware from './dev/middlewares/comments.create';
import commentsUpdateMiddleware from './dev/middlewares/comments.update';
import commentsDeleteMiddleware from './dev/middlewares/comments.delete';


const server   = express();
const compiler = webpack(devBuildConfig);

server.use(webpackDevMiddleware(compiler, {
  publicPath        : devBuildConfig.output.publicPath,
  hot               : true,
  historyApiFallback: true,
  stats             : {
    colors  : true,
    hash    : false,
    version : false,
    chunks  : false,
    children: false,
  },
}));

server.use(webpackHotMiddleware(compiler));

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.get(...commentsGetMiddleware);
server.post(...commentsCreateMiddleware);
server.patch(...commentsUpdateMiddleware);
server.delete(...commentsDeleteMiddleware);

server.use(...commentsMiddleware);

server.listen(devServerConfig.port, 'localhost', err => {
  if (err) console.log(`=> OMG!!! 🙀 ${err}`);
  console.log(
    `=> 🔥  Webpack dev server is running on port ${devServerConfig.port}`
  );
});

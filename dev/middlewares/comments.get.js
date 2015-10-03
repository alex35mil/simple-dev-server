import sleep from 'sleep';

import commentsStorage from 'dev/storages/comments';
import serverConfig    from 'config/server/server.base';


const url = serverConfig.apiURL('/comments');

const middleware = (req, res) => {
  sleep.usleep(500000);

  const comments = commentsStorage.getComments();

  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ comments }));
};

export default [url, middleware];

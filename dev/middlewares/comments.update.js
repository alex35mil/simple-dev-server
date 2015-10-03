import sleep from 'sleep';

import commentsStorage from 'dev/storages/comments';
import serverConfig    from 'config/server/server.base';


const url = serverConfig.apiURL('/comments/:commentId');

const middleware = (req, res) => {
  sleep.usleep(500000);

  commentsStorage.updateStorage(storage => {

    const commentId = parseInt(req.params.commentId, 10);
    const comment   = storage.findComment(commentId);
    const updates   = req.body;

    for (const attribute of Object.keys(updates)) {
      comment[attribute] = updates[attribute];
    }

    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ comment }));

  });
};

export default [url, middleware];

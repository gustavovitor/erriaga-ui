try {
  const express = require('express');
  const app = express();

  app.use(express.static(__dirname + '/dist/erriaga-ui'));
  app.get('/*', function(req, res) {
    res.sendFile(__dirname + '/dist/erriaga-ui/index.html');
  });
  app.listen(process.env.PORT || 4200);

} catch (e) {
  console.log('Err: ');
  console.error(e);
}

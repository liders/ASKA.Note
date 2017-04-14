var express = require('express'),
  router = express.Router(),
  base64 = require('js-base64'),
  md = require('markdown-it')({
    html: true,
    linkify: true,
    typographer: true
  }).use(require('markdown-it-abbr'))
    .use(require('markdown-it-container'), 'warning')
    .use(require('markdown-it-deflist'))
    .use(require('markdown-it-emoji'))
    .use(require('markdown-it-footnote'))
    .use(require('markdown-it-ins'))
    .use(require('markdown-it-mark'))
    .use(require('markdown-it-sub'))
    .use(require('markdown-it-sup'));
  md.renderer.rules.table_open = function () {
    return '<table class="table table-striped">\n';
  };

module.exports = function (app) {
  app.use('/markdown', router);
};


router.get('/:id', function(req, res, next) {
  console.log("RR");
  try{
    console.log(base64);
    var base = base64.Base64;
    var raw_text = base.decode(req.params.id);
    console.log(raw_text);
    console.log(md.render(raw_text));
    return res.status(200).send(base.encode(md.render(raw_text)));
  } catch(err) {
    console.log(err);
    return res.status(500).send(err);
  }
});

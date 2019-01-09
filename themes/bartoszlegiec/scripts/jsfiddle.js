const pathFn = require('path');
const fs = require('hexo-fs');

const CODE_BLOCK_TEMPLATE_PATH = pathFn.resolve(__dirname, '../script_assets/codeblock.ejs');
const LAYOUT_TEMPLATE_PATH = pathFn.resolve(__dirname, '../script_assets/jsfiddle_layout.ejs');

hexo.extend.tag.register('fiddle', async function(args, body) {
  const { source_dir: sourceDir, config: { code_dir: codeDir } } = hexo;
  const { snippets = '' } = this;

  const argv = args.reduce((obj, prop) => {
    const [key, value] = prop.split("=");
    return {
      ...obj,
      [key]: value
    }
  }, {});

  if (!argv.name) {
    return
  }

  argv.files = (argv.files !== undefined) ? argv.files.split(',') : [];

  const src = pathFn.join(sourceDir, codeDir, snippets, argv.name);

  const fileBlocks = argv.files.map(async (lang) => {
    const code = await fs.readFile(`${src}.${lang.toLowerCase()}`);
  
    const options = {
      code,
      lang,
    };
  
    return {
      code: await hexo.render.render({ path: CODE_BLOCK_TEMPLATE_PATH }, options),
      lang
    };
  });

  return hexo.render.render({ path: LAYOUT_TEMPLATE_PATH }, {
    codes: await Promise.all(fileBlocks),
    fiddle: argv.fiddle,
    resultsBg: argv.resultsBg || '',
    iframeHeight: argv.iframeHeight || '',
  });
}, { async: true});

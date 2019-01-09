(() => {
  const $ = (s, $el = document) => $el.querySelector(s);
  const $$ = (s, $el = document) => Array.from($el.querySelectorAll(s));

  $$('.jsfiddle').forEach($fiddle => {
    const $f = s => $(s, $fiddle);
    const $$f = s => $$(s, $fiddle);

    $btns = $$f('.jsfiddle__header__button[data-code-type]');

    $btns.forEach($btn => {
      const { dataset: { codeType } = {} } = $btn;

      $btn.addEventListener('click', () => {
        $$f('.jsfiddle__code__codes').forEach($code => {
          $code.classList.remove('jsfiddle__code__codes--visible');
        });

        $f(`.jsfiddle__code__codes[data-code-type=${codeType}`)
          .classList
          .add('jsfiddle__code__codes--visible');

        $btns.forEach($headerBtn => {
          $headerBtn.classList.remove('jsfiddle__header__button--current');
        });
        
        $btn.classList.add('jsfiddle__header__button--current');
      });
    })
  });
})();

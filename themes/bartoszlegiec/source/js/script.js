(function() {
  const $ = s => document.querySelector(s);

  const $headerImg = document.querySelector(".article-title-image");

  if ( $headerImg !== null ) {
    const $article = document.querySelector(".article");

    const doc = document.documentElement;
    let last = 0;

    const testForScroll = () => {
      const top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);
      const hasClass = $article.classList.contains("article--scrolled");

      const progress = (top / window.innerHeight) * 2;
      
      if ( last <= 1 ) {
        const vh = Math.min(10, progress * 10);
        $article.style.transform = `translateY(-${vh}vh)`;
      }
      
      if (!hasClass && progress >= 0.5) {
        $article.classList.add("article--scrolled");
      } else if (hasClass && progress < 0.5) {
        $article.classList.remove("article--scrolled");
      }

      last = progress;
    }

    window.addEventListener("scroll", testForScroll);

    testForScroll();
  }

  Prism.hooks.add('complete', function(env) {
    document.querySelectorAll("pre.language-css").forEach(($el) => {
      $el.querySelectorAll(".token.property").forEach($var => {
        if (/--/.test($var.innerHTML)) {
          $var.classList.add("variable");
        }
      });
    });

    document.querySelectorAll("pre.language-javascript, pre.language-jsx").forEach(($el) => {
      $el.querySelectorAll(".token.punctuation").forEach($var => {
        if (/["']/.test($var.innerHTML)) {
          $var.classList.add("quote");
        }
      });
    });
  });

  const setCookie = (name, value, days) => {
    let expires = "";
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 *1000));
      expires = "; expires=" + date.toUTCString();
    }

    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
  }

  if (window.matchMedia('(prefers-color-scheme: dark)')) {
    document.body.classList.add("dark");
    document.body.classList.add("dark-no-anim");
    setCookie("darkmode", "true", 365);
  }

  if (document.cookie.split(';').filter((item) => item.includes('darkmode=true')).length > 0) {
    document.body.classList.add("dark");
  }

  $(".dark-mode-button").addEventListener("click", () => {
    const $body = document.body;
    $body.classList.toggle("dark");

    if ($body.classList.contains("dark")) {
      setCookie("darkmode", "true", 365);
    } else {
      setCookie("darkmode", "true", -1);
    }
  });
})();

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

const isDescendant = (parent, child) => {
  var node = child.parentNode;
  while (node != null) {
      if (node == parent) {
          return true;
      }
      node = node.parentNode;
  }
  return false;
}

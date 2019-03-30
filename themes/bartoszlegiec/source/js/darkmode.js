(() => {
  const setCookie = (name, value, days) => {
    let expires = "";
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 *1000));
      expires = "; expires=" + date.toUTCString();
    }
  
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
  }
  
  const getDarkmodeCookie = () => {
    const cookie = document.cookie.split(';').find((item) => item.includes('darkmode='));
  
    if (!cookie) {
      return "prefers";
    }
  
    return cookie.trim().split("=")[1] === "true" ? "dark" : "light";
  };
  
  if (getDarkmodeCookie() === "dark") {
    document.body.classList.add("dark");
  } else if (getDarkmodeCookie() === "light") {
    document.body.classList.remove("dark");
  } else if (window.matchMedia('(prefers-color-scheme: dark)')) {
    document.body.classList.add("dark");
    setCookie("darkmode", "true", 365);
  }
})();

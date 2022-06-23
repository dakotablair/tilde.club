(() => {
  /* DOM */
  const bodyClass = document.body.classList
  const entry = document.getElementsByTagName("textarea")[0]
  const titleDOM = document.getElementsByTagName("h1")[0]

  /* localStorage management */
  const lsn = "~ddb:" // localStorage namespace
  const getPref = (pref) => localStorage.getItem(lsn + pref)
  const getPrefs = () => ({
    prefForce: getPref("force") === "true",
    prefTheme: getPref("theme") || "dark",
  })

  /* Update the state of the document based on client preferences. */
  const renderPreferences = () => {
    const { prefForce, prefTheme } = getPrefs()
    if(prefForce) {
      bodyClass.add(prefTheme)
    }
  }
  renderPreferences()

  /* Display the title. */
  const setTitle = (title) => {
    if(title) {
      titleDOM.childNodes.forEach(child => child.remove())
      titleDOM.append(document.createTextNode(title))
      document.title = title
    }
  }

  /* Update title based on the document fragment. */
  const hashchangeHandler = () => {
    const here = new URL(window.location.href)
    const title = decodeURI(here.hash.slice(1))
    const updated = setTitle(title)
    entry.value = title
  }

  /* Update the title on page load */
  hashchangeHandler()
  /* and any time the hash changes, eg. when using the back button. */
  addEventListener("hashchange", hashchangeHandler)

  /* Add a way to easily edit the title. */
  const checkKey = (evt) => {
    const code = evt.code
    if(code === "Escape") {
      entry.classList.toggle("hidden")
      const title = entry.value
      setTitle(title)
      if(entry.classList.contains("hidden")) {
        const here = new URL(window.location.href)
        here.hash = `#${encodeURI(title)}`
        history.pushState({}, "", here)
      }
    }
  }
  document.addEventListener("keyup", checkKey)
})()

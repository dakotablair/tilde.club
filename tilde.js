(() => {
  /* DOM */
  const ascii = document.getElementById("pref-ascii");
  const force = document.getElementById("pref-force");
  const themeRadios = document.getElementsByName("pref-theme");
  const bodyClass = document.body.classList;

  /* localStorage management */
  const lsn = "~ddb:"; // localStorage namespace
  const getPref = (pref) => localStorage.getItem(lsn + pref);
  const setPref = (pref, value) => localStorage.setItem(lsn + pref, value);
  const getPrefs = () => ({
    prefASCII: getPref("ascii") === "true",
    prefForce: getPref("force") === "true",
    prefTheme: getPref("theme") || "dark",
  });

  /* Update the state of the document based on client preferences. */
  const renderPreferences = () => {
    const { prefASCII, prefForce, prefTheme } = getPrefs();
    if(prefASCII) {
      bodyClass.add("ascii");
      ascii.checked = "checked";
    }
    if(prefForce) {
      bodyClass.add(prefTheme);
      force.checked = "checked";
    }
    themeRadios.forEach(radio => {
      if(radio.value === prefTheme) {
        radio.checked = true;
      }
    });
  };
  renderPreferences();

  /* ASCII aesthetic intensifies */
  ascii.onchange = (evt) => {
    const { prefASCII } = getPrefs();
    bodyClass.toggle("ascii");
    setPref("ascii", (!prefASCII).toString());
  };

  /* Manage theme forcing behavior */
  const themes = Array.from(themeRadios).map(radio => radio.value);
  force.onchange = () => {
    const { prefForce, prefTheme } = getPrefs();
    const nextForce = !prefForce;
    themes.forEach(theme => bodyClass.remove(theme));
    if (nextForce) {
      bodyClass.add(prefTheme);
    }
    setPref("force", nextForce.toString())
  };

  /* Manage theme selection */
  themeRadios.forEach(radio => radio.onchange = () => {
    const { prefForce } = getPrefs();
    setPref("theme", radio.value);
    if(prefForce) {
      themes.forEach(theme => bodyClass.remove(theme));
      bodyClass.add(radio.value);
    }
  });
})()

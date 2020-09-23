#!/usr/bin/env python

import io
from subprocess import run

import markdown
from jinja2 import Template

def main():
    tidy_exists = run(["which", "-s", "tidy"]).returncode == 0
    with open("readings.md") as readings, open("index.tmpl.html") as tmpl:
        readings_html = markdown.markdown(readings.read())
        template = Template(tmpl.read())
        out = template.render(
            readings=readings_html
        )
    with open("index.html", "w") as outfile:
        outfile.write(out)
    if tidy_exists:
        run((
            """tidy --quiet yes -modify -config tidy.conf index.html"""
        ).split(" "))

if(__name__ == "__main__"):
    main()

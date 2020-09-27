# Dakota's tilde.club

This is the repository for building Dakota's tilde.club page. As of now, the
only build artifact is `index.html`.

## Dependencies

- `python3`
  - Python packages listed in `requirements.txt`

### Optional Dependencies

- [tidy](https://github.com/htacg/tidy-html5/blob/next/README/BUILD.md)

## Installation

1.  Clone the repository and `cd` into the cloned directory.
2.  Make a virtualenv (optional, but highly suggested) and activate it:

```bash
python -m venv .venv
source .venv/bin/activate
```

3.  Install the `python` package dependencies using `pip`:

```bash
python -m pip install -r requirements.txt
```

4.  Run the publish script:

```bash
./publish.py
```

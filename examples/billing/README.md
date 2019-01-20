# Billing Statement
Reporting example that markuped up with Lisp LSX syntax.

```bash
$ pwd
/path/to/menneu/examples/billing

# The source file includes the relative asset paths from package root.
$ cd ../..
$ pwd
/path/to/menneu
$ mkdir debug

$ menneu examples/billing/billing.lsx -d examples/billing/billing.data.lisp -o debug/billing.md.html
$ menneu examples/billing/billing.lsx -d examples/billing/billing.data.lisp -o debug/billing.md.html.pdf
$ menneu examples/billing/billing.lsx -d examples/billing/billing.data.lisp -o debug/billing.md.html.png
$ menneu examples/billing/billing.lsx -d examples/billing/billing.data.lisp -o debug/billing.md.html.jpeg
```

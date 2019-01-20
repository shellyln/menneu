# Markdown Demo
Testing the basic and extended markdown syntaxes.

```bash
$ pwd
/path/to/menneu/examples/markdown-demo

# The source file includes the relative asset paths from package root.
$ cd ../..
$ pwd
/path/to/menneu
$ mkdir debug

$ menneu examples/markdown-demo/markdown-demo.md -d examples/markdown-demo/markdown-demo.data.lisp -o debug/markdown-demo.md.html
$ menneu examples/markdown-demo/markdown-demo.md -d examples/markdown-demo/markdown-demo.data.lisp -o debug/markdown-demo.md.pdf
$ menneu examples/markdown-demo/markdown-demo.md -d examples/markdown-demo/markdown-demo.data.lisp -o debug/markdown-demo.md.png
$ menneu examples/markdown-demo/markdown-demo.md -d examples/markdown-demo/markdown-demo.data.lisp -o debug/markdown-demo.md.jpeg
```

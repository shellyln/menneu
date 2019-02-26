

### 2019-02-26

```bash
npm install shellyln/ascii2mathml#4615e1b6e80f4740fe0ddc848fbfdc695467487f
npm install --save-dev acorn
npm install --save-dev braces

rm -rf node_modules/
rm package-lock.json
npm install

rm -rf node_modules/markdown-it-math/node_modules/ascii2mathml/
rm -rf node_modules/micromatch/node_modules/braces/
npm dedupe

rm -rf node_modules/
npm ci
```



### 2019-02-15

```bash
# vulnerability is found
npm install shellyln/ascii2mathml#fix-dependencies-vulnerability-201902-a
# unexpectedly lost from dependencies by running npm dedupe
npm install --save-dev acorn
# vulnerability is found
npm install --save-dev braces

rm -rf node_modules/
rm package-lock.json
npm install

rm -rf node_modules/markdown-it-math/node_modules/
rm -rf node_modules/micromatch/node_modules/braces/
npm dedupe

rm -rf node_modules/
npm ci
```


// Copyright (c) 2018, Shellyl_N and Authors
// license: ISC
// https://github.com/shellyln


import { default as isNode }   from '../lib/is-node';



// tslint:disable-next-line:no-eval
export default isNode ? eval('require') : () => void 0;

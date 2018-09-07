

import { existsSync,
         readFile,
         writeFile,
         mkdirSync } from 'fs';
import { promisify } from 'util';
import { render }    from '../lib/render';



describe("foo", function() {
    it("foo", function(done) {
        (async () => {
            try {
                if (!existsSync('./debug')) {
                    mkdirSync('./debug');
                }
                const src = await promisify(readFile)('./examples/html-demo/html-demo.html', { encoding: 'utf8' });
                const buf = await render(src, [3, 5, 7], {
                    inputFormat: 'html',
                    outputFormat: 'html',
                    dataFormat: 'object',
                });
                await promisify(writeFile)('./debug/debug.html', buf);
                expect(1).toEqual(1);
                done();
            } catch (e) {
                expect(e).toEqual(1);
                done();
            }
        })();
    });
});

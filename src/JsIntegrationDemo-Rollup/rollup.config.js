// rollup.config.js
import typescript from '@rollup/plugin-typescript';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

const minify = process.env.BUILD === 'production';

export default [{
    input: 'wwwroot/app/dashboard-module.ts',
    output: {
        dir: 'wwwroot',
        format: 'es',
        sourcemap: !minify
    },
    plugins: [
        typescript(),

        resolve({ browser: true }),
        commonjs(),

        minify && terser({
            ecma: 6,
            compress: true,
            output: {
                beautify: !minify
            }
        })
    ] 
}];
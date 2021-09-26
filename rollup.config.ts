import { defineConfig } from 'rollup';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';

export default defineConfig({
    input: 'src/index.ts',
    output: {
        file: 'assets/bundle.js',
        format: 'iife',
        sourcemap: true
    },
    plugins: [
        typescript({
            tsconfig: 'tsconfig.json',
            sourceMap: true
        }),
        terser()
    ]
});
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import terser from "@rollup/plugin-terser";

export default {
  input: "src/index.js",
  output: [
    {
      file: "dist/index.esm.js",
      format: "es",
    },
    {
      file: "dist/index.cjs.js",
      format: "cjs",
    },
    {
      file: "dist/index.umd.js",
      format: "umd",
      name: 'StringMultipleReplace'
    }
  ],
  plugins: [
    nodeResolve(),
    commonjs(),
    terser()
  ],
};

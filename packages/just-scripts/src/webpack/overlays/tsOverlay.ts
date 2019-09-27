import ts from 'typescript';
import { tryRequire } from '../../tryRequire';

const ForkTsCheckerPlugin = tryRequire('fork-ts-checker-webpack-plugin');

interface LoaderOptions {
  configFile: string;
  transpileOnly: boolean;
  onlyCompileBundledFiles: boolean;
  colors: boolean;
  compilerOptions: ts.CompilerOptions;
  happyPackMode: boolean;
  getCustomTransformers: string | ((program: ts.Program) => ts.CustomTransformers | undefined);
  experimentalWatchApi: boolean;
  allowTsInNodeModules: boolean;
  experimentalFileCaching: boolean;
  projectReferences: boolean;
}

interface CheckerOptions {
  typescript: string;
  tsconfig: string;
  compilerOptions: object;
  tslint: string | true | undefined;
  tslintAutoFix: boolean;
  eslint: true | undefined;
  /** Options to supply to eslint https://eslint.org/docs/1.0.0/developer-guide/nodejs-api#cliengine */
  eslintOptions: object;
  watch: string | string[];
  async: boolean;
  ignoreDiagnostics: number[];
  ignoreLints: string[];
  ignoreLintWarnings: boolean;
  reportFiles: string[];
  colors: boolean;
  silent: boolean;
  checkSyntacticErrors: boolean;
  memoryLimit: number;
  workers: number;
  vue: boolean;
  useTypescriptIncrementalApi: boolean;
  measureCompilationTime: boolean;
  resolveModuleNameModule: string;
  resolveTypeReferenceDirectiveModule: string;
}

interface TsOverlayOptions {
  loaderOptions?: Partial<LoaderOptions>;
  checkerOptions?: Partial<CheckerOptions>;
}

export const tsOverlay = (overlayOptions?: TsOverlayOptions) => {
  overlayOptions = overlayOptions || {};

  overlayOptions.loaderOptions = overlayOptions.loaderOptions || {
    transpileOnly: true
  };

  overlayOptions.checkerOptions = overlayOptions.loaderOptions || {
    transpileOnly: true
  };

  return {
    resolve: {
      extensions: ['.wasm', '.mjs', '.js', '.ts', '.tsx', '.json']
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: {
            loader: 'ts-loader',
            options: overlayOptions.loaderOptions
          },
          exclude: /node_modules/
        }
      ]
    },
    plugins: [...(ForkTsCheckerPlugin ? [new ForkTsCheckerPlugin(overlayOptions.checkerOptions)] : [])]
  };
};

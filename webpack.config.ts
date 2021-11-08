import * as path from 'path';
import * as webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import StatoscopePlugin from '@statoscope/webpack-plugin';

import FindUnusedFiles from './plugins/findUnused';

const config: webpack.Configuration = {
    mode: 'production',
    entry: {
        root: path.resolve(__dirname, 'src', 'pages', 'root.tsx'),
        root2: path.resolve(__dirname, 'src', 'pages', 'root2.tsx'),
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js',
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src', 'index.html'),
        }),
        new FindUnusedFiles('src/**'),
        new StatoscopePlugin({
            saveStatsTo: 'stats.json',
            saveOnlyStats: false,
            open: false,
        }),
    ],
    resolve: {
        alias: {
            'bn.js': false,
            'crypto-browserify': path.resolve(__dirname, 'cb-uuid.ts'),
        },
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },

    module: {
        rules: [
            {
                test: /\.(tsx|ts)$/,
                exclude: /node_modules/,
                loader: 'ts-loader',
            },
        ],
    },
};

export default config;
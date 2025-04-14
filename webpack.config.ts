import path from 'path'
import { fileURLToPath } from 'url'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import webpack from 'webpack'
import 'webpack-dev-server'
// import Dotenv from 'dotenv-webpack'
// import CopyPlugin from 'copy-webpack-plugin'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

type Mode = 'production' | 'development'

interface EnvVariables {
	mode: Mode
	port: number
}

export default (env: EnvVariables) => {
	
	//const isDev = env.mode === 'development';
	
	const isDev = env.mode ? env.mode === 'development' : true
	
	const config: webpack.Configuration = {
		mode: isDev ? 'development' : 'production',
		entry: path.resolve(__dirname, 'src', 'index.tsx'), // Точка входа проекта,
		devtool: isDev && 'inline-source-map',
		devServer: isDev ? {
			static: {
				directory: path.join(__dirname, 'public'),
			},
			compress: true,
			port: env.port ?? 3000,
			historyApiFallback: true,
			hot: true
		}:undefined,
		module: {
			rules: [
				//лоудеры по порядку воздействуют на код, преобразуя его
				//ts-loader умеет работать с JSX
				{
					test: /\.s[ac]ss$/i,
					use: [
						// Creates `style` nodes from JS strings
						"style-loader",
						// Translates CSS into CommonJS
						"css-loader"
					],
				},
				{
					test: /\.(ts|tsx)$/,
					use: 'ts-loader',
					exclude: /node_modules/,
				},
				{
					test: /\.(png|jpg|jpeg|gif)$/i,
					type: 'asset/resource',
					generator: {
						filename: 'public/assets/img/[name].[hash][ext]',
					}
				},
				{
					test: /\.svg$/,
					use: [
						{
							loader: '@svgr/webpack',
							options: {
								icon: true,
							}
						}], // Используем SVGR для импорта SVG как React-компонентов
				  },
			],
		},
		resolve: {
			extensions: ['.tsx', '.ts', '.js'],
		},
		output: {
			path: path.resolve(__dirname, 'dist'), // Директория, в которую будет собираться проект
			filename: 'bundle.[contenthash].js',
			clean: true, // Очищает старые файлы при повторной сборке проекта
		},

		// Подключение плагинов, в параметр-массив передаются экземпляры объектов
		plugins: [
			new webpack.DefinePlugin({
				'process.env.IS_DEV':isDev,
			}),
			new HtmlWebpackPlugin({
				template: path.resolve(__dirname, 'public', 'index.html'),
			}),
			// new CopyPlugin({
			// 	patterns: [
			// 	  {
			// 		from: path.resolve(__dirname, 'public', 'assets'),
			// 		to: path.resolve(__dirname, 'dist', 'assets'),
			// 	  },
			// 	],
			//   }),
		].filter(Boolean),
		
	}

	return config
}

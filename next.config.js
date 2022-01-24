const isProd = process.env.NODE_ENV === 'production';

module.exports = {
	basePath: '/music-events',
	reactStrictMode: true,
	images: {
		domains: ['res.cloudinary.com'],
	},
	assetPrefix: '/music-events',
	async rewrites() {
		return [
			{
				source: '/api/upload',
				destination: 'http://192.168.1.9:1337/upload',
			},
			{
				source: '/api/events/:id',
				destination: 'http://192.168.1.9:1337/events/:id',
			},
		];
	},
};

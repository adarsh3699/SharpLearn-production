// Hardcoded configuration (no env variables)
const JWT_SECRET = 'sharplearn_jwt_secret_key_2024';
const PORT = 4000;

const CORS_ORIGINS = [
	'http://localhost:3000',
	'http://localhost:3001',
	'https://sharplearn.bhemu.me',
	'https://www.sharplearn.tech',
];

module.exports = {
	JWT_SECRET,
	PORT,
	CORS_ORIGINS,
};

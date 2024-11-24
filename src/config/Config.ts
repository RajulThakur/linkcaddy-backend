export const BASE_URL: string = '/api/v1';
export const corsOptions = {
  origin: [
    'http://localhost:5173',
    'https://brainly-100x.vercel.app',
    'https://brainly-100x.netlify.app',
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['set-cookie'],
};

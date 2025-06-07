import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET;
const JWT_EXPIRES_IN = '24h';

export interface JWTPayload {
  verified: boolean;
  phone?: string;
  role?: string;
  iat?: number;
  exp?: number;
}

export class JWTError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'JWTError';
  }
}

export function generateToken(payload: Omit<JWTPayload, 'iat' | 'exp'>): string {
  if (!JWT_SECRET) {
    throw new JWTError('JWT_SECRET is not configured');
  }

  try {
    return jwt.sign(payload, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });
  } catch (error) {
    console.error('JWT Sign Error:', error);
    throw new JWTError('Failed to generate token');
  }
}

export function verifyToken(token: string): JWTPayload {
  if (!JWT_SECRET) {
    throw new JWTError('JWT_SECRET is not configured');
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
    return decoded;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new JWTError('Token has expired');
    }
    if (error instanceof jwt.JsonWebTokenError) {
      throw new JWTError('Invalid token');
    }
    console.error('JWT Verify Error:', error);
    throw new JWTError('Failed to verify token');
  }
}

export function isTokenValid(token: string): boolean {
  try {
    verifyToken(token);
    return true;
  } catch {
    return false;
  }
} 
import request from 'supertest';
import express, { Request, Response } from 'express';
import router from '../routes/user';
import MySQL from '../../databases/mysql';

jest.mock('../../databases/mysql');

const app = express();
app.use(express.json());
app.use('/users', router);

describe('GET /users', () => {
  it('should return all users', async () => {
    const mockUsers = [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }];
    (MySQL.executeQuery as jest.Mock).mockImplementationOnce(
      (_: string, callback: (err: string | null, users: Object[]) => void) => {
      callback(null, mockUsers);
    });

    const response = await request(app).get('/users');
    expect(response.status).toBe(200);
    expect(response.body.ok).toBe(true);
    expect(response.body.users).toEqual(mockUsers);
  });

  it('should handle database errors', async () => {
    const errorMessage = 'Database error';
    (MySQL.executeQuery as jest.Mock).mockImplementationOnce(
      (_: string, callback: (err: string | null, users: Object[]) => void) => {
      callback(errorMessage, []);
    });

    const response = await request(app).get('/users');
    expect(response.status).toBe(400);
    expect(response.body.ok).toBe(false);
    expect(response.body.error).toBe(errorMessage);
  });
});

describe('GET /users/search/:id', () => {
  it('should return a user by id', async () => {
    const mockUser = [{ id: 1, name: 'John' }];
    const userId = 1;
    (MySQL.executeQuery as jest.Mock).mockImplementationOnce(
      (_: string, callback: (err: string | null, users: Object[]) => void) => {
      callback(null, mockUser);
    });

    const response = await request(app).get(`/users/search/${userId}`);
    expect(response.status).toBe(200);
    expect(response.body.ok).toBe(true);
    expect(response.body.user).toEqual(mockUser[0]);
  });

  it('should handle database errors', async () => {
    const errorMessage = 'Database error';
    const userId = 1;
    (MySQL.executeQuery as jest.Mock).mockImplementationOnce(
      (_: string, callback: (err: string | null, users: Object[]) => void) => {
      callback(errorMessage, []);
    });

    const response = await request(app).get(`/users/search/${userId}`);
    expect(response.status).toBe(400);
    expect(response.body.ok).toBe(false);
    expect(response.body.error).toBe(errorMessage);
  });
});

describe('GET /users/search', () => {
  it('should return users by email prefix', async () => {
    const emailPrefix = 'joh';
    const mockUsers = [{ id: 1, name: 'John', email: 'john@example.com' }, { id: 2, name: 'Johnny', email: 'johnny@example.com' }];
    (MySQL.executeQuery as jest.Mock).mockImplementationOnce(
      (_: string, callback: (err: string | null, users: Object[]) => void) => {
      callback(null, mockUsers);
    });

    const response = await request(app).get('/users/search').query({ emailPrefix });
    expect(response.status).toBe(200);
    expect(response.body.ok).toBe(true);
    expect(response.body.users).toEqual(mockUsers);
  });

  it('should handle missing emailPrefix', async () => {
    const response = await request(app).get('/users/search');
    expect(response.status).toBe(400);
    expect(response.body.ok).toBe(false);
    expect(response.body.error).toBe('Email prefix is required');
  });

  it('should handle database errors', async () => {
    const errorMessage = 'Database error';
    const emailPrefix = 'joh';
    (MySQL.executeQuery as jest.Mock).mockImplementationOnce(
      (_: string, callback: (err: string | null, users: Object[]) => void) => {
      callback(errorMessage, []);
    });

    const response = await request(app).get('/users/search').query({ emailPrefix });
    expect(response.status).toBe(400);
    expect(response.body.ok).toBe(false);
    expect(response.body.error).toBe(errorMessage);
  });
});

import request from 'supertest';
import express from 'express';
import router from '../routes/pet';
import Pet from '../../models/pet';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/pets', router);

jest.mock('../../models/pet');

describe('GET /pets', () => {
  it('should return all pets', async () => {
    const mockPets = [{ name: 'Rex' }, { name: 'Fido' }];
    Pet.find = jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue(mockPets),
    });

    const response = await request(app).get('/pets');
    expect(response.status).toBe(200);
    expect(response.body.ok).toBe(true);
    expect(response.body.pets).toEqual(mockPets);
  });

  it('should handle errors', async () => {
    Pet.find = jest.fn().mockReturnValue({
      exec: jest.fn().mockRejectedValue('Something went wrong'),
    });

    const response = await request(app).get('/pets');
    expect(response.status).toBe(400);
    expect(response.body.ok).toBe(false);
    expect(response.body.error).toBe('Something went wrong');
  });
});

describe('GET /pets/search/:owner', () => {
    it('should return pets by owner', async () => {
      const owner = 'Pepe Paco';
      const mockPets = [{ name: 'Rex', owner }, { name: 'Fido', owner }];
      Pet.find = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockPets),
      });
  
      const response = await request(app).get(`/pets/search/${owner}`);
      expect(response.status).toBe(200);
      expect(response.body.ok).toBe(true);
      expect(response.body.pets).toEqual(mockPets);
    });
  
    it('should handle errors', async () => {
      const owner = 'Pepe Paco';
      const errorMessage = 'Something went wrong';
      Pet.find = jest.fn().mockReturnValue({
        exec: jest.fn().mockRejectedValue(errorMessage),
      });
  
      const response = await request(app).get(`/pets/search/${owner}`);
      expect(response.status).toBe(400);
      expect(response.body.ok).toBe(false);
      expect(response.body.error).toBe(errorMessage);
    });
  });

  describe('GET /pets/search', () => {
    it('should return pets by name prefix', async () => {
      const namePrefix = 'Re';
      const mockPets = [{ name: 'Rex' }, { name: 'Remy' }];
      const regex = new RegExp(namePrefix, 'i');
      Pet.find = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockPets),
      });
  
      const response = await request(app).get(`/pets/search`).query({ namePrefix });
      expect(response.status).toBe(200);
      expect(response.body.ok).toBe(true);
      expect(response.body.pets).toEqual(mockPets);
    });
  
    it('should return an error if namePrefix is not provided', async () => {
      const response = await request(app).get(`/pets/search`);
      expect(response.status).toBe(400);
      expect(response.body.ok).toBe(false);
      expect(response.body.error).toBe('Pet name prefix is required');
    });
  
    it('should handle errors', async () => {
      const namePrefix = 'Re';
      const errorMessage = 'Something went wrong';
      Pet.find = jest.fn().mockReturnValue({
        exec: jest.fn().mockRejectedValue(errorMessage),
      });
  
      const response = await request(app).get(`/pets/search`).query({ namePrefix });
      expect(response.status).toBe(400);
      expect(response.body.ok).toBe(false);
      expect(response.body.error).toBe(errorMessage);
    });
  });
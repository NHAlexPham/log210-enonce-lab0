// Vous devez insérer les nouveaux tests ici
import { assert } from 'console';
import 'jest-extended';
import request from 'supertest';
import app from '../../src/app';
import 'jest-extended';

describe('GET /api/v1/jeu/redemarrerJeu', () => {
  it('devrait répondre avec un statut 200', async () => {
    const response = await request(app).get('/api/v1/jeu/redemarrerJeu');
    expect(response.status).toBe(200);
  });

  it('devrait contenir un message de confirmation dans la réponse', async () => {
    const response = await request(app).get('/api/v1/jeu/redemarrerJeu');
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toMatch(/redémarrage/i);
  });

  it('devrait réinitialiser les joueurs (si applicable)', async () => {
    const response = await request(app).get('/api/v1/jeu/redemarrerJeu');
    expect(response.body.joueurs).toBeArray();
    expect(response.body.joueurs).toBeEmpty();
  });
});

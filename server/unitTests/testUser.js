import request from 'supertest';
import app from '../index.js'; // Importez l'application Express
import { expect } from 'chai';

describe('Recuperation des utilisateurs', () => {
  it('Si OK, devrait retourner un status 200', (done) => {
    request(app)
      .get('/user')
      .end((err, res) => {
        if (err) return done(err);
        expect(res.statusCode).to.equal(200);
        done();
      });
  });
  it('Si WRONG, devrait retourner un status 500', (done) => {
    request(app)
      .get('/user')
      .end((err, res) => {
        if (err) return done(err)
        expect(res.statusCode).to.equal(500)
        done();
      });
  });
});

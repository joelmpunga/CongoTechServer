// test/routes.test.js
import request from 'supertest'
import Index from '../index.js'
const app = new Index()

describe('Test des utilisateurs', () => {
  it('devrait retourner un tableau d\'objet', (done) => {
    request(app)
      .get('/user')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.text).to.equal([]);
        done();
      });
  });
});

const request = require('supertest')
const app = require('../app'); // Importe a instância do seu servidor Express

describe('API /produtos - Integração', () => {
  describe('POST /produtos', () => {
    test('Deve retornar 201 e o produto criado', async () => {
      const res = await request(app)
        .post('/produtos')
        .send({ nome: 'Coxinha', preco: 5.0 });

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('id');
      expect(res.body.nome).toBe('Coxinha');
    });
  });

  describe('DELETE /produtos/:id', () => {
    test('Deve retornar 204 ao remover produto', async () => {
      const postRes = await request(app)
        .post('/produtos')
        .send({ nome: 'Pastel', preco: 6.0 });

      const res = await request(app).delete(`/produtos/${postRes.body.id}`);
      expect(res.status).toBe(204);
    });
  });
});
const app = require('../app');
const request = require('supertest');

describe('DELETE /dishes', () => {
  it('should delete a dish by name', async () => {
    // Send a DELETE request to the endpoint
    const response = await request(app)
      .delete('/dishes')
      .send({ Name: 'Melktert' });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Dish deleted successfully' });
  });

  it('should return an error if dish name is not provided', async () => {
    // Send a DELETE request without providing the dish name
    const response = await request(app)
      .delete('/dishes')
      .send({});
      
    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('error');
  });
});
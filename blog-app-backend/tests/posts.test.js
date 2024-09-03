const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');
require('dotenv').config();

beforeAll(async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
});

afterAll(async () => {
  await mongoose.connection.close(); // Ensure MongoDB connection is closed
});

describe('API Endpoint Tests', () => {
  test('GET /posts - should return all posts', async () => {
    const response = await request(app).get('/posts');
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  }, 10000);

  test('GET /posts/:id - should return a single post', async () => {
    const newPost = await request(app)
      .post('/posts')
      .send({ title: 'Test Post', content: 'Content for testing', author: 'Tester' });
    const response = await request(app).get(`/posts/${newPost.body._id}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('_id', newPost.body._id);
  }, 10000);

  test('POST /posts - should create a new post', async () => {
    const newPost = { title: 'New Test Post', content: 'Test content', author: 'Test Author' };
    const response = await request(app).post('/posts').send(newPost);
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('_id');
    expect(response.body).toHaveProperty('title', 'New Test Post');
  }, 10000);

  test('PUT /posts/:id - should update an existing post', async () => {
    const newPost = await request(app)
      .post('/posts')
      .send({ title: 'Update Test Post', content: 'Initial content', author: 'Test Author' });

    const updatedPost = { title: 'Updated Post', content: 'Updated content' };
    const response = await request(app).put(`/posts/${newPost.body._id}`).send(updatedPost);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('title', 'Updated Post');
  }, 10000);

  test('DELETE /posts/:id - should delete a post', async () => {
    const newPost = await request(app)
      .post('/posts')
      .send({ title: 'Delete Test Post', content: 'Content for deletion', author: 'Test Author' });

    const response = await request(app).delete(`/posts/${newPost.body._id}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'Post deleted');
  }, 10000);
});

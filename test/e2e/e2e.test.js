const request = require('supertest');
const app = require('../../index'); 
const jwt = require('jsonwebtoken'); // Import JWT library

// Mock authenticated user
const mockUser = {
  id: 1,
  username: 'Bret'
};

const mockToken = jwt.sign({username: mockUser.username, id: mockUser.id}, 'secret_key', { expiresIn: '1h' }); // Replace 'secret_key' with your actual JWT secret key

describe('DELETE /posts/:postId/comments/:commentId', () => {
  it('should delete a comment associated with a post with valid authentication', async () => {
    // Replace postId and commentId with valid IDs in your database
    const postId = 1;
    const commentId = 5;

    // Send a DELETE request with the authentication token included
    const response = await request(app)
      .delete(`/posts/${postId}/comments/${commentId}`)
      .set('Authorization', `Bearer ${mockToken}`);

    expect(response.status).toBe(200);
    // Add additional assertions if needed
  });

  it('should return 401 for an unauthenticated request', async () => {
    // Replace postId and commentId with valid IDs in your database
    const postId = 12;
    const commentId = 6;

    // Send a DELETE request without authentication headers
    const response = await request(app)
      .delete(`/posts/${postId}/comments/${commentId}`);

    expect(response.status).toBe(401);
  });

  it('should return 404 for deleting a non-existent comment', async () => {
    // Replace postId and commentId with valid post ID and a non-existent comment ID
    const postId = 1;
    const commentId = 1000; // Non-existent comment ID
  
    const response = await request(app)
      .delete(`/posts/${postId}/comments/${commentId}`)
      .set('Authorization', `Bearer ${mockToken}`);
  
    expect(response.status).toBe(404);
  });

});


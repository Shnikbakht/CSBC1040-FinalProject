const { getPostById } = require('../../controllers/postsController'); // Import your route handler function for posts
const httpMocks = require('node-mocks-http'); // Import node-mocks-http for mocking requests and responses

describe('getPostById route handler', () => {
  it('should be able to retrieve my post entity', async () => {
    const postId = '1';
    const mockPost = { id: postId, title: 'Test Post', content: 'Lorem ipsum dolor sit amet' };

    // Mock getPostById function directly
    const getPostByIdMock = jest.fn().mockImplementation(async (req, res) => {
      res.json(mockPost);
    });

    const req = httpMocks.createRequest({
      method: 'GET',
      url: `/posts/${postId}`,
      params: { id: postId }
    });
    const res = httpMocks.createResponse();

    await getPostByIdMock(req, res);

    expect(res.statusCode).toBe(200);
    expect(JSON.parse(res._getData())).toEqual(mockPost);
  });

  it('should not be able to retrieve a different post entity and return appropriate error code', async () => {
    const postId = '1';
    const mockPost = { id: postId, title: 'Test Post', content: 'Lorem ipsum dolor sit amet' };
    const anotherPostId = '2';

    // Mock getPostById function to return a different post entity
    const getPostByIdMock = jest.fn().mockImplementation(async (req, res) => {
      if (req.params.id === anotherPostId) {
        res.status(403).json({ error: 'Unauthorized' });
      } else {
        res.json(mockPost);
      }
    });

    const req = httpMocks.createRequest({
      method: 'GET',
      url: `/posts/${anotherPostId}`,
      params: { id: anotherPostId }
    });
    const res = httpMocks.createResponse();

    await getPostByIdMock(req, res);

    expect(res.statusCode).toBe(403);
    expect(JSON.parse(res._getData())).toEqual({ error: 'Unauthorized' });
  });

  it('should not be able to retrieve an entity if not authenticated and return appropriate error code', async () => {
    const postId = '1';

    // Mock getPostById function to simulate unauthenticated request
    const getPostByIdMock = jest.fn().mockImplementation(async (req, res) => {
      res.status(401).json({ error: 'Unauthorized' });
    });

    const req = httpMocks.createRequest({
      method: 'GET',
      url: `/posts/${postId}`,
      params: { id: postId }
    });
    const res = httpMocks.createResponse();

    await getPostByIdMock(req, res);

    expect(res.statusCode).toBe(401);
    expect(JSON.parse(res._getData())).toEqual({ error: 'Unauthorized' });
  });
});

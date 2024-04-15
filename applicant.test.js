const request = require('supertest');
const { default: Server } = require('./dist/index');
const dotenv =require('dotenv');

dotenv.config();
let app; // Declare server variable to hold the instance of the server

beforeAll(() => {
  app = Server().listen(4200); // Start the server before running tests
});

afterAll((done) => {
  app.close(done); // Close the server after all tests are done
});

describe('GET /awesome/applicant', () => {
  it('should return my information', async () => {
    const response = await request(app).get('/awesome/applicant');
    console.log("response : ",response.body,response.status);
    expect(response.status).toBe(200);
  });
});

describe('POST /awesome/applicant', () => {
  it('should create a new applicant', async () => {
    const userData = {
      username: 'testuser1234',
      email: 'testuser1234@example.com',
      age: 25,
      lp: 'linkedin_profile',
      gp: 'github_profile'
    };
    const response = await request(app)
      .post('/awesome/applicant')
      .send(userData);

    expect(response.status).toBe(200);
  });
});

describe('GET /awesome/applicant/:applicantId', () => {
  it('should return applicant by ID', async () => {
    const userId = 2;
    const response = await request(app).get(`/awesome/applicant/${userId}`);
    expect(response.status).toBe(200);
  });
});

describe('PUT /awesome/applicant/:applicantId', () => {
  it('should update applicant information by ID', async () => {
    const userId = 2;
    const updatedUserData = {
      username: 'updatedtestusername1',
      email: 'updatedtestemail1@example.com'
    };
    const response = await request(app)
      .put(`/awesome/applicant/${userId}`)
      .send(updatedUserData);

    expect(response.status).toBe(200);
  });
});

describe('DELETE /awesome/applicant/:applicantId', () => {
  it('should delete applicant by ID', async () => {
    const userId = 2;
    const response = await request(app).delete(`/awesome/applicant/${userId}`);
    expect(response.status).toBe(200);
  });
});

describe('GET /awesome/all-applicants', () => {
  it('should return all applicants', async () => {
    const response = await request(app).get('/awesome/all-applicants');
    expect(response.status).toBe(200);
  });
});

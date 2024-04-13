const request = require('supertest');
const app = require('./index'); // Assuming your Express app is exported from 'app.js'




describe('GET /awesome/applicant', () => {
  it('should return my information', async () => {
    const response = await request(app).get('/awesome/applicant');
    console.log("response : ",response.body)
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('MyInfo');
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
      console.log("response : ",response.body)

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message') ||
    (response.body.message && response.body.message.insertedData && expect(response.body.message.insertedData).toHaveProperty('id'));
    
  });

});

describe('GET /awesome/applicant/:applicantId', () => {
  it('should return applicant by ID', async () => {
    // Assuming there is a user with ID 1 in the database
    const userId = 1;
    const response = await request(app).get(`/awesome/applicant/${userId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('username');
  });
});

describe('PUT /awesome/applicant/:applicantId', () => {
  it('should update applicant information by ID', async () => {
    const userId = 2; // Assuming there is a user with ID 2 in the database
    const updatedUserData = {
      username: 'updatedtestusername',
      email: 'updatedtestemail@example.com'
    };
    const response = await request(app)
      .put(`/awesome/applicant/${userId}`)
      .send(updatedUserData);
      console.log("response : ",response.body)

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('username', updatedUserData.username);
  });
});

describe('DELETE /awesome/applicant/:applicantId', () => {
  it('should delete applicant by ID', async () => {
    const userId = 1; // Assuming there is a user with ID 1 in the database
    const response = await request(app).delete(`/awesome/applicant/${userId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'User deleted successfully');
  });
});

describe('GET /awesome/all-applicants', () => {
  it('should return all applicants', async () => {
    const response = await request(app).get('/awesome/all-applicants');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
});

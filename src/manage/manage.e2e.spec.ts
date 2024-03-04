import request from 'supertest'

const url = 'http://localhost:3333'

describe('ManageController', () => {

 
  it('should be defined', async() => {
    const res = await request(url)
      .get('/manages')

    console.log(res.body)
  });
});

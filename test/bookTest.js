const chai = require('chai');
const chaiHttp = require('chai-http');
const index = require('../index');
const faker = require('faker');

chai.use(chaiHttp);
const data = require('./bookData.json');
chai.should();

const delId = {
  bookId:""
}

describe('create book api', () => {
  it('givenValidBookAndValidTokenShouldReturn201StatusCode', (done) => {
    const token = data.validToken;
    const newBook = {
      author: faker.lorem.word(),
      price: 350, 
      title: faker.lorem.word(),
      description: faker.lorem.sentence()
    };
    chai
      .request(index)
      .post('/createBook')
      .set({ authorization: token })
      .send(newBook)
      .end((err, res) => {
        res.should.have.status(201);
        delId.bookId = res.body.data._id;
        done();
      });
  });

  it('givenValidBookAndInvalidTokenShouldReturn401StatusCode', (done) => {
    const token = data.invalidToken;
    const newBook = {
      author: faker.lorem.word(),
      price: 350, 
      title: faker.lorem.word(),
      description: faker.lorem.sentence()
    };
    chai
      .request(index)
      .post('/createBook')
      .set({ authorization: token })
      .send(newBook)
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });

  it('givenInvalidBookAndValidTokenShouldReturn422StatusCode', (done) => {
    const token = data.validToken;
    const newBook = {
      author: faker.lorem.word(),
      title: faker.lorem.word(),
      description: faker.lorem.sentence()
    };
    chai
      .request(index)
      .post('/createBook')
      .set({ authorization: token })
      .send(newBook)
      .end((err, res) => {
        res.should.have.status(422);
        done();
      });
  });
});

//get book test cases

describe('get book api', () => {
  it('givenInvalidTokenShouldReturn400StatusCode', (done) => {
    const token = data.invalidToken;
    chai
      .request(index)
      .get('/getBooks')
      .set({ authorization: token })
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });

  it('givenValidTokenShouldReturn200StatusCode', (done) => {
    const token = data.validToken;
    chai
      .request(index)
      .get('/getBooks')
      .set({ authorization: token })
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});

// update book test cases
describe('Update boook api', () => {
  it('givenPoperDetails_ShouldUpdateBook', (done) => {
    const token = data.validToken;
    const updated = data.book.updatedBook;
    chai
      .request(index)
      .put(`/updateBook/${delId.bookId}`)
      .set({ authorization: token })
      .send(updated)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it('givenInvalidToken_ShouldNotUpdateNote', (done) => {
    const token = data.invalidToken;
    const updated = data.book.updatedBook;
    chai
      .request(index)
      .put('/updateBook/618e9c61456d88465b6e5755')
      .set({ authorization: token })
      .send(updated)
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
});

// delete book test cases
describe('delete book api', () => {
  it('givenImPoperDetails_ShouldNotDeleteBook', (done) => {
    const token = data.validToken;
    chai
      .request(index)
      .delete(`/deleteBook/${delId.bookId}`)
      .set({ authorization: token })
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it('givenInvalidToken_ShouldNotDeleteBook', (done) => {
    const token = data.invalidToken;
    chai
      .request(index)
      .delete(`/deleteBook/${delId.bookId}`)
      .set({ authorization: token })
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
});
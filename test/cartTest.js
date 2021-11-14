const chai = require('chai');
const chaiHttp = require('chai-http');
const index = require('../index');
const faker = require('faker');

chai.use(chaiHttp);
const data = require('./bookData.json');
chai.should();

describe('add_to_cart api', () => {
    it('givenValidBook_ValidTokenAndQuantityShouldReturn201StatusCode', (done) => {
      const token = data.validToken;
      const qty = {
        "qty": 2
      } ;
      chai
        .request(index)
        .put(`/addToCart/${'617be4096f77b625b8296b30'}`)
        .set({ authorization: token })
        .send(qty)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property("message").eql("Book Pushed");
          done();
        });
    });

    it('givenValidBook_ValidTokenAndNegativeQuantityShouldReturn201StatusCode_AndMessage(Quantity updated)', (done) => {
        const token = data.validToken;
        const qty = {
          "qty": -1
        } ;
        chai
          .request(index)
          .put(`/addToCart/${'617be4096f77b625b8296b30'}`)
          .set({ authorization: token })
          .send(qty)
          .end((err, res) => {
            res.should.have.status(201);
            res.body.should.have.property("message").eql("Quantity updated");
            done();
          });
      });

    it('givenValidBook_ValidTokenAndNegativeQuantityShouldReturn201StatusCode', (done) => {
        const token = data.validToken;
        const qty = {
          "qty": -1
        } ;
        chai
          .request(index)
          .put(`/addToCart/${'617be4096f77b625b8296b30'}`)
          .set({ authorization: token })
          .send(qty)
          .end((err, res) => {
            res.should.have.status(201);
            res.body.should.have.property("message").eql("Book removed from cart");
            done();
          });
    });
});

describe('cartValue api', () => {
    it('givenValidTokenShouldReturn201StatusCode', (done) => {
      const token = data.validToken;
      chai
        .request(index)
        .get('/cartValue')
        .set({ authorization: token })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property("message").eql("Total value");
          done();
        });
    });

    it('givenInvalidTokenShouldReturn201StatusCode', (done) => {
        const token = data.invalidToken;
        chai
          .request(index)
          .get('/cartValue')
          .set({ authorization: token })
          .end((err, res) => {
            res.should.have.status(401);
            res.body.should.have.property("message").eql("Unauthorized Token or token expired");
            done();
          });
      });
});
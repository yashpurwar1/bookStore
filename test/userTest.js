const chai = require('chai');
const chaiHttp = require('chai-http');
const index = require('../index');
const faker = require('faker');

chai.use(chaiHttp);
const data = require('./data.json');

chai.should();

describe('registartion', () => {

    it('givenRegistrationDetailsWhenIncorrectShouldReturn201Status', (done) => {
    const registartionDetails = data.registration.correctRegister;
    registartionDetails.email = faker.internet.email();
    
    chai
      .request(index)
      .post('/user/registration')
      .send(registartionDetails)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(201);
        res.body.should.have.property("success").eql(true);
        res.body.should.have.property("message").eql("User Registered");
        done();
      });
  });

    it('givenRegistrationDetailsWhenDuplicateShouldReturn400Status', (done) => {
        const registartionDetails = data.registration.registerWithDuplicateEmail;
        chai
        .request(index)
        .post('/user/registration')
        .send(registartionDetails)
        .end((err, res) => {
            if (err) {
            return done(err);
            }
            res.should.have.status(400);
            res.body.should.have.property("success").eql(false);
            res.body.should.have.property("message").eql("Email already registered");
            done();
        });
    });

    it('givenRegistrationDetailsWhenNotHavingEmailShouldReturn422Status', (done) => {
        const registartionDetails = data.registration.registerWithoutEmail;
        chai
          .request(index)
          .post('/user/registration')
          .send(registartionDetails)
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            res.should.have.status(422);
            res.body.should.have.property("success").eql(false);
            res.body.should.have.property("message").eql("validation failed");
            done();
        });
    });

    it('givenRegistrationDetailsWhenNotHavingFirstNameShouldReturn422Status', (done) => {
        const registartionDetails = data.registration.registerWithoutFirstName;
        chai
          .request(index)
          .post('/user/registration')
          .send(registartionDetails)
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            res.should.have.status(422);
            res.body.should.have.property("success").eql(false);
            res.body.should.have.property("message").eql("validation failed");
            done();
          });
    });

    it('givenRegistrationDetailsWhenNotHavingPasswordShouldReturn422Status', (done) => {
        const registartionDetails = data.registration.registerWithoutPassword;
        chai
          .request(index)
          .post('/user/registration')
          .send(registartionDetails)
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            res.should.have.status(422);
            res.body.should.have.property("success").eql(false);
            res.body.should.have.property("message").eql("validation failed");
            done();
        });
    });
});
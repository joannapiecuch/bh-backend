const expect = require('expect');
const request = require('supertest');

const Member = require('../app/models/member');
const server = require('../config/application');

beforeEach((done) => {
  Member.remove({}).then(() => done());
});

describe('POST /members', () => {
  it('should create a new member', (done) => {
    request(server)
      .post('/members')
      .send({
        firstName: 'Jan',
        lastName: 'Nowak',
        email: 'jan.nowak@test.com',
        date: '2018-03-08'
      })
      .expect(201)
      .expect((res) => {
        expect(res.body.firstName).toBe('Jan');
        expect(res.body.lastName).toBe('Nowak');
        expect(res.body.email).toBe('jan.nowak@test.com');
        expect(res.body.date).toBe('2018-03-08T00:00:00.000Z');
        expect(typeof res.body['_id']).toBe('string');
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Member.find().then((members) => {
          expect(members.length).toBe(1);
          expect(members[0].firstName).toBe('Jan');
          done();
        }).catch((e) => done(e));
      });
  });

  it('should validate required field', (done) => {
    request(server)
      .post('/members')
      .send({})
      .expect((res) => {
        expect(res.body.code).toBe('InvalidContent');
        expect(res.body.message).toBe('ValidationError');
        expect(res.body.errors.date.message).toBe('Path `date` is required.');
        expect(res.body.errors.email.message).toBe('Path `email` is required.');
        expect(res.body.errors.lastName.message).toBe('Path `lastName` is required.');
        expect(res.body.errors.firstName.message).toBe('Path `firstName` is required.');
      })
      .expect(400, done);
  });
});



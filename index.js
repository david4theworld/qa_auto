/*
A month or so ago, I have switched to Linux and started getting to know Bash and play around with SQL and basics of Java. I have never done anything in JS or Node, and the QA testing I've been doing has been strictly blackbox end-user testing. I am am writing this script using only what I've read in the examples used by the test author and a few tutorials I've read during the weekend. So, here goes my novice take on this...
*/

const app = require('../app');

const supertest = require('supertest');
const chai = require('chai');

const expect = chai.expect;
const should = chai.should;
const assert = chai.assert;

const api = supertest('http://localhost:3000');

let login = null;
let users = null;

describe('The API calls should:', () => {

	// Sign the user in and fetch the access token
	it('Sign the user in successfully', (done) => {
		api.post('/sign-in')
			.send({
				password: 'password',
				email: 'email',
			})
			.then((res) => {
				expect(res.statusCode).to.equal(200);
				login = res.body.access_token;
				done();
			}).
			catch(done);
	});

	// Get a list of all users and validate its content
	it('List users successfully', (done) => {

		api.get('/users')
			.set('authorization', login)
			.then((res) => {
				expect(res.statusCode).to.equal(200);
				expect(res.body).to.not.be.empty;
				expect(res.body).to.be.an('array');
				expect(res.body.length).to.be.equal(6);
				expect(res.body[0],[1],[2],[3],[4],[5],[6]).to.have.property('user_id' || 'name' || 'title' || 'active');
				expect(res.body[0],[1],[2],[3],[4],[5],[6].user_id).to.not.equal(null);
				expect(res.body[0],[1],[2],[3],[4],[5],[6].name).to.not.equal(null);
				expect(res.body[0],[1],[2],[3],[4],[5],[6].title).to.not.equal(null);
				expect(res.body[0],[1],[2],[3],[4],[5],[6].active).to.not.equal(null);
			done();
			}).
		catch(done);
	});

	// Get a single user data and validate its content
	it('Single user successful validation', (done) => {

		api.get('/users/1')
			.set('authorization', login)
			.then((res) => {
				expect(res.statusCode).to.equal(200);
				expect(res.body).to.not.be.empty;
				expect(res.body).to.have.property('user_id' || 'name' || 'title' || 'active');
				expect(res.body.user_id).to.not.equal(null);
				expect(res.body.name).to.not.equal(null);
				expect(res.body.title).to.not.equal(null);
				expect(res.body.active).to.not.equal(null);
			done();
			}).
		catch(done);
	});

	// Get a list of any user account and validate its content
	it('User accounts successful validation', (done) => {

		api.get('/users/1/accounts')
			.set('authorization', login)
			.then((res) => {
				expect(res.statusCode).to.equal(200);
				expect(res.body).to.not.be.empty;
				expect(res.body).to.be.an('array');
				expect(res.body[0]).to.have.property('account_id' || 'name' || 'active' || 'money');
				expect(res.body.account_id).to.not.equal(null);
				expect(res.body.name).to.not.equal(null);
				expect(res.body.active).to.not.equal(null);
				expect(res.body.money).to.not.equal(null);
				expect(res.body[0].account_id).to.not.equal(null);
			done();
			}).
		catch(done);
	});

	// Attempt at an example of addressing an expected error
	it('Auth err check', (done) => {

		api.get('/users/1/accounts')
			.then((res) => {
				expect(res.statusCode).to.equal(200);
				expect(res.body).to.not.be.empty;
				expect(res.body).have.property('error');
				expect(res.body.error).to.equal(true);
				expect(true, 'Missing authorization token').to.be.ok;
			done();
			}).
		catch(done);
	});

	// Attempt at addressing the Timelords
	it('Timelord successful validation', (done) => {

		api.get('/users/5/accounts')
			.set('authorization', login)
			.then((res) => {
				expect(res.statusCode).to.equal(200);
				expect(res.body).to.not.be.empty;
				/*console.log("Timelord", res.body);*/
				expect(res.body).have.property('error');
				expect(res.body.error).to.equal(true);
				expect(res.body.message).to.equal("Time lords do not have accounts");
			done();
			}).
		catch(done);
	});
});

/* I had so much fun making this! I know it can be far more precise, and incorporate many other testing modules, but I sincerely hope it will be enough to show my effort and potential, rewarding me with the interview :)

Kind regards,
David
*/

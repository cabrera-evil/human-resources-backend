const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const { ObjectId } = require('mongodb');
const { getClient } = require('./database.config');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET || 'secret';

passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
        try {
            const db = getClient();
            const collection = db.collection('users');
            const objectId = new ObjectId(jwt_payload._id);

            const user = await collection.findOne({ _id: objectId });

            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        } catch (error) {
            return done(error, false);
        }
    })
);

module.exports = passport;
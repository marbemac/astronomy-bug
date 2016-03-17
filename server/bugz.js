import {Mongo} from 'meteor/mongo';

const Bugz = new Mongo.Collection('bugz');

Meteor.methods({
  // https://github.com/jagi/meteor-astronomy/pull/306#issuecomment-197241078
  '/astro/bug'() {
    var model = Astro.Class.create({
      name: 'Test',
      collection: Bugz,
      fields: {
        name: {
          type: String,
        },
        securitySchemes: {
          type: Object,
          default() {
            return {};
          },
        },
      },
    });

    var e = new model();
    e.name = Random.id();
    console.log('getModified correctly has name', e.getModified());
    e.save();

    e.set('securitySchemes', {
      oauth2: {
        name: 'oauth2',
        scopes: undefined,
        // scopes: '123',
      }
    });
    e.name = Random.id();
    console.log('getModified correctly has name and securitySchemes', e.getModified());
    e.save();

    console.log('getModified here is wrong, should be empty', e.getModified());
    e.set('securitySchemes', {
      oauth2: {
        name: 'oauth2',
        scopes: undefined,
      }
    });
    e.save();

    console.log('getModified here is wrong, should be empty', e.getModified());
  },
});

module.exports = exports = function locationPlugin(schema, options) {

  options || (options = {});

  schema.add({
    location: {
      address: {
        type: String,
        trim: true
      },
      city: String,
      country: String,
      lat: {
        type: Number,
        match: [/^(\-?\d+(\.\d+)?)+$/, 'invalid latitude']
      },
      lng: {
        type: Number,
        match: [/^(\-?\d+(\.\d+)?)$/, 'invalid longitude']
      }
    }
  });

};
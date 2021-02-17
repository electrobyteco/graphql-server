const User = require("./user");
// Require all resolvers here

const combineResolvers = (resolvables) => {
  return Object.keys(resolvables).reduce((accumulator, current) => {
    let resolvable = resolvables[current];
    return {
      ...accumulator,
      Query: { ...accumulator.Query, ...resolvable.query },
      Mutation: { ...accumulator.Mutation, ...resolvable.mutation },
      Subscription: { ...accumulator.Subscription, ...resolvable.subscription },
      [current]: resolvable.schema,
    };
  }, {});
};

module.exports = combineResolvers({
  User,
  // Combine resolvers here
});

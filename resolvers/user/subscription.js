module.exports = {
  createdUser: {
    subscribe(parent, args, { pubsub }) {
      return pubsub.asyncIterator("CREATED_USER");
    },
  },
  countUsers: {
    subscribe(parent, args, { pubsub }) {
      return pubsub.asyncIterator("COUNT_USER");
    },
  },
};

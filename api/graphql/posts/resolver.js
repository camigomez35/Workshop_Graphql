'use strict'

  const resolver = {
    Query: {
      async posts(root, args, {postStorage}) {
        let results = [];
        try {
          results = await postStorage.find();
        } catch (err) {
          throw new Error('Error: find all posts');
        }
        return results;
      },
      async postById(root, args, {postStorage}) {
        let result = {};
        try {
          result = await postStorage.findById(args.id);
        } catch (err) {
          throw new Error('Error: find post by id');
        }
        return result;
      }
    },
    Mutation: {
      postAdd(root, args, {postStorage}) {
        let result = {};
        try {
          result = postStorage.save({...args.data});
        } catch (err) {
            console.log("err", err)
          throw new Error('Error: save post');
        }
        return result;
      },
      async postEdit(root, args, {postStorage}) {
        let result = {};
        try {
          result = await postStorage.update(args.id, {...args.data});
        } catch (err) {
          throw new Error('Error: update post');
        }
        return result;
      },
      async postDelete(root, args, {postStorage}) {
        let result = {};
        try {
          result = await postStorage.delete(args.id);
        } catch (err) {
          throw new Error('Error: delete post');
        }
        return result;
      }
    }
  };
  
  module.exports = resolver;
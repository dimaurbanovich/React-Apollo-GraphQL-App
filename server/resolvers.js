import Todo from "./models/Todo.js";
const resolvers = {
  Query: {
    welcome: () => {
      return "Hello world!";
    },
    getTodos: async () => {
      const todos = await Todo.find();
      return todos;
    },
  },
  Mutation: {
    addTodo: async (root, args) => {
      const newTodo = new Todo({
        title: args.title,
        detail: args.detail,
        date: args.date,
      });
      await newTodo.save()
      return newTodo
    },
  },
};

export default resolvers;

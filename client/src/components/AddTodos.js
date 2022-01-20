import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import {ADD_TODO} from "../graphql/Mutation"

const AddTodos = () => {
  const [todo, setTodo] = useState({
    title: "",
    detail: "",
    date: "",
  });
  const addTodo = useMutation(ADD_TODO);

  const onSubmit = (e) => {
      e.preventDefault();
      addTodo({
          variables:{
            title: todo.title,
            detail: todo.detail,
            date: todo.date,
          }
      })
  }

  return (
    <form>
      <div className="form-group mb-3">
        <label>Title</label>
        <input type="text" className="form-control" placeholder="Enter title" />
      </div>
      <div className="form-group mb-3">
        <label>Detail</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter Detail"
        />
      </div>
      <div className="form-group mb-3">
        <label>Date</label>
        <input type="date" className="form-control" placeholder="Password" />
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};
export default AddTodos;

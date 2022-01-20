import React, { useContext, useEffect, useRef, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_TODO, UPDATE_TODO } from "../graphql/Mutation";
import { GET_TODOS, GET_TODO } from "../graphql/Query";
import { TodoContext } from "../TodoContext";
import moment from "moment";

const AddTodos = () => {
  const { selectedId, setSelectedId } = useContext(TodoContext);
  const [updateTodo] = useMutation(UPDATE_TODO);
  const [todo, setTodo] = useState({
    title: "",
    detail: "",
    date: "",
  });
  const { loading, error, data } = useQuery(GET_TODO, {
    variables: {
      id: selectedId,
      onCompleted: (data) => setTodo(data.getTodo),
    },
  });
  console.log(data?.getTodo)
  const inputAreaRef = useRef(null);

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (!inputAreaRef.current.contains(e.target)) {
        setSelectedId(0);
        console.log("outside input area");
      } else {
        console.log("inside input area");
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [selectedId]);
  const [addTodo] = useMutation(ADD_TODO);
  const onSubmit = (e) => {
    if (todo.title === "") {
      alert("Enter a title");
      return;
    }
    e.preventDefault();
    if (selectedId === 0) {
      addTodo({
        variables: {
          title: todo.title,
          detail: todo.detail,
          date: todo.date,
        },
        refetchQueries: [{ query: GET_TODOS }],
      });
    } else {
      updateTodo({
        variables: {
          id: selectedId,
          title: todo.title,
          detail: todo.detail,
          date: todo.date,
        },
        refetchQueries: [{ query: GET_TODOS }],
      });
    }
  };
  return (
    <form onSubmit={onSubmit} ref={inputAreaRef}>
      <div className="form-group mb-3">
        <label>Title</label>
        <input
          type="text"
          name="title"
          className="form-control"
          placeholder="Enter title"
          value={todo.title}
          onChange={(e) => setTodo({ ...todo, title: e.target.value })}
        />
      </div>
      <div className="form-group mb-3">
        <label>Detail</label>
        <input
          type="text"
          name="detail"
          className="form-control"
          placeholder="Enter Detail"
          value={todo.detail}
          onChange={(e) => setTodo({ ...todo, detail: e.target.value })}
        />
      </div>
      <div className="form-group mb-3">
        <label>Date{moment(todo.date).format("yyyy-MM-DD")}</label>
        <input
          type="date"
          name="date"
          className="form-control"
          value={moment(todo.date).format("yyyy-MM-DD")}
          onChange={(e) => setTodo({ ...todo, date: e.target.value })}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        {selectedId === 0 ? "Add" : "Update"}
      </button>
    </form>
  );
};
export default AddTodos;

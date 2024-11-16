import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "./counter-slice";

export function Counter() {
  const count = useSelector((state: any) => state.counter.count);
  const dispatch = useDispatch();

  return (
    <div>
      <span>{count}</span>
      <br />
      <button
        className="btn btn-blue"
        aria-label="Increment value"
        onClick={() => dispatch(increment())}
      >
        Increment
      </button>
      &nbsp;
      <button
        className="btn btn-blue"
        aria-label="Decrement value"
        onClick={() => dispatch(decrement())}
      >
        Decrement
      </button>
    </div>
  );
}

import React from 'react';
import { Provider, useSelector, useDispatch } from 'react-redux';
import store from "../../Store";
import counterSlice from '../../CounterSlice';

// function reducer(state, action) {
//   if (action.type === "up" ) {
//     return {...state, value: state.value + action.step }
//   } else if (action.type === "ups" ) {
//     return {...state, num: state.num + action.step }
//   }
//   return state;
// }

// const initialState = { value: 0, num: 3 };

// const store = createStore(reducer, initialState);

function Counter() {
  const dispatch = useDispatch();
  const count = useSelector(state => {
    console.log(state);
    return state.counter.value
  });
  // const num = useSelector(state => state.num);

  return <div>
    <button onClick={() => {
      // name 하위에 있는 타입을 불러오기
      // dispatch({ type: "counter/up", step: 2 });
      // actionCreator를 사용해서 함수 만들기
      dispatch(counterSlice.actions.up(3));
    }}>+</button> {count}
    {/* <button onClick={() => {
      dispatch({ type: "ups", step: 1 })
    }}>++</button> {num} */}
  </div>
}

function ReduxToolkit() {
  return (
    <Provider store={store}>
      <div>
        <Counter />
      </div>
    </Provider>
  )
}

export default ReduxToolkit
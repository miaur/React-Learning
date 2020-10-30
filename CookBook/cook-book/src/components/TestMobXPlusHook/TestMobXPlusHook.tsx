import { Button, TextField } from "@material-ui/core";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";
import { CounterStoreContext } from "../stores/CounterStore";

export const TestMobXPlusHook = observer(() => {
  const couterStore = useContext(CounterStoreContext);
  const incrementCounter = () => {
    couterStore.count++;
  };
  return (
    <div>
      <TextField value={`Counter: ${toJS(couterStore.count)}`} />
      <Button onClick={incrementCounter}>Increment</Button>
    </div>
  );
});

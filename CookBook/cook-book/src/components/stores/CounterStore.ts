import { makeAutoObservable } from "mobx";
import { createContext } from "react";

class CounterStore {
  count = 1;

  constructor() {
    makeAutoObservable(this);
  }
}

export const CounterStoreContext = createContext(new CounterStore());

import { makeAutoObservable } from "mobx";
import { createContext } from "react";

class MainLayoutContext {
  isUserOpen: boolean;
  isMenuOpen: boolean;

  constructor() {
    this.isUserOpen = false;
    this.isMenuOpen = false;
    makeAutoObservable(this);
  }

  onClickUser() {
    this.isUserOpen = !this.isUserOpen;
  }

  onOpenMenu() {
    this.isMenuOpen = true;
  }

  onCloseMenu() {
    this.isMenuOpen = false;
  }
}

export const mainLayoutContext = createContext(new MainLayoutContext());

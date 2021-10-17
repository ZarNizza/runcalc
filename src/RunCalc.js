import { useReducer } from "react";
import RCtable from "./RunCalcTable";

// фикс Путь/Время, Каденс/ДлШага
// OK - навигация стрелками вверх/вниз
// рефакторинг  в стиле REACT

function rCalc(state, action) {
  switch (action.type) {
    case "dist": {
      const kSpeed = isFinite(
        Math.round((action.value * 6000) / state.time) / 100
      )
        ? Math.round((action.value * 6000) / state.time) / 100
        : 0;
      return {
        ...state,
        dist: action.value,
        mSpeed: mSpeed(kSpeed),
        kSpeed: kSpeed,
        pace: pace(kSpeed),
        strLength: strLength(kSpeed, state.cadense),
      };
    }
    case "time": {
      const kSpeed = isFinite(
        Math.round((state.dist * 6000) / action.value) / 100
      )
        ? Math.round((state.dist * 6000) / action.value) / 100
        : 0;
      return {
        ...state,
        time: action.value,
        mSpeed: mSpeed(kSpeed),
        kSpeed: kSpeed,
        pace: pace(kSpeed),
        strLength: strLength(kSpeed, state.cadense),
      };
    }
    case "mSpeed": {
      const kSpeed = isFinite(Math.round(action.value * 36) / 10)
        ? Math.round(action.value * 36) / 10
        : 0;
      return {
        ...state,
        time: time(kSpeed, state.dist),
        mSpeed: action.value,
        kSpeed: kSpeed,
        pace: pace(kSpeed),
        strLength: strLength(kSpeed, state.cadense),
      };
    }
    case "kSpeed": {
      return {
        ...state,
        time: time(action.value, state.dist),
        mSpeed: mSpeed(action.value),
        kSpeed: action.value,
        pace: pace(action.value),
        strLength: strLength(action.value, state.cadense),
      };
    }
    case "pace": {
      const kSpeed = isFinite(Math.round(600 / action.value) / 10)
        ? Math.round(600 / action.value) / 10
        : 0;
      return {
        ...state,
        time: time(kSpeed, state.dist),
        mSpeed: mSpeed(kSpeed),
        kSpeed: kSpeed,
        pace: action.value,
        strLength: strLength(kSpeed, state.cadense),
      };
    }
    case "cadense": {
      const kSpeed = isFinite(
        Math.round((action.value * state.strLength * 6) / 10) / 10
      )
        ? Math.round((action.value * state.strLength * 6) / 10) / 10
        : 0;
      return {
        ...state,
        time: time(kSpeed, state.dist),
        mSpeed: mSpeed(kSpeed),
        kSpeed: kSpeed,
        pace: pace(kSpeed),
        cadense: action.value,
      };
    }
    case "strLength": {
      const kSpeed = isFinite(
        Math.round((action.value * state.cadense * 6) / 10) / 10
      )
        ? Math.round((action.value * state.cadense * 6) / 10) / 10
        : 0;
      return {
        ...state,
        time: time(kSpeed, state.dist),
        mSpeed: mSpeed(kSpeed),
        kSpeed: kSpeed,
        pace: pace(kSpeed),
        strLength: action.value,
      };
    }
    case "rDT": {
      return { ...state, rDT: action.value };
    }
    case "rCS": {
      return { ...state, rCS: action.value };
    }
    default:
      return { state };
  }
}

function time(kSpeed, dist) {
  return isFinite(Math.round((dist * 600) / kSpeed) / 10)
    ? Math.round((dist * 600) / kSpeed) / 10
    : 0;
}

function mSpeed(kSpeed) {
  return isFinite(Math.round((kSpeed * 100) / 36) / 10)
    ? Math.round((kSpeed * 100) / 36) / 10
    : 0;
}

function pace(kSpeed) {
  return isFinite(Math.round(600 / kSpeed) / 10)
    ? Math.round(600 / kSpeed) / 10
    : 0;
}

function strLength(kSpeed, cadense) {
  return isFinite(Math.round((kSpeed * 100000) / (cadense * 60)) / 100)
    ? Math.round((kSpeed * 100000) / (cadense * 60)) / 100
    : 0;
}

function handleKeyPress(e) {
  const inputsArr = Array.from(document.getElementsByClassName("f"));
  const focusIndex = inputsArr.findIndex(
    (item) => item.id === document.querySelector(":focus").id
  );
  const prevIndex = focusIndex - 1 < 0 ? inputsArr.length - 1 : focusIndex - 1;
  const nextIndex = focusIndex + 1 === inputsArr.length ? 0 : focusIndex + 1;
  switch (e.key) {
    case "ArrowUp": {
      document.getElementById(inputsArr[prevIndex].id).focus();
      return;
    }
    case "ArrowDown": {
      document.getElementById(inputsArr[nextIndex].id).focus();
      return;
    }
    default: {
    }
  }
}

export default function RunCalc() {
  const [state, dispatch] = useReducer(rCalc, {
    value: 0,
    dist: 12,
    time: 60,
    mSpeed: 3.33,
    kSpeed: 12,
    pace: 5,
    cadense: 167,
    strLength: 1,
    rDT: "dist",
    rCS: "cadense",
  });

  return (
      <RCtable state={state} dispatch={dispatch.bind(this)} handleKeyPress={handleKeyPress.bind(this)} />
  );
}

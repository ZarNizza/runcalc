import { useReducer } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

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
    <>
      <table className="runCalc">
        <caption>- Run Calc -</caption>
        <tbody>
          <tr>
            <td>
              <input
                type="radio"
                name="distTime"
                id="rD"
                value="dist"
                checked={state.rDT === "dist"}
                onChange={(event) => {
                  dispatch({ type: "rDT", value: event.target.value });
                }}
              />
            </td>
            <td>
              <label htmlFor="rD">distance: </label>
            </td>
            <td>
              <input
                id="distance"
                className="f"
                value={state.dist}
                onChange={(event) => {
                  dispatch({ type: "dist", value: event.target.value });
                }}
                onKeyDown={handleKeyPress}
                type="text"
                maxLength="4"
              />{" "}
            </td>
            <td>km</td>
            <td className="sliderTD">
              <Slider
                defaultValue={state.dist}
                max="20"
                step="0.1"
                marks={{0:0, 12:12, 20:20}}
                onChange={(value) => {
                  dispatch({ type: "dist", value: value });
                }}
              />
            </td>
          </tr>
          <tr>
            <td>
              <input
                type="radio"
                name="distTime"
                id="rT"
                value="time"
                checked={state.rDT === "time"}
                onChange={(event) => {
                  dispatch({ type: "rDT", value: event.target.value });
                }}
              />
            </td>
            <td>
              <label htmlFor="rT">time: </label>
            </td>
            <td>
              <input
                id="time"
                className="f"
                value={state.time}
                onChange={(event) => {
                  dispatch({ type: "time", value: event.target.value });
                }}
                onKeyDown={handleKeyPress}
                type="text"
                maxLength="4"
              />{" "}
            </td>
            <td>min</td>
            <td className="sliderTD">
              <Slider
                defaultValue={state.time}
                max="120"
                step="0.1"
                marks={{0:0, 60:60, 120:120}}
                onChange={(value) => {
                  dispatch({ type: "time", value: value });
                }}
              />
            </td>
          </tr>
          <tr>
            <td>
              <br />
            </td>
          </tr>
          <tr>
            <td> </td>
            <td>speed, m/s: </td>
            <td>
              <input
                id="mSpeed"
                className="f"
                value={state.mSpeed}
                onChange={(event) => {
                  dispatch({ type: "mSpeed", value: event.target.value });
                }}
                onKeyDown={handleKeyPress}
                type="text"
                maxLength="4"
              />{" "}
            </td>
            <td>m/s</td>
            <td className="sliderTD">
              <Slider
                defaultValue={state.mSpeed}
                max="10"
                step="0.1"
                marks={{0:0, 3.3:3.3, 10:10}}
                onChange={(value) => {
                  dispatch({ type: "mSpeed", value: value });
                }}
              />
            </td>
          </tr>
          <tr>
            <td> </td>
            <td>speed, km/h: </td>
            <td>
              <input
                id="kSpeed"
                className="f"
                value={state.kSpeed}
                onChange={(event) => {
                  dispatch({ type: "kSpeed", value: event.target.value });
                }}
                onKeyDown={handleKeyPress}
                type="text"
                maxLength="4"
              />{" "}
            </td>
            <td>km/h</td>
            <td className="sliderTD">
              <Slider
                defaultValue={state.kSpeed}
                max="20"
                step="0.1"
                marks={{0:0, 12:12, 20:20}}
                onChange={(value) => {
                  dispatch({ type: "kSpeed", value: value });
                }}
              />
            </td>{" "}
          </tr>
          <tr>
            <td> </td>
            <td>pace: </td>
            <td>
              <input
                id="pace"
                className="f"
                value={state.pace}
                onChange={(event) => {
                  dispatch({ type: "pace", value: event.target.value });
                }}
                onKeyDown={handleKeyPress}
                type="text"
                maxLength="4"
              />{" "}
            </td>
            <td>min/km</td>
            <td className="sliderTD">
              <Slider
                defaultValue={state.pace}
                max="20"
                step="0.1"
                marks={{0:0, 5:5, 20:20}}
                onChange={(value) => {
                  dispatch({ type: "pace", value: value });
                }}
              />
            </td>
          </tr>
          <tr>
            <td>
              <br />
            </td>
          </tr>
          <tr>
            <td>
              <input
                type="radio"
                name="step"
                id="rC"
                value="cadense"
                checked={state.rCS === "cadense"}
                onChange={(event) => {
                  dispatch({ type: "rCS", value: event.target.value });
                }}
              />
            </td>
            <td>
              <label htmlFor="rC">cadense: </label>
            </td>
            <td>
              <input
                id="cadense"
                className="f"
                value={state.cadense}
                onChange={(event) => {
                  dispatch({ type: "cadense", value: event.target.value });
                }}
                onKeyDown={handleKeyPress}
                type="text"
                maxLength="4"
              />{" "}
            </td>
            <td>step/min</td>
            <td className="sliderTD">
              <Slider
                defaultValue={state.cadense}
                max="200"
                marks={{0:0, 167:167, 200:200}}
                onChange={(value) => {
                  dispatch({ type: "cadense", value: value });
                }}
              />
            </td>
          </tr>
          <tr>
            <td>
              <input
                type="radio"
                name="step"
                id="rS"
                value="strLength"
                checked={state.rCS === "strLength"}
                onChange={(event) => {
                  dispatch({ type: "rCS", value: event.target.value });
                }}
              />
            </td>
            <td>
              <label htmlFor="rS">stepLength: </label>
            </td>
            <td>
              <input
                id="strLength"
                className="f"
                value={state.strLength}
                onChange={(event) => {
                  dispatch({ type: "strLength", value: event.target.value });
                }}
                onKeyDown={handleKeyPress}
                type="text"
                maxLength="4"
              />{" "}
            </td>
            <td>m</td>
            <td className="sliderTD">
              <Slider
                defaultValue={state.strLength}
                max="2"
                step="0.05"
                marks={{0:0, 1:1, 2:2}}
                onChange={(value) => {
                  dispatch({ type: "strLength", value: value });
                }}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <br />
      <p>
        Use ArrowUp/Down to select input area.
        <br />
        Use radioButtons to fix base data.
      </p>
    </>
  );
}

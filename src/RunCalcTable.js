import Slider from "rc-slider";
import "rc-slider/assets/index.css";

export default function RCtable(props) {
  const state = props.state;
  const dispatch = props.dispatch;
  const handleKeyPress = props.handleKeyPress;

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
                value={state.dist}
                max="20"
                step="0.1"
                marks={{ 0: 0, 12: 12, 20: 20 }}
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
                value={state.time}
                max="120"
                step="0.1"
                marks={{ 0: 0, 60: 60, 120: 120 }}
                onChange={(value) => {
                  dispatch({ type: "time", value: value });
                }}
              />
            </td>
          </tr>
          <tr>
            <td></td><td></td><td></td><td></td><td></td>
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
                value={state.mSpeed}
                max="10"
                step="0.1"
                marks={{ 0: 0, 3.3: 3.3, 10: 10 }}
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
                value={state.kSpeed}
                max="20"
                step="0.1"
                marks={{ 0: 0, 12: 12, 20: 20 }}
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
                value={state.pace}
                max="20"
                step="0.1"
                marks={{ 0: 0, 5: 5, 20: 20 }}
                onChange={(value) => {
                  dispatch({ type: "pace", value: value });
                }}
              />
            </td>
          </tr>
          <tr>
            <td></td><td></td><td></td><td></td><td></td>
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
                value={state.cadense}
                max="200"
                marks={{ 0: 0, 167: 167, 200: 200 }}
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
                value={state.strLength}
                max="2"
                step="0.05"
                marks={{ 0: 0, 1: 1, 2: 2 }}
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

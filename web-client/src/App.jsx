import "./App.css";
import PerformanceList from "./components/PerformanceList";
import cupcakeLogo from "/cupcake.svg";

function App() {
  return (
    <>
      <div>
        <img src={cupcakeLogo} className="logo" alt="Frosting logo" />
        <span>Frosting</span>
      </div>
      <div>A sanity-inducing tool for the Freight.</div>
      <PerformanceList />
    </>
  );
}

export default App;

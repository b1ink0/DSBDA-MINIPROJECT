import { useState } from "react";
import "./App.css";
import Select from "react-select";
import JsonTable from "react-json-table-v2";
import { Bars } from "react-loader-spinner";
import axios from "axios";

function App() {
  const [selectedOption, setSelectedOption] = useState({
    value: "dtree",
    label: "Decision Tree",
  });
  const [predicting, setPredicting] = useState(false);
  const [customPredicting, setCustomPredicting] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [customPrediction, setCustomPrediction] = useState(null);
  const [customInput, setCustomInput] = useState({
    ID: [2],
    LIMIT_BAL: [120000],
    SEX: [1],
    EDUCATION: [2],
    MARRIAGE: [2],
    AGE: [29],
    PAY_0: [-1],
    PAY_2: [-2],
    PAY_3: [-2],
    PAY_4: [-2],
    PAY_5: [-2],
    PAY_6: [-2],
    BILL_AMT1: [0],
    BILL_AMT2: [0],
    BILL_AMT3: [0],
    BILL_AMT4: [0],
    BILL_AMT5: [0],
    BILL_AMT6: [0],
    PAY_AMT1: [0],
    PAY_AMT2: [0],
    PAY_AMT3: [0],
    PAY_AMT4: [0],
    PAY_AMT5: [0],
    PAY_AMT6: [0],
  });
  const [currentPAY, setCurrentPAY] = useState({
    value: "PAY_0",
    label: "PAY_0",
  });
  const [currentBILL_AMT, setCurrentBILL_AMT] = useState({
    value: "BILL_AMT1",
    label: "BILL_AMT1",
  });
  const [currentPAY_AMT, setCurrentPAY_AMT] = useState({
    value: "PAY_AMT1",
    label: "PAY_AMT1",
  });
  const [showCustomInput, setShowCustomInput] = useState(false);

  const options = [
    { value: "dtree", label: "Decision Tree" },
    { value: "knc", label: "K Nearest Neighbors" },
    { value: "rid_clf", label: "Ridge Classifier" },
    { value: "nn", label: "Neural Network" },
  ];
console
  const handlePredict = async () => {
    setPredicting(true);
    const result = await axios(
      `${import.meta.env.VITE_BACKEND_URL}/${selectedOption?.value}/test`
    );
    setPrediction([result.data]);
    console.log(result.data);
    setPredicting(false);
  };

  const handleCustomPredict = async () => {
    setCustomPredicting(true);
    const result = await axios(
      `${import.meta.env.VITE_BACKEND_URL}/${selectedOption?.value}/custom`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: customInput,
      }
    );
    setCustomPrediction([result.data]);
    console.log(result.data);
    setCustomPredicting(false);
  };
  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className="flex flex-col items-center justify-center bg-gray-100 rounded-lg shadow-lg p-2 m-4 w-fit border-2"
      >
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-3xl text-gray-600 font-bold">
            Credit Card Default Prediction
          </h1>
          <h2 className="text-xl text-gray-400 font-bold">
            Using Machine Learning
          </h2>
        </div>
        <div className="w-full flex flex-col items-center justify-center">
          <div className="w-full flex">
            <div className="flex flex-col items-center justify-center bg-gray-100 rounded-lg shadow-xl p-4 m-4 border-2 w-[500px]">
              <h2 className="text-2xl text-gray-600 font-bold">
                Perform Prediction On Test Data
              </h2>
              <h3 className="text-xl text-gray-500 font-bold mb-3">
                Select Model
              </h3>
              <Select
                className="w-60"
                options={options}
                onChange={setSelectedOption}
                value={selectedOption}
              />
              <button
                onClick={handlePredict}
                className="h-10 w-28 flex justify-center items-center bg-purple-500 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded mt-3"
              >
                <Bars
                  height="25"
                  width="40"
                  color="#ffffff"
                  ariaLabel="bars-loading"
                  visible={predicting}
                />
                {predicting ? "" : "Predict"}
              </button>

              {prediction && (
                <div className=" flex flex-col items-center justify-center bg-gray-100 rounded-lg shadow-lg p-4 px-11 m-4 w-fit border-2">
                  <h3 className="text-2xl text-gray-600 font-bold">
                    Prediction
                  </h3>
                  <h2 className="text-xl text-gray-500 font-bold">
                    Accuracy:
                    <span
                      className="
                  text-purple-500
                  "
                    >
                      {" "}
                      {prediction[0]?.accuracy?.toFixed(2)}%
                    </span>
                  </h2>
                </div>
              )}
              <button
                onClick={() => setShowCustomInput(!showCustomInput)}
                className="h-10 w-48 flex justify-center items-center bg-purple-500 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded mt-3"
              >
                {showCustomInput ? "Hide" : "Show"} Custom Input
              </button>
            </div>
            {showCustomInput && (
              <div className="flex flex-col items-center justify-center bg-gray-100 rounded-lg shadow-lg p-4 m-4 w-fit border-2 w-[500px]">
                <h2 className="text-xl text-gray-500 font-bold mb-3">
                  Custom Input
                </h2>
                <div className="flex h-[250px] overflow-y-auto flex-col items-start justify-start bg-gray-100 rounded-lg shadow-lg p-4 m-4 w-fit gap-2 border-2">
                  <label className=" shrink-0 text-sm font-bold text-gray-500">
                    LIMIT_BAL
                  </label>
                  <input
                    className="shrink-0 border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                    type="number"
                    placeholder="LIMIT_BAL"
                    name="LIMIT_BAL"
                    id="LIMIT_BAL"
                    value={customInput.LIMIT_BAL}
                    onChange={(e) =>
                      setCustomInput({
                        ...customInput,
                        LIMIT_BAL: [e.target.value],
                      })
                    }
                  />
                  <label className="text-sm font-bold text-gray-500 shrink-0 ">
                    SEX
                  </label>
                  <input
                    className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none shrink-0 "
                    type="number"
                    placeholder="SEX"
                    id="SEX"
                    value={customInput.SEX}
                    onChange={(e) =>
                      setCustomInput({
                        ...customInput,
                        SEX: [e.target.value],
                      })
                    }
                  />
                  <label className="text-sm font-bold text-gray-500 shrink-0 ">
                    EDUCTION
                  </label>
                  <input
                    className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none shrink-0 "
                    type="number"
                    placeholder="EDUCATION"
                    id="EDUCATION"
                    value={customInput.EDUCATION}
                    onChange={(e) =>
                      setCustomInput({
                        ...customInput,
                        EDUCATION: [e.target.value],
                      })
                    }
                  />
                  <label className="text-sm font-bold text-gray-500 shrink-0 ">
                    MARRIAGE
                  </label>
                  <input
                    className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none shrink-0 "
                    type="number"
                    placeholder="MARRIAGE"
                    id="MARRIAGE"
                    value={customInput.MARRIAGE}
                    onChange={(e) =>
                      setCustomInput({
                        ...customInput,
                        MARRIAGE: [e.target.value],
                      })
                    }
                  />
                  <label className="text-sm font-bold text-gray-500">AGE</label>
                  <input
                    className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none shrink-0"
                    type="number"
                    placeholder="AGE"
                    id="AGE"
                    value={customInput.AGE}
                    onChange={(e) =>
                      setCustomInput({
                        ...customInput,
                        AGE: [e.target.value],
                      })
                    }
                  />
                  <label className="text-sm font-bold text-gray-500 shrink-0 ">
                    PAY
                  </label>
                  <Select
                    className="w-full"
                    options={[
                      { value: "PAY_0", label: "PAY_0" },
                      { value: "PAY_2", label: "PAY_2" },
                      { value: "PAY_3", label: "PAY_3" },
                      { value: "PAY_4", label: "PAY_4" },
                      { value: "PAY_5", label: "PAY_5" },
                      { value: "PAY_6", label: "PAY_6" },
                    ]}
                    onChange={setCurrentPAY}
                    value={currentPAY}
                  />
                  <label className="text-sm font-bold text-gray-500 shrink-0 ">
                    {currentPAY.value}
                  </label>
                  <input
                    className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                    type="number"
                    placeholder={currentPAY.value}
                    id={currentPAY.value}
                    value={customInput[currentPAY.value]}
                    onChange={(e) =>
                      setCustomInput({
                        ...customInput,
                        [currentPAY.value]: [e.target.value],
                      })
                    }
                  />
                  <label className="text-sm font-bold text-gray-500 shrink-0 ">
                    BILL_AMT
                  </label>
                  <Select
                    className="w-full"
                    options={[
                      { value: "BILL_AMT1", label: "BILL_AMT1" },
                      { value: "BILL_AMT2", label: "BILL_AMT2" },
                      { value: "BILL_AMT3", label: "BILL_AMT3" },
                      { value: "BILL_AMT4", label: "BILL_AMT4" },
                      { value: "BILL_AMT5", label: "BILL_AMT5" },
                      { value: "BILL_AMT6", label: "BILL_AMT6" },
                    ]}
                    onChange={setCurrentBILL_AMT}
                    value={currentBILL_AMT}
                  />
                  <label className="text-sm font-bold text-gray-500">
                    {currentBILL_AMT.value}
                  </label>
                  <input
                    className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none shrink-0 "
                    type="number"
                    placeholder={currentBILL_AMT.value}
                    id={currentBILL_AMT.value}
                    value={customInput[currentBILL_AMT.value]}
                    onChange={(e) =>
                      setCustomInput({
                        ...customInput,
                        [currentBILL_AMT.value]: [e.target.value],
                      })
                    }
                  />
                  <label className="text-sm font-bold text-gray-500 shrink-0 ">
                    PAY_AMT
                  </label>
                  <Select
                    className="w-full shrink-0 "
                    options={[
                      { value: "PAY_AMT1", label: "PAY_AMT1" },
                      { value: "PAY_AMT2", label: "PAY_AMT2" },
                      { value: "PAY_AMT3", label: "PAY_AMT3" },
                      { value: "PAY_AMT4", label: "PAY_AMT4" },
                      { value: "PAY_AMT5", label: "PAY_AMT5" },
                      { value: "PAY_AMT6", label: "PAY_AMT6" },
                    ]}
                    onChange={setCurrentPAY_AMT}
                    value={currentPAY_AMT}
                  />
                  <label className="text-sm font-bold text-gray-500 shrink-0 ">
                    {currentPAY_AMT.value}
                  </label>
                  <input
                    className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none shrink-0"
                    type="number"
                    placeholder={currentPAY_AMT.value}
                    id={currentPAY_AMT.value}
                    value={customInput[currentPAY_AMT.value]}
                    onChange={(e) =>
                      setCustomInput({
                        ...customInput,
                        [currentPAY_AMT.value]: [e.target.value],
                      })
                    }
                  />
                </div>
                <Select
                  className="w-60"
                  options={options}
                  onChange={setSelectedOption}
                  value={selectedOption}
                />
                <button
                  className="h-10 w-28 flex justify-center items-center bg-purple-500 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded mt-3"
                  onClick={handleCustomPredict}
                >
                  <Bars
                    height="25"
                    width="40"
                    color="#ffffff"
                    ariaLabel="bars-loading"
                    visible={customPredicting}
                  />
                  {customPredicting ? "" : "Predict"}
                </button>
                {customPrediction && (
                  <div className=" flex flex-col items-center justify-center bg-gray-100 rounded-lg shadow-lg p-4 px-11 m-4 w-fit border-2">
                    <h3 className="text-2xl text-gray-600 font-bold">
                      Prediction
                    </h3>
                    <h2 className="text-xl text-gray-500 font-bold">
                      Result:
                      <span
                        className="
                   text-purple-500
                   "
                      >
                        {" "}
                        {customPrediction.result === 1
                          ? "Default"
                          : "No Default"}
                      </span>
                    </h2>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

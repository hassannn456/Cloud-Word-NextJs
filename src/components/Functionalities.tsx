import { useState } from "react";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { gql, useMutation } from "@apollo/client";

interface HistoryData {
  history: { name: string }[];
}

interface InputFieldProps {
  setWords:
    | {
        text: string;
        value: number;
      }[]
    | any;
}

const clear = gql`
  mutation Clear($check: Boolean) {
    clear(check: $check) {
      str
    }
  }
`;

const history = gql`
  query Query {
    history {
      name
      createdAt
    }
  }
`;

const addText = gql`
  mutation Mutation($text: String) {
    addText(text: $text) {
      text
      value
    }
  }
`;

const InputField: React.FC<InputFieldProps> = ({ setWords }) => {
  const [textareaValue, setTextareaValue] = useState("");
  const [showHistory, setShowHistory] = useState(false);
  const { data, refetch } = useSuspenseQuery<HistoryData>(history);
  const [clearData] = useMutation(clear);
  const [getWords] = useMutation(addText);

  const handleTextareaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setTextareaValue(event.target.value);
  };

  const handleClearClick = async () => {
    try {
      const result = await clearData({ variables: { check: true } });
    } catch (error) {
      console.error("Error clearing data:", error);
    }
  };

  const handleTextClick = async () => {
    try {
      const result = await getWords({ variables: { text: textareaValue } });
      setWords(result?.data?.addText);
      setTextareaValue("");
      console.log(result?.data?.addText);
    } catch (error) {
      console.error("Error clearing data:", error);
    }
  };

  return (
    <div>
      <textarea
        className="min-w-[70vw] p-4 border border-gray-300 rounded"
        placeholder="Enter text here..."
        value={textareaValue}
        onChange={handleTextareaChange}
      />

      <div className="flex justify-center space-x-4 my-4">
        <button
          onClick={handleClearClick}
          className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-2 rounded"
        >
          Clear
        </button>

        <button
          className="bg-gray-400 hover:bg-gray-600 text-white px-2 py-2 rounded"
          onClick={() => {
            refetch();
            setShowHistory(true);
          }}
        >
          {showHistory ? "Update History" : "Show History"}
        </button>

        {showHistory && (
          <button
            className="bg-gray-600 hover:bg-gray-800 text-white px-2 py-2 rounded"
            onClick={() => setShowHistory(false)}
          >
            Hide History
          </button>
        )}

        <button
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded"
          disabled={textareaValue === ""}
          onClick={handleTextClick}
        >
          Submit
        </button>
      </div>

      {showHistory && (
        <>
          <h2 className="text-xl font-semibold mb-6">History</h2>
          <div className="flex justify-center">
            <table className="border-collapse border border-gray-400 min-w-[70vw]">
              <thead>
                <tr>
                  <th className="border border-gray-400 p-2">Sentences</th>
                </tr>
              </thead>
              {data?.history.length > 0 ? (
                data.history.map((item: { name: string }, index: number) => (
                  <tr key={index}>
                    <td className="border border-gray-400 p-2">{item.name}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="border border-gray-400 p-2" colSpan={2}>
                    No history available.
                  </td>
                </tr>
              )}
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default InputField;

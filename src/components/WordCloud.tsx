"use client";

import { useState } from "react";
import WordCloud from "react-d3-cloud";
import { scaleOrdinal } from "d3-scale";
import { schemeCategory10 } from "d3-scale-chromatic";
import { TagCloud, TagCloudOptions } from "@frank-mayer/react-tag-cloud";

import InputField from "./Functionalities";

const isBrowser = typeof window !== "undefined";

const WordCloudBlock: React.FC = () => {
  const [words, setWords] = useState([]);
  const data = [
    { text: "Hey", value: 1000 },
    { text: "lol", value: 200 },
    { text: "first impression", value: 800 },
    { text: "very cool", value: 1000000 },
    { text: "duck", value: 10 },
  ];

  const schemeCategory10ScaleOrdinal = scaleOrdinal(schemeCategory10);

  return (
    <div className="flex justify-center items-center w-full text-center text-gray-600">
      <div className="m-8 mb-12 bg-white rounded-lg shadow-lg p-8 min-h-[70vh] w-full">
        <h2 className="text-xl font-semibold mb-6">Word Cloud</h2>

        <InputField setWords={setWords} />

        {words?.length > 0 && (
          // <div className="flex justify-center min-h-[50vh]" style={{visibility: isBrowser ? 'visible' : 'hidden'}}> 
            <WordCloud
              data={words}
              width={220}
              height={220}
              fontWeight="bold"
              fontSize={(word) => Math.log2(word.value) * 20}
              rotate={(word) => word.value % 360}
              padding={4}
              random={Math.random}
              fill={(d: any, i: any) => schemeCategory10ScaleOrdinal(i)}
            />
          // </div>
        )}
      </div>
    </div>
  );
};

export default WordCloudBlock;

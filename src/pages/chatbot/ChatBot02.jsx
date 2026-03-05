import React, { useState } from "react";

const ChatBot02 = () => {
  const [result, setResult] = useState("");
  const [question, setQuestion] = useState("");

  const handleQuestionOnChange = (e) => setQuestion(e.target.value);
  const asking = async () => {
    // 백엔드 NEST
    console.log(question);
    const response = await fetch("http://localhost:10000/openai/question", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question: question,
      }),
    });

    const datas = await response.json()
    setResult(datas.data)
  };

  return (
    <div>
      쳇봇 스트리밍 옵션!
      <div>
        <p>{result}</p>
      </div>
      <div>
        <input type="text" value={question} onChange={handleQuestionOnChange} />
        <button onClick={asking}>질문하기</button>
      </div>
    </div>
  );
};

export default ChatBot02;

import React, { useState } from "react";

const ChatBot03 = () => {
  const [result, setResult] = useState("");
  const [question, setQuestion] = useState("");

  const handleQuestionOnChange = (e) => setQuestion(e.target.value);
  const asking = async () => {
    const response = await fetch(
      "http://localhost:10000/openai/role-question",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: question,
        }),
      }
    );

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    let text = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      text += chunk;
      setResult(text);
    }
  };

  return (
    <div>
      쳇봇 스트리밍 옵션😎!
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

export default ChatBot03;

import React, { useState } from "react";

const ChatBot04 = () => {
  const [recipes, setRecipes] = useState([]);
  const [question, setQuestion] = useState("");

  const handleQuestionOnChange = (e) => setQuestion(e.target.value);
  const asking = async () => {
    const response = await fetch("http://localhost:10000/openai/out-parser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question: question,
      }),
    });

    const datas = await response.json();
    const { data } = datas;
    setRecipes(data)
  };

  const recipeList = recipes.map(({ name, step }, i) => (
    <li key={i}>
      <h3>{name}</h3>
      <ul>
        {step.map((s, i) => <li key={i}>{ s }</li>)}
      </ul>
    </li>
  ))

  return (
    <div>
      <div>
        <p>{recipeList}</p>
      </div>
      <div>
        <input type="text" value={question} onChange={handleQuestionOnChange} />
        <button onClick={asking}>질문하기</button>
      </div>
    </div>
  );
};

export default ChatBot04;

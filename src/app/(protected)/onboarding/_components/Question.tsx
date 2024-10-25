"use client";
import Options from "./Options";
type QuestionProps = {
  question: {
    question: string;
    options: [];
  };
  answer: any;
  answers: [];
  dispatch: any;
};

const Question = ({
  question,
  answer = null,
  answers = [],
  dispatch,
}: QuestionProps) => {
  return (
    <div>
      <h1 className="text-xl md:text-2xl font-medium text-white mb-10">
        {question.question}
      </h1>
      <Options
        question={question}
        dispatch={dispatch}
        answer={answer}
        answers={answers}
      />
    </div>
  );
};

export default Question;

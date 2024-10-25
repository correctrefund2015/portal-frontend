import { Button } from "@/components/ui/button";

type OptionProps = {
  question: {
    question: string;
    options: string[];
  };
  answer: any;
  dispatch: any;
  answers: any[];
};
const Options = ({ question, answer, answers, dispatch }: OptionProps) => {
  const hasAnswered = answer !== null;

  function handleClick(index: any) {
    // console.log(index, answer);

    dispatch({
      type: "newAnswer",
      payload: index,
    });
  }

  const getOptions = () => {
    if (answers[0] === 1) {
      question.options.length = question.options.length - 1;
      return question.options;
    }
    return question.options;
  };
  return (
    <div className="options flex flex-col items-center mt-4 px-6">
      {question.options.map((option, index): any => (
        <Button
          onClick={() => {
            handleClick(index);
          }}
          className={`btn-onboarding flex mb-2 md:w-[340px]  w-full ${
            index === answer ? "active" : ""
          }`}
          key={index}
        >
          {option}
        </Button>
      ))}
    </div>
  );
};

export default Options;

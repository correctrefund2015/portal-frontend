import { Button } from "@/components/ui/button";

const NextQuestion = ({ dispatch, index, numQuestions, answer }: any) => {
  if (answer === null) return;

  if (index < numQuestions - 1) {
    return (
      <Button
        onClick={() => {
          dispatch({
            type: "nextQuestion",
          });
        }}
        className="btn-primary"
      >
        Next
      </Button>
    );
  }

  if (index === numQuestions - 1) {
    return (
      <Button
        onClick={() => {
          dispatch({
            type: "finished",
          });
        }}
        className="btn-primary"
      >
        Next
      </Button>
    );
  }
};

export default NextQuestion;

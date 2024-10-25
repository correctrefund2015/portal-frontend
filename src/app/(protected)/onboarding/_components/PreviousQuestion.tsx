import { Button } from "@/components/ui/button";

const PreviousQuestion = ({ index, dispatch }: any) => {
  if (index < 0) return;

  if (index > 0) {
    return (
      <Button
        onClick={() => dispatch({ type: "previousQuestion" })}
        className="btn-primary"
      >
        Previous
      </Button>
    );
  }
};

export default PreviousQuestion;

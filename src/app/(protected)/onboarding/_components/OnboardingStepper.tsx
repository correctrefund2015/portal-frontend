"use client";
import { useEffect, useReducer } from "react";
import NextQuestion from "./NextQuestion";
import OnboardingFooter from "./OnboardingFooter";
import OnboardingNav from "./OnboardingNav";
import OnboardingProgress from "./OnboardingProgress";
import Question from "./Question";
import StartScreen from "./StartScreen";
import FinishScreen from "./FinishedScreen";
import Loading from "./Loading";
import PreviousQuestion from "./PreviousQuestion";

//Fake Data
const questions: any = [
  {
    question: "Are you a business or individual client?",
    options: ["Business", "Individual"],
  },
  {
    question: "What type of service are you looking for?",
    options: [
      "Bookkeeping",
      "Tax Preparation",
      "Strategic Planning",
      "Audit Support",
      "CPA Advisory",
    ],
  },

  {
    question: "What is the nature of your tax or financial situation?",
    options: [
      "Small Business Tax Filing",
      "Complex Business Taxes",
      "Investment Management",
      "Other",
    ],
  },
];

const initialState: any = {
  questionsList: [],
  status: "loading",
  index: 0,
  answer: null,
  answers: [],
};

function reducer(state: any, action: any) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questionsList: action.payload, status: "ready" };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "start":
      return {
        ...state,
        status: "active",
      };
    case "newAnswer":
      return {
        ...state,
        answer: action.payload,
        answers: [...state.answers, action.payload],
      };
    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer:
          state.answers[state.index + 1] !== undefined
            ? state.answers[state.index + 1]
            : null,
      };
    case "previousQuestion":
      return {
        ...state,
        index: state.index - 1,
        answer: state.answers[state.index - 1],
      };
    case "restart":
      return {};
    case "finished":
      return {
        ...state,
        status: "finished",
      };
    case "default":
      throw new Error("Unknown Error");
  }
}

const OnboardingStepper = () => {
  const [{ questionsList, status, index, answer, answers }, dispatch]: any =
    useReducer(reducer, initialState);

  const numQuestions = questionsList.length;

  useEffect(() => {
    const fakePromise = new Promise((resolve) => {
      setTimeout(() => {
        resolve("Fake data received");
      }, 0);
    });

    fakePromise
      .then((result) => {
        dispatch({
          type: "dataReceived",
          payload: questions,
        });
      })
      .catch((error) => {
        dispatch({
          type: "dataFailed",
        });
      });
  }, []);

  return (
    <div className="h-screen">
      <OnboardingNav />

      {status === "loading" && <Loading />}
      {status === "error" && "Error"}
      {status === "ready" && <StartScreen dispatch={dispatch} />}
      {status === "active" && (
        <div className="question-wrapper flex flex-col mt-24 justify-center md:w-[700px] mx-auto text-center">
          <Question
            question={questions[index]}
            dispatch={dispatch}
            answer={answer}
            answers={answers}
          />

          <OnboardingFooter>
            <OnboardingProgress index={index} numQuestions={numQuestions} />
            <div className="flex justify-between mt-8">
              <div>
                <PreviousQuestion dispatch={dispatch} index={index} />
              </div>
              <div>
                <NextQuestion
                  dispatch={dispatch}
                  index={index}
                  numQuestions={numQuestions}
                  answer={answer}
                />
              </div>
            </div>
          </OnboardingFooter>
        </div>
      )}

      {status === "finished" && (
        <FinishScreen questions={questions} answers={answers} />
      )}
    </div>
  );
};

export default OnboardingStepper;

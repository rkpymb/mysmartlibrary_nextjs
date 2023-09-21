import { useEffect, useState } from 'react';

// Updated sample data structure with 5 questions, each having 1 mark
const questions = [
  {
    title: "Question 1",
    Attempted: true,
    marks: 1, // Marks for this question
    options: [
      { title: "Option A", isActive: false, isSelected: false },
      { title: "Option B", isActive: true, isSelected: false },
      // Add more options
    ],
  },
  // Add more questions (up to Question 9)
  {
    title: "Question 10",
    Attempted: true,
    marks: 1, // Marks for this question
    options: [
      { title: "Option A", isActive: false, isSelected: true },
      { title: "Option B", isActive: true, isSelected: false },
      { title: "Option C", isActive: true, isSelected: true },
      { title: "Option D", isActive: false, isSelected: false },
    ],
  },
];

const givenTotalTime = 5; // Total time given in minutes
const takenTime = 3.4; // Time taken in minutes

function calculateStats(questions, givenTotalTime, takenTime) {
  let totalFullMarks = 0; // Variable to store the full marks
  let totalMarks = 0;
  let totalMarksLost = 0;
  let totalAttempted = 0;
  let totalNotAttempted = 0;
  let correctQuestions = 0;
  let incorrectQuestions = 0;
  let totalQuestions = questions.length;

  questions.forEach((question) => {
    // Calculate total obtained marks for each question
    question.obtainedMarks = 0;

    if (question.Attempted) {
      let isCorrect = true;

      question.options.forEach((option) => {
        if (option.isActive !== option.isSelected) {
          isCorrect = false;
        }
      });

      if (isCorrect) {
        question.obtainedMarks = question.marks;
        correctQuestions++;
      } else {
        incorrectQuestions++;
      }
    } else {
      totalNotAttempted++;
    }

    totalFullMarks += question.marks;
    totalMarks += question.obtainedMarks;

    if (question.Attempted) {
      totalAttempted++;
    }
  });

  // Calculate total marks lost
  totalMarksLost = totalFullMarks - totalMarks;

  // Calculate percentages
  let percentageFullMarks = (totalFullMarks / (totalQuestions * 1)) * 100;
  let percentageMarks = (totalMarks / (totalQuestions * 1)) * 100;
  let percentageMarksLost = (totalMarksLost / (totalQuestions * 1)) * 100;
  let percentageAttempted = (totalAttempted / (totalQuestions * 1)) * 100;
  let percentageNotAttempted = (totalNotAttempted / (totalQuestions * 1)) * 100;
  let percentageCorrectQuestions = (correctQuestions / (totalQuestions * 1)) * 100;
  let percentageIncorrectQuestions = (incorrectQuestions / (totalQuestions * 1)) * 100;

  // Calculate time-related percentages
  let percentageTimeTaken = (takenTime / givenTotalTime) * 100;

  return {
    totalFullMarks,
    totalMarks,
    totalMarksLost,
    totalAttempted,
    totalNotAttempted,
    correctQuestions,
    incorrectQuestions,
    totalQuestions,
    percentageFullMarks,
    percentageMarks,
    percentageMarksLost,
    percentageAttempted,
    percentageNotAttempted,
    percentageCorrectQuestions,
    percentageIncorrectQuestions,
    percentageTimeTaken, // Add percentage of time taken
  };
}

export default function QuestionStats() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const calculatedStats = calculateStats(questions, givenTotalTime, takenTime);
    setStats(calculatedStats);
  }, []);

  if (!stats) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Question Statistics</h2>
      <p>Total Full Marks: {stats.totalFullMarks}</p>
      <p>Total Marks Obtained: {stats.totalMarks}</p>
      <p>Total Marks Lost: {stats.totalMarksLost}</p>
      <p>Total Attempted Questions: {stats.totalAttempted}</p>
      <p>Total Not Attempted Questions: {stats.totalNotAttempted}</p>
      <p>Correct Questions: {stats.correctQuestions}</p>
      <p>Incorrect Questions: {stats.incorrectQuestions}</p>
      <p>Total Questions: {stats.totalQuestions}</p>
      <h3>Percentages:</h3>
      <p>Percentage of Full Marks: {stats.percentageFullMarks.toFixed(2)}%</p>
      <p>Percentage of Marks Obtained: {stats.percentageMarks.toFixed(2)}%</p>
      <p>Percentage of Marks Lost: {stats.percentageMarksLost.toFixed(2)}%</p>
      <p>Percentage of Attempted Questions: {stats.percentageAttempted.toFixed(2)}%</p>
      <p>Percentage of Not Attempted Questions: {stats.percentageNotAttempted.toFixed(2)}%</p>
      <p>Percentage of Correct Questions: {stats.percentageCorrectQuestions.toFixed(2)}%</p>
      <p>Percentage of Incorrect Questions: {stats.percentageIncorrectQuestions.toFixed(2)}%</p>
      <h3>Time Related:</h3>
      <p>Percentage of Time Taken: {stats.percentageTimeTaken.toFixed(2)}%</p>
      <h3>Questions:</h3>
      {questions.map((question, index) => (
        <div key={index}>
          <p>
            <strong>{question.title}</strong> (Marks: {question.marks})
          </p>
          <ul>
            {question.options.map((option, optionIndex) => (
              <li
                key={optionIndex}
                style={{
                  color:
                    question.Attempted && option.isActive === option.isSelected
                      ? 'green'
                      : question.Attempted
                        ? 'red'
                        : 'black',
                }}
              >
                {option.title}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

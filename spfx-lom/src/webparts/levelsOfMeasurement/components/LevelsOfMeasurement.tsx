import * as React from 'react';
import styles from './LevelsOfMeasurement.module.scss';
import type { ILevelsOfMeasurementProps } from './ILevelsOfMeasurementProps';
import { measurementLevels, questions } from './data';
import type { MeasurementLevel } from './models';
import { escape } from '@microsoft/sp-lodash-subset';

interface QuestionResponse {
  selected: MeasurementLevel;
  correct: boolean;
}

type ResponseMap = Record<number, QuestionResponse | undefined>;

const defaultIntro =
  'Explore each research scenario and decide which level of measurement best fits the data. ' +
  'Select an option to check your thinking and see the rationale. When you finish every scenario you will unlock a detailed summary.';

const LevelsOfMeasurement: React.FC<ILevelsOfMeasurementProps> = (props) => {
  const { description, isDarkTheme, environmentMessage, hasTeamsContext, userDisplayName } = props;

  const [currentIndex, setCurrentIndex] = React.useState<number>(0);
  const [responses, setResponses] = React.useState<ResponseMap>({});
  const [summaryMode, setSummaryMode] = React.useState<boolean>(false);

  const totalQuestions = questions.length;
  const currentQuestion = questions[currentIndex];
  const currentResponse = currentQuestion ? responses[currentQuestion.id] : undefined;

  const answeredCount = React.useMemo(
    () =>
      questions.reduce((count, question) => {
        return responses[question.id] ? count + 1 : count;
      }, 0),
    [responses]
  );
  const correctCount = React.useMemo(
    () =>
      questions.reduce((count, question) => {
        return responses[question.id]?.correct ? count + 1 : count;
      }, 0),
    [responses]
  );

  const quizComplete = answeredCount === totalQuestions;
  const introText = description?.trim().length ? description : defaultIntro;
  const greeting = userDisplayName?.trim().length ? userDisplayName : 'there';

  const handleSelect = (level: MeasurementLevel): void => {
    if (!currentQuestion || summaryMode) {
      return;
    }

    setResponses((prev) => ({
      ...prev,
      [currentQuestion.id]: {
        selected: level,
        correct: level === currentQuestion.answer
      }
    }));
  };

  const handleNext = (): void => {
    if (!currentQuestion) {
      return;
    }

    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
      return;
    }

    setSummaryMode(true);
  };

  const handlePrevious = (): void => {
    if (currentIndex === 0) {
      return;
    }

    setSummaryMode(false);
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleProgressClick = (index: number): void => {
    if (index < 0 || index >= totalQuestions) {
      return;
    }

    setSummaryMode(false);
    setCurrentIndex(index);
  };

  const handleReset = (): void => {
    setResponses({});
    setCurrentIndex(0);
    setSummaryMode(false);
  };

  const renderQuestionCard = (): React.ReactElement | null => {
    if (!currentQuestion) {
      return null;
    }

    const isLastQuestion = currentIndex === totalQuestions - 1;
    const disableNext = !currentResponse;

    return (
      <article className={styles.quizCard}>
        <header className={styles.cardHeader}>
          <span className={styles.promptLabel}>Scenario {currentIndex + 1}</span>
          <h3 className={styles.prompt}>{currentQuestion.prompt}</h3>
        </header>
        {currentQuestion.context && <p className={styles.context}>{currentQuestion.context}</p>}
        <div className={styles.options}>
          {measurementLevels.map((level) => {
            const isSelected = currentResponse?.selected === level.value;
            const isCorrectOption = currentQuestion.answer === level.value;
            const showResult = !!currentResponse;
            const classNames = [
              styles.optionButton,
              isSelected ? styles.optionSelected : '',
              showResult && isCorrectOption ? styles.optionCorrect : '',
              showResult && isSelected && !isCorrectOption ? styles.optionIncorrect : ''
            ]
              .filter(Boolean)
              .join(' ');

            return (
              <button
                key={`${currentQuestion.id}-${level.value}`}
                type="button"
                onClick={() => handleSelect(level.value)}
                className={classNames}
                aria-pressed={isSelected}
              >
                <span className={styles.optionTitle}>{level.label}</span>
                <span className={styles.optionHelp}>{level.definition}</span>
                {level.guidingQuestion && <span className={styles.optionHint}>{level.guidingQuestion}</span>}
              </button>
            );
          })}
        </div>
        {currentResponse && (
          <aside
            className={`${styles.feedback} ${
              currentResponse.correct ? styles.feedbackCorrect : styles.feedbackIncorrect
            }`}
            role="status"
          >
            <strong>{currentResponse.correct ? 'Nice work!' : 'Look again at the clues.'}</strong>
            <p>{currentQuestion.explanation}</p>
            {currentQuestion.insight && <p className={styles.insight}>{currentQuestion.insight}</p>}
          </aside>
        )}
        <footer className={styles.cardActions}>
          <button
            type="button"
            className={styles.secondaryButton}
            onClick={handlePrevious}
            disabled={currentIndex === 0}
          >
            Previous
          </button>
          <div className={styles.actionGroup}>
            <button type="button" className={styles.secondaryButton} onClick={handleReset}>
              Start over
            </button>
            <button
              type="button"
              className={styles.primaryButton}
              onClick={handleNext}
              disabled={disableNext}
            >
              {isLastQuestion ? 'View summary' : 'Next question'}
            </button>
          </div>
        </footer>
      </article>
    );
  };

  const renderSummary = (): React.ReactElement => (
    <article className={styles.summaryCard}>
      <header>
        <h3>Summary</h3>
        <p>
          You answered {answeredCount} of {totalQuestions} scenarios with <strong>{correctCount}</strong> correct (
          {Math.round((correctCount / totalQuestions) * 100)}%).
        </p>
      </header>
      <ul className={styles.summaryList}>
        {questions.map((question, index) => {
          const response = responses[question.id];
          const statusClass = response?.correct ? styles.summaryCorrect : styles.summaryIncorrect;

          return (
            <li key={question.id} className={`${styles.summaryItem} ${response ? statusClass : ''}`}>
              <button
                type="button"
                onClick={() => handleProgressClick(index)}
                className={styles.summaryQuestionButton}
              >
                <span className={styles.summaryQuestionNumber}>Scenario {index + 1}</span>
                <span className={styles.summaryQuestionPrompt}>{question.prompt}</span>
              </button>
              <div className={styles.summaryAnswerBlock}>
                <div>
                  <span className={styles.summaryLabel}>Correct answer:</span>
                  <strong>{question.answer}</strong>
                </div>
                {response && (
                  <div>
                    <span className={styles.summaryLabel}>Your choice:</span>
                    <strong>{response.selected}</strong>
                  </div>
                )}
                {question.context && <p className={styles.summaryRationale}>Context: {question.context}</p>}
                <p className={styles.summaryRationale}>{question.explanation}</p>
              </div>
            </li>
          );
        })}
      </ul>
      <footer className={styles.summaryActions}>
        <button type="button" className={styles.primaryButton} onClick={handleReset}>
          Practice again
        </button>
      </footer>
    </article>
  );

  return (
    <section
      className={[
        styles.levelsOfMeasurement,
        isDarkTheme ? styles.dark : '',
        hasTeamsContext ? styles.teams : ''
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <header className={styles.header}>
        <h2 className={styles.title}>Levels of Measurement Practice Lab</h2>
        <p className={styles.subtitle}>
          Hi {escape(greeting)}! {escape(introText)}
        </p>
        <div className={styles.metaRow}>
          <span>
            Progress: {answeredCount}/{totalQuestions} answered · Score: {correctCount}
          </span>
          {environmentMessage && <span className={styles.environment}>{environmentMessage}</span>}
        </div>
      </header>

      <nav className={styles.progressTracker} aria-label="Quiz progress">
        {questions.map((question, index) => {
          const response = responses[question.id];
          const statusClass = response
            ? response.correct
              ? styles.progressCorrect
              : styles.progressIncorrect
            : styles.progressPending;
          const isActive = !summaryMode && index === currentIndex;

          return (
            <button
              key={question.id}
              type="button"
              className={[styles.progressPill, statusClass, isActive ? styles.progressActive : '']
                .filter(Boolean)
                .join(' ')}
              onClick={() => handleProgressClick(index)}
              aria-current={isActive ? 'step' : undefined}
            >
              {index + 1}
            </button>
          );
        })}
      </nav>

      {summaryMode && quizComplete ? renderSummary() : renderQuestionCard()}

      <aside className={styles.referencePanel}>
        <h3>Quick reference</h3>
        <ul>
          {measurementLevels.map((level) => (
            <li key={`ref-${level.value}`}>
              <strong>{level.label}:</strong> {level.definition} <em>Example:</em> {level.example}
            </li>
          ))}
        </ul>
        <p className={styles.tip}>
          Tip: Ask whether the data can be ordered, whether the gaps between values are consistent, and whether a zero
          value represents the complete absence of what you measured.
        </p>
      </aside>
    </section>
  );
};

export default LevelsOfMeasurement;

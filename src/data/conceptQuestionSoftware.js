import { SOFTWARE_DISPLAY } from './softwareObjectiveLabels.js'

function cloneQuestion(q) {
  return structuredClone(q)
}

/**
 * Full question overrides where the correct answer or options depend on software.
 * Keys: question id → software id → partial question object (merged onto clone).
 */
export const CONCEPT_QUESTION_SOFTWARE_PATCHES = {
  'stats-m3-q2': {
    spss: {
      question:
        'Which variable type in SPSS should be used for categorical data like "Male/Female"?'
    },
    r: {
      question:
        'Which data type in R is most appropriate for categorical data like "Male/Female"?'
    },
    excel: {
      question:
        'In Excel data tables, how should categorical data like "Male/Female" be stored?'
    },
    stata: {
      question:
        'In Stata, what kind of variable coding is appropriate for categorical data like "Male/Female"?'
    }
  },
  'stats-m3-q3': {
    spss: {
      question:
        'Missing data in SPSS can affect the results of statistical analyses.'
    },
    r: {
      question:
        'Missing data in R can affect the results of statistical analyses.'
    },
    excel: {
      question:
        'Missing data in Excel-based analyses can affect statistical results.'
    },
    stata: {
      question:
        'Missing data in Stata can affect the results of statistical analyses.'
    }
  },
  'stats-m3-q5': {
    jamovi: {
      question: 'What file format does jamovi use to save its native data files?',
      options: [
        { id: 'a', text: '.xlsx' },
        { id: 'b', text: '.csv' },
        { id: 'c', text: '.omv' },
        { id: 'd', text: '.sav' }
      ],
      correct: 'c',
      feedback: {
        correct:
          'jamovi uses the .omv (Open Metadata + Values) format for its native files.',
        incorrect:
          "jamovi's native format is .omv. It can import .xlsx, .csv, and .sav files but saves in .omv format."
      }
    },
    spss: {
      question: 'What file format does SPSS use for its native data files?',
      options: [
        { id: 'a', text: '.xlsx' },
        { id: 'b', text: '.csv' },
        { id: 'c', text: '.omv' },
        { id: 'd', text: '.sav' }
      ],
      correct: 'd',
      feedback: {
        correct:
          'SPSS uses .sav for native data files. You can import many other formats but Save typically writes .sav.',
        incorrect:
          'SPSS native format is .sav. CSV and Excel are common imports, not the default native save type.'
      }
    },
    r: {
      question:
        'Which is a common native format for saving a single R data frame for later use in R?',
      options: [
        { id: 'a', text: '.csv (always the native R format)' },
        { id: 'b', text: '.rds (serialized single object)' },
        { id: 'c', text: '.omv' },
        { id: 'd', text: '.sav only' }
      ],
      correct: 'b',
      feedback: {
        correct:
          '.rds is a standard way to save an R object with saveRDS()/readRDS(). .RData can hold multiple objects.',
        incorrect:
          'CSV is portable but not R-native. .rds is a common native choice for one data frame in R.'
      }
    },
    excel: {
      question: 'What file format does Excel typically use for a saved workbook?',
      options: [
        { id: 'a', text: '.xlsx' },
        { id: 'b', text: '.omv' },
        { id: 'c', text: '.sav' },
        { id: 'd', text: '.dta' }
      ],
      correct: 'a',
      feedback: {
        correct:
          'Excel workbooks are usually .xlsx (or legacy .xls). CSV saves data only, not full workbook features.',
        incorrect: 'The standard Excel workbook extension is .xlsx.'
      }
    },
    stata: {
      question: 'What file format does Stata use for native datasets?',
      options: [
        { id: 'a', text: '.dta' },
        { id: 'b', text: '.omv' },
        { id: 'c', text: '.rds' },
        { id: 'd', text: '.xlsx only' }
      ],
      correct: 'a',
      feedback: {
        correct: 'Stata native format is .dta (use save/use).',
        incorrect: 'Stata reads other formats but native Stata data files are .dta.'
      }
    }
  },
  'stats-m5-q25': {
    jamovi: {
      question: 'Which function computes the natural logarithm (base e) in jamovi?',
      options: [
        { id: 'a', text: 'LOG()' },
        { id: 'b', text: 'LOG10()' },
        { id: 'c', text: 'LN()' },
        { id: 'd', text: 'NLOG()' }
      ],
      correct: 'c',
      feedback: {
        correct: 'LN() computes the natural logarithm (base e). LOG10() computes base-10 logarithms.',
        incorrect: 'Use LN() for natural logarithms (base e) and LOG10() for base-10 logarithms.'
      }
    },
    spss: {
      question: 'In SPSS syntax, which function computes the natural logarithm (base e)?',
      options: [
        { id: 'a', text: 'LOG10()' },
        { id: 'b', text: 'LN()' },
        { id: 'c', text: 'EXP()' },
        { id: 'd', text: 'SQRT()' }
      ],
      correct: 'b',
      feedback: {
        correct: 'LN() is the natural log in SPSS; LOG10() is base 10.',
        incorrect: 'Use LN() for natural logarithm in SPSS.'
      }
    },
    r: {
      question: 'In R, which function computes the natural logarithm (base e)?',
      options: [
        { id: 'a', text: 'log10()' },
        { id: 'b', text: 'log()' },
        { id: 'c', text: 'ln()' },
        { id: 'd', text: 'sqrt()' }
      ],
      correct: 'b',
      feedback: {
        correct: 'log() in R is the natural logarithm; log10() is base 10.',
        incorrect: 'In R, log() computes the natural logarithm (base e).'
      }
    },
    excel: {
      question: 'In Excel, which function computes the natural logarithm (base e)?',
      options: [
        { id: 'a', text: 'LOG10()' },
        { id: 'b', text: 'LN()' },
        { id: 'c', text: 'LOG()' },
        { id: 'd', text: 'EXP()' }
      ],
      correct: 'b',
      feedback: {
        correct: 'Excel uses LN() for natural log and LOG() for base-10 (or LOG(x, base)).',
        incorrect: 'LN() is the natural logarithm in Excel.'
      }
    },
    stata: {
      question: 'In Stata, which function computes the natural logarithm (base e)?',
      options: [
        { id: 'a', text: 'log10()' },
        { id: 'b', text: 'log()' },
        { id: 'c', text: 'ln()' },
        { id: 'd', text: 'sqrt()' }
      ],
      correct: 'b',
      feedback: {
        correct: 'Stata’s log() is the natural logarithm; log10() is base 10.',
        incorrect: 'In Stata, log() computes the natural logarithm.'
      }
    }
  },
  'stats-m5-q19': {
    jamovi: {
      question: 'Which logical operator tests if two values are equal in jamovi?',
      options: [
        { id: 'a', text: '=' },
        { id: 'b', text: '==' },
        { id: 'c', text: 'EQUALS()' },
        { id: 'd', text: 'IS' }
      ],
      correct: 'b'
    },
    spss: {
      question: 'In SPSS Compute syntax, which operator tests whether two values are equal?',
      options: [
        { id: 'a', text: '=' },
        { id: 'b', text: '==' },
        { id: 'c', text: 'EQUALS()' },
        { id: 'd', text: 'IS' }
      ],
      correct: 'a'
    },
    r: {
      question: 'In R, which operator tests whether two values are equal?',
      options: [
        { id: 'a', text: '=' },
        { id: 'b', text: '==' },
        { id: 'c', text: 'EQUALS()' },
        { id: 'd', text: 'IS' }
      ],
      correct: 'b'
    },
    excel: {
      question: 'In Excel formulas, which operator tests whether two values are equal?',
      options: [
        { id: 'a', text: '=' },
        { id: 'b', text: '==' },
        { id: 'c', text: 'EQUALS()' },
        { id: 'd', text: 'IS' }
      ],
      correct: 'a'
    },
    stata: {
      question: 'In Stata expressions, which operator tests whether two values are equal?',
      options: [
        { id: 'a', text: '=' },
        { id: 'b', text: '==' },
        { id: 'c', text: 'EQUALS()' },
        { id: 'd', text: 'IS' }
      ],
      correct: 'b'
    }
  },
  'stats-m5-q23': {
    spss: {
      question:
        'What can you create using Compute Variable in SPSS? (Select all that apply)'
    },
    r: {
      question:
        'What can you create using transformation code in R (e.g., mutate/ifelse)? (Select all that apply)'
    },
    excel: {
      question:
        'What can you create using formulas in Excel? (Select all that apply)'
    },
    stata: {
      question:
        'What can you create using generate/replace in Stata? (Select all that apply)'
    }
  },
  'stats-m5-q24': {
    spss: {
      question:
        'In SPSS, what is the intended result of a conditional expression that returns "Pass" when score > 50 and "Fail" otherwise?',
      feedback: {
        correct:
          'In SPSS, conditional logic in Compute is used to generate values like Pass/Fail based on whether a condition is true.'
      }
    },
    r: {
      question: 'What does the expression ifelse(score > 50, "Pass", "Fail") do in R?',
      feedback: {
        correct:
          'In R, ifelse(condition, value_if_true, value_if_false) creates a conditional variable element-wise.'
      }
    },
    excel: {
      question: 'What does the expression IF(score > 50, "Pass", "Fail") do in Excel?',
      feedback: {
        correct:
          'In Excel, IF(condition, value_if_true, value_if_false) returns conditional outputs such as Pass/Fail.'
      }
    },
    stata: {
      question:
        'What is the equivalent result of conditional coding like `cond(score > 50, "Pass", "Fail")` in Stata?',
      feedback: {
        correct:
          'In Stata, conditional expressions (e.g., cond()) create values based on whether a condition is true or false.'
      }
    }
  },
  'stats-m5-q28': {
    spss: {
      question: 'What does applying Select Cases / a filter in SPSS do?'
    },
    r: {
      question: 'What does filtering rows (e.g., dplyr::filter()) in R do?'
    },
    excel: {
      question: 'What does applying an AutoFilter in Excel do?'
    },
    stata: {
      question: 'What does subsetting with an if condition in Stata analyses do?'
    }
  },
  'stats-m5-q30': {
    spss: {
      question: 'When might you use filters/select cases in SPSS? (Select all that apply)'
    },
    r: {
      question: 'When might you filter rows in R analyses? (Select all that apply)'
    },
    excel: {
      question: 'When might you use AutoFilter in Excel analysis workflows? (Select all that apply)'
    },
    stata: {
      question: 'When might you use if/in subsetting in Stata analyses? (Select all that apply)'
    }
  },
  'stats-m5-q27': {
    spss: {
      question:
        'The functions LOG10() and LN() in SPSS produce the same results because they are both logarithms.'
    },
    r: {
      question:
        'The functions log10() and log() in R produce the same results because they are both logarithms.'
    },
    excel: {
      question:
        'The functions LOG10() and LN() in Excel produce the same results because they are both logarithms.'
    },
    stata: {
      question:
        'The functions log10() and log() in Stata produce the same results because they are both logarithms.'
    }
  },
  'stats-m3-q8': {
    spss: {
      question:
        'Which best distinguishes a data file from an analysis output in SPSS?'
    },
    r: {
      question:
        'Which best distinguishes a data object/file from printed analysis output in R?'
    },
    excel: {
      question:
        'Which best distinguishes a worksheet data file from chart/statistical output in Excel?'
    },
    stata: {
      question:
        'Which best distinguishes a dataset from analysis output in Stata?'
    }
  }
}

function mergePatch(base, patch) {
  if (!patch) return base
  const out = { ...base, ...patch }
  if (patch.options) out.options = structuredClone(patch.options)
  if (patch.feedback) out.feedback = { ...base.feedback, ...patch.feedback }
  if (patch.items) out.items = structuredClone(patch.items)
  return out
}

/**
 * Apply software-specific patches + label substitution for concept review items.
 */
export function prepareConceptQuestionForSoftware(question, softwareId) {
  if (!question) return question
  const sw = softwareId && SOFTWARE_DISPLAY[softwareId] ? softwareId : 'jamovi'
  let q = cloneQuestion(question)
  const patches = CONCEPT_QUESTION_SOFTWARE_PATCHES[q.id]
  if (patches?.[sw]) {
    q = mergePatch(q, patches[sw])
  }

  const label = SOFTWARE_DISPLAY[sw] || SOFTWARE_DISPLAY.jamovi
  if (sw !== 'jamovi') {
    const sub = (s) => {
      if (typeof s !== 'string') return s
      let t = s
      t = t.replace(/\bin jamovi\b/gi, `in ${label.name}`)
      t = t.replace(/\bfrom jamovi\b/gi, `from ${label.name}`)
      t = t.replace(/\bwith jamovi\b/gi, `with ${label.name}`)
      t = t.replace(/\busing jamovi\b/gi, `using ${label.name}`)
      t = t.replace(/\bthe jamovi\b/gi, `the ${label.name}`)
      t = t.replace(/\bjamovi\b/g, label.name)
      t = t.replace(/\bJamovi\b/g, label.title)
      return t
    }
    q.question = sub(q.question)
    if (q.options?.length) {
      q.options = q.options.map((o) => ({ ...o, text: sub(o.text) }))
    }
    if (q.items?.length) {
      q.items = q.items.map((it) => ({ ...it, text: sub(it.text) }))
    }
    if (q.feedback) {
      q.feedback = {
        correct: sub(q.feedback.correct),
        incorrect: sub(q.feedback.incorrect)
      }
    }
    if (q.hint) q.hint = sub(q.hint)
  }
  return q
}

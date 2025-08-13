globalThis.process ??= {}; globalThis.process.env ??= {};
import { o as objectType, s as stringType, u as unionType, a as arrayType, c as createComponent, b as createAstro, r as renderTemplate, d as unescapeHTML, e as renderScript, f as renderHead } from '../../chunks/astro/server_CDii1nDs.mjs';
export { renderers } from '../../renderers.mjs';

const lessons = [
  {
    lesson_id: "prepositions-of-place-beginner",
    title: "Prepositions of Place",
    title_arabic: "حروف الجر المكانية",
    topic: "Grammar",
    topic_arabic: "قواعد",
    level: "Beginner",
    arabic_explanation: "Learn common prepositions of place like in, on, under, next to, behind, in front of, between, near, far from, above, among, around, opposite. AI will generate the full lesson in Arabic.",
    examples: [],
    interactive_exercises: [
      {
        type: "multiple_choice",
        question: "Where is the bird?",
        choices: ["in the cage", "on the cage", "under the cage", "next to the cage"],
        correct_answer: "in the cage"
      },
      {
        type: "multiple_choice",
        question: "The flowers are ___ the vase.",
        choices: ["on", "in", "under", "next to"],
        correct_answer: "in"
      },
      {
        type: "multiple_choice",
        question: "The cat is ___ the table.",
        choices: ["on", "in", "under", "between"],
        correct_answer: "under"
      },
      {
        type: "multiple_choice",
        question: "The school is ___ the park.",
        choices: ["next to", "in", "on", "under"],
        correct_answer: "next to"
      }
    ],
    additional_notes: "Remember 'at' for specific points, 'near' for proximity. AI will generate more in Arabic.",
    common_mistakes: "Confusing 'in', 'on', 'at'. AI will detail common mistakes in Arabic.",
    meta: {
      englishGrammarTopic: "Prepositions of Place (e.g., in, on, under, next to, between, above, behind, in front of, among, around, opposite, far from, at, near)"
    }
  },
  {
    lesson_id: "present-simple-tense-beginner",
    title: "Present Simple Tense",
    title_arabic: "زمن المضارع البسيط",
    topic: "Grammar",
    topic_arabic: "قواعد",
    level: "Beginner",
    arabic_explanation: "Learn the basics of the Present Simple tense in English, used for habits, facts, and regular occurrences. AI will generate a detailed Arabic explanation and examples.",
    examples: [],
    interactive_exercises: [
      {
        type: "multiple_choice",
        question: "Which sentence is in Present Simple?",
        choices: ["She is reading.", "She reads every day.", "She read yesterday."],
        correct_answer: "She reads every day."
      },
      {
        type: "multiple_choice",
        question: "I ___ (to like) coffee.",
        choices: ["like", "likes", "am liking"],
        correct_answer: "like"
      }
    ],
    meta: {
      englishGrammarTopic: "Present Simple Tense (affirmative, negative, and interrogative forms for I, you, we, they, he, she, it)"
    },
    additional_notes: "Remember the 's' for he/she/it in affirmative sentences! AI will provide more in Arabic.",
    common_mistakes: "Forgetting the 's' for third person singular. Using 'am/is/are' with the base verb (e.g., 'I am go'). AI will detail in Arabic."
  },
  {
    lesson_id: "nouns-types-forms-beginner",
    title: "Nouns: Types and Forms",
    title_arabic: "الأسماء: أنواعها وأشكالها",
    topic: "Grammar",
    topic_arabic: "قواعد",
    level: "Beginner",
    arabic_explanation: "Discover different types of nouns in English and how they change form. AI will provide an Arabic explanation and examples.",
    examples: [],
    interactive_exercises: [
      {
        type: "multiple_choice",
        question: "Which of these is a proper noun?",
        choices: ["city", "London", "book", "happiness"],
        correct_answer: "London"
      },
      {
        type: "multiple_choice",
        question: "What is the plural of 'child'?",
        choices: ["childs", "childes", "children", "childer"],
        correct_answer: "children"
      }
    ],
    meta: {
      englishGrammarTopic: "English Nouns: Introduction to common and proper nouns, singular and plural forms (regular and common irregulars), and basic countable/uncountable nouns."
    },
    additional_notes: "Proper nouns always start with a capital letter. Pay attention to irregular plural forms. AI will provide more details in Arabic.",
    common_mistakes: "Incorrectly forming plurals of irregular nouns. Not capitalizing proper nouns. AI will explain further in Arabic."
  },
  {
    lesson_id: "subject-object-pronouns-beginner",
    title: "Subject & Object Pronouns",
    title_arabic: "ضمائر الفاعل والمفعول به",
    topic: "Grammar",
    topic_arabic: "قواعد",
    level: "Beginner",
    arabic_explanation: "Learn how to use subject and object pronouns correctly in English sentences. AI will generate an Arabic explanation and examples.",
    examples: [],
    interactive_exercises: [
      {
        type: "multiple_choice",
        question: "She gave the book to ___.",
        choices: ["I", "me", "my", "mine"],
        correct_answer: "me"
      },
      {
        type: "multiple_choice",
        question: "___ went to the park.",
        choices: ["Him", "He", "His", "Them"],
        correct_answer: "He"
      }
    ],
    meta: {
      englishGrammarTopic: "Subject Pronouns (I, you, he, she, it, we, they) and Object Pronouns (me, you, him, her, it, us, them) in English sentences: their forms and functions."
    },
    additional_notes: "Subject pronouns usually come before the verb. Object pronouns usually come after the verb or a preposition. AI will detail this in Arabic.",
    common_mistakes: "Using a subject pronoun where an object pronoun is needed (e.g., 'She gave it to I') and vice-versa. AI will clarify in Arabic."
  },
  {
    lesson_id: "verbs-to-be-action-beginner",
    title: "Verbs: 'To Be' & Action Verbs",
    title_arabic: "الأفعال: فعل 'To Be' وأفعال الحركة",
    topic: "Grammar",
    topic_arabic: "قواعد",
    level: "Beginner",
    arabic_explanation: "Understand the verb 'to be' and common action verbs in English. AI will provide an Arabic explanation and examples.",
    examples: [],
    interactive_exercises: [
      {
        type: "multiple_choice",
        question: "They ___ happy.",
        choices: ["is", "am", "are", "be"],
        correct_answer: "are"
      },
      {
        type: "multiple_choice",
        question: "I ___ English every day.",
        choices: ["study", "studies", "am study", "studying"],
        correct_answer: "study"
      }
    ],
    meta: {
      englishGrammarTopic: "The verb 'to be' (am, is, are) in present simple and common action verbs in English (e.g., eat, drink, play, read, write), focusing on their present simple forms."
    },
    additional_notes: "The verb 'to be' changes form depending on the subject (I am, you are, he/she/it is, we are, they are). AI will explain in Arabic.",
    common_mistakes: "Using the wrong form of 'to be'. Not conjugating action verbs correctly for third-person singular in present simple (e.g., 'he play' instead of 'he plays'). AI will elaborate in Arabic."
  },
  {
    lesson_id: "descriptive-adjectives-beginner",
    title: "Descriptive Adjectives",
    title_arabic: "الصفات الوصفية",
    topic: "Grammar",
    topic_arabic: "قواعد",
    level: "Beginner",
    arabic_explanation: "Learn how adjectives describe nouns in English. AI will provide an Arabic explanation and examples.",
    examples: [],
    interactive_exercises: [
      {
        type: "multiple_choice",
        question: "The ___ cat is sleeping.",
        choices: ["quickly", "black", "sleep", "house"],
        correct_answer: "black"
      },
      {
        type: "multiple_choice",
        question: "Adjectives usually come ____ the noun they describe.",
        choices: ["after", "before", "instead of", "far from"],
        correct_answer: "before"
      }
    ],
    meta: {
      englishGrammarTopic: "Introduction to descriptive adjectives in English: what they are, their function in describing nouns, common examples (e.g., big, small, happy, sad, red, blue), and their typical placement before a noun or after the verb 'to be'."
    },
    additional_notes: "Adjectives make your sentences more interesting and informative! AI will explain in Arabic.",
    common_mistakes: "Placing adjectives after the noun (e.g., 'car red'). Using adverbs instead of adjectives. AI will explain in Arabic."
  },
  {
    lesson_id: "possessive-adjectives-beginner",
    title: "Possessive Adjectives",
    title_arabic: "صفات الملكية",
    topic: "Grammar",
    topic_arabic: "قواعد",
    level: "Beginner",
    arabic_explanation: "Learn about possessive adjectives (my, your, his, her, its, our, their). AI will generate an Arabic explanation and examples.",
    examples: [],
    interactive_exercises: [
      {
        type: "multiple_choice",
        question: "This is ___ book.",
        choices: ["I", "my", "me", "mine"],
        correct_answer: "my"
      },
      {
        type: "multiple_choice",
        question: "___ car is blue.",
        choices: ["She", "Her", "Hers", "He"],
        correct_answer: "Her"
      }
    ],
    meta: {
      englishGrammarTopic: "Possessive Adjectives (my, your, his, her, its, our, their) and their use with nouns."
    },
    additional_notes: "Possessive adjectives show ownership and come before a noun. AI will explain in Arabic.",
    common_mistakes: "Confusing possessive adjectives (e.g., 'your') with contractions (e.g., 'you're'). AI will explain in Arabic."
  },
  {
    lesson_id: "demonstratives-beginner",
    title: "Demonstratives (This, That, These, Those)",
    title_arabic: "أسماء الإشارة (This, That, These, Those)",
    topic: "Grammar",
    topic_arabic: "قواعد",
    level: "Beginner",
    arabic_explanation: "Understand how to use this, that, these, and those. AI will provide an Arabic explanation and examples.",
    examples: [],
    interactive_exercises: [
      {
        type: "multiple_choice",
        question: "___ apple is red. (near you)",
        choices: ["This", "That", "These", "Those"],
        correct_answer: "This"
      },
      {
        type: "multiple_choice",
        question: "___ books are on the table. (far from you, plural)",
        choices: ["This", "That", "These", "Those"],
        correct_answer: "Those"
      }
    ],
    meta: {
      englishGrammarTopic: "Demonstrative pronouns and adjectives (this, that, these, those) to point out specific people or things based on proximity."
    },
    additional_notes: "'This' and 'these' are for things near. 'That' and 'those' are for things far. AI will explain in Arabic.",
    common_mistakes: "Using singular demonstratives with plural nouns and vice-versa. AI will explain in Arabic."
  },
  {
    lesson_id: "questions-to-be-beginner",
    title: "Questions with 'To Be'",
    title_arabic: "الأسئلة باستخدام فعل 'To Be'",
    topic: "Grammar",
    topic_arabic: "قواعد",
    level: "Beginner",
    arabic_explanation: "Learn to ask questions using 'am, is, are'. AI will generate an Arabic explanation and examples.",
    examples: [],
    interactive_exercises: [
      {
        type: "multiple_choice",
        question: "___ she a doctor?",
        choices: ["Am", "Is", "Are", "Do"],
        correct_answer: "Is"
      },
      {
        type: "multiple_choice",
        question: "What ___ your name?",
        choices: ["am", "is", "are", "do"],
        correct_answer: "is"
      }
    ],
    meta: {
      englishGrammarTopic: "Forming yes/no questions and Wh-questions with the verb 'to be' (am, is, are) in the present simple by inverting subject and verb."
    },
    additional_notes: "For questions, the verb 'to be' comes before the subject. AI will explain in Arabic.",
    common_mistakes: "Forgetting to invert the subject and verb 'to be'. AI will explain in Arabic."
  },
  {
    lesson_id: "questions-do-does-beginner",
    title: "Questions with 'Do/Does'",
    title_arabic: "الأسئلة باستخدام 'Do/Does'",
    topic: "Grammar",
    topic_arabic: "قواعد",
    level: "Beginner",
    arabic_explanation: "Learn to ask questions using 'do' and 'does' with action verbs. AI will generate an Arabic explanation and examples.",
    examples: [],
    interactive_exercises: [
      {
        type: "multiple_choice",
        question: "___ you like pizza?",
        choices: ["Am", "Is", "Do", "Does"],
        correct_answer: "Do"
      },
      {
        type: "multiple_choice",
        question: "Where ___ he live?",
        choices: ["do", "does", "is", "are"],
        correct_answer: "does"
      }
    ],
    meta: {
      englishGrammarTopic: "Forming yes/no questions and Wh-questions with auxiliary verbs 'do' and 'does' for present simple action verbs, using the base form of the main verb."
    },
    additional_notes: "Use 'do' with I/you/we/they and 'does' with he/she/it. The main verb stays in its base form. AI will explain in Arabic.",
    common_mistakes: "Using 's' on the main verb after 'does' (e.g., 'Does he likes?'). AI will explain in Arabic."
  },
  {
    lesson_id: "adverbs-frequency-beginner",
    title: "Adverbs of Frequency",
    title_arabic: "ظروف التكرار",
    topic: "Grammar",
    topic_arabic: "قواعد",
    level: "Beginner",
    arabic_explanation: "Explore adverbs like always, sometimes, never. AI will provide an Arabic explanation and examples.",
    examples: [],
    interactive_exercises: [
      {
        type: "multiple_choice",
        question: "I ___ drink coffee in the morning.",
        choices: ["always", "never eat", "sometimes play"],
        correct_answer: "always"
      }
    ],
    meta: {
      englishGrammarTopic: "Common adverbs of frequency (always, usually, often, sometimes, rarely, never) and their typical placement in sentences (before main verbs, after 'to be')."
    },
    additional_notes: "Placement: Adverbs of frequency usually go before the main verb, but after the verb 'to be'. AI will explain in Arabic.",
    common_mistakes: "Incorrect placement of adverbs of frequency. AI will explain in Arabic."
  },
  {
    lesson_id: "there-is-there-are-beginner",
    title: "There is / There are",
    title_arabic: "There is / There are (يوجد)",
    topic: "Grammar",
    topic_arabic: "قواعد",
    level: "Beginner",
    arabic_explanation: "Learn to use 'there is' and 'there are' correctly to talk about existence. AI will generate an Arabic explanation and examples.",
    examples: [],
    interactive_exercises: [
      {
        type: "multiple_choice",
        question: "___ a cat on the roof.",
        choices: ["There is", "There are", "It is", "They are"],
        correct_answer: "There is"
      },
      {
        type: "multiple_choice",
        question: "___ many books on the shelf.",
        choices: ["There is", "There are", "It is", "They are"],
        correct_answer: "There are"
      }
    ],
    meta: {
      englishGrammarTopic: "Using 'there is' (for singular and uncountable nouns) and 'there are' (for plural nouns) to indicate the existence or presence of something, including question and negative forms."
    },
    additional_notes: "Use 'there is' for singular nouns and 'there are' for plural nouns. AI will explain in Arabic.",
    common_mistakes: "Using 'there is' with plural nouns or 'there are' with singular nouns. AI will explain in Arabic."
  },
  {
    lesson_id: "countable-uncountable-nouns-beginner",
    title: "Countable & Uncountable Nouns (Basic)",
    title_arabic: "الأسماء المعدودة وغير المعدودة (أساسي)",
    topic: "Grammar",
    topic_arabic: "قواعد",
    level: "Beginner",
    arabic_explanation: "Understand the basics of countable (e.g., apple, book) and uncountable nouns (e.g., water, rice). AI will provide an Arabic explanation and examples.",
    examples: [],
    interactive_exercises: [
      {
        type: "multiple_choice",
        question: "Which is an uncountable noun?",
        choices: ["chair", "information", "car", "student"],
        correct_answer: "information"
      }
    ],
    meta: {
      englishGrammarTopic: "Introduction to countable nouns (can be counted, have plural forms, use a/an) and uncountable nouns (cannot be counted, no plural form, do not use a/an)."
    },
    additional_notes: "Countable nouns can be singular or plural. Uncountable nouns are always singular. AI will explain in Arabic.",
    common_mistakes: "Trying to make uncountable nouns plural (e.g., 'waters', 'furnitures'). AI will explain in Arabic."
  },
  {
    lesson_id: "imperatives-beginner",
    title: "Imperatives",
    title_arabic: "صيغة الأمر",
    topic: "Grammar",
    topic_arabic: "قواعد",
    level: "Beginner",
    arabic_explanation: "Learn how to give commands, make requests, and provide instructions using imperatives. AI will generate an Arabic explanation and examples.",
    examples: [],
    interactive_exercises: [
      {
        type: "multiple_choice",
        question: "Which is a correct imperative sentence?",
        choices: ["You open the window.", "Open the window.", "To open the window.", "Opening the window."],
        correct_answer: "Open the window."
      }
    ],
    meta: {
      englishGrammarTopic: "Forming and using imperative sentences (base form of the verb) for commands, requests (often with 'please'), and instructions. Negative imperatives (Don't + base form)."
    },
    additional_notes: "Imperatives use the base form of the verb. The subject 'you' is usually implied. AI will explain in Arabic.",
    common_mistakes: "Including the subject 'you' explicitly unless for emphasis. AI will explain in Arabic."
  },
  {
    lesson_id: "asking-answering-basic-questions-beginner",
    title: "Asking and Answering Basic Questions",
    title_arabic: "طرح الأسئلة الأساسية والإجابة عليها",
    topic: "Conversation Basics",
    topic_arabic: "أساسيات المحادثة",
    level: "Beginner",
    arabic_explanation: "Learn how to ask and answer common basic questions in English (e.g., What's your name? How are you? Where are you from?). AI will generate explanations and examples.",
    examples: [],
    interactive_exercises: [
      {
        type: "multiple_choice",
        question: "How to respond to 'How are you?'",
        choices: ["I am book.", "I am fine, thank you.", "My name is fine.", "Yes, I am."],
        correct_answer: "I am fine, thank you."
      }
    ],
    additional_notes: "Practice these questions and answers to build confidence in basic conversations. AI will provide more tips in Arabic.",
    common_mistakes: "Giving inappropriate or grammatically incorrect answers to simple questions. AI will detail in Arabic.",
    meta: {
      englishGrammarTopic: "Common Wh-questions (What, Where, Who, How) and Yes/No questions in simple present tense for basic personal information and greetings, along with typical short and long answers."
    }
  },
  {
    lesson_id: "articles-a-an-the-intermediate",
    title: "Articles: A/An/The",
    title_arabic: "أدوات التعريف والتنكير: A/An/The",
    topic: "Grammar",
    topic_arabic: "قواعد",
    level: "Intermediate",
    arabic_explanation: "Understand when to use indefinite (a/an) and definite (the) articles in English. AI will provide a comprehensive Arabic explanation and illustrative examples.",
    examples: [],
    interactive_exercises: [
      {
        type: "multiple_choice",
        question: "I saw ___ beautiful bird in the park. ___ bird was singing.",
        choices: ["a / The", "the / A", "an / The", "a / A"],
        correct_answer: "a / The"
      },
      {
        type: "multiple_choice",
        question: "She is ___ honest person.",
        choices: ["a", "an", "the", "no article"],
        correct_answer: "an"
      }
    ],
    meta: {
      englishGrammarTopic: "English Articles (a, an, the): Usage for specific and non-specific nouns, first and subsequent mentions, unique items, and general concepts. Also covering cases with no article."
    },
    additional_notes: "Pay attention to vowel sounds for 'a' vs 'an', not just the letter. 'The' is used for specific items known to both speaker and listener. AI will elaborate in Arabic.",
    common_mistakes: "Using 'a/an' with plural or uncountable nouns. Omitting 'the' when it's required for specific nouns already mentioned or unique items. AI will detail in Arabic."
  },
  {
    lesson_id: "past-simple-tense-intermediate",
    title: "Past Simple Tense",
    title_arabic: "زمن الماضي البسيط",
    topic: "Grammar",
    topic_arabic: "قواعد",
    level: "Intermediate",
    arabic_explanation: "Learn to talk about completed actions in the past using the Past Simple tense. AI will generate an Arabic explanation and examples.",
    examples: [],
    interactive_exercises: [
      {
        type: "multiple_choice",
        question: "Yesterday, I ___ (to play) football.",
        choices: ["play", "played", "playing", "plays"],
        correct_answer: "played"
      },
      {
        type: "multiple_choice",
        question: "They ___ (not go) to the cinema last night.",
        choices: ["don't go", "didn't went", "didn't go", "not goed"],
        correct_answer: "didn't go"
      }
    ],
    meta: {
      englishGrammarTopic: "Past Simple Tense in English: Forming regular (-ed) and common irregular past tense verbs, usage for completed actions in the past (affirmative, negative 'did not + base verb', and interrogative 'Did + subject + base verb?')."
    },
    additional_notes: "Remember the auxiliary verb 'did' for negatives and questions in Past Simple (except with 'to be'). Many common verbs are irregular in the past simple. AI will expand in Arabic.",
    common_mistakes: "Using the past form of the verb in negative and question sentences with 'did' (e.g., 'didn't went'). Forgetting irregular verb forms. AI will provide examples in Arabic."
  },
  {
    lesson_id: "comparative-superlative-adjectives-intermediate",
    title: "Comparative & Superlative Adjectives",
    title_arabic: "صفات المقارنة والتفضيل",
    topic: "Grammar",
    topic_arabic: "قواعد",
    level: "Intermediate",
    arabic_explanation: "Learn how to compare things using comparative and superlative adjectives. AI will provide an Arabic explanation and examples.",
    examples: [],
    interactive_exercises: [
      {
        type: "multiple_choice",
        question: "This book is ___ than that one.",
        choices: ["interesting", "more interesting", "most interesting", "interestinger"],
        correct_answer: "more interesting"
      },
      {
        type: "multiple_choice",
        question: "Mount Everest is the ___ mountain in the world.",
        choices: ["high", "higher", "highest", "most high"],
        correct_answer: "highest"
      }
    ],
    meta: {
      englishGrammarTopic: "Forming and using comparative (e.g., bigger, more beautiful) and superlative (e.g., biggest, most beautiful) adjectives in English to compare two or more nouns. Rules for short and long adjectives, and irregular forms."
    },
    additional_notes: "For short adjectives, add '-er' (comparative) and '-est' (superlative). For longer adjectives, use 'more' and 'most'. Some adjectives have irregular forms (e.g., good-better-best). AI will explain in Arabic.",
    common_mistakes: "Using 'more' with short adjectives that take '-er' (e.g., 'more big'). Incorrectly forming irregular comparatives/superlatives. AI will explain in Arabic."
  },
  {
    lesson_id: "present-continuous-intermediate",
    title: "Present Continuous Tense",
    title_arabic: "زمن المضارع المستمر",
    topic: "Grammar",
    topic_arabic: "قواعد",
    level: "Intermediate",
    arabic_explanation: "Master the Present Continuous tense for ongoing actions, temporary situations, and future plans. AI will provide an Arabic explanation and examples.",
    examples: [],
    interactive_exercises: [
      {
        type: "multiple_choice",
        question: "She ___ (read) a book right now.",
        choices: ["read", "reads", "is reading", "was reading"],
        correct_answer: "is reading"
      }
    ],
    meta: {
      englishGrammarTopic: "Present Continuous Tense (am/is/are + verb-ing): form, use for actions happening now, temporary situations, and future plans (arrangements)."
    },
    additional_notes: "Used for actions happening at the moment of speaking or around the present time. AI will explain in Arabic.",
    common_mistakes: "Using Present Simple instead of Present Continuous for actions happening now. Forgetting the 'be' verb. AI will explain in Arabic."
  },
  {
    lesson_id: "past-continuous-intermediate",
    title: "Past Continuous Tense",
    title_arabic: "زمن الماضي المستمر",
    topic: "Grammar",
    topic_arabic: "قواعد",
    level: "Intermediate",
    arabic_explanation: "Learn the Past Continuous tense for actions in progress in the past, often used with Past Simple. AI will provide an Arabic explanation and examples.",
    examples: [],
    interactive_exercises: [
      {
        type: "multiple_choice",
        question: "I ___ (watch) TV when the phone rang.",
        choices: ["watch", "watched", "am watching", "was watching"],
        correct_answer: "was watching"
      }
    ],
    meta: {
      englishGrammarTopic: "Past Continuous Tense (was/were + verb-ing): form, use for actions in progress at a specific time in the past, or actions interrupted by another past action (Past Simple)."
    },
    additional_notes: "Often used to set the scene for another action in the past. AI will explain in Arabic.",
    common_mistakes: "Using Past Simple when an action was in progress. Forgetting 'was/were'. AI will explain in Arabic."
  },
  {
    lesson_id: "future-simple-will-going-to-intermediate",
    title: "Future Simple: Will vs. Going to",
    title_arabic: "زمن المستقبل البسيط: Will مقابل Going to",
    topic: "Grammar",
    topic_arabic: "قواعد",
    level: "Intermediate",
    arabic_explanation: "Understand the difference between 'will' and 'be going to' for future actions, predictions, and plans. AI will provide an Arabic explanation and examples.",
    examples: [],
    interactive_exercises: [
      {
        type: "multiple_choice",
        question: "Look at those clouds! It ___ (rain).",
        choices: ["will rain", "is going to rain", "rains"],
        correct_answer: "is going to rain"
      }
    ],
    meta: {
      englishGrammarTopic: "Future Simple Tense: 'will' for predictions, spontaneous decisions, promises, offers; 'be going to' for plans, intentions, and predictions based on present evidence."
    },
    additional_notes: "'Will' is often used for spontaneous decisions; 'going to' for prior plans. AI will explain in Arabic.",
    common_mistakes: "Interchanging 'will' and 'going to' incorrectly, especially for plans vs. spontaneous decisions. AI will explain in Arabic."
  },
  {
    lesson_id: "possessive-pronouns-intermediate",
    title: "Possessive Pronouns",
    title_arabic: "ضمائر الملكية",
    topic: "Grammar",
    topic_arabic: "قواعد",
    level: "Intermediate",
    arabic_explanation: "Learn about possessive pronouns like mine, yours, his, hers, its, ours, theirs. AI will generate an Arabic explanation and examples.",
    examples: [],
    interactive_exercises: [
      {
        type: "multiple_choice",
        question: "This book is not your book. It's ___.",
        choices: ["my", "me", "mine", "I"],
        correct_answer: "mine"
      }
    ],
    meta: {
      englishGrammarTopic: "Possessive Pronouns (mine, yours, his, hers, its, ours, theirs) and their use to replace a possessive adjective + noun, showing ownership without a following noun."
    },
    additional_notes: "Possessive pronouns stand alone and do not precede a noun. AI will explain in Arabic.",
    common_mistakes: "Confusing possessive pronouns with possessive adjectives (e.g., 'This is mine book'). AI will explain in Arabic."
  },
  {
    lesson_id: "reflexive-pronouns-intermediate",
    title: "Reflexive Pronouns",
    title_arabic: "الضمائر الانعكاسية",
    topic: "Grammar",
    topic_arabic: "قواعد",
    level: "Intermediate",
    arabic_explanation: "Understand reflexive pronouns (myself, yourself, etc.) when the subject and object are the same. AI will generate an Arabic explanation and examples.",
    examples: [],
    interactive_exercises: [
      {
        type: "multiple_choice",
        question: "He cut ___ while shaving.",
        choices: ["he", "him", "himself", "his"],
        correct_answer: "himself"
      }
    ],
    meta: {
      englishGrammarTopic: "Reflexive Pronouns (myself, yourself, himself, herself, itself, ourselves, yourselves, themselves) used when the subject and the object of a verb are the same person or thing, or for emphasis."
    },
    additional_notes: "Reflexive pronouns reflect the action back to the subject. AI will explain in Arabic.",
    common_mistakes: "Using object pronouns instead of reflexive pronouns (e.g., 'He hurt him' when meaning himself). AI will explain in Arabic."
  },
  {
    lesson_id: "adverbs-manner-intermediate",
    title: "Adverbs of Manner",
    title_arabic: "ظروف الكيفية",
    topic: "Grammar",
    topic_arabic: "قواعد",
    level: "Intermediate",
    arabic_explanation: "Learn how adverbs describe actions (e.g., slowly, happily) and their formation. AI will provide an Arabic explanation and examples.",
    examples: [],
    interactive_exercises: [
      {
        type: "multiple_choice",
        question: "She sings ___.",
        choices: ["beautiful", "beautifully", "beauty", "beautify"],
        correct_answer: "beautifully"
      }
    ],
    meta: {
      englishGrammarTopic: "Adverbs of Manner (e.g., quickly, carefully, well): how they are formed (often by adding -ly to adjectives), their placement, and how they describe how an action is performed."
    },
    additional_notes: "Many adverbs of manner end in '-ly'. They usually go after the main verb or object. AI will explain in Arabic.",
    common_mistakes: "Using an adjective instead of an adverb of manner (e.g., 'He drives careful'). AI will explain in Arabic."
  },
  {
    lesson_id: "zero-conditional-intermediate",
    title: "Zero Conditional",
    title_arabic: "الجمل الشرطية (النوع صفر)",
    topic: "Grammar",
    topic_arabic: "قواعد",
    level: "Intermediate",
    arabic_explanation: "Understand Zero Conditional sentences for facts, general truths, and scientific laws. AI will generate an Arabic explanation and examples.",
    examples: [],
    interactive_exercises: [
      {
        type: "multiple_choice",
        question: "If you ___ water to 100°C, it ___.",
        choices: ["heat / boils", "heats / boil", "will heat / boils", "heat / will boil"],
        correct_answer: "heat / boils"
      }
    ],
    meta: {
      englishGrammarTopic: "Zero Conditional (If/When + present simple, ... present simple): structure and use for expressing general truths, facts, habits, and scientific laws that are always true."
    },
    additional_notes: "Used for situations that are always true. AI will explain in Arabic.",
    common_mistakes: "Using 'will' in zero conditional sentences. AI will explain in Arabic."
  },
  {
    lesson_id: "quantifiers-some-any-no-intermediate",
    title: "Quantifiers: Some, Any, No",
    title_arabic: "المحددات الكمية: Some, Any, No",
    topic: "Grammar",
    topic_arabic: "قواعد",
    level: "Intermediate",
    arabic_explanation: "Learn to use 'some' (affirmative), 'any' (negative/questions), and 'no' (affirmative with negative meaning). AI will provide an Arabic explanation and examples.",
    examples: [],
    interactive_exercises: [
      {
        type: "multiple_choice",
        question: "I don't have ___ money.",
        choices: ["some", "any", "no", "many"],
        correct_answer: "any"
      }
    ],
    meta: {
      englishGrammarTopic: "Using quantifiers 'some' (typically in affirmative sentences and offers/requests), 'any' (typically in negative sentences and questions), 'no' (in affirmative sentences to mean not any) with countable and uncountable nouns."
    },
    additional_notes: "'Some' is also used in questions when offering or requesting something. AI will explain in Arabic.",
    common_mistakes: "Using 'some' in general negative sentences or questions. Using 'no' with a negative verb (double negative). AI will explain in Arabic."
  },
  {
    lesson_id: "prepositions-time-intermediate",
    title: "Prepositions of Time (In, On, At - Expanded)",
    title_arabic: "حروف الجر الزمنية (In, On, At - موسع)",
    topic: "Grammar",
    topic_arabic: "قواعد",
    level: "Intermediate",
    arabic_explanation: "Deepen your understanding of prepositions of time (in, on, at) for months, years, days, dates, specific times. AI will generate an Arabic explanation and examples.",
    examples: [],
    interactive_exercises: [
      {
        type: "multiple_choice",
        question: "My birthday is ___ June.",
        choices: ["at", "on", "in", "by"],
        correct_answer: "in"
      }
    ],
    meta: {
      englishGrammarTopic: "Detailed use of prepositions of time 'in' (for longer periods: months, years, seasons, parts of the day like 'in the morning'), 'on' (for specific days and dates: 'on Monday', 'on July 4th'), 'at' (for specific times of day, night, weekend: 'at 5 PM', 'at night')."
    },
    additional_notes: "Remember 'in the morning/afternoon/evening' but 'at night'. AI will explain in Arabic.",
    common_mistakes: "Confusing 'in', 'on', and 'at' for different time expressions. AI will explain in Arabic."
  },
  {
    lesson_id: "quantifiers-much-many-lot-few-little-intermediate",
    title: "Quantifiers: Much, Many, A lot of, Few, Little",
    title_arabic: "المحددات الكمية: Many, Much, A lot of, Few, Little",
    topic: "Grammar",
    topic_arabic: "قواعد",
    level: "Intermediate",
    arabic_explanation: "Learn the use of quantifiers like much, many, a lot of, (a) few, (a) little with countable and uncountable nouns. AI will generate explanations and examples.",
    examples: [],
    interactive_exercises: [
      {
        type: "multiple_choice",
        question: "How ___ sugar do you want? (uncountable)",
        choices: ["much", "many", "a few", "few"],
        correct_answer: "much"
      },
      {
        type: "multiple_choice",
        question: "There are ___ apples left. (countable, small number)",
        choices: ["much", "a little", "a few", "many"],
        correct_answer: "a few"
      }
    ],
    additional_notes: "'Much' with uncountable nouns (often in questions/negatives), 'many' with countable nouns. 'A lot of' can be used with both. '(A) few' with countable, '(a) little' with uncountable. AI will detail in Arabic.",
    common_mistakes: "Using 'much' with countable nouns or 'many' with uncountable nouns. Confusing 'few'/'little' (negative connotation) with 'a few'/'a little' (positive connotation). AI will explain in Arabic.",
    meta: {
      englishGrammarTopic: "Quantifiers: 'much' (uncountable, ?/-), 'many' (countable, ?/-), 'a lot of/lots of' (both, +/?/-), '(a) few' (countable), '(a) little' (uncountable). Usage and nuances."
    }
  },
  {
    lesson_id: "modal-verbs-advanced",
    title: "Modal Verbs (Can, Could, May, Might, Must, Should)",
    title_arabic: "الأفعال المساعدة الشرطية (Modal Verbs)",
    topic: "Grammar",
    topic_arabic: "قواعد",
    level: "Advanced",
    arabic_explanation: "Explore the nuances of modal verbs in English to express ability, permission, possibility, obligation, and advice. AI will generate an in-depth Arabic explanation and varied examples.",
    examples: [],
    interactive_exercises: [
      {
        type: "multiple_choice",
        question: "You ___ study harder if you want to pass the exam.",
        choices: ["can", "must", "should", "may"],
        correct_answer: "should"
      },
      {
        type: "multiple_choice",
        question: "___ I borrow your pen, please?",
        choices: ["Must", "Should", "May", "Might"],
        correct_answer: "May"
      }
    ],
    meta: {
      englishGrammarTopic: "Modal Verbs in English (can, could, may, might, must, should, will, would, shall, ought to): Explaining their functions for ability, permission, possibility, speculation, obligation, advice, necessity, prohibition, and future/conditional contexts. Including nuances and differences in formality/certainty."
    },
    additional_notes: "Modal verbs are followed by the base form of the main verb (e.g., 'can go', not 'can goes' or 'can to go'). 'Could' and 'might' often express more politeness or less certainty than 'can' and 'may'. AI will explain in Arabic.",
    common_mistakes: "Using 'to' after a modal verb (e.g., 'must to study'). Using past tense forms of main verbs after modals (e.g., 'should went'). Confusing 'must' (strong obligation) with 'should' (advice). AI will explain in Arabic."
  },
  {
    lesson_id: "present-perfect-tense-advanced",
    title: "Present Perfect Tense",
    title_arabic: "زمن المضارع التام",
    topic: "Grammar",
    topic_arabic: "قواعد",
    level: "Advanced",
    arabic_explanation: "Master the Present Perfect tense to talk about past actions connected to the present. AI will provide an Arabic explanation and examples.",
    examples: [],
    interactive_exercises: [
      {
        type: "multiple_choice",
        question: "She ___ (to visit) Paris three times.",
        choices: ["visit", "visited", "has visited", "had visited"],
        correct_answer: "has visited"
      },
      {
        type: "multiple_choice",
        question: "I ___ (not see) that movie yet.",
        choices: ["don't see", "didn't see", "haven't seen", "hadn't seen"],
        correct_answer: "haven't seen"
      }
    ],
    meta: {
      englishGrammarTopic: "Present Perfect Tense in English (have/has + past participle): Usage for actions completed at an unspecified time in the past with relevance to the present, actions that started in the past and continue to the present, life experiences, and recent events. Contrast with Past Simple. Introduction to Present Perfect Continuous."
    },
    additional_notes: "Key signal words for Present Perfect include 'ever', 'never', 'already', 'yet', 'just', 'for', 'since'. AI will explain in Arabic.",
    common_mistakes: "Confusing Present Perfect with Past Simple (e.g., using Present Perfect for an action with a specific past time: 'I have visited Paris yesterday'). Incorrect past participle forms. AI will explain in Arabic."
  },
  {
    lesson_id: "conditional-sentences-type-1-advanced",
    title: "Conditional Sentences - Type 1",
    title_arabic: "الجمل الشرطية - النوع الأول",
    topic: "Grammar",
    topic_arabic: "قواعد",
    level: "Advanced",
    arabic_explanation: "Learn to form and use Type 1 conditional sentences for real future possibilities. AI will generate an Arabic explanation and examples.",
    examples: [],
    interactive_exercises: [
      {
        type: "multiple_choice",
        question: "If it __ (to rain) tomorrow, we ___ (to stay) home.",
        choices: ["rains / will stay", "will rain / stay", "rained / would stay", "rains / stay"],
        correct_answer: "rains / will stay"
      },
      {
        type: "multiple_choice",
        question: "You will pass the exam if you ___ (to study) hard.",
        choices: ["study", "will study", "studied", "would study"],
        correct_answer: "study"
      }
    ],
    meta: {
      englishGrammarTopic: "First Conditional Sentences in English (If + present simple, ...will/can/may/should + base verb): Structure, usage for expressing real and possible future conditions and their results. Variations with modals other than 'will'."
    },
    additional_notes: "The 'if' clause describes the condition, and the main clause describes the result. The order of clauses can be switched without changing the meaning (e.g., 'We will stay home if it rains tomorrow'). AI will explain in Arabic.",
    common_mistakes: "Using 'will' in the 'if' clause (e.g., 'If it will rain...'). Using incorrect tense combinations. AI will explain in Arabic."
  },
  {
    lesson_id: "past-perfect-tense-advanced",
    title: "Past Perfect Tense",
    title_arabic: "زمن الماضي التام",
    topic: "Grammar",
    topic_arabic: "قواعد",
    level: "Advanced",
    arabic_explanation: "Master the Past Perfect tense (had + past participle) for actions completed before another past action. AI will provide an Arabic explanation and examples.",
    examples: [],
    interactive_exercises: [
      {
        type: "multiple_choice",
        question: "By the time I arrived, she ___ (leave).",
        choices: ["leave", "left", "has left", "had left"],
        correct_answer: "had left"
      }
    ],
    meta: {
      englishGrammarTopic: "Past Perfect Tense (had + past participle): form and use for an action completed before another action or specific time in the past. Contrast with Past Simple."
    },
    additional_notes: "Often used with time expressions like 'by the time', 'already', 'before', 'after'. AI will explain in Arabic.",
    common_mistakes: "Using Past Simple when Past Perfect is needed to clarify the sequence of past events. AI will explain in Arabic."
  },
  {
    lesson_id: "future-continuous-tense-advanced",
    title: "Future Continuous Tense",
    title_arabic: "زمن المستقبل المستمر",
    topic: "Grammar",
    topic_arabic: "قواعد",
    level: "Advanced",
    arabic_explanation: "Learn the Future Continuous tense (will be + -ing) for ongoing actions in the future. AI will provide an Arabic explanation and examples.",
    examples: [],
    interactive_exercises: [
      {
        type: "multiple_choice",
        question: "This time tomorrow, I ___ (fly) to Paris.",
        choices: ["fly", "will fly", "will be flying", "am flying"],
        correct_answer: "will be flying"
      }
    ],
    meta: {
      englishGrammarTopic: "Future Continuous Tense (will be + verb-ing): form and use for actions that will be in progress at a specific time in the future, or for planned future events."
    },
    additional_notes: "Emphasizes the duration of an activity in the future. AI will explain in Arabic.",
    common_mistakes: "Using Future Simple when Future Continuous is more appropriate for ongoing future actions. AI will explain in Arabic."
  },
  {
    lesson_id: "future-perfect-tense-advanced",
    title: "Future Perfect Tense",
    title_arabic: "زمن المستقبل التام",
    topic: "Grammar",
    topic_arabic: "قواعد",
    level: "Advanced",
    arabic_explanation: "Explore the Future Perfect tense (will have + past participle) for actions completed by a future time. AI will provide an Arabic explanation and examples.",
    examples: [],
    interactive_exercises: [
      {
        type: "multiple_choice",
        question: "By next year, I ___ (finish) my studies.",
        choices: ["finish", "will finish", "will be finishing", "will have finished"],
        correct_answer: "will have finished"
      }
    ],
    meta: {
      englishGrammarTopic: "Future Perfect Tense (will have + past participle): form and use for actions that will be completed by or before a certain time in the future."
    },
    additional_notes: "Often used with 'by' + future time expression. AI will explain in Arabic.",
    common_mistakes: "Using Future Simple instead of Future Perfect for actions completed by a future point. AI will explain in Arabic."
  },
  {
    lesson_id: "conditional-sentences-type-2-advanced",
    title: "Conditional Sentences - Type 2",
    title_arabic: "الجمل الشرطية - النوع الثاني",
    topic: "Grammar",
    topic_arabic: "قواعد",
    level: "Advanced",
    arabic_explanation: "Understand Type 2 conditional sentences (If + past simple, ...would + base verb) for hypothetical situations. AI will generate an Arabic explanation and examples.",
    examples: [],
    interactive_exercises: [
      {
        type: "multiple_choice",
        question: "If I ___ (win) the lottery, I ___ (buy) a house.",
        choices: ["win / will buy", "won / would buy", "win / would buy", "won / will buy"],
        correct_answer: "won / would buy"
      }
    ],
    meta: {
      englishGrammarTopic: "Second Conditional Sentences (If + past simple, ...would/could/might + base verb): structure and use for hypothetical, unlikely, or unreal situations in the present or future."
    },
    additional_notes: "Use 'were' instead of 'was' for 'I/he/she/it' in the 'if' clause (e.g., 'If I were you...'). AI will explain in Arabic.",
    common_mistakes: "Using 'would' in the 'if' clause. Using Present Simple instead of Past Simple in the 'if' clause. AI will explain in Arabic."
  },
  {
    lesson_id: "conditional-sentences-type-3-advanced",
    title: "Conditional Sentences - Type 3",
    title_arabic: "الجمل الشرطية - النوع الثالث",
    topic: "Grammar",
    topic_arabic: "قواعد",
    level: "Advanced",
    arabic_explanation: "Learn Type 3 conditional sentences (If + past perfect, ...would have + past participle) for past unreal situations. AI will generate an Arabic explanation and examples.",
    examples: [],
    interactive_exercises: [
      {
        type: "multiple_choice",
        question: "If I ___ (study) harder, I ___ (pass) the exam.",
        choices: ["had studied / would pass", "studied / would have passed", "had studied / would have passed", "studied / would pass"],
        correct_answer: "had studied / would have passed"
      }
    ],
    meta: {
      englishGrammarTopic: "Third Conditional Sentences (If + past perfect, ...would/could/might have + past participle): structure and use for hypothetical situations in the past that did not happen, and their unreal past results."
    },
    additional_notes: "Used to talk about regrets or different outcomes in the past. AI will explain in Arabic.",
    common_mistakes: "Incorrect tense combinations, e.g., using 'would' instead of 'would have'. AI will explain in Arabic."
  },
  {
    lesson_id: "reported-speech-advanced",
    title: "Reported Speech (Statements)",
    title_arabic: "الكلام المنقول (الجمل الخبرية)",
    topic: "Grammar",
    topic_arabic: "قواعد",
    level: "Advanced",
    arabic_explanation: "Master reported speech (indirect speech) for statements, including tense backshift and changes in pronouns/time. AI will generate an Arabic explanation and examples.",
    examples: [],
    interactive_exercises: [
      {
        type: "multiple_choice",
        question: "Direct: 'I am tired.' Reported: She said that she ___ tired.",
        choices: ["is", "am", "was", "were"],
        correct_answer: "was"
      }
    ],
    meta: {
      englishGrammarTopic: "Reported Speech (Indirect Speech) for statements: tense backshift rules (e.g., present simple to past simple), changes in pronouns, and changes in time and place expressions when reporting what someone said."
    },
    additional_notes: "Tenses usually shift back one step (e.g., Present Simple -> Past Simple, Past Simple -> Past Perfect). AI will explain in Arabic.",
    common_mistakes: "Forgetting to backshift tenses or change pronouns/time expressions correctly. AI will explain in Arabic."
  },
  {
    lesson_id: "passive-voice-present-past-simple-advanced",
    title: "Passive Voice (Present & Past Simple)",
    title_arabic: "المبني للمجهول (المضارع البسيط والماضي البسيط)",
    topic: "Grammar",
    topic_arabic: "قواعد",
    level: "Advanced",
    arabic_explanation: "Understand and use the Passive Voice in Present Simple and Past Simple. AI will generate an Arabic explanation and examples.",
    examples: [],
    interactive_exercises: [
      {
        type: "multiple_choice",
        question: "Active: 'Someone built this house.' Passive: 'This house ___ by someone.'",
        choices: ["is built", "was built", "builds", "has built"],
        correct_answer: "was built"
      }
    ],
    meta: {
      englishGrammarTopic: "Passive Voice: form (to be + past participle) and use in Present Simple (is/are + p.p.) and Past Simple (was/were + p.p.) when the focus is on the action or the receiver of the action, rather than the agent (doer)."
    },
    additional_notes: "The object of the active sentence becomes the subject of the passive sentence. AI will explain in Arabic.",
    common_mistakes: "Incorrect form of 'to be' or past participle. Forgetting 'by' when mentioning the agent. AI will explain in Arabic."
  },
  {
    lesson_id: "gerunds-infinitives-intro-advanced",
    title: "Gerunds and Infinitives (Introduction)",
    title_arabic: "المصادر وأفعال المصدر (مقدمة)",
    topic: "Grammar",
    topic_arabic: "قواعد",
    level: "Advanced",
    arabic_explanation: "Learn the basics of Gerunds (verb-ing as noun) and Infinitives (to + verb) and their common uses. AI will generate an Arabic explanation and examples.",
    examples: [],
    interactive_exercises: [
      {
        type: "multiple_choice",
        question: "___ (swim) is my favorite hobby.",
        choices: ["Swim", "To swim", "Swimming", "Swam"],
        correct_answer: "Swimming"
      }
    ],
    meta: {
      englishGrammarTopic: "Introduction to Gerunds (verb + -ing form used as a noun) and Infinitives (to + base form of the verb): their forms and common uses (e.g., as subjects, objects, after certain verbs, after prepositions for gerunds)."
    },
    additional_notes: "Some verbs are followed by gerunds, others by infinitives, and some by both with different meanings. AI will explain in Arabic.",
    common_mistakes: "Using an infinitive where a gerund is required (e.g., after prepositions) and vice-versa. AI will explain in Arabic."
  },
  {
    lesson_id: "mixed-conditionals-advanced",
    title: "Mixed Conditional Sentences",
    title_arabic: "الجمل الشرطية المختلطة",
    topic: "Grammar",
    topic_arabic: "قواعد",
    level: "Advanced",
    arabic_explanation: "Understand mixed conditional sentences, which combine different time frames in the if-clause and the main clause (e.g., past condition with present result). AI will generate explanations and examples.",
    examples: [],
    interactive_exercises: [
      {
        type: "multiple_choice",
        question: "If he had taken the map (past), he ___ lost now (present).",
        choices: ["would not be", "would not have been", "is not", "will not be"],
        correct_answer: "would not be"
      }
    ],
    additional_notes: "Mixed conditionals allow for more nuanced expressions of hypothetical situations linking different times. Common types are past condition/present result, and present condition/past result. AI will detail in Arabic.",
    common_mistakes: "Using incorrect tense combinations for the desired time frame link. AI will explain in Arabic.",
    meta: {
      englishGrammarTopic: "Mixed Conditional Sentences: Combining different conditional types, typically Type 2 and Type 3, to express hypothetical links between different time frames (e.g., past condition affecting present result, or present condition affecting past result)."
    }
  },
  {
    lesson_id: "articles-a-an-basic-beginner",
    title: "Articles: A/An (Basic)",
    title_arabic: "أدوات التنكير: A/An (أساسي)",
    topic: "Grammar",
    topic_arabic: "قواعد",
    level: "Beginner",
    arabic_explanation: "Learn the very basics of using 'a' and 'an' with singular countable nouns. AI will generate detailed explanations and examples in Arabic.",
    examples: [],
    interactive_exercises: [
      {
        type: "multiple_choice",
        question: "I see ___ apple.",
        choices: ["a", "an", "the"],
        correct_answer: "an"
      },
      {
        type: "multiple_choice",
        question: "That is ___ big dog.",
        choices: ["a", "an", "the"],
        correct_answer: "a"
      }
    ],
    additional_notes: "Use 'an' before words starting with a vowel sound (a, e, i, o, u sounds). Use 'a' before words starting with a consonant sound. AI will provide more details.",
    common_mistakes: "Using 'a' before a vowel sound or 'an' before a consonant sound. Forgetting to use an article with a singular countable noun. AI will explain further.",
    meta: {
      englishGrammarTopic: "Basic usage of indefinite articles 'a' and 'an' with singular countable nouns, focusing on the sound of the first letter of the following word."
    }
  },
  {
    lesson_id: "plural-nouns-regular-beginner",
    title: "Plural Nouns (Regular -s, -es)",
    title_arabic: "أسماء الجمع (المنتظمة بإضافة -s, -es)",
    topic: "Grammar",
    topic_arabic: "قواعد",
    level: "Beginner",
    arabic_explanation: "Learn how to form regular plural nouns by adding -s or -es. AI will generate detailed explanations and examples in Arabic.",
    examples: [],
    interactive_exercises: [
      {
        type: "multiple_choice",
        question: "One cat, two ___.",
        choices: ["cat", "cats", "cates"],
        correct_answer: "cats"
      },
      {
        type: "multiple_choice",
        question: "One box, three ___.",
        choices: ["box", "boxs", "boxes"],
        correct_answer: "boxes"
      }
    ],
    additional_notes: "Most nouns add -s. Nouns ending in -s, -sh, -ch, -x, or -z add -es. AI will provide more rules and examples.",
    common_mistakes: "Forgetting to add -s or -es. Adding -s when -es is needed, or vice-versa. AI will explain.",
    meta: {
      englishGrammarTopic: "Forming regular plural nouns in English by adding -s or -es based on the ending of the singular noun."
    }
  },
  {
    lesson_id: "present-perfect-vs-past-simple-intermediate",
    title: "Present Perfect vs. Past Simple",
    title_arabic: "المضارع التام مقابل الماضي البسيط",
    topic: "Grammar",
    topic_arabic: "قواعد",
    level: "Intermediate",
    arabic_explanation: "Understand the key differences between Present Perfect (for actions with present relevance or unspecified past time) and Past Simple (for completed actions at a specific past time). AI will generate detailed explanations and examples in Arabic.",
    examples: [],
    interactive_exercises: [
      {
        type: "multiple_choice",
        question: "I ___ (visit) Paris last year.",
        choices: ["have visited", "visited", "visit"],
        correct_answer: "visited"
      },
      {
        type: "multiple_choice",
        question: "She ___ (never/eat) sushi before.",
        choices: ["has never eaten", "never ate", "didn't never eat"],
        correct_answer: "has never eaten"
      }
    ],
    additional_notes: "Past Simple is used with specific past time markers (yesterday, last week). Present Perfect often connects past actions to the present. AI will elaborate.",
    common_mistakes: "Using Present Perfect with specific past time adverbs. Using Past Simple for experiences without a specific time. AI will explain further.",
    meta: {
      englishGrammarTopic: "Contrasting Present Perfect Tense (have/has + past participle) with Past Simple Tense (-ed/irregular forms) based on time reference, completion, and relevance to the present."
    }
  },
  {
    lesson_id: "gerunds-subjects-objects-intermediate",
    title: "Gerunds as Subjects and Objects",
    title_arabic: "المصادر كفاعل ومفعول به",
    topic: "Grammar",
    topic_arabic: "قواعد",
    level: "Intermediate",
    arabic_explanation: "Learn how gerunds (verb + -ing) can function as subjects or objects in a sentence. AI will generate detailed explanations and examples in Arabic.",
    examples: [],
    interactive_exercises: [
      {
        type: "multiple_choice",
        question: "___ (Read) books is my favorite activity.",
        choices: ["To read", "Reading", "Read"],
        correct_answer: "Reading"
      },
      {
        type: "multiple_choice",
        question: "I enjoy ___ (listen) to music.",
        choices: ["to listen", "listening", "listen"],
        correct_answer: "listening"
      }
    ],
    additional_notes: "Gerunds act like nouns. Many verbs are followed by gerunds as objects (e.g., enjoy, finish, avoid). AI will list more.",
    common_mistakes: "Using an infinitive instead of a gerund after certain verbs or as a subject when the gerund form is more natural. AI will explain.",
    meta: {
      englishGrammarTopic: "Using gerunds (verb + -ing form) as nouns, specifically as the subject of a sentence or the object of a verb or preposition."
    }
  },
  {
    lesson_id: "relative-clauses-advanced",
    title: "Relative Clauses (Defining and Non-defining)",
    title_arabic: "الجمل الموصولة (المُعَرِّفة وغير المُعَرِّفة)",
    topic: "Grammar",
    topic_arabic: "قواعد",
    level: "Advanced",
    arabic_explanation: "Master defining and non-defining relative clauses using who, whom, whose, which, that. AI will generate detailed explanations and examples in Arabic.",
    examples: [],
    interactive_exercises: [
      {
        type: "multiple_choice",
        question: "The man ___ lives next door is a doctor. (defining)",
        choices: ["who", "which", "whose"],
        correct_answer: "who"
      },
      {
        type: "multiple_choice",
        question: "My brother, ___ lives in London, is visiting me. (non-defining)",
        choices: ["that", "who", "which (for person)"],
        correct_answer: "who"
      }
    ],
    additional_notes: "Defining clauses provide essential information. Non-defining clauses add extra, non-essential information and are set off by commas. 'That' is often used in defining clauses but not non-defining ones. AI will elaborate.",
    common_mistakes: "Using 'that' in non-defining clauses. Omitting commas in non-defining clauses. Using the wrong relative pronoun. AI will explain further.",
    meta: {
      englishGrammarTopic: "Relative Clauses: Forming and using defining (restrictive) and non-defining (non-restrictive) relative clauses with relative pronouns (who, whom, whose, which, that) and relative adverbs (where, when, why)."
    }
  },
  {
    lesson_id: "subjunctive-mood-advanced",
    title: "Subjunctive Mood",
    title_arabic: "صيغة التمني/الشرط (Subjunctive)",
    topic: "Grammar",
    topic_arabic: "قواعد",
    level: "Advanced",
    arabic_explanation: "Understand the subjunctive mood for wishes, suggestions, demands, and hypothetical situations. AI will generate detailed explanations and examples in Arabic.",
    examples: [],
    interactive_exercises: [
      {
        type: "multiple_choice",
        question: "I wish I ___ (be) taller.",
        choices: ["am", "was", "were"],
        correct_answer: "were"
      },
      {
        type: "multiple_choice",
        question: "The manager insisted that the report ___ (finish) by Friday.",
        choices: ["is finished", "be finished", "was finished"],
        correct_answer: "be finished"
      }
    ],
    additional_notes: "The subjunctive often uses the base form of the verb (e.g., 'I suggest he go') or 'were' instead of 'was' (e.g., 'If I were you'). AI will provide more contexts.",
    common_mistakes: "Using indicative mood instead of subjunctive where required, especially after verbs of demand, suggestion, or in unreal conditions. AI will explain.",
    meta: {
      englishGrammarTopic: "The Subjunctive Mood in English: Present subjunctive (base form of verb for demands, suggestions, e.g., 'I suggest he *be* on time') and Past subjunctive (simple past form, e.g., 'If I *were* you', 'I wish I *knew*') for wishes, hypothetical situations, and formal requests."
    }
  }
];

function isBuildTime() {
  return typeof window === "undefined";
}

const CLOUDFLARE_ACCOUNT_ID$1 = process.env.NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_ID;
const CLOUDFLARE_API_TOKEN$1 = process.env.CLOUDFLARE_API_TOKEN;
objectType({
  text: unionType([stringType(), arrayType(stringType())]).describe("The text or array of texts to be translated."),
  sourceLanguage: stringType().default("en").describe('The source language code (e.g., "en" for English).'),
  targetLanguage: stringType().describe('The target language for translation (e.g., "ar" for Arabic).')
});
async function translateText({ text, sourceLanguage = "en", targetLanguage }) {
  if (isBuildTime() && (!CLOUDFLARE_ACCOUNT_ID$1 || !CLOUDFLARE_API_TOKEN$1)) {
    if (Array.isArray(text)) {
      return { translation: text.map(() => "محتوى مؤقت - سيتم تحديثه عند التشغيل") };
    }
    return { translation: "محتوى مؤقت - سيتم تحديثه عند التشغيل" };
  }
  if (!CLOUDFLARE_ACCOUNT_ID$1 || !CLOUDFLARE_API_TOKEN$1) {
    throw new Error("Cloudflare AI credentials are not set in the environment variables.");
  }
  const isBatch = Array.isArray(text);
  const url = `https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID$1}/ai/run/@cf/meta/m2m100-1.2b`;
  let body;
  if (isBatch) {
    body = {
      requests: text.map((t) => ({
        text: t,
        source_lang: sourceLanguage,
        target_lang: targetLanguage
      }))
    };
  } else {
    body = {
      text,
      source_lang: sourceLanguage,
      target_lang: targetLanguage
    };
  }
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${CLOUDFLARE_API_TOKEN$1}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });
  if (!response.ok) {
    const errorText = await response.text();
    console.error(`Cloudflare AI API error for translation model:`, errorText);
    throw new Error(`Cloudflare AI API request failed: ${response.statusText}`);
  }
  const jsonResponse = await response.json();
  if (isBatch) {
    if (jsonResponse.result && Array.isArray(jsonResponse.result)) {
      const translations = jsonResponse.result.map((item) => item.translated_text.trim());
      return { translation: translations };
    }
  } else {
    if (jsonResponse.result && jsonResponse.result.translated_text) {
      const translation = jsonResponse.result.translated_text;
      return { translation: translation.trim() };
    }
  }
  console.error("Unexpected translation API response structure:", jsonResponse);
  throw new Error("Failed to parse translation from AI response.");
}

const CLOUDFLARE_API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;
const CLOUDFLARE_ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;
if (typeof window !== "undefined" && (!CLOUDFLARE_ACCOUNT_ID || !CLOUDFLARE_API_TOKEN)) {
  console.warn("Cloudflare Account ID or API Token not set - AI features may not work. Set them in Cloudflare Pages environment variables.");
}
async function runAi({ model, inputs, stream = false }) {
  if (!CLOUDFLARE_ACCOUNT_ID || !CLOUDFLARE_API_TOKEN) {
    throw new Error("Cloudflare AI credentials are not set in the environment variables.");
  }
  const isImageOrAudio = model.includes("stable-diffusion") || model.includes("melotts") || model.includes("whisper");
  const isTextGeneration = model.includes("llama");
  const directUrl = `https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/ai/run/${model}`;
  let body;
  const headers = { "Authorization": `Bearer ${CLOUDFLARE_API_TOKEN}` };
  if (model.includes("whisper") && "audio" in inputs && (inputs.audio instanceof Buffer || inputs.audio instanceof Uint8Array)) {
    headers["Content-Type"] = "application/octet-stream";
    body = inputs.audio;
  } else {
    headers["Content-Type"] = "application/json";
    body = JSON.stringify({
      ...isTextGeneration && stream ? { stream: true } : {},
      ...inputs
    });
  }
  const response = await fetch(directUrl, {
    method: "POST",
    headers,
    body
  });
  if (!response.ok) {
    const errorText = await response.text();
    console.error(`Cloudflare AI API error for model ${model}:`, errorText);
    throw new Error(`Cloudflare AI request failed: ${response.statusText}`);
  }
  if (stream) {
    return response;
  }
  if (isImageOrAudio) {
    return response;
  }
  const jsonResponse = await response.json();
  return new Response(JSON.stringify({ result: jsonResponse }), {
    headers: { "Content-Type": "application/json" },
    status: 200
  });
}

objectType({
  grammarTopic: stringType().describe("The specific English grammar topic to be explained."),
  level: stringType().describe("The level of the student (e.g., Beginner, Intermediate).")
});
async function generateArabicExplanation(input) {
  const { grammarTopic, level } = input;
  if (isBuildTime() && (!process.env.CLOUDFLARE_ACCOUNT_ID || !process.env.CLOUDFLARE_API_TOKEN)) {
    return {
      arabicExplanation: `شرح مؤقت لموضوع "${grammarTopic}" للمستوى ${level}. سيتم تحديث هذا المحتوى عند تشغيل التطبيق.`
    };
  }
  const prompt = `Please provide a detailed explanation in Arabic for the following English grammar topic: "${grammarTopic}".
The explanation should be clear, easy to understand, and suitable for a student at the "${level}" level.
Use examples where appropriate to illustrate the concepts.
Your response should ONLY be the Arabic explanation text, without any introductory phrases like "Here is the explanation:".`;
  const messages = [
    { role: "system", content: "You are an expert English grammar teacher who is fluent in both English and Arabic. Your task is to provide a clear, comprehensive, and natural-sounding explanation of a given English grammar topic entirely in Arabic." },
    { role: "user", content: prompt }
  ];
  try {
    const response = await runAi({ model: "@cf/meta/llama-3-8b-instruct", inputs: { messages } });
    const jsonResponse = await response.json();
    const explanation = jsonResponse.result.response;
    return { arabicExplanation: explanation };
  } catch (error) {
    console.error("Failed to generate AI explanation:", error);
    return {
      arabicExplanation: `شرح مؤقت لموضوع "${grammarTopic}" للمستوى ${level}. حدث خطأ في توليد المحتوى.`
    };
  }
}

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro();
async function getStaticPaths() {
  return lessons.map((lesson) => ({
    params: { lesson_id: lesson.lesson_id },
    props: { lesson }
  }));
}
const $$lessonId = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$lessonId;
  const { lesson } = Astro2.props;
  let enhancedLesson = JSON.parse(JSON.stringify(lesson));
  try {
    const [
      explanationResponse,
      translatedExamples,
      translatedNotes,
      translatedMistakes
    ] = await Promise.all([
      generateArabicExplanation({
        grammarTopic: lesson.meta?.englishGrammarTopic || lesson.title,
        level: lesson.level
      }),
      Promise.all(lesson.examples.map(async (ex) => {
        const [translatedEnglish, translatedArabic] = await Promise.all([
          translateText({ text: ex.english, targetLanguage: "ar", sourceLanguage: "en" }),
          translateText({ text: ex.arabic, targetLanguage: "ar", sourceLanguage: "en" })
        ]);
        return {
          english: ex.english,
          arabic: translatedArabic.translation,
          imagePrompt: ex.imagePrompt
        };
      })),
      lesson.additional_notes ? translateText({ text: lesson.additional_notes, targetLanguage: "ar", sourceLanguage: "en" }) : Promise.resolve(null),
      lesson.common_mistakes ? translateText({ text: lesson.common_mistakes, targetLanguage: "ar", sourceLanguage: "en" }) : Promise.resolve(null)
    ]);
    enhancedLesson.arabic_explanation = explanationResponse.arabicExplanation;
    enhancedLesson.examples = translatedExamples;
    enhancedLesson.additional_notes_arabic = translatedNotes?.translation;
    enhancedLesson.common_mistakes_arabic = translatedMistakes?.translation;
  } catch (error) {
    console.error("Failed to generate or translate lesson content:", lesson.lesson_id, error);
    const topic = lesson.meta?.englishGrammarTopic || lesson.title;
    enhancedLesson.arabic_explanation = `\u0634\u0631\u062D \u0645\u0624\u0642\u062A \u0644\u0645\u0648\u0636\u0648\u0639 "${topic}" \u0644\u0644\u0645\u0633\u062A\u0648\u0649 ${lesson.level}. \u0633\u064A\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0647\u0630\u0627 \u0627\u0644\u0645\u062D\u062A\u0648\u0649 \u0639\u0646\u062F \u062A\u0634\u063A\u064A\u0644 \u0627\u0644\u062A\u0637\u0628\u064A\u0642.`;
    enhancedLesson.examples = lesson.examples.map((ex) => ({
      ...ex,
      arabic: "\u0645\u062B\u0627\u0644 \u0645\u0624\u0642\u062A - \u0633\u064A\u062A\u0645 \u062A\u062D\u062F\u064A\u062B\u0647 \u0639\u0646\u062F \u0627\u0644\u062A\u0634\u063A\u064A\u0644"
    }));
    enhancedLesson.additional_notes_arabic = "\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0645\u0624\u0642\u062A\u0629 - \u0633\u062A\u062A\u0645 \u062A\u062D\u062F\u064A\u062B\u0647\u0627 \u0639\u0646\u062F \u0627\u0644\u062A\u0634\u063A\u064A\u0644";
    enhancedLesson.common_mistakes_arabic = "\u0623\u062E\u0637\u0627\u0621 \u0634\u0627\u0626\u0639\u0629 \u0645\u0624\u0642\u062A\u0629 - \u0633\u062A\u062A\u0645 \u062A\u062D\u062F\u064A\u062B\u0647\u0627 \u0639\u0646\u062F \u0627\u0644\u062A\u0634\u063A\u064A\u0644";
  }
  return renderTemplate(_a || (_a = __template(['<html lang="en"> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>', " - Learn English</title>", '</head> <body> <div id="lesson-root"></div> ', ' <script type="application/json">', "<\/script></body></html>"])), enhancedLesson.title, renderHead(), renderScript($$result, "C:/Users/trust/Downloads/8tl09pl09pl09l9/TERM2-main/src/pages/lessons/[lesson_id].astro?astro&type=script&index=0&lang.ts"), unescapeHTML(JSON.stringify(enhancedLesson)));
}, "C:/Users/trust/Downloads/8tl09pl09pl09l9/TERM2-main/src/pages/lessons/[lesson_id].astro", void 0);

const $$file = "C:/Users/trust/Downloads/8tl09pl09pl09l9/TERM2-main/src/pages/lessons/[lesson_id].astro";
const $$url = "/lessons/[lesson_id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$lessonId,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

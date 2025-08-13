
export interface AiLesson {
  id: string;
  title: string;
  image: string;
  image_hint: string;
  content: string;
  questions: {
    question: string;
    options: string[];
    answer: string;
  }[];
}

export const aiLessons: AiLesson[] = [
  {
    id: 'llm',
    title: "What is an LLM?",
    image: "https://placehold.co/600x400/7E57C2/FFFFFF.png?text=LLM",
    image_hint: "neural network",
    content: "A Large Language Model (LLM) is a type of artificial intelligence that is trained on a massive amount of text data. This training allows it to understand, generate, and respond to human language in a coherent and contextually relevant way. Think of it like a very advanced autocomplete that can write essays, answer questions, translate languages, and even write code. They learn patterns, grammar, and facts from the data they are trained on.",
    questions: [
      {
        question: "What is the primary function of an LLM?",
        options: ["To create images", "To understand and generate human language", "To play games", "To control robots"],
        answer: "To understand and generate human language"
      },
      {
        question: "How do LLMs learn?",
        options: ["By watching videos", "From a small set of rules", "By being trained on massive amounts of text data", "By talking to people"],
        answer: "By being trained on massive amounts of text data"
      },
      {
        question: "Which of these is a task an LLM can perform?",
        options: ["Drive a car", "Perform surgery", "Write a poem", "Cook dinner"],
        answer: "Write a poem"
      }
    ]
  },
  {
    id: 'generative-ai',
    title: "What is Generative AI?",
    image: "https://placehold.co/600x400/42A5F5/FFFFFF.png?text=GenAI",
    image_hint: "art creation",
    content: "Generative AI is a broad category of artificial intelligence that can create new, original content, rather than just analyzing or acting on existing data. This content can include text, images, music, and code. Large Language Models (LLMs) are a type of Generative AI that focuses on text. Other types of generative models can create realistic images from a text description or compose a new piece of music in a certain style. The key idea is 'generation' or 'creation' of something new.",
    questions: [
      {
        question: "What is the main capability of Generative AI?",
        options: ["Analyzing data", "Categorizing information", "Creating new content", "Following instructions"],
        answer: "Creating new content"
      },
      {
        question: "Is an LLM a type of Generative AI?",
        options: ["Yes", "No", "Only for images", "Only for music"],
        answer: "Yes"
      },
      {
        question: "Which of the following can Generative AI create?",
        options: ["Only text", "Only images", "Only music", "Text, images, music, and more"],
        answer: "Text, images, music, and more"
      }
    ]
  },
  {
    id: 'data-science',
    title: "What is Data Science?",
    image: "https://placehold.co/600x400/66BB6A/FFFFFF.png?text=Data",
    image_hint: "graphs charts",
    content: "Data Science is a field that uses scientific methods, processes, algorithms, and systems to extract knowledge and insights from structured and unstructured data. It's about finding patterns. Data scientists clean, prepare, and analyze large sets of data to discover trends. These insights can then be used to make better decisions, predict future events, or understand customer behavior. It combines statistics, computer science, and business knowledge.",
    questions: [
      {
        question: "What is the main goal of Data Science?",
        options: ["To write code", "To create websites", "To extract knowledge and insights from data", "To store data securely"],
        answer: "To extract knowledge and insights from data"
      },
      {
        question: "Which field is NOT typically a part of data science?",
        options: ["Statistics", "Computer Science", "Business Knowledge", "Marine Biology"],
        answer: "Marine Biology"
      },
      {
        question: "What is a common task for a data scientist?",
        options: ["Designing logos", "Finding patterns in data", "Writing news articles", "Repairing computers"],
        answer: "Finding patterns in data"
      }
    ]
  },
  {
    id: 'reasoning',
    title: "What is AI Reasoning?",
    image: "https://placehold.co/600x400/FFA726/FFFFFF.png?text=AI",
    image_hint: "robot thinking",
    content: "AI Reasoning is the ability of an artificial intelligence system to think logically, make connections, and draw conclusions from information it has. It's about going beyond just pattern matching. For example, an AI with reasoning can solve multi-step problems, understand cause and effect, or plan a series of actions to achieve a goal. It involves using facts and rules to make inferences about the world, much like how humans solve puzzles or make plans.",
    questions: [
      {
        question: "AI Reasoning is about...",
        options: ["Memorizing facts", "Thinking logically to draw conclusions", "Recognizing images", "Generating text"],
        answer: "Thinking logically to draw conclusions"
      },
      {
        question: "Which task requires AI reasoning?",
        options: ["Translating a word", "Identifying a cat in a photo", "Planning a holiday itinerary", "Repeating a sentence"],
        answer: "Planning a holiday itinerary"
      },
      {
        question: "Reasoning goes beyond simple...",
        options: ["logic", "planning", "pattern matching", "thinking"],
        answer: "pattern matching"
      }
    ]
  },
  {
    id: 'quantum-computing',
    title: "What is Quantum Computing?",
    image: "https://placehold.co/600x400/26A69A/FFFFFF.png?text=Quantum",
    image_hint: "quantum computer",
    content: "Quantum Computing is a revolutionary type of computing that uses the principles of quantum mechanics to process information. Unlike classical computers that use 'bits' (either a 0 or a 1), quantum computers use 'qubits'. A qubit can be a 0, a 1, or both at the same time (a state called superposition). This allows quantum computers to perform many calculations at once, making them incredibly powerful for solving specific, complex problems that are impossible for classical computers, such as drug discovery or creating new materials.",
    questions: [
      {
        question: "What does a classical computer use to store information?",
        options: ["Qubits", "Quantums", "Bits", "Atoms"],
        answer: "Bits"
      },
      {
        question: "A qubit can be a 0, a 1, or...",
        options: ["A 2", "Both at the same time", "Neither 0 nor 1", "Only a 0"],
        answer: "Both at the same time"
      },
      {
        question: "Quantum computers are especially good for solving what kind of problems?",
        options: ["Simple, everyday tasks", "Sending emails", "Complex problems like drug discovery", "Browsing the internet"],
        answer: "Complex problems like drug discovery"
      }
    ]
  },
  {
    id: 'neural-networks',
    title: "What are Neural Networks?",
    image: "https://placehold.co/600x400/EF5350/FFFFFF.png?text=Neural",
    image_hint: "connected nodes",
    content: "A neural network is a computing system inspired by the human brain. It consists of interconnected nodes, or 'neurons,' organized in layers. Each neuron receives input, processes it, and passes it on to the next layer. By adjusting the connections between these neurons during training, the network learns to recognize patterns in data. This is the core technology behind deep learning and many modern AI applications.",
    questions: [
      {
        question: "Neural networks are inspired by what?",
        options: ["The internet", "The human brain", "A spider's web", "A computer's motherboard"],
        answer: "The human brain"
      },
      {
        question: "What are the interconnected nodes in a neural network called?",
        options: ["Axons", "Synapses", "Neurons", "Dendrites"],
        answer: "Neurons"
      },
      {
        question: "How does a neural network learn?",
        options: ["By being programmed with rules", "By adjusting connections between neurons", "By reading books", "By memorizing every input"],
        answer: "By adjusting connections between neurons"
      }
    ]
  },
  {
    id: 'machine-learning-vs-deep-learning',
    title: "Machine Learning vs. Deep Learning",
    image: "https://placehold.co/600x400/AB47BC/FFFFFF.png?text=ML/DL",
    image_hint: "brain gears",
    content: "Machine Learning (ML) is a broad field of AI where computers learn from data without being explicitly programmed. Deep Learning is a specialized subfield of ML that uses very large neural networks with many layers (hence, 'deep'). While traditional ML might require a human to manually identify features in data (like 'has ears' for an animal), deep learning can automatically learn these features from raw data, like pixels in an image. Deep learning powers many of the most advanced AI tasks today.",
    questions: [
      {
        question: "Is Deep Learning a type of Machine Learning?",
        options: ["Yes", "No", "They are completely separate fields", "Machine Learning is a type of Deep Learning"],
        answer: "Yes"
      },
      {
        question: "What is a key feature of Deep Learning?",
        options: ["It uses small amounts of data", "It uses simple algorithms", "It uses neural networks with many layers", "It requires human feature engineering"],
        answer: "It uses neural networks with many layers"
      },
      {
        question: "What does 'deep' in Deep Learning refer to?",
        options: ["The complexity of the problems", "The number of layers in the neural network", "The depth of its understanding", "The amount of code required"],
        answer: "The number of layers in the neural network"
      }
    ]
  },
  {
    id: 'supervised-vs-unsupervised',
    title: "Supervised vs. Unsupervised Learning",
    image: "https://placehold.co/600x400/FFEE58/000000.png?text=Learning",
    image_hint: "labeled data",
    content: "These are two main types of machine learning. In Supervised Learning, the AI is trained on labeled data. For example, you show it thousands of pictures of cats labeled 'cat' and dogs labeled 'dog'. It learns to predict the label for new, unlabeled pictures. In Unsupervised Learning, the AI is given unlabeled data and must find patterns or structures on its own. For example, it might group customers with similar buying habits together, without being told what the groups represent.",
    questions: [
      {
        question: "Which type of learning uses labeled data?",
        options: ["Supervised Learning", "Unsupervised Learning", "Reinforcement Learning", "Deep Learning"],
        answer: "Supervised Learning"
      },
      {
        question: "Which task is an example of Unsupervised Learning?",
        options: ["Predicting house prices from features", "Identifying spam emails", "Grouping similar customers together", "Recognizing handwritten digits"],
        answer: "Grouping similar customers together"
      },
      {
        question: "If you are teaching an AI to identify pictures of cats and dogs, what kind of learning is it?",
        options: ["Supervised", "Unsupervised", "Reinforcement", "Logical"],
        answer: "Supervised"
      }
    ]
  },
  {
    id: 'nlp',
    title: "What is Natural Language Processing?",
    image: "https://placehold.co/600x400/29B6F6/FFFFFF.png?text=NLP",
    image_hint: "speech bubbles",
    content: "Natural Language Processing (NLP) is a field of AI that gives computers the ability to understand, interpret, and generate human language. It's the technology behind features like language translation, sentiment analysis (determining if a review is positive or negative), chatbots, and voice assistants like Siri or Alexa. NLP combines computer science and linguistics to bridge the gap between human communication and computer understanding.",
    questions: [
      {
        question: "What does NLP help computers to do?",
        options: ["See images", "Process numbers", "Understand human language", "Create music"],
        answer: "Understand human language"
      },
      {
        question: "Which of the following is an application of NLP?",
        options: ["Self-driving cars", "Image recognition", "Chatbots", "Weather forecasting"],
        answer: "Chatbots"
      },
      {
        question: "NLP is a combination of computer science and what other field?",
        options: ["Biology", "Physics", "Chemistry", "Linguistics"],
        answer: "Linguistics"
      }
    ]
  },
  {
    id: 'computer-vision',
    title: "What is Computer Vision?",
    image: "https://placehold.co/600x400/8D6E63/FFFFFF.png?text=Vision",
    image_hint: "camera eye",
    content: "Computer Vision is a field of AI that trains computers to 'see' and interpret the visual world. Using digital images from cameras and videos, machines can accurately identify and classify objects and then react to what they 'see'. It's the technology that powers facial recognition, self-driving cars navigating roads, and medical imaging analysis. The goal is to enable computers to understand visual information in the same way a human does.",
    questions: [
      {
        question: "What is the main goal of Computer Vision?",
        options: ["To help computers hear", "To help computers write text", "To help computers see and interpret images", "To help computers translate languages"],
        answer: "To help computers see and interpret images"
      },
      {
        question: "Which technology relies heavily on Computer Vision?",
        options: ["Chatbots", "Spell-checkers", "Self-driving cars", "Music composers"],
        answer: "Self-driving cars"
      },
      {
        question: "What kind of data does Computer Vision primarily use?",
        options: ["Text data", "Sound data", "Numerical data", "Image and video data"],
        answer: "Image and video data"
      }
    ]
  },
  {
    id: 'reinforcement-learning',
    title: "What is Reinforcement Learning?",
    image: "https://placehold.co/600x400/D4E157/000000.png?text=RL",
    image_hint: "robot maze",
    content: "Reinforcement Learning (RL) is a type of machine learning where an AI agent learns by trial and error. The agent, placed in an environment, learns to perform actions to maximize a cumulative reward. It isn't told which actions to take, but instead must discover which actions yield the most reward by trying them. This is similar to how you might train a dog with treats. RL is very effective for teaching AI to play games (like Chess or Go) and for robotics.",
    questions: [
      {
        question: "How does an agent learn in Reinforcement Learning?",
        options: ["By being given labeled data", "By finding hidden patterns", "By trial and error to maximize a reward", "By reading instructions"],
        answer: "By trial and error to maximize a reward"
      },
      {
        question: "What is RL particularly good for?",
        options: ["Translating text", "Teaching an AI to play a game", "Identifying spam email", "Grouping customers"],
        answer: "Teaching an AI to play a game"
      },
      {
        question: "The AI agent in RL tries to maximize its...",
        options: ["Speed", "Data", "Reward", "Mistakes"],
        answer: "Reward"
      }
    ]
  },
  {
    id: 'ai-ethics',
    title: "What are AI Ethics?",
    image: "https://placehold.co/600x400/BDBDBD/000000.png?text=Ethics",
    image_hint: "scales justice",
    content: "AI Ethics is a branch of ethics that studies the moral implications of creating and using artificial intelligence. It deals with important questions like: How do we prevent AI from being biased? Who is responsible if an AI makes a mistake? Should AI be used in warfare? How can we ensure AI is used for the good of humanity? As AI becomes more powerful, ensuring it is developed and used responsibly is one of the most important challenges we face.",
    questions: [
      {
        question: "What is a key concern of AI Ethics?",
        options: ["How fast an AI can run", "How much data an AI can store", "Preventing bias in AI systems", "The color of the AI's robot body"],
        answer: "Preventing bias in AI systems"
      },
      {
        question: "AI Ethics deals with the ___ implications of AI.",
        options: ["financial", "technical", "moral", "historical"],
        answer: "moral"
      },
      {
        question: "Why is AI Ethics becoming more important?",
        options: ["Because AI is getting less powerful", "Because computers are getting smaller", "Because AI is becoming more powerful and integrated into our lives", "Because all the technical problems are solved"],
        answer: "Because AI is becoming more powerful and integrated into our lives"
      }
    ]
  },
  {
    id: 'prompt-engineering',
    title: "What is Prompt Engineering?",
    image: "https://placehold.co/600x400/FF7043/FFFFFF.png?text=Prompt",
    image_hint: "conversation chat",
    content: "Prompt Engineering is the art and science of designing effective inputs (prompts) to get the desired outputs from a language model. Since LLMs respond based on the prompt they receive, the way you phrase your question or instruction can dramatically change the quality of the answer. It involves being clear, providing context, giving examples (few-shot prompting), and refining your prompt based on the AI's responses. It's like learning how to have the most effective conversation with an AI.",
    questions: [
      {
        question: "What is a 'prompt' in the context of AI?",
        options: ["The AI's answer", "The input given to the AI", "The AI's programming code", "The AI's memory"],
        answer: "The input given to the AI"
      },
      {
        question: "Why is prompt engineering important?",
        options: ["It changes the AI's core programming", "It can dramatically change the quality of the AI's output", "It helps the AI run faster", "It is only for developers"],
        answer: "It can dramatically change the quality of the AI's output"
      },
      {
        question: "Giving examples in your prompt is a technique called...",
        options: ["Zero-shot prompting", "Few-shot prompting", "Example-shot prompting", "Multi-shot prompting"],
        answer: "Few-shot prompting"
      }
    ]
  },
  {
    id: 'ai-hallucinations',
    title: "What are AI Hallucinations?",
    image: "https://placehold.co/600x400/78909C/FFFFFF.png?text=Hallucination",
    image_hint: "ai dream",
    content: "An AI 'hallucination' is when a language model generates text that is incorrect, nonsensical, or not based on the data it was trained on, but presents it as if it were a fact. The AI isn't 'seeing things' like a human; it's simply generating a plausible-sounding but factually wrong sequence of words based on the patterns it learned. This can happen when the AI doesn't know the answer or misinterprets the prompt. It's a key reason why it's important to fact-check information from LLMs.",
    questions: [
      {
        question: "An AI hallucination is when the AI generates...",
        options: ["Perfectly accurate information", "A summary of its training data", "Incorrect or made-up information", "A picture"],
        answer: "Incorrect or made-up information"
      },
      {
        question: "Does an AI 'know' when it is hallucinating?",
        options: ["Yes, it's lying on purpose", "No, it's just generating plausible text", "Sometimes", "Only if you ask it"],
        answer: "No, it's just generating plausible text"
      },
      {
        question: "Why is it important to be aware of AI hallucinations?",
        options: ["Because they are funny", "Because it's a sign the AI is becoming self-aware", "Because the information can be wrong, so you should fact-check it", "Because they can crash the computer"],
        answer: "Because the information can be wrong, so you should fact-check it"
      }
    ]
  },
  {
    id: 'turing-test',
    title: "What is the Turing Test?",
    image: "https://placehold.co/600x400/9C27B0/FFFFFF.png?text=Turing",
    image_hint: "human robot",
    content: "The Turing Test, proposed by Alan Turing in 1950, is a test of a machine's ability to exhibit intelligent behavior equivalent to, or indistinguishable from, that of a human. In the test, a human evaluator engages in a natural language conversation with a human and a machine, without knowing which is which. If the evaluator cannot reliably tell the machine from the human, the machine is said to have passed the test. It's a famous concept in the philosophy of AI.",
    questions: [
      {
        question: "Who proposed the Turing Test?",
        options: ["Alan Turing", "Isaac Asimov", "Albert Einstein", "John von Neumann"],
        answer: "Alan Turing"
      },
      {
        question: "What does the machine have to do to pass the test?",
        options: ["Solve a math problem", "Beat a human at chess", "Convince a human evaluator that it is also human", "Write a perfect essay"],
        answer: "Convince a human evaluator that it is also human"
      },
      {
        question: "The test is conducted through a...",
        options: ["Video call", "Physical interaction", "Natural language conversation", "Game of cards"],
        answer: "Natural language conversation"
      }
    ]
  }
];

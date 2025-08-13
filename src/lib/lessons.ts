

/**
 * @fileoverview Defines the structure and content for all English lessons and stories.
 * Content is based on the "New Headway Intermediate Student's Book".
 */

export interface Lesson {
  type: 'lesson';
  title: string;
  explanation: string;
  examples: { english: string; arabic: string }[];
  mcqs: { question: string; options: string[]; answer: string }[];
  story?: { title: string; summary: string };
}

export interface Story {
  type: 'story';
  title: string;
  content: string;
}

export type LearningItem = Lesson | Story;

const lessons: Lesson[] = [
  // Unit 1
  {
    type: 'lesson',
    title: "Unit 1: Auxiliary Verbs (do, be, have)",
    explanation: "Auxiliary verbs (or helping verbs) like 'do', 'be', and 'have' are used with main verbs to form questions, negatives, and different tenses. 'do' is for simple tenses, 'be' for continuous and passive, and 'have' for perfect tenses.",
    examples: [
      { english: "Where do you live?", arabic: "أين تعيش؟" },
      { english: "He is not studying; he is watching TV.", arabic: "هو لا يدرس؛ هو يشاهد التلفاز." },
      { english: "Have you finished your work?", arabic: "هل أنهيت عملك؟" },
      { english: "Cows don't eat meat.", arabic: "الأبقار لا تأكل اللحم." },
      { english: "Does she work in a bank?", arabic: "هل تعمل في بنك؟" },
      { english: "They are playing in the garden.", arabic: "هم يلعبون في الحديقة." },
      { english: "We have seen that movie before.", arabic: "لقد شاهدنا ذلك الفيلم من قبل." },
      { english: "Did he call you yesterday?", arabic: "هل اتصل بك أمس؟" },
      { english: "I was sleeping when you called.", arabic: "كنت نائمًا عندما اتصلت." },
      { english: "The book has been written.", arabic: "لقد تم تأليف الكتاب." }
    ],
    mcqs: [
      { question: "Which auxiliary verb is used for Present Simple questions?", options: ["be", "have", "do", "will"], answer: "do" },
      { question: "Complete the sentence: She ___ seen this film before.", options: ["is", "does", "has", "did"], answer: "has" }
    ],
    story: {
        title: "From Rich Dad Poor Dad",
        summary: "One father has a PhD, the other did not finish school. Both are successful, yet they have very different ideas about money. One says, 'I can't afford it.' The other asks, 'How can I afford it?'. One does recommend saving money, the other recommends investing it. This book is about the lessons these two fathers have taught the author. What do you think is the best advice?"
    }
  },
  {
    type: 'lesson',
    title: "Unit 1: Questions and Negatives",
    explanation: "To make questions in simple tenses, use do/does/did before the subject. For negatives, use don't/doesn't/didn't before the main verb. For other tenses, invert the auxiliary verb (be/have) and the subject for questions, or add 'not' after the auxiliary for negatives.",
    examples: [
      { english: "What did you do last night?", arabic: "ماذا فعلت الليلة الماضية؟" },
      { english: "He doesn't work on Sundays.", arabic: "هو لا يعمل أيام الأحد." },
      { english: "Are you listening to me?", arabic: "هل تستمع إلي؟" },
      { english: "They haven't arrived yet.", arabic: "هم لم يصلوا بعد." },
      { english: "Why do you need my help?", arabic: "لماذا تحتاج مساعدتي؟" },
      { english: "She didn't feel well.", arabic: "لم تكن تشعر بحالة جيدة." },
      { english: "Is he your brother?", arabic: "هل هو أخوك؟" },
      { english: "We are not going to the party.", arabic: "نحن لن نذهب إلى الحفلة." },
      { english: "Have you ever been to Canada?", arabic: "هل زرت كندا من قبل؟" },
      { english: "He has not called me back.", arabic: "لم يتصل بي مرة أخرى." }
    ],
    mcqs: [
      { question: "How do you make 'You like coffee' a question?", options: ["You do like coffee?", "Like you coffee?", "Do you like coffee?", "Coffee you like?"], answer: "Do you like coffee?" },
      { question: "How do you make 'She went home' negative?", options: ["She didn't went home.", "She didn't go home.", "She not went home.", "She not go home."], answer: "She didn't go home." }
    ],
    story: {
        title: "From The 7 Habits of Highly Effective People",
        summary: "Why don't some people succeed? What did Stephen Covey discover about effective people? He didn't just list random habits; he found seven key principles. For example, effective people are not reactive; they are proactive. They don't just let things happen; they make things happen. Have you ever wondered what the other habits are? This book explains them."
    }
  },
  {
    type: 'lesson',
    title: "Unit 1: Short Answers",
    explanation: "In spoken English, it's polite to use short answers instead of just 'yes' or 'no'. A short answer uses the subject and the auxiliary verb. For example, 'Yes, I do' or 'No, he isn't'.",
    examples: [
      { english: "Did you have a nice time? - Yes, I did.", arabic: "هل قضيت وقتاً ممتعاً؟ - نعم، فعلت." },
      { english: "Is it raining? - No, it isn't.", arabic: "هل تمطر؟ - لا، ليست كذلك." },
      { english: "Have you had coffee? - Yes, I have.", arabic: "هل شربت القهوة؟ - نعم، فعلت." },
      { english: "Are you working hard? - Yes, I am.", arabic: "هل تعمل بجد؟ - نعم، أفعل." },
      { english: "Do you like cooking? - No, I don't.", arabic: "هل تحب الطبخ؟ - لا، لا أحب." },
      { english: "Did you go out last night? - Yes, I did.", arabic: "هل خرجت الليلة الماضية؟ - نعم، فعلت." },
      { english: "Is she a doctor? - No, she isn't.", arabic: "هل هي طبيبة؟ - لا، ليست كذلك." },
      { english: "Have they finished? - No, they haven't.", arabic: "هل انتهوا؟ - لا، لم ينتهوا." },
      { english: "Can you swim? - Yes, I can.", arabic: "هل تستطيع السباحة؟ - نعم، أستطيع." },
      { english: "Will you be there? - No, I won't.", arabic: "هل ستكون هناك؟ - لا، لن أكون." }
    ],
    mcqs: [
      { question: "A correct short answer for 'Do you live here?' is:", options: ["Yes, I live.", "Yes, I do.", "Yes, I am.", "Yes."], answer: "Yes, I do." },
      { question: "A correct negative short answer for 'Is she coming?' is:", options: ["No, she's not.", "No, she not coming.", "No, she doesn't.", "No, she isn't."], answer: "No, she isn't." }
    ],
    story: {
        title: "From a Book Club Discussion",
        summary: "A: Did you read the chapter? B: Yes, I did. A: Was it interesting? B: No, it wasn't. It was quite boring. A: Really? I enjoyed it. Have you started the next one? B: No, I haven't. Are you going to read it tonight? A: Yes, I am. I think you'll like it more. B: We'll see. Can I call you to talk about it? A: Yes, you can!"
    }
  },
  {
    type: 'lesson',
    title: "Unit 1: Social Expressions",
    explanation: "In everyday conversation, we use many common idiomatic expressions to sound natural and friendly, like 'Never mind', 'Take care!', and 'You must be joking!'.",
    examples: [
        { english: "Sorry I'm late. - Never mind, come and sit down.", arabic: "آسف على التأخير. - لا بأس، تعال واجلس." },
        { english: "Bye! - Take care!", arabic: "وداعًا! - اعتنِ بنفسك!" },
        { english: "I won the lottery! - You must be joking!", arabic: "لقد ربحت اليانصيب! - لا بد أنك تمزح!" },
        { english: "Can I borrow your pen? - Of course, go ahead.", arabic: "هل يمكنني استعارة قلمك؟ - بالطبع، تفضل." },
        { english: "Thank you so much! - You're welcome.", arabic: "شكرًا جزيلًا! - على الرحب والسعة." },
        { english: "I have an exam tomorrow. - Good luck!", arabic: "لدي امتحان غدًا. - حظًا موفقًا!" },
        { english: "Excuse me, where is the station? - It's over there.", arabic: "عفوًا، أين المحطة؟ - إنها هناك." },
        { english: "I'm so tired. - Why don't you take a break?", arabic: "أنا متعب جدًا. - لم لا تأخذ استراحة؟" },
        { english: "I failed the test. - Oh, what a shame.", arabic: "لقد رسبت في الاختبار. - يا للأسف." },
        { english: "Let's go to the cinema. - That sounds like a good idea.", arabic: "لنذهب إلى السينما. - تبدو فكرة جيدة." }
    ],
    mcqs: [
        { question: "What's a good reply to 'Thank you'?", options: ["Never mind", "You're welcome", "Take care", "Not at all"], answer: "You're welcome" },
        { question: "If someone tells you surprising news, you might say:", options: ["Take care!", "You must be joking!", "Never mind.", "Good luck!"], answer: "You must be joking!" }
    ],
    story: {
        title: "From a Traveler's Diary",
        summary: "I arrived at the hostel. 'Sorry I'm late,' I said. 'Never mind,' the manager replied. 'You must be tired.' As I left the next morning, he said, 'Take care!' I went to a cafe. 'Can I get a coffee?' I asked. 'Of course,' said the barista. Later, a friend called. 'I'm getting married!' she said. 'You must be joking!' I exclaimed. She wasn't. 'Good luck!' I told her."
    }
  },
  {
    type: 'lesson',
    title: "Unit 2: Present Simple vs. Continuous",
    explanation: "The Present Simple describes habits, facts, and routines (e.g., 'He works in a bank'). The Present Continuous describes actions happening now or around the present time (e.g., 'He is working in France at the moment').",
    examples: [
      { english: "She usually drives to work, but today she's walking.", arabic: "هي عادة تقود السيارة إلى العمل، لكنها اليوم تمشي." },
      { english: "The sun rises in the east.", arabic: "الشمس تشرق من الشرق." },
      { english: "What are you working on these days?", arabic: "على ماذا تعمل هذه الأيام؟" },
      { english: "Water boils at 100 degrees Celsius.", arabic: "يغلي الماء عند 100 درجة مئوية." },
      { english: "I play tennis every Saturday.", arabic: "ألعب التنس كل سبت." },
      { english: "Please be quiet, I'm trying to concentrate.", arabic: "من فضلك كن هادئًا، أحاول التركيز." },
      { english: "He works for an international company.", arabic: "يعمل في شركة دولية." },
      { english: "The population of the world is increasing.", arabic: "عدد سكان العالم في ازدياد." },
      { english: "I don't usually have breakfast.", arabic: "أنا لا أتناول الفطور عادة." },
      { english: "What time does the film start?", arabic: "في أي وقت يبدأ الفيلم؟" }
    ],
    mcqs: [
      { question: "Which tense is for a general truth?", options: ["Present Continuous", "Present Perfect", "Present Simple", "Past Simple"], answer: "Present Simple" },
      { question: "Complete the sentence: 'Listen! The baby ___.'", options: ["cries", "cried", "is crying", "has cried"], answer: "is crying" }
    ],
    story: {
        title: "From a CEO's Biography",
        summary: "A successful CEO always wakes up at 5 AM; that is his routine. He exercises and reads for an hour. Right now, however, he isn't reading. He is preparing for a big presentation. His company usually sells software, but this year it is expanding into hardware. Business is always changing, and he knows that to succeed, he must adapt."
    }
  },
  {
    type: 'lesson',
    title: "Unit 2: Present Passive",
    explanation: "The passive voice is used when the action is more important than the person/thing doing it. Present Simple Passive: is/are + past participle (e.g., 'English is spoken here'). Present Continuous Passive: is/are being + past participle (e.g., 'The house is being built').",
    examples: [
      { english: "We are paid with the money people give.", arabic: "يُدفع لنا بالمال الذي يعطيه الناس." },
      { english: "Children are being treated with a new medicine.", arabic: "يُعالج الأطفال بدواء جديد." },
      { english: "The lions are fed once a day.", arabic: "تُطعم الأسود مرة واحدة في اليوم." },
      { english: "This room is cleaned every day.", arabic: "يتم تنظيف هذه الغرفة كل يوم." },
      { english: "My car is being repaired at the moment.", arabic: "سيارتي قيد الإصلاح في الوقت الحالي." },
      { english: "English is spoken all over the world.", arabic: "يتم التحدث باللغة الإنجليزية في جميع أنحاء العالم." },
      { english: "A new bridge is being built.", arabic: "يتم بناء جسر جديد." },
      { english: "These computers are made in Korea.", arabic: "هذه الحواسيب مصنوعة في كوريا." },
      { english: "The office is being painted this week.", arabic: "يتم طلاء المكتب هذا الأسبوع." },
      { english: "How are these words pronounced?", arabic: "كيف تُنطق هذه الكلمات؟" }
    ],
    mcqs: [
      { question: "Change to passive: 'They deliver the newspapers in the morning.'", options: ["The newspapers are delivered in the morning.", "The newspapers are being delivered...", "The newspapers deliver in the morning.", "The newspapers were delivered..."], answer: "The newspapers are delivered in the morning." },
      { question: "Complete: 'Look! My car ___.'", options: ["is repaired", "is being repaired", "repairs", "repaired"], answer: "is being repaired" }
    ],
    story: {
        title: "From a Tech Company Report",
        summary: "In our company, thousands of emails are sent every day. Our products are designed in California, but they are manufactured in Asia. At the moment, a new headquarters is being built, and a new marketing campaign is being prepared by our team. All employees are given free lunch, and new ideas are always encouraged."
    }
  },
  {
    type: 'lesson',
    title: "Unit 2: Sport and Leisure Vocabulary",
    explanation: "For sports and activities, we often use specific verbs: 'play' for team/ball sports (play football), 'go' for activities ending in -ing (go skiing), and 'do' for individual activities/martial arts (do aerobics, do yoga).",
    examples: [
      { english: "I play football on weekends.", arabic: "ألعب كرة القدم في عطلات نهاية الأسبوع." },
      { english: "She goes skiing every winter.", arabic: "تذهب للتزلج كل شتاء." },
      { english: "He does aerobics to stay fit.", arabic: "يمارس التمارين الهوائية ليحافظ على لياقته." },
      { english: "They play volleyball on the beach.", arabic: "يلعبون الكرة الطائرة على الشاطئ." },
      { english: "We go jogging in the park every morning.", arabic: "نذهب للركض في الحديقة كل صباح." },
      { english: "My brother does karate.", arabic: "أخي يمارس الكاراتيه." },
      { english: "Do you play golf?", arabic: "هل تلعب الجولف؟" },
      { english: "I want to go fishing this weekend.", arabic: "أريد أن أذهب لصيد السمك في نهاية هذا الأسبوع." },
      { english: "She does yoga twice a week.", arabic: "تمارس اليوجا مرتين في الأسبوع." },
      { english: "They are going snowboarding in the mountains.", arabic: "إنهم ذاهبون للتزلج على الجليد في الجبال." }
    ],
    mcqs: [
      { question: "Which verb do you use with 'basketball'?", options: ["go", "do", "play", "make"], answer: "play" },
      { question: "Which verb do you use with 'jogging'?", options: ["go", "do", "play", "run"], answer: "go" }
    ],
     story: {
        title: "From an Athlete's Journal",
        summary: "To be a champion, you need balance. On Mondays, I play tennis to improve my speed. On Tuesdays and Thursdays, I do weightlifting for strength. On Wednesdays, I go swimming, which is great for cardio. At the weekend, if I have time, I play golf to relax my mind. I don't do gymnastics, but I admire those who do. It's a demanding schedule."
    }
  },
   {
    type: 'lesson',
    title: "Unit 2: Numbers and Dates",
    explanation: "Understanding how to say different types of numbers is essential. This includes money (£400), fractions (1/4), decimals (6.2), percentages (50%), dates (15/7/94), and phone numbers (01865 556890).",
    examples: [
        { english: "This costs fifty pounds (£50).", arabic: "هذا يكلف خمسين جنيهاً (50 جنيهاً استرلينياً)." },
        { english: "I'll have a quarter (1/4) of the cake.", arabic: "سآخذ ربع (1/4) الكعكة." },
        { english: "The temperature is minus five degrees (-5°C).", arabic: "درجة الحرارة هي خمس درجات تحت الصفر (-5 درجة مئوية)." },
        { english: "The price increased by ten percent (10%).", arabic: "ارتفع السعر بنسبة عشرة في المئة (10٪)." },
        { english: "My birthday is on the tenth of May (10/5).", arabic: "عيد ميلادي في العاشر من مايو (10/5)." },
        { english: "Her phone number is oh one seven one, three four five, six seven eight nine.", arabic: "رقم هاتفها هو صفر واحد سبعة واحد، ثلاثة أربعة خمسة، ستة سبعة ثمانية تسعة." },
        { english: "The result is three point one four (3.14).", arabic: "النتيجة هي ثلاثة فاصلة واحد أربعة (3.14)." },
        { english: "World War II ended in nineteen forty-five (1945).", arabic: "انتهت الحرب العالمية الثانية في عام ألف وتسعمائة وخمسة وأربعين (1945)." },
        { english: "I need two-thirds (2/3) of a cup of flour.", arabic: "أحتاج إلى ثلثي (2/3) كوب من الدقيق." },
        { english: "The bill is forty-seven dollars and ninety-nine cents ($47.99).", arabic: "الفاتورة سبعة وأربعون دولارًا وتسعة وتسعون سنتًا (47.99 دولارًا)." }
    ],
    mcqs: [
        { question: "How do you say '3/4'?", options: ["three-four", "three-fourths", "three by four", "three and four"], answer: "three-fourths" },
        { question: "How do you say the year '2005'?", options: ["two thousand five", "twenty oh five", "two zero zero five", "Both A and B are common"], answer: "Both A and B are common" }
    ],
    story: {
        title: "From an Investment Report",
        summary: "The company's profit was two million, five hundred thousand dollars ($2,500,000) last year. This represents a growth of fifteen percent (15%) from the previous year. The stock price closed at sixty-two point five (62.5) yesterday. The annual general meeting is scheduled for the first of June (1/6) in the year two thousand and twenty-five (2025). The company's main contact number is eight hundred, five five five, one two three four (800-555-1234)."
    }
  },
  {
    type: 'lesson',
    title: "Unit 3: Past Simple vs. Past Continuous",
    explanation: "Past Simple is for a completed action in the past (e.g., 'He danced'). Past Continuous is for an action in progress at a specific past time (e.g., 'He was laughing'). Often used together: a short action (Past Simple) interrupts a longer action (Past Continuous).",
    examples: [
      { english: "He was laughing when he saw the baby.", arabic: "كان يضحك عندما رأى الطفل." },
      { english: "While I was driving home, I saw an accident.", arabic: "بينما كنت أقود السيارة إلى المنزل، رأيت حادثًا." },
      { english: "She packed her suitcase and left.", arabic: "حزمت حقيبتها وغادرت." },
      { english: "What were you doing at 8 PM last night?", arabic: "ماذا كنت تفعل في الساعة 8 مساءً الليلة الماضية؟" },
      { english: "It started to rain while we were walking in the park.", arabic: "بدأت تمطر بينما كنا نمشي في الحديقة." },
      { english: "He broke his leg when he was playing football.", arabic: "كسر ساقه عندما كان يلعب كرة القدم." },
      { english: "I read a book, then I went to bed.", arabic: "قرأت كتابًا، ثم ذهبت إلى الفراش." },
      { english: "The phone rang while I was having a shower.", arabic: "رن الهاتف بينما كنت أستحم." },
      { english: "I was watching TV when you called.", arabic: "كنت أشاهد التلفاز عندما اتصلت." },
      { english: "She didn't hear the doorbell because she was listening to music.", arabic: "لم تسمع جرس الباب لأنها كانت تستمع إلى الموسيقى." }
    ],
    mcqs: [
      { question: "Complete: 'When the phone rang, I ___ a shower.'", options: ["had", "was having", "have", "am having"], answer: "was having" },
      { question: "Complete: 'He ___ TV when I arrived.'", options: ["watched", "watches", "was watching", "has watched"], answer: "was watching" }
    ],
    story: {
        title: "From a Detective Novel",
        summary: "The detective arrived at the scene. It was raining heavily. A man was lying on the floor. He wasn't moving. While the detective was examining the room, he noticed a small clue under the sofa. He picked it up carefully. Just then, the phone rang. It startled him. He answered it. A mysterious voice spoke on the other end."
    }
  },
  {
    type: 'lesson',
    title: "Unit 3: Past Simple vs. Past Perfect",
    explanation: "When describing two past actions, use the Past Perfect (had + past participle) for the action that happened first. Use the Past Simple for the action that happened second.",
    examples: [
      { english: "When I arrived, the film had started.", arabic: "عندما وصلت، كان الفيلم قد بدأ." },
      { english: "I didn't laugh at his joke because I had heard it before.", arabic: "لم أضحك على نكتته لأنني كنت قد سمعتها من قبل." },
      { english: "After she had finished her work, she went home.", arabic: "بعد أن أنهت عملها، ذهبت إلى المنزل." },
      { english: "He went to the airport, but he had left his passport at home.", arabic: "ذهب إلى المطار، لكنه كان قد ترك جواز سفره في المنزل." },
      { english: "The train had just left when we got to the station.", arabic: "كان القطار قد غادر للتو عندما وصلنا إلى المحطة." },
      { english: "She had studied French before she moved to Paris.", arabic: "كانت قد درست الفرنسية قبل أن تنتقل إلى باريس." },
      { english: "By the time I arrived, everyone had gone.", arabic: "بحلول الوقت الذي وصلت فيه، كان الجميع قد غادروا." },
      { english: "I couldn't get on the plane because I had forgotten my ticket.", arabic: "لم أتمكن من ركوب الطائرة لأنني كنت قد نسيت تذكرتي." },
      { english: "They had eaten all the food before I got there.", arabic: "كانوا قد أكلوا كل الطعام قبل أن أصل إلى هناك." },
      { english: "I knew the city well because I had visited it many times.", arabic: "كنت أعرف المدينة جيدًا لأنني كنت قد زرتها عدة مرات." }
    ],
    mcqs: [
      { question: "Complete: 'The patient ___ by the time the doctor arrived.'", options: ["died", "was dying", "had died", "dies"], answer: "had died" },
      { question: "Complete: 'He told me he ___ my book.'", options: ["lost", "had lost", "was losing", "has lost"], answer: "had lost" }
    ],
    story: {
        title: "From a Personal Memoir",
        summary: "I went back to my old town last year. It had changed a lot. They tore down the school that I had attended as a boy. The beautiful park where I had played was now a shopping mall. I visited the house where I grew up; a new family lived there now. They were friendly because the previous owner had told them all about my family."
    }
  },
  {
    type: 'lesson',
    title: "Unit 3: Past Passive",
    explanation: "The passive voice in the past. Past Simple Passive: was/were + past participle. Past Perfect Passive: had been + past participle.",
    examples: [
      { english: "A Farewell to Arms was written by Ernest Hemingway.", arabic: "رواية 'وداعًا للسلاح' كُتبت بواسطة إرنست همنغواي." },
      { english: "The window was broken yesterday.", arabic: "كُسرت النافذة أمس." },
      { english: "The work had been finished before he arrived.", arabic: "كان العمل قد أُنجز قبل وصوله." },
      { english: "This bridge was built in 1950.", arabic: "تم بناء هذا الجسر في عام 1950." },
      { english: "The car was stolen last night.", arabic: "سُرقت السيارة الليلة الماضية." },
      { english: "He was told to wait outside.", arabic: "قيل له أن ينتظر في الخارج." },
      { english: "The letters were sent a week ago.", arabic: "أُرسلت الرسائل قبل أسبوع." },
      { english: "The room had been cleaned before they checked in.", arabic: "كانت الغرفة قد نُظفت قبل أن يسجلوا دخولهم." },
      { english: "Was this film directed by Spielberg?", arabic: "هل أخرج هذا الفيلم سبيلبرغ؟" },
      { english: "The thieves were arrested by the police.", arabic: "تم القبض على اللصوص من قبل الشرطة." }
    ],
    mcqs: [
      { question: "Change to passive: 'Shakespeare wrote Hamlet.'", options: ["Hamlet was wrote by Shakespeare.", "Hamlet was written by Shakespeare.", "Hamlet is written by Shakespeare.", "Hamlet had written by Shakespeare."], answer: "Hamlet was written by Shakespeare." },
      { question: "Complete: 'The Pyramids ___ by the ancient Egyptians.'", options: ["built", "were building", "are built", "were built"], answer: "were built" }
    ],
    story: {
        title: "From a History Book",
        summary: "The great castle was built in the 12th century. Its walls were made of stone, and it was surrounded by a deep moat. Many battles were fought there. The castle was captured in 1485. After that, it was used as a prison for many years. Important letters had been hidden in the walls, but they were not discovered for centuries. Finally, the castle was restored in the 1990s and opened to the public."
    }
  },
  {
    type: 'lesson',
    title: "Unit 3: Giving Opinions",
    explanation: "To give opinions, you can use phrases like 'What did you think of...?', 'It was really...', 'I think...', and 'In my opinion...'. This is key for expressing your feelings about films, books, food, and more.",
    examples: [
        { english: "What did you think of the play? - It was really boring.", arabic: "ما رأيك في المسرحية؟ - كانت مملة حقًا." },
        { english: "I think they spoil their children.", arabic: "أعتقد أنهم يفسدون أطفالهم." },
        { english: "In my opinion, the first book was better.", arabic: "في رأيي، كان الكتاب الأول أفضل." },
        { english: "How was your holiday? - It was fantastic!", arabic: "كيف كانت عطلتك؟ - كانت رائعة!" },
        { english: "The food was delicious, don't you think?", arabic: "كان الطعام لذيذًا، ألا تعتقد ذلك؟" },
        { english: "I found the movie a bit confusing.", arabic: "لقد وجدت الفيلم مربكًا بعض الشيء." },
        { english: "To be honest, I didn't like it very much.", arabic: "لأكون صادقًا، لم يعجبني كثيرًا." },
        { english: "What's your opinion on the new law?", arabic: "ما هو رأيك في القانون الجديد؟" },
        { english: "I feel that we should do more to help.", arabic: "أشعر أنه يجب علينا أن نفعل المزيد للمساعدة." },
        { english: "For me, the best part was the ending.", arabic: "بالنسبة لي، كان الجزء الأفضل هو النهاية." }
    ],
    mcqs: [
        { question: "What is a polite way to ask for an opinion on a film?", options: ["Did you like the film?", "Tell me about the film.", "What did you think of the film?", "Was the film good?"], answer: "What did you think of the film?" },
        { question: "Which phrase can start an opinion?", options: ["I know...", "For example...", "In my opinion...", "The fact is..."], answer: "In my opinion..." }
    ],
    story: {
        title: "From a Film Review",
        summary: "What did I think of the new sci-fi movie? In my opinion, it was a masterpiece. The special effects were incredible. For me, the acting was the best part. However, some people will find the story a bit slow. I think it's a film that makes you think. To be honest, it's not for everyone, but I feel it's one of the best films of the year."
    }
  },
  {
    type: 'lesson',
    title: "Unit 4: Modals of Obligation (have to, must)",
    explanation: "'have (got) to' and 'must' both express strong obligation. 'have to' is common for external rules (laws, work rules). 'must' is often for personal obligations or strong advice. 'don't have to' means no obligation. 'mustn't' means prohibition.",
    examples: [
      { english: "Children have to go to school.", arabic: "يجب على الأطفال الذهاب إلى المدرسة." },
      { english: "I must remember to call my mother.", arabic: "يجب أن أتذكر الاتصال بوالدتي." },
      { english: "You don't have to come if you're busy.", arabic: "ليس عليك أن تأتي إذا كنت مشغولاً." },
      { english: "You mustn't smoke in the hospital.", arabic: "يجب ألا تدخن في المستشفى." },
      { english: "In England, you have to drive on the left.", arabic: "في إنجلترا، يجب عليك القيادة على اليسار." },
      { english: "I've got to go now. Bye!", arabic: "يجب أن أذهب الآن. وداعًا!" },
      { english: "You must write to us every week.", arabic: "يجب أن تكتب لنا كل أسبوع." },
      { english: "She has to wear a uniform for her job.", arabic: "يجب عليها ارتداء زي رسمي لعملها." },
      { english: "We don't have to pay for the tickets.", arabic: "ليس علينا دفع ثمن التذاكر." },
      { english: "You mustn't be late for the exam.", arabic: "يجب ألا تتأخر عن الامتحان." }
    ],
    mcqs: [
      { question: "Which means it is NOT necessary?", options: ["mustn't", "have to", "don't have to", "must"], answer: "don't have to" },
      { question: "Complete: 'At our school, we ___ wear a uniform.'", options: ["must", "should", "don't have to", "have to"], answer: "have to" }
    ],
    story: {
        title: "From a Company Handbook",
        summary: "All employees have to arrive by 9 AM. You must complete your timesheets every Friday. For security, you must wear your ID badge at all times. You mustn't share your password with anyone. If you are sick, you have to call your manager before 9 AM. You don't have to work on weekends, but you must attend the monthly team meeting."
    }
  },
  {
    type: 'lesson',
    title: "Unit 4: Modals of Permission & Advice (can, should)",
    explanation: "'can' and 'be allowed to' are used to express permission (what is okay to do). 'should' is used to give advice or make a suggestion.",
    examples: [
      { english: "You can use my phone if you like.", arabic: "يمكنك استخدام هاتفي إذا أردت." },
      { english: "We're allowed to wear jeans on Fridays.", arabic: "يُسمح لنا بارتداء الجينز أيام الجمعة." },
      { english: "I think we should take traveller's cheques.", arabic: "أعتقد أنه يجب علينا أن نأخذ شيكات سياحية." },
      { english: "You look tired. You should get some sleep.", arabic: "تبدو متعبًا. يجب أن تحصل على قسط من النوم." },
      { english: "Can I go to the party?", arabic: "هل يمكنني الذهاب إلى الحفلة؟" },
      { english: "You aren't allowed to park here.", arabic: "غير مسموح لك بركن السيارة هنا." },
      { english: "You should see a doctor about that cough.", arabic: "يجب أن تراجع طبيبًا بخصوص تلك السعلة." },
      { english: "He shouldn't eat so much sugar.", arabic: "لا ينبغي له أن يأكل الكثير من السكر." },
      { english: "Am I allowed to take photos in the museum?", arabic: "هل يُسمح لي بالتقاط صور في المتحف؟" },
      { english: "I don't think you should work so hard.", arabic: "لا أعتقد أنه يجب عليك العمل بجد." }
    ],
    mcqs: [
      { question: "To give advice, you use...", options: ["can", "must", "should", "have to"], answer: "should" },
      { question: "Complete: 'You ___ park here. It's not allowed.'", options: ["can", "can't", "should", "shouldn't"], answer: "can't" }
    ],
    story: {
        title: "From a Mentor's Advice",
        summary: "I asked my mentor for advice. 'I think you should focus on your strengths,' she said. 'You can achieve anything you want, but you shouldn't try to do everything at once.' I asked, 'Can I take a risk and start my own business?' She replied, 'Yes, you are allowed to dream big. But you should create a solid plan first. And you shouldn't listen to negative people.'"
    }
  },
  {
    type: 'lesson',
    title: "Unit 4: Nationality Words",
    explanation: "Nationality adjectives (e.g., French, Spanish) can also refer to the people of that country (the French, the Spanish). Some words are different for the country, adjective, and people (e.g., Scotland, Scottish, the Scots).",
    examples: [
      { english: "She is from Italy. She's Italian.", arabic: "هي من إيطاليا. هي إيطالية." },
      { english: "The Japanese are known for their politeness.", arabic: "يشتهر اليابانيون بأدبهم." },
      { english: "He loves French food.", arabic: "يحب الطعام الفرنسي." },
      { english: "My new neighbor is Canadian.", arabic: "جاري الجديد كندي." },
      { english: "The Spanish love tapas.", arabic: "يحب الإسبان المقبلات (تاباس)." },
      { english: "This watch is Swiss.", arabic: "هذه الساعة سويسرية." },
      { english: "The Germans make excellent cars.", arabic: "يصنع الألمان سيارات ممتازة." },
      { english: "We visited a Greek island.", arabic: "زرنا جزيرة يونانية." },
      { english: "The Brazilians are famous for football.", arabic: "يشتهر البرازيليون بكرة القدم." },
      { english: "The language of Egypt is Arabic.", arabic: "لغة مصر هي العربية." }
    ],
    mcqs: [
      { question: "What is the adjective for Holland (the Netherlands)?", options: ["Hollandic", "Netherland", "Dutch", "Hollish"], answer: "Dutch" },
      { question: "What do you call people from Sweden?", options: ["Swedish", "The Swedishes", "The Swedes", "Swedens"], answer: "The Swedes" }
    ],
     story: {
        title: "From an International Cookbook",
        summary: "This book explores global cuisine. It features Italian pasta and French pastries. You can learn how to make Japanese sushi or spicy Mexican tacos. The Brazilians offer delicious barbecue, while the Germans are famous for their sausages. A popular Greek dish is moussaka, and of course, no book is complete without the classic English breakfast."
    }
  },
  {
    type: 'lesson',
    title: "Unit 4: Requests and Offers",
    explanation: "To make polite requests, use 'Could you...?' or 'Would you...?'. To make offers, use 'Can I...?', 'I'll...', or 'Shall I...?'. Intonation is important to sound polite.",
    examples: [
        { english: "Could you bring us the bill, please?", arabic: "هل يمكنك إحضار الفاتورة لنا، من فضلك؟" },
        { english: "Would you mind opening the window?", arabic: "هل تمانع في فتح النافذة؟" },
        { english: "Can I help you?", arabic: "هل يمكنني مساعدتك؟" },
        { english: "I'll give you a lift if you like.", arabic: "سأوصلك إذا أردت." },
        { english: "Shall I make some coffee?", arabic: "هل أُعد بعض القهوة؟" },
        { english: "Could you tell me the time, please?", arabic: "هل يمكنك إخباري بالوقت، من فضلك؟" },
        { english: "Would you pass the salt, please?", arabic: "هل يمكنك تمرير الملح، من فضلك؟" },
        { english: "Can I get you anything?", arabic: "هل يمكنني أن أحضر لك شيئًا؟" },
        { english: "I'll answer the phone.", arabic: "سأرد على الهاتف." },
        { english: "Shall I carry your bag?", arabic: "هل أحمل حقيبتك؟" }
    ],
    mcqs: [
        { question: "Which is a polite request?", options: ["Give me the book.", "I want the book.", "Can you pass me the book?", "Could you pass me the book, please?"], answer: "Could you pass me the book, please?" },
        { question: "Which is an offer?", options: ["I need help.", "Help me.", "Shall I help you?", "You should help me."], answer: "Shall I help you?" }
    ],
    story: {
        title: "From a Helpful Neighbor Story",
        summary: "My new neighbor is very kind. 'Can I help you with those boxes?' he asked when I was moving in. 'That's okay, but could you tell me where the post office is?' I asked. 'Of course,' he said. 'I'll draw you a map.' Later, he saw me struggling with a flat tire. 'Shall I change that for you?' he offered. 'Would you?' I said, relieved. 'I'll have it done in no time,' he smiled."
    }
  },
  {
    type: 'lesson',
    title: "Unit 5: Future Forms (going to, will, Present Continuous)",
    explanation: "Use 'going to' for plans made before speaking. Use 'will' for instant decisions, offers, and predictions. Use Present Continuous for fixed arrangements in the near future.",
    examples: [
      { english: "I'm going to buy some milk. (It's on my list)", arabic: "سأشتري بعض الحليب. (هو على قائمتي)" },
      { english: "The phone is ringing. I'll get it! (Instant decision)", arabic: "الهاتف يرن. سأرد عليه! (قرار فوري)" },
      { english: "We're playing tennis this afternoon. (Arrangement)", arabic: "سنلعب التنس بعد ظهر هذا اليوم. (ترتيب)" },
      { english: "Look at those black clouds! It's going to rain.", arabic: "انظر إلى تلك الغيوم السوداء! ستمطر." },
      { english: "I think it will be a nice day tomorrow.", arabic: "أعتقد أنه سيكون يومًا لطيفًا غدًا." },
      { english: "He's flying to Rome next Tuesday.", arabic: "سيسافر إلى روما يوم الثلاثاء المقبل." },
      { english: "I'll help you with that heavy bag.", arabic: "سأساعدك في حمل تلك الحقيبة الثقيلة." },
      { english: "They are going to move to a new house next year.", arabic: "سينتقلون إلى منزل جديد العام المقبل." },
      { english: "What are you doing this evening?", arabic: "ماذا تفعل هذا المساء؟" },
      { english: "Don't worry, it won't happen again.", arabic: "لا تقلق، لن يحدث ذلك مرة أخرى." }
    ],
    mcqs: [
      { question: "Complete: 'I've already decided. I ___ a new car.'", options: ["will buy", "am going to buy", "am buying", "buy"], answer: "am going to buy" },
      { question: "Complete: 'Don't worry, I ___ you with your bags.'", options: ["am helping", "am going to help", "will help", "help"], answer: "will help" }
    ],
    story: {
        title: "From a Project Manager's Email",
        summary: "Next week, we are launching the new product. It is a fixed date. I am going to present the marketing plan at the meeting on Monday. Oh, the phone is ringing, I'll get it. I think the launch will be very successful. The team has worked hard, and I am sure customers will love it."
    }
  },
  {
    type: 'lesson',
    title: "Unit 5: Questions with 'like'",
    explanation: "'What's she like?' asks about personality. 'What does she look like?' asks about physical appearance. 'What does she like doing?' asks about hobbies and interests.",
    examples: [
      { english: "What's your teacher like? - She's very kind and patient.", arabic: "كيف هي معلمتك؟ - هي لطيفة جداً وصبورة." },
      { english: "What does she look like? - She's tall and has long, dark hair.", arabic: "كيف تبدو؟ - هي طويلة ولها شعر داكن طويل." },
      { english: "What does she like doing? - She likes dancing and music.", arabic: "ماذا تحب أن تفعل؟ - تحب الرقص والموسيقى." },
      { english: "What's the new boss like? - He seems very serious.", arabic: "كيف هو المدير الجديد؟ - يبدو جادًا جدًا." },
      { english: "What does your brother look like? - He looks like my father.", arabic: "كيف يبدو أخوك؟ - يشبه والدي." },
      { english: "What do they like eating? - They like spicy food.", arabic: "ماذا يحبون أن يأكلوا؟ - يحبون الطعام الحار." },
      { english: "What was the weather like? - It was cold and windy.", arabic: "كيف كان الطقس؟ - كان باردًا وعاصفًا." },
      { english: "What's his new flat like? - It's small but very modern.", arabic: "كيف هي شقته الجديدة؟ - إنها صغيرة لكنها حديثة جدًا." },
      { english: "What would you like for dinner? - I'd like a pizza.", arabic: "ماذا تود أن تتناول على العشاء؟ - أود بيتزا." },
      { english: "I like my coffee black with no sugar.", arabic: "أحب قهوتي سوداء بدون سكر." }
    ],
    mcqs: [
      { question: "Which question asks about appearance?", options: ["What's he like?", "How is he?", "What does he look like?", "What does he like?"], answer: "What does he look like?" },
      { question: "How would you answer 'What's London like?'", options: ["It's in England.", "It's a huge, exciting city.", "I like it.", "It looks big."], answer: "It's a huge, exciting city." }
    ],
    story: {
        title: "From a Character Description in a Novel",
        summary: "The detective entered. What did he look like? He was tall and wore a long coat. What was he like? He was quiet and observant. He didn't talk much. And what did he like doing? He liked solving puzzles and drinking black coffee. When his partner asked, 'What would you like to do now?', he simply replied, 'I'd like to ask some questions.'"
    }
  },
  {
    type: 'lesson',
    title: "Unit 5: Vocabulary of Weather",
    explanation: "Learn to describe the weather using adjectives (sunny, windy, foggy), nouns (sunshine, wind, fog), and verbs (The sun is shining, It's raining).",
    examples: [
      { english: "It's a sunny day today.", arabic: "إنه يوم مشمس اليوم." },
      { english: "The wind is blowing hard.", arabic: "الرياح تهب بقوة." },
      { english: "The forecast is for heavy rain tomorrow.", arabic: "التوقعات تشير إلى أمطار غزيرة غداً." },
      { english: "I can't see anything in this fog.", arabic: "لا أستطيع رؤية أي شيء في هذا الضباب." },
      { english: "There was a big storm last night.", arabic: "كانت هناك عاصفة كبيرة الليلة الماضية." },
      { english: "The sun is shining brightly.", arabic: "الشمس تشرق ببراعة." },
      { english: "It's freezing outside, there's ice on the road.", arabic: "الجو متجمد في الخارج، هناك جليد على الطريق." },
      { english: "The sky is very cloudy this morning.", arabic: "السماء غائمة جداً هذا الصباح." },
      { english: "I love the feeling of warm sunshine on my face.", arabic: "أحب شعور أشعة الشمس الدافئة على وجهي." },
      { english: "What's the temperature today?", arabic: "كم درجة الحرارة اليوم؟" }
    ],
    mcqs: [
      { question: "The noun form of 'snowy' is:", options: ["snowing", "snow", "snowed", "snows"], answer: "snow" },
      { question: "What do you call rain and strong wind together?", options: ["A storm", "A fog", "A shine", "An ice"], answer: "A storm" }
    ],
    story: {
        title: "From a Ship Captain's Log",
        summary: "The morning was foggy, and a cold wind was blowing. The sea was rough. By midday, the sun was shining and the clouds disappeared. We hoped for good weather. But the forecast warned of a storm. In the evening, the sky became dark and heavy rain began to fall. The icy wind howled. It was a terrible night."
    }
  },
   {
    type: 'lesson',
    title: "Unit 5: Travelling Around",
    explanation: "Different modes of transport have specific vocabulary. On a bus, you ask for a 'stop'. On a train, you look for a 'platform'. On a plane, you have 'hand luggage' and wait for 'landing'.",
    examples: [
        { english: "Could you tell me when it's my stop?", arabic: "هل يمكنك إخباري متى تكون محطتي؟ (على الحافلة)" },
        { english: "Which platform does the train to Manchester leave from?", arabic: "من أي رصيف يغادر القطار المتجه إلى مانشستر؟" },
        { english: "We're beginning our descent soon.", arabic: "سنبدأ هبوطنا قريبًا. (على الطائرة)" },
        { english: "You can keep the change.", arabic: "يمكنك الاحتفاظ بالباقي. (لسائق التاكسي)" },
        { english: "Do you think it'll be a rough crossing?", arabic: "هل تعتقد أنها ستكون رحلة بحرية صعبة؟ (على العبارة)" },
        { english: "Take the Piccadilly Line and change at Green Park.", arabic: "استقل خط بيكاديللي وغير في جرين بارك. (في مترو الأنفاق)" },
        { english: "Can I take this bag as hand luggage?", arabic: "هل يمكنني أخذ هذه الحقيبة كأمتعة يدوية؟" },
        { english: "I'd like a single ticket to Oxford, please.", arabic: "أود تذكرة ذهاب فقط إلى أكسفورد، من فضلك." },
        { english: "Please fasten your seatbelts.", arabic: "يرجى ربط أحزمة الأمان." },
        { english: "Could you drop me off at the corner?", arabic: "هل يمكنك إنزالي عند الزاوية؟ (في سيارة أجرة)" }
    ],
    mcqs: [
        { question: "Where do you wait for a train?", options: ["At a bus stop", "At a platform", "At a gate", "At a terminal"], answer: "At a platform" },
        { question: "What do you call the small bag you take on a plane?", options: ["Baggage", "Suitcase", "Hand luggage", "Cargo"], answer: "Hand luggage" }
    ],
    story: {
        title: "From a Backpacker's Blog",
        summary: "My journey started in a taxi. 'Could you take me to the station?' I asked. From there, I bought a ticket and found the right platform. The train was crowded. Then I took the underground to the airport. At check-in, they weighed my luggage. 'You can only take one piece of hand luggage,' the attendant said. Finally, on the plane, the captain announced, 'Please fasten your seatbelts, we are preparing for landing.'"
    }
  },
  {
    type: 'lesson',
    title: "Unit 6: Verb Patterns",
    explanation: "Different verbs are followed by different patterns. Verb + -ing (e.g., enjoy, finish, avoid). Verb + to-infinitive (e.g., want, decide, hope). Verb + object + to-infinitive (e.g., ask someone to do, tell someone to do). Verb + object + infinitive (no 'to') (e.g., make someone do, let someone do).",
    examples: [
      { english: "I enjoy meeting your friends.", arabic: "أستمتع بمقابلة أصدقائك." },
      { english: "I wanted to say thank you.", arabic: "أردت أن أقول شكراً لك." },
      { english: "You made me feel welcome.", arabic: "لقد جعلتني أشعر بالترحاب." },
      { english: "My aunt wanted me to stay longer.", arabic: "أرادت عمتي أن أبقى لفترة أطول." },
      { english: "He promised to call me.", arabic: "وعد بأن يتصل بي." },
      { english: "I don't mind waiting.", arabic: "لا أمانع في الانتظار." },
      { english: "She let him borrow her car.", arabic: "سمحت له باستعارة سيارتها." },
      { english: "They decided to move to a new city.", arabic: "قرروا الانتقال إلى مدينة جديدة." },
      { english: "I look forward to hearing from you.", arabic: "أتطلع إلى الاستماع منك." },
      { english: "My parents helped me do my homework.", arabic: "ساعدني والداي في أداء واجبي المنزلي." }
    ],
    mcqs: [
      { question: "Complete: 'He promised ___ me.'", options: ["calling", "call", "to call", "called"], answer: "to call" },
      { question: "Complete: 'She avoids ___ junk food.'", options: ["eating", "to eat", "eat", "eats"], answer: "eating" },
      { question: "Complete: 'My parents let me ___ out late.'", options: ["to stay", "staying", "stay", "to staying"], answer: "stay" }
    ],
    story: {
        title: "From an Entrepreneur's Story",
        summary: "I decided to start my own business. My parents encouraged me to follow my dream. At first, it was difficult. I considered giving up many times. But my mentor advised me to keep trying. She made me believe in myself. She helped me find new customers. I enjoy being my own boss, although I don't mind working long hours."
    }
  },
  {
    type: 'lesson',
    title: "Unit 6: Adjectives for Description",
    explanation: "Use a wide range of adjectives to describe food (fresh, tasteless), towns (polluted, historic), and people (sociable, sophisticated).",
    examples: [
      { english: "The food at that restaurant was delicious.", arabic: "كان الطعام في ذلك المطعم لذيذاً." },
      { english: "Venice is a historic and beautiful city.", arabic: "البندقية مدينة تاريخية وجميلة." },
      { english: "He's a very outgoing and sociable person.", arabic: "هو شخص منفتح واجتماعي جداً." },
      { english: "This milk isn't fresh, it's old.", arabic: "هذا الحليب ليس طازجًا، إنه قديم." },
      { english: "The city center is very crowded on weekends.", arabic: "وسط المدينة مزدحم جداً في عطلات نهاية الأسبوع." },
      { english: "My grandfather is an elderly man.", arabic: "جدي رجل مسن." },
      { english: "The soup is tasteless, it needs more salt.", arabic: "الحساء لا طعم له، يحتاج إلى المزيد من الملح." },
      { english: "Some industrial towns can be very polluted.", arabic: "بعض المدن الصناعية يمكن أن تكون ملوثة جداً." },
      { english: "She is a very sophisticated woman.", arabic: "هي امرأة متطورة جداً." },
      { english: "I was bored because the film was boring.", arabic: "شعرت بالملل لأن الفيلم كان مملًا." }
    ],
    mcqs: [
      { question: "Which adjective does NOT describe food?", options: ["fresh", "delicious", "polluted", "tasteless"], answer: "polluted" },
      { question: "A synonym for 'friendly and enjoys company' is:", options: ["shy", "rude", "sociable", "bored"], answer: "sociable" }
    ],
    story: {
        title: "From a Travel Guide",
        summary: "This guide is for the sophisticated traveler. We will take you from the crowded, industrial cities to small, historic towns. You will meet sociable local people and eat delicious, fresh food. We avoid the polluted areas and show you the beautiful, unspoiled countryside. It is an exciting journey for anyone from young students to elderly couples."
    }
  },
  {
    type: 'lesson',
    title: "Unit 6: Everyday English - Signs and Sounds",
    explanation: "Recognize common signs ('Dry clean only', 'Pay and Display') and understand common phrases you hear in public places ('Just looking, thanks.', 'We apologize for the delay...').",
    examples: [
      { english: "The sign says 'Do not iron trim.'", arabic: "تقول اللافتة 'لا تكوي الزخرفة'." },
      { english: "In a shop, an assistant asks 'Can I help you?' You can reply 'Just looking, thanks.'", arabic: "في متجر، يسأل المساعد 'هل يمكنني مساعدتك؟' يمكنك الرد 'أتصفح فقط، شكراً'." },
      { english: "Sign: 'All visitors must sign in.'", arabic: "لافتة: 'يجب على جميع الزوار تسجيل الدخول'." },
      { english: "On the radio: 'Coming up next - traffic, news, and the weather.'", arabic: "على الراديو: 'التالي - حركة المرور، الأخبار، والطقس'." },
      { english: "Sign on a jacket label: '100% NYLON. DRY CLEAN ONLY.'", arabic: "لافتة على ملصق سترة: '100٪ نايلون. تنظيف جاف فقط'." },
      { english: "Automated phone message: 'Please listen carefully to the following options.'", arabic: "رسالة هاتفية آلية: 'يرجى الاستماع بعناية إلى الخيارات التالية'." },
      { english: "Sign in a cloakroom: 'Coats and other articles left at owner's risk.'", arabic: "لافتة في غرفة المعاطف: 'المعاطف والأغراض الأخرى المتروكة على مسؤولية المالك'." },
      { english: "On a plane: 'Please place your tray tables in their fully upright and locked positions.'", arabic: "على متن طائرة: 'يرجى وضع طاولاتكم في وضعها العمودي الكامل والمغلق'." },
      { english: "In a restaurant: 'PLEASE WAIT TO BE SEATED.'", arabic: "في مطعم: 'يرجى الانتظار ليتم إجلاسكم'." },
      { english: "Train announcement: 'We apologize for the delay on the 18.13 service.'", arabic: "إعلان في القطار: 'نعتذر عن التأخير في خدمة الساعة 18.13'." }
    ],
    mcqs: [
      { question: "Where would you see a 'Pay and Display' sign?", options: ["In a library", "In a car park", "In a restaurant", "On a motorway"], answer: "In a car park" },
      { question: "What does 'Coats left at owner's risk' mean?", options: ["The owner will look after your coat.", "The establishment is not responsible if your coat is stolen.", "You must leave your coat here.", "You can buy a coat at your own risk."], answer: "The establishment is not responsible if your coat is stolen." }
    ],
    story: {
        title: "From a Tourist's Frustrating Day",
        summary: "I went into a shop. 'Can I help you?' the assistant asked. 'Just looking, thanks,' I replied. Then I went to a restaurant with a sign saying 'PLEASE WAIT TO BE SEATED'. I waited for ages. Finally, I went to the station. The announcer said, 'We apologize for the delay...' I just wanted to go home."
    }
  },
  {
    type: 'lesson',
    title: "Unit 7: Present Perfect vs. Past Simple",
    explanation: "Use Past Simple for finished actions at a specific time in the past (e.g., 'I worked for the BBC'). Use Present Perfect for actions over a period of time up to now, or past actions with a present result (e.g., 'I've worked there for five years').",
    examples: [
      { english: "I have worked there for five years. (I still work there)", arabic: "لقد عملت هناك لمدة خمس سنوات. (ما زلت أعمل هناك)" },
      { english: "I worked for the BBC. (I don't work there now)", arabic: "عملت في بي بي سي. (أنا لا أعمل هناك الآن)" },
      { english: "I went to Spain in 2010.", arabic: "ذهبت إلى إسبانيا في عام 2010." },
      { english: "I have been to Spain three times.", arabic: "لقد زرت إسبانيا ثلاث مرات." },
      { english: "She has lost her keys. (She can't find them now)", arabic: "لقد فقدت مفاتيحها. (لا تستطيع العثور عليها الآن)" },
      { english: "She lost her keys yesterday. (A finished past action)", arabic: "فقدت مفاتيحها أمس. (فعل ماضٍ منتهٍ)" },
      { english: "Have you ever eaten sushi?", arabic: "هل أكلت السوشي من قبل؟" },
      { english: "When did you go to Japan?", arabic: "متى ذهبت إلى اليابان؟" },
      { english: "I've just finished my homework.", arabic: "لقد أنهيت واجبي للتو." },
      { english: "I finished my homework an hour ago.", arabic: "أنهيت واجبي قبل ساعة." }
    ],
    mcqs: [
      { question: "Complete: 'She ___ her leg, so she can't play tennis today.'", options: ["broke", "has broken", "had broken", "breaks"], answer: "has broken" },
      { question: "Complete: 'Mozart ___ more than 600 pieces of music.'", options: ["has written", "wrote", "was writing", "writes"], answer: "wrote" }
    ],
    story: {
        title: "From an Interview with an Author",
        summary: "I started writing when I was a child. I wrote my first book in 2010. Since then, I have written five more. I have lived in many countries, which has given me ideas for my stories. Last year I went to Brazil to do research. I have never been to Russia, but I would like to go. I have just finished my latest novel. I finished it two weeks ago."
    }
  },
  {
    type: 'lesson',
    title: "Unit 7: Present Perfect Passive",
    explanation: "The passive form of the Present Perfect is 'have/has been + past participle'. It's used when the action is more important than who did it, for experiences or recent events.",
    examples: [
      { english: "Two novelists have been awarded the prize.", arabic: "مُنح روائيان الجائزة." },
      { english: "My car has been stolen!", arabic: "لقد سُرقت سيارتي!" },
      { english: "Have you ever been bitten by a dog?", arabic: "هل عضك كلب من قبل؟" },
      { english: "The new hospital has been opened.", arabic: "تم افتتاح المستشفى الجديد." },
      { english: "Two hundred homes have been washed away by the flood.", arabic: "جرفت الفيضانات مائتي منزل." },
      { english: "The windows haven't been cleaned for weeks.", arabic: "لم يتم تنظيف النوافذ منذ أسابيع." },
      { english: "Has my package been delivered yet?", arabic: "هل تم توصيل طردي بعد؟" },
      { english: "This book has been translated into many languages.", arabic: "تُرجم هذا الكتاب إلى العديد من اللغات." },
      { english: "The road is closed. There has been an accident.", arabic: "الطريق مغلق. لقد وقع حادث." },
      { english: "She hasn't been seen for three days.", arabic: "لم يتم رؤيتها لمدة ثلاثة أيام." }
    ],
    mcqs: [
      { question: "Change to passive: 'They have built a new bridge.'", options: ["A new bridge was built.", "A new bridge has been building.", "A new bridge has been built.", "A new bridge is built."], answer: "A new bridge has been built." },
      { question: "Complete: 'This book ___ into fifty languages.'", options: ["is translated", "has translated", "has been translated", "was being translated"], answer: "has been translated" }
    ],
     story: {
        title: "From a News Report",
        summary: "A new museum has just been opened in the city center. The building has been designed by a famous architect. Over five million dollars has been spent on the project. The main collection has been donated by a private collector. Many famous paintings have been included. The museum has already been visited by thousands of people."
    }
  },
  {
    type: 'lesson',
    title: "Unit 7: Phrasal Verbs",
    explanation: "A phrasal verb = verb + particle (e.g., look after, turn on). Some are separable (you can put the object in the middle: 'turn it on'). Some are inseparable ('look after the baby').",
    examples: [
      { english: "She looked out of the window. (Literal)", arabic: "نظرت من النافذة. (حرفي)" },
      { english: "Look out! A car is coming. (Idiomatic, means be careful)", arabic: "انتبه! سيارة قادمة. (اصطلاحي، يعني كن حذراً)" },
      { english: "Please turn the music down.", arabic: "من فضلك اخفض صوت الموسيقى." },
      { english: "I need to look after my little sister.", arabic: "أنا بحاجة إلى رعاية أختي الصغيرة." },
      { english: "He made up a crazy story.", arabic: "لقد اختلق قصة مجنونة." },
      { english: "Don't give up! Keep trying.", arabic: "لا تستسلم! استمر في المحاولة." },
      { english: "They have put off the meeting until next week.", arabic: "لقد أجلوا الاجتماع حتى الأسبوع المقبل." },
      { english: "I'll pick you up from the station at 6.", arabic: "سأقلك من المحطة في الساعة 6." },
      { english: "She takes after her mother.", arabic: "هي تشبه والدتها." },
      { english: "He ran out of money.", arabic: "نفد ماله." }
    ],
    mcqs: [
      { question: "Which phrasal verb means 'to postpone'?", options: ["put on", "put away", "put off", "put up"], answer: "put off" },
      { question: "Which sentence is correct?", options: ["Turn on it.", "Turn it on.", "On turn it.", "It turn on."], answer: "Turn it on." }
    ],
    story: {
        title: "From a Student's Diary",
        summary: "I have to look after my little brother today. It's hard to get on with him sometimes. I told him to turn down the TV, but he turned it up! I wanted to call my friend, but I'll have to put it off. I can't wait for my mum to pick me up. I feel like I'm going to run out of patience soon! I won't give up, though."
    }
  },
  {
    type: 'lesson',
    title: "Unit 7: On the Phone",
    explanation: "Learn essential phrases for phone calls, such as 'Can I take a message?', 'Would you like to hold?', and 'I'll put you through'.",
    examples: [
        { english: "Hello, can I speak to Mr. Smith, please?", arabic: "مرحبًا، هل يمكنني التحدث إلى السيد سميث، من فضلك؟" },
        { english: "I'm sorry, he's not here at the moment. Can I take a message?", arabic: "أنا آسف، هو ليس هنا في الوقت الحالي. هل يمكنني أخذ رسالة؟" },
        { english: "The line's engaged. Would you like to hold?", arabic: "الخط مشغول. هل تود الانتظار؟" },
        { english: "Could you tell him that Sarah called?", arabic: "هل يمكنك إخباره بأن سارة اتصلت؟" },
        { english: "I'll put you through to the sales department.", arabic: "سأوصلك بقسم المبيعات." },
        { english: "Who's calling, please?", arabic: "من المتصل، من فضلك؟" },
        { english: "I'm afraid you've got the wrong number.", arabic: "أخشى أنك طلبت الرقم الخطأ." },
        { english: "Can you speak up, please? It's a bad line.", arabic: "هل يمكنك التحدث بصوت أعلى، من فضلك؟ الخط سيء." },
        { english: "I'll call you back in five minutes.", arabic: "سأتصل بك مرة أخرى في غضون خمس دقائق." },
        { english: "Thanks for calling. Goodbye.", arabic: "شكرًا لاتصالك. وداعًا." }
    ],
    mcqs: [
        { question: "What do you say if the person you want to talk to is busy on another call?", options: ["The line's engaged.", "He's not here.", "Wrong number.", "Hold on."], answer: "The line's engaged." },
        { question: "What does 'to put someone through' mean?", options: ["To end the call", "To take a message", "To connect them to someone else", "To call them back"], answer: "To connect them to someone else" }
    ],
    story: {
        title: "From a Receptionist's Training Manual",
        summary: "When you answer, say the company name. Ask, 'Who's calling, please?' If the person they want is busy, say, 'The line's engaged. Would you like to hold?' If they are unavailable, ask, 'Can I take a message?' If you need to connect them to another department, say, 'One moment, I'll put you through.' If it's a bad connection, you can say, 'Can you speak up, please?'"
    }
  },
  {
    type: 'lesson',
    title: "Unit 8: First Conditional",
    explanation: "The First Conditional is for real possibilities in the future. Structure: If + Present Simple, ... will/won't + verb. It talks about a possible future condition and its probable result.",
    examples: [
      { english: "If I see Anna, I'll tell her.", arabic: "إذا رأيت آنا، سأخبرها." },
      { english: "If you don't study, you won't pass the exam.", arabic: "إذا لم تدرس، فلن تنجح في الامتحان." },
      { english: "What will you do if it rains?", arabic: "ماذا ستفعل إذا أمطرت؟" },
      { english: "If we hurry, we'll catch the bus.", arabic: "إذا أسرعنا، سنلحق بالحافلة." },
      { english: "If he calls, I'll let you know.", arabic: "إذا اتصل، سأخبرك." },
      { english: "You'll be tired tomorrow if you don't go to bed soon.", arabic: "ستكون متعبًا غدًا إذا لم تذهب إلى الفراش قريبًا." },
      { english: "If I have enough money, I'll buy a new phone.", arabic: "إذا كان لدي ما يكفي من المال، سأشتري هاتفًا جديدًا." },
      { english: "She'll be upset if you don't invite her.", arabic: "ستنزعج إذا لم تدعها." },
      { english: "If they win the match, they will celebrate.", arabic: "إذا فازوا بالمباراة، سيحتفلون." },
      { english: "I won't go unless you come with me.", arabic: "لن أذهب إلا إذا أتيت معي." }
    ],
    mcqs: [
      { question: "Complete: 'If you ___ hard, you will succeed.'", options: ["work", "will work", "worked", "would work"], answer: "work" },
      { question: "Complete: 'I'll call you when I ___.'", options: ["will arrive", "arrive", "am arriving", "arrived"], answer: "arrive" }
    ],
    story: {
        title: "From 'The Paradox of Choice'",
        summary: "If you have too many options, you will find it difficult to choose. If you finally make a choice, you will probably feel less satisfied with it. You will worry about the other options you didn't pick. If you want to be happier, you will need to limit your choices. If you only have a few good options, you'll feel more confident in your decision."
    }
  },
  {
    type: 'lesson',
    title: "Unit 8: Second Conditional",
    explanation: "The Second Conditional is for hypothetical or unreal situations in the present or future. Structure: If + Past Simple, ... would/wouldn't + verb. We often use 'were' instead of 'was' for all persons.",
    examples: [
      { english: "If I had £5 million, I'd buy an island.", arabic: "لو كان لدي 5 ملايين جنيه، لاشتريت جزيرة." },
      { english: "If I were you, I would apologize.", arabic: "لو كنت مكانك، لاعتذرت." },
      { english: "What would you do if you saw a ghost?", arabic: "ماذا كنت ستفعل لو رأيت شبحًا؟" },
      { english: "If I lived by the sea, I would go swimming every day.", arabic: "لو كنت أعيش بجوار البحر، لذهبت للسباحة كل يوم." },
      { english: "He would be happier if he had a different job.", arabic: "سيكون أكثر سعادة لو كان لديه وظيفة مختلفة." },
      { english: "If I knew her number, I would call her.", arabic: "لو كنت أعرف رقمها، لاتصلت بها." },
      { english: "Where would you go if you could travel anywhere?", arabic: "إلى أين ستذهب لو كان بإمكانك السفر إلى أي مكان؟" },
      { english: "They wouldn't do that if they knew the truth.", arabic: "لم يكونوا ليفعلوا ذلك لو عرفوا الحقيقة." },
      { english: "If we had more time, we could visit the museum.", arabic: "لو كان لدينا المزيد من الوقت، لكان بإمكاننا زيارة المتحف." },
      { english: "I wouldn't worry if I were you.", arabic: "لم أكن لأقلق لو كنت مكانك." }
    ],
    mcqs: [
      { question: "Complete: 'If I ___ the president, I would change many things.'", options: ["am", "was", "will be", "were"], answer: "were" },
      { question: "Complete: 'She ___ travel more if she had more money.'", options: ["will", "would", "is going to", "can"], answer: "would" }
    ],
    story: {
        title: "From 'The Alchemist'",
        summary: "A shepherd boy has a dream. If he travelled to the pyramids in Egypt, he would find a great treasure. He thinks, 'If I sold my sheep, I would have enough money for the journey.' His father says, 'If you had everything you wanted, you wouldn't be happy. The journey is the treasure.' What would you do if you were him? It's an imaginary situation, but it makes you think."
    }
  },
  {
    type: 'lesson',
    title: "Unit 8: Base and Strong Adjectives",
    explanation: "Some adjectives are 'base' (e.g., good, tired) and can be modified with 'very'. 'Strong' adjectives already have 'very' in their meaning (e.g., wonderful, exhausted) and are modified with 'absolutely' or 'really'.",
    examples: [
      { english: "I was very tired after the long journey.", arabic: "كنت متعبًا جدًا بعد الرحلة الطويلة." },
      { english: "The film wasn't just good, it was absolutely wonderful.", arabic: "لم يكن الفيلم جيدًا فحسب، بل كان رائعًا للغاية." },
      { english: "She was absolutely exhausted, not just tired.", arabic: "كانت منهكة تمامًا، وليس مجرد متعبة." },
      { english: "The weather is very cold today.", arabic: "الطقس بارد جدًا اليوم." },
      { english: "The weather is absolutely freezing!", arabic: "الطقس متجمد تمامًا!" },
      { english: "The story was very interesting.", arabic: "كانت القصة مثيرة للاهتمام جدًا." },
      { english: "The story was really fascinating.", arabic: "كانت القصة رائعة حقًا." },
      { english: "That's a very big house.", arabic: "هذا منزل كبير جدًا." },
      { english: "That house is absolutely enormous!", arabic: "هذا المنزل ضخم للغاية!" },
      { english: "I'm very hungry.", arabic: "أنا جائع جدًا." }
    ],
    mcqs: [
      { question: "Which is a strong adjective for 'bad'?", options: ["not good", "terrible", "very bad", "worse"], answer: "terrible" },
      { question: "Which adverb can you use with 'exhausted'?", options: ["very", "a bit", "absolutely", "fairly"], answer: "absolutely" }
    ],
    story: {
        title: "From a Restaurant Review",
        summary: "The restaurant was very nice, but the food was not just good, it was absolutely wonderful! My steak was very big, but my friend's was absolutely enormous! The dessert was very tasty. After the meal, I was not just tired, I was absolutely exhausted from eating so much. It was a really fantastic evening."
    }
  },
  {
    type: 'lesson',
    title: "Unit 8: Making Suggestions",
    explanation: "Use phrases like 'Let's...', 'Why don't we...?', and 'How about...?' to make suggestions. These are useful for making plans with friends.",
    examples: [
        { english: "Let's go shopping!", arabic: "دعنا نذهب للتسوق!" },
        { english: "Why don't you ask your parents?", arabic: "لماذا لا تسأل والديك؟" },
        { english: "How about going to the cinema tonight?", arabic: "ماذا عن الذهاب إلى السينما الليلة؟" },
        { english: "We could have a picnic in the park.", arabic: "يمكننا أن نقيم نزهة في الحديقة." },
        { english: "What about ordering a pizza?", arabic: "ماذا عن طلب بيتزا؟" },
        { english: "Let's meet at the café at 7 o'clock.", arabic: "دعنا نلتقي في المقهى الساعة 7." },
        { english: "Why don't we try that new restaurant?", arabic: "لماذا لا نجرب ذلك المطعم الجديد؟" },
        { english: "How about playing a game of chess?", arabic: "ماذا عن لعب مباراة شطرنج؟" },
        { english: "Maybe we should start early.", arabic: "ربما يجب أن نبدأ مبكرًا." },
        { english: "I suggest we take a break now.", arabic: "أقترح أن نأخذ استراحة الآن." }
    ],
    mcqs: [
        { question: "'How about' is followed by...", options: ["verb (base form)", "verb + -ing", "to + verb", "verb + -ed"], answer: "verb + -ing" },
        { question: "Which is NOT a suggestion?", options: ["Let's go.", "We must go.", "Why don't we go?", "We could go."], answer: "We must go." }
    ],
    story: {
        title: "From a Brainstorming Session Transcript",
        summary: "Team leader: 'We need new ideas.' Mark: 'Let's try a different approach.' Sarah: 'Why don't we survey our customers?' Tom: 'How about creating a viral video?' Leader: 'Those are good ideas. We could also partner with an influencer. What about that? I suggest we explore all these options.'"
    }
  },
  {
    type: 'lesson',
    title: "Unit 9: Modals of Probability (must, could, might, can't)",
    explanation: "Used to make logical deductions. 'must' = I'm almost sure it's true. 'might/could' = It's possible. 'can't' = I'm almost sure it's impossible.",
    examples: [
      { english: "You haven't eaten all day. You must be hungry.", arabic: "لم تأكل طوال اليوم. لا بد أنك جائع." },
      { english: "She isn't at home. She might be at work.", arabic: "هي ليست في المنزل. قد تكون في العمل." },
      { english: "That can't be John's car. He sold his car last week.", arabic: "لا يمكن أن تكون تلك سيارة جون. لقد باع سيارته الأسبوع الماضي." },
      { english: "He's very pale. He must be feeling ill.", arabic: "إنه شاحب جدًا. لا بد أنه يشعر بالمرض." },
      { english: "The phone is ringing. It could be my mother.", arabic: "الهاتف يرن. قد تكون والدتي." },
      { english: "You've been travelling all day. You must be tired.", arabic: "لقد كنت تسافر طوال اليوم. لا بد أنك متعب." },
      { english: "He's not answering his phone. He might be busy.", arabic: "إنه لا يرد على هاتفه. قد يكون مشغولاً." },
      { english: "She's only 24. She can't have a ten-year-old daughter!", arabic: "عمرها 24 عامًا فقط. لا يمكن أن يكون لديها ابنة تبلغ من العمر عشر سنوات!" },
      { english: "We may go to Greece for our holiday. We haven't decided yet.", arabic: "قد نذهب إلى اليونان في عطلتنا. لم نقرر بعد." },
      { english: "This bill can't be right. It's too expensive.", arabic: "لا يمكن أن تكون هذه الفاتورة صحيحة. إنها باهظة الثمن." }
    ],
    mcqs: [
      { question: "Complete: 'The lights are off. They ___ be at home.'", options: ["must", "might", "can't", "should"], answer: "can't" },
      { question: "Complete: 'I'm not sure where my keys are. I ___ have left them in the car.'", options: ["must", "can't", "could", "should"], answer: "could" }
    ],
    story: {
        title: "From a Sherlock Holmes story",
        summary: "The man is wearing expensive clothes, so he must be rich. His hands are rough, so he might be a manual laborer, but that can't be right if his clothes are so fine. He looks tired; he must have travelled a long way. He seems nervous. He could be in some kind of trouble. This may be a very interesting case."
    }
  },
  {
    type: 'lesson',
    title: "Unit 9: Past Modals of Probability",
    explanation: "To make deductions about the past, use modal + have + past participle. 'must have' (I'm sure it happened). 'might/could have' (It possibly happened). 'can't have' (I'm sure it didn't happen).",
    examples: [
      { english: "The ground is wet. It must have rained last night.", arabic: "الأرض مبللة. لا بد أنها أمطرت الليلة الماضية." },
      { english: "He's late. He might have missed the bus.", arabic: "إنه متأخر. ربما فاته الحافلة." },
      { english: "She can't have finished the report already. It's too long.", arabic: "لا يمكن أن تكون قد أنهت التقرير بالفعل. إنه طويل جداً." },
      { english: "He looks happy. He must have passed his exam.", arabic: "يبدو سعيدًا. لا بد أنه نجح في امتحانه." },
      { english: "I can't find my keys. I could have left them at the office.", arabic: "لا أستطيع العثور على مفاتيحي. قد أكون تركتها في المكتب." },
      { english: "He didn't come to the party. He might not have known about it.", arabic: "لم يأت إلى الحفلة. ربما لم يكن يعرف عنها." },
      { english: "She knew all the answers. She must have studied a lot.", arabic: "كانت تعرف كل الإجابات. لا بد أنها درست كثيرًا." },
      { english: "You can't have seen him yesterday. He was in a different country.", arabic: "لا يمكن أن تكون قد رأيته أمس. لقد كان في بلد مختلف." },
      { english: "The window is broken. A bird could have flown into it.", arabic: "النافذة مكسورة. قد يكون طائر قد طار إليها." },
      { english: "He was very tired. He can't have slept well.", arabic: "كان متعبًا جدًا. لا يمكن أنه نام جيدًا." }
    ],
    mcqs: [
      { question: "Complete: 'He failed the exam. He ___ studied very hard.'", options: ["must have", "can't have", "could have", "should have"], answer: "can't have" },
      { question: "Complete: 'I can't find my wallet. I ___ it at the restaurant.'", options: ["must leave", "can't have left", "might have left", "should leave"], answer: "might have left" }
    ],
    story: {
        title: "From a Cold Case Detective File",
        summary: "The victim's wallet was empty. The killer must have taken the money. The door was locked, so the killer might have had a key. There was no sign of a struggle, so the victim could have known his attacker. The neighbor heard nothing, but she can't have been home at the time of the murder. She must have gone out."
    }
  },
  {
    type: 'lesson',
    title: "Unit 9: Character Adjectives",
    explanation: "Adjectives used to describe a person's character and personality, such as reliable (someone you can trust), sociable (friendly), and easygoing (relaxed).",
    examples: [
      { english: "She is very reliable; if she says she'll do something, she'll do it.", arabic: "هي موثوقة جداً؛ إذا قالت إنها ستفعل شيئًا، فستفعله." },
      { english: "He's an easygoing person who never seems to worry.", arabic: "هو شخص هادئ لا يبدو أنه يقلق أبدًا." },
      { english: "My sister is very sociable and loves parties.", arabic: "أختي اجتماعية جدًا وتحب الحفلات." },
      { english: "He's too shy to speak in front of a large group.", arabic: "إنه خجول جدًا لدرجة أنه لا يستطيع التحدث أمام مجموعة كبيرة." },
      { english: "Don't be so rude! Apologize to her.", arabic: "لا تكن وقحًا! اعتذر لها." },
      { english: "She is a generous person who always helps others.", arabic: "هي شخصية كريمة تساعد الآخرين دائمًا." },
      { english: "He is a very intelligent and hardworking student.", arabic: "إنه طالب ذكي ومجتهد جدًا." },
      { english: "My boss is quite moody. You never know how she'll be.", arabic: "رئيسي متقلب المزاج. لا تعرف أبدًا كيف ستكون." },
      { english: "He is very ambitious and wants to be the company director.", arabic: "إنه طموح جدًا ويريد أن يكون مدير الشركة." },
      { english: "She has a cheerful personality and is always smiling.", arabic: "لديها شخصية مرحة وهي تبتسم دائمًا." }
    ],
    mcqs: [
      { question: "What is the opposite of 'shy'?", options: ["Sociable", "Reliable", "Easygoing", "Rude"], answer: "Sociable" },
      { question: "A person who is calm and doesn't get angry easily is...", options: ["Reliable", "Sociable", "Easygoing", "Generous"], answer: "Easygoing" }
    ],
    story: {
        title: "From a Performance Review",
        summary: "John is a very reliable employee. He is hardworking and ambitious. However, he can be shy in meetings and is not very sociable with his colleagues. His manager is more easygoing and cheerful, but can sometimes be moody. We need John to be less reserved and more outgoing to become a leader."
    }
  },
   {
    type: 'lesson',
    title: "Unit 9: Agreeing and Disagreeing",
    explanation: "Use 'So do I' or 'Neither do I' to agree with positive or negative statements, respectively. This requires repeating the auxiliary verb from the original statement.",
    examples: [
        { english: "A: I like ice-cream. B: So do I.", arabic: "أ: أنا أحب الآيس كريم. ب: وأنا كذلك." },
        { english: "A: I don't like working. B: Neither do I.", arabic: "أ: أنا لا أحب العمل. ب: ولا أنا." },
        { english: "A: I can swim. B: So can I.", arabic: "أ: أستطيع السباحة. ب: وأنا كذلك." },
        { english: "A: I can't drive. B: Neither can I.", arabic: "أ: لا أستطيع القيادة. ب: ولا أنا." },
        { english: "A: I'm wearing jeans. B: So am I.", arabic: "أ: أنا أرتدي الجينز. ب: وأنا كذلك." },
        { english: "A: I haven't been to Paris. B: Neither have I.", arabic: "أ: لم أذهب إلى باريس. ب: ولا أنا." },
        { english: "A: I went out last night. B: So did I.", arabic: "أ: خرجت الليلة الماضية. ب: وأنا كذلك." },
        { english: "To disagree: A: I like blue cheese. B: Oh, I don't.", arabic: "للاختلاف: أ: أنا أحب الجبن الأزرق. ب: أوه، أنا لا أحبه." },
        { english: "To disagree: A: I can't speak Polish. B: Really? I can.", arabic: "للاختلاف: أ: لا أستطيع التحدث بالبولندية. ب: حقًا؟ أنا أستطيع." },
        { english: "A: I'm tired. B: So am I.", arabic: "أ: أنا متعب. ب: وأنا كذلك." }
    ],
    mcqs: [
        { question: "How do you agree with 'I love chocolate'?", options: ["Neither do I", "So I do", "So do I", "I do so"], answer: "So do I" },
        { question: "How do you agree with 'I haven't seen that film'?", options: ["So have I", "Neither I have", "Neither have I", "I haven't also"], answer: "Neither have I" }
    ],
    story: {
        title: "From a Conversation Between Friends",
        summary: "'I really enjoyed that movie,' said Anna. 'So did I,' replied Ben. 'But I don't think I understood the ending.' 'Neither did I!' said Anna. 'I haven't read the book it was based on.' 'Neither have I,' Ben agreed. 'I'm not usually a fan of sci-fi.' 'Oh, I am,' said Anna, disagreeing for the first time."
    }
  },
  {
    type: 'lesson',
    title: "Unit 10: Present Perfect Continuous",
    explanation: "Focuses on the duration of an activity that started in the past and is still ongoing, or has just stopped. Form: have/has been + verb-ing.",
    examples: [
      { english: "I've been texting my friends all day long.", arabic: "كنت أراسل أصدقائي طوال اليوم." },
      { english: "How long have you been learning English?", arabic: "منذ متى وأنت تتعلم اللغة الإنجليزية؟" },
      { english: "She's been living in Paris since she got married.", arabic: "هي تعيش في باريس منذ أن تزوجت." },
      { english: "He looks tired. He's been working hard.", arabic: "يبدو متعبًا. لقد كان يعمل بجد." },
      { english: "It has been raining for three hours.", arabic: "إنها تمطر منذ ثلاث ساعات." },
      { english: "We've been waiting for you for over an hour.", arabic: "لقد كنا ننتظرك لأكثر من ساعة." },
      { english: "They have been playing tennis since 10 o'clock.", arabic: "لقد كانوا يلعبون التنس منذ الساعة 10." },
      { english: "My eyes are sore because I've been reading all night.", arabic: "عيناي تؤلمانني لأنني كنت أقرأ طوال الليل." },
      { english: "She's been trying to call you all morning.", arabic: "لقد كانت تحاول الاتصال بك طوال الصباح." },
      { english: "What have you been doing lately?", arabic: "ماذا كنت تفعل مؤخرًا؟" }
    ],
    mcqs: [
      { question: "Complete: 'It ___ for hours.'", options: ["rains", "is raining", "has rained", "has been raining"], answer: "has been raining" },
      { question: "Complete: 'I'm tired because I ___.'", options: ["have worked", "have been working", "worked", "am working"], answer: "have been working" }
    ],
    story: {
        title: "From 'Outliers' by Malcolm Gladwell",
        summary: "The book explores success. It argues that people like Bill Gates haven't just been lucky. They have been practicing for years. He has been programming since he was a teenager. For ten thousand hours, he has been honing his skills. The Beatles had also been performing for years in Hamburg before they became famous. They had been playing for eight hours a night."
    }
  },
  {
    type: 'lesson',
    title: "Unit 10: Present Perfect Simple vs. Continuous",
    explanation: "Use the Simple form to focus on the result or completion of an action, especially with numbers ('I've written three emails'). Use the Continuous form to focus on the duration of the activity ('I've been writing emails all morning').",
    examples: [
      { english: "She has received a huge phone bill. (Result)", arabic: "لقد استلمت فاتورة هاتف ضخمة. (نتيجة)" },
      { english: "She has been calling her friends all day. (Duration)", arabic: "كانت تتصل بأصدقائها طوال اليوم. (مدة)" },
      { english: "I've read that book. It's great. (Completed action)", arabic: "لقد قرأت ذلك الكتاب. إنه رائع. (فعل مكتمل)" },
      { english: "I've been reading this book all day. (Activity over time)", arabic: "كنت أقرأ هذا الكتاب طوال اليوم. (نشاط على مدار الوقت)" },
      { english: "He has painted the living room. (Result is a painted room)", arabic: "لقد طلى غرفة المعيشة. (النتيجة هي غرفة مطلية)" },
      { english: "He has been painting all morning. (He is tired and covered in paint)", arabic: "لقد كان يطلي طوال الصباح. (إنه متعب ومغطى بالطلاء)" },
      { english: "I've written three emails this morning.", arabic: "لقد كتبت ثلاث رسائل بريد إلكتروني هذا الصباح." },
      { english: "I've been writing emails all morning.", arabic: "كنت أكتب رسائل بريد إلكتروني طوال الصباح." },
      { english: "They have travelled to ten countries.", arabic: "لقد سافروا إلى عشرة بلدان." },
      { english: "They have been travelling for six months.", arabic: "لقد كانوا يسافرون لمدة ستة أشهر." }
    ],
    mcqs: [
      { question: "Complete: 'I ___ three books this month.'", options: ["have been reading", "have read", "read", "am reading"], answer: "have read" },
      { question: "Complete: 'My clothes are dirty because I ___ the garden.'", options: ["worked in", "have been working in", "have worked in", "work in"], answer: "have been working in" }
    ],
    story: {
        title: "From a Project Update Meeting",
        summary: "Manager: 'What's the status?' Sarah: 'I've been working on the report all week. I have written the first two sections.' Tom: 'I've contacted five clients so far.' Manager: 'And the marketing materials?' Jane: 'I've been designing the brochure. I have finally finished the cover.' Manager: 'Good. It sounds like you have all been making excellent progress.'"
    }
  },
  {
    type: 'lesson',
    title: "Unit 10: Expressing Quantity",
    explanation: "Learn phrases to talk about quantity: 'How much' for uncountable nouns (coffee, money), 'How many' for countable nouns (books, friends), and words like 'a lot of', 'too much', 'too many', 'enough'.",
    examples: [
      { english: "How much coffee do you drink?", arabic: "كم تشرب من القهوة؟" },
      { english: "That's too much sugar for me.", arabic: "هذا سكر أكثر من اللازم بالنسبة لي." },
      { english: "I have a lot of friends.", arabic: "لدي الكثير من الأصدقاء." },
      { english: "How many people were at the party?", arabic: "كم عدد الأشخاص الذين كانوا في الحفلة؟" },
      { english: "There are too many cars on the road.", arabic: "هناك عدد كبير جدًا من السيارات على الطريق." },
      { english: "We don't have enough time.", arabic: "ليس لدينا ما يكفي من الوقت." },
      { english: "Do you have enough money?", arabic: "هل لديك ما يكفي من المال؟" },
      { english: "She eats a few biscuits every day.", arabic: "تأكل بضع بسكويتات كل يوم." },
      { english: "I only have a little milk left.", arabic: "لدي القليل فقط من الحليب المتبقي." },
      { english: "There isn't much work to do.", arabic: "ليس هناك الكثير من العمل للقيام به." }
    ],
    mcqs: [
      { question: "Which is correct?", options: ["How much people were there?", "How many people was there?", "How many people were there?", "How much people was there?"], answer: "How many people were there?" },
      { question: "Complete: 'There is ___ traffic on the roads today.'", options: ["too many", "too much", "enough", "many"], answer: "too much" }
    ],
    story: {
        title: "From a Guide to Simple Living",
        summary: "How many possessions do you really need? Many people have too many clothes and not enough space. They spend too much money on things they don't use. A few special items are better than a lot of clutter. Ask yourself: 'How much time do I spend managing my things?' You'll find you have little need for most of them."
    }
  },
  {
    type: 'lesson',
    title: "Unit 10: Compound Nouns",
    explanation: "A compound noun is a noun made of two or more words, like 'ponytail', 'movie star', or 'swimming pool'. They can be written as one word, two words, or with a hyphen.",
    examples: [
        { english: "She has her hair in a ponytail.", arabic: "لديها شعرها على شكل ذيل حصان." },
        { english: "He wants to be a movie star.", arabic: "يريد أن يصبح نجم سينمائي." },
        { english: "Let's go to the swimming pool.", arabic: "لنذهب إلى حمام السباحة." },
        { english: "I need to buy some toothpaste.", arabic: "أحتاج لشراء بعض معجون الأسنان." },
        { english: "The bus stop is just around the corner.", arabic: "موقف الحافلات قاب قوسين أو أدنى." },
        { english: "My bedroom is upstairs.", arabic: "غرفة نومي في الطابق العلوي." },
        { english: "He works as a firefighter.", arabic: "يعمل كرجل إطفاء." },
        { english: "What time is sunrise?", arabic: "ما هو وقت شروق الشمس؟" },
        { english: "You need to fill in this application form.", arabic: "تحتاج إلى ملء استمارة الطلب هذه." },
        { english: "It was a check-in desk at the airport.", arabic: "كان مكتب تسجيل الوصول في المطار." }
    ],
    mcqs: [
        { question: "Which of these is a compound noun?", options: ["beautiful house", "running machine", "quickly run", "white board"], answer: "white board" },
        { question: "A 'post office' is a place where you can...", options: ["watch films", "buy food", "send letters", "read books"], answer: "send letters" }
    ],
     story: {
        title: "From a Story About a Day Out",
        summary: "We left after sunrise. We waited at the bus stop for a long time. Then we went to the swimming pool. My daughter, who wants to be a movie star, lost her sunglasses. We looked everywhere. Afterwards, we had ice-cream cones. We got home late and went straight to our bedrooms. I had to use my wife's toothpaste."
    }
  },
  {
    type: 'lesson',
    title: "Unit 11: Indirect Questions",
    explanation: "To be more polite, we often use indirect questions, which start with phrases like 'Could you tell me...' or 'I wonder...'. The word order is like a statement (subject + verb), not a question.",
    examples: [
      { english: "Direct: What time is it? -> Indirect: Could you tell me what time it is?", arabic: "مباشر: كم الساعة؟ -> غير مباشر: هل يمكنك أن تخبرني كم الساعة؟" },
      { english: "Direct: Does this bus go downtown? -> Indirect: Do you know if this bus goes downtown?", arabic: "مباشر: هل تذهب هذه الحافلة إلى وسط المدينة؟ -> غير مباشر: هل تعرف ما إذا كانت هذه الحافلة تذهب إلى وسط المدينة؟" },
      { english: "Direct: Where is the post office? -> Indirect: Can you tell me where the post office is?", arabic: "مباشر: أين مكتب البريد؟ -> غير مباشر: هل يمكنك إخباري أين مكتب البريد؟" },
      { english: "I wonder what he's doing.", arabic: "أتساءل ماذا يفعل." },
      { english: "I'd like to know how much this costs.", arabic: "أود أن أعرف كم يكلف هذا." },
      { english: "Do you have any idea when the train leaves?", arabic: "هل لديك أي فكرة متى يغادر القطار؟" },
      { english: "I can't remember where I put my keys.", arabic: "لا أستطيع أن أتذكر أين وضعت مفاتيحي." },
      { english: "Do you know whether the shops are open?", arabic: "هل تعرف ما إذا كانت المتاجر مفتوحة؟" },
      { english: "I'm not sure if this is the right way.", arabic: "لست متأكدًا مما إذا كان هذا هو الطريق الصحيح." },
      { english: "Could you explain why the project was delayed?", arabic: "هل يمكنك شرح سبب تأخر المشروع؟" }
    ],
    mcqs: [
      { question: "Make this question indirect: 'Where is the nearest bank?'", options: ["Can you tell me where is the nearest bank?", "Can you tell me where the nearest bank is?", "Can you tell me where the bank nearest is?", "Can you tell me is where the nearest bank?"], answer: "Can you tell me where the nearest bank is?" },
      { question: "Complete: 'I wonder ___.'", options: ["if she will come", "will she come", "if will she come", "she will come"], answer: "if she will come" }
    ],
    story: {
        title: "From a Tourist's Conversation",
        summary: "Excuse me, could you tell me how I can get to the museum? I'd also like to know if there is a good restaurant nearby. I wonder what time the museum closes. Do you know if I need to buy a ticket in advance? I can't remember what the guidebook said. And do you have any idea how much a taxi would cost?"
    }
  },
  {
    type: 'lesson',
    title: "Unit 11: Question Tags",
    explanation: "Question tags are short questions at the end of statements, used to confirm information or encourage a reply. The pattern is usually positive statement + negative tag, or negative statement + positive tag.",
    examples: [
      { english: "It's a beautiful day, isn't it?", arabic: "إنه يوم جميل، أليس كذلك؟" },
      { english: "You haven't seen my keys, have you?", arabic: "لم تر مفاتيحي، أليس كذلك؟" },
      { english: "She works here, doesn't she?", arabic: "هي تعمل هنا، أليس كذلك؟" },
      { english: "He can't swim, can he?", arabic: "لا يستطيع السباحة، أليس كذلك؟" },
      { english: "They went to the party, didn't they?", arabic: "ذهبوا إلى الحفلة، أليس كذلك؟" },
      { english: "You're coming to the meeting, aren't you?", arabic: "أنت قادم إلى الاجتماع، أليس كذلك؟" },
      { english: "It wasn't very expensive, was it?", arabic: "لم يكن باهظ الثمن، أليس كذلك؟" },
      { english: "We should leave now, shouldn't we?", arabic: "يجب أن نغادر الآن، أليس كذلك؟" },
      { english: "You won't tell anyone, will you?", arabic: "لن تخبر أحداً، أليس كذلك؟" },
      { english: "I'm late, aren't I?", arabic: "أنا متأخر، أليس كذلك؟" }
    ],
    mcqs: [
      { question: "Add a question tag: 'He can swim,...'", options: ["can he?", "can't he?", "does he?", "doesn't he?"], answer: "can't he?" },
      { question: "Add a question tag: 'You didn't do it,...'", options: ["did you?", "didn't you?", "do you?", "don't you?"], answer: "did you?" }
    ],
    story: {
        title: "From 'How to Win Friends and Influence People'",
        summary: "Remembering someone's name is important, isn't it? People like to hear their own name, don't they? And you want them to feel good, don't you? It's a simple trick, but it works. You haven't forgotten my name, have you? It wasn't that difficult to remember, was it? We should all try to do this more often, shouldn't we?"
    }
  },
  {
    type: 'lesson',
    title: "Unit 11: Idioms",
    explanation: "Idioms are expressions where the meaning is not obvious from the individual words. For example, 'hit the roof' means to get very angry.",
    examples: [
      { english: "When he saw the broken vase, he hit the roof.", arabic: "عندما رأى المزهرية المكسورة، غضب بشدة." },
      { english: "The exam was a piece of cake.", arabic: "كان الامتحان سهلاً جداً." },
      { english: "It's raining cats and dogs outside.", arabic: "إنها تمطر بغزارة في الخارج." },
      { english: "I'm feeling a bit under the weather today.", arabic: "أشعر ببعض التوعك اليوم." },
      { english: "This car costs an arm and a leg.", arabic: "هذه السيارة باهظة الثمن." },
      { english: "Break a leg! I know you'll be great in the play.", arabic: "حظًا موفقًا! أعلم أنك ستكون رائعًا في المسرحية." },
      { english: "He let the cat out of the bag and told everyone about the surprise party.", arabic: "لقد أفشى السر وأخبر الجميع عن حفلة المفاجأة." },
      { english: "I only see my cousins once in a blue moon.", arabic: "أرى أبناء عمي نادرًا جدًا." },
      { english: "We have to learn these words by heart.", arabic: "يجب أن نتعلم هذه الكلمات عن ظهر قلب." },
      { english: "Hold your breath, the results are about to be announced.", arabic: "انتظر بقلق، النتائج على وشك أن تعلن." }
    ],
    mcqs: [
      { question: "What does 'to hold your breath' mean?", options: ["To breathe deeply", "To wait for something anxiously", "To be out of breath", "To stop breathing"], answer: "To wait for something anxiously" },
      { question: "If something costs 'an arm and a leg', it is very...", options: ["cheap", "heavy", "expensive", "useful"], answer: "expensive" }
    ],
     story: {
        title: "From a Business Negotiation",
        summary: "The negotiation was tough. I thought it would be a piece of cake, but their first offer was so low, I nearly hit the roof. They wanted a price that was a steal. I had to bite the bullet and make a counter-offer. It cost an arm and a leg for our company, but in the end, we cut a deal. I was so relieved, I could finally breathe a sigh of relief."
    }
  },
  {
    type: 'lesson',
    title: "Unit 11: Informal English",
    explanation: "Informal English includes slang and conversational phrases used with friends, such as 'What's up?', 'Hang on a sec', or 'break for lunch'.",
    examples: [
        { english: "What's up? - Not much.", arabic: "ما الأخبار؟ - لا شيء كثير." },
        { english: "Hang on a sec, I'm nearly ready.", arabic: "انتظر لحظة، أنا على وشك أن أكون جاهزًا." },
        { english: "What do you say we break for lunch?", arabic: "ما رأيك أن نتوقف لتناول طعام الغداء؟" },
        { english: "I'm gonna go to the shops.", arabic: "سأذهب إلى المتاجر." },
        { english: "Do you wanna grab a coffee?", arabic: "هل تريد أن نحتسي فنجان قهوة؟" },
        { english: "He's a cool guy.", arabic: "إنه رجل رائع." },
        { english: "That movie was awesome!", arabic: "كان ذلك الفيلم رائعًا!" },
        { english: "I'm beat. I'm going to bed.", arabic: "أنا منهك. سأذهب إلى الفراش." },
        { english: "Can you give me a hand with this?", arabic: "هل يمكنك مساعدتي في هذا؟" },
        { english: "No worries, it's all good.", arabic: "لا تقلق، كل شيء على ما يرام." }
    ],
    mcqs: [
        { question: "Which is an informal way to say 'wait a moment'?", options: ["Please wait", "Hold on", "Hang on a sec", "One moment"], answer: "Hang on a sec" },
        { question: "'Wanna' is an informal contraction of...", options: ["want to", "will not", "what do you", "was not"], answer: "want to" }
    ],
    story: {
        title: "From a Chat Between Friends",
        summary: "'Hey, what's up?' 'Not much. I'm beat.' 'Wanna grab a coffee later?' 'Sure. Give me a sec, I gotta finish this email.' 'No worries. Can you give me a hand with my homework after?' 'Yeah, it's all good. That new superhero movie was awesome, by the way.' 'Totally!'"
    }
  },
  {
    type: 'lesson',
    title: "Unit 12: Reported Statements",
    explanation: "To report what someone said, we often use a reporting verb (like 'said' or 'told') and change the original tense 'one step back' into the past (e.g., Present Simple -> Past Simple).",
    examples: [
      { english: "Direct speech: 'I am tired.' -> Reported speech: He said that he was tired.", arabic: "كلام مباشر: 'أنا متعب.' -> كلام منقول: قال إنه كان متعبًا." },
      { english: "Direct: 'I will be there.' -> Reported: She told me she would be there.", arabic: "مباشر: 'سأكون هناك.' -> منقول: أخبرتني أنها ستكون هناك." },
      { english: "Direct: 'We are studying.' -> Reported: They said they were studying.", arabic: "مباشر: 'نحن ندرس.' -> منقول: قالوا إنهم كانوا يدرسون." },
      { english: "Direct: 'He has finished his work.' -> Reported: She said he had finished his work.", arabic: "مباشر: 'لقد أنهى عمله.' -> منقول: قالت إنه قد أنهى عمله." },
      { english: "Direct: 'I went to the cinema.' -> Reported: He told me he had gone to the cinema.", arabic: "مباشر: 'ذهبت إلى السينما.' -> منقول: أخبرني أنه قد ذهب إلى السينما." },
      { english: "Direct: 'I can't come.' -> Reported: She said she couldn't come.", arabic: "مباشر: 'لا أستطيع المجيء.' -> منقول: قالت إنها لا تستطيع المجيء." },
      { english: "Direct: 'My parents are arriving tomorrow.' -> Reported: He said his parents were arriving the next day.", arabic: "مباشر: 'سيصل والداي غدًا.' -> منقول: قال إن والديه سيصلون في اليوم التالي." },
      { english: "Direct: 'I love this city.' -> Reported: She said she loved that city.", arabic: "مباشر: 'أنا أحب هذه المدينة.' -> منقول: قالت إنها أحبت تلك المدينة." },
      { english: "Direct: 'I saw you yesterday.' -> Reported: He said he had seen me the day before.", arabic: "مباشر: 'رأيتك أمس.' -> منقول: قال إنه رآني في اليوم السابق." },
      { english: "Direct: 'I'm not feeling well.' -> Reported: She told him she wasn't feeling well.", arabic: "مباشر: 'أنا لا أشعر بحالة جيدة.' -> منقول: أخبرته أنها لا تشعر بحالة جيدة." }
    ],
    mcqs: [
      { question: "Report this: 'I work in London.'", options: ["She said she works in London.", "She said she worked in London.", "She said I work in London.", "She told she worked in London."], answer: "She said she worked in London." },
      { question: "Report this: 'We have finished.'", options: ["They said they have finished.", "They said we had finished.", "They said they had finished.", "They told us we have finished."], answer: "They said they had finished." }
    ],
    story: {
        title: "From a Witness Statement",
        summary: "The witness spoke to the police. He said that he was walking his dog. He told the officer that he had seen a strange car on the street. He said that the car was blue. He explained that he hadn't seen the driver's face. He also mentioned that his neighbor had been looking out of her window at the time."
    }
  },
  {
    type: 'lesson',
    title: "Unit 12: Reported Questions",
    explanation: "To report questions, use a reporting verb like 'asked' and use statement word order. If there is no question word (who, what, where), use 'if' or 'whether'.",
    examples: [
      { english: "Direct: 'Where do you live?' -> Reported: He asked me where I lived.", arabic: "مباشر: 'أين تعيش؟' -> منقول: سألني أين أعيش." },
      { english: "Direct: 'Are you coming?' -> Reported: She asked if I was coming.", arabic: "مباشر: 'هل أنت قادم؟' -> منقول: سألت إذا كنت قادمًا." },
      { english: "Direct: 'What is your name?' -> Reported: He asked me what my name was.", arabic: "مباشر: 'ما اسمك؟' -> منقول: سألني ما هو اسمي." },
      { english: "Direct: 'Did you finish your homework?' -> Reported: She asked if I had finished my homework.", arabic: "مباشر: 'هل أنهيت واجبك؟' -> منقول: سألت إذا كنت قد أنهيت واجبي." },
      { english: "Direct: 'When will you arrive?' -> Reported: I asked him when he would arrive.", arabic: "مباشر: 'متى ستصل؟' -> منقول: سألته متى سيصل." },
      { english: "Direct: 'Can you help me?' -> Reported: He asked me if I could help him.", arabic: "مباشر: 'هل يمكنك مساعدتي؟' -> منقول: سألني إذا كان بإمكاني مساعدته." },
      { english: "Direct: 'How do you know them?' -> Reported: She asked me how I knew them.", arabic: "مباشر: 'كيف تعرفهم؟' -> منقول: سألتني كيف أعرفهم." },
      { english: "Direct: 'Have you seen this film?' -> Reported: He asked if I had seen that film.", arabic: "مباشر: 'هل شاهدت هذا الفيلم؟' -> منقول: سأل إذا كنت قد شاهدت ذلك الفيلم." },
      { english: "Direct: 'Why are you laughing?' -> Reported: She asked him why he was laughing.", arabic: "مباشر: 'لماذا تضحك؟' -> منقول: سألته لماذا كان يضحك." },
      { english: "Direct: 'Is the restaurant open?' -> Reported: He asked whether the restaurant was open.", arabic: "مباشر: 'هل المطعم مفتوح؟' -> منقول: سأل ما إذا كان المطعم مفتوحًا." }
    ],
    mcqs: [
      { question: "Report this: 'What time is it?'", options: ["He asked what time is it.", "He asked what is the time.", "He asked what time it was.", "He asked what time it is."], answer: "He asked what time it was." },
      { question: "Report this: 'Did you see the film?'", options: ["She asked if I had seen the film.", "She asked did I see the film.", "She asked I had seen the film.", "She asked if had I seen the film."], answer: "She asked if I had seen the film." }
    ],
    story: {
        title: "From a Job Interview",
        summary: "The interviewer asked me why I had applied for the job. She also asked what my biggest strengths were. She wanted to know if I could work well under pressure. Then she asked me when I would be able to start. Finally, she asked if I had any questions for her."
    }
  },
  {
    type: 'lesson',
    title: "Unit 12: Reported Commands/Requests",
    explanation: "To report commands and requests, use the pattern: reporting verb (told, asked) + object + (not) to + infinitive.",
    examples: [
      { english: "Direct: 'Stop making a noise!' -> Reported: He told them to stop making a noise.", arabic: "مباشر: 'توقفوا عن إحداث ضوضاء!' -> منقول: أخبرهم أن يتوقفوا عن إحداث ضوضاء." },
      { english: "Direct: 'Please help me.' -> Reported: I asked them to help me.", arabic: "مباشر: 'من فضلكم ساعدوني.' -> منقول: طلبت منهم مساعدتي." },
      { english: "Direct: 'Go to your room.' -> Reported: She told the child to go to his room.", arabic: "مباشر: 'اذهب إلى غرفتك.' -> منقول: أخبرت الطفل أن يذهب إلى غرفته." },
      { english: "Direct: 'Don't touch that!' -> Reported: He told me not to touch that.", arabic: "مباشر: 'لا تلمس ذلك!' -> منقول: أخبرني ألا ألمس ذلك." },
      { english: "Direct: 'Could you open the door?' -> Reported: She asked him to open the door.", arabic: "مباشر: 'هل يمكنك فتح الباب؟' -> منقول: طلبت منه فتح الباب." },
      { english: "Direct: 'Remember to buy milk.' -> Reported: He reminded me to buy milk.", arabic: "مباشر: 'تذكر شراء الحليب.' -> منقول: ذكرني بشراء الحليب." },
      { english: "Direct: 'Be quiet.' -> Reported: The teacher told the students to be quiet.", arabic: "مباشر: 'كن هادئًا.' -> منقول: أخبر المعلم الطلاب أن يكونوا هادئين." },
      { english: "Direct: 'Please don't be late.' -> Reported: She asked us not to be late.", arabic: "مباشر: 'من فضلكم لا تتأخروا.' -> منقول: طلبت منا ألا نتأخر." },
      { english: "Direct: 'Try to do your best.' -> Reported: He encouraged them to try to do their best.", arabic: "مباشر: 'حاول أن تبذل قصارى جهدك.' -> منقول: شجعهم على محاولة بذل قصارى جهدهم." },
      { english: "Direct: 'Switch off the TV.' -> Reported: My father told me to switch off the TV.", arabic: "مباشر: 'أطفئ التلفاز.' -> منقول: أخبرني والدي أن أطفئ التلفاز." }
    ],
    mcqs: [
      { question: "Report this: 'Don't be late.'", options: ["He told me don't be late.", "He told me to not be late.", "He told me not to be late.", "He told to me not be late."], answer: "He told me not to be late." },
      { question: "Report this: 'Could you open the window?'", options: ["She asked me open the window.", "She asked me to open the window.", "She asked to me to open the window.", "She asked me could I open the window."], answer: "She asked me to open the window." }
    ],
    story: {
        title: "From a Courtroom Drama",
        summary: "The judge told the witness to tell the truth. The lawyer asked the witness to describe the events of that night. The witness was nervous. The judge told him to speak clearly. The lawyer then asked him not to get emotional. The judge reminded everyone to remain silent in the courtroom."
    }
  },
  {
    type: 'lesson',
    title: "Unit 12: Saying Sorry",
    explanation: "Different situations require different ways of apologizing. 'Excuse me' is for getting attention or passing someone. 'I'm sorry' is for mistakes or expressing sympathy.",
    examples: [
        { english: "Excuse me, can I get past?", arabic: "عفوًا، هل يمكنني المرور؟" },
        { english: "I'm sorry, I didn't mean to do that.", arabic: "أنا آسف، لم أقصد فعل ذلك." },
        { english: "I'm so sorry to hear about your accident.", arabic: "أنا آسف جدًا لسماع خبر حادثك." },
        { english: "Excuse me, is this seat taken?", arabic: "عفوًا، هل هذا المقعد محجوز؟" },
        { english: "I apologize for my mistake.", arabic: "أعتذر عن خطئي." },
        { english: "Sorry for the delay.", arabic: "آسف على التأخير." },
        { english: "Please forgive me.", arabic: "أرجوك سامحني." },
        { english: "It was my fault. I'm very sorry.", arabic: "لقد كان خطئي. أنا آسف جدًا." },
        { english: "Excuse me, do you have the time?", arabic: "عفوًا، هل لديك الوقت؟" },
        { english: "I'm sorry for your loss.", arabic: "أنا آسف لخسارتك. (عند التعزية)" }
    ],
    mcqs: [
        { question: "What do you say to get someone's attention politely?", options: ["Hey!", "Sorry", "Excuse me", "Listen"], answer: "Excuse me" },
        { question: "You hear your friend has failed an exam. You say:", options: ["Excuse me.", "I'm sorry to hear that.", "Never mind.", "I apologize."], answer: "I'm sorry to hear that." }
    ],
    story: {
        title: "From a Customer Service Transcript",
        summary: "Customer: 'Excuse me, there's a problem with my order.' Agent: 'I'm sorry to hear that. Can you explain?' Customer: 'You sent the wrong item.' Agent: 'Oh, it was our fault. I apologize for the mistake. I'm very sorry for the inconvenience.' Customer: 'Thank you.' Agent: 'We're sorry for the delay in getting you the right product.'"
    }
  },
  {
    type: 'lesson',
    title: "Writing: Correcting Mistakes (1) - Informal Letter",
    explanation: "This lesson focuses on identifying and correcting common grammatical mistakes in the context of an informal letter, covering tense usage, punctuation, and spelling.",
    examples: [
      { english: "Incorrect: I am come from Spain. Correct: I come from Spain.", arabic: "خطأ: I am come from Spain. صحيح: I come from Spain." },
      { english: "Incorrect: Thank you for have me. Correct: Thank you for having me.", arabic: "خطأ: Thank you for have me. صحيح: Thank you for having me." },
      { english: "Incorrect: I enjoyed to meet your friends. Correct: I enjoyed meeting your friends.", arabic: "خطأ: I enjoyed to meet your friends. صحيح: I enjoyed meeting your friends." },
      { english: "Incorrect: I look forward to see you. Correct: I look forward to seeing you.", arabic: "خطأ: I look forward to see you. صحيح: I look forward to seeing you." },
      { english: "Incorrect: She ask me to call her. Correct: She asked me to call her.", arabic: "خطأ: She ask me to call her. صحيح: She asked me to call her." },
      { english: "Incorrect: I didn't knew the answer. Correct: I didn't know the answer.", arabic: "خطأ: I didn't knew the answer. صحيح: I didn't know the answer." },
      { english: "Incorrect: He has lived here since two years. Correct: He has lived here for two years.", arabic: "خطأ: He has lived here since two years. صحيح: He has lived here for two years." },
      { english: "Incorrect: This is more better. Correct: This is better.", arabic: "خطأ: This is more better. صحيح: This is better." },
      { english: "Incorrect: I'm very interesting in this topic. Correct: I'm very interested in this topic.", arabic: "خطأ: I'm very interesting in this topic. صحيح: I'm very interested in this topic." },
      { english: "Incorrect: Your's sincerely. Correct: Yours sincerely.", arabic: "خطأ: Your's sincerely. صحيح: Yours sincerely." }
    ],
    mcqs: [
      { question: "Which sentence is correct?", options: ["He told to me a story.", "He told me a story.", "He said me a story.", "He say me a story."], answer: "He told me a story." },
      { question: "Which verb form follows 'look forward to'?", options: ["infinitive", "infinitive with to", "-ing form", "past simple"], answer: "-ing form" }
    ],
    story: {
        title: "From an Editor's Notes",
        summary: "The author's letter has several mistakes. He wrote, 'I look forward to see you,' but it should be 'seeing'. He wrote, 'I enjoyed to meet your family,' but it needs to be 'meeting'. He also wrote, 'She ask me to send the book,' when it should be 'asked'. Finally, 'since five years' is incorrect; it should be 'for five years'. These are common errors."
    }
  },
  {
    type: 'lesson',
    title: "Writing: Letters and Emails",
    explanation: "Learn the difference in format and tone between formal and informal letters and emails. Key components include salutations, closing phrases, and appropriate language for each style.",
    examples: [
      { english: "Informal opening: Hi John, / Dear Sarah,", arabic: "افتتاحية غير رسمية: مرحبًا جون، / عزيزتي سارة،" },
      { english: "Formal opening: Dear Mr. Smith, / Dear Sir or Madam,", arabic: "افتتاحية رسمية: عزيزي السيد سميث، / عزيزي السيد أو السيدة،" },
      { english: "Informal closing: Best wishes, / Cheers, / Love,", arabic: "خاتمة غير رسمية: مع أطيب التمنيات، / تحياتي، / مع حبي،" },
      { english: "Formal closing: Yours sincerely, / Yours faithfully,", arabic: "خاتمة رسمية: المخلص لكم، / وتفضلوا بقبول فائق الاحترام،" },
      { english: "Informal phrase: Thanks for your email.", arabic: "عبارة غير رسمية: شكرًا على بريدك الإلكتروني." },
      { english: "Formal phrase: Thank you for your email of 12th May.", arabic: "عبارة رسمية: شكرًا على بريدكم الإلكتروني بتاريخ 12 مايو." },
      { english: "Informal question: How are things?", arabic: "سؤال غير رسمي: كيف الأحوال؟" },
      { english: "Formal phrase: I am writing to enquire about...", arabic: "عبارة رسمية: أكتب للاستفسار عن..." },
      { english: "Informal request: Can you send me the file?", arabic: "طلب غير رسمي: هل يمكنك إرسال الملف لي؟" },
      { english: "Formal request: I would be grateful if you could send me the file.", arabic: "طلب رسمي: سأكون ممتنًا لو أمكنك إرسال الملف لي." }
    ],
    mcqs: [
      { question: "If you start a formal letter with 'Dear Sir or Madam,', how should you end it?", options: ["Yours sincerely,", "Yours faithfully,", "Best wishes,", "Love,"], answer: "Yours faithfully," },
      { question: "Which is an informal way of writing?", options: ["I look forward to hearing from you.", "I am writing with regard to...", "Can't wait to see you!", "Please do not hesitate to contact me."], answer: "Can't wait to see you!" }
    ],
     story: {
        title: "From a Business Communication Guide",
        summary: "When writing to a client you don't know, start with 'Dear Sir or Madam,' and end with 'Yours faithfully,'. However, if you know their name, use 'Dear Mr. Smith,' and end with 'Yours sincerely,'. For a friend, you can use 'Hi Sarah,' and end with 'Best wishes,'. The formal email will say, 'I am writing to enquire...' while the informal one might say, 'Just wanted to ask...'"
    }
  },
  {
    type: 'lesson',
    title: "Writing: A Narrative (1)",
    explanation: "A narrative tells a story. This lesson covers how to structure a simple story using chronological order and sequencing words like 'first', 'then', 'after that', and 'finally'.",
    examples: [
      { english: "First, we bought the tickets.", arabic: "أولاً، اشترينا التذاكر." },
      { english: "Then, we found our seats.", arabic: "ثم، وجدنا مقاعدنا." },
      { english: "After that, the film started.", arabic: "بعد ذلك، بدأ الفيلم." },
      { english: "Finally, we went home.", arabic: "أخيرًا، ذهبنا إلى المنزل." },
      { english: "One morning, a strange thing happened.", arabic: "في صباح أحد الأيام، حدث شيء غريب." },
      { english: "Suddenly, the lights went out.", arabic: "فجأة، انطفأت الأنوار." },
      { english: "A few minutes later, the power came back on.", arabic: "بعد بضع دقائق، عادت الكهرباء." },
      { english: "In the end, everything was okay.", arabic: "في النهاية، كان كل شيء على ما يرام." },
      { english: "Last summer, my family and I went to the beach.", arabic: "في الصيف الماضي، ذهبت أنا وعائلتي إلى الشاطئ." },
      { english: "Before we left, we packed a big picnic.", arabic: "قبل أن نغادر، قمنا بتعبئة نزهة كبيرة." }
    ],
    mcqs: [
      { question: "Which word is good for starting a story?", options: ["Finally", "Then", "One day", "After that"], answer: "One day" },
      { question: "Which word is used for the last event in a sequence?", options: ["First", "Then", "Finally", "Next"], answer: "Finally" }
    ],
    story: {
        title: "From a Recipe Book",
        summary: "First, preheat the oven. Then, mix the flour and sugar in a bowl. After that, add the eggs and milk and stir well. Next, pour the mixture into a cake tin. Finally, bake for 30 minutes. In the end, you will have a delicious cake. Suddenly, you'll realize you forgot the chocolate chips, but it will still be good!"
    }
  },
  {
    type: 'lesson',
    title: "Writing: For and Against",
    explanation: "This lesson teaches how to structure an essay that presents both sides of an argument. It involves using linking words to introduce points for ('On the one hand...') and against ('On the other hand...'), and concluding with your own opinion.",
    examples: [
      { english: "On the one hand, living in a city is exciting.", arabic: "من ناحية، العيش في مدينة مثير." },
      { english: "On the other hand, it can be very expensive.", arabic: "من ناحية أخرى، يمكن أن يكون باهظ الثمن." },
      { english: "An advantage of public transport is that it reduces pollution.", arabic: "ميزة وسائل النقل العام هي أنها تقلل من التلوث." },
      { english: "A disadvantage is that it can be crowded.", arabic: "عيبها أنها يمكن أن تكون مزدحمة." },
      { english: "Furthermore, city life offers more job opportunities.", arabic: "علاوة على ذلك، توفر حياة المدينة المزيد من فرص العمل." },
      { english: "However, the countryside is more peaceful.", arabic: "ومع ذلك، فإن الريف أكثر هدوءًا." },
      { english: "In addition, there are more things to do in the city.", arabic: "بالإضافة إلى ذلك، هناك المزيد من الأشياء للقيام بها في المدينة." },
      { english: "In conclusion, I believe that the benefits outweigh the drawbacks.", arabic: "في الختام، أعتقد أن الفوائد تفوق العيوب." },
      { english: "Some people argue that technology makes us less sociable.", arabic: "يجادل بعض الناس بأن التكنولوجيا تجعلنا أقل اجتماعية." },
      { english: "In contrast, others believe it helps us connect with more people.", arabic: "في المقابل، يعتقد آخرون أنها تساعدنا على التواصل مع المزيد من الناس." }
    ],
    mcqs: [
      { question: "What phrase introduces a contrasting point?", options: ["Furthermore", "In addition", "On the other hand", "For example"], answer: "On the other hand" },
      { question: "Where do you usually state your own final opinion in this type of essay?", options: ["In the first paragraph", "In the middle", "In the conclusion", "After every point"], answer: "In the conclusion" }
    ],
    story: {
        title: "From a Debate on Remote Work",
        summary: "On the one hand, working from home offers great flexibility. In addition, it saves time and money on commuting. However, a key disadvantage is the lack of social interaction. On the other hand, office work provides a better environment for collaboration. Furthermore, it's easier to separate work and home life. In conclusion, while both have pros and cons, the best solution depends on the individual and the job."
    }
  },
  {
    type: 'lesson',
    title: "Writing: Making a Reservation",
    explanation: "Learn the key phrases and information needed to make a reservation by phone or email, for a hotel or restaurant. This includes specifying dates, times, number of people, and asking for confirmation.",
    examples: [
      { english: "I'd like to book a table for two, please.", arabic: "أود حجز طاولة لشخصين، من فضلك." },
      { english: "We'd like a table for four at 8 PM tonight.", arabic: "نود طاولة لأربعة أشخاص الساعة 8 مساءً الليلة." },
      { english: "Do you have any tables available for this evening?", arabic: "هل لديكم أي طاولات متاحة لهذا المساء؟" },
      { english: "I would like to make a reservation under the name of Smith.", arabic: "أود إجراء حجز باسم سميث." },
      { english: "I'd like to book a double room for three nights.", arabic: "أود حجز غرفة مزدوجة لثلاث ليال." },
      { english: "The reservation is from the 15th to the 18th of August.", arabic: "الحجز من 15 إلى 18 أغسطس." },
      { english: "Could you please confirm the booking by email?", arabic: "هل يمكنك تأكيد الحجز عبر البريد الإلكتروني؟" },
      { english: "Does the room have a sea view?", arabic: "هل الغرفة تطل على البحر؟" },
      { english: "What is the price per night?", arabic: "ما هو السعر لليلة الواحدة؟" },
      { english: "Is breakfast included?", arabic: "هل الإفطار مشمول؟" }
    ],
    mcqs: [
      { question: "What information is essential for a restaurant reservation?", options: ["Your age", "Your favourite food", "Number of people and time", "Your address"], answer: "Number of people and time" },
      { question: "What do you ask for at the end of making a reservation to be sure?", options: ["For the menu", "For confirmation", "For a discount", "For the address"], answer: "For confirmation" }
    ],
    story: {
        title: "From a Concierge's Notebook",
        summary: "A guest called. 'I'd like to book a table for two at 7 PM,' he said. 'The reservation is for this Saturday, under the name Jones.' I asked him for his contact number. After making the call, I messaged him, 'Could you please confirm you have received this? Your table is booked.' He replied, 'Thank you. Is the restaurant expensive?'"
    }
  },
   {
    type: 'lesson',
    title: "Vocabulary: What's in a Word?",
    explanation: "This lesson explores different aspects of vocabulary, including parts of speech (noun, verb, adjective), spelling and pronunciation rules, word formation with prefixes and suffixes, and common collocations (words that go together).",
    examples: [
      { english: "'Act' (verb), 'action' (noun), 'actor' (noun), 'active' (adjective).", arabic: "'فعل' (فعل)، 'عمل' (اسم)، 'ممثل' (اسم)، 'نشط' (صفة)." },
      { english: "The words 'read' (present) and 'read' (past) are spelled the same but pronounced differently.", arabic: "كلمتا 'يقرأ' (مضارع) و'قرأ' (ماض) تكتبان بنفس الطريقة ولكن تنطقان بشكل مختلف." },
      { english: "The suffix '-ion' often turns a verb into a noun, e.g., 'decide' -> 'decision'.", arabic: "اللاحقة '-ion' غالبًا ما تحول الفعل إلى اسم، على سبيل المثال 'يقرر' -> 'قرار'." },
      { english: "The prefix 'un-' often means 'not', e.g., 'happy' -> 'unhappy'.", arabic: "البادئة 'un-' غالبًا ما تعني 'ليس'، على سبيل المثال 'سعيد' -> 'غير سعيد'." },
      { english: "We say 'drive carefully', not 'drive careful'. (verb + adverb)", arabic: "نقول 'قُد بحذر'، وليس 'قُد حذر'. (فعل + حال)" },
      { english: "Collocation: We 'make a mistake', we don't 'do a mistake'.", arabic: "تلازم لفظي: نقول 'ارتكب خطأ'، ولا نقول 'فعل خطأ'." },
      { english: "The words 'dear' and 'deer' sound the same but have different meanings (homophones).", arabic: "كلمتا 'عزيز' و'غزال' لهما نفس النطق ولكن لهما معانٍ مختلفة (متجانسات لفظية)." },
      { english: "We say 'strong coffee', not 'powerful coffee'.", arabic: "نقول 'قهوة قوية'، وليس 'قهوة جبارة'." },
      { english: "Recognizing the part of speech helps you use a word correctly in a sentence.", arabic: "التعرف على جزء الكلام يساعدك على استخدام الكلمة بشكل صحيح في الجملة." },
      { english: "Keeping a vocabulary notebook with examples is a great way to learn.", arabic: "الاحتفاظ بدفتر مفردات مع أمثلة هو طريقة رائعة للتعلم." }
    ],
    mcqs: [
      { question: "What part of speech is 'beautiful' in 'a beautiful day'?", options: ["Noun", "Verb", "Adjective", "Adverb"], answer: "Adjective" },
      { question: "Which is a common collocation?", options: ["fast food", "quick food", "rapid food", "speedy food"], answer: "fast food" }
    ],
    story: {
        title: "From a Linguistics Textbook",
        summary: "Understanding words is complex. A word has a pronunciation and a spelling, which can be different. It also has a part of speech, like 'noun' or 'verb'. For example, 'act' is a verb, but 'action' is a noun. We also combine words in set phrases, or collocations, like 'fast food', not 'quick food'. Knowing these rules makes your English sound natural."
    }
  },
   {
    type: 'lesson',
    title: "Vocabulary: Art and Literature",
    explanation: "Learn vocabulary related to art (painter, masterpiece, sketch, exhibition) and literature (author, novel, chapter, biography). This includes verbs commonly associated with these fields, like 'paint', 'read', and 'write'.",
    examples: [
      { english: "Picasso was a famous painter.", arabic: "كان بيكاسو رسامًا مشهورًا." },
      { english: "I'm reading a fascinating novel by a new author.", arabic: "أقرأ رواية رائعة لمؤلف جديد." },
      { english: "We went to an exhibition of modern sculpture.", arabic: "ذهبنا إلى معرض للمنحوتات الحديثة." },
      { english: "The Mona Lisa is considered a masterpiece.", arabic: "تعتبر الموناليزا تحفة فنية." },
      { english: "Shakespeare wrote many famous plays and poems.", arabic: "كتب شكسبير العديد من المسرحيات والقصائد الشهيرة." },
      { english: "He drew a quick sketch of the landscape.", arabic: "رسم رسمًا تخطيطيًا سريعًا للمنظر الطبيعي." },
      { english: "I've just finished the first chapter of the book.", arabic: "لقد أنهيت للتو الفصل الأول من الكتاب." },
      { english: "She is writing a biography of a famous scientist.", arabic: "هي تكتب سيرة ذاتية لعالم مشهور." },
      { english: "My favorite poet is W.B. Yeats.", arabic: "شاعري المفضل هو دبليو بي ييتس." },
      { english: "The artist used a palette to mix his colors.", arabic: "استخدم الفنان لوحة ألوان لخلط ألوانه." }
    ],
    mcqs: [
      { question: "A person who writes books is an...", options: ["artist", "author", "actor", "architect"], answer: "author" },
      { question: "A famous painting like the Mona Lisa is called a...", options: ["sketch", "sculpture", "masterpiece", "portrait"], answer: "masterpiece" }
    ],
    story: {
        title: "From a Critic's Review",
        summary: "The author's new novel is a masterpiece. Each chapter is beautifully written. I also saw an exhibition by a talented young painter. Her portraits are amazing, and her sketches are full of life. It is rare to see a biography written with such style, or a poem with such power. These two artists, the writer and the painter, are the future."
    }
  },
  {
    type: 'lesson',
    title: "Writing: A Description (1)",
    explanation: "Focuses on using descriptive adjectives and sensory language (what you see, hear, smell) to paint a vivid picture of a place or person for the reader.",
    examples: [
        { english: "The old house stood on a windswept hill.", arabic: "كان البيت القديم يقف على تل تعصف به الرياح." },
        { english: "She has sparkling blue eyes and a warm smile.", arabic: "لديها عينان زرقاوان متلألئتان وابتسامة دافئة." },
        { english: "The air smelled of fresh-cut grass and rain.", arabic: "كان الهواء يفوح برائحة العشب المقطوع حديثًا والمطر." },
        { english: "The city was a bustling metropolis, full of towering skyscrapers.", arabic: "كانت المدينة حاضرة صاخبة، مليئة بناطحات السحاب الشاهقة." },
        { english: "He wore a worn leather jacket that felt soft to the touch.", arabic: "كان يرتدي سترة جلدية بالية كانت ناعمة الملمس." },
        { english: "The roaring sound of the waterfall filled the valley.", arabic: "ملأ صوت الشلال الهادر الوادي." },
        { english: "The market was a vibrant explosion of color and noise.", arabic: "كان السوق انفجارًا حيويًا من الألوان والضوضاء." },
        { english: "Her voice was as gentle as a whisper.", arabic: "كان صوتها رقيقًا كالهمس." },
        { english: "The beach had fine, white sand and crystal-clear water.", arabic: "كان الشاطئ يحتوي على رمال بيضاء ناعمة ومياه صافية كالبلور." },
        { english: "The pizza had a crispy crust and was topped with gooey, melted cheese.", arabic: "كانت البيتزا ذات قشرة مقرمشة ومغطاة بجبنة ذائبة لزجة." }
    ],
    mcqs: [
        { question: "To describe a sound, you might use an adjective like...", options: ["sparkling", "bustling", "roaring", "vibrant"], answer: "roaring" },
        { question: "Which adjective appeals to the sense of smell?", options: ["soft", "fresh-cut", "towering", "gentle"], answer: "fresh-cut" }
    ],
    story: {
        title: "From a Travel Writer's Notebook",
        summary: "The small café was cozy and warm. The air smelled of strong coffee and sweet pastries. The owner was an old man with a gentle voice and sparkling eyes. Through the window, I could see the bustling street, full of bright colours and loud noises. The city was a vibrant, exciting place. I ordered a pizza with a crispy crust and gooey cheese."
    }
  },
  {
    type: 'lesson',
    title: "Writing: A Letter of Application",
    explanation: "Learn the formal structure and language required for a job application letter. This includes outlining your qualifications, explaining your interest in the job, and using polite, professional language.",
    examples: [
        { english: "I am writing to apply for the position of [Job Title], as advertised on [Platform].", arabic: "أكتب لأتقدم لوظيفة [المسمى الوظيفي]، كما هو معلن على [المنصة]." },
        { english: "I believe my skills and experience are an excellent match for your requirements.", arabic: "أعتقد أن مهاراتي وخبرتي تتوافق بشكل ممتاز مع متطلباتكم." },
        { english: "As you can see from my enclosed CV, I have [number] years of experience in...", arabic: "كما ترون من سيرتي الذاتية المرفقة، لدي [عدد] سنوات من الخبرة في..." },
        { english: "During my time at [Previous Company], I was responsible for...", arabic: "خلال فترة عملي في [الشركة السابقة]، كنت مسؤولاً عن..." },
        { english: "I am a highly motivated and results-oriented individual.", arabic: "أنا شخص متحمس للغاية وموجه نحو النتائج." },
        { english: "I have excellent communication and teamwork skills.", arabic: "لدي مهارات تواصل وعمل جماعي ممتازة." },
        { english: "Thank you for your time and consideration.", arabic: "شكرا لوقتكم واهتمامكم." },
        { english: "I have attached my CV for your review.", arabic: "لقد أرفقت سيرتي الذاتية لمراجعتكم." },
        { english: "I am available for an interview at your earliest convenience.", arabic: "أنا متاح للمقابلة في أقرب وقت يناسبكم." },
        { english: "I look forward to hearing from you soon.", arabic: "أتطلع إلى الاستماع منكم قريبا." }
    ],
    mcqs: [
        { question: "What is a common opening line for a letter of application?", options: ["What's up?", "I want this job.", "I am writing to apply for the position of...", "Here is my CV."], answer: "I am writing to apply for the position of..." },
        { question: "What does 'CV' stand for?", options: ["Course Version", "Curriculum Vitae", "Company Volume", "Corrected Version"], answer: "Curriculum Vitae" }
    ],
     story: {
        title: "From a Career Advice Column",
        summary: "To get a job, you must write a good application letter. Start by saying, 'I am writing to apply for the position of...' Then, explain why you are suitable. Use phrases like, 'I have five years of experience in...' and 'I am a highly motivated individual.' Attach your CV. End the letter with, 'Thank you for your time and consideration. I look forward to hearing from you.'"
    }
  },
  {
    type: 'lesson',
    title: "Writing: A Narrative (2)",
    explanation: "Building on the first narrative lesson, this introduces more complex storytelling techniques, such as using different past tenses (Past Simple, Continuous, Perfect) to show the sequence and timing of events.",
    examples: [
        { english: "The sun was shining and the birds were singing. (Setting the scene)", arabic: "كانت الشمس مشرقة والطيور تغني. (وصف المشهد)" },
        { english: "He had never seen anything like it before. (Using Past Perfect for earlier past)", arabic: "لم يكن قد رأى شيئًا كهذا من قبل. (استخدام الماضي التام للماضي الأسبق)" },
        { english: "While they were walking, they heard a strange noise. (Interrupted action)", arabic: "بينما كانوا يمشون، سمعوا ضوضاء غريبة. (فعل مقطوع)" },
        { english: "After he had finished breakfast, he went for a walk.", arabic: "بعد أن أنهى فطوره، ذهب في نزهة." },
        { english: "He realized he had left his keys inside the house.", arabic: "أدرك أنه قد ترك مفاتيحه داخل المنزل." },
        { english: "It had been raining for hours, so the ground was very wet.", arabic: "كانت تمطر لساعات، لذا كانت الأرض مبللة جدًا." },
        { english: "First he knocked on the door, then he called her name.", arabic: "أولاً طرق الباب، ثم نادى باسمها." },
        { english: "She was tired because she had been working all day.", arabic: "كانت متعبة لأنها كانت تعمل طوال اليوم." },
        { english: "The police arrived, but the thief had already escaped.", arabic: "وصلت الشرطة، لكن اللص كان قد هرب بالفعل." },
        { english: "By the time I got there, the party had nearly finished.", arabic: "بحلول الوقت الذي وصلت فيه، كانت الحفلة قد انتهت تقريبًا." }
    ],
    mcqs: [
      { question: "To describe a background action that was interrupted, you use...", options: ["Past Simple", "Past Continuous", "Past Perfect", "Present Perfect"], answer: "Past Continuous" },
      { question: "To describe an action that happened *before* another past action, you use...", options: ["Past Simple", "Past Continuous", "Past Perfect", "Present Perfect"], answer: "Past Perfect" }
    ],
    story: {
        title: "From a Mystery Story Opening",
        summary: "The detective arrived at the old house. The wind was howling. He walked to the door. It had already been opened. He entered cautiously. A fire was burning in the fireplace. Someone had been there very recently. While he was looking around, he noticed a photograph on the floor. He picked it up. He realized he had seen the face before."
    }
  },
  {
    type: 'lesson',
    title: "Writing: A Description (2)",
    explanation: "This lesson expands on describing people, focusing on character and personality. It involves using a range of character adjectives and providing examples of behavior to support the description.",
    examples: [
        { english: "He is a very determined person; once he makes up his mind, he never gives up.", arabic: "هو شخص مصمم جداً؛ بمجرد أن يتخذ قراره، لا يستسلم أبدًا." },
        { english: "She has a great sense of humor and is always making people laugh.", arabic: "لديها حس فكاهة رائع ودائماً ما تجعل الناس يضحكون." },
        { english: "My uncle is incredibly generous; for example, he once gave a stranger his coat.", arabic: "عمي كريم بشكل لا يصدق؛ على سبيل المثال، أعطى مرة معطفه لغريب." },
        { english: "He can be a bit pessimistic and always expects the worst to happen.", arabic: "يمكن أن يكون متشائمًا بعض الشيء ودائمًا يتوقع حدوث الأسوأ." },
        { english: "She is adventurous and loves to travel to exotic places.", arabic: "هي مغامرة وتحب السفر إلى أماكن غريبة." },
        { english: "He's very practical and down-to-earth.", arabic: "إنه عملي جدًا وواقعي." },
        { english: "She is a loyal friend who will always support you.", arabic: "هي صديقة مخلصة ستدعمك دائمًا." },
        { english: "He is quite reserved and doesn't say much in meetings.", arabic: "إنه متحفظ تمامًا ولا يتحدث كثيرًا في الاجتماعات." },
        { english: "She is very organized and plans everything in detail.", arabic: "هي منظمة جدًا وتخطط لكل شيء بالتفصيل." },
        { english: "He has a curious mind and is always asking questions.", arabic: "لديه عقل فضولي ودائمًا ما يطرح الأسئلة." }
    ],
    mcqs: [
      { question: "A person who is 'down-to-earth' is...", options: ["adventurous", "funny", "practical and sensible", "unfriendly"], answer: "practical and sensible" },
      { question: "To support a description of someone's character, it is good to...", options: ["describe their appearance", "give examples of their behavior", "list their hobbies", "say their age"], answer: "give examples of their behavior" }
    ],
    story: {
        title: "From a Recommendation Letter",
        summary: "I am writing to recommend Sarah. She is a very determined and hardworking employee. She is also very organized; for example, she always plans her projects weeks in advance. She is a loyal team member. While she can be a bit reserved in large groups, she has a curious mind and asks excellent questions. She is not pessimistic; in fact, she is very optimistic."
    }
  },
  {
    type: 'lesson',
    title: "Writing: A Biography",
    explanation: "Learn how to write a short biography of a person. This involves organizing key life events chronologically, using past tenses, and highlighting important achievements.",
    examples: [
        { english: "Nelson Mandela was born in South Africa in 1918.", arabic: "ولد نيلسون مانديلا في جنوب أفريقيا عام 1918." },
        { english: "As a young man, he studied law at university.", arabic: "عندما كان شابًا، درس القانون في الجامعة." },
        { english: "He became a key figure in the fight against apartheid.", arabic: "أصبح شخصية رئيسية في الكفاح ضد الفصل العنصري." },
        { english: "He spent 27 years in prison for his political activities.", arabic: "قضى 27 عامًا في السجن بسبب أنشطته السياسية." },
        { english: "After his release in 1990, he worked to end apartheid.", arabic: "بعد إطلاق سراحه في عام 1990، عمل على إنهاء الفصل العنصري." },
        { english: "In 1994, he was elected as the first black president of South Africa.", arabic: "في عام 1994، انتخب كأول رئيس أسود لجنوب أفريقيا." },
        { english: "He is remembered for his leadership and his work for reconciliation.", arabic: "يُذكر لقيادته وعمله من أجل المصالحة." },
        { english: "Marie Curie is famous for her research on radioactivity.", arabic: "تشتهر ماري كوري بأبحاثها حول النشاط الإشعاعي." },
        { english: "She was awarded the Nobel Prize in two different scientific fields.", arabic: "حصلت على جائزة نوبل في مجالين علميين مختلفين." },
        { english: "She died in 1934 from an illness caused by her long exposure to radiation.", arabic: "توفت في عام 1934 بسبب مرض ناتج عن تعرضها الطويل للإشعاع." }
    ],
    mcqs: [
      { question: "A biography is usually written in which tense?", options: ["Present Simple", "Future", "Past Simple", "Present Continuous"], answer: "Past Simple" },
      { question: "What is the main purpose of a biography?", options: ["To tell a fictional story", "To describe a person's life and achievements", "To argue a point", "To give instructions"], answer: "To describe a person's life and achievements" }
    ],
    story: {
        title: "From a Short Biography of Steve Jobs",
        summary: "Steve Jobs was born in San Francisco in 1955. He co-founded Apple Computer in 1976. He was forced out of his own company in 1985. After that, he started another company called NeXT. Apple bought this company in 1997, and Jobs returned. He then led the creation of the iMac, iPod, iPhone, and iPad. He died in 2011, but he is remembered as a great innovator."
    }
  },
  {
    type: 'lesson',
    title: "Writing: Words that Join Ideas",
    explanation: "Focuses on using conjunctions and linking phrases (e.g., 'although', 'however', 'because', 'so', 'in addition') to connect ideas smoothly within sentences and between paragraphs.",
    examples: [
        { english: "He was tired, so he went to bed early.", arabic: "كان متعبًا، لذا ذهب إلى الفراش مبكرًا." },
        { english: "Although it was raining, we went for a walk.", arabic: "على الرغم من أنها كانت تمطر، ذهبنا في نزهة." },
        { english: "I couldn't go to the party because I was sick.", arabic: "لم أستطع الذهاب إلى الحفلة لأنني كنت مريضًا." },
        { english: "She is very smart. In addition, she is a talented musician.", arabic: "هي ذكية جدًا. بالإضافة إلى ذلك، هي موسيقية موهوبة." },
        { english: "He studied hard; however, he didn't pass the exam.", arabic: "درس بجد؛ ومع ذلك، لم ينجح في الامتحان." },
        { english: "The restaurant was expensive. Furthermore, the service was slow.", arabic: "كان المطعم باهظ الثمن. علاوة على ذلك، كانت الخدمة بطيئة." },
        { english: "You can have tea or coffee.", arabic: "يمكنك تناول الشاي أو القهوة." },
        { english: "I like him, but I don't trust him.", arabic: "أنا معجب به، لكنني لا أثق به." },
        { english: "We need to leave now, otherwise we will be late.", arabic: "نحن بحاجة إلى المغادرة الآن، وإلا فسوف نتأخر." },
        { english: "He is not only a good student but also a great athlete.", arabic: "إنه ليس فقط طالبًا جيدًا ولكن أيضًا رياضيًا رائعًا." }
    ],
    mcqs: [
      { question: "Which word shows a reason?", options: ["so", "but", "although", "because"], answer: "because" },
      { question: "Which word shows a contrast?", options: ["and", "so", "however", "in addition"], answer: "however" }
    ],
    story: {
        title: "From a Persuasive Essay",
        summary: "Everyone should exercise regularly because it is good for your health. In addition, it improves your mood. Although it can be difficult to find time, it is very important. You can go to a gym, or you can simply walk every day. It might be hard at first; however, you will soon feel the benefits. So, you should start today."
    }
  },
  {
    type: 'lesson',
    title: "Writing: Correcting Mistakes (2) - Advanced",
    explanation: "This lesson tackles more complex and common errors, such as incorrect verb patterns, prepositional mistakes, and errors with reported speech, helping to refine writing accuracy.",
    examples: [
        { english: "Incorrect: I am agree with you. Correct: I agree with you.", arabic: "خطأ: I am agree with you. صحيح: I agree with you." },
        { english: "Incorrect: It depends of the weather. Correct: It depends on the weather.", arabic: "خطأ: It depends of the weather. صحيح: It depends on the weather." },
        { english: "Incorrect: He is good in English. Correct: He is good at English.", arabic: "خطأ: He is good in English. صحيح: He is good at English." },
        { english: "Incorrect: I suggest you to go. Correct: I suggest that you go / I suggest going.", arabic: "خطأ: I suggest you to go. صحيح: I suggest that you go / I suggest going." },
        { english: "Incorrect: I've been here since three hours. Correct: I've been here for three hours.", arabic: "خطأ: I've been here since three hours. صحيح: I've been here for three hours." },
        { english: "Incorrect: She said me that she was tired. Correct: She told me that she was tired.", arabic: "خطأ: She said me that she was tired. صحيح: She told me that she was tired." },
        { english: "Incorrect: Everybody are happy. Correct: Everybody is happy.", arabic: "خطأ: Everybody are happy. صحيح: Everybody is happy." },
        { english: "Incorrect: I have a good news. Correct: I have good news.", arabic: "خطأ: I have a good news. صحيح: I have good news." },
        { english: "Incorrect: We discussed about the problem. Correct: We discussed the problem.", arabic: "خطأ: We discussed about the problem. صحيح: We discussed the problem." },
        { english: "Incorrect: If I will see him, I will tell him. Correct: If I see him, I will tell him.", arabic: "خطأ: If I will see him, I will tell him. صحيح: If I see him, I will tell him." }
    ],
    mcqs: [
        { question: "Which is correct?", options: ["I'm looking forward to see you.", "I'm looking forward to seeing you.", "I look forward for seeing you.", "I'm looking forward see you."], answer: "I'm looking forward to seeing you." },
        { question: "Which preposition follows 'interested'?", options: ["on", "at", "about", "in"], answer: "in" }
    ],
    story: {
        title: "From an English Teacher's Diary",
        summary: "Today, a student wrote, 'I am agree with you.' I corrected it to 'I agree'. Another student wrote, 'It depends of you.' I explained it should be 'depends on'. Many students are good at vocabulary, but they make these small mistakes. Everybody makes mistakes, and that is okay. I told them that practice is the most important thing."
    }
  },
  {
    type: 'lesson',
    title: "Vocabulary: Collocations",
    explanation: "Collocations are words that frequently appear together (e.g., 'make a mistake', 'heavy rain'). This lesson focuses on learning common verb-noun and adjective-noun pairings to make your English sound more natural.",
    examples: [
      { english: "It's important not to make a mistake.", arabic: "من المهم ألا ترتكب خطأ." },
      { english: "You need to do your homework every day.", arabic: "تحتاج إلى أداء واجبك المنزلي كل يوم." },
      { english: "She has a shower in the morning.", arabic: "تستحم في الصباح." },
      { english: "We had a great time at the party.", arabic: "قضينا وقتًا رائعًا في الحفلة." },
      { english: "He is trying to save money for a new car.", arabic: "يحاول توفير المال لسيارة جديدة." },
      { english: "Can you give me some advice?", arabic: "هل يمكنك أن تعطيني بعض النصائح؟" },
      { english: "I need to take a break from work.", arabic: "أحتاج إلى أخذ استراحة من العمل." },
      { english: "The doctor told me to get some exercise.", arabic: "أخبرني الطبيب أن أمارس بعض التمارين." },
      { english: "It's starting to rain heavily. We are expecting heavy rain.", arabic: "بدأت تمطر بغزارة. نحن نتوقع هطول أمطار غزيرة." },
      { english: "He told a funny joke.", arabic: "قال نكتة مضحكة." }
    ],
    mcqs: [
      { question: "Which verb collocates with 'a photo'?", options: ["make", "do", "take", "give"], answer: "take" },
      { question: "Which adjective collocates with 'traffic'?", options: ["strong", "heavy", "big", "hard"], answer: "heavy" }
    ],
    story: {
        title: "From a Self-Help Book on Productivity",
        summary: "To be successful, you must make good decisions and not make mistakes. Every day, you should take a shower, have a good breakfast, and get some exercise. Don't waste time on unimportant things. You need to save money and also have a good time. If you need help, ask a friend to give you some advice. And remember to take a break when you are tired."
    }
  },
  {
    type: 'lesson',
    title: "Vocabulary: Phrasal Verbs (Literal vs. Idiomatic)",
    explanation: "This lesson introduces phrasal verbs and the difference between their literal meaning (e.g., 'She looked out of the window') and their idiomatic meaning (e.g., 'Look out!').",
    examples: [
      { english: "He picked up the book from the floor. (Literal)", arabic: "التقط الكتاب من على الأرض. (حرفي)" },
      { english: "He picked up some Italian on his trip to Rome. (Idiomatic - learned)", arabic: "تعلم بعض الإيطالية في رحلته إلى روما. (اصطلاحي - تعلم)" },
      { english: "She ran across the road. (Literal)", arabic: "ركضت عبر الطريق. (حرفي)" },
      { english: "I ran across an old friend yesterday. (Idiomatic - met by chance)", arabic: "صادفت صديقًا قديمًا أمس. (اصطلاحي - التقيت به صدفة)" },
      { english: "The plane took off from the runway. (Literal)", arabic: "أقلعت الطائرة من المدرج. (حرفي)" },
      { english: "His career really took off after that film. (Idiomatic - became successful)", arabic: "انطلقت مسيرته المهنية حقًا بعد ذلك الفيلم. (اصطلاحي - أصبح ناجحًا)" },
      { english: "Can you turn on the light? (Literal)", arabic: "هل يمكنك إشعال الضوء؟ (حرفي)" },
      { english: "The audience turned on the speaker. (Idiomatic - became hostile)", arabic: "أصبح الجمهور عدائيًا تجاه المتحدث. (اصطلاحي - أصبح عدائيًا)" },
      { english: "He looked up the word in a dictionary. (Idiomatic - searched for information)", arabic: "بحث عن الكلمة في القاموس. (اصطلاحي - بحث عن معلومات)" },
      { english: "Things are looking up. (Idiomatic - improving)", arabic: "الأمور تتحسن. (اصطلاحي - تتحسن)" }
    ],
    mcqs: [
      { question: "What does 'give up' mean in 'Don't give up smoking'?", options: ["start", "continue", "stop", "reduce"], answer: "stop" },
      { question: "In 'He made up a story', does 'made up' mean built or invented?", options: ["Built", "Invented"], answer: "Invented" }
    ],
    story: {
        title: "From a Biography of an Entrepreneur",
        summary: "Her career took off after she designed a new app. At first, she had to look up a lot of information. She ran across many problems. But she never gave up. When one idea failed, she would just move on to the next. Now, things are looking up and her company is very successful."
    }
  },
  {
    type: 'lesson',
    title: "Vocabulary: Phrasal Verbs (Separable vs. Inseparable)",
    explanation: "Learn the rules for separable and inseparable phrasal verbs. Separable verbs allow the object to come between the verb and particle ('turn the TV on' or 'turn it on'), while inseparable verbs do not ('look after the baby').",
    examples: [
      { english: "Separable: Please turn on the light. / Please turn the light on.", arabic: "قابل للفصل: من فضلك أشعل الضوء. / من فضلك أشعل الضوء." },
      { english: "Separable with pronoun: Please turn it on. (NOT turn on it)", arabic: "قابل للفصل مع ضمير: من فضلك أشعله. (وليس turn on it)" },
      { english: "Inseparable: I will look after the children.", arabic: "غير قابل للفصل: سأعتني بالأطفال." },
      { english: "Inseparable with pronoun: I will look after them. (NOT look them after)", arabic: "غير قابل للفصل مع ضمير: سأعتني بهم. (وليس look them after)" },
      { english: "Separable: She threw away the old newspapers. / She threw the old newspapers away.", arabic: "قابل للفصل: رمت الصحف القديمة. / رمت الصحف القديمة بعيدًا." },
      { english: "Separable with pronoun: She threw them away.", arabic: "قابل للفصل مع ضمير: رمتهم بعيدًا." },
      { english: "Inseparable: He got on the bus.", arabic: "غير قابل للفصل: ركب الحافلة." },
      { english: "Inseparable: I ran into an old friend.", arabic: "غير قابل للفصل: صادفت صديقًا قديمًا." },
      { english: "Separable: Can you pick up my parcel? / Can you pick my parcel up?", arabic: "قابل للفصل: هل يمكنك استلام طردي؟ / هل يمكنك استلام طردي؟" },
      { english: "Separable with pronoun: Can you pick it up?", arabic: "قابل للفصل مع ضمير: هل يمكنك استلامه؟" }
    ],
    mcqs: [
      { question: "Which sentence is correct?", options: ["I look after them.", "I look them after.", "Both are correct.", "Neither is correct."], answer: "I look after them." },
      { question: "Which sentence is INCORRECT?", options: ["Take off your coat.", "Take your coat off.", "Take it off.", "Take off it."], answer: "Take off it." }
    ],
    story: {
        title: "From a Parent's To-Do List",
        summary: "Today I have to look after the kids. First, I'll wake them up. I need to get them on the school bus on time. After school, I will pick them up. We might run into their friends at the park. When we get home, they have to put away their toys. I'll ask them to turn off the TV and do their homework. I'll also throw the rubbish away."
    }
  },
  {
    type: 'lesson',
    title: "Vocabulary: Modifying Adverbs",
    explanation: "Learn how to use adverbs like 'very', 'really', and 'absolutely' to modify adjectives. 'Very' is used with base adjectives ('very tired'), while 'absolutely' is used with strong adjectives ('absolutely exhausted').",
    examples: [
      { english: "The film was very good.", arabic: "كان الفيلم جيدًا جدًا." },
      { english: "The film was absolutely brilliant.", arabic: "كان الفيلم رائعًا للغاية." },
      { english: "It's a bit cold today.", arabic: "الجو بارد قليلاً اليوم." },
      { english: "It's absolutely freezing!", arabic: "الجو متجمد تمامًا!" },
      { english: "I'm quite tired.", arabic: "أنا متعب تمامًا." },
      { english: "I'm completely exhausted.", arabic: "أنا منهك تمامًا." },
      { english: "The house is really big.", arabic: "المنزل كبير حقًا." },
      { english: "The house is absolutely enormous.", arabic: "المنزل ضخم للغاية." },
      { english: "She was slightly surprised.", arabic: "كانت متفاجئة قليلاً." },
      { english: "She was utterly amazed.", arabic: "كانت مندهشة تمامًا." }
    ],
    mcqs: [
      { question: "Which phrase is correct?", options: ["very exhausted", "absolutely tired", "absolutely exhausted", "very brilliant"], answer: "absolutely exhausted" },
      { question: "You can say 'very big' or...", options: ["absolutely big", "absolutely huge", "very huge", "slightly big"], answer: "absolutely huge" }
    ],
    story: {
        title: "From a Mountaineer's Diary",
        summary: "The climb was very difficult. The weather was not just cold, it was absolutely freezing. The view from the top was really beautiful, in fact, it was absolutely breathtaking. I was very tired when I reached the summit. Actually, I was completely exhausted. But the feeling of achievement was absolutely amazing."
    }
  },
  {
    type: 'lesson',
    title: "Vocabulary: Verbs and Nouns that Go Together",
    explanation: "This lesson focuses on common verb-noun collocations that might not be obvious, such as 'whistle a tune', 'lick an ice-cream', or 'hold your breath'.",
    examples: [
      { english: "He was whistling a happy tune.", arabic: "كان يصفر لحنًا سعيدًا." },
      { english: "The cat was licking its paws.", arabic: "كانت القطة تلعق كفوفها." },
      { english: "She held her breath and dived into the water.", arabic: "حبست أنفاسها وغطست في الماء." },
      { english: "Can you keep a secret?", arabic: "هل يمكنك الاحتفاظ بسر؟" },
      { english: "He broke his promise.", arabic: "لقد أخلف وعده." },
      { english: "Don't waste your time on that.", arabic: "لا تضيع وقتك في ذلك." },
      { english: "I need to catch the bus.", arabic: "أنا بحاجة للحاق بالحافلة." },
      { english: "She always tells the truth.", arabic: "هي دائما تقول الحقيقة." },
      { english: "Let's raise money for charity.", arabic: "دعونا نجمع المال للأعمال الخيرية." },
      { english: "He paid me a compliment.", arabic: "لقد أثنى علي." }
    ],
    mcqs: [
      { question: "Which verb do you use with 'a secret'?", options: ["tell", "say", "hold", "keep"], answer: "keep" },
      { question: "Which verb do you use with 'a promise'?", options: ["break", "smash", "cut", "tear"], answer: "break" }
    ],
    story: {
        title: "From a Children's Story",
        summary: "A little boy promised to keep a secret for his friend. He held his breath as he listened. His friend told him a wild story, but the boy knew he always told the truth. 'We have to raise money to save the magical tree!' his friend said. The boy knew he couldn't break his promise. He couldn't waste any time. He had to catch a bus to the town square immediately."
    }
  },
  {
    type: 'lesson',
    title: "Vocabulary: Birth, Marriage, and Death",
    explanation: "Learn the key vocabulary associated with major life events, such as 'to be born', 'get engaged', 'get married', 'funeral', and 'to pass away'.",
    examples: [
      { english: "My nephew was born last week.", arabic: "ولد ابن أخي الأسبوع الماضي." },
      { english: "They are going to have a baby in June.", arabic: "سينجبون طفلاً في يونيو." },
      { english: "My sister got engaged last month.", arabic: "خطبت أختي الشهر الماضي." },
      { english: "They got married in a beautiful church.", arabic: "تزوجا في كنيسة جميلة." },
      { english: "The wedding reception was held in a hotel.", arabic: "أقيم حفل الزفاف في فندق." },
      { english: "Sadly, his grandfather passed away last year.", arabic: "للأسف، توفي جده العام الماضي." },
      { english: "The funeral will take place on Friday.", arabic: "ستقام الجنازة يوم الجمعة." },
      { english: "She is a widow; her husband died five years ago.", arabic: "هي أرملة؛ توفي زوجها قبل خمس سنوات." },
      { english: "They are celebrating their 50th wedding anniversary.", arabic: "يحتفلون بالذكرى الخمسين لزواجهم." },
      { english: "She is pregnant with her first child.", arabic: "هي حامل بطفلها الأول." }
    ],
    mcqs: [
      { question: "What is the event called when two people get married?", options: ["A funeral", "A birthday", "A wedding", "An engagement"], answer: "A wedding" },
      { question: "What is a more polite way to say 'died'?", options: ["expired", "passed away", "finished", "ended"], answer: "passed away" }
    ],
    story: {
        title: "From a Family History",
        summary: "My great-grandmother was born in 1920. She got married when she was 22. She had five children. My grandparents celebrated their 50th wedding anniversary last year. It was a wonderful party. Sadly, my great-grandfather passed away a few months later. His funeral was a celebration of his long and happy life."
    }
  },
  {
    type: 'lesson',
    title: "Grammar Reference: Tenses Overview",
    explanation: "A summary of the main English tenses (Present, Past, Perfect, Continuous) and their primary uses. This serves as a quick reference guide.",
    examples: [
      { english: "Present Simple: I work in London. (Fact/Habit)", arabic: "المضارع البسيط: أعمل في لندن. (حقيقة/عادة)" },
      { english: "Present Continuous: I am working now. (Action in progress)", arabic: "المضارع المستمر: أنا أعمل الآن. (فعل قيد التقدم)" },
      { english: "Past Simple: I worked yesterday. (Finished past action)", arabic: "الماضي البسيط: عملت أمس. (فعل ماضٍ منتهٍ)" },
      { english: "Past Continuous: I was working when you called. (Action in progress in the past)", arabic: "الماضي المستمر: كنت أعمل عندما اتصلت. (فعل قيد التقدم في الماضي)" },
      { english: "Present Perfect: I have worked here for five years. (Past action with connection to present)", arabic: "المضارع التام: لقد عملت هنا لمدة خمس سنوات. (فعل ماضٍ له صلة بالحاضر)" },
      { english: "Past Perfect: I had worked there before I moved. (Action before another past action)", arabic: "الماضي التام: كنت قد عملت هناك قبل أن أنتقل. (فعل قبل فعل ماضٍ آخر)" },
      { english: "Future with 'will': I will help you. (Instant decision/Offer)", arabic: "المستقبل بـ 'will': سأساعدك. (قرار فوري/عرض)" },
      { english: "Future with 'going to': I am going to work tomorrow. (Plan/Intention)", arabic: "المستقبل بـ 'going to': سأعمل غدًا. (خطة/نية)" },
      { english: "Passive Voice: The report was written by John. (Focus on the action)", arabic: "المبني للمجهول: تمت كتابة التقرير بواسطة جون. (التركيز على الفعل)" },
      { english: "Conditional: If I had time, I would work more. (Hypothetical situation)", arabic: "الشرط: لو كان لدي وقت، لعملت أكثر. (موقف افتراضي)" }
    ],
    mcqs: [
      { question: "Which tense is used for an action happening at the moment of speaking?", options: ["Present Simple", "Present Continuous", "Present Perfect", "Past Simple"], answer: "Present Continuous" },
      { question: "Which tense is used for an action that happened before another action in the past?", options: ["Past Simple", "Past Continuous", "Present Perfect", "Past Perfect"], answer: "Past Perfect" }
    ],
    story: {
        title: "From 'A Brief History of Time'",
        summary: "The universe is expanding (Present Continuous). It began with a big bang (Past Simple). Scientists have looked for evidence for many years (Present Perfect). Before they discovered background radiation, they had developed the theory (Past Perfect). They predict the universe will continue to expand (Future with 'will'). If it had more mass, it would collapse (Second Conditional)."
    }
  },
  {
    type: 'lesson',
    title: "Grammar Reference: Modal Verbs Overview",
    explanation: "A summary of modal auxiliary verbs (can, could, will, would, shall, should, may, might, must) and their functions, including ability, permission, obligation, and probability.",
    examples: [
      { english: "Ability: I can speak three languages.", arabic: "القدرة: أستطيع التحدث بثلاث لغات." },
      { english: "Permission: Can I borrow your pen?", arabic: "الإذن: هل يمكنني استعارة قلمك؟" },
      { english: "Advice: You should see a doctor.", arabic: "النصيحة: يجب أن تراجع طبيبًا." },
      { english: "Obligation: You must finish your homework.", arabic: "الالتزام: يجب عليك إنهاء واجبك." },
      { english: "Possibility: It might rain later.", arabic: "الإمكانية: قد تمطر لاحقًا." },
      { english: "Request: Could you help me, please?", arabic: "الطلب: هل يمكنك مساعدتي، من فضلك؟" },
      { english: "Offer: I'll carry that for you.", arabic: "العرض: سأحمل ذلك عنك." },
      { english: "Logical deduction (strong probability): He must be tired.", arabic: "استنتاج منطقي (احتمالية قوية): لا بد أنه متعب." },
      { english: "Logical deduction (impossibility): That can't be true.", arabic: "استنتاج منطقي (استحالة): لا يمكن أن يكون ذلك صحيحًا." },
      { english: "Hypothetical situation: If I won, I would travel the world.", arabic: "موقف افتراضي: لو فزت، لسافرت حول العالم." }
    ],
    mcqs: [
      { question: "Which modal verb expresses strong obligation?", options: ["should", "can", "must", "might"], answer: "must" },
      { question: "Which modal verb is best for giving advice?", options: ["must", "should", "can", "may"], answer: "should" }
    ],
    story: {
        title: "From 'The Meditations' by Marcus Aurelius",
        summary: "A Roman emperor wrote about how one should live. He said you must be a good person. You can't control what happens, but you can control your reaction. You should focus on what is in your power. It might be difficult, but it is the path to peace. He thought people could be better if they tried. He would often remind himself of these rules."
    }
  },
  {
    type: 'lesson',
    title: "Grammar Reference: Passive Voice Overview",
    explanation: "A summary of how to form the passive voice in different tenses (e.g., is done, was done, has been done, will be done) and when to use it.",
    examples: [
      { english: "Present Simple: The office is cleaned every day.", arabic: "المضارع البسيط: يتم تنظيف المكتب كل يوم." },
      { english: "Present Continuous: The office is being cleaned now.", arabic: "المضارع المستمر: يتم تنظيف المكتب الآن." },
      { english: "Past Simple: The office was cleaned yesterday.", arabic: "الماضي البسيط: تم تنظيف المكتب أمس." },
      { english: "Past Continuous: The office was being cleaned when I arrived.", arabic: "الماضي المستمر: كان يتم تنظيف المكتب عندما وصلت." },
      { english: "Present Perfect: The office has been cleaned.", arabic: "المضارع التام: لقد تم تنظيف المكتب." },
      { english: "Past Perfect: The office had been cleaned before they left.", arabic: "الماضي التام: كان قد تم تنظيف المكتب قبل مغادرتهم." },
      { english: "Future (will): The office will be cleaned tomorrow.", arabic: "المستقبل (will): سيتم تنظيف المكتب غدًا." },
      { english: "Future (going to): The office is going to be cleaned.", arabic: "المستقبل (going to): سيتم تنظيف المكتب." },
      { english: "Modals: The office must be cleaned.", arabic: "الأفعال المساعدة: يجب تنظيف المكتب." },
      { english: "The passive is used when the action is more important than the agent.", arabic: "يستخدم المبني للمجهول عندما يكون الفعل أكثر أهمية من الفاعل." }
    ],
    mcqs: [
      { question: "How do you make 'They build houses' passive?", options: ["Houses are build.", "Houses are built.", "Houses are being built.", "Houses were built."], answer: "Houses are built." },
      { question: "How do you make 'She has written a book' passive?", options: ["A book is written.", "A book has written.", "A book has been written.", "A book was written."], answer: "A book has been written." }
    ],
    story: {
        title: "From a Documentary on Construction",
        summary: "This skyscraper was designed by a famous architect. The foundations were laid two years ago. Now, the main structure is being built. The windows will be installed next month. The project has been delayed several times. However, it is expected that the building will be completed by next year. It must be finished on time."
    }
  },
  {
    type: 'lesson',
    title: "Grammar Reference: Conditionals Overview",
    explanation: "A summary of the main conditional structures (Zero, First, Second, Third) and their uses for talking about real, hypothetical, and past hypothetical situations.",
    examples: [
      { english: "Zero Conditional (General truth): If you heat water, it boils.", arabic: "الشرط الصفري (حقيقة عامة): إذا سخنت الماء، فإنه يغلي." },
      { english: "First Conditional (Real future possibility): If it rains, we will stay home.", arabic: "الشرط الأول (إمكانية مستقبلية حقيقية): إذا أمطرت، سنبقى في المنزل." },
      { english: "Second Conditional (Hypothetical present/future): If I had money, I would travel.", arabic: "الشرط الثاني (افتراضي في الحاضر/المستقبل): لو كان لدي مال، لسافرت." },
      { english: "Third Conditional (Hypothetical past): If I had studied, I would have passed.", arabic: "الشرط الثالث (افتراضي في الماضي): لو كنت قد درست، لكنت قد نجحت." },
      { english: "First: If you study, you will pass the exam.", arabic: "الأول: إذا درست، ستنجح في الامتحان." },
      { english: "Second: If I were you, I would tell the truth.", arabic: "الثاني: لو كنت مكانك، لقلت الحقيقة." },
      { english: "Third: She would have come if you had invited her.", arabic: "الثالث: كانت ستأتي لو كنت قد دعوتها." },
      { english: "Zero: When the sun goes down, it gets dark.", arabic: "الصفري: عندما تغرب الشمس، يحل الظلام." },
      { english: "First: I'll call you if I have time.", arabic: "الأول: سأتصل بك إذا كان لدي وقت." },
      { english: "Second: What would you do if you won the lottery?", arabic: "الثاني: ماذا كنت ستفعل لو ربحت اليانصيب؟" }
    ],
    mcqs: [
      { question: "Which conditional is for hypothetical past situations?", options: ["First", "Second", "Third", "Zero"], answer: "Third" },
      { question: "Which conditional is for real future possibilities?", options: ["First", "Second", "Third", "Zero"], answer: "First" }
    ],
    story: {
        title: "From 'A Christmas Carol'",
        summary: "A mean old man, Scrooge, is visited by ghosts. The first ghost shows him his past. 'If I had been kinder, I would have been happier,' Scrooge thinks. The second ghost shows him the present. 'If people have love, they are rich,' he learns. The final ghost shows him the future. 'If I don't change, I will die alone.' Scrooge wakes up a new man. He knows that if he is generous, people will love him."
    }
  },
  {
    type: 'lesson',
    title: "Grammar Reference: Reported Speech Overview",
    explanation: "A quick reference guide to the rules of reported speech, including tense backshift, changes to pronouns and time expressions, and the structure for reporting statements, questions, and commands.",
    examples: [
      { english: "Statement: 'I am happy.' -> He said he was happy.", arabic: "جملة خبرية: 'أنا سعيد.' -> قال إنه كان سعيدًا." },
      { english: "Question: 'Where are you?' -> She asked where I was.", arabic: "سؤال: 'أين أنت؟' -> سألت أين كنت." },
      { english: "Command: 'Sit down.' -> He told me to sit down.", arabic: "أمر: 'اجلس.' -> أخبرني أن أجلس." },
      { english: "Request: 'Please wait.' -> She asked me to wait.", arabic: "طلب: 'من فضلك انتظر.' -> طلبت مني أن أنتظر." },
      { english: "Pronoun change: 'I like your coat.' -> He said he liked my coat.", arabic: "تغيير الضمير: 'أنا أحب معطفك.' -> قال إنه أحب معطفي." },
      { english: "Tense backshift: 'I will call you.' -> She said she would call me.", arabic: "تغيير الزمن للوراء: 'سأتصل بك.' -> قالت إنها ستتصل بي." },
      { english: "Time change: 'I'll see you tomorrow.' -> He said he would see me the next day.", arabic: "تغيير الزمن: 'سأراك غدًا.' -> قال إنه سيراني في اليوم التالي." },
      { english: "'Yes/No' question: 'Are you busy?' -> She asked if I was busy.", arabic: "سؤال نعم/لا: 'هل أنت مشغول؟' -> سألت إذا كنت مشغولاً." },
      { english: "Negative command: 'Don't shout.' -> He told them not to shout.", arabic: "أمر منفي: 'لا تصرخ.' -> أخبرهم ألا يصرخوا." },
      { english: "The reporting verb 'said' doesn't take an object, 'told' does: He told me... (NOT He said me...)", arabic: "فعل النقل 'قال' لا يأخذ مفعولاً به، بينما 'أخبر' يأخذ: أخبرني... (وليس قال لي...)" }
    ],
    mcqs: [
      { question: "How do you report the question 'What are you doing?'", options: ["He asked what I was doing.", "He asked what was I doing.", "He asked what are you doing.", "He asked what I am doing."], answer: "He asked what I was doing." },
      { question: "How do you report the command 'Don't go!'", options: ["She told me don't go.", "She told me to not go.", "She told me not to go.", "She said me not to go."], answer: "She told me not to go." }
    ],
    story: {
        title: "From a Newspaper Article",
        summary: "The mayor gave a speech yesterday. He said that the city was growing fast. He told reporters that new schools would be built. He was asked when the project would start. He replied that he didn't know the exact date yet. He also asked residents to be patient. He promised that he would provide more information soon."
    }
  },
  {
    type: 'lesson',
    title: "Grammar Reference: Verb Patterns Overview",
    explanation: "A summary chart of common verbs and the patterns that follow them (verb + -ing, verb + to-infinitive, etc.). This is a useful tool for avoiding common mistakes.",
    examples: [
      { english: "Verb + -ing: I enjoy reading.", arabic: "فعل + -ing: أستمتع بالقراءة." },
      { english: "Verb + to-infinitive: I want to leave.", arabic: "فعل + to-infinitive: أريد أن أغادر." },
      { english: "Verb + object + to-infinitive: I asked him to help.", arabic: "فعل + مفعول به + to-infinitive: طلبت منه المساعدة." },
      { english: "Verb + object + infinitive (no to): She made me laugh.", arabic: "فعل + مفعول به + infinitive (بدون to): جعلتني أضحك." },
      { english: "Verb + that-clause: I think that you are right.", arabic: "فعل + جملة that: أعتقد أنك على حق." },
      { english: "Preposition + -ing: I'm good at playing chess.", arabic: "حرف جر + -ing: أنا جيد في لعب الشطرنج." },
      { english: "Verbs like 'love', 'hate', 'start' can take -ing or to-infinitive.", arabic: "أفعال مثل 'أحب'، 'أكره'، 'أبدأ' يمكن أن تأخذ -ing أو to-infinitive." },
      { english: "'Stop' has different meanings: He stopped smoking. (quit) / He stopped to smoke. (paused to do something)", arabic: "'توقف' لها معان مختلفة: توقف عن التدخين. (أقلع) / توقف ليدخن. (توقف مؤقتًا للقيام بشيء ما)" },
      { english: "Avoid, finish, mind are followed by -ing.", arabic: "تجنب، أنهى، مانع يتبعها -ing." },
      { english: "Decide, hope, promise are followed by to-infinitive.", arabic: "قرر، أمل، وعد يتبعها to-infinitive." }
    ],
    mcqs: [
      { question: "Which pattern follows the verb 'enjoy'?", options: ["to-infinitive", "-ing", "infinitive (no to)"], answer: "-ing" },
      { question: "Which pattern follows the verb 'decide'?", options: ["to-infinitive", "-ing", "infinitive (no to)"], answer: "to-infinitive" }
    ],
    story: {
        title: "From 'Eat, Pray, Love'",
        summary: "The author decided to change her life. She wanted to travel. She enjoyed learning Italian in Rome. In India, she learned to meditate. Her teacher made her sit for hours. She avoided thinking about her past. She started to feel happy again. She promised to live a more balanced life."
    }
  },
  {
    type: 'lesson',
    title: "Phonetic Symbols: Vowels",
    explanation: "An introduction to the phonetic symbols used to represent vowel sounds in English, helping to improve pronunciation accuracy.",
    examples: [
      { english: "/i:/ as in see, meet, eat", arabic: "/i:/ كما في see, meet, eat" },
      { english: "/ɪ/ as in sit, his, big", arabic: "/ɪ/ كما في sit, his, big" },
      { english: "/e/ as in ten, bed, said", arabic: "/e/ كما في ten, bed, said" },
      { english: "/æ/ as in cat, stamp, happy", arabic: "/æ/ كما في cat, stamp, happy" },
      { english: "/ɑː/ as in father, car, park", arabic: "/ɑː/ كما في father, car, park" },
      { english: "/ɒ/ as in hot, got, watch (in British English)", arabic: "/ɒ/ كما في hot, got, watch (في الإنجليزية البريطانية)" },
      { english: "/ɔː/ as in four, morning, walk", arabic: "/ɔː/ كما في four, morning, walk" },
      { english: "/ʊ/ as in put, good, football", arabic: "/ʊ/ كما في put, good, football" },
      { english: "/uː/ as in you, food, blue", arabic: "/uː/ كما في you, food, blue" },
      { english: "/ʌ/ as in sun, but, come", arabic: "/ʌ/ كما في sun, but, come" }
    ],
    mcqs: [
      { question: "Which symbol represents the vowel sound in 'sheep'?", options: ["/ɪ/", "/e/", "/i:/", "/aɪ/"], answer: "/i:/" },
      { question: "Which symbol represents the vowel sound in 'ship'?", options: ["/ɪ/", "/e/", "/i:/", "/aɪ/"], answer: "/ɪ/" }
    ],
    story: {
        title: "From a Pronunciation Guide",
        summary: "Let's meet (/i:/) and sit (/ɪ/) on this red (/e/) mat (/æ/). The father (/ɑː/) in the hot (/ɒ/) room saw (/ɔː/) a good (/ʊ/) book about blue (/uː/) ducks (/ʌ/) under the sun (/ʌ/)."
    }
  },
  {
    type: 'lesson',
    title: "Phonetic Symbols: Consonants",
    explanation: "An introduction to the phonetic symbols used to represent consonant sounds in English, including sounds that can be tricky for learners.",
    examples: [
      { english: "/p/ as in pen, happy, stop", arabic: "/p/ كما في pen, happy, stop" },
      { english: "/b/ as in big, table, job", arabic: "/b/ كما في big, table, job" },
      { english: "/t/ as in tea, student, get", arabic: "/t/ كما في tea, student, get" },
      { english: "/d/ as in do, middle, good", arabic: "/d/ كما في do, middle, good" },
      { english: "/k/ as in cat, back, school", arabic: "/k/ كما في cat, back, school" },
      { english: "/g/ as in go, bigger, bag", arabic: "/g/ كما في go, bigger, bag" },
      { english: "/θ/ as in thanks, nothing, bath (voiceless 'th')", arabic: "/θ/ كما في thanks, nothing, bath ('th' غير صوتي)" },
      { english: "/ð/ as in the, other, with (voiced 'th')", arabic: "/ð/ كما في the, other, with ('th' صوتي)" },
      { english: "/ʃ/ as in she, station, fish ('sh' sound)", arabic: "/ʃ/ كما في she, station, fish (صوت 'sh')" },
      { english: "/tʃ/ as in child, teacher, watch ('ch' sound)", arabic: "/tʃ/ كما في child, teacher, watch (صوت 'ch')" }
    ],
    mcqs: [
      { question: "Which symbol represents the first sound in 'think'?", options: ["/t/", "/s/", "/ð/", "/θ/"], answer: "/θ/" },
      { question: "Which symbol represents the last sound in 'wash'?", options: ["/s/", "/z/", "/ʃ/", "/tʃ/"], answer: "/ʃ/" }
    ],
    story: {
        title: "From a Children's Alphabet Book",
        summary: "The big (/b/) cat (/k/) did (/d/) go (/g/). She (/ʃ/) saw this (/ð/) thing (/θ/). The child (/tʃ/) had a big job (/dʒ/). The student (/t/) took a pen (/p/). They watch (/tʃ/) television (/ʒ/)."
    }
  },
  {
    type: 'lesson',
    title: "Phonetic Symbols: Diphthongs",
    explanation: "Learn to recognize and pronounce diphthongs, which are two vowel sounds combined in a single syllable (e.g., the sounds in 'name', 'my', 'boy').",
    examples: [
      { english: "/eɪ/ as in name, paid, play", arabic: "/eɪ/ كما في name, paid, play" },
      { english: "/aɪ/ as in my, time, buy", arabic: "/aɪ/ كما في my, time, buy" },
      { english: "/ɔɪ/ as in boy, noise, point", arabic: "/ɔɪ/ كما في boy, noise, point" },
      { english: "/əʊ/ as in no, go, road (in British English)", arabic: "/əʊ/ كما في no, go, road (في الإنجليزية البريطانية)" },
      { english: "/aʊ/ as in how, now, town", arabic: "/aʊ/ كما في how, now, town" },
      { english: "/ɪə/ as in hear, near, beer", arabic: "/ɪə/ كما في hear, near, beer" },
      { english: "/eə/ as in where, bear, hair", arabic: "/eə/ كما في where, bear, hair" },
      { english: "/ʊə/ as in tour, poor, sure", arabic: "/ʊə/ كما في tour, poor, sure" },
      { english: "A diphthong is a glide from one vowel to another.", arabic: "الديفثونج هو انزلاق من حرف علة إلى آخر." },
      { english: "Understanding diphthongs is key to a natural accent.", arabic: "فهم الديفثونجات هو مفتاح اللكنة الطبيعية." }
    ],
    mcqs: [
      { question: "Which symbol represents the vowel sound in 'house'?", options: ["/əʊ/", "/ɔɪ/", "/aʊ/", "/u:/"], answer: "/aʊ/" },
      { question: "Which symbol represents the vowel sound in 'train'?", options: ["/e/", "/æ/", "/aɪ/", "/eɪ/"], answer: "/eɪ/" }
    ],
    story: {
        title: "From a Poem for Pronunciation Practice",
        summary: "The boy (/ɔɪ/) with no (/əʊ/) name (/eɪ/) is over there (/eə/). How (/aʊ/) can I (/aɪ/) go near (/ɪə/)? I am not sure (/ʊə/). My (/aɪ/) name is James (/eɪ/). I will go now (/aʊ/)."
    }
  },
  {
    type: 'lesson',
    title: "Irregular Verbs List (A-G)",
    explanation: "Study and practice the past simple and past participle forms of common irregular verbs from 'be' to 'grow'.",
    examples: [
      { english: "be, was/were, been", arabic: "be, was/were, been" },
      { english: "begin, began, begun", arabic: "begin, began, begun" },
      { english: "break, broke, broken", arabic: "break, broke, broken" },
      { english: "bring, brought, brought", arabic: "bring, brought, brought" },
      { english: "buy, bought, bought", arabic: "buy, bought, bought" },
      { english: "catch, caught, caught", arabic: "catch, caught, caught" },
      { english: "come, came, come", arabic: "come, came, come" },
      { english: "do, did, done", arabic: "do, did, done" },
      { english: "drink, drank, drunk", arabic: "drink, drank, drunk" },
      { english: "eat, ate, eaten", arabic: "eat, ate, eaten" },
      { english: "find, found, found", arabic: "find, found, found" },
      { english: "go, went, gone", arabic: "go, went, gone" }
    ],
    mcqs: [
      { question: "What is the past participle of 'go'?", options: ["goed", "went", "gone", "wented"], answer: "gone" },
      { question: "What is the past simple of 'begin'?", options: ["begun", "began", "begined", "begon"], answer: "began" }
    ],
    story: {
        title: "From a Diary Entry",
        summary: "I went to the store and bought some milk. When I came home, I found my brother had eaten all the cookies. He had also drunk all the juice. I was not happy. I had done my chores, but he had done nothing. It felt like my good mood had gone."
    }
  },
  {
    type: 'lesson',
    title: "Irregular Verbs List (H-P)",
    explanation: "Study and practice the past simple and past participle forms of common irregular verbs from 'hang' to 'put'.",
    examples: [
      { english: "have, had, had", arabic: "have, had, had" },
      { english: "hear, heard, heard", arabic: "hear, heard, heard" },
      { english: "know, knew, known", arabic: "know, knew, known" },
      { english: "leave, left, left", arabic: "leave, left, left" },
      { english: "let, let, let", arabic: "let, let, let" },
      { english: "lose, lost, lost", arabic: "lose, lost, lost" },
      { english: "make, made, made", arabic: "make, made, made" },
      { english: "meet, met, met", arabic: "meet, met, met" },
      { english: "pay, paid, paid", arabic: "pay, paid, paid" },
      { english: "put, put, put", arabic: "put, put, put" }
    ],
    mcqs: [
      { question: "What is the past participle of 'know'?", options: ["knew", "knowed", "known", "knewed"], answer: "known" },
      { question: "What is the past simple of 'lose'?", options: ["losed", "losed", "lost", "leaved"], answer: "lost" }
    ],
    story: {
        title: "From a Short Story about a Bad Day",
        summary: "I had a terrible day. I lost my wallet. I left my keys at home. I paid for a coffee but the machine made a horrible noise. I met my boss, and he was angry. I had known it would be a bad day when I heard the news this morning. I put my head in my hands and sighed."
    }
  },
  {
    type: 'lesson',
    title: "Irregular Verbs List (Q-Z)",
    explanation: "Study and practice the past simple and past participle forms of common irregular verbs from 'read' to 'write'.",
    examples: [
      { english: "read, read, read (pronunciation changes)", arabic: "read, read, read (يتغير النطق)" },
      { english: "run, ran, run", arabic: "run, ran, run" },
      { english: "say, said, said", arabic: "say, said, said" },
      { english: "see, saw, seen", arabic: "see, saw, seen" },
      { english: "sell, sold, sold", arabic: "sell, sold, sold" },
      { english: "send, sent, sent", arabic: "send, sent, sent" },
      { english: "sing, sang, sung", arabic: "sing, sang, sung" },
      { english: "speak, spoke, spoken", arabic: "speak, spoke, spoken" },
      { english: "take, took, taken", arabic: "take, took, taken" },
      { english: "tell, told, told", arabic: "tell, told, told" },
      { english: "think, thought, thought", arabic: "think, thought, thought" },
      { english: "write, wrote, written", arabic: "write, wrote, written" }
    ],
    mcqs: [
      { question: "What is the past participle of 'speak'?", options: ["spoke", "speaked", "spoken", "spoke"], answer: "spoken" },
      { question: "What is the past simple of 'write'?", options: ["written", "wrote", "writed", "wroten"], answer: "wrote" }
    ],
    story: {
        title: "From an Author's Biography",
        summary: "She wrote her first novel in a year. She sent it to a publisher. They said they loved it. She thought it was a dream. She had sung for joy when she heard the news. She had spoken to her editor on the phone. She told him all her ideas. The book sold millions of copies. She had never seen so much success."
    }
  }
];

const stories: Story[] = [
    {
      type: 'story',
      title: "The Fox and the Grapes",
      content: `One hot summer's day, a fox was strolling through an orchard. He saw a bunch of delicious-looking grapes hanging from a high branch. "Just the thing to quench my thirst," he thought. He backed up a few paces, took a run and a jump, but just missed the hanging grapes. Again and again he tried, but he could not reach them. At last, he gave up and walked away with his nose in the air, saying, "I am sure they are sour."`
    },
    {
      type: 'story',
      title: "The Lion and the Mouse",
      content: `A lion was sleeping in his lair. A little mouse began running up and down on him. This soon wakened the lion, who placed his huge paw on him and opened his big jaws to swallow him. "Pardon, O King!" cried the little mouse. "Forgive me this time. I shall never repeat it and I shall never forget your kindness. Who knows, I may be able to do you a good turn one of these days?" The lion was so tickled by the idea of the mouse being able to help him that he lifted his paw and let him go. Some time later, the lion was caught in a trap, and the hunters who desired to carry him alive to the King, tied him to a tree while they went in search of a wagon to carry him on. Just then the little mouse happened to pass by, and seeing the sad plight in which the lion was, went up to him and soon gnawed away the ropes that bound the King of the Beasts. "Was I not right?" said the little mouse, very happy to help the lion.`
    },
    {
      type: 'story',
      title: "The Tortoise and the Hare",
      content: `An hare was making fun of the tortoise one day for being so slow. "Do you ever get anywhere?" he asked with a mocking laugh. "Yes," replied the tortoise, "and I get there sooner than you think. I'll run you a race and prove it." The hare was much amused at the idea of running a race with the tortoise, but for the fun of the thing he agreed. So the fox, who had consented to act as judge, marked the distance and started the runners off. The hare was soon far out of sight, and to make the tortoise feel very deeply how ridiculous it was for him to try a race with a hare, he lay down beside the course to take a nap until the tortoise should catch up. The tortoise meanwhile kept going slowly but steadily, and, after a time, passed the place where the hare was sleeping. The hare slept on very peacefully; and when at last he did wake up, the tortoise was near the goal. The hare now ran his swiftest, but he could not overtake the tortoise in time.`
    },
     {
      type: 'story',
      title: "The Crow and the Pitcher",
      content: `A thirsty crow found a pitcher with a little water in it. But the pitcher was high and had a narrow neck, and no matter how he tried, he could not reach the water. The poor thing felt as if he must die of thirst. Then an idea came to him. He took a pebble and dropped it into the pitcher. Then he took another pebble and dropped it into the pitcher. He took another and another and dropped them in. At last, he saw the water rise, and after casting in a few more pebbles, he was able to quench his thirst and save his life.`
    },
    {
      type: 'story',
      title: "The Town Mouse and the Country Mouse",
      content: `A country mouse invited a town mouse to dinner. The town mouse came, but was not impressed with the simple food. He said, "You live a poor life, cousin. Come with me and I will show you how to live!" So they went to the town. The town mouse led him to a great dining hall. They feasted on cakes and jellies. Suddenly, they heard a great barking. Two huge dogs rushed in. The mice scampered away. "Goodbye, cousin," said the country mouse. "Better beans and bacon in peace than cakes and ale in fear."`
    },
    {
      type: 'story',
      title: "The Boy Who Cried Wolf",
      content: "There was once a young shepherd boy who tended his sheep at the foot of a mountain near a dark forest. It was rather lonely for him all day, so he thought upon a plan by which he could get a little company and some excitement. He rushed down towards the village calling out 'Wolf, Wolf,' and the villagers came out to meet him, and some of them stopped with him for a considerable time. This pleased the boy so much that a few days afterwards he tried the same trick, and again the villagers came to his help. But shortly after this a wolf actually did come out from the forest, and began to worry the sheep, and the boy of course cried out 'Wolf, Wolf,' still louder than before. But this time the villagers, who had been fooled twice before, thought the boy was again deceiving them, and nobody stirred to come to his help."
    },
    {
      type: 'story',
      title: "The Ant and the Grasshopper",
      content: "In a field one summer's day a Grasshopper was hopping about, chirping and singing to its heart's content. An Ant passed by, bearing along with great toil an ear of corn he was taking to the nest. 'Why not come and chat with me,' said the Grasshopper, 'instead of toiling and moiling in that way?' 'I am helping to lay up food for the winter,' said the Ant, 'and recommend you to do the same.' 'Why bother about winter?' said the Grasshopper; 'we have got plenty of food at present.' But the Ant went on its way and continued its toil. When the winter came the Grasshopper had no food and found itself dying of hunger, while it saw the ants distributing every day corn and grain from the stores they had collected in the summer."
    },
    {
      type: 'story',
      title: "The Goose with the Golden Eggs",
      content: "One day a countryman going to the nest of his Goose found there an egg all yellow and glittering. When he took it up it was as heavy as lead and he was going to throw it away, because he thought a trick had been played upon him. But he took it home on second thoughts, and soon found to his delight that it was an egg of pure gold. Every morning the same thing occurred, and he soon became rich by selling his eggs. As he grew rich he grew greedy; and thinking to get at once all the gold the Goose could give, he killed it and opened it only to find nothing."
    },
    {
      type: 'story',
      title: "The North Wind and the Sun",
      content: "The North Wind and the Sun had a quarrel about which of them was the stronger. While they were disputing with much heat and bluster, a Traveler passed along the road wrapped in a cloak. 'Let us agree,' said the Sun, 'that he is the stronger who can strip that Traveler of his cloak.' 'Very well,' growled the North Wind, and at once sent a cold, howling blast against the Traveler. With the first gust of wind the ends of the cloak whipped about the Traveler's body. But he immediately wrapped it closely around him, and the harder the Wind blew, the tighter he held it to him. The North Wind tore angrily at the cloak, but all his efforts were in vain. Then the Sun began to shine. At first his beams were gentle, and in the welcome warmth after the bitter cold of the North Wind, the Traveler unfastened his cloak and let it hang loosely from his shoulders. The Sun's rays grew warmer and warmer. The man took off his cap and mopped his brow. At last he became so heated that he pulled off his cloak, and, to escape the blazing sunshine, threw himself down in the welcome shade of a tree."
    },
    {
      type: 'story',
      title: "Saudi Arabia's AI Vision",
      content: "In the heart of the desert, a new future is being built. This is Saudi Arabia's Vision 2030, a huge plan to change the country. And what is at the center of this plan? Artificial Intelligence. The Saudi Data and AI Authority, known as SDAIA, is leading this amazing transformation. They are investing billions of dollars to make the country a world leader in AI. One of the most exciting projects is NEOM, a futuristic city where AI will control almost everything, from driverless cars to clean energy. The latest news is that Saudi Arabia is hosting global AI events and creating its own powerful language models. The kingdom understands that AI is not just technology; it is the key to a new, smarter, and more innovative world."
    }
];

// Combine lessons and stories, ensuring we have at least 80 items total.
// This creates a richer, more varied learning path for the user.
const fullLessonPlan: LearningItem[] = [];
let lessonIndex = 0;
let storyIndex = 0;

// This loop interleaves stories with lessons to create a varied learning path.
// It will add a story after approximately every 3-4 lessons.
while (lessonIndex < lessons.length || storyIndex < stories.length) {
    // Add a batch of lessons
    for (let i = 0; i < 4 && lessonIndex < lessons.length; i++) {
        fullLessonPlan.push(lessons[lessonIndex++]);
    }
    // Add a story
    if (storyIndex < stories.length) {
        fullLessonPlan.push(stories[storyIndex++]);
    }
}


// If the plan is still under 80 items, fill the rest with placeholder lessons
// to ensure a consistent library size.
const placeholderLesson: Lesson = {
    type: 'lesson',
    title: "Future Lesson",
    explanation: "This is a placeholder for a future lesson. Content will be added soon based on advanced topics.",
    examples: [{ english: "This is a placeholder example.", arabic: "هذا مثال مؤقت." }, { english: "Another placeholder.", arabic: "مثال مؤقت آخر." }, { english: "More content coming soon.", arabic: "المزيد من المحتوى قريبًا." }, { english: "Keep checking for updates.", arabic: "استمر في التحقق من وجود تحديثات." }, { english: "Practice makes perfect.", arabic: "التمرين يؤدي إلى الإتقان." }, { english: "This will be a new grammar topic.", arabic: "سيكون هذا موضوعًا نحويًا جديدًا." }, { english: "We will add vocabulary lessons too.", arabic: "سنضيف دروسًا في المفردات أيضًا." }, { english: "Thank you for your patience.", arabic: "شكرا لك على صبرك." }, { english: "Learning is a journey.", arabic: "التعلم رحلة." }, { english: "Enjoy the process!", arabic: "استمتع بالعملية!" }],
    mcqs: [{ question: "This is a placeholder question.", options: ["A", "B"], answer: "A" }]
};

while (fullLessonPlan.length < 80) {
    const newLesson = { ...placeholderLesson, title: `درس متقدم قيد الإعداد ${fullLessonPlan.length + 1}` };
    fullLessonPlan.push(newLesson);
}


export const learningItems: LearningItem[] = fullLessonPlan.slice(0, 80);

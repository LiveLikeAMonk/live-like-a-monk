'use client';

import { FormEvent, useState } from 'react';

type Lang = 'hi' | 'en';

type Content = {
  nav: { about: string; tracks: string; training: string; norms: string; apply: string };
  heroKicker: string; heroTitle: string; heroSubtitle: string; heroButton: string;
  objectiveTitle: string; objective: string;
  eligibilityTitle: string; eligibilityIntro: string; eligibility: { title: string; body: string }[];
  tracksTitle: string; tracksIntro: string; tracks: { code: string; title: string; desc: string; support: string; tag: string }[];
  spiritualTitle: string; spiritualIntro: string; months: { label: string; time: string; body: string }[]; acceleratedTitle: string; accelerated: string[];
  conductTitle: string; conductIntro: string; principles: { title: string; body: string }[];
  disciplineTitle: string; discipline: { title: string; body: string }[];
  advancedTitle: string; advancedIntro: string; advanced: { title: string; body: string }[];
  pathwayTitle: string; pathwayIntro: string; pathway: { n: string; title: string; body: string }[];
  ctaTitle: string; ctaBody: string; cta: string;
  formTitle: string; formIntro: string; close: string; successTitle: string; successBody: string; done: string;
  name: string; mobile: string; age: string; status: string; native: string; current: string; note: string; submit: string; required: string; select: string;
  student: string; professional: string; business: string; job: string; other: string; consent: string;
};

const content: Record<Lang, Content> = {
  hi: {
    nav: { about: 'परिचय', tracks: 'मार्ग', training: 'प्रशिक्षण', norms: 'नियम', apply: 'रुचि है' },
    heroKicker: 'ISKCON NVCC PUNE • आवासीय आध्यात्मिक प्रशिक्षण',
    heroTitle: 'LIVE LIKE A MONK',
    heroSubtitle: 'मंदिर में रहिए • सीखिए • सेवाभाव विकसित कीजिए • आध्यात्मिक जीवन को अपनाइए',
    heroButton: 'रुचि है — आवेदन करें',
    objectiveTitle: 'एक अनुशासित जीवन की ओर एक कदम',
    objective: '३० वर्ष या उससे कम आयु के उत्साही युवाओं के लिए एक अनुशासित, आध्यात्मिक रूप से उन्नत और सहयोगी वातावरण—जहाँ वे चरित्र का विकास करें, जीवन के अमूल्य कौशल सीखें और वैदिक सिद्धांतों को दैनिक जीवन में आत्मसात करें, चाहे वे बाह्य व्यावसायिक करियर चुनें या पूर्णकालिक मंदिर सेवा।',
    eligibilityTitle: '१. पात्रता एवं प्रवेश के नियम',
    eligibilityIntro: 'मंदिर परिसर में एकाग्र, सौहार्दपूर्ण एवं आध्यात्मिक वातावरण बनाए रखने के लिए प्रवेश प्रक्रिया निर्धारित मानकों के आधार पर संचालित की जाती है।',
    eligibility: [
      { title: 'आयु सीमा', body: 'प्रवेश के समय अभ्यर्थी की आयु अनिवार्य रूप से ३० वर्ष या उससे कम होनी चाहिए।' },
      { title: 'शैक्षणिक पृष्ठभूमि', body: 'शिक्षित एवं अशिक्षित दोनों प्रकार के उत्साही युवाओं का स्वागत है, जिनमें आचरण सुधार तथा आंतरिक रूपांतरण की गहरी जिज्ञासा हो।' },
      { title: 'जीवन लक्ष्य व कार्य दिशा', body: 'यह कार्यक्रम उन युवाओं के लिए है जो बाहर नौकरी व करियर जारी रखना चाहते हैं, अथवा मंदिर की प्रत्यक्ष भक्ति-सेवा में समर्पित होना चाहते हैं।' },
      { title: 'अनिवार्य पूर्व-प्रवेश साक्षात्कार', body: 'मंदिर में निवास की अंतिम अनुमति से पहले प्रत्येक अभ्यर्थी को वरिष्ठ वैष्णवों के पैनल के समक्ष औपचारिक साक्षात्कार सफलतापूर्वक उत्तीर्ण करना होगा।' },
    ],
    tracksTitle: 'आपके लिए कौन-सा मार्ग?',
    tracksIntro: 'उम्मीदवारों को उनके जीवन-लक्ष्य और आध्यात्मिक समर्पण के आधार पर तीन प्रमुख श्रेणियों में रखा जाता है।',
    tracks: [
      { code: 'TRACK A', title: 'कामकाजी पेशेवर', tag: 'करियर के साथ मंदिर जीवन', desc: 'ऐसे युवा जो बाहर स्वतंत्र व्यावसायिक नौकरी करते हैं अथवा मंदिर के भीतर नियमित सवेतन पदों पर सेवा करते हैं।', support: 'अंशदायी व्यवस्था: आवास रखरखाव, बिजली एवं बुनियादी व्यवस्थाओं हेतु मंदिर प्रशासन को निश्चित मासिक सहयोग राशि।' },
      { code: 'TRACK B', title: 'मंदिर स्वयंसेवक', tag: 'पूर्णकालिक सेवा', desc: 'ऐसे युवा जो मंदिर के विभिन्न सेवा-विभागों एवं परियोजनाओं के संचालन में अवैतनिक, पूर्णकालिक भक्ति-सेवा समर्पित करते हैं।', support: 'पूर्णतः प्रायोजित: मंदिर प्रशासन आवास एवं दैनिक कृष्ण-प्रसादम का शत-प्रतिशत व्यय वहन करता है।' },
      { code: 'TRACK C', title: 'ब्रह्मचर्य जीवन आकांक्षी', tag: 'गहन आश्रम प्रशिक्षण', desc: 'ऐसे युवा जो शुद्ध, एकाग्र और पूर्ण ब्रह्मचर्य-युक्त मठवासी जीवनशैली के प्रति समर्पित होने का दृढ़ संकल्प रखते हैं।', support: 'ब्रह्मचारी प्रशिक्षण: साधक समर्पित आश्रम दिनचर्या में प्रवेश करते हैं, जहाँ गहन शास्त्र-अध्ययन व साधना-प्रशिक्षण प्रदान किया जाता है।' },
    ],
    spiritualTitle: '२. आध्यात्मिक प्रगति एवं नाम-जप क्रम',
    spiritualIntro: 'नए अभ्यर्थियों के लिए प्रातःकालीन समय और जप-साधना का नियम चरणबद्ध तरीके से बढ़ाया जाता है, ताकि साधना क्रमिक और स्थिर रूप से विकसित हो।',
    months: [
      { label: 'प्रथम माह', time: '६:३० AM', body: 'पूर्ण स्नान व स्वच्छ वैष्णव वस्त्र धारण कर मंदिर हॉल में उपस्थिति → नित्य ४ माला महामंत्र का जप।' },
      { label: 'द्वितीय माह', time: '६:०० AM', body: 'नियमित समय पर मंदिर हॉल में उपस्थिति → प्रतिदिन ८ माला हरे कृष्ण महामंत्र का जप।' },
      { label: 'तृतीय माह', time: '५:३० AM', body: 'मंदिर हॉल में साधना हेतु उपस्थिति → प्रतिदिन १२ माला महामंत्र का एकाग्रतापूर्वक जप।' },
      { label: 'चतुर्थ माह', time: '५:०० AM', body: 'मंदिर हॉल में उपस्थिति → प्रतिदिन १६ माला महामंत्र का विधिपूर्वक जप।' },
      { label: 'पंचम माह से आगे', time: '४:३० AM', body: 'पूर्ण मंदिर मानक: मंगल आरती में उपस्थिति और नित्य न्यूनतम १६ माला का नियमपूर्वक जप।' },
    ],
    acceleratedTitle: 'पूर्व अभ्यासी भक्त — त्वरित पद्धति',
    accelerated: ['जो साधक पहले से नाम-जप का अभ्यास कर रहे हैं, वे अपने पूर्व निर्धारित जप की संख्या से ही शुरुआत करेंगे।', 'वे सीधे अंतिम लक्ष्य को अपनाएंगे: नित्य प्रातः ४:३० बजे मंगल आरती में उपस्थिति और प्रतिदिन न्यूनतम १६ माला का जप।'],
    conductTitle: '३. आचार संहिता एवं मंदिर के नियम',
    conductIntro: 'मंदिर की आध्यात्मिक पवित्रता और सात्त्विक वातावरण बनाए रखने हेतु सभी निवासियों द्वारा इन नियमों का पूर्ण पालन अनिवार्य है।',
    principles: [
      { title: '१. मांसाहार निषेध', body: 'जीवों के प्रति दया और करुणा विकसित करने हेतु मांस, मछली, अंडे एवं समुद्री जीवों का पूर्ण त्याग।' },
      { title: '२. नशा निषेध', body: 'शराब, मादक द्रव्य, तंबाकू, धूम्रपान, चाय तथा कॉफी का पूर्णतः परित्याग।' },
      { title: '३. अवैध संग निषेध', body: 'शारीरिक ब्रह्मचर्य का पालन, नैतिक चरित्र और विचारों की शुचिता बनाए रखना।' },
      { title: '४. द्यूत क्रीड़ा निषेध', body: 'सट्टेबाजी, जुआ, लॉटरी अथवा वित्तीय सट्टे से पूर्ण दूरी बनाए रखना।' },
    ],
    disciplineTitle: 'संचार माध्यम, तकनीक एवं आहार अनुशासन',
    discipline: [
      { title: 'स्मार्टफोन पर कड़ा नियंत्रण', body: 'भौतिकतावादी फिल्में देखना, अनावश्यक सोशल मीडिया स्क्रॉल करना अथवा सिनेमाई/पॉप संगीत सुनना प्रतिबंधित है।' },
      { title: 'स्वीकृत उपकरण उपयोग', body: 'फोन का उपयोग केवल आवश्यक व्यावहारिक/कार्यालयीन संचार, शिक्षा, अथवा भक्ति-प्रवचन व कीर्तन श्रवण तक सीमित रहेगा।' },
      { title: 'आहार मर्यादा', body: 'मंदिर की सीमा के भीतर बाहर का भोजन, बाजार के तले-भुने स्नैक्स अथवा तामसिक पदार्थ लाना व ग्रहण करना वर्जित है।' },
      { title: 'प्रसादम निष्ठा', body: 'सभी निवासियों को मंदिर के भोजनालय में भगवान श्री कृष्ण को अर्पित शुद्ध सात्त्विक महाप्रसादम ही ग्रहण करना होगा।' },
      { title: 'शुचिता एवं वेशभूषा', body: 'प्रत्येक प्रातः मंदिर हॉल में प्रवेश से पूर्व पूर्ण स्नान कर स्वच्छ, धुले हुए धोती-कुर्ता/वैष्णव वस्त्र धारण करना आवश्यक है। सभी प्रातःकालीन कार्यक्रमों में समय की पूर्ण पाबंदी अनिवार्य है।' },
    ],
    advancedTitle: '४. उन्नत श्रेणी: ब्रह्मचारी आश्रम प्रशिक्षण',
    advancedIntro: 'ट्रैक C के अंतर्गत जो युवा प्रामाणिक मठवासी जीवनशैली अपनाने के प्रति समर्पित निष्ठा दर्शाते हैं, उन्हें ब्रह्मचारी आश्रम में विशेष प्रवेश दिया जाता है।',
    advanced: [
      { title: 'वरिष्ठ वैष्णव मार्गदर्शन', body: 'अनुभवी एवं वरिष्ठ वैष्णवों के प्रत्यक्ष सान्निध्य में व्यक्तिगत मार्गदर्शन, नियमित काउंसिलिंग तथा आध्यात्मिक संगति।' },
      { title: 'विशिष्ट पाठ्यक्रम', body: 'गहन शास्त्रीय अध्ययन (भक्ति-शास्त्री आदि प्रमाण-पत्र), बैक-अप सेवा प्रबंधन, मंदिर प्रशासन प्रणालियाँ तथा जन-प्रचार व संकीर्तन की व्यावहारिक शिक्षा।' },
      { title: 'चरित्र निर्माण', body: 'वास्तविक विनम्रता (तृणादपि सुनीचेन), पूर्ण इंद्रिय-संयम, नेतृत्व सत्यनिष्ठा और श्री कृष्ण के चरणों में पूर्ण शरणागति का अभ्यास।' },
    ],
    pathwayTitle: '५. प्रवेश एवं चयन प्रक्रिया',
    pathwayIntro: 'रुचि दर्ज करना अंतिम प्रवेश नहीं है। निवास की अनुमति चयन एवं साक्षात्कार प्रक्रिया के बाद दी जाती है।',
    pathway: [
      { n: '१', title: 'आवेदन पत्र प्राप्ति', body: 'उम्मीदवार की शैक्षणिक पृष्ठभूमि, आयु विवरण, वर्तमान आजीविका तथा पूर्व आध्यात्मिक परिचय का विवरण संकलित करने हेतु मानक प्रपत्र।' },
      { n: '२', title: 'अनिवार्य साक्षात्कार', body: 'अंतिम प्रवेश से पूर्व वरिष्ठ भक्तों का मंडल अभ्यर्थी के चरित्र, मानसिक संतुलन और चारों नियमों, प्रातःकालीन साधना व इलेक्ट्रॉनिक प्रतिबंधों के स्वैच्छिक पालन की निष्ठा की जाँच करता है।' },
      { n: '३', title: 'आश्रम प्रबंधन व निगरानी', body: 'समर्पित आश्रम प्रमुख/मेंटोर की नियुक्ति, जो दैनिक उपस्थिति, प्रातः जागरण के समय और नित्य जप-माला की प्रगति का निरंतर निरीक्षण व मार्गदर्शन करेंगे।' },
    ],
    ctaTitle: 'क्या आप इस जीवनशैली को अनुभव करना चाहते हैं?',
    ctaBody: 'यदि आप मंदिर में रहकर अनुशासित जीवन, साधना, सेवा और आध्यात्मिक प्रशिक्षण को गंभीरता से अपनाना चाहते हैं, तो अपनी रुचि दर्ज करें।',
    cta: 'रुचि है — आवेदन करें',
    formTitle: 'Live Like a Monk — रुचि पंजीकरण', formIntro: 'अपनी जानकारी भरें। आपकी जानकारी प्राप्त होने के बाद संपर्क किया जाएगा।', close: 'बंद करें', successTitle: 'आपकी रुचि दर्ज हो गई है', successBody: 'धन्यवाद। आपकी जानकारी प्राप्त हो गई है। आगे की प्रक्रिया के लिए आपसे संपर्क किया जाएगा।', done: 'ठीक है',
    name: 'पूरा नाम', mobile: 'मोबाइल नंबर', age: 'आयु', status: 'वर्तमान स्थिति', native: 'मूल स्थान का पता', current: 'वर्तमान निवास का पता', note: 'अतिरिक्त जानकारी (वैकल्पिक)', submit: 'पंजीकरण भेजें', required: 'आवश्यक', select: 'चुनें', student: 'विद्यार्थी', professional: 'कामकाजी पेशेवर', business: 'व्यवसायी', job: 'नौकरी की तलाश में', other: 'अन्य', consent: 'मैं समझता/समझती हूँ कि यह रुचि-पंजीकरण है और अंतिम निवास/प्रवेश चयन एवं साक्षात्कार प्रक्रिया पर निर्भर है।',
  },
  en: {
    nav: { about: 'About', tracks: 'Paths', training: 'Training', norms: 'Norms', apply: 'Interested' },
    heroKicker: 'ISKCON NVCC PUNE • RESIDENTIAL SPIRITUAL TRAINING', heroTitle: 'LIVE LIKE A MONK', heroSubtitle: 'Stay in the temple • Learn • Serve • Grow in spiritual life', heroButton: 'I’m Interested — Apply',
    objectiveTitle: 'A step toward a disciplined life', objective: 'A disciplined, spiritually uplifting and supportive environment for enthusiastic youth aged 30 or below to develop character, learn valuable life skills and integrate Vedic principles into daily life—whether they choose professional employment or full-time temple service.',
    eligibilityTitle: '1. Candidate Eligibility & Admission Requirements', eligibilityIntro: 'To maintain a focused, harmonious and spiritually elevated temple environment, admission is managed according to the following standards.', eligibility: [
      { title: 'Age Threshold', body: 'Candidates must be 30 years old or below at the time of entry.' },
      { title: 'Educational Background', body: 'Both educated and uneducated youth are welcome when they have a sincere desire for character improvement and inner transformation.' },
      { title: 'Career Orientation', body: 'Designed for candidates who wish to continue an outside job or career, as well as those who wish to dedicate themselves to direct devotional service in the temple.' },
      { title: 'Mandatory Pre-Admission Interview', body: 'Before final permission to reside in the temple, every candidate must successfully clear a formal interview with a panel of senior Vaishnavas.' },
    ],
    tracksTitle: 'Which path fits you?', tracksIntro: 'Candidates are placed into three main tracks based on their life direction and spiritual commitment.', tracks: [
      { code: 'TRACK A', title: 'Working Professionals', tag: 'Career + temple life', desc: 'Youth who work in outside professional employment or serve in regular salaried positions inside the temple.', support: 'Contributory structure: a fixed monthly contribution toward accommodation, electricity and basic facilities.' },
      { code: 'TRACK B', title: 'Temple Volunteers', tag: 'Full-time service', desc: 'Youth rendering full-time, unpaid devotional service in temple service departments and projects.', support: 'Fully sponsored: the temple administration bears the accommodation and daily Krishna-Prasadam expenses.' },
      { code: 'TRACK C', title: 'Aspiring for Celibacy Life', tag: 'Intensive ashram training', desc: 'Youth with a firm desire to dedicate themselves to a focused, celibate monastic lifestyle.', support: 'Brahmachari training: candidates enter a dedicated ashram routine with intensive scriptural study and sadhana training.' },
    ],
    spiritualTitle: '2. Spiritual Development & Chanting Progression', spiritualIntro: 'For new candidates, the morning schedule and chanting discipline increase step-by-step so that spiritual practice develops gradually and steadily.', months: [
      { label: 'Month 1', time: '6:30 AM', body: 'Be present in the temple hall after a full bath and clean Vaishnava clothing → chant 4 rounds of the Maha-Mantra daily.' },
      { label: 'Month 2', time: '6:00 AM', body: 'Be present in the temple hall at the scheduled time → chant 8 rounds of the Hare Krishna Maha-Mantra daily.' },
      { label: 'Month 3', time: '5:30 AM', body: 'Be present in the temple hall for sadhana → chant 12 rounds of the Maha-Mantra daily with concentration.' },
      { label: 'Month 4', time: '5:00 AM', body: 'Be present in the temple hall → chant 16 rounds of the Maha-Mantra daily.' },
      { label: 'Month 5 onward', time: '4:30 AM', body: 'Full temple standard: attend Mangala Arati and maintain a minimum of 16 rounds daily.' },
    ],
    acceleratedTitle: 'Practicing Devotees — Accelerated Method', accelerated: ['Candidates already practicing chanting begin at their existing chanting baseline.', 'They adapt directly toward the long-term goal: present for Mangala Arati at 4:30 AM and execute a minimum of 16 rounds daily.'],
    conductTitle: '3. Code of Conduct & Temple Norms', conductIntro: 'Complete alignment with these guidelines is mandatory for all residents to maintain the sanctity and sattvic environment of the temple.', principles: [
      { title: '1. No Meat Eating', body: 'Complete avoidance of meat, fish, eggs and seafood to cultivate compassion.' }, { title: '2. No Intoxication', body: 'Complete abstinence from alcohol, narcotics, tobacco, smoking, tea and coffee.' }, { title: '3. No Illicit Sex', body: 'Upholding physical celibacy, moral character and purity of thought.' }, { title: '4. No Gambling', body: 'Complete avoidance of betting, gambling, lotteries and financial speculation.' },
    ],
    disciplineTitle: 'Media, Technology & Dietary Discipline', discipline: [
      { title: 'Strict Smartphone Restriction', body: 'Watching materialistic films, unnecessary social-media scrolling, or listening to cinematic/pop music is prohibited.' }, { title: 'Permitted Device Use', body: 'Phones are limited to necessary practical/office communication, education, or hearing devotional lectures and kirtans.' }, { title: 'Dietary Boundaries', body: 'Outside food, market snacks or tamasic items may not be brought into or consumed within the temple premises.' }, { title: 'Prasadam Integrity', body: 'Residents must honor only pure sattvic Krishna-Prasadam prepared and offered by the temple kitchen.' }, { title: 'Cleanliness & Dress', body: 'Each morning, residents must bathe fully and wear clean, fresh dhoti-kurta/Vaishnava clothing before entering the temple hall. Punctuality is mandatory.' },
    ],
    advancedTitle: '4. Advanced Track: Brahmachari Ashram Training', advancedIntro: 'Youth in Track C who demonstrate dedicated intent toward an authentic monastic lifestyle may receive special access to the Brahmachari Ashram.', advanced: [
      { title: 'Senior Vaishnava Guidance', body: 'Personal guidance, regular counselling and spiritual association under experienced senior Vaishnavas.' }, { title: 'Specialized Curriculum', body: 'Deep scriptural study (including Bhakti-shastri and related certifications), backup-service management, temple administration and practical preaching/sankirtana training.' }, { title: 'Character Development', body: 'Cultivation of genuine humility, complete sense control, leadership integrity and surrender at the lotus feet of Sri Krishna.' },
    ],
    pathwayTitle: '5. Implementation & Screening Pathway', pathwayIntro: 'Submitting an interest form is not automatic admission. Permission to reside follows the screening and interview process.', pathway: [
      { n: '1', title: 'Application Intake', body: 'A standard form collects academic background, age, current livelihood and prior spiritual exposure.' }, { n: '2', title: 'Mandatory Interview', body: 'Before final intake, senior devotees assess the candidate’s character, personal stability and voluntary commitment to the four regulative principles, morning sadhana and electronic restrictions.' }, { n: '3', title: 'Ashram Oversight', body: 'A dedicated Ashram Leader/Mentor guides daily attendance, wake-up progression and chanting-round development.' },
    ],
    ctaTitle: 'Would you like to experience this lifestyle?', ctaBody: 'If you are serious about living in the temple and taking up disciplined living, sadhana, service and spiritual training, register your interest.', cta: 'I’m Interested — Apply',
    formTitle: 'Live Like a Monk — Interest Registration', formIntro: 'Fill in your details. We will contact you after receiving your registration.', close: 'Close', successTitle: 'Your interest has been registered', successBody: 'Thank you. We have received your information and will contact you regarding the next steps.', done: 'Done',
    name: 'Full Name', mobile: 'Mobile Number', age: 'Age', status: 'Current Status', native: 'Native Place Address', current: 'Current Living Address', note: 'Additional Information (optional)', submit: 'Submit Registration', required: 'Required', select: 'Select', student: 'Student', professional: 'Professional', business: 'Business', job: 'Searching for a Job', other: 'Other', consent: 'I understand that this is an expression of interest and final residence/admission depends on the screening and interview process.',
  },
};

const templeImage = 'https://www.iskconpune.com/wp-content/uploads/2026/06/1-1024x683.png';
const deityImage = 'https://www.iskconpune.com/wp-content/uploads/2023/02/radha-vrindavanchandra-1024x683.jpeg';
const lotusImage = 'https://www.iskconpune.com/wp-content/uploads/2026/06/icon-lotus.png';

export default function Home() {
  const [lang, setLang] = useState<Lang>('hi');
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const c = content[lang];

  const openForm = () => { setOpen(true); setSent(false); setError(''); };

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); setLoading(true); setError('');
    const form = new FormData(e.currentTarget);
    const data = Object.fromEntries(form.entries());
    data.language = lang;
    try {
      const res = await fetch('/api/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Unable to submit registration.');
      setSent(true);
    } catch (err) { setError(err instanceof Error ? err.message : 'Unable to submit registration.'); }
    finally { setLoading(false); }
  }

  return <main>
    <header className="nav">
      <a className="brand" href="#top" aria-label="Live Like a Monk">
        <span className="brand-mark"><img src={lotusImage} alt="" /></span>
        <span><strong>LIVE LIKE A MONK</strong><small>ISKCON NVCC PUNE</small></span>
      </a>
      <nav className="nav-links">
        <a href="#about">{c.nav.about}</a><a href="#tracks">{c.nav.tracks}</a><a href="#training">{c.nav.training}</a><a href="#norms">{c.nav.norms}</a>
      </nav>
      <div className="nav-actions"><button className={`lang ${lang === 'hi' ? 'active' : ''}`} onClick={() => setLang('hi')}>हिन्दी</button><button className={`lang ${lang === 'en' ? 'active' : ''}`} onClick={() => setLang('en')}>English</button><button className="nav-apply" onClick={openForm}>{c.nav.apply}</button></div>
    </header>

    <section className="hero" id="top">
      <img className="hero-image" src={templeImage} alt="ISKCON NVCC Pune temple" />
      <div className="hero-overlay" />
      <div className="hero-content">
        <div className="hero-kicker"><span />{c.heroKicker}<span /></div>
        <div className="hero-logo"><img src={lotusImage} alt="" /></div>
        <h1>{c.heroTitle}</h1>
        <p className="hero-sub">{c.heroSubtitle}</p>
        <p className="mantra">हरे कृष्ण हरे कृष्ण कृष्ण कृष्ण हरे हरे<br/>हरे राम हरे राम राम राम हरे हरे</p>
        <button className="primary hero-button" onClick={openForm}>{c.heroButton}<span>↗</span></button>
      </div>
      <div className="hero-bottom">Scroll to explore <span>↓</span></div>
    </section>

    <section className="section objective" id="about">
      <div className="section-kicker">LIVE WITH PURPOSE</div><h2>{c.objectiveTitle}</h2><p className="lead">{c.objective}</p>
      <div className="ornament">✦</div>
    </section>

    <section className="image-story"><div className="image-story-copy"><div className="section-kicker">ISKCON NVCC PUNE</div><h2>मंदिर जीवन को केवल देखिए नहीं — <em>अनुभव कीजिए</em></h2><p>NVCC Pune is a center for spiritual learning and devotion, with temple worship, devotional association and a structured environment for spiritual practice.</p></div><img src={deityImage} alt="Sri Sri Radha Vrindavanchandra at ISKCON NVCC Pune" /></section>

    <section className="section tinted" id="eligibility"><div className="section-heading"><div><div className="section-kicker">WHO CAN JOIN</div><h2>{c.eligibilityTitle}</h2></div><p className="lead">{c.eligibilityIntro}</p></div><div className="eligibility-grid">{c.eligibility.map((x,i)=><article className="info-card" key={x.title}><span className="card-index">0{i+1}</span><h3>{x.title}</h3><p>{x.body}</p></article>)}</div></section>

    <section className="section" id="tracks"><div className="section-kicker">THREE PATHS</div><h2>{c.tracksTitle}</h2><p className="lead">{c.tracksIntro}</p><div className="tracks">{c.tracks.map((x,i)=><article className={`track track-${i+1}`} key={x.code}><div className="track-top"><span>{x.code}</span><b>{x.tag}</b></div><div className="track-icon">{['◌','✦','ॐ'][i]}</div><h3>{x.title}</h3><p>{x.desc}</p><div className="finance"><strong>{lang === 'hi' ? 'व्यवस्था' : 'Living & financial structure'}</strong><span>{x.support}</span></div></article>)}</div></section>

    <section className="section tinted" id="training"><div className="section-kicker">STEP-BY-STEP</div><h2>{c.spiritualTitle}</h2><p className="lead">{c.spiritualIntro}</p><div className="timeline">{c.months.map((x,i)=><div className={`timeline-row ${i===4 ? 'final-row':''}`} key={x.label}><div className="timeline-month"><span>{x.label}</span><strong>{x.time}</strong></div><div className="timeline-body">{x.body}</div><div className="timeline-dot">{i+1}</div></div>)}</div><div className="accelerated"><h3>{c.acceleratedTitle}</h3>{c.accelerated.map(x=><p key={x}>• {x}</p>)}</div></section>

    <section className="section" id="norms"><div className="section-kicker">TEMPLE STANDARD</div><h2>{c.conductTitle}</h2><p className="lead">{c.conductIntro}</p><div className="principles">{c.principles.map(x=><article className="principle" key={x.title}><span className="principle-mark">✓</span><div><h3>{x.title}</h3><p>{x.body}</p></div></article>)}</div><h3 className="subheading">{c.disciplineTitle}</h3><div className="discipline-grid">{c.discipline.map(x=><article className="discipline" key={x.title}><h3>{x.title}</h3><p>{x.body}</p></article>)}</div></section>

    <section className="advanced-band"><div className="advanced-inner"><div className="section-kicker">TRACK C</div><h2>{c.advancedTitle}</h2><p className="advanced-intro">{c.advancedIntro}</p><div className="advanced-grid">{c.advanced.map((x,i)=><article className="advanced" key={x.title}><span>0{i+1}</span><h3>{x.title}</h3><p>{x.body}</p></article>)}</div></div></section>

    <section className="section pathway"><div className="section-kicker">HOW IT WORKS</div><h2>{c.pathwayTitle}</h2><p className="lead">{c.pathwayIntro}</p><div className="steps">{c.pathway.map(x=><article className="step" key={x.n}><div className="step-number">{x.n}</div><div><h3>{x.title}</h3><p>{x.body}</p></div></article>)}</div></section>

    <section className="final-cta"><div><div className="section-kicker">BEGIN YOUR JOURNEY</div><h2>{c.ctaTitle}</h2><p>{c.ctaBody}</p></div><button className="primary light" onClick={openForm}>{c.cta}<span>↗</span></button></section>

    <footer><span>LIVE LIKE A MONK • ISKCON NVCC PUNE</span><span>Residential Gurukul Training</span></footer>

    {open && <div className="modal-backdrop" role="dialog" aria-modal="true"><div className="modal"><button className="close" onClick={()=>setOpen(false)} aria-label={c.close}>×</button>{sent ? <div className="success"><div className="success-icon">✓</div><h2>{c.successTitle}</h2><p>{c.successBody}</p><button className="primary" onClick={()=>setOpen(false)}>{c.done}</button></div> : <><div className="section-kicker">INTEREST REGISTRATION</div><h2>{c.formTitle}</h2><p className="modal-intro">{c.formIntro}</p><form onSubmit={submit}><div className="form-grid"><label>{c.name}<input name="name" required /></label><label>{c.mobile}<input name="mobile" type="tel" required /></label><label>{c.age}<input name="age" type="number" min="1" max="99" required /></label><label>{c.status}<select name="status" required defaultValue=""><option value="" disabled>{c.select}</option><option value={c.student}>{c.student}</option><option value={c.professional}>{c.professional}</option><option value={c.business}>{c.business}</option><option value={c.job}>{c.job}</option><option value={c.other}>{c.other}</option></select></label><label className="full">{c.native}<textarea name="nativeAddress" required /></label><label className="full">{c.current}<textarea name="currentAddress" required /></label><label className="full">{c.note}<textarea name="note" /></label><label className="consent full"><input type="checkbox" name="consent" value="yes" required /> <span>{c.consent}</span></label></div>{error && <p className="form-error">{error}</p>}<button className="primary form-submit" disabled={loading} type="submit">{loading ? (lang === 'hi' ? 'भेजा जा रहा है…' : 'Submitting…') : c.submit}<span>→</span></button></form></>}</div></div>}
  </main>;
}

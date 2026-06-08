/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { FamilyMember, FamilyInfo, GalleryItem } from './types';

export const DEFAULT_FAMILY_MEMBERS: FamilyMember[] = [
  // Generation 1
  {
    id: 'm1',
    name: 'الشيخ عبد الرحمن بن خالد الغانم',
    gender: 'male',
    birthDate: '1920',
    deathDate: '1998',
    isAlive: false,
    bio: 'مؤسس العائلة والعميد الأول لها، كان رجلاً صالحاً ومصلحاً اجتماعياً معروفاً بحكمته وكرمه ومساهماته في تنمية المجتمع المحلي.',
    profession: 'تاجر ورائد أعمال مجتمعي',
    residence: 'الرياض، المملكة العربية السعودية',
    photo: '',
    generation: 1
  },
  {
    id: 'm2',
    name: 'الشيخة فاطمة بنت عبد الله العبد اللطيف',
    gender: 'female',
    birthDate: '1928',
    deathDate: '2015',
    isAlive: false,
    spouseId: 'm1',
    bio: 'الزوجة ورفيقة الدرب، كانت رمزاً للعطاء والتربية الصالحة والأثر الطيب في مجالس العائلة والعمل الخيري.',
    profession: 'ربة منزل وفاعلة خير',
    residence: 'الرياض، المملكة العربية السعودية',
    photo: '',
    generation: 1
  },

  // Generation 2 - Children of m1 & m2
  {
    id: 'm3',
    name: 'المستشار محمد بن عبد الرحمن الغانم',
    gender: 'male',
    fatherId: 'm1',
    motherId: 'm2',
    birthDate: '1950',
    isAlive: true,
    bio: 'عميد العائلة الحالي، قانوني سابق تخرج من جامعة الملك سعود وعمل في السلك القضائي لعقود، ويسعى لتوثيق أواصر العائلة.',
    profession: 'مستشار قانوني متقاعد',
    residence: 'الرياض، المملكة العربية السعودية',
    photo: '',
    generation: 2
  },
  {
    id: 'm4',
    name: 'أ. د. خالد بن عبد الرحمن الغانم',
    gender: 'male',
    fatherId: 'm1',
    motherId: 'm2',
    birthDate: '1955',
    isAlive: true,
    bio: 'أستاذ الهندسة المدنية الحاصل على جوائز أكاديمية دولية وله العديد من البحوث العلمية في تطوير البنية التحتية.',
    profession: 'أستاذ جامعي وباحث',
    residence: 'جدة، المملكة العربية السعودية',
    photo: '',
    generation: 2
  },
  {
    id: 'm5',
    name: 'الأستاذة عائشة بنت عبد الرحمن الغانم',
    gender: 'female',
    fatherId: 'm1',
    motherId: 'm2',
    birthDate: '1959',
    isAlive: true,
    bio: 'إحدى رائدات التعليم النسائي المبكر، ساهمت في تأسيس عدة مدارس وإدارة العمل النسوي التطوعي.',
    profession: 'تربوية ومستشارة أسرية',
    residence: 'الخبر، المملكة العربية السعودية',
    photo: '',
    generation: 2
  },

  // Spouses of Generation 2
  {
    id: 'm3_s',
    name: 'أ. مريم بنت صالح الحميد',
    gender: 'female',
    birthDate: '1958',
    isAlive: true,
    spouseId: 'm3',
    bio: 'زوجة المستشار محمد الغانم، ساهمت بشكل ريادي في إدارة لجان شؤون فتيات العائلة وأعمال البر.',
    profession: 'ناشطة اجتماعية وتربوية',
    residence: 'الرياض، المملكة العربية السعودية',
    photo: '',
    generation: 2
  },
  {
    id: 'm4_s',
    name: 'د. سارة بنت محمد العلي',
    gender: 'female',
    birthDate: '1962',
    isAlive: true,
    spouseId: 'm4',
    bio: 'زوجة الدكتور خالد الغانم، استشارية طب الأطفال ورئيسة قسم الأبحاث الطبية سابقاً بالمستشفى الجامعي.',
    profession: 'طبيبة استشارية أطفال',
    residence: 'جدة، المملكة العربية السعودية',
    photo: '',
    generation: 2
  },

  // Generation 3 - Children of m3 & m3_s
  {
    id: 'm6',
    name: 'المهندس أحمد بن محمد الغانم',
    gender: 'male',
    fatherId: 'm3',
    motherId: 'm3_s',
    birthDate: '1978',
    isAlive: true,
    bio: 'مهندس برمجيات وقيادي تقني، يشرف على المبادرات الرقمية للعائلة والمطور الفخري لمنصتها الإلكترونية.',
    profession: 'مدير قطاع تقنية المعلومات',
    residence: 'الرياض، المملكة العربية السعودية',
    photo: '',
    generation: 3
  },
  {
    id: 'm7',
    name: 'الأستاذ يوسف بن محمد الغانم',
    gender: 'male',
    fatherId: 'm3',
    motherId: 'm3_s',
    birthDate: '1982',
    isAlive: true,
    bio: 'رائد أعمال ومهتم بالاستثمارات البيئية والزراعية المستدامة، ويدير مشاريع العائلة التجارية الأساسية.',
    profession: 'رئيس تنفيذي لشركة استثمارية',
    residence: 'الرياض، المملكة العربية السعودية',
    photo: '',
    generation: 3
  },
  {
    id: 'm8',
    name: 'المهندسة هدى بنت محمد الغانم',
    gender: 'female',
    fatherId: 'm3',
    motherId: 'm3_s',
    birthDate: '1986',
    isAlive: true,
    bio: 'مهندسة معمارية متخصصة في التصاميم التراثية المستوحاة من العمارة النجدية التقليدية.',
    profession: 'مهندسة معمارية مستقلة',
    residence: 'الرياض، المملكة العربية السعودية',
    photo: '',
    generation: 3
  },

  // Spouses of Generation 3
  {
    id: 'm6_s',
    name: 'أ. نورة بنت سالم الفواز',
    gender: 'female',
    birthDate: '1982',
    isAlive: true,
    spouseId: 'm6',
    bio: 'زوجة المهندس أحمد، أخصائية علم نفس سلوكي تعمل على تقديم الدعم والإرشاد النفسي والتطويري للأطفال.',
    profession: 'أخصائية نفسية سلوكية',
    residence: 'الرياض، المملكة العربية السعودية',
    photo: '',
    generation: 3
  },
  {
    id: 'm7_s',
    name: 'أ. ليلى بنت عبد العزيز الفارس',
    gender: 'female',
    birthDate: '1985',
    isAlive: true,
    spouseId: 'm7',
    bio: 'زوجة الأستاذ يوسف، مصممة جرافيك ومهتمة بالآداب والفنون ومترجمة للأدب العالمي الموجه لليافعين.',
    profession: 'مصممة هويات بصرية ومترجمة',
    residence: 'الرياض، المملكة العربية السعودية',
    photo: '',
    generation: 3
  },

  // Generation 3 - Children of m4 & m4_s
  {
    id: 'm9',
    name: 'الدكتور فيصل بن خالد الغانم',
    gender: 'male',
    fatherId: 'm4',
    motherId: 'm4_s',
    birthDate: '1988',
    isAlive: true,
    bio: 'طبيب جراح متخصص في جراحات القلب الدقيقة، وباحث متعاون مع مراكز علمية مرموقة في أوروبا وأمريكا.',
    profession: 'جراح قلب وباحث طبي',
    residence: 'جدة، المملكة العربية السعودية',
    photo: '',
    generation: 3
  },
  {
    id: 'm10',
    name: 'الأستاذة سحر بنت خالد الغانم',
    gender: 'female',
    fatherId: 'm4',
    motherId: 'm4_s',
    birthDate: '1992',
    isAlive: true,
    bio: 'خبيرة موارد بشرية ومستشارة في تمكين الكفاءات الشابة، حائزة على ماجستير إدارة الأعمال من لندن.',
    profession: 'مديرة الموارد البشرية',
    residence: 'الرياض، المملكة العربية السعودية',
    photo: '',
    generation: 3
  },

  // Spouse of Generation 3 (فيصل)
  {
    id: 'm9_s',
    name: 'أ. ريم بنت أحمد الشمري',
    gender: 'female',
    birthDate: '1991',
    isAlive: true,
    spouseId: 'm9',
    bio: 'زوجة د. فيصل الغانم، باحثة في علم الأحياء الدقيقة بكلية العلوم ومحاضرة أكاديمية.',
    profession: 'محاضرة جامعية وباحثة',
    residence: 'جدة، المملكة العربية السعودية',
    photo: '',
    generation: 3
  },

  // Generation 4 - Children of m6 & m6_s
  {
    id: 'm11',
    name: 'ش. عبد الرحمن بن أحمد الغانم',
    gender: 'male',
    fatherId: 'm6',
    motherId: 'm6_s',
    birthDate: '2005',
    isAlive: true,
    bio: 'طالب في كلية هندسة الحاسب الآلي بجامعة الملك فهد للبترول والمعادن، وحاصل على جوائز محلية في الذكاء الاصطناعي.',
    profession: 'طالب جامعي شغوف بالتقنية',
    residence: 'الظهران، المملكة العربية السعودية',
    photo: '',
    generation: 4
  },
  {
    id: 'm12',
    name: 'الآنسة فاطمة بنت أحمد الغانم',
    gender: 'female',
    fatherId: 'm6',
    motherId: 'm6_s',
    birthDate: '2009',
    isAlive: true,
    bio: 'طالبة متفوقة في المرحلة الثانوية، تهوى القراءة والخط العربي والإنتاج الصوتي والبودكاست.',
    profession: 'طالبة ثانوية صناعة محتوى',
    residence: 'الرياض، المملكة العربية السعودية',
    photo: '',
    generation: 4
  },

  // Generation 4 - Children of m7 & m7_s
  {
    id: 'm13',
    name: 'الابن خالد بن يوسف الغانم',
    gender: 'male',
    fatherId: 'm7',
    motherId: 'm7_s',
    birthDate: '2012',
    isAlive: true,
    bio: 'طالب متميز في المرحلة المتوسطة، له اهتمام كبير برياضة الفروسية وتصميم الألعاب الإلكترونية البسيطة.',
    profession: 'طالب بطل في مسابقات الروبوت',
    residence: 'الرياض، المملكة العربية السعودية',
    photo: '',
    generation: 4
  },
  {
    id: 'm14',
    name: 'الابنة سارة بنت يوسف الغانم',
    gender: 'female',
    fatherId: 'm7',
    motherId: 'm7_s',
    birthDate: '2015',
    isAlive: true,
    bio: 'طالبة مبدعة في الصفوف الابتدائية، تحب الفنون والرسم بالألوان المائية وسرد القصص الخيالية للأطفال.',
    profession: 'طالبة موهوبة بالرسم',
    residence: 'الرياض، المملكة العربية السعودية',
    photo: '',
    generation: 4
  },

  // Generation 4 - Children of m9 & m9_s
  {
    id: 'm15',
    name: 'الابن علي بن فيصل الغانم',
    gender: 'male',
    fatherId: 'm9',
    motherId: 'm9_s',
    birthDate: '2016',
    isAlive: true,
    bio: 'شبل واعد يتميز بالذكاء الرياضي والحسابي، يمارس السباحة ويحرص على مرافقة جده في مجالس العائلة.',
    profession: 'طالب في المدرسة الابتدائية',
    residence: 'جدة، المملكة العربية السعودية',
    photo: '',
    generation: 4
  },
  {
    id: 'm16',
    name: 'الابنة مريم بنت فيصل الغانم',
    gender: 'female',
    fatherId: 'm9',
    motherId: 'm9_s',
    birthDate: '2019',
    isAlive: true,
    bio: 'أصغر حفيدات العائلة في هذا الفرع، متميزة بذكائها الاجتماعي وحبها للتعلم ومشاركة اللعب بمرح.',
    profession: 'طفلة في الروضة',
    residence: 'جدة، المملكة العربية السعودية',
    photo: '',
    generation: 4
  }
];

export const DEFAULT_FAMILY_INFO: FamilyInfo = {
  familyName: 'عائلة فرج الله',
  aboutText: 'عائلة آل غانم هي إحدى العائلات العريقة الممتدة الجذور، والتي تميز رجالاتها ونساؤها بالعلم والتجارة ومكارم الأخلاق وخدمة الوطن ورفع رايته في محافل شتى على مدار أجيال متعددة متلاحقة.',
  historyText: 'يعود تاريخ العائلة العريق إلى مئات السنين حيث سكنت نجد الفسيحة، واشتُهرت بالحكمة والوقوف بجانب الحق، والمساهمة الفاعلة في تأسيس النهضة الثقافية والصناعية والتجارية للمملكة والخليج العربي. وقد توارثت الأجيال جيلاً بعد جيل قيم الترابط والعمل المخلص، ونقلت للأبناء حكمة الأجداد الراسخة وأخلاقهم الرفيعة التي تجلت في العطاء المستدام وجمع الشمل والتمسك بالروابط الأسرية الوثيقة.',
  contactEmail: 'contact@alghanimfamily.org',
  contactPhone: '+966 11 456 7890',
  contactAddress: 'حي الملقا، طريق الملك فهد، الرياض، المملكة العربية السعودية'
};

export const DEFAULT_GALLERY: GalleryItem[] = [
  {
    id: 'g1',
    url: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=800',
    title: 'الملتقى العائلي السنوي الأول',
    description: 'صورة جماعية لرجالات العائلة في اللقاء السنوي الكبير بالرياض.'
  },
  {
    id: 'g2',
    url: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=800',
    title: 'تكريم حفظة كتاب الله من أبناء العائلة',
    description: 'حفل تسليم الجوائز لأبناء وبنات العائلة المتميزين دراسياً ودينياً.'
  },
  {
    id: 'g3',
    url: 'https://images.unsplash.com/photo-1464618663641-bbdd760ae84a?auto=format&fit=crop&q=80&w=800',
    title: 'مجلس ديوانية وعمادة آل غانم',
    description: 'الديوانية الأسبوعية حيث تلتقي الأجيال للاستماع لتوجيهات كبار السن وحل شؤون الأسر.'
  },
  {
    id: 'g4',
    url: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&q=80&w=800',
    title: 'رحلة الربيع السنوية البرية',
    description: 'لقاء عائلي دافئ ترفيهي لتقريب الفئات العمرية الناشئة في طبيعة ربيعية ساحرة.'
  },
  {
    id: 'g5',
    url: 'https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?auto=format&fit=crop&q=80&w=800',
    title: 'تكريم عميد العائلة المتقاعد',
    description: 'لحظة تسليم درع التميز والمحبة للمستشار محمد الغانم بمناسبة تقاعده.'
  },
  {
    id: 'g6',
    url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=800',
    title: 'مبادرات التشجير العائلية الرقمية',
    description: 'الجيل الرابع من البنين والبنات يسهمون في زراعة حديقة العائلة الكبرى كنشاط مستدام.'
  }
];

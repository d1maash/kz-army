export type ApplicationCardType = {
    title: string;
    duration: string;
    benefits: string[];
    imageSrc: string;
    link: string;
    type: 'conscription' | 'communication';
  };
  
  export const applicationData: ApplicationCardType[] = [
    {
      title: "Срочная служба",
      duration: "12 месяцев",
      benefits: [
        "Короткий срок – служба длится всего 12 месяцев.",
        "Возможность выполнить гражданский долг.",
        "Физическая подготовка – улучшение силы, выносливости и дисциплины.",
        "После службы можно получить образовательные и социальные преимущества.",
      ],
      imageSrc: "/conscription-card.png",
      link: '/application/conscription',
      type: 'conscription',
    },
    {
      title: "Контрактная служба",
      duration: "От 3 лет (контрактная основа)",
      benefits: [
        "Ежемесячное денежное довольствие + надбавки.",
        "Возможность повышения и профессионального обучения.",
        "Предоставление жилья, медицинской страховки и других льгот.",
        "Освоение военной профессии и получение полезных навыков.",
      ],
      imageSrc: "/communication-card.png",
      link: '/application/communication',
      type: 'communication',
    },
  ];
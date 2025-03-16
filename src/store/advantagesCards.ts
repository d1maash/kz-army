export type AdvantageCardType = {
    title: string;
    description: string;
    image: string;
}

export const communicationAdvantageCards: AdvantageCardType[] = [
    {
        title: 'Стабильная заработная плата и льготы',
        description: 'Гарантированное денежное довольствие, надбавки за выслугу, особые условия и квалификацию.',
        image: '/services/service-1.png',
    },
    {
        title: 'Социальные гарантии и поддержка государства',
        description: 'Бесплатное медицинское обслуживание, страхование жизни, выплаты при травмах и выходе на пенсию.',
        image: '/services/service-2.png',
    },
    {
        title: 'Обучение и карьера',
        description: 'Возможность получить военную специальность, повысить квалификацию или пройти бесплатное обучение.',
        image: '/services/service-3.png',
    },
    {
        title: 'Жилищные программы',
        description: 'Льготная ипотека, служебное жильё и поддержка в приобретении собственной недвижимости.',
        image: '/services/service-4.png',
    },
]

export const conscriptionAdvantagesCards: AdvantageCardType[] = [
    {
        title: 'Короткий срок',
        description: 'Служба длится всего 12 месяцев, после чего можно вернуться к учебе или работе.',
        image: '/advantages/advantage-1.png'
    },
    {
        title: 'Объязательный опыт',
        description: 'Возможность выполнить гражданский долг, получив военную подготовку и дисциплину, полезные в жизни.',
        image: '/advantages/advantage-2.png'
    },
    {
        title: 'Физическая подготовка',
        description: 'Регулярные тренировки улучшают силу, выносливость, координацию и формируют здоровый образ жизни.',
        image: '/advantages/advantage-3.png'
    },
    {
        title: 'Льготы и бонусы',
        description: 'После службы доступны образовательные, карьерные и социальные преимущества, включая поступление в ВУЗ.',
        image: '/advantages/advantage-4.png'
    },
]
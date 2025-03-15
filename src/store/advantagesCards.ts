export type AdvantageCardType = {
    title: string;
    description: string;
    image: string;
}

export const advantagesCards: AdvantageCardType[] = [
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
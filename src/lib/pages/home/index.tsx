'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const CARD_COUNT_PER_ROW = 3;
const TOTAL_ROWS = 3;

type CardType = 'short' | 'long';

interface CardData {
    id: number;
    title: string;
    navigation: string;
}

const generateFakeData = (): CardData[] => {
    return Array.from({ length: TOTAL_ROWS * CARD_COUNT_PER_ROW }, (_, i) => ({
        id: i + 1,
        title: `Card ${i + 1}`,
        navigation: `image`,
    }));
};

const getCardStyle = (
    type: CardType,
    backgroundColor: string
): React.CSSProperties => ({
    width: type === 'long' ? '60%' : '30%',
    height: '150px',
    backgroundColor,
    borderRadius: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    color: 'white',
    cursor: 'pointer',
    textAlign: 'center',
});

const Card: React.FC<{ type: CardType; data: CardData }> = ({ type, data }) => {
    const [backgroundColor, setBackgroundColor] = useState<string>('');
    const router = useRouter();

    useEffect(() => {
        const color = `hsl(${Math.floor(Math.random() * 360)}, 70%, 80%)`;
        setBackgroundColor(color);
    }, []);

    if (!backgroundColor) return null;

    return (
        <div
            style={getCardStyle(type, backgroundColor)}
            onClick={() => router.push(`/${data.navigation}`)}
        >
            {data.title}
        </div>
    );
};

// Randomize array using Fisher-Yates Shuffle
const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
};

const generateRowCardTypes = (): CardType[] => {
    const cardTypes: CardType[] = ['short', 'short', 'long'];
    return shuffleArray(cardTypes);
};

const Row: React.FC<{ data: CardData[] }> = ({ data }) => {
    const cardTypes = generateRowCardTypes();

    return (
        <div className="mb-4 flex w-[80%] justify-start gap-4">
            {cardTypes.map((type, index) => (
                <Card key={data[index]?.id} type={type} data={data[index]} />
            ))}
        </div>
    );
};

export const Home: React.FC = () => {
    const fakeData = generateFakeData();

    return (
        <div className="space-y-4 p-4">
            {[...Array(TOTAL_ROWS)].map((_, rowIndex) => {
                const rowData = fakeData.slice(
                    rowIndex * CARD_COUNT_PER_ROW,
                    (rowIndex + 1) * CARD_COUNT_PER_ROW
                );
                return <Row key={rowIndex} data={rowData} />;
            })}
        </div>
    );
};

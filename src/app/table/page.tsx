'use client';

import { useState } from 'react';
import { tours } from '@/data/mock-data';

export default function TourTable() {
    const [roomType, setRoomType] = useState<'2m' | '3m'>('2m');
    const [selectedPeriod, setSelectedPeriod] = useState<string>('');

    const filteredTours = tours.filter((tour) =>
        selectedPeriod ? tour.period.includes(selectedPeriod) : true
    );

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold mb-4">График заездов в Геленджик</h2>

            <div className="flex gap-4 mb-6">
                <select
                    value={selectedPeriod}
                    onChange={(e) => setSelectedPeriod(e.target.value)}
                    className="border p-2 rounded"
                >
                    <option value="">Все даты</option>
                    {Array.from(new Set(tours.map((t) => t.period))).map((period) => (
                        <option key={period} value={period}>
                            {period}
                        </option>
                    ))}
                </select>

                <select
                    value={roomType}
                    onChange={(e) => setRoomType(e.target.value as '2m' | '3m')}
                    className="border p-2 rounded"
                >
                    <option value="2m">2-х местный</option>
                    <option value="3m">3-х местный</option>
                </select>
            </div>

            <table className="w-full border-collapse border border-gray-300">
                <thead>
                <tr className="bg-gray-100">
                    <th className="border p-2">Период</th>
                    <th className="border p-2">Елена</th>
                    <th className="border p-2">Итальянский дворик</th>
                    <th className="border p-2">Ирина</th>
                    {/* Добавь другие */}
                </tr>
                </thead>
                <tbody>
                {filteredTours.map((tour) => (
                    <tr key={tour.id} className="hover:bg-gray-200">
                        <td className="border p-2">{tour.period}</td>
                        <td className="border p-2">{tour.elena[roomType]} ₽</td>
                        <td className="border p-2">{tour.italian[roomType]} ₽</td>
                        <td className="border p-2">{tour.irina[roomType]} ₽</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

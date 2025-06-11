import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Table, TableHead, TableHeader, TableRow, TableCell, TableBody } from '@/components/ui/table';

const tourData = [
    {
        id: 1,
        period: '08.06–19.06',
        place: 'Елена',
        category: 'эконом',
        people: 2,
        price: 27500,
    },
    {
        id: 2,
        period: '08.06–19.06',
        place: 'Центральный',
        category: '1-я категория',
        people: 3,
        price: 45500,
    },
    {
        id: 3,
        period: '17.06–28.06',
        place: 'Уют',
        category: 'эконом',
        people: 3,
        price: 30900,
    },
    // Add more entries as needed
];

export default function TourCalculator() {
    const [selectedPlace, setSelectedPlace] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [peopleCount, setPeopleCount] = useState('');

    const filteredData = tourData.filter((item) => {
        const matchPlace = selectedPlace ? item.place === selectedPlace : true;
        const matchMin = minPrice ? item.price >= parseInt(minPrice) : true;
        const matchMax = maxPrice ? item.price <= parseInt(maxPrice) : true;
        const matchPeople = peopleCount ? item.people === parseInt(peopleCount) : true;
        return matchPlace && matchMin && matchMax && matchPeople;
    });

    const uniquePlaces = [...new Set(tourData.map((t) => t.place))];
    const uniquePeopleCounts = [...new Set(tourData.map((t) => t.people))];

    return (
        <div className="p-6 space-y-6">
            <div className="flex flex-wrap gap-4">
                <Select onValueChange={setSelectedPlace}>
                    <SelectTrigger className="w-48">
                        <SelectValue placeholder="Выберите место" />
                    </SelectTrigger>
                    <SelectContent>
                        {uniquePlaces.map((place) => (
                            <SelectItem key={place} value={place}>
                                {place}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Input
                    type="number"
                    placeholder="Мин. цена"
                    className="w-36"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                />
                <Input
                    type="number"
                    placeholder="Макс. цена"
                    className="w-36"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                />

                <Select onValueChange={setPeopleCount}>
                    <SelectTrigger className="w-36">
                        <SelectValue placeholder="Кол-во человек" />
                    </SelectTrigger>
                    <SelectContent>
                        {uniquePeopleCounts.map((count) => (
                            <SelectItem key={count} value={count.toString()}>
                                {count}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Период</TableHead>
                        <TableHead>Место</TableHead>
                        <TableHead>Категория</TableHead>
                        <TableHead>Кол-во человек</TableHead>
                        <TableHead>Цена (₽)</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredData.map((tour) => (
                        <TableRow key={tour.id}>
                            <TableCell>{tour.period}</TableCell>
                            <TableCell>{tour.place}</TableCell>
                            <TableCell>{tour.category}</TableCell>
                            <TableCell>{tour.people}</TableCell>
                            <TableCell>{tour.price.toLocaleString()}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

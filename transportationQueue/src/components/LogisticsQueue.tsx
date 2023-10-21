// src/components/LogisticsQueue/LogisticsQueue.tsx
import { useEffect, useState } from 'react';

interface Customer {
    customerID: string;
    name: string;
    pickupLocation: string;
    dropoffLocation: string;
    // Add any other fields you want to display
}

const LogisticsQueue = () => {
    const [customers, setCustomers] = useState<Customer[]>([])

    // Function to fetch data from the backend
    const fetchLogisticsQueue = async () => {
        try {
            const response = await fetch('/api/customers/logistics-queue'); // Replace with your API endpoint
            if (response.ok) {
                const data = await response.json();
                setCustomers(data);
            }
        } catch (error) {
            console.error('Error fetching logistics queue:', error);
        }
    };

    useEffect(() => {
        fetchLogisticsQueue(); // Fetch logistics queue data when the component mounts
    }, []);

    return (
        <div className="logistics-queue">
            <h2>Logistics Queue</h2>
            <table className="table-auto w-full">
                <thead>
                    <tr>
                        <th className="px-4 py-2">Customer ID</th>
                        <th className="px-4 py-2">Customer Name</th>
                        <th className="px-4 py-2">Pick Up Location</th>
                        <th className="px-4 py-2">Drop Off Location</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map((customer) => (
                        <tr key={customer.customerID}>
                            <td className="border px-4 py-2">{customer.customerID}</td>
                            <td className="border px-4 py-2">{customer.name}</td>
                            <td className="border px-4 py-2">{customer.pickupLocation}</td>
                            <td className="border px-4 py-2">{customer.dropoffLocation}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default LogisticsQueue;

// src/components/Planner/Planner.tsx
import { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

interface Customer {
    id: string; 
    name: string; 
    pickupLocation: string; 
    dropOffLocation: string; 
}

const plannerData = [
    { id: 'slot1', title: 'Slot 1', customers: [] as Customer[] },
    { id: 'slot2', title: 'Slot 2', customers: [] as Customer[] },
    { id: 'slot3', title: 'Slot 3', customers: [] as Customer[] },
    { id: 'slot4', title: 'Slot 4', customers: [] as Customer[] },
];

const Planner = () => {
    const [slots, setSlots] = useState(plannerData);

    const onDragEnd = (result) => {
        if (!result.destination) return;

        const sourceSlotIndex = parseInt(result.source.droppableId.replace('slot', ''), 10);
        const destinationSlotIndex = parseInt(result.destination.droppableId.replace('slot', ''), 10);

        const copiedSlots = [...slots];
        const [movedCustomer] = copiedSlots[sourceSlotIndex].customers.splice(result.source.index, 1);
        copiedSlots[destinationSlotIndex].customers.splice(result.destination.index, 0, movedCustomer);

        setSlots(copiedSlots);
    };

    return (
        <div className="planner">
            <h2>Transportation Planner</h2>
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="flex space-x-4">
                    {slots.map((slot) => (
                        <Droppable key={slot.id} droppableId={slot.id}>
                            {(provided) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    className="border p-4 w-1/4"
                                >
                                    <h3>{slot.title}</h3>
                                    {slot.customers.map((customer, customerIndex) => (
                                        <Draggable
                                            key={customer.id}
                                            draggableId={customer.id}
                                            index={customerIndex}
                                        >
                                            {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    className="bg-gray-200 p-2 mb-2"
                                                >
                                                    {customer.name} 
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    ))}
                </div>
            </DragDropContext>
        </div>
    );
};

export default Planner;

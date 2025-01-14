import React, { useState } from "react";
import { OrderList } from "../components/OrderList";
import { TimeSlotSelector } from "../components/TimeSlotSelector";
import { Order } from "../types";
import { Calendar, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const mockOrders: Order[] = [
  {
    _id: "1",
    trackingId: "IP123456789",
    senderId: "sender1",
    receiverDetails: {
      name: "Suhas",
      address: "123 Main St, Mumbai",
      phone: "+91 9876543210",
      email: "john@example.com",
    },
    deliveryDate: "2024-03-20",
    selectedTimeSlot: null,
    status: "pending",
    createdAt: "2024-03-18",
  },
  {
    _id: "2",
    trackingId: "IP987654321",
    senderId: "sender2",
    receiverDetails: {
      name: "Jane Smith",
      address: "456 Elm St, Delhi",
      phone: "+91 9123456789",
      email: "jane@example.com",
    },
    deliveryDate: "2024-03-21",
    selectedTimeSlot: null,
    status: "pending",
    createdAt: "2024-03-19",
  },
  {
    _id: "3",
    trackingId: "IP112233445",
    senderId: "sender3",
    receiverDetails: {
      name: "Alice Johnson",
      address: "789 Oak St, Bangalore",
      phone: "+91 9988776655",
      email: "alice@example.com",
    },
    deliveryDate: "2024-03-22",
    selectedTimeSlot: null,
    status: "pending",
    createdAt: "2024-03-20",
  },
  {
    _id: "4",
    trackingId: "IP556677889",
    senderId: "sender4",
    receiverDetails: {
      name: "Bob Brown",
      address: "101 Pine St, Chennai",
      phone: "+91 9876543211",
      email: "bob@example.com",
    },
    deliveryDate: "2024-03-23",
    selectedTimeSlot: null,
    status: "pending",
    createdAt: "2024-03-21",
  },
  {
    _id: "5",
    trackingId: "IP998877665",
    senderId: "sender5",
    receiverDetails: {
      name: "Charlie Davis",
      address: "202 Maple St, Hyderabad",
      phone: "+91 9123456788",
      email: "charlie@example.com",
    },
    deliveryDate: "2024-03-24",
    selectedTimeSlot: null,
    status: "pending",
    createdAt: "2024-03-22",
  },
  {
    _id: "6",
    trackingId: "IP334455667",
    senderId: "sender6",
    receiverDetails: {
      name: "Diana Evans",
      address: "303 Birch St, Pune",
      phone: "+91 9988776644",
      email: "anjali@example.com",
    },
    deliveryDate: "2024-03-25",
    selectedTimeSlot: null,
    status: "pending",
    createdAt: "2024-03-23",
  },
  {
    _id: "7",
    trackingId: "IP776655443",
    senderId: "sender7",
    receiverDetails: {
      name: "Sanjay Banerjee",
      address: "15/4, Ballygunge Place, Near South City Mall, Kolkata - 700019",
      phone: "+91 9876543212",
      email: "sanjay@example.com",
    },
    deliveryDate: "2024-03-26",
    selectedTimeSlot: null,
    status: "pending",
    createdAt: "2024-03-24",
  },
  {
    _id: "8",
    trackingId: "IP223344556",
    senderId: "sender8",
    receiverDetails: {
      name: "Kavita Mehta",
      address: "203, Rajvilas Palace",
      phone: "+91 9123456787",
      email: "kavita@example.com",
    },
    deliveryDate: "2024-03-27",
    selectedTimeSlot: null,
    status: "pending",
    createdAt: "2024-03-25",
  },
];

const initialTimeSlots = [
  { time: "10:00 - 11:00", available: 10 },
  { time: "11:00 - 12:00", available: 10 },
  { time: "12:00 - 13:00", available: 10 },
  { time: "14:00 - 15:00", available: 9 },
  { time: "15:00 - 16:00", available: 10 },
  { time: "16:00 - 17:00", available: 10 },
];

export const Dashboard: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [timeSlots, setTimeSlots] = useState(initialTimeSlots);
  const [showChangedOrders, setShowChangedOrders] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  const handleSelectTimeSlot = (slot: string) => {
    if (selectedOrder) {
      const updatedOrders = orders.map((order) =>
        order._id === selectedOrder._id
          ? { ...order, selectedTimeSlot: slot, status: "scheduled" }
          : order
      );
      setOrders(updatedOrders);

      const updatedTimeSlots = timeSlots.map((timeSlot) =>
        timeSlot.time === slot
          ? { ...timeSlot, available: timeSlot.available - 1 }
          : timeSlot
      );
      setTimeSlots(updatedTimeSlots);

      toast.success("Delivery time slot scheduled successfully!");
      setSelectedOrder(null);
    }
  };

  const handleShowChangedOrders = () => {
    setShowChangedOrders(true);
  };

  const handleShowYourOrders = () => {
    setShowChangedOrders(false);
  };

  const filteredOrders = showChangedOrders
    ? orders.filter(
        (order) =>
          order.status === "scheduled" && order.selectedTimeSlot !== null
      )
    : orders;

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-gradient-to-r from-[#E52D27] to-[#FF6B35] shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Calendar className="text-white" size={24} />
              <h1 className="ml-2 text-xl font-semibold text-white">
                India Post Delivery System
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleLogout}
                className="flex items-center text-white hover:text-gray-200 transition-colors"
              >
                <LogOut size={20} className="mr-1" />
                Logout
              </button>
              <img
                src="./india post logo.png"
                alt="India Post Logo"
                className="h-12 w-auto object-contain"
              />
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="dashboard-buttons flex space-x-4 bg-blue-100 p-4 rounded-md mb-6">
            <button
              onClick={handleShowYourOrders}
              className="bg-white text-blue-600 px-4 py-2 rounded shadow hover:bg-blue-50 transition"
            >
              Your Orders
            </button>
            <button
              onClick={handleShowChangedOrders}
              className="bg-white text-blue-600 px-4 py-2 rounded shadow hover:bg-blue-50 transition"
            >
              Scheduled Orders
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-lg font-semibold mb-4">
                {showChangedOrders ? "Scheduled Orders" : "Your Orders"}
              </h2>
              <OrderList
                orders={filteredOrders}
                onSelectOrder={setSelectedOrder}
              />
            </div>
            {selectedOrder && (
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold mb-4">
                  Schedule Delivery for Order #{selectedOrder.trackingId}
                </h2>
                <TimeSlotSelector
                  slots={timeSlots}
                  selectedSlot={selectedOrder.selectedTimeSlot}
                  onSelectSlot={handleSelectTimeSlot}
                />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
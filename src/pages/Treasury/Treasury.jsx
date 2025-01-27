import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './Dialog';
import { Plus, Minus, Info, ExternalLink } from './Icons';

const Treasury = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const currentMonthData = {
    balance: 45000,
    income: [
      { id: 1, source: 'Workshop Fees', amount: 15000, medium: 'UPI', date: '2025-01-25', description: 'Advanced React Workshop registration fees from 30 participants' },
      { id: 2, source: 'Sponsorship', amount: 30000, medium: 'Bank Transfer', date: '2025-01-15', description: 'TechCon corporate sponsorship for upcoming hackathon' }
    ],
    expenses: [
      { id: 1, purpose: 'Equipment', amount: 8000, medium: 'Bank Transfer', date: '2025-01-20', description: 'IoT sensors and Arduino boards for workshop' },
      { id: 2, purpose: 'Refreshments', amount: 2000, medium: 'Cash', date: '2025-01-22', description: 'Refreshments for workshop participants' }
    ],
    expected: [
      { id: 1, purpose: 'Hackathon Prizes', amount: 25000, dueDate: '2025-02-15', description: 'Cash prizes for upcoming hardware hackathon winners' },
      { id: 2, purpose: 'Workshop Materials', amount: 15000, dueDate: '2025-02-10', description: 'Printed materials and equipment for next workshop' }
    ]
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
        <div className="rounded-xl p-6 text-black">
          <h2 className="text-xl font-semibold mb-2">Current Balance</h2>
          <p className="text-4xl font-bold">৳{currentMonthData.balance.toLocaleString()}</p>
        </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Balance Card */}

        {/* Income Summary */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Income</h2>
            <Plus className="text-green-500" size={24} />
          </div>
          <div className="space-y-3">
            {currentMonthData.income.map(item => (
              <div 
                key={item.id}
                className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer relative group"
                onMouseEnter={() => setSelectedItem(item)}
                onClick={() => setShowModal(true)}
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium">{item.source}</span>
                  <span className="text-green-600">৳{item.amount.toLocaleString()}</span>
                </div>
                <div className="text-sm text-gray-500">{item.medium}</div>
                <ExternalLink className="hidden group-hover:block absolute right-2 top-2 w-4 h-4 text-gray-400" />
              </div>
            ))}
          </div>
        </div>

        {/* Expenses Summary */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Expenses</h2>
            <Minus className="text-red-500" size={24} />
          </div>
          <div className="space-y-3">
            {currentMonthData.expenses.map(item => (
              <div 
                key={item.id}
                className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer relative group"
                onMouseEnter={() => setSelectedItem(item)}
                onClick={() => setShowModal(true)}
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium">{item.purpose}</span>
                  <span className="text-red-600">৳{item.amount.toLocaleString()}</span>
                </div>
                <div className="text-sm text-gray-500">{item.medium}</div>
                <ExternalLink className="hidden group-hover:block absolute right-2 top-2 w-4 h-4 text-gray-400" />
              </div>
            ))}
          </div>
        </div>

        {/* Expected Expenses */}
        <div className="bg-white rounded-xl p-6 shadow-lg md:col-span-2 lg:col-span-3">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Expected Expenses</h2>
            <Info className="text-blue-500" size={24} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentMonthData.expected.map(item => (
              <div 
                key={item.id}
                className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 cursor-pointer relative group"
                onMouseEnter={() => setSelectedItem(item)}
                onClick={() => setShowModal(true)}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">{item.purpose}</span>
                  <span className="text-blue-600">৳{item.amount.toLocaleString()}</span>
                </div>
                <div className="text-sm text-gray-500">Due: {item.dueDate}</div>
                <ExternalLink className="hidden group-hover:block absolute right-2 top-2 w-4 h-4 text-gray-400" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Transaction Details</DialogTitle>
          </DialogHeader>
          {selectedItem && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Amount</p>
                  <p className="font-medium">৳{selectedItem.amount.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="font-medium">{selectedItem.date || selectedItem.dueDate}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-gray-500">Description</p>
                  <p className="font-medium">{selectedItem.description}</p>
                </div>
              </div>
              <button 
                onClick={() => window.location.href = '/transactions/' + selectedItem.id}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 mt-4"
              >
                View Full Details
              </button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Treasury;
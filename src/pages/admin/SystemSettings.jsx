import { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import { CheckCircle, ShoppingCart, CreditCard, BookOpen, X } from 'lucide-react';

const availableCourses = [
  { id: 1, name: 'MarLn: Data Science', price: 200 },
  { id: 2, name: 'MarLn: AI Fundamentals', price: 250 },
  { id: 3, name: 'MarLn: Cloud Computing', price: 180 },
  { id: 4, name: 'MarLn: Cybersecurity', price: 220 },
];

const mockActive = [
  { id: 1, name: 'MarLn: Data Science', expires: '2025-12-31' },
  { id: 2, name: 'MarLn: AI Fundamentals', expires: '2025-09-30' },
];

const mockBills = [
  { id: 1, due: '2025-07-15', amount: 400, desc: 'Quarterly MarLn Subscription' },
];

export default function SystemSettings() {
  const [selected, setSelected] = useState([]);
  const [duration, setDuration] = useState(3);
  const [activeCourses, setActiveCourses] = useState(mockActive);
  const [bills, setBills] = useState(mockBills);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);

  // Select/deselect courses
  const toggleCourse = (id) => {
    setSelected(sel => sel.includes(id) ? sel.filter(cid => cid !== id) : [...sel, id]);
  };

  // Calculate price
  const totalPrice = selected.reduce((sum, id) => {
    const course = availableCourses.find(c => c.id === id);
    return sum + (course ? course.price : 0);
  }, 0) * duration;

  // Purchase handler (mock)
  const handlePurchase = (e) => {
    e.preventDefault();
    const newCourses = availableCourses.filter(c => selected.includes(c.id)).map(c => ({
      id: c.id,
      name: c.name,
      expires: new Date(Date.now() + duration * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    }));
    setActiveCourses([...activeCourses, ...newCourses]);
    setSelected([]);
    setShowPurchaseModal(false);
    alert('Courses purchased and enabled!');
  };

  // Pay bill handler (mock)
  const payBill = (id) => {
    setBills(bills.filter(b => b.id !== id));
    alert('Bill paid!');
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar role="admin" />
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">System Settings & MarLn Integration</h1>

          {/* Available Courses */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 flex items-center gap-2"><BookOpen size={20}/> Available MarLn Courses</h2>
              <button
                onClick={() => setShowPurchaseModal(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors disabled:opacity-50"
                disabled={selected.length === 0}
              >
                <ShoppingCart size={20} />
                <span>Purchase Access</span>
              </button>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {availableCourses.map(course => (
                  <label key={course.id} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selected.includes(course.id)}
                      onChange={() => toggleCourse(course.id)}
                      className="accent-blue-600 w-5 h-5"
                    />
                    <span className="font-medium text-gray-800 dark:text-gray-100">{course.name}</span>
                    <span className="ml-auto text-blue-600 dark:text-blue-400 font-semibold">${course.price}/mo</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Active Courses */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2 flex items-center gap-2"><CheckCircle size={20}/> Active/Purchased Courses</h2>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
              {activeCourses.length === 0 ? (
                <div className="text-gray-500 dark:text-gray-400">No active MarLn courses.</div>
              ) : (
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-900">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Course</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Expires</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {activeCourses.map(c => (
                      <tr key={c.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">{c.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-700 dark:text-blue-400">{c.expires}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          {/* Upcoming Bills */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2 flex items-center gap-2"><CreditCard size={20}/> Upcoming MarLn Bills</h2>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
              {bills.length === 0 ? (
                <div className="text-gray-500 dark:text-gray-400">No upcoming bills.</div>
              ) : (
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-900">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Description</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Due Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Amount</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {bills.map(bill => (
                      <tr key={bill.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">{bill.desc}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-700 dark:text-blue-400">{bill.due}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-green-700 dark:text-green-400">${bill.amount}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button onClick={() => payBill(bill.id)} className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 flex items-center gap-1"><CreditCard size={16}/> Pay Now</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Purchase Modal */}
      {showPurchaseModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Purchase MarLn Courses</h2>
              <button onClick={() => setShowPurchaseModal(false)} className="text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100"><X size={24} /></button>
            </div>
            <form onSubmit={handlePurchase} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Duration (months)</label>
                <input type="number" min={1} max={24} className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md py-2 px-3 dark:bg-gray-900 dark:text-gray-100" required value={duration} onChange={e => setDuration(Number(e.target.value))} />
              </div>
              <div className="font-semibold">Total Price: <span className="text-blue-700 dark:text-blue-400">${totalPrice}</span></div>
              <div className="flex justify-end space-x-3 mt-6">
                <button type="button" onClick={() => setShowPurchaseModal(false)} className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Purchase</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 
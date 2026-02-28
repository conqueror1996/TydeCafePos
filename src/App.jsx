import React, { useState, useEffect } from 'react';
import {
  Menu, Search, Store, Monitor, LayoutGrid, Clock, Bell, User,
  ChevronDown, Info, CreditCard, Banknote, Printer, Eye, Plus,
  Minus, X, Utensils, Smartphone, BarChart3, TrendingUp, PieChart, AlertTriangle, Truck, ShoppingBag, ChefHat, MessageSquare, CheckSquare, Sunset
} from 'lucide-react';
import './index.css';

// --- INITIAL MOCK DATA ---
const INITIAL_CATEGORIES = [
  "Quick Snack's", "Bread's", "Burger's", "Pizza's", "Wrap's", "Pasta's",
  "Hot Beverage's", "Cold Beverage's", "Moktails", "Salad's", "Desert"
];

const INITIAL_MENU_ITEMS = [
  // Quick Snack's
  { id: 101, name: 'Salted Fries', price: 199, type: 'veg', cat: "Quick Snack's", inStock: true },
  { id: 102, name: 'Peri Peri Fries', price: 229, type: 'veg', cat: "Quick Snack's", inStock: true },
  { id: 103, name: 'Cheesy Fries', price: 249, type: 'veg', cat: "Quick Snack's", inStock: true },
  { id: 104, name: 'Mozzarella Sticks', price: 249, type: 'veg', cat: "Quick Snack's", inStock: true },
  { id: 105, name: 'Veg Fingers', price: 249, type: 'veg', cat: "Quick Snack's", inStock: true },
  { id: 106, name: 'Chicken Popcorn', price: 349, type: 'non-veg', cat: "Quick Snack's", inStock: true },
  { id: 107, name: 'Chicken Strips(8pc)', price: 399, type: 'non-veg', cat: "Quick Snack's", inStock: true },
  { id: 108, name: 'Chicken Nuggets(8pc)', price: 339, type: 'non-veg', cat: "Quick Snack's", inStock: true },
  { id: 109, name: 'Chicken Lolipop', price: 409, type: 'non-veg', cat: "Quick Snack's", inStock: true },

  // Bread's
  { id: 201, name: 'Cheese Garlic Bread', price: 249, type: 'veg', cat: "Bread's", inStock: true },
  { id: 202, name: 'Sweet Corn Garlic Bread', price: 269, type: 'veg', cat: "Bread's", inStock: true },
  { id: 203, name: 'Spicy Garlic Bread', price: 279, type: 'veg', cat: "Bread's", inStock: true },
  { id: 204, name: 'Bruschetta Garlic Bread', price: 299, type: 'veg', cat: "Bread's", inStock: true },

  // Burger's
  { id: 301, name: 'Veg Classic', price: 239, type: 'veg', cat: "Burger's", inStock: true },
  { id: 302, name: 'Veg Panner Crispy', price: 259, type: 'veg', cat: "Burger's", inStock: true },
  { id: 303, name: 'Chicken Classic', price: 259, type: 'non-veg', cat: "Burger's", inStock: true },
  { id: 304, name: 'Chicken Crispy', price: 289, type: 'non-veg', cat: "Burger's", inStock: true },

  // Pizza's
  { id: 401, name: 'Margarita', price: 399, type: 'veg', cat: "Pizza's", inStock: true },
  { id: 402, name: 'Simply Veggie', price: 419, type: 'veg', cat: "Pizza's", inStock: true },
  { id: 403, name: 'Farm Veggies', price: 429, type: 'veg', cat: "Pizza's", inStock: true },
  { id: 404, name: 'peri Peri Panner', price: 459, type: 'veg', cat: "Pizza's", inStock: true },
  { id: 405, name: 'Tandoori Paneer', price: 499, type: 'veg', cat: "Pizza's", inStock: true },
  { id: 406, name: 'Veg Extravaganza', price: 559, type: 'veg', cat: "Pizza's", inStock: true },
  { id: 407, name: 'Chicken Sausages', price: 399, type: 'non-veg', cat: "Pizza's", inStock: true },
  { id: 408, name: 'Simply Chicken', price: 429, type: 'non-veg', cat: "Pizza's", inStock: true },
  { id: 409, name: 'BBQ Chicken', price: 449, type: 'non-veg', cat: "Pizza's", inStock: true },
  { id: 410, name: 'Peri Peri Chicken', price: 469, type: 'non-veg', cat: "Pizza's", inStock: true },
  { id: 411, name: 'Tandoori Chicken', price: 489, type: 'non-veg', cat: "Pizza's", inStock: true },
  { id: 412, name: 'Chicken Loaded', price: 559, type: 'non-veg', cat: "Pizza's", inStock: true },

  // Wrap's
  { id: 501, name: 'Veggie delight', price: 299, type: 'veg', cat: "Wrap's", inStock: true },
  { id: 502, name: 'Panner Warp', price: 319, type: 'veg', cat: "Wrap's", inStock: true },
  { id: 503, name: 'Tandoori Panner Wrap', price: 349, type: 'veg', cat: "Wrap's", inStock: true },
  { id: 504, name: 'Chicken Delight', price: 389, type: 'non-veg', cat: "Wrap's", inStock: true },
  { id: 505, name: 'Chicken Loaded', price: 399, type: 'non-veg', cat: "Wrap's", inStock: true },

  // Pasta's (Stored as generic items but you could split them if needed)
  { id: 601, name: 'Alfredo (White Sauce) Veg', price: 389, type: 'veg', cat: "Pasta's", inStock: true },
  { id: 602, name: 'Alfredo (White Sauce) Nonveg', price: 399, type: 'non-veg', cat: "Pasta's", inStock: true },
  { id: 603, name: 'Arrabiata (Red Sauce) Veg', price: 399, type: 'veg', cat: "Pasta's", inStock: true },
  { id: 604, name: 'Arrabiata (Red Sauce) Nonveg', price: 419, type: 'non-veg', cat: "Pasta's", inStock: true },
  { id: 605, name: 'Pink Sauce Veg', price: 439, type: 'veg', cat: "Pasta's", inStock: true },
  { id: 606, name: 'Pink Sauce Nonveg', price: 459, type: 'non-veg', cat: "Pasta's", inStock: true },

  // Hot Beverage's
  { id: 701, name: 'Garam Chai', price: 99, type: 'veg', cat: "Hot Beverage's", inStock: true },
  { id: 702, name: 'Regular Hot Coffee', price: 119, type: 'veg', cat: "Hot Beverage's", inStock: true },
  { id: 703, name: 'Hot Turmeric Tea', price: 119, type: 'veg', cat: "Hot Beverage's", inStock: true },
  { id: 704, name: 'Lemon Tea', price: 99, type: 'veg', cat: "Hot Beverage's", inStock: true },
  { id: 705, name: 'Black Coffee', price: 99, type: 'veg', cat: "Hot Beverage's", inStock: true },
  { id: 706, name: 'Green Tea', price: 99, type: 'veg', cat: "Hot Beverage's", inStock: true },
  { id: 707, name: 'Strawberry Green Tea', price: 109, type: 'veg', cat: "Hot Beverage's", inStock: true },
  { id: 708, name: 'Butterfly Tea', price: 119, type: 'veg', cat: "Hot Beverage's", inStock: true },

  // Cold Beverage's
  { id: 801, name: 'Cold Coffee', price: 199, type: 'veg', cat: "Cold Beverage's", inStock: true },
  { id: 802, name: 'Caramel Cold Coffee', price: 219, type: 'veg', cat: "Cold Beverage's", inStock: true },
  { id: 803, name: 'Lemon Ice Tea', price: 229, type: 'veg', cat: "Cold Beverage's", inStock: true },
  { id: 804, name: 'Peach Ice tea', price: 209, type: 'veg', cat: "Cold Beverage's", inStock: true },
  { id: 805, name: 'Vanilla Milkshake', price: 219, type: 'veg', cat: "Cold Beverage's", inStock: true },
  { id: 806, name: 'Strawberry Milkshake', price: 219, type: 'veg', cat: "Cold Beverage's", inStock: true },
  { id: 807, name: 'Cookie Delite Milkshake', price: 229, type: 'veg', cat: "Cold Beverage's", inStock: true },
  { id: 808, name: 'Seasonal Fruit Juice', price: 249, type: 'veg', cat: "Cold Beverage's", inStock: true },
  { id: 809, name: 'Protein Cold Coffee', price: 299, type: 'veg', cat: "Cold Beverage's", inStock: true },
  { id: 810, name: 'Protein Chocolate Shake', price: 299, type: 'veg', cat: "Cold Beverage's", inStock: true },

  // Moktails
  { id: 901, name: 'Mint Mojito', price: 249, type: 'veg', cat: 'Moktails', inStock: true },
  { id: 902, name: 'Chili Guava', price: 259, type: 'veg', cat: 'Moktails', inStock: true },
  { id: 903, name: 'Minty Peach', price: 259, type: 'veg', cat: 'Moktails', inStock: true },
  { id: 904, name: 'Minty Watermelon', price: 259, type: 'veg', cat: 'Moktails', inStock: true },

  // Salad's
  { id: 1001, name: 'Paneer Peri Peri Salad', price: 309, type: 'veg', cat: "Salad's", inStock: true },
  { id: 1002, name: 'Tandoori Chicken Salad', price: 369, type: 'non-veg', cat: "Salad's", inStock: true },
  { id: 1003, name: 'Extra Chicken Salad', price: 399, type: 'non-veg', cat: "Salad's", inStock: true },

  // Desert
  { id: 1101, name: 'Hot Chocolate', price: 289, type: 'veg', cat: 'Desert', inStock: true },
  { id: 1102, name: 'Choclate with Brownie', price: 299, type: 'veg', cat: 'Desert', inStock: true }
];

const INITIAL_TABLES = [
  { id: 1, name: 'Table 1', status: 'blank', type: 'A/C', order: [] },
  { id: 2, name: 'Table 2', status: 'blank', type: 'A/C', order: [] },
  { id: 3, name: 'Table 3', status: 'blank', type: 'A/C', order: [] },
  { id: 4, name: 'Table 4', status: 'blank', type: 'A/C', order: [] },
  { id: 5, name: 'Table 5', status: 'blank', type: 'A/C', order: [] },
  { id: 8, name: 'Table 8', status: 'blank', type: 'A/C', order: [] },
  { id: 9, name: 'Table 9', status: 'blank', type: 'A/C', order: [] },
  { id: 12, name: 'Table 12', status: 'blank', type: 'A/C', order: [] },
  { id: 14, name: 'Table 14', status: 'blank', type: 'A/C', order: [] },
  { id: 101, name: 'Table 1', status: 'blank', type: 'Non A/C', order: [] },
  { id: 102, name: 'Table 2', status: 'blank', type: 'Non A/C', order: [] },
];

// --- COMPONENTS ---

const TopHeader = ({ onViewChange }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="pos-header no-print">
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: '180px', position: 'relative' }}>
        <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 0 }}>
          <Menu size={20} color="#374151" />
        </button>
        {menuOpen && (
          <div style={{ position: 'absolute', top: '30px', left: '0', background: 'white', border: '1px solid #e5e7eb', borderRadius: '4px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', zIndex: 100, width: '180px' }}>
            <button onClick={() => { setMenuOpen(false); onViewChange('menusetup'); }} style={{ display: 'block', width: '100%', padding: '10px', textAlign: 'left', background: 'transparent', border: 'none', borderBottom: '1px solid #f3f4f6', cursor: 'pointer', color: '#10b981', fontWeight: 'bold', fontSize: '14px' }}>Menu Setup</button>
            <button onClick={() => { setMenuOpen(false); onViewChange('floorplan'); }} style={{ display: 'block', width: '100%', padding: '10px', textAlign: 'left', background: 'transparent', border: 'none', borderBottom: '1px solid #f3f4f6', cursor: 'pointer', color: '#8b5cf6', fontWeight: 'bold', fontSize: '14px' }}>Floor Plan</button>
            <button onClick={() => { setMenuOpen(false); onViewChange('orderhistory'); }} style={{ display: 'block', width: '100%', padding: '10px', textAlign: 'left', background: 'transparent', border: 'none', borderBottom: '1px solid #f3f4f6', cursor: 'pointer', color: '#374151', fontSize: '14px' }}>Order History</button>
            <button onClick={() => { setMenuOpen(false); onViewChange('printersettings'); }} style={{ display: 'block', width: '100%', padding: '10px', textAlign: 'left', background: 'transparent', border: 'none', cursor: 'pointer', color: '#374151', fontSize: '14px' }}>Printer Settings</button>
          </div>
        )}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <div style={{ background: '#94161c', color: 'white', padding: '4px 6px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold' }}>TYDE</div>
          <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#1f2937' }}>CAFE</div>
        </div>
      </div>
      <button className="btn-pp btn-pp-primary" onClick={() => onViewChange('ordering', null)}>New Order</button>
      <div className="header-search">
        <Search size={14} color="#6b7280" />
        <input type="text" placeholder="Bill No" />
      </div>
      <div className="header-search">
        <Search size={14} color="#6b7280" />
        <input type="text" placeholder="KOT No" />
      </div>
      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '15px' }}>
        <button onClick={() => onViewChange('dayclose')} style={{ cursor: 'pointer', border: 'none', background: 'transparent', textAlign: 'center', opacity: 0.7 }}>
          <Sunset size={16} /><div style={{ fontSize: '9px' }}>Day Close</div>
        </button>
        <button onClick={() => onViewChange('analytics')} style={{ cursor: 'pointer', border: 'none', background: 'transparent', textAlign: 'center', opacity: 0.7 }}>
          <BarChart3 size={16} /><div style={{ fontSize: '9px' }}>Reports</div>
        </button>
        <button onClick={() => onViewChange('kds')} style={{ cursor: 'pointer', border: 'none', background: 'transparent', textAlign: 'center', opacity: 0.7 }}>
          <ChefHat size={16} /><div style={{ fontSize: '9px' }}>Kitchen</div>
        </button>
        <button onClick={() => onViewChange('nontables')} style={{ cursor: 'pointer', border: 'none', background: 'transparent', textAlign: 'center', opacity: 0.7 }}>
          <ShoppingBag size={16} /><div style={{ fontSize: '9px' }}>Online</div>
        </button>
        <button onClick={() => onViewChange('tables')} style={{ cursor: 'pointer', border: 'none', background: 'transparent', textAlign: 'center', opacity: 0.7 }}>
          <LayoutGrid size={16} /><div style={{ fontSize: '9px' }}>Tables</div>
        </button>
        <div style={{ borderLeft: '1px solid #e5e7eb', height: '30px', margin: '0 10px' }}></div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '11px', color: '#94161c', fontWeight: 'bold' }}>Call for Support</div>
            <div style={{ fontSize: '11px', fontWeight: 'bold' }}>+91 8652475772</div>
          </div>
          <div style={{ width: '32px', height: '32px', borderRadius: '50%', border: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <User size={18} color="#94161c" />
          </div>
        </div>
      </div>
    </div>
  );
};

/* --- ORDER HISTORY VIEW --- */
const OrderHistoryView = ({ orderHistory }) => {
  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '24px', background: '#f9fafb' }} className="animate-fade-in no-scrollbar">
      <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px', color: '#1f2937' }}>Order History</h2>
      {orderHistory.length === 0 ? (
        <p style={{ color: '#6b7280' }}>No orders settled yet.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {orderHistory.slice().reverse().map((order) => (
            <div key={order.id} style={{ background: 'white', padding: '16px', borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', borderBottom: '1px solid #f3f4f6', paddingBottom: '8px' }}>
                <div>
                  <span style={{ fontWeight: 'bold', fontSize: '14px', color: '#1f2937', marginRight: '12px' }}>Table/Order: {order.tableId}</span>
                  <span style={{ fontSize: '12px', color: '#6b7280' }}>{new Date(order.timestamp).toLocaleString()}</span>
                </div>
                <div style={{ fontWeight: 'bold', color: '#94161c', fontSize: '16px' }}>₹{order.grandTotal.toFixed(2)}</div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                <div style={{ color: '#4b5563' }}>
                  {order.cart.map(item => `${item.qty}x ${item.name}`).join(', ')}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
                  <span style={{ background: '#f5f3ff', color: '#5b21b6', padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold' }}>{order.paymentMethod}</span>
                  {order.discountAmt > 0 && <span style={{ color: '#10b981', fontSize: '11px', fontWeight: 'bold' }}>Discount: ₹{order.discountAmt}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

/* --- MENU SETUP VIEW --- */
const MenuSetupView = ({ categories, setCategories, menuItems, setMenuItems }) => {
  const [newCat, setNewCat] = useState('');
  const [newItem, setNewItem] = useState({ name: '', price: '', type: 'veg', cat: categories[0] || '' });

  const addCategory = () => {
    if (newCat && !categories.includes(newCat)) {
      setCategories([...categories, newCat]);
      if (!newItem.cat) setNewItem({ ...newItem, cat: newCat });
      setNewCat('');
    }
  };

  const deleteCategory = (cat) => {
    if (confirm(`Are you sure you want to delete category "${cat}"? This won't delete the items in it, but they may become orphaned.`)) {
      setCategories(categories.filter(c => c !== cat));
    }
  };

  const addItem = () => {
    if (newItem.name && newItem.price && newItem.cat) {
      const itemToAdd = {
        ...newItem,
        id: Date.now(),
        price: parseFloat(newItem.price),
        inStock: true
      };
      setMenuItems([...menuItems, itemToAdd]);
      setNewItem({ name: '', price: '', type: 'veg', cat: categories[0] || '' });
    } else {
      alert("Please fill in Name, Price, and Category.");
    }
  };

  const deleteItem = (id) => {
    if (confirm("Are you sure you want to delete this menu item?")) {
      setMenuItems(menuItems.filter(item => item.id !== id));
    }
  };

  const toggleStock = (id) => {
    setMenuItems(menuItems.map(item => item.id === id ? { ...item, inStock: !item.inStock } : item));
  };

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '24px', background: '#f9fafb' }} className="animate-fade-in no-scrollbar">
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px', color: '#1f2937', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Utensils size={28} color="#10b981" /> Menu & Inventory Setup
        </h2>

        {/* Categories Section */}
        <div style={{ background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', marginBottom: '24px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px', color: '#374151' }}>Categories</h3>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
            <input
              type="text"
              placeholder="New Category Name (e.g. Desserts)"
              value={newCat}
              onChange={e => setNewCat(e.target.value)}
              style={{ flex: 1, padding: '10px', borderRadius: '6px', border: '1px solid #d1d5db' }}
            />
            <button onClick={addCategory} className="btn-pp btn-pp-primary" style={{ background: '#10b981', padding: '10px 20px' }}>Add Category</button>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {categories.map(cat => (
              <div key={cat} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#f3f4f6', padding: '6px 12px', borderRadius: '20px', fontSize: '13px', fontWeight: 'bold', color: '#4b5563' }}>
                {cat}
                <button onClick={() => deleteCategory(cat)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', color: '#ef4444' }}>
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Menu Items Section */}
        <div style={{ background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px', color: '#374151' }}>Add Menu Item</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr auto', gap: '10px', alignItems: 'center', marginBottom: '24px' }}>
            <input
              type="text"
              placeholder="Item Name"
              value={newItem.name}
              onChange={e => setNewItem({ ...newItem, name: e.target.value })}
              style={{ padding: '10px', borderRadius: '6px', border: '1px solid #d1d5db' }}
            />
            <input
              type="number"
              placeholder="Price (₹)"
              value={newItem.price}
              onChange={e => setNewItem({ ...newItem, price: e.target.value })}
              style={{ padding: '10px', borderRadius: '6px', border: '1px solid #d1d5db' }}
            />
            <select
              value={newItem.cat}
              onChange={e => setNewItem({ ...newItem, cat: e.target.value })}
              style={{ padding: '10px', borderRadius: '6px', border: '1px solid #d1d5db', background: 'white' }}
            >
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
            <select
              value={newItem.type}
              onChange={e => setNewItem({ ...newItem, type: e.target.value })}
              style={{ padding: '10px', borderRadius: '6px', border: '1px solid #d1d5db', background: 'white' }}
            >
              <option value="veg">Veg</option>
              <option value="non-veg">Non-Veg</option>
            </select>
            <button onClick={addItem} className="btn-pp btn-pp-primary" style={{ padding: '10px 20px' }}>Add Item</button>
          </div>

          <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px', color: '#374151', borderTop: '1px solid #e5e7eb', paddingTop: '24px' }}>Current Menu</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {menuItems.map(item => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', border: '1px solid #e5e7eb', borderRadius: '8px', background: item.inStock ? 'white' : '#fef2f2' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '2px', background: item.type === 'veg' ? '#10b981' : '#ef4444' }}></div>
                  <div style={{ fontWeight: 'bold', color: '#1f2937' }}>{item.name}</div>
                  <div style={{ color: '#6b7280', fontSize: '13px' }}>{item.cat}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ fontWeight: 'bold', color: '#94161c' }}>₹{item.price}</div>
                  <button
                    onClick={() => toggleStock(item.id)}
                    style={{ padding: '4px 8px', borderRadius: '4px', border: '1px solid', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer', background: item.inStock ? '#ecfdf5' : 'transparent', color: item.inStock ? '#10b981' : '#ef4444', borderColor: item.inStock ? '#10b981' : '#ef4444' }}
                  >
                    {item.inStock ? 'In Stock' : 'Out of Stock'}
                  </button>
                  <button onClick={() => deleteItem(item.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444', padding: '4px' }}>
                    <X size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* --- FLOOR PLAN SETUP VIEW --- */
const FloorPlanSetupView = ({ tables, setTables }) => {
  const [newTableName, setNewTableName] = useState('');
  const [newTableType, setNewTableType] = useState('A/C');

  const addTable = () => {
    if (newTableName.trim() === '') return;
    const newId = Date.now();
    const newTable = {
      id: newId,
      name: newTableName,
      status: 'blank',
      type: newTableType,
      order: []
    };
    setTables([...tables, newTable]);
    setNewTableName('');
  };

  const removeTable = (id) => {
    const table = tables.find(t => t.id === id);
    if (table && table.status !== 'blank') {
      alert("Cannot remove a table that has an active order. Settle or clear it first.");
      return;
    }
    if (confirm("Are you sure you want to remove this table?")) {
      setTables(tables.filter(t => t.id !== id));
    }
  };

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '24px', background: '#f9fafb' }} className="animate-fade-in no-scrollbar">
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px', color: '#1f2937', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <LayoutGrid size={28} color="#8b5cf6" /> Floor Plan Setup
        </h2>

        <div style={{ background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', marginBottom: '24px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px', color: '#374151' }}>Add New Table</h3>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <input
              type="text"
              placeholder="Table Name (e.g., T-15)"
              value={newTableName}
              onChange={e => setNewTableName(e.target.value)}
              style={{ flex: 1, padding: '10px', borderRadius: '6px', border: '1px solid #d1d5db' }}
            />
            <select
              value={newTableType}
              onChange={e => setNewTableType(e.target.value)}
              style={{ padding: '10px', borderRadius: '6px', border: '1px solid #d1d5db', background: 'white' }}
            >
              <option value="A/C">A/C Section</option>
              <option value="Non A/C">Non A/C Section</option>
            </select>
            <button onClick={addTable} style={{ background: '#8b5cf6', color: 'white', padding: '10px 20px', borderRadius: '6px', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>Add Table</button>
          </div>
        </div>

        {['A/C', 'Non A/C'].map(section => (
          <div key={section} style={{ background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px', color: '#374151' }}>{section} Section</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '12px' }}>
              {tables.filter(t => t.type === section).map(table => (
                <div key={table.id} style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f9fafb' }}>
                  <span style={{ fontWeight: 'bold', color: '#4b5563' }}>{table.name}</span>
                  <button onClick={() => removeTable(table.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444', padding: '4px' }}>
                    <X size={16} />
                  </button>
                </div>
              ))}
              {tables.filter(t => t.type === section).length === 0 && <div style={{ color: '#9ca3af', fontStyle: 'italic', gridColumn: '1/-1' }}>No tables in this section.</div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* --- PRINTER SETTINGS VIEW --- */
const PrinterSettingsView = ({ settings, onSaveSettings }) => {
  const [localSettings, setLocalSettings] = useState(settings);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLocalSettings(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSave = () => {
    onSaveSettings(localSettings);
    alert('Printer Settings Saved Successfully!');
  };

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '24px', background: '#f9fafb' }} className="animate-fade-in no-scrollbar">
      <div style={{ maxWidth: '600px', margin: '0 auto', background: 'white', padding: '32px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px', color: '#1f2937', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Printer size={28} color="#94161c" /> Printer Configuration
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', color: '#374151', marginBottom: '8px' }}>Bill Header (Text Logo)</label>
            <input type="text" name="billHeader" value={localSettings.billHeader} onChange={handleChange} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #d1d5db' }} />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', color: '#374151', marginBottom: '8px' }}>Bill Footer Message</label>
            <input type="text" name="billFooter" value={localSettings.billFooter} onChange={handleChange} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #d1d5db' }} />
          </div>

          <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '20px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', color: '#374151', marginBottom: '12px' }}>KOT Printing Mode</label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: '#4b5563', cursor: 'pointer' }}>
              <input type="checkbox" name="categorizedKOT" checked={localSettings.categorizedKOT} onChange={handleChange} style={{ width: '18px', height: '18px' }} />
              Split KOTs by Item Category (e.g. Separate slip for Pizza vs Quick Snacks)
            </label>
          </div>

          <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '20px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', color: '#374151', marginBottom: '12px' }}>Print Layout Theme</label>
            <select name="billLayout" value={localSettings.billLayout} onChange={handleChange} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #d1d5db', background: 'white' }}>
              <option value="standard">Standard Detailed</option>
              <option value="compact">Compact (Saves Paper)</option>
              <option value="modern">Modern Clean</option>
              <option value="minimal">Ultra Minimalist</option>
              <option value="bold">Bold & High Contrast</option>
            </select>
          </div>

          <button onClick={handleSave} className="btn-pp btn-pp-primary" style={{ marginTop: '20px', padding: '12px', fontSize: '16px' }}>Save Settings</button>
        </div>
      </div>
    </div>
  );
};

const TableManagement = ({ tables, onSelectTable, onClearTable }) => {
  const getTableTotal = (order) => order.reduce((acc, item) => acc + (item.price * item.qty), 0);

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }} className="animate-fade-in no-scrollbar">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ fontSize: '16px', fontWeight: 'bold', color: '#374151' }}>Table View</h2>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="btn-pp btn-pp-primary" style={{ padding: '6px 12px' }}>+ Table Reservation</button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '20px', marginBottom: '30px', fontSize: '10px', color: '#6b7280', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><div style={{ width: '12px', height: '12px', border: '1px solid #d1d5db', background: 'white', borderRadius: '2px' }}></div> Blank Table</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><div style={{ width: '12px', height: '12px', background: '#bae6fd', borderRadius: '2px' }}></div> Running Table</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><div style={{ width: '12px', height: '12px', background: '#bbf7d0', borderRadius: '2px' }}></div> Printed Table</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><div style={{ width: '12px', height: '12px', background: '#fef08a', borderRadius: '2px' }}></div> Running KOT</div>
      </div>

      {['A/C', 'Non A/C'].map(section => (
        <div key={section} style={{ marginBottom: '30px' }}>
          <h3 className="table-section-header">{section}</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '12px' }}>
            {tables.filter(t => t.type === section).map(table => {
              const tableTotal = getTableTotal(table.order);
              return (
                <div
                  key={table.id}
                  className={`pp-table-card status-${table.status}`}
                  onClick={() => onSelectTable(table)}
                  style={{ height: '100px', padding: '10px' }}
                >
                  <div style={{ fontSize: '12px', color: '#4b5563', marginBottom: 'auto' }}>{table.name}</div>
                  {(table.status !== 'blank') && (
                    <div style={{ display: 'flex', gap: '10px', marginTop: '10px', alignItems: 'center' }}>
                      <Printer size={14} color="#6b7280" />
                      {(table.status === 'kot' || table.status === 'printed') && <Eye size={14} color="#6b7280" />}
                      {/* CLEAR TABLE FAST ACTION */}
                      <button
                        onClick={(e) => { e.stopPropagation(); onClearTable(table.id); }}
                        style={{ marginLeft: 'auto', background: 'transparent', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '10px', padding: '2px 6px', cursor: 'pointer', color: '#374151' }}
                      >
                        Clear
                      </button>
                    </div>
                  )}
                  {tableTotal > 0 && (
                    <div style={{ marginTop: 'auto', fontWeight: 'bold', fontSize: '13px' }}>₹{tableTotal}</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

/* --- KITCHEN DISPLAY SYSTEM --- */
const KitchenDisplay = ({ tables, nonTableOrders, onMarkReady }) => {
  const activeOrders = [...tables, ...nonTableOrders].filter(o => o.order && o.order.length > 0 && o.status !== 'blank' && o.status !== 'printed');

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '24px', background: '#111827', color: 'white' }} className="animate-fade-in no-scrollbar">
      <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <ChefHat size={24} color="#fca5a5" /> Kitchen Display System (KDS)
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
        {activeOrders.length === 0 && <div style={{ color: '#6b7280', fontStyle: 'italic', gridColumn: '1 / -1' }}>No active orders in queue.</div>}
        {activeOrders.map(order => (
          <div key={order.id} style={{ background: '#1f2937', borderRadius: '8px', border: '1px solid #374151', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ background: order.status === 'kot' ? '#b91c1c' : '#4f46e5', padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontWeight: 'bold', fontSize: '16px' }}>{order.name}</div>
              <div style={{ fontSize: '12px', fontWeight: 'bold', background: 'rgba(255,255,255,0.2)', padding: '2px 8px', borderRadius: '4px' }}>
                {order.status === 'kot' ? 'NEW KOT' : 'RUNNING'}
              </div>
            </div>
            <div style={{ padding: '16px', flex: 1 }}>
              {order.order.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #374151', paddingBottom: '8px', marginBottom: '8px' }}>
                  <div>
                    <div style={{ fontWeight: 'bold', fontSize: '15px' }}>{item.qty}x {item.name}</div>
                    {item.note && <div style={{ fontSize: '12px', color: '#fca5a5', fontStyle: 'italic', marginTop: '2px' }}>* NOTE: {item.note}</div>}
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => onMarkReady(order)}
              style={{ background: '#059669', color: 'white', border: 'none', padding: '16px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer', display: 'flex', justifyContent: 'center', gap: '8px', transition: 'background 0.2s' }}
              onMouseOver={(e) => e.currentTarget.style.background = '#047857'}
              onMouseOut={(e) => e.currentTarget.style.background = '#059669'}
            >
              <CheckSquare size={20} /> Mark Order Ready
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const NonTableManagement = ({ orders, onSelectOrder, onCreateOrder }) => {
  const getOrderTotal = (orderArr) => orderArr.reduce((acc, item) => acc + (item.price * item.qty), 0);

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }} className="animate-fade-in no-scrollbar">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ fontSize: '16px', fontWeight: 'bold', color: '#374151' }}>Takeaway & Delivery</h2>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="btn-pp btn-pp-outline" onClick={() => onCreateOrder('Delivery')} style={{ display: 'flex', alignItems: 'center', background: 'white' }}><Truck size={14} style={{ marginRight: '6px' }} />+ New Delivery</button>
          <button className="btn-pp btn-pp-outline" onClick={() => onCreateOrder('Takeaway')} style={{ display: 'flex', alignItems: 'center', background: 'white' }}><ShoppingBag size={14} style={{ marginRight: '6px' }} />+ New Takeaway</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px' }}>
        {orders.length === 0 && <div style={{ color: '#9ca3af', fontStyle: 'italic', gridColumn: '1 / -1' }}>No active Takeaway or Delivery orders.</div>}
        {orders.map(order => {
          const tableTotal = getOrderTotal(order.order);
          return (
            <div
              key={order.id}
              className={`pp-table-card status-${order.status}`}
              onClick={() => onSelectOrder(order)}
              style={{ alignItems: 'flex-start', padding: '16px', height: '110px' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '8px' }}>
                <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#1f2937' }}>{order.name}</div>
                <div style={{ fontSize: '10px', background: order.type === 'Delivery' ? '#fee2e2' : '#e0e7ff', color: order.type === 'Delivery' ? '#991b1b' : '#3730a3', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold', border: `1px solid ${order.type === 'Delivery' ? '#fca5a5' : '#a5b4fc'}` }}>{order.type}</div>
              </div>
              <div style={{ fontSize: '11px', color: '#6b7280', marginBottom: 'auto' }}>{order.phone || 'Pending Finalization'}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center', marginTop: 'auto' }}>
                <div style={{ fontSize: '11px', color: '#6b7280', fontWeight: '600' }}>Items: {order.order.reduce((acc, i) => acc + i.qty, 0)}</div>
                <div style={{ fontWeight: 'bold', fontSize: '14px', color: '#94161c' }}>₹{tableTotal}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/* --- DIRECT ESC/POS PRINTING HARDWARE ENGINE --- */
// Connects bypassing Browser Dialog directly to USB/Serial EPSON/STAR format POS Thermal hardware
const printPosToSerial = async (orderData, type = 'BILL') => {
  try {
    const settings = JSON.parse(localStorage.getItem('pos_printer_settings') || '{"billHeader":"TYDE CAFE","billFooter":"Thank You for Visiting!","categorizedKOT":false,"billLayout":"standard"}');

    if (!('serial' in navigator)) throw new Error('Web Serial API not supported.');
    const port = await navigator.serial.requestPort();
    await port.open({ baudRate: 9600 });

    const writer = port.writable.getWriter();
    const textEncoder = new TextEncoder();

    const init = new Uint8Array([0x1B, 0x40]);
    const boldOn = new Uint8Array([0x1B, 0x45, 1]);
    const boldOff = new Uint8Array([0x1B, 0x45, 0]);
    const centerAlign = new Uint8Array([0x1B, 0x61, 1]);
    const leftAlign = new Uint8Array([0x1B, 0x61, 0]);
    const rightAlign = new Uint8Array([0x1B, 0x61, 2]);
    const cutPaper = new Uint8Array([0x1D, 0x56, 0x41, 0x08]);

    const w = async (bytes) => await writer.write(bytes);
    const wT = async (text) => await writer.write(textEncoder.encode(text));

    if (type === 'KOT' && settings.categorizedKOT) {
      // Print Separate KOT for each category
      const categories = [...new Set(orderData.items.map(i => i.cat))];

      for (const cat of categories) {
        const catItems = orderData.items.filter(i => i.cat === cat);

        await w(init);
        await w(centerAlign);

        const now = new Date();
        const dateStr = now.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' });
        const timeStr = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
        await wT(`${dateStr} ${timeStr}\n`);

        const kotNo = Math.floor(Math.random() * 100);
        await wT(`KOT (Cat: ${cat}) - ${kotNo}\n`);
        await wT(`${orderData.orderType || 'Dine In'}\n`);
        await wT(`Table No: ${orderData.tableName}\n`);
        await wT("--------------------------------\n");

        await w(leftAlign);
        await wT("Item        Special Note   Qty\n");
        await wT("--------------------------------\n");

        for (const item of catItems) {
          const nameStr = item.name.substring(0, 11).padEnd(12, ' ');
          let noteText = item.note ? item.note.substring(0, 14) : '--';
          const noteStr = noteText.padEnd(15, ' ');
          const qtyStr = item.qty.toString().padStart(5, ' ');
          await wT(`${nameStr}${noteStr}${qtyStr}\n`);
        }
        await wT("--------------------------------\n");
        await w(centerAlign);
        await wT("\n\n\n\n\n");
        await w(cutPaper);
      }
    } else {
      // Standard Print (Bill or Single KOT)
      await w(init);
      await w(centerAlign);

      const now = new Date();
      const dateStr = now.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' }).replace(/\//g, '/');
      const timeStr = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

      if (type === 'BILL') {
        if (settings.billLayout === 'bold') await w(boldOn);
        await wT(`${settings.billHeader || 'Tyde Cafe'}\n`);
        if (settings.billLayout === 'bold') await w(boldOff);
        await wT("Nerul Ferry Terminal\n");
        await wT("--------------------------------\n");
        await w(leftAlign);
        await wT("Name:\n");
        await wT("--------------------------------\n");
        const paddedDate = `Date: ${dateStr}`.padEnd(19, ' ');
        const paddedOrder = `${orderData.orderType || 'Dine In'}: ${orderData.tableName || 'B4'}`.padEnd(13, ' ');
        if (settings.billLayout === 'bold') {
          await w(boldOn);
          await wT(`${paddedDate}${paddedOrder}\n`);
          await w(boldOff);
        } else {
          await wT(`${paddedDate}`);
          await w(boldOn);
          await wT(`${paddedOrder}\n`);
          await w(boldOff);
        }

        await wT(`${timeStr}\n`);
        const billNo = Math.floor(1000 + Math.random() * 9000);
        await wT(`Cashier: biller   Bill No.: ${billNo}\n`);
        await wT("--------------------------------\n");
        await wT("Item              Qty  Price Amount\n");
        await wT("--------------------------------\n");

        let totalQty = 0;
        for (const item of orderData.items) {
          totalQty += item.qty;
          const nameStr = item.name.substring(0, 16).padEnd(17, ' ');
          const qtyStr = item.qty.toString().padStart(3, ' ');
          const priceStr = item.price.toFixed(2).padStart(6, ' ');
          const amtStr = (item.price * item.qty).toFixed(2).padStart(7, ' ');
          await wT(`${nameStr}${qtyStr} ${priceStr} ${amtStr}\n`);
        }
        await wT("--------------------------------\n");
        await w(rightAlign);

        const subtotalStr = (orderData.subtotal || 0).toFixed(2).padStart(8, ' ');
        await wT(` Total Qty: ${totalQty.toString().padEnd(3, ' ')}   Sub   ${subtotalStr}\n`);
        await wT(`                  Total          \n`);

        const serviceChargeStr = (orderData.serviceCharge || 0).toFixed(2).padStart(8, ' ');
        await wT(` Service Charge          ${serviceChargeStr}\n`);
        await wT(`     (Optional)                  \n`);

        await wT("--------------------------------\n");

        const roundOffStr = (orderData.roundOff > 0 ? '+' : '') + (orderData.roundOff || 0).toFixed(2).padStart(4, ' ');
        await wT(`              Round off     ${roundOffStr}\n`);

        await w(boldOn);
        const gTotalStr = (orderData.grandTotal || 0).toFixed(2).padStart(8, ' ');
        await wT(`      Grand Total     Rs.${gTotalStr}\n`);
        await w(boldOff);
        await wT("--------------------------------\n");
        await w(centerAlign);
        await wT(`   ${settings.billFooter || 'Sea you soon -- under the moon'} \n`);

      } else {
        // --- KOT PRINTING ---
        if (settings.billLayout === 'bold') await w(boldOn);
        await wT(`${dateStr} ${timeStr}\n`);

        const kotNo = Math.floor(1 + Math.random() * 99);
        await wT(`KOT - ${kotNo}\n`);

        await wT(`${orderData.orderType || 'Dine In'}\n`);
        await wT(`Table No: ${orderData.tableName}\n`);
        if (settings.billLayout === 'bold') await w(boldOff);

        if (settings.billLayout !== 'minimal') {
          await wT("--------------------------------\n");
        } else {
          await wT("\n");
        }

        await w(leftAlign);

        if (settings.billLayout === 'compact' || settings.billLayout === 'minimal') {
          if (settings.billLayout !== 'minimal') await wT("Item           Qty\n--------------------------------\n");
          for (const item of orderData.items) {
            const nameStr = item.name.substring(0, 15).padEnd(16, ' ');
            await wT(`${nameStr}${item.qty}\n`);
          }
        } else if (settings.billLayout === 'modern') {
          await wT("Qty   Item\n--------------------------------\n");
          for (const item of orderData.items) {
            const qtyStr = item.qty.toString().padEnd(6, ' ');
            const nameStr = item.name.substring(0, 25);
            await wT(`${qtyStr}${nameStr}\n`);
          }
        } else if (settings.billLayout === 'bold') {
          await w(boldOn);
          await wT("ITEM                  QTY\n================================\n");
          for (const item of orderData.items) {
            const nameStr = item.name.substring(0, 20).padEnd(22, ' ');
            const qtyStr = item.qty.toString();
            await wT(`${nameStr}${qtyStr}\n`);
          }
          await w(boldOff);
          await wT("================================\n");
        } else {
          // standard layout matched perfectly to user provided image
          await wT("Item        Special Note   Qty\n");
          await wT("--------------------------------\n");
          for (const item of orderData.items) {
            const nameStr = item.name.substring(0, 11).padEnd(12, ' ');
            let noteText = item.note ? item.note.substring(0, 14) : '--';
            const noteStr = noteText.padEnd(15, ' ');
            const qtyStr = item.qty.toString().padStart(5, ' ');
            await wT(`${nameStr}${noteStr}${qtyStr}\n`);
          }
        }

        if (settings.billLayout !== 'minimal' && settings.billLayout !== 'bold') {
          await wT("--------------------------------\n");
        }
      }

      // Only printing KOT layout per user request (no grand total or pricing footer)

      await wT("\n\n\n\n\n");
      await w(cutPaper);
    }

    writer.releaseLock();
    await port.close();
  } catch (error) {
    console.warn("Direct Printing Hardware Handshake Failed. Emulating instead.", error);

    // Fallback: Generate a simplified HTML representation for the browser print queue
    // tailored to 80mm thermal paper widths
    let printContent = `
      <div style="width: 80mm; font-family: 'Courier New', Courier, monospace; font-size: 14px; font-weight: bold; padding: 10px; color: #000; background: white;">
    `;

    const now = new Date();
    const dateStr = now.toLocaleDateString('en-GB');
    const timeStr = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

    printContent += `<div style="text-align: center; margin-bottom: 10px;">`;

    if (type === 'BILL') {
      printContent += `
          <h2 style="font-size: 20px; font-weight: 900; margin: 0 0 5px 0;">${settings.billHeader || 'Tyde Cafe'}</h2>
          <div style="font-size: 16px; font-weight: bold;">Nerul Ferry Terminal</div>
          <div>--------------------------------</div>
          <div style="text-align: left; font-size: 14px; font-weight: bold;">
            <div>Name: </div>
            <div>--------------------------------</div>
            <div>Date: ${dateStr}</div>
            <div>${orderData.orderType || 'Dine In'} : ${orderData.tableName || 'B4'}</div>
            <div>${timeStr}</div>
            <div>Bill No.: ${Math.floor(1000 + Math.random() * 9000)}</div>
          </div>
          <div>--------------------------------</div>
          <table style="width: 100%; text-align: left; font-size: 14px; font-weight: bold;">
            <tr style="border-bottom: 2px dashed black;">
              <th>Item</th>
              <th style="text-align: center;">Qty</th>
              <th style="text-align: right;">Amt</th>
            </tr>
        `;
      for (let item of orderData.items) {
        printContent += `<tr>
             <td style="padding-top: 4px;">${item.name}</td>
             <td style="text-align: center; padding-top: 4px;">${item.qty}</td>
             <td style="text-align: right; padding-top: 4px;">${(item.price * item.qty).toFixed(2)}</td>
           </tr>`;
      }
      printContent += `
          </table>
          <div>--------------------------------</div>
          <div style="text-align: right; font-size: 14px; font-weight: bold;">
            <div>Subtotal: ${(orderData.subtotal || 0).toFixed(2)}</div>
            <div>S.C.: ${(orderData.serviceCharge || 0).toFixed(2)}</div>
            <div>Round: ${(orderData.roundOff || 0).toFixed(2)}</div>
            <h3 style="margin: 8px 0; font-size: 18px; font-weight: 900;">Total: Rs.${(orderData.grandTotal || 0).toFixed(2)}</h3>
          </div>
          <div>--------------------------------</div>
          <div style="font-size: 14px; font-weight: bold;">${settings.billFooter || 'Sea you soon -- under the moon'}</div>
        `;

    } else { // KOT
      printContent += `
          <div style="font-size: 14px; font-weight: bold;">${dateStr} ${timeStr}</div>
          <h2 style="margin: 5px 0; font-size: 22px; font-weight: 900;">KOT - ${Math.floor(1 + Math.random() * 99)}</h2>
          <div style="font-size: 16px; font-weight: bold;">${orderData.orderType || 'Dine In'}</div>
          <div style="font-size: 16px; font-weight: bold;">Table No: ${orderData.tableName}</div>
          <div>--------------------------------</div>
          <table style="width: 100%; text-align: left; font-size: 16px; font-weight: bold;">
            <tr>
              <th style="width: 70%">Item</th>
              <th style="text-align: right;">Qty</th>
            </tr>
            <tr><td colspan="2">--------------------------------</td></tr>
        `;
      for (let item of orderData.items) {
        printContent += `<tr>
             <td style="padding-top: 6px;">
              <div>${item.name}</div>
              ${item.note ? `<div style="font-size: 12px; font-style: italic; color: #333;">*${item.note}</div>` : ''}
             </td>
             <td style="text-align: right; padding-top: 6px;">${item.qty}</td>
           </tr>`;
      }
      printContent += `
          </table>
          <div>--------------------------------</div>
        `;
    }

    printContent += `</div></div>`;

    // Create iframe to isolate print styles
    const printFrame = document.createElement('iframe');
    printFrame.style.position = 'fixed';
    printFrame.style.right = '0';
    printFrame.style.bottom = '0';
    printFrame.style.width = '0';
    printFrame.style.height = '0';
    printFrame.style.border = '0';

    document.body.appendChild(printFrame);

    const frameDoc = printFrame.contentWindow.document;
    frameDoc.open();
    frameDoc.write(`
      <html>
        <head>
          <style>
             @page { margin: 0; size: 80mm auto; }
             body { margin: 0; }
          </style>
        </head>
        <body>
          ${printContent}
        </body>
      </html>
    `);
    frameDoc.close();

    // Focus and print the iframe
    printFrame.contentWindow.focus();
    printFrame.contentWindow.print();

    // Cleanup
    setTimeout(() => {
      document.body.removeChild(printFrame);
    }, 1000);
  }
};


const OrderingSystem = ({ table, initialOrder, onBack, onSaveOrder, onSettleTable, MENU_ITEMS, CATEGORIES }) => {
  const [cart, setCart] = useState(initialOrder || []);
  const [activeCat, setActiveCat] = useState("Quick Snack's");
  const [searchQuery, setSearchQuery] = useState('');

  // Modifiers & Discount State
  const [showModifierModal, setShowModifierModal] = useState(null);
  const [showDiscountModal, setShowDiscountModal] = useState(false);
  const [discountAmt, setDiscountAmt] = useState(0);
  const [discountAuth, setDiscountAuth] = useState('');

  const [discountInput, setDiscountInput] = useState('');
  const [managerInput, setManagerInput] = useState('');

  const [paymentMethod, setPaymentMethod] = useState('Cash');
  const [isPaid, setIsPaid] = useState(false);
  const [splitWays, setSplitWays] = useState(1);

  // Calculations
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const taxableAmount = Math.max(0, subtotal - discountAmt);
  const serviceCharge = taxableAmount * 0.05; // 5% optional service charge
  const rawTotal = taxableAmount + serviceCharge;
  const grandTotal = Math.round(rawTotal);
  const roundOff = grandTotal - rawTotal;

  const handleApplyDiscount = () => {
    if (managerInput === '9999') {
      const amt = parseFloat(discountInput);
      if (!isNaN(amt) && amt >= 0 && amt <= subtotal) {
        setDiscountAmt(amt);
        setDiscountAuth('Manager (9999)');
        setShowDiscountModal(false);
        setDiscountInput('');
        setManagerInput('');
      } else {
        alert("Enter a valid discount amount less than the subtotal.");
      }
    } else {
      alert("Invalid Manager PIN! Authentication Failed.");
    }
  };

  const handleItemClick = (item) => {
    if (!item.inStock) return;
    if (item.modifiers && item.modifiers.length > 0) {
      setShowModifierModal(item);
    } else {
      addToCart(item);
    }
  };

  const addToCart = (item, selectedModifier = null) => {
    setCart(prev => {
      // If item has a specific price modifier like (+₹30), parse and add it
      let finalPrice = item.price;
      let nameNote = '';
      if (selectedModifier) {
        nameNote = ` - ${selectedModifier}`;
        const priceMatch = selectedModifier.match(/\(\+₹(\d+)\)/);
        if (priceMatch) {
          finalPrice += parseInt(priceMatch[1], 10);
        }
      }

      const cartItemId = `${item.id}${selectedModifier ? `-${selectedModifier}` : ''}`;
      const existing = prev.find(i => i.cartItemId === cartItemId);

      if (existing) {
        return prev.map(i => i.cartItemId === cartItemId ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { ...item, cartItemId, name: item.name + nameNote, price: finalPrice, qty: 1 }];
    });
    setShowModifierModal(null);
  };

  const updateQty = (cartItemId, delta) => {
    setCart(prev => {
      return prev.map(i => {
        if (i.cartItemId === cartItemId) {
          return { ...i, qty: Math.max(0, i.qty + delta) };
        }
        return i;
      }).filter(i => i.qty > 0);
    });
  };

  const handleAction = async (actionType) => {
    const newStatus = actionType.includes('KOT') ? 'kot' : actionType.includes('Print') ? 'printed' : 'running';

    if (isPaid && actionType.includes('Save')) {
      // Settle and clear table with full analytics data
      onSettleTable(table.id, { cart, subtotal, discountAmt, discountAuth, taxes: 0, grandTotal, paymentMethod, timestamp: new Date().toISOString() });
    } else {
      // Just save order state
      onSaveOrder(table.id, cart, newStatus);
    }

    if (actionType.includes('Print')) {
      await printPosToSerial({
        tableName: table?.name || 'Walk-In',
        items: cart,
        subtotal: subtotal,
        serviceCharge: serviceCharge,
        roundOff: roundOff,
        grandTotal: grandTotal,
        orderType: table?.type === 'Delivery' ? 'Delivery' : table?.type === 'Takeaway' ? 'Pick Up' : 'Dine In'
      }, actionType === 'Print Bill' || actionType.includes('Bill') ? 'BILL' : 'KOT');
    }
  };

  const filteredItems = MENU_ITEMS.filter(item =>
    (activeCat === 'All' || item.cat === activeCat) &&
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="animate-fade-in" style={{ flex: 1, display: 'flex', background: '#f3f4f6', position: 'relative' }}>

      {/* Category Sidebar */}
      <div className="menu-sidebar no-print no-scrollbar">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            className={`menu-cat-btn ${activeCat === cat ? 'active' : ''}`}
            onClick={() => setActiveCat(cat)}
            style={{ fontWeight: activeCat === cat ? '700' : '500' }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Main Item Grid Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', borderRight: '1px solid #e5e7eb' }}>
        <div style={{ padding: '8px 12px', background: 'white', borderBottom: '1px solid #e5e7eb' }} className="no-print">
          <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', padding: '6px 12px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Search size={14} color="#6b7280" />
            <input
              type="text"
              placeholder="Search item"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ background: 'transparent', border: 'none', outline: 'none', width: '100%', fontSize: '13px' }}
            />
          </div>
        </div>

        <div className="items-grid no-scrollbar" style={{ overflowY: 'auto', flex: 1, background: '#f3f4f6' }}>
          {filteredItems.map(item => (
            <div
              key={item.id}
              className={`item-card ${item.type}`}
              onClick={() => handleItemClick(item)}
              style={{
                background: 'white',
                opacity: item.inStock ? 1 : 0.5,
                cursor: item.inStock ? 'pointer' : 'not-allowed'
              }}
            >
              <div style={{ fontSize: '12px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                {item.name} {item.modifiers && <span style={{ color: '#94161c', fontSize: '10px' }}>*</span>}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                <div style={{ fontSize: '12px', fontWeight: 'bold' }}>₹{item.price}</div>
                {!item.inStock && <div style={{ fontSize: '10px', color: 'red', fontWeight: 'bold' }}>Out of Stock</div>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Billing Panel */}
      <div className="billing-panel no-print">
        <div className="billing-tabs">
          <button className={`billing-tab ${table?.type !== 'Delivery' && table?.type !== 'Takeaway' ? 'active' : ''}`}>Dine in</button>
          <button className={`billing-tab ${table?.type === 'Delivery' ? 'active' : ''}`}>Delivery</button>
          <button className={`billing-tab ${table?.type === 'Takeaway' ? 'active' : ''}`}>Pick Up</button>
        </div>

        <div style={{ padding: '8px 12px', display: 'flex', borderBottom: '1px solid #e5e7eb', alignItems: 'center', gap: '12px' }}>
          <div style={{ border: '1px solid #94161c', color: '#94161c', padding: '2px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold' }}>
            {table?.name || 'Walk-In'}
          </div>
          <button onClick={onBack} style={{ background: 'transparent', border: 'none', fontSize: '11px', color: '#6b7280', cursor: 'pointer', textDecoration: 'underline' }}>
            {table && (String(table.id).startsWith('DEL-') || String(table.id).startsWith('TAK-')) ? 'Back to Online' : 'Back to Tables'}
          </button>
          <div style={{ marginLeft: 'auto', background: '#94161c', color: 'white', padding: '4px 10px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold' }}>
            {table?.type === 'Delivery' ? 'Delivery' : table?.type === 'Takeaway' ? 'Takeaway' : 'Dine In'}
          </div>
        </div>

        <div style={{ padding: '8px 12px', display: 'flex', fontSize: '10px', fontWeight: 'bold', color: '#9ca3af', borderBottom: '1px solid #e5e7eb' }}>
          <div style={{ flex: 1 }}>ITEMS</div>
          <div style={{ width: '80px', textAlign: 'center' }}>QTY.</div>
          <div style={{ width: '80px', textAlign: 'right' }}>PRICE</div>
        </div>

        {/* Cart Items */}
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {cart.length === 0 ? (
            <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', opacity: 0.5 }}>
              <Utensils size={48} color="#d1d5db" />
              <div style={{ fontWeight: 'bold', fontSize: '14px', marginTop: '10px' }}>No Item Selected</div>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.cartItemId} style={{ padding: '8px 12px', display: 'flex', alignItems: 'center', borderBottom: '1px solid #f9fafb' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '12px' }}>{item.name}</div>
                  {item.note && <div style={{ fontSize: '10px', color: '#94161c', fontStyle: 'italic' }}>* {item.note}</div>}
                  <div style={{ fontSize: '10px', color: '#9ca3af', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    ₹{item.price} /ea
                    <button style={{ border: 'none', background: 'transparent', cursor: 'pointer', opacity: 0.6, padding: 0 }}
                      onClick={() => {
                        const note = prompt('Enter custom instructions for kitchen:');
                        if (note !== null) {
                          setCart(prev => prev.map(i => i.cartItemId === item.cartItemId ? { ...i, note } : i));
                        }
                      }}>
                      <MessageSquare size={12} color="#94161c" />
                    </button>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '80px', justifyContent: 'center' }}>
                  <button style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} onClick={() => updateQty(item.cartItemId, -1)}><Minus size={12} /></button>
                  <span style={{ fontSize: '12px', fontWeight: '500' }}>{item.qty}</span>
                  <button style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} onClick={() => updateQty(item.cartItemId, 1)}><Plus size={12} /></button>
                </div>
                <div style={{ width: '80px', textAlign: 'right', fontSize: '12px', fontWeight: 'bold' }}>₹{item.price * item.qty}</div>
              </div>
            ))
          )}
        </div>

        {/* Financials & Footer */}
        <div style={{ background: '#fdf2f2', borderTop: '1px solid #fee2e2' }}>
          {/* Advanced Tax & Discount Section */}
          <div style={{ padding: '12px', fontSize: '12px', color: '#6b7280', borderBottom: '1px solid #fee2e2' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span style={{ fontWeight: '500' }}>Subtotal:</span>
              <span style={{ fontWeight: '600', color: '#374151' }}>₹{subtotal.toFixed(2)}</span>
            </div>
            {discountAmt > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', color: '#10b981' }}>
                <span style={{ fontWeight: '500' }}>Discount (Custom):</span>
                <span style={{ fontWeight: '600' }}>-₹{discountAmt.toFixed(2)}</span>
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span style={{ fontWeight: '500' }}>Service Charge (Optional):</span>
              <span style={{ fontWeight: '600', color: '#374151' }}>₹{serviceCharge.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontWeight: '500' }}>Round off:</span>
              <span style={{ fontWeight: '600', color: '#374151' }}>{roundOff > 0 ? '+' : ''}{roundOff.toFixed(2)}</span>
            </div>
          </div>

          <div style={{ padding: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #fee2e2' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <button
                className="btn-pp"
                style={{ background: discountAmt > 0 ? '#10b981' : 'transparent', color: discountAmt > 0 ? 'white' : '#94161c', border: discountAmt > 0 ? 'none' : '1px solid #94161c', fontSize: '11px', padding: '6px 12px', transition: 'all 0.2s', fontWeight: '600', width: 'fit-content' }}
                onClick={() => discountAmt > 0 ? setDiscountAmt(0) : setShowDiscountModal(true)}
              >
                {discountAmt > 0 ? 'Remove Discount' : 'Custom Discount'}
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '10px', color: '#6b7280', fontWeight: 'bold' }}>SPLIT:</span>
                <button style={{ border: '1px solid #e5e7eb', background: 'white', padding: '2px 8px', borderRadius: '4px', cursor: 'pointer' }} onClick={() => setSplitWays(Math.max(1, splitWays - 1))}>-</button>
                <span style={{ fontSize: '12px', fontWeight: 'bold', width: '12px', textAlign: 'center' }}>{splitWays}</span>
                <button style={{ border: '1px solid #e5e7eb', background: 'white', padding: '2px 8px', borderRadius: '4px', cursor: 'pointer' }} onClick={() => setSplitWays(splitWays + 1)}>+</button>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '11px', color: '#6b7280', fontWeight: '600' }}>NET PAYABLE</span>
              <div style={{ fontSize: '20px', fontWeight: '900', color: '#94161c' }}>₹{grandTotal.toFixed(2)}</div>
              {splitWays > 1 && (
                <div style={{ fontSize: '11px', color: '#6b7280', fontWeight: 'bold' }}>
                  (₹{(grandTotal / splitWays).toFixed(2)} / each)
                </div>
              )}
            </div>
          </div>

          <div style={{ padding: '8px' }}>
            <div className="payment-chip-row">
              {['Cash', 'Card', 'UPI'].map(method => (
                <div
                  key={method}
                  className={`payment-chip ${paymentMethod === method ? 'selected' : ''}`}
                  onClick={() => setPaymentMethod(method)}
                >
                  {method === 'Cash' ? <Banknote size={14} color={paymentMethod === 'Cash' ? "#94161c" : "#6b7280"} /> :
                    method === 'Card' ? <CreditCard size={14} color={paymentMethod === 'Card' ? "#94161c" : "#6b7280"} /> :
                      <Smartphone size={14} color={paymentMethod === 'UPI' ? "#94161c" : "#6b7280"} />}
                  {method}
                </div>
              ))}
            </div>

            <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }} onClick={() => setIsPaid(!isPaid)}>
              <input type="checkbox" checked={isPaid} readOnly />
              <span style={{ fontSize: '11px', color: '#374151', fontWeight: 'bold' }}>Mark as Paid to Free Table</span>
            </div>
          </div>

          <div className="footer-btn-grid">
            <button className="btn-maroon" onClick={() => handleAction('Save')}>Save</button>
            <button className="btn-maroon" onClick={() => handleAction('Print Bill')}>Print Bill</button>
            <button className="btn-grey" onClick={() => handleAction('KOT')}>KOT</button>
            <button className="btn-grey" style={{ background: '#374151' }} onClick={() => handleAction('KOT & Print')}>KOT & Print</button>
          </div>
        </div>
      </div>

      {/* Modifier Modal Overlay */}
      {showModifierModal && (
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: 'white', padding: '24px', borderRadius: '8px', width: '300px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}>
            <h3 style={{ marginBottom: '16px', fontWeight: 'bold' }}>Attributes for {showModifierModal.name}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {showModifierModal.modifiers.map(mod => (
                <button
                  key={mod}
                  onClick={() => addToCart(showModifierModal, mod)}
                  style={{ padding: '12px', border: '1px solid #e5e7eb', borderRadius: '4px', textAlign: 'left', background: '#f9fafb', cursor: 'pointer' }}
                >
                  {mod}
                </button>
              ))}
              <button
                onClick={() => addToCart(showModifierModal, 'Regular')}
                style={{ padding: '12px', border: '1px solid #e5e7eb', borderRadius: '4px', textAlign: 'left', background: '#f9fafb', cursor: 'pointer' }}
              >
                Regular (No Mods)
              </button>
            </div>
            <button
              onClick={() => setShowModifierModal(null)}
              style={{ padding: '8px', marginTop: '16px', width: '100%', border: 'none', background: 'transparent', color: 'red', cursor: 'pointer' }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      {/* Discount Modal Overlay */}
      {showDiscountModal && (
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 60, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: 'white', padding: '24px', borderRadius: '8px', width: '300px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}>
            <h3 style={{ marginBottom: '16px', fontWeight: 'bold', borderBottom: '1px solid #fee2e2', paddingBottom: '8px', color: '#94161c' }}>Manager Override Required</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
              <input
                type="number"
                placeholder="Discount Amount (₹)"
                value={discountInput}
                onChange={(e) => setDiscountInput(e.target.value)}
                style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #d1d5db', fontSize: '14px', outline: 'none' }}
              />
              <input
                type="password"
                placeholder="Manager PIN (e.g. 9999)"
                value={managerInput}
                onChange={(e) => setManagerInput(e.target.value)}
                style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #d1d5db', fontSize: '14px', outline: 'none' }}
              />
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={handleApplyDiscount} style={{ flex: 1, padding: '10px', background: '#94161c', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>Authenticate</button>
              <button onClick={() => setShowDiscountModal(false)} style={{ flex: 1, padding: '10px', background: '#f3f4f6', color: '#374151', border: '1px solid #d1d5db', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* --- ANALYTICS DASHBOARD --- */
const AnalyticsDashboard = ({ orderHistory, menuItems }) => {
  const totalSales = orderHistory.reduce((acc, order) => acc + order.grandTotal, 0);
  const totalOrders = orderHistory.length;
  const avgBill = totalOrders > 0 ? (totalSales / totalOrders).toFixed(2) : '0.00';

  const payments = { Cash: 0, Card: 0, UPI: 0 };
  const categories = {};
  const itemsMap = {};
  const hoursData = {};

  let totalDiscounts = 0;

  orderHistory.forEach(order => {
    payments[order.paymentMethod] = (payments[order.paymentMethod] || 0) + order.grandTotal;

    // Tracking Discounts for Alerts
    totalDiscounts += order.discountAmt || 0;

    // Peak hour
    const hour = new Date(order.timestamp).getHours();
    const formattedHour = hour % 12 || 12;
    const ampm = hour < 12 ? 'AM' : 'PM';
    const hourKey = `${formattedHour}:00 ${ampm} - ${formattedHour + 1}:00 ${ampm}`;
    hoursData[hourKey] = (hoursData[hourKey] || 0) + 1;

    order.cart.forEach(item => {
      // Category 
      categories[item.cat] = (categories[item.cat] || 0) + (item.price * item.qty);
      // Items 
      if (!itemsMap[item.id]) itemsMap[item.id] = { name: item.name, qty: 0, revenue: 0 };
      itemsMap[item.id].qty += item.qty;
      itemsMap[item.id].revenue += (item.price * item.qty);
    });
  });

  const topItems = Object.values(itemsMap).sort((a, b) => b.qty - a.qty).slice(0, 5);
  const topCategories = Object.entries(categories).sort((a, b) => b[1] - a[1]);
  const peakHoursArr = Object.entries(hoursData).sort((a, b) => b[1] - a[1]);

  // --- Smart Alerts Logic ---
  const alerts = [];

  // 1. Discount Alert: Warn if total daily discount exceeds 5% of gross sales (custom threshold)
  const grossSales = totalSales + totalDiscounts;
  if (totalDiscounts > (grossSales * 0.05) && grossSales > 0) {
    alerts.push(`High Discount Rate: ₹${totalDiscounts.toFixed(2)} Given. Review promotional limits.`);
  }

  // 2. Out of Stock / Low Stock Simulation Alert
  const lowStockItem = menuItems.find(i => !i.inStock);
  if (lowStockItem) {
    alerts.push(`Inventory Warning: "${lowStockItem.name}" is currently marked Out of Stock. Supplier action required.`);
  }

  // 3. Performance Drop (Simulated 18% drop for specific item vs yesterday)
  // In a real app, this compares to historical DB data. We calculate from existing items dynamically.
  if (itemsMap[2] && itemsMap[2].qty < 5) { // Assuming Item 2 is 'Chicken Lollipop'
    alerts.push(`Performance: "Chicken Lollipop" volume is lower than average moving velocity today.`);
  }

  const discountLogs = orderHistory.filter(o => o.discountAmt > 0).map(o => ({
    id: o.id,
    tableId: o.tableId,
    amount: o.discountAmt,
    authorizer: o.discountAuth,
    time: new Date(o.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }));

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '24px', background: '#f9fafb' }} className="animate-fade-in no-scrollbar">
      <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1f2937', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <BarChart3 size={20} color="#94161c" /> Business Analytics
      </h2>

      {/* Smart Alerts Banner Area */}
      {alerts.length > 0 && (
        <div style={{ marginBottom: '24px', background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '8px', padding: '16px' }}>
          <h3 style={{ fontSize: '13px', fontWeight: 'bold', color: '#b45309', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <AlertTriangle size={16} color="#d97706" /> Smart Insights (Today)
          </h3>
          <ul style={{ listStyleType: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {alerts.map((alert, i) => (
              <li key={i} style={{ fontSize: '13px', color: '#92400e', background: 'rgba(253, 230, 138, 0.4)', padding: '8px 12px', borderRadius: '4px' }}>
                • {alert}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Top Value Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <div style={{ background: 'white', padding: '20px', borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <div style={{ color: '#6b7280', fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Daily Sales (Net)</div>
          <div style={{ fontSize: '24px', fontWeight: '900', color: '#94161c', marginTop: '8px' }}>₹{totalSales.toFixed(2)}</div>
        </div>
        <div style={{ background: 'white', padding: '20px', borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <div style={{ color: '#6b7280', fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Total Orders</div>
          <div style={{ fontSize: '24px', fontWeight: '900', color: '#374151', marginTop: '8px' }}>{totalOrders}</div>
        </div>
        <div style={{ background: 'white', padding: '20px', borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <div style={{ color: '#6b7280', fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Avg Bill Value</div>
          <div style={{ fontSize: '24px', fontWeight: '900', color: '#374151', marginTop: '8px' }}>₹{avgBill}</div>
        </div>
        <div style={{ background: 'white', padding: '20px', borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <div style={{ color: '#6b7280', fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Total Discounts Auth</div>
          <div style={{ fontSize: '24px', fontWeight: '900', color: '#374151', marginTop: '8px' }}>₹{totalDiscounts.toFixed(2)}</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', marginBottom: '24px' }}>
        {/* Payment Split */}
        <div style={{ background: 'white', padding: '20px', borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}><PieChart size={16} color="#4b5563" /> Payment Split</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {Object.entries(payments).map(([method, amount]) => (
              <div key={method} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '8px', borderBottom: '1px solid #f3f4f6' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: '500', color: '#4b5563' }}>
                  {method === 'Cash' ? <Banknote size={14} color="#10b981" /> : method === 'Card' ? <CreditCard size={14} color="#3b82f6" /> : <Smartphone size={14} color="#8b5cf6" />}
                  {method}
                </span>
                <span style={{ fontSize: '14px', fontWeight: 'bold' }}>₹{amount.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Peak Hours */}
        <div style={{ background: 'white', padding: '20px', borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}><Clock size={16} color="#4b5563" /> Peak Hour Analysis (Orders)</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {peakHoursArr.slice(0, 5).map(([hour, count]) => (
              <div key={hour} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '8px', borderBottom: '1px solid #f3f4f6' }}>
                <span style={{ fontSize: '13px', fontWeight: '500', color: '#4b5563' }}>{hour}</span>
                <span style={{ fontSize: '14px', fontWeight: 'bold', background: '#fdf2f2', color: '#94161c', padding: '2px 8px', borderRadius: '12px' }}>{count} Orders</span>
              </div>
            ))}
            {peakHoursArr.length === 0 && <span style={{ fontSize: '13px', color: '#9ca3af', fontStyle: 'italic' }}>No orders settled yet.</span>}
          </div>
        </div>

        {/* Discount Audit Trail */}
        <div style={{ background: 'white', padding: '20px', borderRadius: '8px', border: '1px solid #fecaca', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', color: '#b91c1c' }}><AlertTriangle size={16} color="#b91c1c" /> Discount Report</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', fontSize: '11px', fontWeight: 'bold', color: '#9ca3af', borderBottom: '1px solid #e5e7eb', paddingBottom: '4px' }}>
              <span style={{ flex: 1 }}>TIME & TABLE</span>
              <span style={{ width: '80px', textAlign: 'center' }}>AUTHORIZER</span>
              <span style={{ width: '60px', textAlign: 'right' }}>AMOUNT</span>
            </div>
            {discountLogs.map((log, idx) => (
              <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '8px', borderBottom: '1px solid #f3f4f6' }}>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#1f2937' }}>{log.tableId}</span>
                  <span style={{ fontSize: '10px', color: '#6b7280' }}>{log.time}</span>
                </div>
                <span style={{ width: '80px', textAlign: 'center', fontSize: '11px', fontWeight: 'bold', color: '#374151', background: '#f3f4f6', padding: '2px 4px', borderRadius: '4px' }}>{log.authorizer}</span>
                <span style={{ width: '60px', textAlign: 'right', fontSize: '13px', fontWeight: 'bold', color: '#94161c' }}>-₹{log.amount}</span>
              </div>
            ))}
            {discountLogs.length === 0 && <span style={{ fontSize: '13px', color: '#9ca3af', fontStyle: 'italic' }}>No overriding discounts have been authenticated today.</span>}
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        {/* Category Sales */}
        <div style={{ background: 'white', padding: '20px', borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}><BarChart3 size={16} color="#4b5563" /> Category-wise Sales</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {topCategories.slice(0, 5).map(([cat, amount]) => (
              <div key={cat} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '8px', borderBottom: '1px solid #f3f4f6' }}>
                <span style={{ fontSize: '13px', fontWeight: '500', color: '#4b5563' }}>{cat}</span>
                <span style={{ fontSize: '14px', fontWeight: 'bold' }}>₹{amount.toFixed(2)}</span>
              </div>
            ))}
            {topCategories.length === 0 && <span style={{ fontSize: '13px', color: '#9ca3af', fontStyle: 'italic' }}>No orders settled yet.</span>}
          </div>
        </div>

        {/* Top Items */}
        <div style={{ background: 'white', padding: '20px', borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}><TrendingUp size={16} color="#4b5563" /> Top Selling Items (Qty & Rev)</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', fontSize: '11px', fontWeight: 'bold', color: '#9ca3af', borderBottom: '1px solid #e5e7eb', paddingBottom: '4px' }}>
              <span style={{ flex: 1 }}>ITEM</span>
              <span style={{ width: '40px', textAlign: 'center' }}>QTY</span>
              <span style={{ width: '60px', textAlign: 'right' }}>REVENUE</span>
            </div>
            {topItems.map((item, idx) => (
              <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '8px', borderBottom: '1px solid #f3f4f6' }}>
                <span style={{ flex: 1, fontSize: '13px', fontWeight: '500', color: '#1f2937' }}>{item.name}</span>
                <span style={{ width: '40px', textAlign: 'center', fontSize: '13px', fontWeight: 'bold', color: '#4b5563' }}>{item.qty}</span>
                <span style={{ width: '60px', textAlign: 'right', fontSize: '13px', fontWeight: 'bold', color: '#94161c' }}>₹{item.revenue}</span>
              </div>
            ))}
            {topItems.length === 0 && <span style={{ fontSize: '13px', color: '#9ca3af', fontStyle: 'italic' }}>No orders settled yet.</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

/* --- DAY CLOSE WIZARD --- */
const DayCloseWizard = ({ orderHistory, onCompleteDayClose }) => {
  const [cashCount, setCashCount] = useState('');
  const [managerPin, setManagerPin] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);

  const payments = { Cash: 0, Card: 0, UPI: 0 };
  let totalDiscounts = 0;

  orderHistory.forEach(order => {
    payments[order.paymentMethod] = (payments[order.paymentMethod] || 0) + order.grandTotal;
    totalDiscounts += order.discountAmt || 0;
  });

  const totalExpectedSales = payments.Cash + payments.Card + payments.UPI;
  const cashDifference = parseFloat(cashCount || 0) - payments.Cash;

  const handleClose = () => {
    if (managerPin !== '9999') {
      alert("Invalid Manager PIN. Day Close aborted.");
      return;
    }
    if (cashCount === '') {
      alert("Please enter the physical cash counted in the drawer.");
      return;
    }
    setIsCompleted(true);
  };

  if (isCompleted) {
    return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#f9fafb', padding: '20px' }} className="animate-fade-in">
        <div style={{ background: 'white', padding: '40px', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', textAlign: 'center', maxWidth: '400px' }}>
          <CheckSquare size={48} color="#10b981" style={{ margin: '0 auto 16px' }} />
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937', marginBottom: '8px' }}>Day Closed Successfully</h2>
          <p style={{ color: '#6b7280', marginBottom: '24px', fontSize: '14px' }}>All tables have been cleared and reports are saved. The system is ready for the next shift.</p>
          <button
            onClick={onCompleteDayClose}
            style={{ width: '100%', padding: '12px', background: '#94161c', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}
          >
            Start Fresh Shift
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ flex: 1, display: 'flex', justifyContent: 'center', padding: '30px', background: '#f9fafb', overflowY: 'auto' }} className="animate-fade-in no-scrollbar">
      <div style={{ background: 'white', padding: '32px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', width: '100%', maxWidth: '600px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Sunset size={28} color="#94161c" /> End of Day Settlement (Z-Report)
        </h2>
        <p style={{ color: '#6b7280', marginBottom: '32px', fontSize: '14px' }}>Validate your cash drawer before wiping the system for the next day. This action cannot be undone.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '32px' }}>
          <div style={{ background: '#f3f4f6', padding: '16px', borderRadius: '8px' }}>
            <div style={{ fontSize: '12px', color: '#6b7280', fontWeight: 'bold' }}>SYSTEM NET SALES</div>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937' }}>₹{totalExpectedSales.toFixed(2)}</div>
          </div>
          <div style={{ background: '#f3f4f6', padding: '16px', borderRadius: '8px' }}>
            <div style={{ fontSize: '12px', color: '#6b7280', fontWeight: 'bold' }}>TOTAL DISCOUNTS GIVEN</div>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#94161c' }}>₹{totalDiscounts.toFixed(2)}</div>
          </div>
          <div style={{ background: '#f5f3ff', padding: '16px', borderRadius: '8px' }}>
            <div style={{ fontSize: '12px', color: '#7c3aed', fontWeight: 'bold' }}>UPI / DIGITAL</div>
            <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#5b21b6' }}>₹{payments.UPI.toFixed(2)}</div>
          </div>
          <div style={{ background: '#eff6ff', padding: '16px', borderRadius: '8px' }}>
            <div style={{ fontSize: '12px', color: '#2563eb', fontWeight: 'bold' }}>CREDIT/DEBIT CARDS</div>
            <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#1d4ed8' }}>₹{payments.Card.toFixed(2)}</div>
          </div>
        </div>

        <div style={{ borderTop: '2px dashed #e5e7eb', margin: '32px 0' }}></div>

        <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#1f2937', marginBottom: '16px' }}>Cash Drawer Verification</h3>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', padding: '16px', background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: '8px' }}>
          <div>
            <div style={{ fontSize: '12px', color: '#059669', fontWeight: 'bold' }}>SYSTEM EXPECTED CASH</div>
            <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#065f46' }}>₹{payments.Cash.toFixed(2)}</div>
          </div>
          <Banknote size={32} color="#059669" opacity={0.3} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', color: '#374151', marginBottom: '8px' }}>Physical Cash Counted (₹)</label>
            <input
              type="number"
              value={cashCount}
              onChange={(e) => setCashCount(e.target.value)}
              placeholder="Enter cash found in drawer..."
              style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '16px', outline: 'none' }}
              autoComplete="off"
            />
          </div>

          {cashCount !== '' && (
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', background: cashDifference === 0 ? '#ecfdf5' : cashDifference > 0 ? '#eff6ff' : '#fef2f2', border: `1px solid ${cashDifference === 0 ? '#a7f3d0' : cashDifference > 0 ? '#bfdbfe' : '#fecaca'}`, borderRadius: '6px' }}>
              <span style={{ fontSize: '14px', fontWeight: 'bold', color: cashDifference === 0 ? '#059669' : cashDifference > 0 ? '#2563eb' : '#dc2626' }}>
                {cashDifference === 0 ? "Drawer is Perfectly Balanced" : cashDifference > 0 ? "Cash Overage (Surplus)" : "Cash Shortage (Missing)"}
              </span>
              <span style={{ fontSize: '14px', fontWeight: 'bold', color: cashDifference === 0 ? '#059669' : cashDifference > 0 ? '#2563eb' : '#dc2626' }}>
                {cashDifference > 0 ? "+" : ""}
                ₹{cashDifference.toFixed(2)}
              </span>
            </div>
          )}

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', color: '#374151', marginBottom: '8px' }}>Manager Authorization PIN</label>
            <input
              type="password"
              value={managerPin}
              onChange={(e) => setManagerPin(e.target.value)}
              placeholder="Enter PIN (e.g. 9999)"
              style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '16px', outline: 'none' }}
            />
          </div>
        </div>

        <button
          className="btn-pp btn-pp-primary"
          onClick={handleClose}
          style={{ width: '100%', padding: '14px', fontSize: '16px', background: '#94161c' }}
        >
          Confirm Day Close & Print Z-Report
        </button>
      </div>
    </div>
  );
};

export default function App() {
  const [view, setView] = useState('tables');
  const [selectedTable, setSelectedTable] = useState(null);

  // PERSISTENCE LOGIC
  const [tables, setTables] = useState(() => {
    const saved = localStorage.getItem('pos_tables_v2');
    return saved ? JSON.parse(saved) : INITIAL_TABLES;
  });

  const [orderHistory, setOrderHistory] = useState(() => {
    const saved = localStorage.getItem('pos_order_history');
    return saved ? JSON.parse(saved) : [];
  });

  const [nonTableOrders, setNonTableOrders] = useState(() => {
    const saved = localStorage.getItem('pos_nontable_orders_v2');
    return saved ? JSON.parse(saved) : [];
  });

  const [printerSettings, setPrinterSettings] = useState(() => {
    const saved = localStorage.getItem('pos_printer_settings');
    return saved ? JSON.parse(saved) : { billHeader: 'TYDE CAFE', billFooter: 'Thank You for Visiting!', categorizedKOT: false, billLayout: 'standard' };
  });

  const [menuItems, setMenuItems] = useState(() => {
    const saved = localStorage.getItem('pos_menu_items');
    return saved ? JSON.parse(saved) : INITIAL_MENU_ITEMS;
  });

  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem('pos_categories');
    return saved ? JSON.parse(saved) : INITIAL_CATEGORIES;
  });

  useEffect(() => {
    localStorage.setItem('pos_tables_v2', JSON.stringify(tables));
  }, [tables]);

  useEffect(() => {
    localStorage.setItem('pos_order_history', JSON.stringify(orderHistory));
  }, [orderHistory]);

  useEffect(() => {
    localStorage.setItem('pos_nontable_orders_v2', JSON.stringify(nonTableOrders));
  }, [nonTableOrders]);

  useEffect(() => {
    localStorage.setItem('pos_printer_settings', JSON.stringify(printerSettings));
  }, [printerSettings]);

  useEffect(() => {
    localStorage.setItem('pos_menu_items', JSON.stringify(menuItems));
  }, [menuItems]);

  useEffect(() => {
    localStorage.setItem('pos_categories', JSON.stringify(categories));
  }, [categories]);

  const clearTableFast = (tableId) => {
    setTables(prev => prev.map(t => {
      if (t.id === tableId) {
        return { ...t, order: [], status: 'blank' };
      }
      return t;
    }));
  };

  const handleSelectTable = (table) => {
    setSelectedTable(table);
    setView('ordering');
  };

  const handleCreateNonTableOrder = (type) => {
    const newId = `${type === 'Delivery' ? 'DEL' : 'TAK'}-${Math.floor(Math.random() * 9000) + 1000}`;
    const newOrder = {
      id: newId,
      name: `${newId}`,
      status: 'blank', // Will turn 'running' when items added
      type: type,
      order: [],
      phone: ''
    };
    setNonTableOrders(prev => [...prev, newOrder]);
    setSelectedTable(newOrder); // Using selectedTable state for both tables & nontables uniformly
    setView('ordering');
  };

  const saveOrderToTable = (tableId, orderItems, newStatus) => {
    if (String(tableId).startsWith('DEL-') || String(tableId).startsWith('TAK-')) {
      setNonTableOrders(prev => {
        const existing = prev.find(o => o.id === tableId);
        if (existing) {
          if (orderItems.length === 0) return prev.filter(o => o.id !== tableId);
          return prev.map(o => o.id === tableId ? { ...o, order: orderItems, status: newStatus } : o);
        }
        return prev;
      });
      setView('nontables');
    } else {
      setTables(prev => prev.map(t => {
        if (t.id === tableId) {
          return {
            ...t,
            order: orderItems,
            status: orderItems.length === 0 ? 'blank' : newStatus
          };
        }
        return t;
      }));
      setView('tables');
    }
    setSelectedTable(null);
  };

  const settleTable = (tableId, orderDetails) => {
    if (orderDetails && orderDetails.cart && orderDetails.cart.length > 0) {
      setOrderHistory(prev => [...prev, {
        id: Date.now().toString(),
        tableId,
        ...orderDetails
      }]);
    }

    if (String(tableId).startsWith('DEL-') || String(tableId).startsWith('TAK-')) {
      // Remove settled external order entirely from "running" state
      setNonTableOrders(prev => prev.filter(o => o.id !== tableId));
      setView('nontables');
    } else {
      setTables(prev => prev.map(t => {
        if (t.id === tableId) {
          return { ...t, order: [], status: 'blank' }; // Mark as blank/paid
        }
        return t;
      }));
      setView('tables');
    }
    setSelectedTable(null);
  };

  const markOrderReady = (order) => {
    saveOrderToTable(order.id, order.order, 'printed')
    alert(`Order for ${order.name} marked as ready! Front-stage notified.`);
    setView('kds')
  };

  return (
    <div className="app-container">
      <TopHeader onViewChange={setView} />

      <main style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {view === 'tables' && (
          <TableManagement tables={tables} onSelectTable={handleSelectTable} onClearTable={clearTableFast} />
        )}
        {view === 'nontables' && (
          <NonTableManagement orders={nonTableOrders} onSelectOrder={handleSelectTable} onCreateOrder={handleCreateNonTableOrder} />
        )}
        {view === 'analytics' && (
          <AnalyticsDashboard orderHistory={orderHistory} menuItems={menuItems} />
        )}
        {view === 'dayclose' && (
          <DayCloseWizard
            orderHistory={orderHistory}
            onCompleteDayClose={() => {
              setTables(INITIAL_TABLES);
              setNonTableOrders([]);
              setOrderHistory([]);
              setView('tables');
            }}
          />
        )}
        {view === 'kds' && (
          <KitchenDisplay tables={tables} nonTableOrders={nonTableOrders} onMarkReady={markOrderReady} />
        )}
        {view === 'orderhistory' && (
          <OrderHistoryView orderHistory={orderHistory} />
        )}
        {view === 'printersettings' && (
          <PrinterSettingsView settings={printerSettings} onSaveSettings={setPrinterSettings} />
        )}
        {view === 'menusetup' && (
          <MenuSetupView
            categories={categories} setCategories={setCategories}
            menuItems={menuItems} setMenuItems={setMenuItems}
          />
        )}
        {view === 'floorplan' && (
          <FloorPlanSetupView tables={tables} setTables={setTables} />
        )}
        {view === 'ordering' && (
          <OrderingSystem
            table={selectedTable}
            initialOrder={selectedTable?.order || []}
            MENU_ITEMS={menuItems}
            CATEGORIES={categories}
            onBack={() => {
              if (selectedTable && (String(selectedTable.id).startsWith('DEL-') || String(selectedTable.id).startsWith('TAK-'))) {
                setView('nontables');
              } else {
                setView('tables');
              }
            }}
            onSaveOrder={saveOrderToTable}
            onSettleTable={settleTable}
          />
        )}
      </main>

      {/* Print Overlay - Now connected to actual active order */}
      <div className="print-only">
        <div style={{ margin: '0 auto', width: '300px', padding: '20px', fontFamily: 'monospace' }}>
          <h3 style={{ textAlign: 'center' }}>TYDE CAFE</h3>
          <p style={{ textAlign: 'center', fontSize: '10px' }}>Tax Invoice</p>
          <div style={{ borderBottom: '1px dashed #000', margin: '10px 0' }}></div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
            <span>Table: {selectedTable?.name || 'Walk-In'}</span>
            <span>{new Date().toLocaleTimeString()}</span>
          </div>
          <div style={{ borderBottom: '1px dashed #000', margin: '10px 0' }}></div>
          <div style={{ display: 'flex', borderBottom: '1px solid #000', paddingBottom: '5px' }}>
            <span style={{ flex: 1 }}>Item</span>
            <span style={{ width: '40px', textAlign: 'center' }}>Qty</span>
            <span style={{ width: '60px', textAlign: 'right' }}>Total</span>
          </div>
          <div style={{ paddingTop: '10px' }}>
            {selectedTable?.order?.map(item => (
              <div style={{ display: 'flex', marginBottom: '4px' }} key={item.cartItemId}>
                <span style={{ flex: 1, fontSize: '11px' }}>{item.name}</span>
                <span style={{ width: '40px', textAlign: 'center', fontSize: '11px' }}>{item.qty}</span>
                <span style={{ width: '60px', textAlign: 'right', fontSize: '11px' }}>{item.price * item.qty}</span>
              </div>
            ))}
          </div>
          <div style={{ borderBottom: '1px dashed #000', margin: '20px 0 10px' }}></div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', fontSize: '11px', marginBottom: '4px' }}>
            <span style={{ marginRight: '20px' }}>GST (5%):</span>
            <span>Included</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '14px', marginTop: '10px' }}>
            <span>GRAND TOTAL</span>
            <span>₹{selectedTable?.order?.reduce((acc, i) => acc + (i.price * i.qty), 0)}</span>
          </div>
          <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '10px' }}>Thank You for Visiting!</p>
        </div>
      </div>
    </div>
  );
}

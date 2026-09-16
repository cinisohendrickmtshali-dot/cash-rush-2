/* ============================================
   CASH RUSH — Game Engine
   Version 1.0
   Storage + Economy + Day Simulation
   ============================================ */

const SAVE_KEY = 'cash_rush_save_v1';

/* ---------- SAVE SYSTEM ---------- */
function createNewGame() {
  return {
    version: 1,
    day: 1,
    cash: 500,
    level: 1,
    inventory: {},
    totalRevenue: 0,
    totalProfit: 0,
    totalCustomers: 0,
    totalItemsSold: 0,
    achievementsUnlocked: [],
    lastPlayed: new Date().toISOString(),
    tutorialSeen: false,
    dailyHistory: [],
    adsWatched: 0
  };
}

function saveGame(state) {
  try {
    state.lastPlayed = new Date().toISOString();
    localStorage.setItem(SAVE_KEY, JSON.stringify(state));
    return true;
  } catch (err) {
    console.error('Save error:', err);
    return false;
  }
}

function loadGame() {
  try {
    var raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return null;
    var state = JSON.parse(raw);
    if (!state || typeof state !== 'object') return null;
    if (!state.version) return null;
    if (state.adsWatched === undefined) state.adsWatched = 0;
    return state;
  } catch (err) {
    console.error('Load error:', err);
    return null;
  }
}

function deleteSave() {
  try { localStorage.removeItem(SAVE_KEY); return true; }
  catch (err) { return false; }
}

/* ---------- FORMAT HELPERS ---------- */
function formatRand(amount) {
  return 'R' + Number(amount).toFixed(2);
}

function getUnitProfit(product, sellingPrice) {
  return sellingPrice - product.buyPrice;
}

/* ---------- ECONOMY ---------- */
function calculateFinancials(sales, expenses) {
  var revenue = 0, cogs = 0, itemsSold = 0;
  for (var i = 0; i < sales.length; i++) {
    var s = sales[i];
    revenue += s.sellingPrice * s.quantity;
    cogs += s.buyPrice * s.quantity;
    itemsSold += s.quantity;
  }
  var grossProfit = revenue - cogs;
  var totalExpenses = 0;
  if (expenses) {
    for (var j = 0; j < expenses.length; j++) totalExpenses += expenses[j].amount;
  }
  return {
    revenue: revenue,
    cogs: cogs,
    grossProfit: grossProfit,
    expenses: totalExpenses,
    netProfit: grossProfit - totalExpenses,
    itemsSold: itemsSold
  };
}

/* ---------- DAY SIMULATION ---------- */
function simulateDay(inventory, dayModifiers, baseCustomers) {
  var sales = [];
  var customersServed = 0;
  var trafficMult = dayModifiers.trafficMultiplier || 1.0;
  var customerCount = Math.round(baseCustomers * trafficMult);

  for (var c = 0; c < customerCount; c++) {
    var customer = getRandomCustomerType();
    var bought = false;
    var maxBrowse = customer.maxItems;

    for (var b = 0; b < maxBrowse; b++) {
      var ids = Object.keys(inventory);
      if (ids.length === 0) break;
      var pid = ids[Math.floor(Math.random() * ids.length)];
      var inv = inventory[pid];
      if (!inv || inv.stock <= 0) continue;
      var product = getProductById(pid);
      if (!product) continue;

      var demandMult = dayModifiers.demandModifiers[pid] || 1.0;
      var tempProduct = Object.assign({}, product);
      tempProduct.demand = Math.min(100, product.demand * demandMult);

      if (willCustomerBuy(customer, tempProduct, inv.price)) {
        var existing = sales.find(function(s) { return s.productId === pid; });
        if (existing) {
          existing.quantity += 1;
        } else {
          sales.push({
            productId: pid,
            productName: product.name,
            emoji: product.emoji,
            quantity: 1,
            sellingPrice: inv.price,
            buyPrice: product.buyPrice
          });
        }
        inv.stock -= 1;
        bought = true;

        if (customer.id === 'bulk' && Math.random() < 0.5 && inv.stock > 0) {
          var extra = Math.min(inv.stock, 1 + Math.floor(Math.random() * 3));
          existing.quantity += extra;
          inv.stock -= extra;
        }
      }
      if (bought && Math.random() < 0.7) break;
    }
    if (bought) customersServed++;
  }
  return { sales: sales, customerCount: customerCount, customersServed: customersServed };
}

function getInventoryValue(inventory) {
  var total = 0;
  var ids = Object.keys(inventory);
  for (var i = 0; i < ids.length; i++) {
    var inv = inventory[ids[i]];
    var product = getProductById(ids[i]);
    if (product) total += (inv.stock || 0) * product.buyPrice;
  }
  return total;
}

function getTotalStock(inventory) {
  var total = 0;
  var ids = Object.keys(inventory);
  for (var i = 0; i < ids.length; i++) total += (inventory[ids[i]].stock || 0);
  return total;
}

/* ---------- DIFFICULTY RAMP ---------- */
function getBaseCustomerCount(day) {
  if (day <= 5) return 15;
  if (day <= 10) return 18;
  if (day <= 20) return 22;
  if (day <= 30) return 26;
  return 30;
}

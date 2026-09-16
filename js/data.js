/* ============================================
   CASH RUSH — Game Data
   Version 1.0
   Products + Customers + Events
   ============================================ */

/* ============================================
   PRODUCTS — 25 total across 6 categories
   ============================================ */
const PRODUCTS = [
  // FOOD
  { id: 'bread', name: 'Bread', emoji: '🍞', category: 'Food', buyPrice: 10, suggestPrice: 14, demand: 85, priceSensitivity: 0.80 },
  { id: 'eggs', name: 'Eggs (6 pack)', emoji: '🥚', category: 'Food', buyPrice: 18, suggestPrice: 25, demand: 72, priceSensitivity: 0.60 },
  { id: 'noodles', name: 'Instant Noodles', emoji: '🍜', category: 'Food', buyPrice: 7, suggestPrice: 12, demand: 78, priceSensitivity: 0.65 },
  { id: 'rice', name: 'Rice 1kg', emoji: '🍚', category: 'Food', buyPrice: 22, suggestPrice: 32, demand: 65, priceSensitivity: 0.55 },
  { id: 'canned', name: 'Canned Beans', emoji: '🥫', category: 'Food', buyPrice: 12, suggestPrice: 18, demand: 60, priceSensitivity: 0.70 },
  // DAIRY
  { id: 'milk', name: 'Milk 1L', emoji: '🥛', category: 'Dairy', buyPrice: 15, suggestPrice: 20, demand: 80, priceSensitivity: 0.70 },
  { id: 'yogurt', name: 'Yogurt 500ml', emoji: '🍦', category: 'Dairy', buyPrice: 14, suggestPrice: 22, demand: 55, priceSensitivity: 0.65 },
  { id: 'cheese', name: 'Cheese Slices', emoji: '🧀', category: 'Dairy', buyPrice: 25, suggestPrice: 38, demand: 50, priceSensitivity: 0.50 },
  // DRINKS
  { id: 'water', name: 'Bottled Water', emoji: '💧', category: 'Drinks', buyPrice: 5, suggestPrice: 8, demand: 90, priceSensitivity: 0.90 },
  { id: 'soda', name: 'Soft Drink', emoji: '🥤', category: 'Drinks', buyPrice: 8, suggestPrice: 12, demand: 88, priceSensitivity: 0.75 },
  { id: 'juice', name: 'Fruit Juice 1L', emoji: '🧃', category: 'Drinks', buyPrice: 18, suggestPrice: 28, demand: 65, priceSensitivity: 0.60 },
  { id: 'energy', name: 'Energy Drink', emoji: '⚡', category: 'Drinks', buyPrice: 14, suggestPrice: 25, demand: 60, priceSensitivity: 0.45 },
  { id: 'tea', name: 'Tea Bags (25)', emoji: '🍵', category: 'Drinks', buyPrice: 20, suggestPrice: 30, demand: 55, priceSensitivity: 0.50 },
  // SNACKS
  { id: 'chips', name: 'Chips 125g', emoji: '🍟', category: 'Snacks', buyPrice: 12, suggestPrice: 18, demand: 85, priceSensitivity: 0.70 },
  { id: 'sweets', name: 'Sweets Pack', emoji: '🍬', category: 'Snacks', buyPrice: 5, suggestPrice: 10, demand: 75, priceSensitivity: 0.85 },
  { id: 'chocolate', name: 'Chocolate Bar', emoji: '🍫', category: 'Snacks', buyPrice: 10, suggestPrice: 16, demand: 80, priceSensitivity: 0.65 },
  { id: 'biscuits', name: 'Biscuits Pack', emoji: '🍪', category: 'Snacks', buyPrice: 8, suggestPrice: 13, demand: 70, priceSensitivity: 0.75 },
  { id: 'nuts', name: 'Peanuts 100g', emoji: '🥜', category: 'Snacks', buyPrice: 15, suggestPrice: 24, demand: 45, priceSensitivity: 0.55 },
  // HOUSEHOLD
  { id: 'soap', name: 'Soap Bar', emoji: '🧼', category: 'Household', buyPrice: 8, suggestPrice: 13, demand: 60, priceSensitivity: 0.50 },
  { id: 'toiletpaper', name: 'Toilet Paper', emoji: '🧻', category: 'Household', buyPrice: 10, suggestPrice: 16, demand: 65, priceSensitivity: 0.55 },
  { id: 'detergent', name: 'Washing Powder', emoji: '🧴', category: 'Household', buyPrice: 25, suggestPrice: 38, demand: 50, priceSensitivity: 0.45 },
  { id: 'matches', name: 'Matches', emoji: '🔥', category: 'Household', buyPrice: 3, suggestPrice: 6, demand: 55, priceSensitivity: 0.85 },
  // PERSONAL
  { id: 'toothpaste', name: 'Toothpaste', emoji: '🪥', category: 'Personal', buyPrice: 15, suggestPrice: 24, demand: 55, priceSensitivity: 0.50 },
  { id: 'deodorant', name: 'Deodorant', emoji: '💐', category: 'Personal', buyPrice: 22, suggestPrice: 35, demand: 45, priceSensitivity: 0.45 },
  { id: 'sanitizer', name: 'Hand Sanitizer', emoji: '🧴', category: 'Personal', buyPrice: 12, suggestPrice: 20, demand: 50, priceSensitivity: 0.60 }
];

function getProductById(id) {
  return PRODUCTS.find(function(p) { return p.id === id; });
}

/* ============================================
   CUSTOMERS — 4 types
   ============================================ */
const CUSTOMER_TYPES = {
  budget:      { id: 'budget',      name: 'Budget Shopper',      emoji: '🪙', priceTolerance: 0.10, maxItems: 2, buyChance: 0.55, weight: 30 },
  regular:     { id: 'regular',     name: 'Regular Customer',    emoji: '🙂', priceTolerance: 0.25, maxItems: 3, buyChance: 0.75, weight: 40 },
  convenience: { id: 'convenience', name: 'Convenience Shopper', emoji: '🏃', priceTolerance: 0.50, maxItems: 2, buyChance: 0.85, weight: 20 },
  bulk:        { id: 'bulk',        name: 'Bulk Shopper',        emoji: '🛒', priceTolerance: 0.15, maxItems: 6, buyChance: 0.65, weight: 10 }
};

function getRandomCustomerType() {
  var roll = Math.random() * 100;
  var cumulative = 0;
  var types = ['budget', 'regular', 'convenience', 'bulk'];
  for (var i = 0; i < types.length; i++) {
    cumulative += CUSTOMER_TYPES[types[i]].weight;
    if (roll <= cumulative) return CUSTOMER_TYPES[types[i]];
  }
  return CUSTOMER_TYPES.regular;
}

function willCustomerBuy(customer, product, sellingPrice) {
  var priceRatio = sellingPrice / product.suggestPrice;
  if (priceRatio > 1 + customer.priceTolerance) return false;
  var chance = customer.buyChance;
  chance *= product.demand / 100;
  chance *= (2 - priceRatio);
  chance *= (0.85 + Math.random() * 0.30);
  chance = Math.max(0, Math.min(1, chance));
  return Math.random() < chance;
}

/* ============================================
   EVENTS — 22 total
   ============================================ */
const EVENTS = [
  // TRAFFIC
  { id: 'busy_day', name: '🔥 Busy Day', description: 'More customers than usual today.', type: 'traffic_boost', value: 1.5, chance: 8 },
  { id: 'quiet_day', name: '😴 Quiet Day', description: 'A slow day in the neighbourhood.', type: 'traffic_boost', value: 0.7, chance: 8 },
  { id: 'payday', name: '💵 Payday', description: 'It\'s payday! Bigger baskets today.', type: 'traffic_boost', value: 1.4, chance: 8 },
  { id: 'good_weather', name: '☀️ Great Weather', description: 'Perfect weather brings more customers.', type: 'traffic_boost', value: 1.25, chance: 10 },
  { id: 'loadshedding', name: '⚡ Load Shedding', description: 'Power is out. Fewer customers today.', type: 'traffic_boost', value: 0.6, chance: 8 },
  { id: 'month_end', name: '💰 Month-End Rush', description: 'Salaries paid. Everyone is shopping!', type: 'traffic_boost', value: 1.7, chance: 6 },
  { id: 'taxi_strike', name: '🚕 Taxi Strike', description: 'Transport strike — people stayed home.', type: 'traffic_boost', value: 0.5, chance: 5 },
  { id: 'rainy_day', name: '🌧️ Rainy Day', description: 'Heavy rain keeps shoppers away.', type: 'traffic_boost', value: 0.75, chance: 8 },
  // COMPETITOR
  { id: 'competitor_discount', name: '🏪 Competitor Discount', description: 'Nearby shop is running a discount.', type: 'traffic_boost', value: 0.75, chance: 6 },
  { id: 'competitor_closed', name: '🚪 Competitor Closed', description: 'Shop down the road is closed — customers coming to you!', type: 'traffic_boost', value: 1.35, chance: 6 },
  // SUPPLIER
  { id: 'supplier_discount', name: '📦 Supplier Discount', description: 'Your supplier is offering 20% off Bread today.', type: 'buy_price_discount', targetProduct: 'bread', value: 0.20, chance: 6 },
  { id: 'bulk_delivery', name: '🚛 Bulk Delivery Discount', description: 'All products are 15% cheaper today!', type: 'all_buy_discount', value: 0.15, chance: 4 },
  { id: 'price_increase', name: '📈 Supplier Price Increase', description: 'Bottled Water cost +30% today.', type: 'buy_price_increase', targetProduct: 'water', value: 0.30, chance: 6 },
  { id: 'dairy_shortage', name: '🐄 Dairy Shortage', description: 'Milk cost +25% today.', type: 'buy_price_increase', targetProduct: 'milk', value: 0.25, chance: 5 },
  // DEMAND
  { id: 'soda_trend', name: '🥤 Soda Trend', description: 'Social media made Soft Drinks popular!', type: 'demand_boost', targetProduct: 'soda', value: 1.6, chance: 6 },
  { id: 'chips_trend', name: '🍟 Chips Trend', description: 'Everyone suddenly wants Chips!', type: 'demand_boost', targetProduct: 'chips', value: 1.6, chance: 6 },
  { id: 'school_holiday', name: '🎉 School Holiday', description: 'Kids are out of school — snacks demand up!', type: 'demand_boost', targetProduct: 'sweets', value: 1.8, chance: 5 },
  { id: 'sick_season', name: '🤒 Sick Season', description: 'Flu season — household demand up.', type: 'demand_boost', targetProduct: 'toiletpaper', value: 1.5, chance: 5 },
  { id: 'heatwave', name: '🌡️ Heatwave', description: 'Very hot day — water demand doubles!', type: 'demand_boost', targetProduct: 'water', value: 2.0, chance: 5 },
  // COST
  { id: 'emergency_repair', name: '🔧 Emergency Repair', description: 'Fridge broke down. Cost: R80.', type: 'extra_cost', value: 80, chance: 4 },
  { id: 'theft', name: '😟 Small Theft', description: 'Stock stolen. Loss: R60.', type: 'extra_cost', value: 60, chance: 3 },
  { id: 'city_inspection', name: '📋 City Inspection', description: 'Health inspection fee: R50.', type: 'extra_cost', value: 50, chance: 4 }
];

function rollDailyEvent() {
  var totalChance = EVENTS.reduce(function(sum, e) { return sum + e.chance; }, 0);
  var roll = Math.random() * totalChance;
  var cumulative = 0;
  for (var i = 0; i < EVENTS.length; i++) {
    cumulative += EVENTS[i].chance;
    if (roll <= cumulative) return EVENTS[i];
  }
  return null;
}

function applyEventEffects(event) {
  var effects = {
    trafficMultiplier: 1.0,
    buyPriceModifiers: {},
    demandModifiers: {},
    extraCost: 0,
    event: event
  };
  if (!event) return effects;

  switch (event.type) {
    case 'traffic_boost':
      effects.trafficMultiplier = event.value;
      break;
    case 'buy_price_discount':
      effects.buyPriceModifiers[event.targetProduct] = 1 - event.value;
      break;
    case 'buy_price_increase':
      effects.buyPriceModifiers[event.targetProduct] = 1 + event.value;
      break;
    case 'all_buy_discount':
      PRODUCTS.forEach(function(p) { effects.buyPriceModifiers[p.id] = 1 - event.value; });
      break;
    case 'demand_boost':
      effects.demandModifiers[event.targetProduct] = event.value;
      break;
    case 'extra_cost':
      effects.extraCost = event.value;
      break;
  }
  return effects;
}

/* ============================================
   ACHIEVEMENTS — 8 total
   ============================================ */
const ACHIEVEMENTS = [
  { id: 'first_sale',        name: 'First Sale',        emoji: '🥇', description: 'Make your first sale',           check: function(s) { return s.totalItemsSold >= 1; } },
  { id: 'first_profit',      name: 'First Profit',      emoji: '💚', description: 'Finish a profitable day',        check: function(s) { return s.totalProfit > 0; } },
  { id: 'r1000_cash',        name: 'R1,000 Cash',       emoji: '💰', description: 'Reach R1,000 cash',              check: function(s) { return s.cash >= 1000; } },
  { id: 'stock_master',      name: 'Stock Master',      emoji: '📦', description: 'Sell 100 products',              check: function(s) { return s.totalItemsSold >= 100; } },
  { id: 'business_owner',    name: 'Business Owner',    emoji: '🏪', description: 'Survive 10 game days',           check: function(s) { return s.day >= 10; } },
  { id: 'profit_machine',    name: 'Profit Machine',    emoji: '⚙️', description: 'Earn R1,000 cumulative profit', check: function(s) { return s.totalProfit >= 1000; } },
  { id: 'customer_favorite', name: 'Customer Favourite', emoji: '❤️', description: 'Serve 50 customers',            check: function(s) { return s.totalCustomers >= 50; } },
  { id: 'big_spender',       name: 'Big Spender',       emoji: '💎', description: 'Reach R5,000 cash',              check: function(s) { return s.cash >= 5000; } }
];

function checkAchievements(state) {
  var newUnlocks = [];
  var already = state.achievementsUnlocked || [];
  for (var i = 0; i < ACHIEVEMENTS.length; i++) {
    var a = ACHIEVEMENTS[i];
    if (already.indexOf(a.id) !== -1) continue;
    if (a.check(state)) {
      newUnlocks.push(a);
      already.push(a.id);
    }
  }
  state.achievementsUnlocked = already;
  return newUnlocks;
}

function getAchievementList(state) {
  var list = state.achievementsUnlocked || [];
  return ACHIEVEMENTS.map(function(a) {
    return {
      id: a.id, name: a.name, emoji: a.emoji, description: a.description,
      unlocked: list.indexOf(a.id) !== -1
    };
  });
}

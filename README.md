# HuxtableMcGrath - D&D Ability Tracker

A focused D&D character tracker for managing abilities with limited uses and rest mechanics.

## Features

### 🎯 Core Functionality
- **Ability Usage Tracking**: Checkbox-based system for tracking limited-use abilities
- **Rest Management**: Master Short Rest and Long Rest buttons
- **Custom Abilities**: Add your own abilities with customizable uses and rest types
- **Persistent Storage**: All data saves automatically to your browser

### ⚡ Built-in Sample Abilities
- **Action Surge** (1 use, Short Rest)
- **Superiority Dice** (4 uses, Short Rest) 
- **Second Wind** (1 use, Long Rest)

### 🛌 Rest Types Supported
- **Short Rest**: Resets abilities that recover on short or long rest
- **Long Rest**: Resets ALL abilities
- **Dawn/Daily**: Custom timing for special abilities

### 📱 Mobile Friendly  
- Progressive Web App (PWA) support
- Responsive design for phones and tablets
- Works offline once loaded

## Usage

### Basic Tracking
1. Check boxes when you use abilities
2. Monitor remaining uses with color-coded counters
3. Use individual reset buttons or master rest buttons

### Master Rest Controls
- **Short Rest**: Resets all short rest abilities at once
- **Long Rest**: Resets ALL abilities (short rest + long rest + daily)

### Custom Abilities
1. Fill in the "Add Custom Ability" form
2. Choose max uses (1-10)
3. Select rest type (Short/Long/Dawn)
4. Click "Add Ability"
5. Remove custom abilities with the ✖ button

### Reset Options
- **Individual Reset**: Reset single abilities
- **Master Rest**: Reset by rest type
- **Reset All**: Clear all usage tracking
- **Clear Custom**: Remove all custom abilities

## Technical Details

- **Frontend**: Vanilla HTML, CSS, JavaScript
- **Storage**: localStorage for persistence
- **Mobile**: PWA with manifest.json
- **Responsive**: Mobile-first design with breakpoints

## Getting Started

1. Open `index.html` in a web browser
2. Start tracking your character's abilities
3. Add custom abilities as needed
4. Use rest buttons to reset abilities

## Customization

The app is designed to be easily customizable:
- Edit built-in abilities in `script.js`
- Modify styling in `styles.css`  
- Add new rest types by updating the logic
- Extend with additional features as needed

## File Structure

```
HuxtableMcGrath/
├── index.html          # Main app structure
├── styles.css          # All styling and responsive design
├── script.js           # Core functionality and state management
├── manifest.json       # PWA configuration
└── README.md          # This documentation
```

---

*Made for D&D Characters 🐉*
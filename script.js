// Ability tracking state
let abilities = {
    // Built-in abilities
    actionSurge: {
        name: "Action Surge",
        maxUses: 1,
        usedCount: 0,
        restType: "short" // short, long, dawn
    },
    superiorityDice: {
        name: "Superiority Dice",
        maxUses: 4,
        usedCount: 0,
        restType: "short"
    },
    secondWind: {
        name: "Second Wind",
        maxUses: 1,
        usedCount: 0,
        restType: "long"
    }
};

// Custom abilities counter for unique IDs
let customAbilityCounter = 0;

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    loadState();
    updateAllDisplays();
});

// Save state to localStorage
function saveState() {
    const state = {
        abilities: abilities,
        customAbilityCounter: customAbilityCounter
    };
    localStorage.setItem('huxtableMcGrath', JSON.stringify(state));
}

// Load state from localStorage
function loadState() {
    const saved = localStorage.getItem('huxtableMcGrath');
    if (saved) {
        const parsed = JSON.parse(saved);
        abilities = { ...abilities, ...parsed.abilities };
        customAbilityCounter = parsed.customAbilityCounter || 0;
        
        // Render any custom abilities that were saved
        renderCustomAbilities();
    }
}

// Update all ability displays
function updateAllDisplays() {
    updateActionSurgeDisplay();
    updateSuperiorityDiceDisplay();
    updateSecondWindDisplay();
    
    // Update custom abilities
    Object.keys(abilities).forEach(abilityKey => {
        if (!['actionSurge', 'superiorityDice', 'secondWind'].includes(abilityKey)) {
            updateCustomAbilityDisplay(abilityKey);
        }
    });
}

// Generic function to update ability usage
function updateAbilityUsage(abilityKey) {
    let usedCount = 0;
    const ability = abilities[abilityKey];
    
    // Count checked checkboxes
    for (let i = 1; i <= ability.maxUses; i++) {
        const checkbox = document.getElementById(`${abilityKey}-use-${i}`);
        if (checkbox && checkbox.checked) {
            usedCount++;
        }
    }
    
    ability.usedCount = usedCount;
    updateAbilityDisplay(abilityKey);
    saveState();
}

// Generic function to update ability display
function updateAbilityDisplay(abilityKey) {
    const ability = abilities[abilityKey];
    const remaining = ability.maxUses - ability.usedCount;
    const remainingElement = document.getElementById(`${abilityKey}-remaining`);
    
    if (remainingElement) {
        remainingElement.textContent = remaining;
        remainingElement.style.color = remaining > 0 ? '#27ae60' : '#e74c3c';
    }
    
    // Update checkboxes to match saved state
    for (let i = 1; i <= ability.maxUses; i++) {
        const checkbox = document.getElementById(`${abilityKey}-use-${i}`);
        if (checkbox) {
            checkbox.checked = i <= ability.usedCount;
        }
    }
}

// Generic function to reset ability uses
function resetAbilityUses(abilityKey, confirmMessage) {
    if (confirm(confirmMessage)) {
        const ability = abilities[abilityKey];
        ability.usedCount = 0;
        
        // Uncheck all checkboxes
        for (let i = 1; i <= ability.maxUses; i++) {
            const checkbox = document.getElementById(`${abilityKey}-use-${i}`);
            if (checkbox) {
                checkbox.checked = false;
            }
        }
        
        updateAbilityDisplay(abilityKey);
        saveState();
        
        // Visual feedback
        const abilityCard = document.querySelector(`[data-ability="${abilityKey}"]`) || 
                           document.querySelector('.ability-card'); // Fallback for built-in abilities
        if (abilityCard) {
            abilityCard.classList.add('reset-animation');
            setTimeout(() => abilityCard.classList.remove('reset-animation'), 500);
        }
    }
}

// Specific ability functions
function updateActionSurgeUsage() {
    updateAbilityUsage('actionSurge');
}

function updateActionSurgeDisplay() {
    updateAbilityDisplay('actionSurge');
}

function resetActionSurgeUses() {
    resetAbilityUses('actionSurge', 'Reset Action Surge? (Short Rest)');
}

function updateSuperiorityDiceUsage() {
    updateAbilityUsage('superiorityDice');
}

function updateSuperiorityDiceDisplay() {
    updateAbilityDisplay('superiorityDice');
}

function resetSuperiorityDiceUses() {
    resetAbilityUses('superiorityDice', 'Reset Superiority Dice? (Short Rest)');
}

function updateSecondWindUsage() {
    updateAbilityUsage('secondWind');
}

function updateSecondWindDisplay() {
    updateAbilityDisplay('secondWind');
}

function resetSecondWindUses() {
    resetAbilityUses('secondWind', 'Reset Second Wind? (Long Rest)');
}

// Master rest functions
function performShortRest() {
    if (confirm('Perform Short Rest? This will reset all short rest abilities.')) {
        let resetCount = 0;
        
        Object.keys(abilities).forEach(abilityKey => {
            const ability = abilities[abilityKey];
            if (ability.restType === 'short' && ability.usedCount > 0) {
                resetCount++;
                ability.usedCount = 0;
                
                // Uncheck checkboxes
                for (let i = 1; i <= ability.maxUses; i++) {
                    const checkbox = document.getElementById(`${abilityKey}-use-${i}`);
                    if (checkbox) {
                        checkbox.checked = false;
                    }
                }
            }
        });
        
        updateAllDisplays();
        saveState();
        
        // Visual feedback
        const abilityCards = document.querySelectorAll('.ability-card');
        abilityCards.forEach(card => {
            card.classList.add('reset-animation');
            setTimeout(() => card.classList.remove('reset-animation'), 500);
        });
        
        alert(`Short Rest completed! Reset ${resetCount} abilities.`);
    }
}

function performLongRest() {
    if (confirm('Perform Long Rest? This will reset ALL abilities.')) {
        let resetCount = 0;
        
        Object.keys(abilities).forEach(abilityKey => {
            const ability = abilities[abilityKey];
            if (ability.usedCount > 0) {
                resetCount++;
                ability.usedCount = 0;
                
                // Uncheck checkboxes
                for (let i = 1; i <= ability.maxUses; i++) {
                    const checkbox = document.getElementById(`${abilityKey}-use-${i}`);
                    if (checkbox) {
                        checkbox.checked = false;
                    }
                }
            }
        });
        
        updateAllDisplays();
        saveState();
        
        // Visual feedback
        const abilityCards = document.querySelectorAll('.ability-card');
        abilityCards.forEach(card => {
            card.classList.add('reset-animation');
            setTimeout(() => card.classList.remove('reset-animation'), 500);
        });
        
        alert(`Long Rest completed! Reset ${resetCount} abilities.`);
    }
}

// Custom ability management
function addCustomAbility() {
    const nameInput = document.getElementById('new-ability-name');
    const descInput = document.getElementById('new-ability-description');
    const usesInput = document.getElementById('new-ability-uses');
    const restTypeSelect = document.getElementById('new-ability-rest-type');
    
    const name = nameInput.value.trim();
    const description = descInput.value.trim();
    const maxUses = parseInt(usesInput.value) || 1;
    const restType = restTypeSelect.value;
    
    if (!name) {
        alert('Please enter an ability name.');
        return;
    }
    
    if (!description) {
        alert('Please enter an ability description.');
        return;
    }
    
    // Create unique ability key
    customAbilityCounter++;
    const abilityKey = `custom_${customAbilityCounter}`;
    
    // Add to abilities object
    abilities[abilityKey] = {
        name: name,
        description: description,
        maxUses: maxUses,
        usedCount: 0,
        restType: restType,
        isCustom: true
    };
    
    // Create HTML for the ability
    createCustomAbilityHTML(abilityKey);
    
    // Clear form
    nameInput.value = '';
    descInput.value = '';
    usesInput.value = 1;
    restTypeSelect.value = 'short';
    
    saveState();
    
    // Scroll to new ability
    setTimeout(() => {
        const newCard = document.querySelector(`[data-ability="${abilityKey}"]`);
        if (newCard) {
            newCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, 100);
}

function createCustomAbilityHTML(abilityKey) {
    const ability = abilities[abilityKey];
    const restTypeLabel = {
        'short': 'Short Rest',
        'long': 'Long Rest',
        'dawn': 'Dawn/Daily'
    };
    
    const cardClass = ability.restType === 'long' || ability.restType === 'dawn' ? 'ability-card daily-ability' : 'ability-card';
    
    const checkboxes = Array.from({length: ability.maxUses}, (_, i) => `
        <div class="checkbox-item">
            <input type="checkbox" id="${abilityKey}-use-${i + 1}" onchange="updateCustomAbilityUsage('${abilityKey}')">
            <label for="${abilityKey}-use-${i + 1}">${ability.maxUses === 1 ? 'Used' : `Use ${i + 1}`}</label>
        </div>
    `).join('');
    
    const abilityHTML = `
        <div class="${cardClass} add-animation" data-ability="${abilityKey}">
            <h3>${ability.name} 
                <button class="btn-remove-custom" onclick="removeCustomAbility('${abilityKey}')" title="Remove ability">✖</button>
            </h3>
            <p class="ability-description">
                ${ability.description}
            </p>
            
            <div class="ability-usage">
                <div class="usage-header">
                    <span class="usage-label">Uses Remaining:</span>
                    <span class="usage-count" id="${abilityKey}-remaining">${ability.maxUses}</span>
                    <span class="usage-total">/ ${ability.maxUses}</span>
                </div>
                
                <div class="usage-checkboxes">
                    ${checkboxes}
                </div>
                
                <div class="ability-controls">
                    <button class="btn btn-reset-individual" onclick="resetCustomAbilityUses('${abilityKey}')">Reset (${restTypeLabel[ability.restType]})</button>
                </div>
            </div>
        </div>
    `;
    
    // Insert before the add ability section
    const addSection = document.querySelector('.add-ability-section');
    addSection.insertAdjacentHTML('beforebegin', abilityHTML);
    
    updateCustomAbilityDisplay(abilityKey);
}

function updateCustomAbilityUsage(abilityKey) {
    updateAbilityUsage(abilityKey);
}

function updateCustomAbilityDisplay(abilityKey) {
    updateAbilityDisplay(abilityKey);
}

function resetCustomAbilityUses(abilityKey) {
    const ability = abilities[abilityKey];
    const restTypeLabel = {
        'short': 'Short Rest',
        'long': 'Long Rest',
        'dawn': 'Dawn/Daily'
    };
    resetAbilityUses(abilityKey, `Reset ${ability.name}? (${restTypeLabel[ability.restType]})`);
}

function removeCustomAbility(abilityKey) {
    const ability = abilities[abilityKey];
    if (confirm(`Remove "${ability.name}" ability?`)) {
        // Remove from DOM
        const abilityCard = document.querySelector(`[data-ability="${abilityKey}"]`);
        if (abilityCard) {
            abilityCard.remove();
        }
        
        // Remove from abilities object
        delete abilities[abilityKey];
        
        saveState();
    }
}

function renderCustomAbilities() {
    Object.keys(abilities).forEach(abilityKey => {
        const ability = abilities[abilityKey];
        if (ability.isCustom) {
            createCustomAbilityHTML(abilityKey);
        }
    });
}

function resetAllAbilities() {
    if (confirm('Reset ALL abilities? This will clear all usage tracking.')) {
        Object.keys(abilities).forEach(abilityKey => {
            const ability = abilities[abilityKey];
            ability.usedCount = 0;
            
            // Uncheck checkboxes
            for (let i = 1; i <= ability.maxUses; i++) {
                const checkbox = document.getElementById(`${abilityKey}-use-${i}`);
                if (checkbox) {
                    checkbox.checked = false;
                }
            }
        });
        
        updateAllDisplays();
        saveState();
        
        // Visual feedback
        const abilityCards = document.querySelectorAll('.ability-card');
        abilityCards.forEach(card => {
            card.classList.add('reset-animation');
            setTimeout(() => card.classList.remove('reset-animation'), 500);
        });
        
        alert('All abilities reset!');
    }
}

function clearCustomAbilities() {
    const customAbilities = Object.keys(abilities).filter(key => abilities[key].isCustom);
    
    if (customAbilities.length === 0) {
        alert('No custom abilities to clear.');
        return;
    }
    
    if (confirm(`Clear all ${customAbilities.length} custom abilities? This cannot be undone.`)) {
        // Remove from DOM
        customAbilities.forEach(abilityKey => {
            const abilityCard = document.querySelector(`[data-ability="${abilityKey}"]`);
            if (abilityCard) {
                abilityCard.remove();
            }
            delete abilities[abilityKey];
        });
        
        saveState();
        alert(`Cleared ${customAbilities.length} custom abilities.`);
    }
}

// Add some CSS for the remove button
const style = document.createElement('style');
style.textContent = `
    .btn-remove-custom {
        background: #e74c3c;
        color: white;
        border: none;
        border-radius: 50%;
        width: 24px;
        height: 24px;
        font-size: 12px;
        cursor: pointer;
        float: right;
        margin-left: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s ease;
    }
    
    .btn-remove-custom:hover {
        background: #c0392b;
        transform: scale(1.1);
    }
`;
document.head.appendChild(style);
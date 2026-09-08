// Page Navigation
document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const pageName = btn.getAttribute('data-page');
        showPage(pageName);
        
        // Close sidebar on mobile
        if (window.innerWidth < 768) {
            document.getElementById('sidebar').classList.remove('open');
        }
    });
});

function showPage(pageName) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Remove active class from nav buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected page
    document.getElementById(pageName).classList.add('active');
    
    // Add active class to clicked button
    document.querySelector(`[data-page="${pageName}"]`).classList.add('active');
}

// Sidebar Toggle
document.getElementById('menu-toggle').addEventListener('click', () => {
    document.getElementById('sidebar').classList.toggle('open');
});

document.getElementById('close-sidebar').addEventListener('click', () => {
    document.getElementById('sidebar').classList.remove('open');
});

// Close sidebar when clicking outside
document.addEventListener('click', (e) => {
    const sidebar = document.getElementById('sidebar');
    const menuToggle = document.getElementById('menu-toggle');
    
    if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
        sidebar.classList.remove('open');
    }
});

// Tab Cloaking Feature
let isCloaked = false;

document.getElementById('cloak-btn').addEventListener('click', cloakTab);
document.getElementById('settings-cloak-btn').addEventListener('click', cloakTab);

function cloakTab() {
    isCloaked = true;
    document.body.style.display = 'none';
    document.getElementById('cloaked-view').style.display = 'block';
    localStorage.setItem('cloaked', 'true');
    playSound('cloak');
}

// Uncloaked Buttons
document.querySelectorAll('#uncloaked-btn, #uncloaked-btn-overlay').forEach(btn => {
    btn.addEventListener('click', unCloakTab);
});

function unCloakTab() {
    isCloaked = false;
    document.body.style.display = 'block';
    document.getElementById('cloaked-view').style.display = 'none';
    localStorage.setItem('cloaked', 'false');
    playSound('uncloack');
}

// Check if was cloaked before reload
window.addEventListener('load', () => {
    if (localStorage.getItem('cloaked') === 'true') {
        cloakTab();
    }
});

// Game Functionality
function playGame(gameName) {
    const container = document.getElementById('game-iframe-container');
    const iframe = document.getElementById('game-frame');
    
    if (gameName === 'granny') {
        // Embedded Granny game
        iframe.src = 'https://cdn.htmlgames.com/Granny/index.html';
    }
    
    container.style.display = 'block';
    window.scrollTo(0, 0);
    playSound('gameStart');
}

function closeGame() {
    document.getElementById('game-iframe-container').style.display = 'none';
    document.getElementById('game-frame').src = '';
}

// Chatbot Switching
document.querySelectorAll('.chatbot-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const chatbotType = btn.getAttribute('data-chatbot');
        
        // Remove active class from all buttons and containers
        document.querySelectorAll('.chatbot-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.chatbot-container').forEach(c => c.classList.remove('active'));
        
        // Add active class to clicked button and corresponding container
        btn.classList.add('active');
        document.getElementById(chatbotType + '-chat').classList.add('active');
        
        playSound('switch');
    });
});

// Settings
// Theme Selection
document.getElementById('theme-select').addEventListener('change', (e) => {
    const theme = e.target.value;
    
    document.body.classList.remove('light-mode', 'neon-mode');
    
    if (theme === 'light') {
        document.body.classList.add('light-mode');
    } else if (theme === 'neon') {
        document.body.classList.add('neon-mode');
    }
    
    localStorage.setItem('theme', theme);
    playSound('switch');
});

// Load saved theme
window.addEventListener('load', () => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.getElementById('theme-select').value = savedTheme;
    
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
    } else if (savedTheme === 'neon') {
        document.body.classList.add('neon-mode');
    }
});

// Sound Toggle
let soundEnabled = JSON.parse(localStorage.getItem('soundEnabled')) !== false;
document.getElementById('sound-toggle').checked = soundEnabled;

document.getElementById('sound-toggle').addEventListener('change', (e) => {
    soundEnabled = e.target.checked;
    localStorage.setItem('soundEnabled', soundEnabled);
});

// Sound Effects
function playSound(type) {
    if (!soundEnabled) return;
    
    // Create audio context for sound effects
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    let frequency, duration;
    
    switch(type) {
        case 'click':
            frequency = 800;
            duration = 0.1;
            break;
        case 'switch':
            frequency = 1200;
            duration = 0.15;
            break;
        case 'gameStart':
            frequency = 1000;
            duration = 0.3;
            break;
        case 'cloak':
            frequency = 600;
            duration = 0.5;
            break;
        case 'uncloack':
            frequency = 900;
            duration = 0.4;
            break;
        default:
            return;
    }
    
    try {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = frequency;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration);
    } catch (e) {
        console.log('Sound not available');
    }
}

// Clear Data
document.getElementById('clear-data-btn').addEventListener('click', () => {
    if (confirm('Are you sure you want to clear all data? This cannot be undone.')) {
        localStorage.clear();
        alert('All data cleared!');
        location.reload();
        playSound('click');
    }
});

// Button Click Sounds
document.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => playSound('click'));
});

// Responsive Sidebar
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        document.getElementById('sidebar').classList.remove('open');
    }
});

// Chat Feature (Basic example)
function askChatbot(question) {
    console.log('User asked:', question);
    // In a real implementation, this would connect to the actual API
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    showPage('home');
    console.log('Game Hub Loaded! 🎮');
});

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Alt + H = Home
    if (e.altKey && e.key === 'h') {
        showPage('home');
    }
    // Alt + G = Games
    if (e.altKey && e.key === 'g') {
        showPage('games');
    }
    // Alt + R = AI Chatbots (R for Robot)
    if (e.altKey && e.key === 'r') {
        showPage('chatbots');
    }
    // Alt + M = Movies
    if (e.altKey && e.key === 'm') {
        showPage('movies');
    }
    // Alt + S = Settings
    if (e.altKey && e.key === 's') {
        showPage('settings');
    }
    // Alt + C = Cloak
    if (e.altKey && e.key === 'c') {
        if (!isCloaked) {
            cloakTab();
        } else {
            unCloakTab();
        }
    }
});

// Add visual feedback for buttons
document.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('mousedown', function() {
        this.style.transform = 'scale(0.95)';
    });
    btn.addEventListener('mouseup', function() {
        this.style.transform = 'scale(1)';
    });
});

// Performance optimization
let lastScrollTime = 0;
window.addEventListener('scroll', () => {
    lastScrollTime = Date.now();
}, { passive: true });

// Easter egg
let keyPressedCount = 0;
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') {
        keyPressedCount++;
        if (keyPressedCount === 3) {
            alert('🎮 Easter Egg Found! Welcome to the Game Hub! 🎮');
            keyPressedCount = 0;
            playSound('switch');
        }
    }
});

// Console message
console.log('%c🎮 Welcome to Game Hub! 🎮', 'color: #00ffff; font-size: 20px; text-shadow: 0 0 10px #00ffff;');
console.log('%cKeyboard Shortcuts:', 'color: #00ff88; font-size: 14px;');
console.log('%cAlt + H = Home', 'color: #ccc;');
console.log('%cAlt + G = Games', 'color: #ccc;');
console.log('%cAlt + R = AI Chatbots', 'color: #ccc;');
console.log('%cAlt + M = Movies', 'color: #ccc;');
console.log('%cAlt + S = Settings', 'color: #ccc;');
console.log('%cAlt + C = Cloak/Uncloak', 'color: #ccc;');

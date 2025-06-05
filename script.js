// Theme toggle functionality
function toggleTheme() {
  document.body.classList.toggle('dark-mode');
  const isDarkMode = document.body.classList.contains('dark-mode');
  localStorage.setItem('darkMode', isDarkMode);
}

// Check for saved theme preference
document.addEventListener('DOMContentLoaded', function() {
  const savedTheme = localStorage.getItem('darkMode');
  if (savedTheme === 'true') {
    document.body.classList.add('dark-mode');
  }
});

// Tips array
const tips = [
  "Use a password manager to create and store strong passwords!",
  "Never click suspicious links — even if they look legit.",
  "Turn on two-factor authentication wherever possible!",
  "Update your software regularly to patch security holes.",
  "Cover your webcam when not in use. Hackers are nosy 👀",
];

// Quiz Questions
const quizQuestions = [
  {
    from: "support@amazon.com",
    subject: "Your Amazon Prime membership has expired",
    content: "Dear Customer, Your Amazon Prime membership has expired. Click here to renew your membership and get 50% off for the next 3 months!",
    isPhishing: true,
    explanation: "Legitimate companies like Amazon won't ask you to click links in emails to renew memberships. They'll direct you to their official website instead."
  },
  {
    from: "noreply@netflix.com",
    subject: "Your Netflix account has been suspended",
    content: "We noticed unusual activity on your account. Please verify your payment information immediately to avoid service interruption. Click here to update your details.",
    isPhishing: true,
    explanation: "Netflix will never ask you to click links in emails to update payment information. They'll ask you to log in to your account directly on their website."
  },
  {
    from: "receipts@starbucks.com",
    subject: "Your Starbucks Rewards receipt",
    content: "Thank you for your purchase! You earned 25 stars on your recent order. View your receipt and rewards balance here.",
    isPhishing: false,
    explanation: "This is a legitimate receipt email from Starbucks. It doesn't ask for any personal information and matches their usual communication style."
  },
  {
    from: "security@apple.com",
    subject: "Your Apple ID was used to sign in on a new device",
    content: "We detected a sign-in to your Apple ID from a new device. If this was you, you can ignore this email. If not, click here to secure your account.",
    isPhishing: false,
    explanation: "This is a legitimate security alert from Apple. They provide clear information and don't pressure you to take immediate action."
  },
  {
    from: "paypal@service.com",
    subject: "Your PayPal account needs verification",
    content: "URGENT: Your PayPal account will be suspended in 24 hours unless you verify your information. Click here to verify now!",
    isPhishing: true,
    explanation: "The urgent tone, pressure to act quickly, and request to click a link are all red flags. PayPal will never ask you to verify information through email links."
  }
];

// Fun Facts
const funFacts = [
  {
    text: "The first computer virus was created in 1971 and was called 'Creeper' - it displayed the message 'I'm the creeper, catch me if you can!'",
    category: "history"
  },
  {
    text: "The most common password in 2023 was '123456' - that's like leaving your house key under the doormat!",
    category: "passwords"
  },
  {
    text: "A hacker can crack a weak password in less than a second, but a strong one might take centuries!",
    category: "passwords"
  },
  {
    text: "The first emoji was created in 1999, but hackers were using ASCII art to make smiley faces in the 1980s!",
    category: "history"
  },
  {
    text: "The word 'hacker' originally meant someone who was really good at programming - it wasn't always a bad thing!",
    category: "hackers"
  },
  {
    text: "Some hackers use rubber ducks to debug their code - they explain their code to the duck to find mistakes!",
    category: "hackers"
  },
  {
    text: "The first computer bug was an actual bug - a moth got stuck in a computer in 1947!",
    category: "history"
  },
  {
    text: "The most expensive coffee in the world is made from beans that have been eaten and digested by a cat-like animal called a civet. Similarly, the most valuable data is often the most 'processed'!",
    category: "history"
  },
  {
    text: "The first webcam was invented to monitor a coffee pot at Cambridge University - they wanted to know when the coffee was ready!",
    category: "history"
  },
  {
    text: "The first computer mouse was made of wood in the 1960s - now we have wireless ones that look like cute animals!",
    category: "history"
  }
];

// Global variables
let currentQuestionIndex = 0;
let currentCategory = 'all';
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

// Quiz Functions
function showNewQuestion() {
  const question = quizQuestions[currentQuestionIndex];
  const emailFrom = document.getElementById("emailFrom");
  const emailSubject = document.getElementById("emailSubject");
  const emailContent = document.getElementById("emailContent");
  const feedbackBox = document.getElementById("feedbackBox");
  
  if (emailFrom && emailSubject && emailContent && feedbackBox) {
    emailFrom.textContent = "From: " + question.from;
    emailSubject.textContent = "Subject: " + question.subject;
    emailContent.textContent = question.content;
    
    // Reset feedback box
    feedbackBox.className = "feedback-box";
    feedbackBox.innerHTML = "<p>Click a button to check your answer!</p>";
    
    // Enable buttons
    document.querySelectorAll('.quiz-button').forEach(button => {
      button.disabled = false;
    });
    
    // Move to next question
    currentQuestionIndex = (currentQuestionIndex + 1) % quizQuestions.length;
  }
}

function checkAnswer(answer) {
  const question = quizQuestions[(currentQuestionIndex - 1 + quizQuestions.length) % quizQuestions.length];
  const feedbackBox = document.getElementById("feedbackBox");
  
  if (feedbackBox) {
    const isCorrect = (answer === 'phish') === question.isPhishing;
    
    // Disable buttons after answer
    document.querySelectorAll('.quiz-button').forEach(button => {
      button.disabled = true;
    });
    
    // Show feedback
    feedbackBox.className = `feedback-box ${isCorrect ? 'correct' : 'incorrect'} show`;
    feedbackBox.innerHTML = `
      <p>
        ${isCorrect ? 'Correct!' : 'Not quite!'}<br>
        ${question.explanation}
      </p>
    `;
  }
}

// Fun Facts Functions
function showNewFact() {
  const factBox = document.getElementById("factBox");
  if (!factBox) return;

  let filteredFacts = currentCategory === 'all' 
    ? funFacts 
    : funFacts.filter(fact => fact.category === currentCategory);

  const fact = filteredFacts[Math.floor(Math.random() * filteredFacts.length)];
  
  // Remove the show class to reset animation
  factBox.classList.remove('show');
  
  // Wait a tiny bit before showing new fact
  setTimeout(() => {
    factBox.innerHTML = `
      <div class="fact-content">${fact.text}</div>
      <div class="fact-buttons">
        <button onclick="addToFavorites('${fact.text.replace(/'/g, "\\'")}')" class="favorite-button">Save</button>
      </div>
    `;
    // Add show class to trigger animation
    factBox.classList.add('show');
  }, 50);
}

function filterFacts(category) {
  currentCategory = category;
  
  // Update active button
  document.querySelectorAll('.category-button').forEach(button => {
    button.classList.toggle('active', button.textContent.toLowerCase().includes(category));
  });
  
  showNewFact();
}

function addToFavorites(factText) {
  // Decode the HTML entities in the fact text
  const decodedText = factText.replace(/&quot;/g, '"').replace(/&#39;/g, "'");
  
  if (!favorites.includes(decodedText)) {
    favorites.push(decodedText);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    updateFavoritesList();
  }
}

function removeFavorite(factText) {
  // Decode the HTML entities in the fact text
  const decodedText = factText.replace(/&quot;/g, '"').replace(/&#39;/g, "'");
  
  favorites = favorites.filter(fact => fact !== decodedText);
  localStorage.setItem('favorites', JSON.stringify(favorites));
  updateFavoritesList();
}

function updateFavoritesList() {
  const favoritesList = document.getElementById('favoritesList');
  if (!favoritesList) return;

  if (favorites.length === 0) {
    favoritesList.innerHTML = '<p class="empty-favorites">Save your favorite facts here!</p>';
    return;
  }

  favoritesList.innerHTML = favorites.map(fact => `
    <div class="favorite-item">
      <p>${fact}</p>
      <button onclick="removeFavorite('${fact.replace(/'/g, "\\'")}')" class="remove-favorite">Remove</button>
    </div>
  `).join('');
}

// Password Checker Functions
function togglePassword() {
  const passwordInput = document.getElementById('passwordInput');
  if (passwordInput) {
    passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
  }
}

function updateStrengthMeter() {
  const passwordInput = document.getElementById('passwordInput');
  const strengthMeter = document.querySelector('.strength-meter-fill');
  const strengthText = document.querySelector('#strengthText span');
  
  if (!passwordInput || !strengthMeter || !strengthText) return;
  
  const password = passwordInput.value;
  let strength = 0;
  let feedback = '';

  // Check requirements
  const requirements = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password)
  };

  // Update requirement indicators
  Object.keys(requirements).forEach(req => {
    const element = document.getElementById(req);
    if (element) {
      element.className = `requirement ${requirements[req] ? 'met' : ''}`;
    }
    if (requirements[req]) strength += 20;
  });

  // Update strength meter
  strengthMeter.style.width = strength + '%';

  // Set colors based on strength
  if (strength <= 20) {
    strengthMeter.style.backgroundColor = '#ff6b6b';
    feedback = 'Weak';
  } else if (strength <= 40) {
    strengthMeter.style.backgroundColor = '#ffd93d';
    feedback = 'Fair';
  } else if (strength <= 60) {
    strengthMeter.style.backgroundColor = '#6bcb77';
    feedback = 'Good';
  } else {
    strengthMeter.style.backgroundColor = '#4d96ff';
    feedback = 'Strong';
  }

  // Update strength text
  strengthText.textContent = feedback;
}

// Initialize features when the page loads
document.addEventListener('DOMContentLoaded', () => {
  // Initialize password checker if on that page
  const passwordInput = document.getElementById('passwordInput');
  if (passwordInput) {
    passwordInput.addEventListener('input', updateStrengthMeter);
  }

  // Initialize fun facts if on that page
  const factBox = document.getElementById('factBox');
  if (factBox) {
    updateFavoritesList();
    showNewFact();
  }

  // Initialize quiz if on that page
  const emailFrom = document.getElementById('emailFrom');
  if (emailFrom) {
    showNewQuestion();
  }
}); 
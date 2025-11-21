// ========================================
// DADOS E CONFIGURAÇÕES
// ========================================

let transactions = JSON.parse(localStorage.getItem('finup_transactions')) || [];
let currentTransactionType = 'expense';

const CATEGORY_COLORS = {
    'Essenciais': '#9e77ed',
    'Dívidas': '#f04438',
    'Dia a Dia': '#0ba5ec',
    'Lazer e Compras': '#17b26a',
    'Assinaturas': '#4e5ba6',
    'Família': '#f79009',
    'Metas e Futuro': '#7a5af8'
};

const CATEGORY_ICONS = {
    'Essenciais': 'fa-home',
    'Dívidas': 'fa-credit-card',
    'Dia a Dia': 'fa-shopping-cart',
    'Lazer e Compras': 'fa-gamepad',
    'Assinaturas': 'fa-repeat',
    'Família': 'fa-users',
    'Metas e Futuro': 'fa-piggy-bank'
};

let pieChart = null;

// ========================================
// FUNÇÕES DE NOTIFICAÇÃO
// ========================================

function showNotification(message, type = 'info') {
    console.log('Notificação chamada:', message); // Para debug
    
    // Remove notificação existente
    const existingNotification = document.querySelector('.custom-notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Criar notificação
    const notification = document.createElement('div');
    notification.className = `custom-notification custom-notification--${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'info' ? 'fa-info-circle' : 'fa-check-circle'}"></i>
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;

    // Estilos inline
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: type === 'info' ? '#3e98c7' : '#48c78e',
        color: 'white',
        padding: '16px 20px',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        zIndex: '9999',
        maxWidth: '400px',
        animation: 'slideInRight 0.3s ease',
        fontSize: '14px',
        fontWeight: '500'
    });

    document.body.appendChild(notification);

    // Botão de fechar
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });

    // Auto-remover após 5 segundos
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

function openPeriodModal() {
    showNotification('Seleção de período personalizado em desenvolvimento! 📅', 'info');
}

// ========================================
// INICIALIZAÇÃO
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Carregado - Iniciando setup...'); // Para debug
    initializeDateInput();
    updateDashboard();
    renderTransactions();
    initializePieChart();
    setupEventListeners();
});

function setupEventListeners() {
    console.log('Configurando event listeners...'); // Para debug
    
    // Menu mobile
    const menuButton = document.querySelector('.menu-button');
    const mobileMenu = document.querySelector('.mobile-menu-overlay');
    const closeButton = document.querySelector('.close-button');

    if (menuButton) {
        menuButton.addEventListener('click', () => {
            mobileMenu?.classList.add('active');
        });
    }

    if (closeButton) {
        closeButton.addEventListener('click', () => {
            mobileMenu?.classList.remove('active');
        });
    }

    // Botões de período (filtros)
    const periodButtons = document.querySelectorAll('.period-btn');
    console.log('Encontrados botões de período:', periodButtons.length); // Para debug
    
    periodButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            console.log('Botão de período clicado'); // Para debug
            // Remove active de todos
            periodButtons.forEach(b => b.classList.remove('active'));
            // Adiciona active no clicado
            this.classList.add('active');
            // Mostra notificação
            showNotification('Funcionalidade de filtros em desenvolvimento! 📊', 'info');
        });
    });

    // Botão de seleção de período (calendário)
    const periodSelector = document.querySelector('.period-selector');
    if (periodSelector) {
        console.log('Encontrado seletor de período'); // Para debug
        periodSelector.addEventListener('click', openPeriodModal);
    }

    // Botão de transferência
    const transferBtn = document.querySelector('.transfer-btn');
    if (transferBtn) {
        console.log('Encontrado botão de transferência'); // Para debug
        transferBtn.addEventListener('click', () => {
            console.log('Botão de transferência clicado'); // Para debug
            showNotification('Funcionalidade de transferência em desenvolvimento! 💸', 'info');
        });
    }
}

function initializeDateInput() {
    const dateInput = document.getElementById('date');
    const today = new Date().toISOString().split('T')[0];
    dateInput.value = today;
}

// ========================================
// MODAL
// ========================================

function openModal(type) {
    currentTransactionType = type;
    const modal = document.getElementById('transactionModal');
    const modalTitle = document.getElementById('modalTitle');
    const categoryField = document.getElementById('categoryField');
    
    if (type === 'income') {
        modalTitle.textContent = 'Adicionar Renda';
        categoryField.style.display = 'none';
    } else {
        modalTitle.textContent = 'Adicionar Despesa';
        categoryField.style.display = 'block';
    }
    
    document.getElementById('transactionForm').reset();
    initializeDateInput();
    modal.classList.add('is-active');
}

function closeModal() {
    const modal = document.getElementById('transactionModal');
    modal.classList.remove('is-active');
}

// ========================================
// TRANSAÇÕES
// ========================================

function saveTransaction() {
    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const category = document.getElementById('category').value;
    const date = document.getElementById('date').value;

    if (!description || !amount || !date) {
        alert('Por favor, preencha todos os campos obrigatórios!');
        return;
    }

    if (currentTransactionType === 'expense' && !category) {
        alert('Por favor, selecione uma categoria!');
        return;
    }

    const transaction = {
        id: Date.now(),
        type: currentTransactionType,
        description,
        amount,
        category: currentTransactionType === 'income' ? 'Renda' : category,
        date,
        timestamp: new Date(date).getTime()
    };

    transactions.push(transaction);
    localStorage.setItem('finup_transactions', JSON.stringify(transactions));

    updateDashboard();
    renderTransactions();
    updatePieChart();
    closeModal();
}

function deleteTransaction(id) {
    if (confirm('Deseja realmente excluir esta transação?')) {
        transactions = transactions.filter(t => t.id !== id);
        localStorage.setItem('finup_transactions', JSON.stringify(transactions));
        updateDashboard();
        renderTransactions();
        updatePieChart();
    }
}

// ========================================
// CÁLCULOS
// ========================================

function calculateTotals() {
    const income = transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);

    const expenses = transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);

    const balance = income - expenses;

    return { income, expenses, balance };
}

function calculateExpensesByCategory() {
    const expensesByCategory = {};
    
    transactions
        .filter(t => t.type === 'expense')
        .forEach(t => {
            if (!expensesByCategory[t.category]) {
                expensesByCategory[t.category] = 0;
            }
            expensesByCategory[t.category] += t.amount;
        });

    return expensesByCategory;
}

// ========================================
// ATUALIZAÇÃO DA INTERFACE
// ========================================

function updateDashboard() {
    const { income, expenses, balance } = calculateTotals();

    document.getElementById('saldoAtual').textContent = formatCurrency(balance);
    document.getElementById('rendaTotal').textContent = formatCurrency(income);
    document.getElementById('despesasTotal').textContent = formatCurrency(expenses);
}

function renderTransactions() {
    const container = document.getElementById('transactionsList');
    
    if (transactions.length === 0) {
        container.innerHTML = '<p class="empty-message">Nenhuma transação ainda. Adicione uma receita ou despesa!</p>';
        return;
    }

    const sortedTransactions = [...transactions].sort((a, b) => b.timestamp - a.timestamp);
    
    container.innerHTML = sortedTransactions.map(t => `
        <div class="transaction-item">
            <div class="transaction-desc">
                <div class="transaction-icon">
                    ${t.description.substring(0, 2).toUpperCase()}
                </div>
                <span class="transaction-name">${t.description}</span>
            </div>
            <div class="transaction-category">${t.category}</div>
            <div class="transaction-date">${formatDate(t.date)}</div>
            <div class="transaction-amount ${t.type === 'income' ? 'positive' : 'negative'}">
                ${t.type === 'income' ? '+' : '-'}${formatCurrency(t.amount)}
            </div>
            <button class="transaction-delete" onclick="deleteTransaction(${t.id})">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `).join('');
}

// ========================================
// GRÁFICO DE PIZZA
// ========================================

function initializePieChart() {
    const ctx = document.getElementById('pieChart').getContext('2d');
    
    pieChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: [],
            datasets: [{
                data: [],
                backgroundColor: [],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = formatCurrency(context.parsed);
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((context.parsed / total) * 100).toFixed(2);
                            return `${label}: ${value} (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });

    updatePieChart();
}

function updatePieChart() {
    const expensesByCategory = calculateExpensesByCategory();
    const categories = Object.keys(expensesByCategory);
    const values = Object.values(expensesByCategory);
    const colors = categories.map(cat => CATEGORY_COLORS[cat] || '#cccccc');

    pieChart.data.labels = categories;
    pieChart.data.datasets[0].data = values;
    pieChart.data.datasets[0].backgroundColor = colors;
    pieChart.update();

    updateLegend(expensesByCategory);
}

function updateLegend(expensesByCategory) {
    const container = document.getElementById('legendContainer');
    const total = Object.values(expensesByCategory).reduce((a, b) => a + b, 0);

    if (total === 0) {
        container.innerHTML = '<p class="empty-message">Nenhuma despesa registrada ainda.</p>';
        return;
    }

    container.innerHTML = Object.entries(expensesByCategory)
        .sort((a, b) => b[1] - a[1])
        .map(([category, amount]) => {
            const percentage = ((amount / total) * 100).toFixed(2);
            const color = CATEGORY_COLORS[category] || '#cccccc';
            const icon = CATEGORY_ICONS[category] || 'fa-circle';

            return `
                <div class="legend-item">
                    <div class="legend-color" style="background: ${color}">
                        <i class="fas ${icon}"></i>
                    </div>
                    <div class="legend-label">${category}</div>
                    <div class="legend-value">${percentage}%</div>
                </div>
            `;
        })
        .join('');
}

// ========================================
// UTILITÁRIOS
// ========================================

function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
}

function formatDate(dateString) {
    const date = new Date(dateString + 'T00:00:00');
    return date.toLocaleDateString('pt-BR');
}

// ========================================
// EXPORTAR PARA DEBUG (OPCIONAL)
// ========================================

window.clearAllData = function() {
    if (confirm('Isso apagará TODAS as transações. Tem certeza?')) {
        localStorage.removeItem('finup_transactions');
        transactions = [];
        updateDashboard();
        renderTransactions();
        updatePieChart();
        alert('Dados limpos com sucesso!');
    }
}

// Adicionar animações CSS para as notificações (uma única vez)
if (!document.querySelector('#notification-styles')) {
    const notificationStyles = document.createElement('style');
    notificationStyles.id = 'notification-styles';
    notificationStyles.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(notificationStyles);
}
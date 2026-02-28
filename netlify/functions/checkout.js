/**
 * AURUM STREET - Checkout Function (Netlify/Node.js)
 * Integração com a API da InvictusPay
 */

const axios = require('axios');

// Configuração da InvictusPay
const INVICTUSPAY_CONFIG = {
    apiToken: '3ihk0rKiQGExEfKaeVd6OIgE5TZgbMQySDh79ZGIWZTs3iKtb1PeU6M6rcbA',
    baseUrl: 'https://api.invictuspay.app.br/api',
    expireInDays: 1,
    // Timeout aumentado para 60 segundos (transações acima de R$1000 podem demorar mais)
    timeout: 60000
};

// Headers padrão para requisições
const getHeaders = () => ({
    'Accept': 'application/json',
    'Content-Type': 'application/json'
});

/**
 * Limpar documento (CPF/CNPJ) - remove pontos e traços
 */
const cleanDocument = (document) => {
    if (!document) return '';
    return document.replace(/[^0-9]/g, '');
};

/**
 * Limpar telefone - remove caracteres especiais
 */
const cleanPhone = (phone) => {
    if (!phone) return '21999999999';
    const cleaned = phone.replace(/[^0-9]/g, '');
    // Garantir DDD + número (mínimo 10 dígitos)
    if (cleaned.length < 10) {
        return '21' + cleaned;
    }
    return cleaned;
};

/**
 * Limpar CEP
 */
const cleanZipCode = (zipCode) => {
    if (!zipCode) return '';
    return zipCode.replace(/[^0-9]/g, '');
};

/**
 * Formatar mensagem de erro
 */
const formatErrorMessage = (error) => {
    if (typeof error === 'string') return error;
    if (error.message) return error.message;
    if (error.error) return error.error;
    if (error.data && error.data.message) return error.data.message;
    if (error.data && error.data.error) return error.data.error;
    
    // Tratar erros específicos de limite
    const errorString = JSON.stringify(error);
    if (errorString.includes('limit') || errorString.includes('valor') || errorString.includes('exced')) {
        return 'O valor da transação excede o limite permitido. Tente um valor menor ou entre em contato com seu banco.';
    }
    
    return 'Erro ao processar pagamento';
};

/**
 * Calcular total do carrinho
 */
const calculateTotal = (items) => {
    let total = 0;
    items.forEach(item => {
        const price = parseFloat(item.price) || 0;
        const quantity = parseInt(item.quantity) || 1;
        total += price * quantity * 100; // Converter para centavos
    });
    return total;
};

/**
 * Construir payload do carrinho para a InvictusPay
 */
const buildCartPayload = (items) => {
    return items.map((item, index) => {
        const price = parseFloat(item.price) || 0;
        const quantity = parseInt(item.quantity) || 1;

        // Operation type: 1=venda principal, 2=orderbump, 3=upsell
        const operationType = index === 0 ? 1 : 2;

        return {
            product_hash: item.product_hash || null,
            title: item.name || 'Produto',
            cover: item.image || null,
            price: Math.round(price * 100), // Centavos
            quantity: quantity,
            operation_type: operationType,
            tangible: false
        };
    });
};

/**
 * Criar transação na InvictusPay
 */
const createTransaction = async (payload) => {
    const url = `${INVICTUSPAY_CONFIG.baseUrl}/public/v1/transactions?api_token=${INVICTUSPAY_CONFIG.apiToken}`;
    
    try {
        const response = await axios.post(url, payload, {
            headers: getHeaders(),
            timeout: INVICTUSPAY_CONFIG.timeout
        });
        
        return {
            success: true,
            data: response.data
        };
    } catch (error) {
        const errorData = error.response?.data || {};
        const errorString = JSON.stringify(errorData);
        
        // Identificar erros específicos de limite/valor
        let errorCode = errorData.code || 'API_ERROR';
        
        // Verificar se é erro de limite
        if (errorString.includes('limit') || 
            errorString.includes('valor') || 
            errorString.includes('exced') ||
            errorString.includes('maximo') ||
            errorString.includes('máximo') ||
            error.response?.status === 422 ||
            error.response?.status === 400) {
            errorCode = 'LIMIT_EXCEEDED';
        }
        
        return {
            success: false,
            error: formatErrorMessage(errorData),
            code: errorCode,
            statusCode: error.response?.status || 500,
            data: errorData
        };
    }
};

/**
 * Consultar status de uma transação
 */
const getTransactionStatus = async (transactionHash) => {
    const url = `${INVICTUSPAY_CONFIG.baseUrl}/public/v1/transactions/${transactionHash}?api_token=${INVICTUSPAY_CONFIG.apiToken}`;
    
    try {
        const response = await axios.get(url, {
            headers: getHeaders(),
            timeout: INVICTUSPAY_CONFIG.timeout
        });
        
        return {
            success: true,
            data: response.data
        };
    } catch (error) {
        return {
            success: false,
            error: 'Erro ao consultar transação'
        };
    }
};

/**
 * Handler principal da função
 */
exports.handler = async (event) => {
    // Log para debugging
    console.log('═══════════════════════════════════════════════════════════════');
    console.log('📦 Aurum Street Checkout - Nova requisição');
    console.log('Method:', event.httpMethod);
    console.log('Headers:', JSON.stringify(event.headers, null, 2));
    console.log('Body length:', event.body ? event.body.length : 0);
    console.log('═══════════════════════════════════════════════════════════════');
    
    // CORS - Tratar preflight
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
            },
            body: ''
        };
    }
    
    // Apenas aceitar POST
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                success: false,
                error: 'Método não permitido',
                code: 'METHOD_NOT_ALLOWED'
            })
        };
    }
    
    try {
        // Parsear dados da requisição
        const data = JSON.parse(event.body);
        console.log('📋 Dados recebidos:', JSON.stringify(data, null, 2));
        
        // Validações básicas
        if (!data.items || !Array.isArray(data.items) || data.items.length === 0) {
            return {
                statusCode: 400,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    success: false,
                    error: 'Carrinho vazio',
                    code: 'EMPTY_CART'
                })
            };
        }
        
        if (!data.customer || !data.customer.email) {
            return {
                statusCode: 400,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    success: false,
                    error: 'E-mail obrigatório',
                    code: 'MISSING_EMAIL'
                })
            };
        }
        
        if (!data.paymentMethod) {
            return {
                statusCode: 400,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    success: false,
                    error: 'Método de pagamento obrigatório',
                    code: 'MISSING_PAYMENT_METHOD'
                })
            };
        }
        
        // Validar método de pagamento
        const validMethods = ['pix', 'credit_card', 'billet'];
        if (!validMethods.includes(data.paymentMethod)) {
            return {
                statusCode: 400,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    success: false,
                    error: `Método não suportado. Opções: ${validMethods.join(', ')}`,
                    code: 'INVALID_PAYMENT_METHOD'
                })
            };
        }
        
        // Validar product_hash de cada produto no carrinho
        const missingProductHashs = data.items.filter(item => !item.product_hash);
        if (missingProductHashs.length > 0) {
            return {
                statusCode: 400,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    success: false,
                    error: `Os seguintes produtos não têm hash configurado: ${missingProductHashs.map(i => i.name).join(', ')}`,
                    code: 'MISSING_PRODUCT_HASH'
                })
            };
        }
        
        // Calcular e validar total - ALERTA para valores altos
        const totalAmount = calculateTotal(data.items);
        const totalInReais = totalAmount / 100;
        
        console.log('💰 Valor total da transação:', totalInReais.toFixed(2), 'BRL');
        
        if (totalAmount > 100000) { // Maior que R$ 1000 em centavos
            console.log('⚠️ ALERTA: Transação de alto valor detectada!');
            console.log('📊 O valor de R$', totalInReais.toFixed(2), 'pode requerer verificação adicional');
        }
        
        // Usar offer_hash do primeiro produto se não fornecido
        const offerHash = data.offer_hash || data.items[0]?.product_hash || null;
        
        if (!offerHash) {
            return {
                statusCode: 400,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    success: false,
                    error: 'Hash do produto é obrigatório. Configure a hash no código.',
                    code: 'MISSING_OFFER_HASH'
                })
            };
        }

        // Validar dados do cartão se for crédito
        if (data.paymentMethod === 'credit_card' && !data.card) {
            return {
                statusCode: 400,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    success: false,
                    error: 'Dados do cartão são obrigatórios para pagamento com cartão de crédito',
                    code: 'MISSING_CARD_DATA'
                })
            };
        }

        // Construir payload da transação
        const cartPayload = buildCartPayload(data.items);
        
        const payload = {
            amount: totalAmount,
            offer_hash: offerHash,
            payment_method: data.paymentMethod,
            customer: {
                name: data.customer.name || 'Cliente',
                email: data.customer.email,
                phone_number: cleanPhone(data.customer.phone || data.customer.phone_number),
                document: cleanDocument(data.customer.document || data.customer.cpf || '')
            },
            cart: cartPayload,
            installments: data.installments || 1,
            expire_in_days: INVICTUSPAY_CONFIG.expireInDays,
            transaction_origin: 'api',
            tracking: {
                src: '',
                utm_source: '',
                utm_medium: '',
                utm_campaign: '',
                utm_term: '',
                utm_content: ''
            }
        };
        
        // Adicionar dados do cartão se for pagamento com cartão
        if (data.paymentMethod === 'credit_card' && data.card) {
            payload.card = {
                number: (data.card.number || '').replace(/\s/g, ''),
                holder_name: data.card.holder_name || '',
                exp_month: parseInt(data.card.exp_month || data.card.month || 0),
                exp_year: parseInt(data.card.exp_year || data.card.year || 0),
                cvv: data.card.cvv || data.card.security_code || ''
            };
        }
        
        // Adicionar endereço se fornecido (para todos os métodos de pagamento)
        const customerAddress = data.customer.address;
        if (customerAddress) {
            payload.customer.street_name = customerAddress.street || customerAddress.logradouro || '';
            payload.customer.number = customerAddress.number || customerAddress.numero || 'sn';
            payload.customer.complement = customerAddress.complement || customerAddress.complemento || '';
            payload.customer.neighborhood = customerAddress.neighborhood || customerAddress.bairro || '';
            payload.customer.city = customerAddress.city || customerAddress.cidade || '';
            payload.customer.state = customerAddress.state || customerAddress.estado || '';
            payload.customer.zip_code = cleanZipCode(customerAddress.zipcode || customerAddress.cep || '');
        } else if (data.customer.street_name) {
            // Fallback para formato antigo
            payload.customer.street_name = data.customer.street_name;
            payload.customer.number = data.customer.number || 'sn';
            payload.customer.complement = data.customer.complement || '';
            payload.customer.neighborhood = data.customer.neighborhood || '';
            payload.customer.city = data.customer.city || '';
            payload.customer.state = data.customer.state || '';
            payload.customer.zip_code = cleanZipCode(data.customer.zip_code || data.customer.cep || '');
        }
        
        console.log('📤 Enviando para InvictusPay...');
        console.log('URL:', `${INVICTUSPAY_CONFIG.baseUrl}/public/v1/transactions?api_token=***`);
        console.log('Payload:', JSON.stringify(payload, null, 2));

        // Criar transação
        console.log('⏳ Chamando API da InvictusPay...');
        const result = await createTransaction(payload);

        console.log('📥 Resposta da InvictusPay recebida!');
        console.log('Success:', result.success);
        if (result.success) {
            console.log('Transaction Hash:', result.data?.hash);
            console.log('Status:', result.data?.status);
            console.log('PIX Code:', result.data?.pix_code || 'N/A');
        } else {
            console.log('❌ Erro:', result.error);
            console.log('Error Code:', result.code);
        }

        if (result.success) {
            console.log('✅ Transação criada com sucesso');
            
            const responseData = result.data;
            
            // Retornar dados formatados
            return {
                statusCode: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                    'Cache-Control': 'no-cache'
                },
                body: JSON.stringify({
                    success: true,
                    transaction_hash: responseData.hash || responseData.transaction_hash || null,
                    status: responseData.status || 'pending',
                    payment_method: data.paymentMethod,
                    payment_url: responseData.payment_url || responseData.url || null,
                    qr_code: responseData.pix_code || responseData.qr_code || null,
                    qr_code_base64: responseData.pix_code_base64 || responseData.qr_code_base64 || null,
                    billet_url: responseData.billet_url || responseData.boleto_url || null,
                    billet_barcode: responseData.billet_barcode || responseData.boleto_barcode || null,
                    billet_digitable_line: responseData.billet_digitable_line || null,
                    data: responseData
                })
            };
        } else {
            console.log('❌ Erro na transação:', result.error);
            console.log('📊 Código do erro:', result.code);
            console.log('💰 Valor da transação:', totalInReais.toFixed(2), 'BRL');
            
            // Mensagem mais amigável para erros de limite
            let userFriendlyError = result.error;
            if (result.code === 'LIMIT_EXCEEDED') {
                userFriendlyError = 'O valor da transação excede o limite permitido. Por favor, tente: (1) um valor menor, (2) pagamento parcelado, ou (3) entre em contato com seu banco para liberar o limite.';
                console.log('⚠️ Erro de limite detectado - valor pode ser muito alto para a conta');
            }
            
            return {
                statusCode: 400,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    success: false,
                    error: userFriendlyError,
                    code: result.code || 'PAYMENT_ERROR',
                    original_error: result.error
                })
            };
        }
        
    } catch (error) {
        console.error('💥 Erro interno:', error.message);
        
        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                success: false,
                error: 'Erro interno: ' + error.message,
                code: 'INTERNAL_ERROR'
            })
        };
    }
};

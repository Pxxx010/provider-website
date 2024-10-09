document.querySelector('form').addEventListener('submit', function (event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    const email = document.getElementById('floatingInput').value;
    const password = document.getElementById('floatingPassword').value;
    const rememberMe = document.getElementById('flexCheckDefault').checked;

    // Verificação dos campos
    if (!email || !password) {
        console.log('Por favor, preencha todos os campos obrigatórios.');
        return; // Interrompe o envio se algum campo estiver vazio
    }

    // Montando os dados para envio
    const data = {
        email: email,
        senha: password
    };

    // Fazendo a requisição POST para a API de login
    fetch('https://backend-provider.onrender.com/api/admin/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    .then(response => {
        if (!response.ok) {
            if (response.status === 400) {
                console.log('Erro 400: E-mail ou senha inválidos.');
            } else {
                console.log(`Erro ${response.status}: Ocorreu um problema.`);
            }
            // Aqui retornamos uma Promise rejeitada para interromper a cadeia
            return Promise.reject(new Error('Falha na requisição'));            
        }
        return response.json(); // Parseia a resposta JSON
    })
    .then(result => {
        if (result && result.token) {

            // Guardando o token no localStorage com a key 'Authorization'
            localStorage.setItem('Authorization', `Bearer ${result.token}`);
            window.location.href = 'painel.html'

            if (rememberMe) {
                // Se "lembrar-me" estiver marcado, salva o email
                localStorage.setItem('userEmail', email);
            }

        } else {
            console.log('Não foi possível obter o token de autenticação.');
        }
    })
    .catch(error => {
        console.error('Erro:', error);
        console.log('Ocorreu um erro ao tentar realizar o login. Por favor, tente novamente.');
    });
});

document.querySelector('form').addEventListener('submit', function (event) {
    event.preventDefault(); // Impede o comportamento padrão de envio do formulário


    const nome = document.getElementById('floatingNome').value;
    const email = document.getElementById('floatingEmail').value;
    const password = document.getElementById('floatingPassword').value;
    const cargo = "Adm"; // Static por motivo de teste
    const telefone = "(00) 90000-0000"; // Static por motivo de teste

    if (!nome || !email || !password) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return; // Interrompe o envio se algum campo estiver vazio
    }

    // Montando os dados para envio
    const data = {
        nome: nome,
        email: email,
        cargo: cargo,
        senha: password,
        telefone: telefone
    };

    // Fazendo a requisição POST para a API
    fetch('https://backend-provider.onrender.com/api/admin/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            if (response.status === 400) {
                alert('Erro 400: Solicitação inválida. Verifique os dados e tente novamente.');
            } else {
                console.log(`Erro ${response.status}: Ocorreu um problema.`);
                alert('Não foi possível cadastrar o usuário.');
            }
            return; // Interrompe o fluxo se houver um erro
        }

        // Se a resposta for 201 (Created), segue o fluxo de sucesso
        if (response.status === 201) {
            alert('Usuário registrado com sucesso.');
            return response.json(); // Retorna o resultado para processamento posterior, se necessário
        }
    })
    .then(result => {
        if (result) {
            console.log('Sucesso:', result);
        }
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Ocorreu um erro ao registrar o usuário. Por favor, tente novamente.');
    });
});

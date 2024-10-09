function buscarEndereco() {
    const cep = document.getElementById('cep').value.replace(/\D/g, ''); // Remove caracteres não numéricos
    if (cep.length !== 8) {
        document.getElementById('resultado_cep').textContent = 'CEP inválido. Por favor, digite um CEP com 8 dígitos.';
        return;
    }

    const url = `https://viacep.com.br/ws/${cep}/json/`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na solicitação');
            }
            return response.json();
        })
        .then(data => {
            if (data.erro) {
                document.getElementById('resultado_cep').textContent = 'CEP não encontrado.';
            } else {
                if (data.localidade !== 'Recife' && data.localidade !== 'Abreu e Lima') {
                    document.getElementById('resultado_cep').innerHTML = `
                        <p><strong>Cidade não contemplada:</strong> Apenas entregas em Recife.</p>
                        <p><strong>Cidade informada:</strong> ${data.localidade}</p>
                    `;
                } else {
                    const endereco = `
                        CEP: ${data.cep} <br>
                        Logradouro: ${data.logradouro} <br>                
                        Bairro: ${data.bairro} <br>
                        Cidade: ${data.localidade} <br>
                        UF: ${data.uf}
                    `;
                    document.getElementById('resultado_cep').innerHTML = endereco;
                }
            }
        })
        .catch(error => {
            document.getElementById('resultado_cep').textContent = 'Ocorreu um erro: ' + error.message;
        });
}

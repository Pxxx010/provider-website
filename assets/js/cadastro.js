// URL do backend
api_url = "https://provider-backend.onrender.com";

window.addEventListener('DOMContentLoaded', async () => {
    if (window.location.pathname.includes('cadastro.html')) {
        const token = localStorage.getItem('token');
        const responsavelId = localStorage.getItem('id');
        if (!token) {
            window.location.href = 'index.html';
            return; // Adicionar return para evitar execução adicional
        }

        // Função para cadastrar um chamado
        document.getElementById('cadastrarChamadoForm')?.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Coletar dados do formulário
            const cliente = document.getElementById('cliente').value;
            const telefone = document.getElementById('telefone').value;
            const categoriaId = document.getElementById('categoria').value; // Aqui está correto
            const descricao = document.getElementById('descricao').value;
            
            // Verificar se os campos necessários estão preenchidos
            if (!cliente || !telefone || !categoriaId || !descricao) {
                alert('Por favor, preencha todos os campos.');
                return;
            }
            
            // Post Cadastro
            try {
                const response = await fetch(`${api_url}/api/chamado`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ cliente, telefone, categoria: categoriaId, descricao, responsavelId }), // Alterado para categoria: categoriaId
                });

                if (response.ok) {
                    alert('Chamado cadastrado com sucesso!');
                    // Limpar o formulário
                    document.getElementById('cadastrarChamadoForm').reset();
                } else {
                    const data = await response.json();
                    alert(`Erro: ${data.message}`);
                }

            } catch (error) {
                console.error('Erro ao cadastrar chamado:', error);
                alert('Ocorreu um erro ao tentar cadastrar o chamado.');
            }
        });
    }
});


// By Afonso Estevão Luna, mini sistema de chamados

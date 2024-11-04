//  json-server --watch db.json
// Função para buscar produtos da API e exibi-los na página
async function carregarProdutos() {
    try {
        const resposta = await fetch('http://localhost:3000/produtos'); // URL do json-server
        const produtos = await resposta.json(); // Certifique-se de chamar json() com parênteses

        const container = document.querySelector('.produtos__card-container');
        container.innerHTML = ''; // Limpa o conteúdo anterior

        // Cria os cards de produto dinamicamente
        produtos.forEach(produto => {
            const card = document.createElement('div');
            card.classList.add('produtos__card');

            card.innerHTML = `
                <img class="produtos__imagem" src="${produto.imagem}" alt="${produto.nome}">
                <h3 class="produtos__nome">${produto.nome}</h3>
                <p class="produtos__valor"> R$${produto.valor}</p>
                <img class="produtos__botao--excluir" src="imagem/lixeira.png" alt="Botão Excluir" onclick="excluirProduto(parseInt(${produto.id}))"
">
            `;

            container.appendChild(card);
        });
    } catch (error) {
        console.error("Erro ao carregar os produtos:", error);
    }
}

// Função para excluir um produto
async function excluirProduto(id) {
    try {
        await fetch(`http://localhost:3000/produtos/${id}`, {
            method: 'DELETE',
        });
        carregarProdutos(); // Recarrega a lista de produtos após a exclusão 
    } catch (error) {
        console.error("Erro ao excluir o produto:", error);
    }
}

// Função para adicionar um novo produto
document.querySelector('.adicionar__produto--formulario').addEventListener('submit', async (event) => {
    event.preventDefault(); // Evita o envio padrão do formulário

    const nome = document.getElementById('nome-produto').value;
    const valor = document.getElementById('valor-produto').value;
    const imagem = document.getElementById('imagem-produto').value;

    const novoProduto = {
        nome: nome,
        valor: valor,
        imagem: imagem,
    };

    try {
        await fetch('http://localhost:3000/produtos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(novoProduto),
        });
        carregarProdutos(); // Recarrega a lista de produtos após a adição
        event.target.reset(); // Limpa o formulário
    } catch (error) {
        console.error("Erro ao adicionar o produto:", error);
    }
});

// Carrega os produtos ao iniciar a página
document.addEventListener('DOMContentLoaded', carregarProdutos);

let carrinho = [];

function adicionarAoCarrinho(nome, preco, imagem) {
    carrinho.push({
        nome: nome,
        preco: preco,
        imagem: imagem
    });

    atualizarCarrinho();

    alert("Produto adicionado ao carrinho!");
}

function comprarAgora(nome, preco, imagem) {
    adicionarAoCarrinho(nome, preco, imagem);

    const modalElement = document.getElementById("modalCarrinho");

    const modal = bootstrap.Modal.getOrCreateInstance(modalElement);

    modal.show();
}

function atualizarCarrinho() {

    const listaHtml = document.getElementById("lista-carrinho");
    const totalHtml = document.getElementById("total-carrinho");
    const qtdBadge = document.getElementById("qtd-carrinho");

    qtdBadge.innerText = carrinho.length;

    if (carrinho.length === 0) {

        listaHtml.innerHTML = `
            <p class="text-center text-secondary py-4 mb-0">
                Seu carrinho está vazio.
            </p>
        `;

        totalHtml.innerText = "R$ 0,00";

        return;
    }

    listaHtml.innerHTML = "";

    let total = 0;

    carrinho.forEach((item, index) => {

        total += item.preco;

        listaHtml.innerHTML += `
            <div class="d-flex align-items-center justify-content-between bg-dark p-2 rounded border border-secondary">

                <div class="d-flex align-items-center gap-3">

                    <img
                        src="${item.imagem}"
                        alt="${item.nome}"
                        style="width: 50px; height: 50px; object-fit: cover;"
                        class="rounded"
                    >

                    <div>
                        <h6 class="mb-0 fw-bold small text-light">
                            ${item.nome}
                        </h6>

                        <span class="text-magenta small font-monospace">
                            R$ ${item.preco.toFixed(2).replace(".", ",")}
                        </span>
                    </div>

                </div>

                <button
                    class="btn btn-sm btn-outline-danger border-0"
                    onclick="removerItem(${index})"
                    title="Remover item"
                >
                    <i class="bi bi-trash-fill"></i>
                </button>

            </div>
        `;
    });

    totalHtml.innerText =
        `R$ ${total.toFixed(2).replace(".", ",")}`;
}

function removerItem(index) {

    carrinho.splice(index, 1);

    atualizarCarrinho();
}

function limparCarrinho() {

    carrinho = [];

    atualizarCarrinho();
}

function finalizarCompra() {

    if (carrinho.length === 0) {

        alert("Seu carrinho está vazio!");

        return;
    }

    alert(
        "Pedido realizado com sucesso! Obrigado por comprar na RAW OVERSIZED."
    );

    limparCarrinho();

    const modalElement =
        document.getElementById("modalCarrinho");

    const modal =
        bootstrap.Modal.getInstance(modalElement);

    if (modal) {
        modal.hide();
    }
}
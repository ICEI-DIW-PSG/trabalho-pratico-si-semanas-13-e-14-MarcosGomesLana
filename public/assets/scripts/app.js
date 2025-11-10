const logo = "assets/img/logo.png";
const tituloCard = "Títulos populares";

function buscarDados(){
    fetch('http://localhost:3000/livros')

    .then(response => {

        if (!response.ok){

            throw new Error(`Erro HTTP, status: ${response.status}`);

        }

        return response.json();

    })

    .then(livros => {

        RenderizarCards(livros);

    })

    .catch(error => {
        console.error("Não foi possivel caregar os dados dos livros: ", error);
    })
}

function RenderizarCards (estruturaLivros){

    let cardRow = document.getElementById("row1");


    estruturaLivros.forEach(livro => {
        const strLivro = `
        
        <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
        <a style="text-decoration: none; color: #261c1a;" href="detalhes.html?id=${livro.id}">
          <div class="card h-100">
            <img src="${livro.image}" class="card-img-top" alt="Imagem do produto">
            <div class="card-body">
              <h5><strong>${livro.titulo}</strong></h5>
              <h5><small><strong>${livro.autor}</strong></small></h5>
              <p class="card-text">${livro.descricaoInicial}</p>

            </div>
          </div>
          </a>
        </div>
        
        `;

        cardRow.innerHTML += strLivro;
    });
    

}

const perfil = [{
    profissao: "Desenvolvedor",
    image: "assets/img/Marcosgomes.JPG",
    nome: "Marcos Gomes",
    curso: "Análise e Desenvolvimento de Sistemas",
    turno: "Noite",
    redesSociais: {

        facebook: "https://www.facebook.com/?locale=pt_BR",
        twitter: "https://x.com/"

    },
    sobre: "Me chamo Marcos, tenho 19 anos, e quero te convidar para conhecer um pouco do meu trabalho na Leia Comigo — um espaço feito para quem ama histórias e quer descobrir novos mundos. Aqui, você vai conhecer livros e autores incríveis, que podem transformar a forma como você vê a leitura."




}];

const carousel = [
    {
        id: 1,
        imageCaroucel: "assets/img/banner1.png",
        titulo: "Conheça Ben <br> Carson"
    },
    {
        id: 2,
        imageCaroucel: "assets/img/banner2.jpg",
        titulo: "Saiba por onde <br> Começar"

    },
    {
        id: 3,
        imageCaroucel: "assets/img/banner3.jpg",
        titulo: "Leitura da <br> tarde de café"
    }


];


function carregarLogo() {
    let nav = document.getElementById("navbar");
    let strNav =
        `    

    <div class="container-fluid">
  <a class="navbar-brand" href="index.html">
    <img src="${logo}" alt="Logo" class="img-fluid logo-nav" style="max-height:48px;">
  </a>

  <button class="navbar-toggler" type="button" 
          data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" 
          aria-controls="navbarNavAltMarkup" aria-expanded="false" 
          aria-label="Alternar navegação">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
    <div class="navbar-nav ms-auto">
      <a class="nav-link active ml-4" aria-current="page" href="apresentacao.html">Dados</a>
    </div>
  </div>
</div>

            

    `;

    nav.innerHTML = strNav;

}


function carregarFooter() {

    let rowFooter = document.getElementById("rowFooter");

    for (let i = 0; i < perfil.length; i++) {

        let footerPerfil = perfil[i];
        let strRowFooter = `<div class="col-md-8">
          <h5>Sobre</h5>
          <p>${footerPerfil.sobre}}</p>
        </div>
        <div class="col-md-4">
          <div class="author-box">
            <p>${footerPerfil.profissao}</p>
            <div class="d-flex">
              <img src="${footerPerfil.image}" alt="Foto do aluno.">
              <div class="ml-3">
                <p class="mb-1"><small><strong>Nome: </strong>${footerPerfil.nome}</small></p>
                <p class="mb-0"><small><strong>Curso: </strong>${footerPerfil.curso}</small></p>
                <p class="mb-0"><small><strong>Turno: </strong>${footerPerfil.profissao}</small></p>

              </div>
            </div>
            <hr>
            <div class="d-flex">
              <p class="mr-3">Redes sociais:</p>
              <div>
                <a href="${footerPerfil.redesSociais.facebook}" class="fs-5" style="color:#f6ecdc;"><i class="fab fa-facebook mr-3"></i></a>
                <a href="${footerPerfil.redesSociais.twitter}" class="fs-5" style="color:#f6ecdc;"><i class="fab fa-twitter"></i></a>
              </div>
            </div>
          </div>
        </div>`;

        rowFooter.innerHTML = strRowFooter;

    }

}

function carregarCaroucel() {
    let caroucelInner = document.getElementById("caroucel1");

    for (let i = 0; i < carousel.length; i++) {
        let dadosCaroucel = carousel[i];
        let strCaroucel
        if (i == 0) {
            strCaroucel = `
            <div class="carousel-item active">
        <a href="detalhes.html?id=${dadosCaroucel.id}"><img class="d-block w-100" src="${dadosCaroucel.imageCaroucel}" alt="Primeiro Slide"></a>
        <div class="carousel-caption d-none d-md-block ">
          <div class="d-flex justify-content-center">
            <h5 style="text-align: left;" class="banner-text">${dadosCaroucel.titulo}</h5>
          </div>
        </div>
      </div>
            `;
        } else {
            strCaroucel = `
             <div class="carousel-item">
        <a href="detalhes.html?id=${dadosCaroucel.id}"><img class="d-block w-100" src="${dadosCaroucel.imageCaroucel}" alt="Primeiro Slide"></a>
        <div class="carousel-caption d-none d-md-block ">
          <div class="d-flex justify-content-center">
            <h5 style="text-align: left;" class="banner-text">${dadosCaroucel.titulo}</h5>
          </div>
        </div>
      </div>
            `;
        }

        caroucelInner.innerHTML += strCaroucel;

    }
}


function buscarDetalhes() {
    const url = new URLSearchParams(window.location.search);
    const urlId = url.get("id");

    if (!urlId) {
        console.error("ID do livro não encontrado na URL. Verifique o link na home.");
        return; 
    }

    fetch(`http://localhost:3000/livros/${urlId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro HTTP ao buscar livro de ID ${urlId}. Status: ${response.status}`);
            }
            return response.json();
        })
        .then(livroUnico => {
            renderizarDetalhes(livroUnico);
        })
        .catch(error => {
            console.error("Não foi possível carregar os detalhes do livro:", error);
        });
}


function criarNovoLivro(event) {
    event.preventDefault(); 

    const formulario = event.target;
    const formData = new FormData(formulario);
    const dadosFormulario = Object.fromEntries(formData.entries());
    
    const imageDetalhes = [];
    
    for (let i = 1; i <= 4; i++) {
        const detalhe = dadosFormulario[`detalhes${i}`];
        const citacao = dadosFormulario[`citacao${i}`];
        
        if (detalhe) {
            imageDetalhes.push({
                detalhes: detalhe,
                citacao: citacao
            });
        }
        
        delete dadosFormulario[`detalhes${i}`];
        delete dadosFormulario[`citacao${i}`];
    }
    
    dadosFormulario.imageDetalhes = imageDetalhes;

    const url = 'http://localhost:3000/livros';

    fetch(url, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(dadosFormulario) 
    })
    .then(response => {
        if (response.status !== 201) { 
            throw new Error(`Erro HTTP: ${response.status}. Falha ao criar.`);
        }
        return response.json(); 
    })
    .then(livroCriado => {
        alert(`Publicação "${livroCriado.titulo}" criada com sucesso!`);
        window.location.href = 'index.html'; 
    })
    .catch(error => {
        console.error("Erro ao criar publicação: ", error);
        alert(`Ocorreu um erro ao criar a publicação. Verifique o console.`);
    });
}


function deleteLivro(id) {
    const url = new URLSearchParams(window.location.search);
    const urlId = url.get("id");

    if (!confirm(`Tem certeza que deseja EXCLUIR a publicação de ID ${urlId}?`)) {
        return; 
    }

    fetch(`http://localhost:3000/livros/${urlId}`, {
        method: 'DELETE' 
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}. Falha ao excluir.`);
        }
        return; 
    })
    .then(() => {
        alert("publicação excluído com sucesso!");
        window.location.href = 'index.html'; 
    })
    .catch(error => {
        console.error("Erro ao excluir:", error);
        alert(`Ocorreu um erro ao excluir a publicação.`);
    });
}


function iniciarEdicaoGET() { 
    const url = new URLSearchParams(window.location.search);
    const livroId = url.get("id"); 

    if (!livroId) {
        document.querySelector('h1').textContent = 'Criar Novo Livro';
        console.error("ID do livro não encontrado na URL. Modo Criação.");
        return; 
    }

    
    document.querySelector('h1').textContent = 'Carregando Livro para Edição...';

    fetch(`http://localhost:3000/livros/${livroId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro HTTP ao buscar livro de ID ${livroId}. Status: ${response.status}`);
            }
            return response.json(); 
        })
        .then(livro => { 
          
            document.getElementById('titulo').value = livro.titulo || '';
            document.getElementById('autor').value = livro.autor || '';
            document.getElementById('data-lancamento').value = livro.dataLancamento || '';
            document.getElementById('image').value = livro.image || '';
            document.getElementById('descricaoInicial').value = livro.descricaoInicial || '';
            document.getElementById('descricao').value = livro.descricao || '';
            
            
            document.getElementById('livroId').value = livro.id; 
            
            if (livro.imageDetalhes) {
                livro.imageDetalhes.forEach((detalhe, index) => {
                    const i = index + 1;
                    const inputDetalhe = document.getElementById(`detalhes${i}`);
                    const inputCitacao = document.getElementById(`citacao${i}`);
                    
                    if (inputDetalhe && inputCitacao) {
                         inputDetalhe.value = detalhe.detalhes || '';
                         inputCitacao.value = detalhe.citacao || '';
                    }
                });
            }
            
            const btnSubmit = document.querySelector('button[type="submit"]');
            if (btnSubmit) {
                btnSubmit.textContent = 'Salvar Alterações';
            }
            document.querySelector('h1').textContent = `Editar Livro: ${livro.titulo}`;

        })
        .catch(error => {
            console.error("Não foi possível carregar os dados para preenchimento:", error);
            alert(`Erro ao carregar publicação para edição: ${error.message}`);
         
        });
}


function atualizarLivroPUT(event) {
    event.preventDefault(); 

    const formulario = event.target;
    const formData = new FormData(formulario);
    const dadosFormulario = Object.fromEntries(formData.entries());
    
    const livroId = dadosFormulario.id; 

    if (!livroId) {
        alert("Erro: ID da publicação ausente para atualização. Não é possível salvar.");
        return;
    }

    delete dadosFormulario.id; 
    
    const imageDetalhes = [];
    for (let i = 1; i <= 4; i++) {
        const detalhe = dadosFormulario[`detalhes${i}`];
        const citacao = dadosFormulario[`citacao${i}`];
        
        if (detalhe) {
            imageDetalhes.push({
                detalhes: detalhe,
                citacao: citacao
            });
        }
        delete dadosFormulario[`detalhes${i}`];
        delete dadosFormulario[`citacao${i}`];
    }
    dadosFormulario.imageDetalhes = imageDetalhes;
    
    fetch(`http://localhost:3000/livros/${livroId}`, {
        method: 'PUT', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dadosFormulario)
    })
    .then(response => {
       
        if (!response.ok) { 
            throw new Error(`Erro: Status ${response.status}. Falha ao atualizar.`);
        }
        return response.json(); 
    })
    .then(livroAtualizado => {
        alert(`Publicação "${livroAtualizado.titulo}" atualizada com sucesso!`);
        window.location.href = 'detalhes.html?id=' + livroAtualizado.id; 
    })
    .catch(error => {
        console.error("Erro ao atualizar livro:", error);
        alert(`Ocorreu um erro ao atualizar a publicação: ${error.message}`);
    });
}


function renderizarDetalhes(dados) {
    const detalhesContainer = document.getElementById("detalhes1");
    const detalhesCardContainer = document.getElementById("detalhesCard1");
    const botoesDetalhes = document.getElementById("botoes");

    detalhesContainer.innerHTML = '';
    detalhesCardContainer.innerHTML = '';
    let = partesData = dados.dataLancamento.split('-');
    partesData.reverse();
    let dateLancamento = partesData.join('/');

    let strDados = `
        <div class="col-md-4 d-flex align-self-start">
            <img src="${dados.image}" class="detalhes-img-top mb-5" alt="Capa de livro">
        </div>
        <div class="col-md-8 mb-4 mt-8 align-self-start" style="text-align: left;">
            <h2 style="color:#261c1a"><strong>${dados.titulo}</strong></h2>
            <h5>Autor: ${dados.autor}</h5>
            <h5>Data de Lançamento: ${dateLancamento}</h5>
            <p>${dados.descricao}</p>
        </div>`;


    detalhesContainer.innerHTML += strDados;
    if (dados.imageDetalhes && dados.imageDetalhes.length > 0) {
        
        dados.imageDetalhes.forEach(cardDados => {
            let strCards = `
                <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                    <div class="card h-100">
                        <img src="${cardDados.detalhes}" class="card-img-top" alt="Imagem do produto">
                        <div class="card-body">
                            <p class="card-text"><i>${cardDados.citacao}</i></p>
                        </div>
                    </div>
                </div>`;
            
            detalhesCardContainer.innerHTML += strCards;
        });

        const strB = `
        <button onclick="deleteLivro('${dados.id}')" class="btn btn-danger mt-3">
                    Excluir publicação
                </button>

                <button onclick="window.location.href='formularioAtualizar.html?id=${dados.id}'"
                    class="btn btn-danger mt-3">
                    Atualizar publicação
                </button>
        `;
         botoesDetalhes.innerHTML = strB;

    }
}





// Grafíco

function renderizarGrafico(graf) {
    

        let tituloG = [];
        let anoG = [];
        
        graf.forEach(item => {
            tituloG.push(item.titulo);
            let ano = item.dataLancamento.slice(0,4);
            anoG.push(parseInt(ano));


            
        });

        const ctx = document.getElementById('graficoLivros');

        new Chart(ctx, {
        type: 'bar',
        data: {
            labels: tituloG.map(item => item),
            datasets: [{
            label: 'Ano de lançamento',
            data: anoG.map(itemA => itemA),
            backgroundColor: '#261c1a',
            borderColor: '#ffffffff',
            borderWidth: 1
            }]
        },
        options: {
            indexAxis: 'y', // transforma em barras horizontais
            scales: {
            x: {
                beginAtZero: false,
                title: { display: true, text: 'Ano de Lançamento' }
            },
            y: {
                title: { display: true, text: 'Título do Livro' }
            }
            }
        }
        });

       
         
    
}

function buscarGrafico(){
    fetch('http://localhost:3000/livros')

    .then(response => {

        if (!response.ok){

            throw new Error(`Erro HTTP, status: ${response.status}`);

        }

        return response.json();

    })

    .then(livros => {

        renderizarGrafico(livros);

    })

    .catch(error => {
        console.error("Não foi possivel caregar os dados dos livros: ", error);
    })
}



        
    




 



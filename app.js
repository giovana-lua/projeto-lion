"use-strict"
 
const container_home = document.getElementById('home')

const container_cursos = document.getElementById ('cursos')

const container_aluno = document.getElementById ('aluno')

const botoes_curso = document.querySelectorAll ('.btn-curso')




//buscando os alunos pelo curso 
  async function buscarAlunosPorCursos(curso) {
     const url = `https://lion-school-phbo.onrender.com/alunos?curso=${curso}`
     const response = await fetch(url)
     const dados = await response.json()

     return dados

 }

 
// acionamento do botao do curso 
botoes_curso.forEach(botao => {
    botao.addEventListener('click', () => {
        const cursoSelecionado = botao.innerText
        navegarParaCursos(cursoSelecionado)
    })
})


//assim que clica no botão a função leva para a turma
async function navegarParaCursos (nomeCurso) {

    // mostra uma div e remove outra 
    container_home.classList.add('hidden');
    container_cursos.classList.remove('hidden');

    //pega o nome do curso 
    const titulo_curso = document.getElementById('titulo');
    titulo_curso.textContent = nomeCurso;

    //garante que os alunos que apareçam são daquele determinado curso 
    //busca os alunos
    const cardsAntigos = container_cursos.querySelectorAll('.card-aluno');
    //remove os alunos "antigos"
    cardsAntigos.forEach(card => card.remove());


    const listaAlunos = await buscarAlunosPorCursos(nomeCurso);

    
    listaAlunos.forEach(aluno => {
        criarCardAluno(aluno); })

        const btnTexto = btnSair.lastChild;
        btnSair.innerHtml = `<img src= "./img/vector.png>" Voltar`
}


//Criando os cards dos alunos 
function criarCardAluno (aluno) {
    const container = document.getElementById ('cursos')

    //cria o card do aluno    
    const card = document.createElement('div')
    card.classList.add('card-aluno')

    //cria a foto do aluno 
    const foto = document.createElement('img')
    foto.src = './img/aluno.png'
    

    //cria o nome do aluno
    const nome = document.createElement('p')
    nome.textContent = aluno.nome

    //monta o card e coloca na tela 
    card.appendChild(foto)
    card.appendChild(nome)
    container.appendChild(card)
}

// acionamento botão voltar
    const btnSair = document.getElementById ('btn-sair')
    btnSair.addEventListener('click', () => {

    // remove o "hidden" da home e adiciona nos demais
    container_home.classList.remove('hidden');
    container_cursos.classList.add('hidden');
    container_aluno.classList.add('hidden')

    // remove o titulo do curso para não aperecer na home
    const titulo_curso = document.getElementById('titulo')
    titulo_curso.textContent = ""

    // limpa os cards 
    const limparCards = container_cursos.querySelectorAll('card-aluno')
    limparCards.forEach(card => card.remove)
    })
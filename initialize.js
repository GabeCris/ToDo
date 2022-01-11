function initialize(){
    const flag = localStorage.getItem('flag');
    console.log(flag);
    if(flag == undefined){
        localStorage.setItem('flag', 1);
        console.log("entrou aqui no local")

        const banco = [{
            'task': `Correr`,
            'type': `sports`,
            'description': `Correr no mínimo 3km por dia no aeroparque, de segunda a sábado`,
            'status': 'not-completed',
        },
        {
            'task': `Fazer atividade de artes`,
            'type': `studies`,
            'description': `Entregar atividade de artes no colégio`,
            'status': 'completed-task',
        },
        {
            'task': `Fazer dieta`,
            'type': `food`,
            'description': `Comer mais legumes, verduras, e comidas saudáveis em todas as refeições`,
            'status': 'not-completed',
        },
        {
            'task': `Estudar JavaScript`,
            'type': `studies`,
            'description': `Estudar mais arrays no JS (reduce, map e filter)`,
            'status': 'not-completed',
        },
        {
            'task': `Piquenique com familia`,
            'type': `family`,
            'description': `Fazer piquenique com a familia pelo menos em 2 fins de semana durante o mês`,
            'status': 'not-completed',
        },
        {
            'task': `Fazer academia`,
            'type': `sports`,
            'description': `Frequentar academia de segunda a sexta das 20h as 21h`,
            'status': 'not-completed',
        },
        {
            'task': `Praticar mais CSS`,
            'type': `studies`,
            'description': `Clonar mais projetos para melhorar minhas habilidades com o css`,
            'status': 'not-completed',
        },
        {
            'task': `Crimpagem de cabos`,
            'type': `work`,
            'description': `Fazer crimpagem dos cabos de rede da empresa`,
            'status': 'completed-task',
        },
        {
            'task': `Jogar futebol`,
            'type': `sports`,
            'description': `Jogar bola com os amigos todas as quintas-feiras`,
            'status': 'not-completed',
        },
        {
            'task': `Limpar a casa`,
            'type': `home`,
            'description': `Limpar a casa todas as sextas após o expediente`,
            'status': 'not-completed',
        },
        {
            'task': `Preparar janta`,
            'type': `food`,
            'description': `Fazer janta todas as noites`,
            'status': 'not-completed',
        },
        {
            'task': `Organizar arquivos`,
            'type': `work`,
            'description': `Organizar arquivos de descarte do trabalho`,
            'status': 'not-completed',
        },
        {
            'task': `Terminar série`,
            'type': `home`,
            'description': `Terminar de assistir The Rain na Netflix`,
            'status': 'completed-task',
        },
        {
            'task': `Terminar de ler livro`,
            'type': `studies`,
            'description': `Terminar de ler o livro Pai pobre pai rico`,
            'status': 'not-completed',
        },
    ]
    
        setBanco(banco);
        renderList();
    }
}
const nivelElemento = document.querySelector('.nivel');
const textoNivel = document.getElementById('nivel-texto');
const botao = document.querySelector('button');

async function aumentarNivel() {
    // Chamada para a API para obter o nível atual
    const res = await fetch('https://lixeira-back.vercel.app/api/nivel');
    
    if (!res.ok) {
        console.error('Erro ao buscar o nível da lixeira');
        return;
    }

    const data = await res.json();
    let nivel = data.nivel;  // A propriedade 'nivel' vem da resposta da API
    
    // Verifique se o valor de 'nivel' está correto antes de continuar
    console.log('Nível atual da lixeira:', nivel);

    if (nivel < 100) {
        nivel += 10;

        // Enviar a atualização do nível para o backend
        await fetch('https://lixeira-back.vercel.app/api/aumentarNivel', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nivel }),
        });

        nivelElemento.style.height = `${nivel}%`;
        textoNivel.innerText = `Nível: ${nivel}%`;

        if (nivel >= 80 && nivel <= 90) {
            alert(`Atenção! A lixeira está ${nivel}% cheia e precisa ser esvaziada.`);
            nivelElemento.style.background = "#FF4500";
        }

        if (nivel > 90) {
            alert(`Atenção! A lixeira está ${nivel}% cheia e precisa ser esvaziada.`);
            nivelElemento.style.background = "red";
        }
    }
}


async function esvaziarLixeira() {
    await fetch('https://lixeira-back.vercel.app/api/esvaziarLixeira', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    nivelElemento.style.height = `0%`;
    textoNivel.innerText = `Nível: 0%`;
    nivelElemento.style.background = "green";
}

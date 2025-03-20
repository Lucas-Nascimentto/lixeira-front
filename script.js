const nivelElemento = document.querySelector('.nivel');
const textoNivel = document.getElementById('nivel-texto');
const botao = document.querySelector('button');

async function atualizarNivel() {
    try {
        const res = await fetch('https://lixeira-back.vercel.app/api/nivel');

        if (!res.ok) {
            console.error('Erro ao buscar o nível da lixeira');
            return;
        }

        const data = await res.json();
        let nivel = data.nivel; // Nível recebido da API

        console.log('Nível atual da lixeira:', nivel);

        nivelElemento.style.height = `${nivel}%`;
        textoNivel.innerText = `Nível: ${nivel}%`;

        if (nivel >= 80 && nivel <= 90) {
            nivelElemento.style.background = "#FF4500";
        } else if (nivel > 90) {
            nivelElemento.style.background = "red";
        } else {
            nivelElemento.style.background = "green";
        }
    } catch (error) {
        console.error('Erro ao buscar o nível:', error);
    }
}

async function aumentarNivel() {
    const res = await fetch('https://lixeira-back.vercel.app/api/nivel');
    
    if (!res.ok) {
        console.error('Erro ao buscar o nível da lixeira');
        return;
    }

    const data = await res.json();
    let nivel = data.nivel;  
    
    console.log('Nível atual da lixeira:', nivel);

    if (nivel < 100) {
        nivel += 10;

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

// Atualiza o nível ao carregar a página
window.onload = atualizarNivel;
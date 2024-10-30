import http from 'k6/http';
import { check, sleep } from 'k6';

// Configurações do teste
export const options = {
    stages: [
        { duration: '2m', target: 250 }, // Aumenta para 250 usuários em 2 minutos
        { duration: '3m', target: 500 }, // Aumenta para 500 usuários em 3 minutos
        { duration: '2m', target: 0 },    // Reduz para 0 usuários em 2 minutos
    ],
};

const url = 'https://jsonplaceholder.typicode.com/posts'; // URL da API de mock

export default function () {
    const res = http.get(url); // Faz uma requisição GET

    // Verifica se a resposta foi bem-sucedida
    const success = check(res, {
        'status foi 200': (r) => r.status === 200,
        'resposta tem conteúdo': (r) => r.json().length > 0,
    });

    if (!success) {
        console.error(`Erro na requisição: ${res.status}`);
    } else {
        console.log(`Tempo de resposta: ${res.timings.duration} ms`);
        console.log(`Tamanho da resposta: ${res.body.length} bytes`);
    }

    sleep(1); // Espera 1 segundo antes da próxima requisição
}
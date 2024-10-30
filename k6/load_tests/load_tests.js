import http from 'k6/http';
import { check, sleep } from 'k6';

// Configurações do teste
export const options = {
    vus: 500, // Número de usuários virtuais
    duration: '5m', // Duração do teste
};

export default function () {
    const url = 'https://jsonplaceholder.typicode.com/posts'; // URL da API de mock
    const res = http.get(url); // Faz uma requisição GET

    // Verifica se a resposta foi bem-sucedida
    check(res, {
        'status foi 200': (r) => r.status === 200,
    });

    sleep(1); // Espera 1 segundo antes da próxima requisição
}
import loadTests from './load_tests/load_tests.js';
import stressTests from './stress_tests/stress_tests.js';

export const options = {
    vus: 500, // Número de usuários virtuais
    duration: '5m', // Duração do teste
};

export default function () {
    loadTests();
    stressTests();
}


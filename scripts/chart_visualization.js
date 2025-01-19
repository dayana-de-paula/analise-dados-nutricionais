import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';
import { SUPABASE_URL, SUPABASE_KEY } from './config.js';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function fetchData() {
    try {
        const { data, error } = await supabase.from('food_log').select('consumption_date, calories');

        if (error) {
            console.error('Erro ao buscar dados do Supabase:', error.message);
            return;
        }

        if (data.length === 0) {
            console.warn('Nenhum dado encontrado na tabela food_log.');
            return;
        }

        const validData = data.filter(record => {
            const date = new Date(record.consumption_date);
            const isValidDate = !isNaN(date);
            const isValidCalories = record.calories > 0;
            if (!isValidDate || !isValidCalories) {
                console.warn('Registro inválido encontrado e ignorado:', record);
                return false;
            }
            return true;
        });

        const groupedData = validData.reduce((acc, curr) => {
            const date = curr.consumption_date;
            if (!acc[date]) {
                acc[date] = 0;
            }
            acc[date] += curr.calories;
            return acc;
        }, {});

        const labels = Object.keys(groupedData).map(date => {
            const d = new Date(date);
            if (isNaN(d)) {
                console.error('Data inválida detectada após transformação:', date);
                return date;
            }
            return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear()}`;
        });

        const calories = Object.values(groupedData);

        renderChart(labels, calories);
    } catch (e) {
        console.error('Erro inesperado:', e);
    }
}

function renderChart(labels, data) {
    const ctx = document.getElementById('caloriesChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Calorias por Dia',
                data: data,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        font: {
                            size: 14
                        },
                        color: 'black'
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `Calorias: ${context.raw}`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Datas',
                        font: {
                            size: 16
                        }
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Calorias',
                        font: {
                            size: 16
                        }
                    }
                }
            }
        }
    });
}

fetchData();

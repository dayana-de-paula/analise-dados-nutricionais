import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';
import { SUPABASE_URL, SUPABASE_KEY } from './config.js';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function fetchWeeklyMacronutrients() {
    const { data, error } = await supabase
        .from('food_log')
        .select('consumption_date, proteins, carbs, fats');

    if (error) {
        console.error('Erro ao buscar dados:', error.message);
        return;
    }

    const groupedData = data.reduce((acc, curr) => {
        const date = curr.consumption_date;
        if (!acc[date]) {
            acc[date] = { proteins: 0, carbs: 0, fats: 0 };
        }
        acc[date].proteins += curr.proteins;
        acc[date].carbs += curr.carbs;
        acc[date].fats += curr.fats;
        return acc;
    }, {});

    const dates = Object.keys(groupedData).sort();
    const proteins = dates.map(date => groupedData[date].proteins);
    const carbs = dates.map(date => groupedData[date].carbs);
    const fats = dates.map(date => groupedData[date].fats);

    renderLineChart(dates, proteins, carbs, fats);
}

function renderLineChart(dates, proteins, carbs, fats) {
    const ctx = document.getElementById('macronutrientsLineChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [
                {
                    label: 'Proteínas',
                    data: proteins,
                    borderColor: '#fe535b',
                    fill: false,
                },
                {
                    label: 'Carboidratos',
                    data: carbs,
                    borderColor: '#00cec3',
                    fill: false,
                },
                {
                    label: 'Gorduras',
                    data: fats,
                    borderColor: '#ffb833',
                    fill: false,
                },
            ],
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Evolução de Macronutrientes ao Longo da Semana'
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Datas'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Gramas (g)'
                    }
                }
            }
        }
    });
}

fetchWeeklyMacronutrients();

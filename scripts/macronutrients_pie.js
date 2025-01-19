import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';
import { SUPABASE_URL, SUPABASE_KEY } from './config.js';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);


const dateList = document.getElementById("dateList");
const ctx = document.getElementById("macronutrientsChart").getContext("2d");
let chart;

function updateActiveDate(selectedDate) {
    const dateItems = document.querySelectorAll('.date-item');
    dateItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-date') === selectedDate) {
            item.classList.add('active');
        }
    });
}

async function loadDates() {
    try {
        const { data, error } = await supabase
            .from('food_log')
            .select('consumption_date')
            .order('consumption_date', { ascending: false });

        if (error) throw error;

        const uniqueDates = [...new Set(data.map(entry => entry.consumption_date))];
        dateList.innerHTML = "";

        uniqueDates.forEach((date) => {
            const dateItem = document.createElement("div");
            dateItem.className = "date-item";
            dateItem.textContent = new Date(date).toLocaleDateString('pt-BR');
            dateItem.setAttribute('data-date', date);
            dateItem.onclick = () => {
                loadChartData(date);
                updateActiveDate(date);
            };
            dateList.appendChild(dateItem);
        });

        if (uniqueDates.length > 0) {
            loadChartData(uniqueDates[0]);
            updateActiveDate(uniqueDates[0]);
        }
    } catch (err) {
        console.error("Erro ao carregar datas:", err);
        dateList.innerHTML = "<div class='date-item'>Erro ao carregar datas</div>";
    }
}

async function loadChartData(date) {
    try {
        const { data, error } = await supabase
            .from('food_log')
            .select('proteins, carbs, fats')
            .eq('consumption_date', date);

        if (error) throw error;

        if (data && data.length > 0) {
            const totals = data.reduce((acc, curr) => ({
                proteins: acc.proteins + (curr.proteins || 0),
                carbs: acc.carbs + (curr.carbs || 0),
                fats: acc.fats + (curr.fats || 0)
            }), { proteins: 0, carbs: 0, fats: 0 });

            updateChart([totals.proteins, totals.carbs, totals.fats], new Date(date).toLocaleDateString('pt-BR'));
        }
    } catch (err) {
        console.error("Erro ao carregar dados do gráfico:", err);
    }
}

function updateChart(values, dateLabel) {
    const labels = ["Proteínas", "Carboidratos", "Gorduras"];
    const colors = ["#fe535b", "#00cec3", "#ffb833"];

    if (chart) {
        chart.destroy();
    }

    chart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                data: values,
                backgroundColor: colors,
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        generateLabels: function(chart) {
                            return chart.data.labels.map((label, i) => ({
                                text: `${label}: ${chart.data.datasets[0].data[i].toFixed(1)}g`,
                                fillStyle: chart.data.datasets[0].backgroundColor[i],
                            }));
                        }
                    }
                },
                title: {
                    display: true,
                    text: `Macronutrientes - ${dateLabel}`,
                    font: {
                        size: 16
                    }
                }
            }
        }
    });
}

// Inicializa a aplicação
loadDates();

/* ============================================================
   MENU MOBILE
============================================================ */
const menuToggle = document.getElementById('menuToggle');
const menuList = document.getElementById('menuList');
menuToggle.addEventListener('click', () => {
  menuList.classList.toggle('aberto');
});

/* Fecha o menu ao clicar em um link (mobile) */
document.querySelectorAll('#menuList a').forEach(link => {
  link.addEventListener('click', () => menuList.classList.remove('aberto'));
});

/* ============================================================
   CALCULADORA DE CONSUMO
============================================================ */
const formCalc = document.getElementById('formCalc');
const resultadoCalc = document.getElementById('resultadoCalc');
let graficoConsumo = null;

formCalc.addEventListener('submit', (e) => {
  e.preventDefault();

  // Captura dos valores
  const banho = parseFloat(document.getElementById('banho').value);
  const qtdBanhos = parseFloat(document.getElementById('qtdBanhos').value);
  const descargas = parseFloat(document.getElementById('descargas').value);
  const louca = parseFloat(document.getElementById('louca').value);
  const vazao = parseFloat(document.getElementById('vazao').value);

  // Cálculos (funções matemáticas)
  const consumoBanho = banho * qtdBanhos * vazao;
  const consumoDescarga = descargas * 12;   // 12 L por descarga
  const consumoLouca = louca * 6;           // 6 L por minuto
  const totalDiario = consumoBanho + consumoDescarga + consumoLouca;
  const totalMensal = totalDiario * 30;
  const totalAnual = totalDiario * 365;

  // Média ONU: 110 L/pessoa/dia (referência)
  const mediaONU = 110;
  const comparacao = totalDiario > mediaONU
    ? `⚠️ Acima da média recomendada (${mediaONU} L/dia).`
    : `✅ Dentro da média recomendada (${mediaONU} L/dia).`;

  // Renderização do resultado
  resultadoCalc.innerHTML = `
    <p>🚿 Banho: <strong>${consumoBanho.toFixed(1)} L/dia</strong></p>
    <p>🚽 Descargas: <strong>${consumoDescarga.toFixed(1)} L/dia</strong></p>
    <p>🍽️ Louça: <strong>${consumoLouca.toFixed(1)} L/dia</strong></p>
    <hr>
    <p>📅 Consumo diário: <strong>${totalDiario.toFixed(1)} L</strong></p>
    <p>📆 Consumo mensal: <strong>${totalMensal.toFixed(0)} L</strong></p>
    <p>📈 Consumo anual: <strong>${totalAnual.toFixed(0)} L</strong></p>
    <p>${comparacao}</p>
  `;

  // Gráfico (Chart.js)
  const ctx = document.getElementById('graficoConsumo').getContext('2d');
  if (graficoConsumo) graficoConsumo.destroy();
  graficoConsumo = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Banho', 'Descarga', 'Louça'],
      datasets: [{
        data: [consumoBanho, consumoDescarga, consumoLouca],
        backgroundColor: ['#0077b6', '#00b4d8', '#2a9d8f']
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { position: 'bottom' } }
    }
  });
});

/* ============================================================
   SIMULADOR DE ECONOMIA
============================================================ */
const tempoAtual = document.getElementById('tempoAtual');
const tempoNovo = document.getElementById('tempoNovo');
const pessoasInput = document.getElementById('pessoas');
const resultadoSim = document.getElementById('resultadoSim');

const tempoAtualVal = document.getElementById('tempoAtualVal');
const tempoNovoVal = document.getElementById('tempoNovoVal');

function atualizarSimulador() {
  const atual = parseInt(tempoAtual.value);
  const novo = parseInt(tempoNovo.value);
  const pessoas = parseInt(pessoasInput.value) || 1;
  const vazao = 9; // L/min

  tempoAtualVal.textContent = atual;
  tempoNovoVal.textContent = novo;

  const consumoAtualDia = atual * vazao * pessoas;
  const consumoNovoDia = novo * vazao * pessoas;
  const economiaDia = consumoAtualDia - consumoNovoDia;
  const economiaMes = economiaDia * 30;
  const economiaAno = economiaDia * 365;

  resultadoSim.innerHTML = `
    <p>Consumo atual/dia: <strong>${consumoAtualDia} L</strong></p>
    <p>Novo consumo/dia: <strong>${consumoNovoDia} L</strong></p>
    <p>💧 Economia diária: <strong>${economiaDia} L</strong></p>
    <p>📆 Economia mensal: <strong>${economiaMes} L</strong></p>
    <p>📈 Economia anual: <strong>${economiaAno} L</strong></p>
    <p>🏊 Equivalente a <strong>${(economiaAno / 2500000).toFixed(3)}</strong> piscina(s) olímpica(s).</p>
  `;
}

[tempoAtual, tempoNovo, pessoasInput].forEach(el => {
  el.addEventListener('input', atualizarSimulador);
});
atualizarSimulador(); // inicial

/* ============================================================
   DESAFIOS — REVELAR RESPOSTA
============================================================ */
document.querySelectorAll('.btn-revelar').forEach(btn => {
  btn.addEventListener('click', () => {
    const resposta = btn.nextElementSibling;
    if (resposta.style.display === 'block') {
      resposta.style.display = 'none';
      btn.textContent = 'Ver resolução';
    } else {
      resposta.textContent = '✅ ' + btn.dataset.resposta;
      resposta.style.display = 'block';
      btn.textContent = 'Ocultar';
    }
  });
});

/* ============================================================
   DASHBOARD — GRÁFICO DE REGIÕES
============================================================ */
const ctxRegioes = document.getElementById('graficoRegioes').getContext('2d');
new Chart(ctxRegioes, {
  type: 'bar',
  data: {
    labels: ['Norte', 'Nordeste', 'Centro-Oeste', 'Sudeste', 'Sul'],
    datasets: [{
      label: 'Consumo per capita (L/dia)',
      data: [140, 120, 130, 150, 125],
      backgroundColor: ['#0077b6', '#00b4d8', '#90e0ef', '#2a9d8f', '#48cae4']
    }]
  },
  options: {
    responsive: true,
    scales: { y: { beginAtZero: true, title: { display: true, text: 'Litros/dia' } } }
  }
});
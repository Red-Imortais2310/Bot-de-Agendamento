// ===== DADOS =====
// ===== API BASE =====
const API_URL = 'http://localhost:5000/api';

// ===== CHAMADAS PARA O BACKEND =====
async function carregarPacientesDB() {
  try {
    const res = await fetch(`${API_URL}/pacientes`);
    return await res.json();
  } catch (erro) {
    console.error('Erro ao carregar pacientes:', erro);
    return [];
  }
}

async function salvarPacienteDB(paciente) {
  try {
    const res = await fetch(`${API_URL}/pacientes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(paciente)
    });
    return await res.json();
  } catch (erro) {
    console.error('Erro ao salvar paciente:', erro);
    return null;
  }
}

// ===== DADOS (localStorage como fallback) =====
function getAgendamentos() {
  return JSON.parse(localStorage.getItem('agendamentos') || '[]');
}
function salvarAgendamentos(data) {
  localStorage.setItem('agendamentos', JSON.stringify(data));
}
function getClientes() {
  return JSON.parse(localStorage.getItem('clientes') || '[]');
}
function salvarClientes(data) {
  localStorage.setItem('clientes', JSON.stringify(data));
}
function getServicos() {
  return JSON.parse(localStorage.getItem('servicos') || '[]');
}
function salvarServicos(data) {
  localStorage.setItem('servicos', JSON.stringify(data));
}

// ===== TOAST =====
function showToast(msg, tipo = 'success') {
  const icons = { success: 'circle-check', error: 'circle-xmark', warning: 'triangle-exclamation' };
  const container = document.getElementById('toastContainer');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = `toast ${tipo === 'error' ? 'error' : tipo === 'warning' ? 'warning' : ''}`;
  toast.innerHTML = `<i class="fa-solid fa-${icons[tipo] || 'circle-check'}"></i> ${msg}`;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3500);
}

// ===== SEED DATA =====
if (!localStorage.getItem('seeded')) {
  salvarClientes([
    { id: 1, nome: 'Ana Silva',    telefone: '(13) 99801-1234', email: 'ana@email.com',    obs: '' },
    { id: 2, nome: 'Carlos Souza', telefone: '(13) 99802-5678', email: 'carlos@email.com', obs: '' },
    { id: 3, nome: 'Mariana Lima', telefone: '(13) 99803-9012', email: 'mari@email.com',   obs: '' },
  ]);
  salvarServicos([
    { id: 1, nome: 'Consulta',      duracao: 60, preco: 150.00, descricao: '' },
    { id: 2, nome: 'Retorno',       duracao: 30, preco: 80.00,  descricao: '' },
    { id: 3, nome: 'Avaliação',     duracao: 45, preco: 100.00, descricao: '' },
    { id: 4, nome: 'Procedimento',  duracao: 90, preco: 250.00, descricao: '' },
  ]);
  const hoje = new Date().toISOString().split('T');
  salvarAgendamentos([
    { id: 1, cliente: 'Ana Silva',    servico: 'Consulta',     data: hoje, hora: '09:00', status: 'confirmado', obs: '' },
    { id: 2, cliente: 'Carlos Souza', servico: 'Retorno',      data: hoje, hora: '10:30', status: 'pendente',   obs: '' },
    { id: 3, cliente: 'Mariana Lima', servico: 'Avaliação',    data: hoje, hora: '14:00', status: 'concluido',  obs: '' },
  ]);
  localStorage.setItem('seeded', '1');
}


function getAgendamentos() {
  return JSON.parse(localStorage.getItem('agendamentos') || '[]');
}
function salvarAgendamentos(data) {
  localStorage.setItem('agendamentos', JSON.stringify(data));
}
function getClientes() {
  return JSON.parse(localStorage.getItem('clientes') || '[]');
}
function salvarClientes(data) {
  localStorage.setItem('clientes', JSON.stringify(data));
}
function getServicos() {
  return JSON.parse(localStorage.getItem('servicos') || '[]');
}
function salvarServicos(data) {
  localStorage.setItem('servicos', JSON.stringify(data));
}

// ===== TOAST =====
function showToast(msg, tipo = 'success') {
  const icons = { success: 'circle-check', error: 'circle-xmark', warning: 'triangle-exclamation' };
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = `toast ${tipo === 'error' ? 'error' : tipo === 'warning' ? 'warning' : ''}`;
  toast.innerHTML = `<i class="fa-solid fa-${icons[tipo] || 'circle-check'}" style="color:var(--${tipo==='error'?'danger':tipo==='warning'?'warning':'primary'})"></i> ${msg}`;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3500);
}

// ===== SEED DATA (primeira vez) =====
if (!localStorage.getItem('seeded')) {
  salvarClientes([
    { id: 1, nome: 'Ana Silva',    telefone: '(13) 99801-1234', email: 'ana@email.com',    obs: '' },
    { id: 2, nome: 'Carlos Souza', telefone: '(13) 99802-5678', email: 'carlos@email.com', obs: '' },
    { id: 3, nome: 'Mariana Lima', telefone: '(13) 99803-9012', email: 'mari@email.com',   obs: '' },
  ]);
  salvarServicos([
    { id: 1, nome: 'Consulta',      duracao: 60, preco: 150.00 },
    { id: 2, nome: 'Retorno',       duracao: 30, preco: 80.00  },
    { id: 3, nome: 'Avaliação',     duracao: 45, preco: 100.00 },
    { id: 4, nome: 'Procedimento',  duracao: 90, preco: 250.00 },
  ]);
  const hoje = new Date().toISOString().split('T')[0];
  salvarAgendamentos([
    { id: 1, cliente: 'Ana Silva',    servico: 'Consulta',     data: hoje, hora: '09:00', status: 'confirmado', obs: '' },
    { id: 2, cliente: 'Carlos Souza', servico: 'Retorno',      data: hoje, hora: '10:30', status: 'pendente',   obs: '' },
    { id: 3, cliente: 'Mariana Lima', servico: 'Avaliação',    data: hoje, hora: '14:00', status: 'concluido',  obs: '' },
  ]);
  localStorage.setItem('seeded', '1');
}
// ABRIR E FECHAR MODAL
function abrirModal() {
  document.getElementById('modalAgendamento').classList.add('ativo');
}

function fecharModal() {
  document.getElementById('modalAgendamento').classList.remove('ativo');
  document.getElementById('formAgendamento').reset();
}

// FECHAR CLICANDO FORA DO MODAL
document.getElementById('modalAgendamento').addEventListener('click', function(e) {
  if (e.target === this) fecharModal();
});

// SALVAR AGENDAMENTO
function salvarAgendamento(event) {
  event.preventDefault();

  const nomeCliente = document.getElementById('cliente').value.trim();

  const agendamento = {
    id:         Date.now(),
    cliente:    nomeCliente,
    servico:    document.getElementById('servico').value,
    data:       document.getElementById('data').value,
    hora:       document.getElementById('horario').value, // ✅ era "horario", agora é "hora"
    observacao: document.getElementById('observacao').value,
    status:     'pendente'
  };

  // ✅ Salva o agendamento
  const agendamentos = getAgendamentos();
  agendamentos.push(agendamento);
  salvarAgendamentos(agendamentos);

  // ✅ Verifica se o cliente já existe
  const clientes = getClientes();
  const jaExiste = clientes.some(
    c => c.nome.toLowerCase() === nomeCliente.toLowerCase()
  );

  // ✅ Se não existir, cadastra automaticamente
  if (!jaExiste) {
    const novoCliente = {
      id:       Date.now() + 1,
      nome:     nomeCliente,
      telefone: '',
      email:    '',
      obs:      'Cadastrado via agendamento',
      criado:   new Date().toISOString() // ✅ necessário para métrica "Novos este Mês"
    };
    clientes.push(novoCliente);
    salvarClientes(clientes);
    showToast(`Cliente "${nomeCliente}" adicionado automaticamente! 🙋`, 'success');
  }

  showToast('Agendamento confirmado com sucesso! ✅', 'success');
  fecharModal();
  carregarAgendamentos();
}



// CARREGAR AGENDAMENTOS NA TELA
function carregarAgendamentos() {
  const agendamentos = JSON.parse(localStorage.getItem('agendamentos') || '[]');
  const lista = document.getElementById('listaAgendamentos');

  if (!lista) return;

  lista.innerHTML = agendamentos.length === 0
    ? '<p>Nenhum agendamento encontrado.</p>'
    : agendamentos.map(a => `
        <div class="card-agendamento">
          <strong>👤 ${a.cliente}</strong>
          <span>✂️ ${a.servico}</span>
          <span>📅 ${a.data} às ${a.hora}</span>
          <span class="status ${a.status}">${a.status}</span>
        </div>
      `).join('');
}

// Carrega ao abrir a página
carregarAgendamentos();


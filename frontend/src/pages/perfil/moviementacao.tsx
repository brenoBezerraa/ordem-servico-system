import "./Movimentacao.css";
import { useCadastroData } from "../../hooks/useCadastroData";
import { NavLink } from "react-router";

export function Movimentacao() {
  const { data } = useCadastroData();

  const hoje = new Date();
  const mesAtual = hoje.getMonth();
  const anoAtual = hoje.getFullYear();

  /* =========================
     FILTROS STATUS
  ========================== */

  const servicosPendentes =
    data?.filter((item) => item.status === false) || [];

  const servicosConcluidos =
    data?.filter((item) => item.status === true) || [];

  const total = data?.length ?? 0;
  const concluidas = servicosConcluidos.length;
  const pendentes = servicosPendentes.length;

  const pctConcluidas = total ? (concluidas / total) * 100 : 0;

  /* =========================
     FATURAMENTO DO MÊS
  ========================== */

  const faturamentoMes =
    data?.reduce((total, item) => {
      if (!item.status || !item.valor) return total;

      const [anoServico, mesServico] = (item.data_entrada ?? "").split("-").map(Number);

      if (mesServico - 1 === mesAtual && anoServico === anoAtual) {
        return total + Number(item.valor);
      }

      return total;
    }, 0) || 0;

  /* =========================
     FATURAMENTO POR MÊS
  ========================== */

  const faturamentoPorMes = Object.entries(
    (data ?? [])
      .filter((item) => item.status === true)
      .reduce((acc: Record<string, number>, item) => {
        const valorNum = Number(item.valor) || 0;

        const [ano, mes] = (item.data_entrada ?? "").split("-").map(Number);
        if (!ano || mes < 1 || mes > 12) return acc;

        const chave = `${ano}-${String(mes).padStart(2, "0")}`;

        acc[chave] = (acc[chave] || 0) + valorNum;
        return acc;
      }, {})
  ).sort((a, b) => b[0].localeCompare(a[0]));

  /* ========================= */

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Movimentações</h1>

      {/* CARDS */}
      <div className="cards-container">
        <div className="card purple">
          <h3>Faturamento do Mês</h3>
          <p>
            {faturamentoMes.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </p>
        </div>

        <NavLink to="/home" style={{ textDecoration: "none", color: "inherit" }}>
          <div className="card green">
            <h3>Todas as OS</h3>
            <p>{total}</p>
          </div>
        </NavLink>

        <NavLink
          to="/concluidos"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <div className="card blue">
            <h3>Concluídas</h3>
            <p>{concluidas}</p>
          </div>
        </NavLink>

        <NavLink to="/home" style={{ textDecoration: "none", color: "inherit" }}>
          <div className="card yellow">
            <h3>Pendentes</h3>
            <p>{pendentes}</p>
          </div>
        </NavLink>
      </div>

      {/* GRÁFICO DONUT */}
      <div className="charts-container">
        <div className="chart-box">
          <h3>Status das Ordens</h3>

          <div
            className="donut-chart"
            style={{
              background: `conic-gradient(
                #00c896 0% ${pctConcluidas}%,
                #fdd835 ${pctConcluidas}% 100%
              )`,
            }}
          >
            <div className="donut-center">
              {pctConcluidas.toFixed(0)}%
            </div>
          </div>

          <div className="chart-legend">
            <div className="legend-item">
              <span className="legend-color green-dot"></span>
              Concluídas ({concluidas})
            </div>

            <div className="legend-item">
              <span className="legend-color yellow-dot"></span>
              Pendentes ({pendentes})
            </div>
          </div>
        </div>
      </div>

      {/* FATURAMENTO POR MÊS */}
      <div className="months-container">
        <h3>Faturamento por mês</h3>

        <div className="months-grid">
          {faturamentoPorMes.length === 0 ? (
            <p className="muted">Ainda não há faturamento concluído.</p>
          ) : (
            faturamentoPorMes.map(([mesAno, total]) => (
              <div className="month-card" key={mesAno}>
                <span className="month-label">{mesAno}</span>
                <strong className="month-value">
                  {total.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </strong>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

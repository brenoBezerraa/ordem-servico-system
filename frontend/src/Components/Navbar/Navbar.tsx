import { NavLink } from "react-router-dom";
import "./Navbar.css";

export function Navbar() {

  return (
    <>
      <span className="fs-4">Renovadora de Pneus Veri</span>

      <hr />

      <ul className="nav nav-pills flex-column mb-auto">
        
        <li className="nav-item">
          <NavLink
            to="/home"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : "link-dark"}`
            }
          >
            Inicio
            <img src="casa.png" alt="" />
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink
            to="/pendentes"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : "link-dark"}`
            }
          >
            Pendentes
            <img src="pendente.png" alt="" />
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink
            to="/concluidos"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : "link-dark"}`
            }
          >
            Concluídos
            <img src="progresso-concluido.png" alt="" />
          </NavLink>
        </li>
      </ul>

      <hr />
      <div className="dropdown">
        <NavLink
          to="/movimentacao"
          className={({ isActive }) =>
            `nav-link ${isActive ? "active" : "link-dark"}`
          }
        >


          <span>Movimentação</span>

          <img
            src="/grafico-simples.png"
            alt="user"
            width="20"
            height="20"
          />
        </NavLink>
      </div>
    </>
  );
}

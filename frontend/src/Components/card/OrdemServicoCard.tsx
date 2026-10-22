import "./OrdemServicoCard.css";
import { useState } from "react";
import { CreateModalOs } from "../Create-modal/CreateModalOs";

interface CardProps {
  status: boolean;
  name: string;
  servico: string;
  id?: number;
  quantidade: number;
  modelo: string;
  data_entrada: string;
  numero: string;
  valor: number;
}

export function OrdemServicoCard({ status, servico, name, id, quantidade, modelo, data_entrada, numero, valor }: CardProps) {
  const [isModalOpenOs, setIsModalOpenOs] = useState(false);

  const statusServico = status ? "Concluído" : "Pendente";


  return (
    <>
      <div className="Card" onClick={() => setIsModalOpenOs(true)}>
        <div className="name_container">
          <h2>{name}</h2>
          <p className={statusServico}>{statusServico}</p>
        </div>

        <hr className="divider" />

        <div className="os_container">
          <div className="Servicos">
            <p className="servicos_title">Serviço:</p>
            <p>{servico}</p>
          </div>

          <div className="OS">
            <p className="os_title">OS:</p>
            <p>#{id}</p>
          </div>
        </div>
      </div>

      {isModalOpenOs && (
        <CreateModalOs
          closeModal={() => setIsModalOpenOs(false)}
          name={name}
          servico={servico}
          status={status}
          id={id}
          quantidade={quantidade}
          modelo={modelo}
          data_entrada={data_entrada}
          numero={numero}
          valor={valor}
        />
      )}
    </>
  );
}

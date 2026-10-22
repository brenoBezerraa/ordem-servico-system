import { useState } from "react";
import { OrdemServicoCard } from "../Components/card/OrdemServicoCard";
import { CreateModal } from "../Components/Create-modal/CreateModal";
import { useCadastroData } from "../hooks/useCadastroData";
import { Searchbar } from "../Components/SearchBar/Searchbar";

export default function Concluidos() {
  const { data } = useCadastroData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");

  const handleOpenModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const servicosConcluidos =
    data?.filter(
      (item) =>
        item.status === true &&
        (
          (item.name ?? "").toLowerCase().includes(search.toLowerCase()) ||
          (item.servico ?? "").toLowerCase().includes(search.toLowerCase()) ||
          (item.modelo ?? "").toLowerCase().includes(search.toLowerCase())
        )
    ) || [];

  return (
    <div className="Container">
      <h1>Serviços Concluídos</h1>

      <Searchbar value={search} onChange={setSearch} />

      <button className="btn-primary" onClick={handleOpenModal}>
        <span className="icon-button-cadastrar">
          <img src="/adicionar.png" alt="" />
        </span>
        Novo Serviço
      </button>

      <div className="card-container">
        <div className="card-grid">
          {servicosConcluidos.length > 0 ? (
            servicosConcluidos.map((item) => (
              <OrdemServicoCard
                key={item.id}
                id={item.id}
                status={item.status}
                name={item.name}
                servico={item.servico}
                quantidade={item.quantidade}
                modelo={item.modelo}
                data_entrada={item.data_entrada}
                numero={item.numero}
                valor={item.valor}
              />
            ))
          ) : (
            <p>Nenhum serviço concluído</p>
          )}
        </div>
      </div>

      {isModalOpen && <CreateModal closeModal={handleOpenModal} />}
    </div>
  );
}

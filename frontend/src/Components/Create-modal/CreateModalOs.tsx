import "./CreateModalOs.css";
import { useCadastroDelete } from "../../hooks/useCadastroDelete";
import { useCadastroUpdate } from "../../hooks/useUpdateData";

interface ModalProps {
  closeModal(): void;
  id?: number;
  name: string;
  servico: string;
  status: boolean;
  quantidade: number;
  modelo: string;
  data_entrada: string;
  numero: string;
  valor: number;
}

export function CreateModalOs({
  closeModal,
  id,
  name,
  servico,
  status,
  quantidade,
  modelo,
  data_entrada,
  numero,
  valor
}: ModalProps) {
  const { deleteCadastro } = useCadastroDelete();
  const { mutate, isPending } = useCadastroUpdate();
  const valorServico =
  valor !== undefined && valor !== null
    ? `R$ ${Number(valor).toFixed(2)}`
    : "Valor não informado";



  const statusLabel = status ? "Concluído" : "Pendente";

  const handleToggleStatus = () => {
    if (!id) return;

    mutate(
      { id, status: !status },
      {
        onSuccess: () => {
          closeModal();
        },
      }
    );
  };

  const handleDelete = () => {
    if (!id) return;

    if (confirm("Tem certeza que deseja excluir esta OS?")) {
      deleteCadastro(id);
      closeModal();
    }
  };

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-body" onClick={(e) => e.stopPropagation()}>
        <img
          src="/cruz.png"
          alt="Fechar"
          className="button_close"
          onClick={closeModal}
        />

        <h2 className="modal-title">Detalhes da Ordem de Serviço</h2>

        <div className="modal-content">
          <p><strong>Cliente:</strong> {name}</p>
          <p><strong>Serviço:</strong> {servico}</p>
          <p><strong>Status:</strong> {statusLabel}</p>
          <p><strong>OS:</strong> #{id}</p>
          <p><strong>Modelo:</strong> {modelo}</p>
          <p><strong>Quantidade:</strong> {quantidade}</p>
          <p><strong>Data de Entrada:</strong> {data_entrada}</p>
          <p><strong>Número:</strong> {numero}</p>
          <p><strong>Valor:</strong>{valorServico}</p>
        </div>

        <div className="modal-actions">
          <button
            className="btn-status"
            onClick={handleToggleStatus}
            disabled={isPending}
          >
            {status ? "Marcar como Pendente" : "Marcar como Concluído"}
          </button>

          <button className="btn-delete" onClick={handleDelete}>
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}

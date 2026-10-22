import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../services/api"; 

interface UpdateStatusProps {
  id?: number;
  status: boolean;
}

export function useCadastroUpdate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, status }: UpdateStatusProps) => {
      if (!id) throw new Error("ID do cadastro é obrigatório");

      const response = await api.patch(`/cadastros/${id}/status`, {
        status: status,
      });

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cadastro-data"], 
      });
    },
  });
}

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../services/api"; 

export function useCadastroDelete() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: number) => api.delete(`/cadastros/${id}`),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cadastro-data"],
      });
    },
  });

  return {
    deleteCadastro: mutation.mutate,
    isPending: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
  };
}

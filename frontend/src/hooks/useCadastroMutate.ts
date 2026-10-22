import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../services/api"; // <- usa o interceptor
import type { CadastroData } from "../interface/CadastroData";

const postData = async (data: CadastroData) => {
    const response = await api.post('/cadastros', data); 
    return response.data;
}

export function useCadastroDataMutate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cadastro-data'] });
    }
  });
}

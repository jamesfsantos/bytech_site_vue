
import type { ViaCepModel } from "@/types/viaCep";
import axios from "axios";

class ViaCEP {
  async buscarPorCEP(cep: string): Promise<ViaCepModel>{
    try{
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
      const dados = response.data

      return dados;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    catch(error: any){
      console.error("Erro ao buscar CEP", error)
      throw error;
      return {} as ViaCepModel;
    }

  }

}

export default new ViaCEP();

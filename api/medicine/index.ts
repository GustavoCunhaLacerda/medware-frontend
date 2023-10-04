import { $Fetch } from "ofetch";

export type MedicineListItem = {
  nomeProduto: string;
  razaoSocial: string;
};

export type MedicineList = {
  content: MedicineListItem[];
  totalPages: number;
};

export type Medicine = {
  nomeComercial: string;
  classeTerapeutica: string | null;
  classesTerapeuticas: string[] | null;
  principioAtivo: string;
  medicamentoReferencia: string | null;
  categoriaRegulatoria: string;
  empresa: { razaoSocial: string };
  codigoBulaPaciente: string;
};

export default class MedicineApi {
  private api;

  constructor(api: $Fetch) {
    this.api = api;
  }

  public list(medicineName: string, page: number): Promise<MedicineList> {
    return this.api("/pesquisar", {
      method: "get",
      query: {
        nome: medicineName,
        pagina: page,
      },
    });
  }

  public get(id: string): Promise<Medicine> {
    return this.api("/medicamento/" + id, {
      method: "get",
    });
  }

  public downloadPdf(cod: string) {
    window.open("https://bula.vercel.app/pdf?id=" + cod, "_blank");
  }
}

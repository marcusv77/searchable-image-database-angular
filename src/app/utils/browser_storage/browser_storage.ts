
export class ArmazenamentoBrowser {

    public armazenarDadoSessao(chave: string, registro: object): void {
        window.sessionStorage.setItem(chave, JSON.stringify(registro));
    }

    public obterDadoSessao(chave: string) :string {
        return window.sessionStorage.getItem(chave);
    }

    public excluirDadoSessao(chave: string): void {
        window.sessionStorage.removeItem(chave);
    }

    public armazenarDadoLocal(chave: string, registro: object): void {
        window.localStorage.setItem(chave, JSON.stringify(registro));
    }

    public obterDadoLocal(chave: string): string {
        return window.localStorage.getItem(chave);
    }

    public excluirDadoLocal(chave: string): void {
        window.localStorage.removeItem(chave);
    }
}

import { Component, Output } from '@angular/core';
import { AutenticacaoService } from './services/login/autenticacao.service';
import { ChavesArmazenamentoBrowser } from './utils/chaves_armazenamento_browser';
import { ArmazenamentoBrowser } from './utils/browser_storage/browser_storage';

@Component({
    selector: 'cr-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    //#region Propriedades
    @Output() usuarioAutenticado: boolean = false;
    private armazenamentoBrowser: ArmazenamentoBrowser;
    //#endregion

    //Construtor
    constructor(private autenticacaoService: AutenticacaoService) { }

    //Metodo de inicializacao
    ngOnInit() {
        this.armazenamentoBrowser = new ArmazenamentoBrowser();

        //Autenticar no refresh da pagina
        if(this.armazenamentoBrowser.obterDadoSessao(ChavesArmazenamentoBrowser.CHAVE_USUARIO_LOGADO))
        {
            this.autenticacaoService.setUsuarioAutenticado(true);
            this.usuarioAutenticado = true;
            this.autenticacaoService.usuarioLogadoEventEmitter.emit(true);            
        }

        //Autenticar no login
        this.autenticacaoService.usuarioLogadoEventEmitter
        .subscribe(
            (autenticado: boolean) => 
            {
                this.usuarioAutenticado = autenticado;
            }
        );
    }
}

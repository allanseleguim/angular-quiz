import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Frase } from '../shared/frase.model';
import { FRASES } from './frases-mock';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})
export class PainelComponent implements OnInit, OnDestroy {

  public frases: Frase[] = FRASES
  public instrucao: string = 'Traduza a frase'
  public resposta: string = ''
  public rodada: number = 0
  public rodadaFrase: Frase

  public progresso: number = 0
  public tentativas: number = 3

  @Output() public encerrarJogo:EventEmitter<string> = new EventEmitter()
  constructor() {
    this.atualizaRodada()
  }

  ngOnInit() {
  }
  ngOnDestroy(){
    // console.log('Foi destruido')
  }

  public atualizaResposta(resposta: Event): void {
    this.resposta = (<HTMLInputElement>resposta.target).value
    // console.log(this.resposta)
  }

  public verificarResposta(): void {
    // console.log(this.tentativas)
    // console.log('Verificar resposta: ', this.resposta)
    if (this.rodadaFrase.frasePtBr == this.resposta) {
    
      this.rodada++
      Swal.fire('A tradução está correta')

      if(this.rodada === 4) {
        this.encerrarJogo.emit('vitoria')
      }
      //atualiza o objeto rodadaFrase
      this.atualizaRodada()

      //progresso
      this.progresso = this.progresso + (100 / this.frases.length)
      
        
    } else {
      this.tentativas--
      Swal.fire('Ops... você errou!')
      
      if(this.tentativas === -1) {
       this.encerrarJogo.emit('derrota')
      }
      // console.log(this.tentativas)
    }
  }
  
  public atualizaRodada(): void{
    //define a frase da rodada com base em alguma lógica 
    this.rodadaFrase = this.frases[this.rodada]
    //limpar a resposta
    this.resposta = ''
  }
}

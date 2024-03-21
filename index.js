const { createApp } = Vue

createApp({
    data() {
        return {
            display: "0",
            numeroAtual: null,
            numeroAnterior: null,
            operador: null,
            conta: false,
            contador: 1,
            url: './dividir.gif',
            url2: './universo.gif'
        }
    },
    methods: {
        lidarBotao(botao) {
            switch (botao) {
                case "*":
                case "-":
                case "+":
                case "/":
                    this.lidarOperador(botao)
                    break
                case ".":
                    this.lidarDecimal()
                    break
                case "=":
                    this.lidarIgual()
                    break
                case "AC":
                    this.lidarClear()
                    break
                default:
                    this.lidarNumero(botao)
            }
        },
        lidarOperador(operador){
            //coloca o operador e os números no display
            this.numeroAnterior = this.display;
            this.operador = operador;
            this.display = operador;
            this.conta = true;
        },

        lidarDecimal(){
            //converte o display para string e insere o ponto
            if(!this.display.toString().includes(".")){
                this.display += "."
            }
        },
        lidarIgual(){
            this.numeroAtual = this.display;
            //faz as operações com os números de acordo com cada operador
            switch (this.operador){
                case "*":
                    this.display = this.numeroAnterior * this.numeroAtual;
                    this.conta = true;
                break;
                case "-":
                    this.display = this.numeroAnterior - this.numeroAtual;
                    this.conta = true;
                break;
                case "+":
                    this.display = this.numeroAnterior + this.numeroAtual;
                    this.conta = true;
                break;
                case "/":
                    //valida a entrada de numero/0 e 0/0, que não retornam números reais
                    if (this.numeroAnterior !== 0 && this.numeroAtual === 0){
                        this.display = 'Infinity'
                    } else if(this.numeroAnterior === 0 && this.numeroAtual === 0){
                        this.display = 'Error'
                    } else {
                        this.display = this.numeroAnterior / this.numeroAtual;
                    }
                    this.conta = true;
                break;
            }
        },
        lidarClear(){
            //limpa os números da calculadora
            this.display = "0";
            this.numeroAnterior = null;
            this.numeroAtual = null;
            this.operador = null;
            this.conta = false;
        },
        lidarNumero(numero){
            if (this.display === "0" || this.conta == true){
            //coloca o número selecionado no display se o display estiver em zero ou se a conta já tiver acontecido
            this.display = parseFloat(numero);
            this.conta = false;
            } else {
                //concatena o número que já está no display junto ao novo input
                this.display = parseFloat(this.display + numero);
            }
        }
    }
}).mount("#app")
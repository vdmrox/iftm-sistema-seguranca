$(document).ready(function(){
  var key = 'SHAME';
  var _exec = this;

  // Módulo principal
  var execute = {


    // Mapa de limites do alfabeto de acordo com o tipo de char: maiúsculo ou minúsculo
    range: {
      upper: {
        begin: 65,
        end: 90
      },
      lower: {
        begin: 97,
        end: 122
      }
    },


    // Mapa do tipo de char da chave, criado para resolver o problema de comparação "chave : mensagem"
    setKeyTypo: {
      upper: function(key){
        return key.toUpperCase();
      },
      lower: function(key){
        return key.toLowerCase();
      }
    },


    // Mapa do algoritmo a ser executado: decode ou encode
    getAction: {
      encode: function(replace, typo){
        recap = execute.setKeyTypo[typo](key);

        var keyrep = recap.charCodeAt(_start.keypos);
        
        var diff1 = keyrep - execute.range[typo].begin;
        var diff2 = replace - execute.range[typo].begin;
        
        var converted = diff1 + diff2;

        if (converted + execute.range[typo].begin > execute.range[typo].end){
          converted = execute.range[typo].begin + converted - 26;
        }else{
          converted += execute.range[typo].begin;
        }

        _start.keypos++;

        if(_start.keypos >= key.length){
          _start.keypos = 0;
        }

        return converted;
        
      },

      decode: function(replace, typo){
        recap = execute.setKeyTypo[typo](key);

        var keyrep = recap.charCodeAt(_start.keypos);
        
        if(keyrep > replace){
          term1 = execute.range[typo].end - keyrep;
          term2 = replace - execute.range[typo].begin;
          converted = term1 + term2 + 1;

        }else if(keyrep < replace){
          converted = replace - keyrep;

        }else if(keyrep == replace){
          converted = 0;
        }

        _start.keypos++;

        if(_start.keypos >= key.length){
          _start.keypos = 0;
        }

        return converted + execute.range[typo].begin;
        
      }
    },

    //Verifica tipo de caracter, maiúsculo ou minúsculo, para definir o range de chars a ser utilizado
    caseCheck: function(char){
      typo = char == char.toUpperCase() ? 'upper' : 'lower';
      return typo;
    },


    replaceSpecial: function(msg){
      var character = {
        '<': '&lt;',
        '>': '&gt;'
      }

      return msg.replace(/[<>]/g, function(c){
        return character[c];
      });
    },


    // Core do algoritmo: executa o loop percorrendo a mensagem e traduzindo-a
    start: function (){

      // var msg = this.replaceSpecial(_this.getMessage);
      var msg = _this.getMessage;

      _start = this;
      _start.keypos = 0;

      var result = "";
      var replace;
      for(var i=0; i < msg.length; i++){

        var typo = this.caseCheck(msg[i]);

        replace = msg.charCodeAt(i);

        if(replace < this.range[typo].begin || replace > this.range[typo].end){
          result = result.concat(String.fromCharCode(replace));
        }else{

          if(replace == 32){
            result = result.concat(" ");
          }else{
            aux = this.getAction[_this.getAction](replace, typo);
            result = result.concat(String.fromCharCode(aux));
          }
        }
      }
      return(result);
    }
  }



  // Módulo de disparo. Captura os dados, dispara o algoritmo e insere a resposta no html
  $("#btnExec").on("click", function(){
    _this = this;
    _this.getMessage = $("#post-msg").val();
    _this.getAction = $("#drop-select").val();

    result = execute['start']();

    $("#resposta").html(execute.replaceSpecial(result));
  });

});

$(document).ready(function(){
  var key = 5;

  var execute = {

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

    getAction: {
      encode: function(replace, res){
        replace += key;
        if(replace > execute.range[res].end){
          replace -= 26;
        }
        return replace;
      },

      decode: function(replace, res){
        replace -= key;
        if(replace < execute.range[res].begin){
          replace += 26;
        }
        return replace;
      }
    },

    caseCheck: function(char){
      res = char == char.toUpperCase() ? 'upper' : 'lower';
      return res;
    },

    start: function (){

      var result = "";
      var replace;
      for(var i=0; i < _this.getMessage.length; i++){

        var res = this.caseCheck(_this.getMessage[i]);

        replace = _this.getMessage.charCodeAt(i);

        if(replace < this.range[res].begin || replace > this.range[res].end){
          result = result.concat(String.fromCharCode(replace));
        }else{
          if(replace == 32){
            result = result.concat(" ");
          }else{
            aux = this.getAction[_this.getAction](replace, res);
            result = result.concat(String.fromCharCode(aux));
          }
        }
      }
      return(result);
    }
  }

  $("#btnExec").on("click", function(){
    _this = this;
    _this.getMessage = $("#post-msg").val();
    _this.getAction = $("#drop-select").val();

    result = execute['start']();
    $("#resposta").html(result);
  });

});
